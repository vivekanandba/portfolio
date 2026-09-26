# SPEC-0007 — Projects

**Status:** Active **Since:** 2026-09-20 **Shipped in:** #71
**Covers:** Selected Work
**Routes:** `/work/` · `/work/<slug>/` · `/work/<slug>/opengraph-image`

## What

The Selected Work section, the project index, and a page per project. The evidence half of the site:
everything else argues, this shows.

**The word is "projects", never "case studies"** (ADR-0002). The route is `/work/` for the same
reason. The internal type is still `CaseStudy`, which is a wart, but renaming a type is not worth a
migration that touches every content file.

## Rules

- **R1.** One page per system, not per engagement (ADR-0009). Two pieces of work on the same system
  are one page with two chapters.
- **R2.** Every project page carries the full article structure: the problem, constraints, decisions
  and tradeoffs, and measured results.
- **R3.** Every metric on a page appears in the project's record. Nothing is stated on a page that
  the data does not hold.
- **R4.** Four flagship projects are visible; the rest are behind disclosure, and earlier work is
  grouped into era chapters (ADR-0004).
- **R5.** Every card links to its page, and every page is reachable from the index and the landing
  section.
- **R6.** Third-party media carries a visible credit (ADR-0006), and every image has been screened
  for other people's information before publication (ADR-0007).
- **R7.** Clips are motion evidence, silent, captioned, never autoplaying, and each carries a poster
  from the same source (ADR-0014).
- **R8.** Each page emits its own OpenGraph card at build (SPEC-0004 R6).
- **R9.** The page bar fits its row at every width. Below the small breakpoint it holds the owner's
  short form (SPEC-0004 R16), the way back and the resume, and folds the Writing link away — at
  360px the three did not fit beside even the short form with it; from the small breakpoint the
  full name and the link return.

## Verification

```sh
npx vitest run tests/unit/project-pages.test.tsx
npx vitest run tests/contract/content.test.ts     # R3, R6, R7
npx playwright test tests/e2e/case-studies.spec.ts
npx playwright test tests/e2e/nav.spec.ts --project=desktop   # R9, the bar at eight widths
npm run test:visual                               # the project-header baseline
```

## Not doing

- **Renaming the `CaseStudy` type** to match the user-facing word. The copy is what readers see and
  it is already right; the type name is a migration with no reader-facing benefit.
- **A filter or search on the index.** The palette already searches projects by tag.
- **Client logos.** Third-party marks carry consent questions that ADR-0007 does not answer.

## Revisions

| Date       | Change                                                                                                                                                                                                                                                                                                                       | Covered by                                         |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| 2026-09-26 | R9 added. Measured while checking where the owner's full name fits: on a phone the bar wrapped the surname onto a second line beside a wrapped "All projects", and at 360px even the short form wrapped beside the three links. The bar now shows the short form and folds the Writing link away below the small breakpoint. | `tests/e2e/nav.spec.ts`, `tests/unit/nav.test.tsx` |
| 2026-09-20 | Written with R1–R8, gathering rules that lived across ADR-0002, -0004, -0006, -0007, -0009 and -0014.                                                                                                                                                                                                                        | `tests/unit/project-pages.test.tsx`                |
