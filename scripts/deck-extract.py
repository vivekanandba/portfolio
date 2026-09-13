#!/usr/bin/env python3
"""
deck-extract.py — turn a .pptx into redacted, reproducible source material (ADR-0013).

    python3 scripts/deck-extract.py --pptx "Legend Company - V5.5.pptx" \
        --rules scripts/deck-rules/legend-company-v5.5.json --out source/decks/legend-company-v5.5

    python3 scripts/deck-extract.py ... --verify      # re-derive and diff against the committed tree

What it does, deterministically (same input + same rules ⇒ byte-identical output):

  * reads slides in presentation order; extracts titles, shape text, tables, SmartArt text
    and speaker notes;
  * applies the rules file: third-party names withheld, slide bodies omitted with a stated
    reason, e-mail addresses and phone numbers scrubbed as a safety net, every media file
    either kept under a new name, excluded with a reason, or marked pending (clips over 2 MiB
    that need re-encoding);
  * copies kept images with EXIF/XMP/text metadata stripped *losslessly* (JPEG segment and
    PNG chunk level — pixels stay byte-identical), or applies declared crop/blur edits;
  * copies kept clips verbatim when they fit the 2 MiB hygiene ceiling;
  * writes slides.md (the transcript), media-map.json (the per-file record), and media/ + clips/.

Standard library plus Pillow. The .pptx originals are release assets, not repository files, so
this cannot run in CI; `--verify` is the local reproduction check the deck README describes.
"""
from __future__ import annotations

import argparse
import io
import json
import re
import struct
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

from PIL import Image, ImageFilter

NS = {
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "rel": "http://schemas.openxmlformats.org/package/2006/relationships",
}
R_ID = f"{{{NS['r']}}}id"
R_EMBED = f"{{{NS['r']}}}embed"
R_LINK = f"{{{NS['r']}}}link"
MAX_BYTES = 2 * 1024 * 1024
EMAIL = re.compile(r"[\w.+-]+@[\w-]+\.[\w.-]+")
PHONE = re.compile(r"(\(\+?\d{1,3}\)|\+\d{1,3})?[\s-]?\d[\d\s-]{7,}\d")


# ----------------------------------------------------------------------------- pptx reading
class Deck:
    def __init__(self, path: Path):
        self.zip = zipfile.ZipFile(path)
        self.names = set(self.zip.namelist())

    def xml(self, name: str) -> ET.Element:
        return ET.fromstring(self.zip.read(name))

    def rels(self, part: str) -> dict[str, tuple[str, str]]:
        """rId -> (target path resolved against the part's folder, relationship type suffix)."""
        folder, _, base = part.rpartition("/")
        rel_name = f"{folder}/_rels/{base}.rels"
        if rel_name not in self.names:
            return {}
        out = {}
        for r in self.xml(rel_name):
            target = r.get("Target", "")
            if r.get("TargetMode") == "External":
                out[r.get("Id")] = (target, "external")
                continue
            resolved = str(Path(folder, target)).replace("\\", "/")
            # collapse ../ segments
            parts: list[str] = []
            for seg in resolved.split("/"):
                if seg == "..":
                    parts.pop()
                elif seg and seg != ".":
                    parts.append(seg)
            out[r.get("Id")] = ("/".join(parts), r.get("Type", "").rsplit("/", 1)[-1])
        return out

    def slide_parts(self) -> list[str]:
        pres = self.xml("ppt/presentation.xml")
        rels = self.rels("ppt/presentation.xml")
        return [rels[s.get(R_ID)][0] for s in pres.find("p:sldIdLst", NS)]


def para_texts(el: ET.Element) -> list[str]:
    out = []
    for p in el.iter(f"{{{NS['a']}}}p"):
        s = "".join(t.text or "" for t in p.iter(f"{{{NS['a']}}}t")).strip()
        if s:
            out.append(re.sub(r"\s+", " ", s))
    return out


def shapes(root: ET.Element) -> list[tuple[str, list[str]]]:
    """(kind, lines) for text shapes and tables, in document order."""
    items: list[tuple[str, list[str]]] = []
    tree = root.find("p:cSld/p:spTree", NS)
    if tree is None:
        return items
    for el in tree.iter():
        tag = el.tag.split("}")[-1]
        if tag == "sp":
            ph = el.find("p:nvSpPr/p:nvPr/p:ph", NS)
            kind = (ph.get("type") or "body") if ph is not None else "shape"
            if kind in ("sldNum", "ftr", "dt"):
                continue
            lines = para_texts(el)
            if lines:
                items.append((kind, lines))
        elif tag == "tbl":
            rows = []
            for tr in el.findall("a:tr", NS):
                cells = [" ".join(para_texts(tc)) for tc in tr.findall("a:tc", NS)]
                rows.append(" | ".join(c for c in cells))
            if rows:
                items.append(("table", rows))
    return items


def pictures(root: ET.Element, rels: dict) -> list[dict]:
    """Every picture/video shape on the slide with its media file names."""
    out = []
    for pic in root.iter(f"{{{NS['p']}}}pic"):
        name = pic.find("p:nvPicPr/p:cNvPr", NS).get("name", "")
        blip = pic.find(".//a:blip", NS)
        video = pic.find(".//a:videoFile", NS)
        poster = rels.get(blip.get(R_EMBED), ("", ""))[0] if blip is not None else ""
        clip = rels.get(video.get(R_LINK), ("", ""))[0] if video is not None else ""
        out.append({"shape": name, "image": Path(poster).name, "clip": Path(clip).name})
    return out


# ----------------------------------------------------------------------------- redaction
class Redactor:
    def __init__(self, rules: dict):
        self.withhold = sorted(rules.get("withhold", []), key=len, reverse=True)
        self.token = rules.get("withheld_token", "[name withheld]")

    def text(self, s: str) -> str:
        for w in self.withhold:
            s = s.replace(w, self.token)
        s = EMAIL.sub("[e-mail withheld]", s)
        s = PHONE.sub(lambda m: "[phone withheld]" if sum(c.isdigit() for c in m.group(0)) >= 10 else m.group(0), s)
        return s


# ----------------------------------------------------------------------------- media hygiene
def strip_jpeg(data: bytes) -> bytes:
    """Drop APP1 (EXIF/XMP), APP13 (Photoshop IRB) and COM (free-text comment) segments.
    APP2 (ICC colour profile) is kept — it affects rendering, not privacy."""
    if data[:2] != b"\xff\xd8":
        return data
    out = bytearray(b"\xff\xd8")
    i = 2
    while i + 4 <= len(data):
        if data[i] != 0xFF:
            break
        marker = data[i + 1]
        if marker == 0xDA:  # start of scan — copy the rest verbatim
            out += data[i:]
            return bytes(out)
        length = struct.unpack(">H", data[i + 2 : i + 4])[0]
        seg = data[i : i + 2 + length]
        if marker not in (0xE1, 0xED, 0xFE):  # APP1, APP13, COM
            out += seg
        i += 2 + length
    return bytes(out)


def strip_png(data: bytes) -> bytes:
    sig = b"\x89PNG\r\n\x1a\n"
    if not data.startswith(sig):
        return data
    drop = {b"tEXt", b"zTXt", b"iTXt", b"eXIf", b"tIME"}
    out = bytearray(sig)
    i = 8
    while i + 8 <= len(data):
        length = struct.unpack(">I", data[i : i + 4])[0]
        ctype = data[i + 4 : i + 8]
        chunk = data[i : i + 12 + length]
        if ctype not in drop:
            out += chunk
        i += 12 + length
    return bytes(out)


def strip_metadata(name: str, data: bytes) -> bytes:
    low = name.lower()
    if low.endswith((".jpg", ".jpeg")):
        return strip_jpeg(data)
    if low.endswith(".png"):
        return strip_png(data)
    return data


def apply_edits(data: bytes, edits: dict, out_ext: str) -> bytes:
    im = Image.open(io.BytesIO(data)).convert("RGB")
    if "crop" in edits:
        im = im.crop(tuple(edits["crop"]))
    for box in edits.get("blur", []):
        region = im.crop(tuple(box)).filter(ImageFilter.GaussianBlur(radius=edits.get("blur_radius", 12)))
        im.paste(region, (box[0], box[1]))
    buf = io.BytesIO()
    if out_ext in (".jpg", ".jpeg"):
        im.save(buf, format="JPEG", quality=92, optimize=True)
    else:
        im.save(buf, format="PNG", optimize=True)
    return buf.getvalue()


# ----------------------------------------------------------------------------- main
def humanize(slug: str) -> str:
    return re.sub(r"^s\d{2,3}-", "", Path(slug).stem).replace("-", " ")


def extract(pptx: Path, rules: dict, out: Path) -> tuple[str, dict, dict[str, bytes]]:
    deck = Deck(pptx)
    red = Redactor(rules)
    media_rules: dict = rules["media"]
    clip_rules: dict = rules.get("clips", {})
    omit: dict = {str(k): v for k, v in rules.get("omit_slide_body", {}).items()}
    edits: dict = rules.get("edits", {})

    lines: list[str] = [f"# {rules['title']}", "", rules["preamble"].strip(), ""]
    media_map: dict = {}
    files: dict[str, bytes] = {}
    referenced_media: set[str] = set()

    for n, part in enumerate(deck.slide_parts(), 1):
        root = deck.xml(part)
        rels = deck.rels(part)
        items = shapes(root)
        title = next((t[0] for k, t in items if k in ("title", "ctrTitle")), "")
        if not title:
            for k, t in items:
                cand = t[0]
                if not cand.isdigit() and len(cand) <= 80:
                    title = cand
                    break
        title = rules.get("titles", {}).get(str(n)) or (red.text(title) if title else "(untitled)")
        lines.append(f"## Slide {n} — {title}")
        lines.append("")

        if str(n) in omit:
            lines.append(f"_Body omitted: {omit[str(n)]}._")
        else:
            for kind, tx in items:
                if kind == "table":
                    for row in tx:
                        lines.append(f"- table: {red.text(row)}")
                else:
                    for line in tx:
                        if line == title:
                            continue
                        lines.append(f"- {red.text(line)}")
            # SmartArt
            for rid, (target, typ) in sorted(rels.items()):
                if typ == "diagramData" and target in deck.names:
                    dg = para_texts(deck.xml(target))
                    if dg:
                        lines.append(f"- SmartArt: {red.text(' | '.join(dg))}")
            # notes
            for rid, (target, typ) in sorted(rels.items()):
                if typ == "notesSlide" and target in deck.names:
                    notes = [t for _, tx in shapes(deck.xml(target)) for t in tx if not t.isdigit()]
                    if notes:
                        lines.append(f"- notes: {red.text(' / '.join(notes))}")

        # media on this slide
        pics = pictures(root, rels)
        seen: list[str] = []
        withheld: list[str] = []
        broken: list[str] = []
        for pic in pics:
            for key in ("image", "clip"):
                fn = pic[key]
                if not fn or fn in seen:
                    continue
                seen.append(fn)
                if f"ppt/media/{fn}" not in deck.names:
                    broken.append(fn)  # dangling link in the original (e.g. a video file that was never embedded)
                    continue
                table = clip_rules if key == "clip" else media_rules
                rule = table.get(fn)
                if rule is None:
                    raise SystemExit(f"slide {n}: no rule for media file {fn!r} — every file needs a decision")
                entry = media_map.setdefault(fn, {"slide": n})
                if "exclude" in rule:
                    entry.update(status="excluded", reason=rule["exclude"])
                    withheld.append(f"{key} — {rule['exclude']}")
                elif "pending" in rule:
                    entry.update(status="pending", reason=rule["pending"], name=rule.get("name"))
                    lines.append(f"- clip pending re-encode ({rule.get('name')}): {rule['pending']}")
                else:
                    folder = "clips" if key == "clip" else "media"
                    ext = Path(rule["name"]).suffix.lower()
                    name = f"{folder}/{rule['name']}"
                    if fn not in files:
                        src = f"ppt/media/{fn}"
                        data = deck.zip.read(src)
                        if fn in edits:
                            data = apply_edits(data, edits[fn], ext)
                        else:
                            data = strip_metadata(fn, data)
                        if len(data) > MAX_BYTES:
                            raise SystemExit(f"{fn} → {name} is {len(data)} bytes, over the 2 MiB ceiling")
                        files[name] = data
                    entry.update(status="kept", name=name)
                    desc = rule.get("desc") or humanize(rule["name"])
                    if key == "clip":
                        lines.append(f"- clip: {name} — {desc} (shape “{pic['shape']}”)")
                    else:
                        lines.append(f"- media: {name} — {desc}")
                    referenced_media.add(name)
        if withheld:
            counts: dict[str, int] = {}
            for w in withheld:
                counts[w] = counts.get(w, 0) + 1
            lines.append(
                f"- media withheld ({len(withheld)}): "
                + "; ".join(f"{n} × {w}" if n > 1 else w for w, n in counts.items())
            )
        if broken:
            lines.append(f"- broken media link in the original ({', '.join(broken)}) — nothing to extract")
        lines.append("")

    # media never referenced by a slide (layouts, masters) — recorded, not copied
    for member in sorted(deck.names):
        if member.startswith("ppt/media/"):
            fn = Path(member).name
            if fn not in media_map:
                media_map[fn] = {"slide": 0, "status": "excluded", "reason": "not referenced by any slide (layout/master asset)"}

    ordered = {k: media_map[k] for k in sorted(media_map, key=lambda s: (len(s), s))}
    return "\n".join(lines).rstrip() + "\n", ordered, files


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--pptx", required=True, type=Path)
    ap.add_argument("--rules", required=True, type=Path)
    ap.add_argument("--out", required=True, type=Path)
    ap.add_argument("--verify", action="store_true", help="diff against the committed tree instead of writing")
    args = ap.parse_args()

    rules = json.loads(args.rules.read_text())
    slides_md, media_map, files = extract(args.pptx, rules, args.out)
    map_json = json.dumps(media_map, indent=2, ensure_ascii=False) + "\n"

    if args.verify:
        problems = []
        if (args.out / "slides.md").read_text() != slides_md:
            problems.append("slides.md differs")
        if (args.out / "media-map.json").read_text() != map_json:
            problems.append("media-map.json differs")
        for name, data in files.items():
            p = args.out / name
            if not p.exists() or p.read_bytes() != data:
                problems.append(f"{name} differs or missing")
        print("\n".join(problems) if problems else "verify: reproduced byte-for-byte")
        return 1 if problems else 0

    args.out.mkdir(parents=True, exist_ok=True)
    (args.out / "slides.md").write_text(slides_md)
    (args.out / "media-map.json").write_text(map_json)
    for name, data in files.items():
        p = args.out / name
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_bytes(data)
    kept = sum(1 for m in media_map.values() if m["status"] == "kept")
    excl = sum(1 for m in media_map.values() if m["status"] == "excluded")
    pend = sum(1 for m in media_map.values() if m["status"] == "pending")
    print(f"{args.out}: {kept} kept, {excl} excluded, {pend} pending; {sum(len(d) for d in files.values())/1048576:.1f} MB written")
    return 0


if __name__ == "__main__":
    sys.exit(main())
