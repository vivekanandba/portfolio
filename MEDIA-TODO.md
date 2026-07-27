# Media to add (owner: Vivek)

The LinkedIn rich-media harvest already filled these slots (live on the site): Speech
Intelligence + Sanas for Sales architecture diagrams, DICOM decoder + NGV network diagrams,
the GCP telemetry white paper, HL7 Jupiter deck, TestAI + Jira Analyzer decks, QA burn-up +
ROI charts, and the two AI-Next enablement decks.

Seven photos pulled from gadjoy.in also went live in the Gadjoy "From the bench" grid
(five intake shots, the service bench, and one before/after card).

**How to add a new item:** drop the file at the path below, then either set `image` +
`imageAlt` on the project in `src/content/experience.ts` (one artifact under the intro), add a
`docs: [{ label, file }]` entry in the matching `src/content/caseStudies/*.ts` ("Architecture
& artifacts" links), or add a `gallery: [{ file, alt, wide? }]` entry for a photo grid ("From
the bench"). Images ≤ ~300 KB / ≤ 2000 px wide, JPG; `wide: true` letterboxes a landscape
item across the grid instead of cropping it.

## Remaining gaps

| Project                                                                             | What to supply                                               | Target path                                                     |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------- |
| gadjoy                                                                              | Higher-res shop front + bench (site copies are only ~512 px) | `public/media/gadjoy-shop.jpg`, `public/media/gadjoy-bench.jpg` |
| sanas-consumer-app                                                                  | App Store / device screenshots                               | `public/media/sanas-consumer-app-01.jpg`                        |
| playground                                                                          | Product screenshot (demo page)                               | `public/media/playground-01.jpg`                                |
| sanas-portal                                                                        | Portal screenshot (redact tenant data)                       | `public/media/sanas-portal-01.jpg`                              |
| unified-ml-platform                                                                 | Platform / MLflow dashboard screenshot                       | `public/media/unified-ml-platform-01.jpg`                       |
| vssc-tooling · pw-augmenter · safran-a350 · bmp2-turret · igcar-slipring · lca-navy | Jig / CAD / workshop photos                                  | `public/media/<slug>-01.jpg`                                    |
| rail-tooling                                                                        | Fixture / template photos (metro programs)                   | `public/media/rail-tooling-01.jpg`                              |
| mapshalli-volunteer                                                                 | Air-quality sensor / Stop Hunger photos                      | `public/media/mapshalli-01.jpg`                                 |

## Cautions before publishing

- **Audit every repair/device photo for customer PII before it ships.** Several before/after
  cards on gadjoy.in photograph the device's _About_ screen, which exposes the owner's name,
  serial number, IMEIs, and MAC addresses — e.g. "Sheikh's iPad" (serial + Wi-Fi/Bluetooth MAC)
  and "Dipti's A03" (serial + both IMEIs). Those are excluded here and should come down from
  gadjoy.in too. Only hardware-damage shots and screens with no identifiers are safe.
- **Defence / ISRO / nuclear imagery (BMP-II, FICV, VSSC, IGCAR): check export-control and
  customer NDA terms first.** When in doubt, photograph the tooling drawings' non-sensitive
  corners or use your own workshop shots only.
- **Sanas / NovaSignal product screenshots need employer sign-off** (the architecture diagrams
  now on the site were already public on your LinkedIn profile — screenshots of live product
  UIs are a different category).
- Excluded from the harvest (kept only in the local scratchpad, never publish without review):
  a Confluence "Technical Direction & Roadmap" export, a deck stamped "Private and
  Confidential", and a video-call screen grab showing a colleague.
