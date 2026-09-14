#!/usr/bin/env python3
"""
paper-pdf.py — assemble the published NAMS 2015 paper into a served PDF (ADR-0013).

    python3 scripts/paper-pdf.py --src <dir-of-page-photos> --out public/papers/<name>.pdf
    python3 scripts/paper-pdf.py --src <dir> --out <pdf> --verify   # rebuild in memory and compare

The inputs are photographs of the printed proceedings, taken by Vivek. They are NOT in the
repository (each is ~3 MB, over the 2 MiB hygiene ceiling, and the PDF is the artefact the site
serves). The page ORDER and the processing parameters live here so the PDF is reproducible from
the same photographs, and its sha256 is pinned in the source README.

Pages are deskew-free by design: no cropping or content edits, only downscale to a readable width,
greyscale, and JPEG compression, so the served PDF is a faithful reproduction of what is printed.
"""
from __future__ import annotations

import argparse
import hashlib
import io
import re
import sys
from pathlib import Path

from PIL import Image

# Page order: the volume cover, the contents page carrying this paper's index line, then the
# paper itself, pages 288-295. Keys are the upload filenames as received.
PAGES = [
    ("ef604040-image.jpg", "cover — NAMS 2015 proceedings"),
    ("16039b39-image.jpg", "contents — F17 at page 288"),
    ("e9ed987b-image.jpg", "p288 — title, authors, abstract, introduction"),
    ("63bdaacb-image.jpg", "p289 — design, material selection, preliminary design"),
    ("8bd48286-image.jpg", "p290 — Table 1 preliminary calculation sheet, detail design"),
    ("fa56a68e-image.jpg", "p291 — Figure 1 slip-ring assembly, analysis"),
    ("8629ca41-image.jpg", "p292 — Table 2 analysis load cases, production"),
    ("be238127-image.jpg", "p293 — Table 3 process plan sheet, testing and after-sales"),
    ("bddb46a0-image.jpg", "p294 — Table 4 quality assurance plan, conclusion"),
    ("06b95847-image.jpg", "p295 — references"),
]
WIDTH = 1240      # readable for printed body text; resolution matters more than JPEG quality here
QUALITY = 60     # tuned so the ten-page PDF stays under the 2 MiB hygiene ceiling
MAX_BYTES = 2 * 1024 * 1024
PDF_DATE = b"D:20151127000000Z"  # the paper's presentation date, for a deterministic build


def render(src: Path) -> list[Image.Image]:
    out = []
    for name, _label in PAGES:
        p = src / name
        if not p.exists():
            raise SystemExit(f"missing page photograph: {p}")
        im = Image.open(p).convert("L")  # greyscale: printed text, no colour information lost
        if im.width > WIDTH:
            h = round(im.height * WIDTH / im.width)
            im = im.resize((WIDTH, h), Image.LANCZOS)
        out.append(im)
    return out


def build(src: Path) -> bytes:
    pages = render(src)
    buf = io.BytesIO()
    pages[0].save(
        buf,
        format="PDF",
        save_all=True,
        append_images=pages[1:],
        quality=QUALITY,
        title="A Typical Development of High Amperage Slip Ring — NAMS 2015",
        author="Ranga Reddy and B. Vivekanand",
    )
    # Pillow stamps the build time into /CreationDate and /ModDate, which would make the
    # output differ on every run. Substitute the paper's presentation date, same byte length
    # so the xref offsets stay valid — now the PDF is reproducible and --verify means something.
    return re.sub(rb"D:\d{14}Z", PDF_DATE, buf.getvalue())


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", required=True, type=Path)
    ap.add_argument("--out", required=True, type=Path)
    ap.add_argument("--verify", action="store_true")
    args = ap.parse_args()

    data = build(args.src)
    digest = hashlib.sha256(data).hexdigest()
    if args.verify:
        if not args.out.exists():
            print(f"verify: {args.out} does not exist")
            return 1
        have = args.out.read_bytes()
        same = hashlib.sha256(have).hexdigest() == digest
        print(f"verify: {'reproduced byte-for-byte' if same else 'DIFFERS from the committed PDF'}")
        return 0 if same else 1

    if len(data) > MAX_BYTES:
        print(f"{len(data)} bytes exceeds the 2 MiB ceiling — lower WIDTH or QUALITY", file=sys.stderr)
        return 1
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_bytes(data)
    print(f"wrote {args.out} — {len(data) // 1024} KB, {len(PAGES)} pages, sha256 {digest}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
