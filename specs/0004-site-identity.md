# SPEC-0004 — Site identity

**Status:** Active **Since:** 2026-09-20 **Shipped in:** #71
**Covers:** —
**Routes:** `/404` · `/sitemap.xml` · `/version.json` · the document shell on every route

## What

Everything a browser, a crawler or a social card sees before it sees any content: the document
shell, the metadata, the sitemap, the 404, and the marks that identify the site in a tab or a link
preview.

This spec exists because its absence was the original bug report. **The site had no favicon**, and
nothing anywhere would ever have said so — every other surface had an ADR or a test, and this one
had a row in SPEC and nothing else. A missing icon is a small thing; a whole category of surface
with no owner is not.

What exists today is listed honestly below, including what is still missing. This is the spec the
delight work amends first.

## Rules

- **R1.** Every route emits a title and a description. No page ships with the site default in place
  of its own.
- **R2.** Every route carries a canonical URL including the configured base path. Dropping the base
  path is silent and poisons search results.
- **R3.** The document carries a Content-Security-Policy and a referrer policy (SPEC-0002).
- **R4.** Structured data is emitted once, as a `Person`, and is valid JSON.
- **R5.** The theme is applied before paint, from a saved choice when there is one and the operating
  system preference otherwise, with no flash and no failure when storage is unavailable.
- **R6.** Every project and post has its own OpenGraph card, generated at build, using only glyphs
  the bundled font can draw (SPEC-0002).
- **R7.** `sitemap.xml` lists every route with absolute URLs; `version.json` states the commit
  (SPEC-0003).
- **R8.** The 404 page renders, is accessible, and is served by GitHub Pages for any unknown path.

## Verification

```sh
npx vitest run tests/unit/root-layout.test.ts tests/unit/seo.test.ts
npx vitest run tests/a11y/pages.test.tsx      # R8
npm run verify:infra                          # R2, R3, R7 against the deployed site
```

## Not doing

- **A favicon, an apple-touch icon, a web manifest or a site-level OpenGraph card.** These are
  genuinely missing today. They are the first thing plan two adds, and they amend this spec with new
  rules and a revisions row rather than getting a document of their own.
- **A print stylesheet.** Also missing, also plan two.
- **Structured data beyond `Person`.** `BreadcrumbList` and `Article` would be defensible; nothing
  needs them yet.

## Revisions

| Date       | Change                                                                                         | Covered by                       |
| ---------- | ---------------------------------------------------------------------------------------------- | -------------------------------- |
| 2026-09-20 | Written with R1–R8, cataloguing what exists and naming what is missing — the favicon among it. | `tests/unit/root-layout.test.ts` |
