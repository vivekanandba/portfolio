# SPEC-0012 — Content and media

**Status:** Active **Since:** 2026-09-20 **Shipped in:** #71
**Covers:** —
**Routes:** every route, through the data they render

## What

Where everything the site says comes from, and the rules that decide whether it may be said at all.

Content is typed data in `src/content`, validated by Zod when it is imported, so a malformed record
fails the build rather than rendering as `undefined` on a page. The source material it derives from —
decks, the resume, dictated notes, the NAMS paper, records tables — lives in `source/` with its
provenance (ADR-0013).

**This is the spec with the sharpest teeth, because its failures are not bugs.** A wrong metric is
embarrassing. A third party's name published without consent, or a photograph carrying somebody
else's information, is a harm to a person who never agreed to be on this site.

## Rules

- **R1.** Every content record validates against its schema at import. Nothing reaches a page
  unvalidated.
- **R2.** A claim on the site is checkable against a source (ADR-0008). Claims are supported and
  cited, refuted and closed, or open and labelled — never implied.
- **R3.** Third-party media carries a visible credit (ADR-0006), test-enforced by filename prefix.
- **R4.** Every image is opened and inspected before publication for other people's information:
  names, serials, plates, faces, signatures (ADR-0007). **Prior publication is not consent.**
- **R5.** Third-party names stay withheld unless consent is recorded.
- **R6.** Media budgets hold: clips at most 2 MiB, posters at most 300 KB, every clip with alt text,
  a poster and a credit where due.
- **R7.** `source/` carries no personal data export, no credentials, and a hash for each committed
  original.
- **R8.** No placeholder text ships. No `TODO`, no `TBD`.
- **R9.** The site speaks in the first person singular, and states no uncertainty about its own
  record. Hedging that reads as though the author doubts his own history is not honesty; it is
  noise, and it is guarded against by pattern.
- **R10.** Contradictions between sources are recorded, not silently reconciled.

## Verification

```sh
npx vitest run tests/contract/content.test.ts tests/contract/source.test.ts
npx vitest run tests/contract/legend-hub.test.ts
npm run verify:infra    # R9, against the deployed site
```

R4 cannot be automated and is not pretended to be: the test checks that a credit exists, not that a
human looked. The looking is a step in the process, and the record of it is the commit.

## Not doing

- **Loosening the schema to accept a record that does not fit.** The shape is the contract; a record
  that will not fit is usually a record that needs a decision first.
- **Publishing the LinkedIn export, or anything derived from its private files.** Only the
  public-profile CSVs may be read, and the export lives outside the working tree.
- **Automating the privacy screen.** A model that says an image is clean is a claim nobody checked.

## Revisions

| Date       | Change                                                                                                           | Covered by                       |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| 2026-09-20 | Written with R1–R10, gathering ADR-0006, -0007, -0008 and -0013 with the disclaimer-language guard added in #60. | `tests/contract/content.test.ts` |
