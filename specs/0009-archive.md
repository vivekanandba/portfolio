# SPEC-0009 — The era archive

**Status:** Active **Since:** 2026-09-20 **Shipped in:** #71
**Covers:** —
**Routes:** `/archive/<era>/`

## What

Everything from an era that is real but does not warrant a project page: the jigs, fixtures, turned
components, mockups and design services behind the flagship work (ADR-0016). It exists so the record
is complete without the front of the site becoming a catalogue.

Its governing idea is that **an archive is only worth having if nothing is dropped silently.** Every
slide of every source deck is either an entry here or an exclusion with a stated reason. A deck slide
that is neither fails the build.

## Rules

- **R1.** Every slide of every deck maps to an archive entry or to a recorded exclusion with a
  reason. Neither is not an option.
- **R2.** Dates are tri-state: `known` with a label, `unknown`, or `requested` meaning a question is
  outstanding with Vivek. A `requested` date maps to a row in the records table.
- **R3.** An undated entry says so plainly. It does not guess, and it does not apologise.
- **R4.** Entries bind to the rest of the site: an entry that elaborates a project shows on that
  project's page, and the index links the archive.
- **R5.** Every entry's media exists, is credited where third-party, and has been screened.
- **R6.** Archive entries are searchable from the palette, supplied by the server so the client
  palette never grows a dependency on archive content.
- **R7.** Customer names stay withheld unless consent is recorded.

## Verification

```sh
npx vitest run tests/contract/archive.test.ts tests/unit/archive-page.test.tsx
npx playwright test tests/e2e/archive.spec.ts
npx vitest run tests/unit/fallback-branches.test.tsx   # R6, entries with no named customer
```

R1 is the expensive one and the reason this section can be trusted: it walks the decks rather than
the entries, so the failure mode it catches is omission, which no test written from the entry list
would see.

## Not doing

- **Inferring a date from a deck's other slides.** An unknown that is honest beats a guess that
  reads as fact (CON-DATA-001). The tri-state exists so the difference survives.
- **Publishing customer names to make entries more impressive.** Prior publication in a deck is not
  consent.
- **An archive for eras before Legend.** The source material does not exist.

## Revisions

| Date       | Change                                                                         | Covered by                       |
| ---------- | ------------------------------------------------------------------------------ | -------------------------------- |
| 2026-09-20 | Written with R1–R7 from ADR-0016 and the guards already in the contract suite. | `tests/contract/archive.test.ts` |
