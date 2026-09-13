# My photographs

One folder per item, named by the id in the **Photos folder** column of
`../records/legend-programmes.md` (for example `rlv-td-jig/`). Any filename inside — lower-case
`a-z`, `0-9`, `-`; `.jpg`, `.jpeg` or `.png`; each ≤ 2 MiB (the hygiene gate refuses larger files;
bigger originals go to a GitHub Release, as the decks did).

Each folder carries a `manifest.json` — an array, one entry per file:

```json
[
  {
    "file": "on-the-jig.jpg",
    "item": "rlv-td-jig",
    "month": "2016-03",
    "caption": "RLV-TD on the assembly jig the week before it left — I ran the fit checks."
  }
]
```

- `"file"` — the filename in this folder; every file in the folder must be listed.
- `"item"` — the folder name, which is the id from the records table.
- `"month"` — `YYYY-MM`, or `unknown`. An honest unknown beats a guess (CON-DATA-001).
- `"caption"` — one sentence in my words; it becomes the site caption, with a `Role:` tag.

Before anything is committed here it is opened and screened (ADR-0007): no identifiable third
party without consent, no number plates, serials or contact details, no controlled documents.
EXIF and GPS are stripped when the web copy is made (`scripts/media-web.py`, recorded in
`scripts/media-web.json`); web copies land under `public/media/` with the credit
`Photo: my archive`. My own face is fine when the caption says it is me.

Test-checked (`tests/source.test.ts`): manifest present, every listed file exists, nothing
unlisted, months well-formed, item ids match the folder.
