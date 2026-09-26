# SPEC-0004 — Site identity

**Status:** Active **Since:** 2026-09-20 **Shipped in:** #71
**Covers:** —
**Routes:** `/404` · `/sitemap.xml` · `/version.json` · `/opengraph-image` · the document shell on every route

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
- **R9.** The site has a mark, served at every size a browser asks for: a 32px `icon.png`, a 180px
  `apple-icon.png`, and a multi-size `favicon.ico` for the `/favicon.ico` request browsers make
  whether or not the document links to it.
- **R10.** The marks are **generated**, not drawn, by `scripts/make-icons.py` from the Fraunces
  vendored under `source/fonts/` with its SIL OFL licence. `--verify` proves the committed files are
  what the script produces. The typeface is a build input and never reaches the browser.
- **R11.** The generator chooses the variable font's axes **per output size**. A display-grade serif
  loses its hairlines entirely when rasterised at 16px, so small marks use a low optical size and a
  heavier weight, and the accent rule is dropped below 24px where it would read as dirt.
- **R12.** A web manifest declares the site's name, description and marks, and its `theme_color`
  agrees with the page's — two declarations of one fact, so they are asserted equal.
- **R13.** The site-level social card is generated like the per-page ones, from content. No route
  overrides it with a hand-made file.
- **R14.** Keyboard focus is visible everywhere via `:focus-visible`, and no component removes it.
- **R15.** Printing produces a document, not a screenshot: no navigation furniture, ink on white
  whatever the screen theme was, external link destinations spelled out, and no figure or heading
  split across a page break.
- **R16.** The site names its owner from `profile`, never from a literal. A short form is authored
  alongside the full name for the places that truncate — a home screen shows about twelve characters
  — because abbreviating someone's name by rule is how it gets abbreviated wrongly. Quotations of
  source documents are exempt and must keep whatever the document said (ADR-0008).

## Verification

```sh
npx vitest run tests/unit/root-layout.test.tsx tests/unit/seo.test.ts
npx vitest run tests/unit/manifest.test.ts tests/unit/site-card.test.tsx   # R12, R13
npx vitest run tests/contract/site-identity.test.ts                       # R9, R10, R11
npx vitest run tests/contract/naming.test.ts                              # R16
npx vitest run tests/a11y/pages.test.tsx                                  # R8
python3 scripts/make-icons.py --verify                                    # R10
npm run verify:infra    # R2, R3, R7, R9, R12 against the deployed site
```

`--verify` needs Python and stays a manual gate, like the repo's other generators. What CI checks
instead is that the committed marks are the right shape and that the licence is beside the font —
`tests/contract/site-identity.test.ts` also asserts no font file has crept into `public/` or `src/`,
which would ship an unused 350 KB.

## Not doing

- **Structured data beyond `Person`.** `BreadcrumbList` and `Article` would be defensible; nothing
  needs them yet.
- **A dark-theme variant of the mark.** A favicon is cached by the browser and shown against its own
  chrome, which is not the page's. One fixed, high-contrast rendering beats two that each look wrong
  somewhere.
- **A maskable icon or an installable app shell.** `display: browser` is honest: this is a website,
  and a manifest claiming otherwise would put it in a frameless window with no back button.
- **Vendoring Inter.** Only the display face is needed to cut a mark. A second 300 KB build input
  that nothing draws with is not worth the tidiness.

_This section previously said the favicon, apple-touch icon, manifest, site card and print
stylesheet were missing. They are the subject of the 2026-09-26 revision below. It also said the
site-level card was missing, which was wrong: a hand-made `public/og.png` existed and was wired into
`src/lib/seo.ts`. What was missing was the ability to regenerate it._

## Revisions

| Date       | Change                                                                                                                                                                                               | Covered by                                                                                             |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 2026-09-20 | Written with R1–R8, cataloguing what exists and naming what is missing — the favicon among it.                                                                                                       | `tests/unit/root-layout.tsx`                                                                           |
| 2026-09-26 | R16 added — the site is labelled Vivekanand Balakrishnan, with an authored short form for the home screen. The Legend deck quotations keep the name the deck used.                                   | `tests/contract/naming.test.ts`                                                                        |
| 2026-09-26 | R9–R15 added. The site gets a mark, generated from a vendored Fraunces; a manifest; a generated social card replacing the static `public/og.png`; a visible focus ring; and a real print stylesheet. | `tests/contract/site-identity.test.ts`, `tests/unit/manifest.test.ts`, `tests/unit/site-card.test.tsx` |
