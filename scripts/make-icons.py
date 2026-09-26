#!/usr/bin/env python3
"""
Generate the site's marks from the vendored Fraunces.

    scripts/make-icons.py                 # write the icons
    scripts/make-icons.py --verify        # rebuild in memory, compare, write nothing
    scripts/make-icons.py --glyphs VB V   # render a contact sheet of variants to compare

Why a script and not a hand-drawn file: the mark has to exist at four sizes in
three formats, and every one of them has to agree. Generating them from one
declaration means they cannot drift, and `--verify` means the committed files
can be proven to be what this script produces (mirrors scripts/paper-pdf.py).

The typeface is vendored at source/fonts/ under the SIL OFL with its licence
beside it. It is a build input and never reaches the browser; the site loads
Fraunces through next/font.
"""

import argparse
import hashlib
import io
import sys
from pathlib import Path
from typing import Dict, List

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONT = ROOT / "source/fonts/Fraunces[SOFT,WONK,opsz,wght].ttf"

# The light-scheme palette, mirroring globals.css. The mark does not follow the
# theme: a favicon is cached by the browser and shown against its own chrome, so
# one fixed, high-contrast rendering beats two that each look wrong somewhere.
PAPER = (250, 250, 247)
INK = (22, 22, 26)
ACCENT = (29, 78, 216)

# Fraunces is variable, and the axes are chosen per output size — which is the
# whole point of an optical-size axis and the reason this is generated rather
# than drawn once and scaled.
#
# Wonky is forced off (it defaults to 1) because its quirky alternates turn to
# mush below 32px. Optical Size is the interesting one: the display grade (144)
# is high-contrast and beautiful at 180px, but its hairlines disappear entirely
# when a 16px favicon is rasterised. Small marks therefore use a low optical
# size — the text grade, with sturdier thin strokes — and a heavier weight to
# hold them up.
def axes_for(size: int) -> dict:
    if size >= 128:
        return {"opsz": 144.0, "wght": 600.0, "SOFT": 0.0, "WONK": 0.0}
    if size >= 48:
        return {"opsz": 48.0, "wght": 650.0, "SOFT": 0.0, "WONK": 0.0}
    return {"opsz": 9.0, "wght": 800.0, "SOFT": 0.0, "WONK": 0.0}

# Rendered at 8x and downsampled. Direct rendering of a serif at 16px loses the
# thin strokes entirely; supersampling keeps them as grey and the letter stays
# readable as a shape.
SUPERSAMPLE = 8

# Proportions, as fractions of the canvas. Tuned so the cap height and the rule
# together sit optically centred rather than mathematically centred.
CAP_HEIGHT = 0.56
RULE_WIDTH = 0.46
RULE_THICKNESS = 0.085
RULE_GAP = 0.12

# Below this the accent rule is a single grey pixel that reads as dirt, so the
# smallest mark is the letterform alone.
RULE_MIN_SIZE = 24

ICO_SIZES = (16, 32, 48)

# Android masks installed icons into a circle, a squircle or a rounded square
# and crops whatever falls outside. The W3C safe zone is a circle of 80%
# diameter, and the mark is a rectangle — so it has to shrink until its corners
# sit inside that circle, not until it looks roughly centred. 0.72 left 741 ink
# pixels outside the zone and 0.60 left five; 0.58 is where the count is zero,
# measured, with the paper running edge to edge so any crop cuts background.
MASKABLE_SCALE = 0.58


def load_font(px: int, size: int) -> ImageFont.FreeTypeFont:
    a = axes_for(size)
    font = ImageFont.truetype(str(FONT), px)
    font.set_variation_by_axes([a["opsz"], a["wght"], a["SOFT"], a["WONK"]])
    return font


def draw_mark(size: int, glyphs: str, maskable: bool = False) -> Image.Image:
    """One square mark: glyphs in ink on paper, an accent rule beneath.

    `maskable` shrinks the content into the safe zone an OS mask leaves alone;
    the paper still fills the whole square, which is what makes it maskable.
    """
    s = size * SUPERSAMPLE
    img = Image.new("RGB", (s, s), PAPER)
    d = ImageDraw.Draw(img)

    # Size the type by measured cap height rather than nominal point size, so
    # "V" and "VB" come out the same height.
    shrink = MASKABLE_SCALE if maskable else 1.0
    rule = size >= RULE_MIN_SIZE
    target = s * CAP_HEIGHT * shrink
    px = int(target * 1.4)
    for _ in range(24):
        font = load_font(px, size)
        box = d.textbbox((0, 0), glyphs, font=font)
        height = box[3] - box[1]
        if height <= 0:
            break
        scale = target / height
        if 0.995 <= scale <= 1.005:
            break
        px = max(1, int(px * scale))
    font = load_font(px, size)

    box = d.textbbox((0, 0), glyphs, font=font)
    width = box[2] - box[0]
    height = box[3] - box[1]
    block = height + (s * RULE_GAP + s * RULE_THICKNESS if rule else 0)
    top = (s - block) / 2

    d.text((s / 2 - width / 2 - box[0], top - box[1]), glyphs, font=font, fill=INK)

    if rule:
        rule_w = s * RULE_WIDTH * shrink
        rule_y = top + height + s * RULE_GAP
        d.rectangle(
            [s / 2 - rule_w / 2, rule_y, s / 2 + rule_w / 2, rule_y + s * RULE_THICKNESS],
            fill=ACCENT,
        )

    return img.resize((size, size), Image.LANCZOS)


def png_bytes(size: int, glyphs: str, maskable: bool = False) -> bytes:
    buf = io.BytesIO()
    # optimize=True is deterministic; Pillow writes no timestamp chunk, so the
    # same inputs give the same bytes and --verify means something.
    draw_mark(size, glyphs, maskable).save(buf, format="PNG", optimize=True)
    return buf.getvalue()


def ico_bytes(glyphs: str) -> bytes:
    """Each entry rendered natively, not downsampled from the largest.

    Passing one image and a `sizes` list lets Pillow resize internally, which
    would hand the 16px entry a shrunken copy of the 48px render — the display
    grade, hairlines and all, which is the exact thing axes_for() exists to
    avoid. `append_images` keeps each size the one this script drew for it.
    """
    buf = io.BytesIO()
    marks = [draw_mark(n, glyphs) for n in sorted(ICO_SIZES, reverse=True)]
    marks[0].save(
        buf,
        format="ICO",
        sizes=[(n, n) for n in sorted(ICO_SIZES, reverse=True)],
        append_images=marks[1:],
    )
    return buf.getvalue()


def outputs(glyphs: str) -> Dict[Path, bytes]:
    return {
        # Next file conventions: linked from <head> with the base path applied.
        ROOT / "src/app/icon.png": png_bytes(32, glyphs),
        ROOT / "src/app/apple-icon.png": png_bytes(180, glyphs),
        # The legacy request every browser makes without being told to.
        ROOT / "public/favicon.ico": ico_bytes(glyphs),
        # Referenced from the web manifest only (SPEC-0004). 192 and 512 are the
        # two sizes an install prompt requires; the maskable one is what Android
        # actually puts on the home screen.
        ROOT / "public/icon-192.png": png_bytes(192, glyphs),
        ROOT / "public/icon-512.png": png_bytes(512, glyphs),
        ROOT / "public/icon-512-maskable.png": png_bytes(512, glyphs, maskable=True),
    }


def contact_sheet(variants: List[str], out: Path) -> None:
    """Every variant at every real size, on one image, for looking at."""
    sizes = [16, 32, 48, 180, 192]
    pad, label = 24, 28
    width = pad + sum(s + pad for s in sizes) + 192 + pad
    height = pad + len(variants) * (max(sizes) + label + pad)
    sheet = Image.new("RGB", (width, height), (255, 255, 255))
    d = ImageDraw.Draw(sheet)
    y = pad
    for glyphs in variants:
        x = pad
        for s in sizes:
            sheet.paste(draw_mark(s, glyphs), (x, y + max(sizes) - s))
            d.text((x, y + max(sizes) + 6), f"{glyphs} {s}px", fill=(90, 90, 100))
            x += s + pad
        sheet.paste(draw_mark(192, glyphs, maskable=True), (x, y))
        d.text((x, y + max(sizes) + 6), f"{glyphs} maskable", fill=(90, 90, 100))
        y += max(sizes) + label + pad
    out.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(out)
    print(f"contact sheet: {out}  ({', '.join(variants)})")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--glyphs", nargs="+", metavar="G",
                    help="render a contact sheet of these variants instead of writing icons")
    ap.add_argument("--sheet", default="screenshots/icon-variants.png")
    ap.add_argument("--mark", default="VB", help="the glyphs the real icons use")
    ap.add_argument("--verify", action="store_true",
                    help="rebuild and compare against the committed files; write nothing")
    args = ap.parse_args()

    if not FONT.exists():
        print(f"missing vendored font: {FONT}", file=sys.stderr)
        return 2

    if args.glyphs:
        contact_sheet(args.glyphs, Path(args.sheet))
        return 0

    built = outputs(args.mark)

    if args.verify:
        drift = []
        for path, data in built.items():
            rel = path.relative_to(ROOT)
            if not path.exists():
                drift.append(f"{rel}: missing")
            elif path.read_bytes() != data:
                drift.append(f"{rel}: DIFFERS from what this script produces")
            else:
                print(f"  ok  {rel}  {len(data):,} bytes  {hashlib.sha256(data).hexdigest()[:12]}")
        if drift:
            print("\nverify failed:", file=sys.stderr)
            for line in drift:
                print(f"  {line}", file=sys.stderr)
            return 1
        print(f"\nverify: all {len(built)} marks reproduced byte-for-byte")
        return 0

    for path, data in built.items():
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)
        print(f"  {path.relative_to(ROOT)}  {len(data):,} bytes  "
              f"{hashlib.sha256(data).hexdigest()[:12]}")
    return 0


raise SystemExit(main())
