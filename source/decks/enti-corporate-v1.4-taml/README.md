# ENTI Innovations — corporate presentation v1.4 (to Tata Advanced Materials)

|                   |                                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Author            | Vivekanand B (at ENTI Innovations Pvt. Ltd., the design arm of the Legend Technologies group)                                                          |
| Presented by / to | Dr. E. Ranga Reddy (founder) to Tata Advanced Materials                                                                                                |
| Date (by content) | 2013 — Aero India 2013, Indian Technology Congress 2013, India Composites Show 2013                                                                    |
| Slides            | 48                                                                                                                                                     |
| Original          | GitHub Release **`source-decks-2026-09`**, asset `Enti-Corporate v1.4 - TAML.pptx`, 259,083,567 bytes (two embedded WMV recordings account for 190 MB) |
| sha256            | `75218317c1468df14084ab2458420a3a88eee9d0075bb040f9abb6028504f793`                                                                                     |
| Extracted with    | `scripts/deck-extract.py` + `scripts/deck-rules/enti-corporate-v1.4-taml.json` (reproducible; see below)                                               |

The deck carries the company's own "confidential" footers. The owner authored it, states it was presented
to clients and posted publicly, and has directed its use here. Third-party **personal** data is redacted
regardless (ADR-0007: prior publication is not consent).

## What is here

- `slides.md` — the redacted transcript. Slides 40 and 41 carry template text copied from the wander-light
  case in the original; their images are the content.
- `media/` — 34 screened images at original resolution (CAD renders, FEA plots, photographs), metadata
  stripped losslessly.
- `clips/` — 6 kinematic-simulation clips of the BMP-II turret study, copied verbatim (each under the
  2 MiB ceiling). Six further clips are **pending** re-encoding under the ceiling (ADR-0014 pipeline):
  the combined elevation-and-traverse simulation and the five position-light qualification animations.
- `media-map.json` — every one of the 102 media files in the original: kept, excluded (with reason),
  or pending (with reason).

## Redaction log

**Text.** Names of third parties are replaced with `[name withheld]` (23 strings; the founder is the one
exception). Slide bodies omitted with a stated reason: 16 (management roster), 17 (advisory board),
19, 20, 22 (biographies), 48 (e-mail addresses). The organisation chart on slide 18 keeps its structure
and the owner's own line — "Vivekanand B (Technical Manager)" — with all other staff names withheld.

**Media** — 56 excluded and 6 pending of 102 files:

| Files | Reason                                                                               |
| ----- | ------------------------------------------------------------------------------------ |
| 17    | portrait of a third party                                                            |
| 10    | customer logo — trademark; the customer list is kept as text                         |
| 8     | accreditation or partner logo — trademark; the accreditation is kept as text         |
| 6     | company logo — trademark                                                             |
| 4     | event photograph with identifiable people; the event is kept as text                 |
| 4     | identifiable people in frame (ADR-0007: prefer people-free frames)                   |
| 4     | stock-photo industry collage — not the company’s imagery                             |
| 3     | not referenced by any slide (layout/master asset)                                    |
| 2     | 2.0 MB original just exceeds the 2 MiB ceiling; re-encode with ffmpeg                |
| 1     | 2.9 MB original exceeds the 2 MiB ceiling; re-encode with ffmpeg                     |
| 1     | 3.5 MB original exceeds the 2 MiB ceiling; re-encode with ffmpeg                     |
| 1     | 4.7 MB original exceeds the 2 MiB ceiling; re-encode with ffmpeg                     |
| 1     | 6.9 MB original exceeds the 2 MiB ceiling; re-encode with ffmpeg (ADR-0014 pipeline) |

Slide 37 also contains a dangling video link in the original (`NULL`); there was nothing to extract.

## What this deck evidences for the site

| Slide        | Evidence                                                                                                                                                                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 13           | ENTI's accreditations: CEMILAC-certified for detailed design, optimisation and analysis of airframe structural parts; DRDO-certified for design and FMEA; ISO 9001:2008                                                                   |
| **18**       | **Organisation chart: "Vivekanand B (Technical Manager)" heading the design team**                                                                                                                                                        |
| 24–25        | CFM56 workstation adapter reverse-engineered from photographs only; erected at the client's premises                                                                                                                                      |
| 26–27        | S200 nose-cone integration fixture: ~4 m tall, 1+ month for modelling, fabrication and assembly                                                                                                                                           |
| 28–29        | Composite canopy trolley for the LCA — light for frequent air transport                                                                                                                                                                   |
| 30–31        | PSLV strap-on nose cones (PSOM, SITVC, non-SITVC): detailed process sheets "followed by the manufacturing unit"                                                                                                                           |
| 32–33        | Miniature slip rings: 5 µm tolerances; indigenisation against imports                                                                                                                                                                     |
| 34–35        | BMP-II turret for BEL's FICV: "2,000 drawings in a span of 4 months" (the 2013 estimate; the resume and site carry 3,000), simulations of every mechanism — seven renders and seven clips                                                 |
| 36–37        | Position light: indigenised opto-electronic unit, 100×90×50 mm, aerodynamic placement on the landing gear; qualification simulated before hardware (altitude, high/low temperature, thermal shock, natural-frequency sweep, transit drop) |
| 38–39        | Wander light: 110×110×50 mm with a 1.5 m retractable cord; composite prototypes shown to pilots                                                                                                                                           |
| 40           | Filament winding for gas pipelines — Siemens                                                                                                                                                                                              |
| 2 (SmartArt) | Design & product engineering services: modelling, drafting, GD&T, engineering changes, manufacturing process drawings, inspection documents, assembly floor sheets, acceptance test procedures                                            |

## Reproduce

```sh
python3 scripts/deck-extract.py --pptx "Enti-Corporate v1.4 - TAML.pptx" \
  --rules scripts/deck-rules/enti-corporate-v1.4-taml.json --out source/decks/enti-corporate-v1.4-taml --verify
```

Requires Python 3 with Pillow and the original from the release (`gh release download source-decks-2026-09`).
