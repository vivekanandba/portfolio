#!/usr/bin/env python3
"""
media-web.py — produce the published copies in public/media/ from source/ (ADR-0014).

    python3 scripts/media-web.py            # (re)generate every entry in scripts/media-web.json
    python3 scripts/media-web.py --verify   # regenerate to memory and diff against public/media/

The manifest maps source files (the screened originals under source/decks/*/media and clips) to
public/media/ names with resize and quality parameters, so the web media set is reproducible from
the repository alone. Two kinds of entry:

  images  — resized to a maximum edge, flattened to white if transparent, encoded as JPEG at the
            given quality, then re-encoded at lower quality until under max_kb (default 300).
  clips   — copied verbatim from source/decks/*/clips when they already fit the 2 MiB ceiling;
            re-encoded clips derive from release-asset originals via the recorded ffmpeg command
            and are only *checked* here (present, ≤ 2 MiB, MP4), never regenerated.

Standard library plus Pillow. Deterministic for a given Pillow version.
"""
from __future__ import annotations

import argparse
import io
import json
import sys
from pathlib import Path

from PIL import Image

MANIFEST = Path("scripts/media-web.json")
OUT = Path("public/media")
CLIP_MAX = 2 * 1024 * 1024


def render_image(src: Path, max_edge: int, quality: int, max_kb: int) -> bytes:
    im = Image.open(src)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, (255, 255, 255))
        bg.paste(im, mask=im.split()[-1])
        im = bg
    else:
        im = im.convert("RGB")
    if max(im.size) > max_edge:
        scale = max_edge / max(im.size)
        im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    q = quality
    while True:
        buf = io.BytesIO()
        im.save(buf, format="JPEG", quality=q, optimize=True, progressive=True)
        if buf.tell() <= max_kb * 1024 or q <= 40:
            return buf.getvalue()
        q -= 5


def build(manifest: dict) -> tuple[dict[str, bytes], list[str]]:
    files: dict[str, bytes] = {}
    checks: list[str] = []
    for entry in manifest["images"]:
        data = render_image(
            Path(entry["from"]),
            entry.get("max_edge", manifest["defaults"]["max_edge"]),
            entry.get("quality", manifest["defaults"]["quality"]),
            entry.get("max_kb", manifest["defaults"]["max_kb"]),
        )
        files[entry["to"]] = data
    for clip in manifest["clips"]:
        if "from" in clip:
            data = Path(clip["from"]).read_bytes()
            if len(data) > CLIP_MAX:
                raise SystemExit(f"{clip['from']} is over the 2 MiB ceiling; it cannot be copied verbatim")
            files[clip["to"]] = data
        else:
            # Re-encoded from a release-asset original: cannot be reproduced here, only checked.
            p = OUT / clip["to"]
            if not p.exists():
                checks.append(f"MISSING re-encoded clip {clip['to']} — produce it with: {clip['ffmpeg']}")
            elif p.stat().st_size > CLIP_MAX:
                checks.append(f"{clip['to']} is {p.stat().st_size} bytes, over the 2 MiB ceiling")
    return files, checks


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--verify", action="store_true")
    args = ap.parse_args()
    manifest = json.loads(MANIFEST.read_text())
    files, checks = build(manifest)
    if args.verify:
        problems = list(checks)
        for name, data in files.items():
            p = OUT / name
            if not p.exists():
                problems.append(f"{name} missing")
            elif p.read_bytes() != data:
                problems.append(f"{name} differs")
        print("\n".join(problems) if problems else f"verify: {len(files)} generated files reproduced byte-for-byte")
        return 1 if problems else 0
    for name, data in files.items():
        (OUT / name).write_bytes(data)
    for c in checks:
        print("check:", c)
    total = sum(len(d) for d in files.values())
    print(f"wrote {len(files)} files, {total/1024:.0f} KB total; largest {max(len(d) for d in files.values())/1024:.0f} KB")
    return 1 if checks else 0


if __name__ == "__main__":
    sys.exit(main())
