# Legend Technologies — company capability deck v5.5

|                   |                                                                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Author            | Vivekanand B (at Legend Technologies (India) Pvt. Ltd.)                                                                                   |
| Presented to      | Kinetix Engineering Pvt. Ltd.                                                                                                             |
| Date (by content) | 2017–2018 — the deck shows Aero India 2017 and FY2016–17 figures; the intro text ("fourteen years") was written earlier and never updated |
| Slides            | 99                                                                                                                                        |
| Original          | GitHub Release **`source-decks-2026-09`**, asset `Legend.Company.-.V5.5.pptx` (GitHub replaces spaces with dots), 28,169,926 bytes        |
| sha256            | `0a83f9e215367fa9fefb9ddb03d539efb021d0279a7f2ee9eae9565a72effdba`                                                                        |
| Extracted with    | `scripts/deck-extract.py` + `scripts/deck-rules/legend-company-v5.5.json` (reproducible; see below)                                       |

The deck carries the company's own "confidential" footers. I authored it, presented it to clients and posted it
publicly, and I have directed its use here. Third-party **personal** data is redacted
regardless (ADR-0007: prior publication is not consent).

## What is here

- `slides.md` — the redacted transcript, one heading per slide, with each kept image referenced by path
  and each withheld image counted with its reason.
- `media/` — 116 screened images at original resolution, renamed `sNN-<subject>.<ext>` (NN = slide).
  EXIF/XMP/text metadata is stripped losslessly; pixels are byte-identical to the originals.
- `media-map.json` — every one of the 188 media files in the original: kept (with its new name)
  or excluded (with the reason).

## Redaction log

**Text.** Names of third parties are replaced with `[name withheld]` (13 strings; the founder
E. Ranga Reddy, already named on the live site, is the one exception). Slide bodies omitted with a stated
reason: 71–73 (biographies of third parties), 77 (private company financials), 99 (contact details).
E-mail addresses and phone-shaped numbers are scrubbed as a safety net.

**Media** — 72 of 188 files excluded:

| Files | Reason                                                                                         |
| ----- | ---------------------------------------------------------------------------------------------- |
| 33    | company or customer logo — trademark; the customer list is kept as text                        |
| 23    | identifiable people in frame (ADR-0007: prefer people-free frames)                             |
| 4     | award-ceremony photograph — identifiable people; award names and years kept as text            |
| 4     | near-duplicate thumbnail under 300 px                                                          |
| 4     | portrait of a third party                                                                      |
| 2     | vehicle number plate legible                                                                   |
| 1     | EMF vector drawing — unsupported format; the same jig is shown in the photographs on the slide |
| 1     | controlled quality-manual page (organisation chart) — not mine to publish                      |

**Edits.** `s37-lca-mockup-road-transport.jpeg` is cropped to remove two cars whose number plates were
legible and has two faces blurred (declared in the rules file; re-encoded by Pillow, so this one file is
not byte-identical to its original).

## What this deck evidences for the site

| Slide       | Evidence                                                                                                                                                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4           | Company profile: medium-scale precision engineering for aerospace & defence; VSSC/ISRO licensee for precision slip rings (the company's stated position)                                                                                                |
| 7–16, 18–26 | The programme portfolio: LCA/LCH/ALH/IJT/Jaguar jigs, GSLV Mk III and GSLV fin assemblies, PSLV SITVC and SONC nose cones, RLV-TD jig, S200 integration fixture, CFM56 workstation adapter, PW1100G augmenter, Nagpur test cell, BEML spot-weld fixture |
| 39–45       | Slip-ring technology: ToT from VSSC (2000) and the upgraded architecture (BeCu wire, electrode-grade copper U-groove rings, gold plating, PCB, IP sealing, epoxy potting; 15-year life)                                                                 |
| 46–58, 64   | Twelve slip-ring configurations, 6–108 channels, with customers and quantities                                                                                                                                                                          |
| 58          | The IGCAR / Godrej high-amperage slip ring — installation photographs and exploded CAD                                                                                                                                                                  |
| **60**      | **Slip-ring division team table: "Design — Vivekanand B"**                                                                                                                                                                                              |
| 66–69       | LCA TD1/TD2 modification and transport, composite canopy trolley, GSLV access platform                                                                                                                                                                  |
| 80–86       | Facilities: hangar, CNC turning and machining centres, clean room, inspection room, rotational test rig                                                                                                                                                 |
| 97–98       | ISO 9001:2015 and AS9100D certificates dated 30 May 2018 — **after my time there (to Jan 2018); not claimed on the site**                                                                                                                               |

## Reproduce

```sh
python3 scripts/deck-extract.py --pptx "Legend Company - V5.5.pptx" \
  --rules scripts/deck-rules/legend-company-v5.5.json --out source/decks/legend-company-v5.5 --verify
```

Requires Python 3 with Pillow and the original from the release (`gh release download source-decks-2026-09`).
