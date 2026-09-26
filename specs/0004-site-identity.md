# SPEC-0004 — Site identity

**Status:** Active **Since:** 2026-09-20 **Shipped in:** #71
**Covers:** —
**Routes:** `/404` · `/sitemap.xml` · `/version.json` · `/opengraph-image` · `/sw.js` · `/offline/` · the document shell on every route

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
  alongside the full name for the places that truncate — a home screen shows about twelve characters,
  and both navigation bars wrap the surname onto a second line below the small breakpoint — because abbreviating someone's name by rule is how it gets abbreviated wrongly. Quotations of
  source documents are exempt and must keep whatever the document said (ADR-0008).
- **R17.** The site is installable: the manifest declares `display: standalone`, an `id`, a `scope`,
  and icons at 192 and 512 including a **maskable** 512 whose content sits inside the platform safe
  zone, so an OS mask cuts paper and never a letter.
- **R18.** A service worker, generated at build as `/sw.js`, names its cache after the deployed
  commit and deletes every other cache on activate. Pages are served **network first** — an online
  visitor always sees the current build and a stale page cannot be preferred — with cache as the
  fallback; hashed assets and images are cache first; video and anything off-origin are never
  intercepted.
- **R19.** A navigation that fails offline lands on `/offline/`, precached at install, rather than on
  the browser's error page.
- **R20.** The worker is registered by production builds only. A worker registered against `next dev`
  would cache development pages and make every reload a mystery.

## Verification

```sh
npx vitest run tests/unit/root-layout.test.tsx tests/unit/seo.test.ts
npx vitest run tests/unit/manifest.test.ts tests/unit/site-card.test.tsx   # R12, R13
npx vitest run tests/contract/site-identity.test.ts                       # R9, R10, R11
npx vitest run tests/contract/naming.test.ts                              # R16
npx vitest run tests/unit/sw.test.ts                                      # R18, R19 — the worker's logic, run in a sandbox
npx playwright test tests/e2e/pwa.spec.ts                                 # R17, R18 in a real browser: registration, precache, cache writes
npx vitest run tests/a11y/pages.test.tsx                                  # R8
python3 scripts/make-icons.py --verify                                    # R10
npm run verify:infra    # R2, R3, R7, R9, R12 against the deployed site
```

R19 is proven by **running the generated worker** with a rejecting `fetch` rather than in a browser,
because Playwright's offline emulation cuts the page's network and not the worker's — verified: a
browser test of "go offline, navigate, see the offline page" returned the real page. A test that
passes either way is not a test.

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
- **Vendoring Inter.** ...

# with:

- **Vendoring Inter.** Only the display face is needed to cut a mark. A second 300 KB build input
  that nothing draws with is not worth the tidiness.
- **Precaching media or video.** The site is 45 MB, most of it photographs and clips, and a visitor
  who opens one page should not have their phone filled with the other twenty-eight. Pages and
  images are cached as they are visited; video never is.
- **An update prompt.** Pages are served network-first, so an online visitor is always on the current
  build and there is nothing to prompt about. A "new version available" banner would be theatre.
- **Push notifications, background sync, or anything that needs a server.** There is no server.

_Until 2026-09-26 this section said `display: browser` was the honest choice, because a standalone
window has no back button. Vivek asked for a PWA, and the concern is met: every page carries the nav
and the command palette, both of which work inside a standalone window. The reversal is recorded
here rather than edited away; the earlier reasoning was not wrong, it was outweighed._

_This section previously said the favicon, apple-touch icon, manifest, site card and print
stylesheet were missing. They are the subject of the 2026-09-26 revision below. It also said the
site-level card was missing, which was wrong: a hand-made `public/og.png` existed and was wired into
`src/lib/seo.ts`. What was missing was the ability to regenerate it._

## Revisions

| Date       | Change                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Covered by                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 2026-09-20 | Written with R1–R8, cataloguing what exists and naming what is missing — the favicon among it.                                                                                                                                                                                                                                                                                                                                                                | `tests/unit/root-layout.tsx`                                                                           |
| 2026-09-26 | R16 extended to the navigation bars: short form below `sm`, full name from `sm` up. On a phone the subpage nav wrapped the surname onto a second line beside a wrapped "All projects", and the landing nav wraps it beside its toggle and Resume button below about 400px; every main place — hero, titles, cards, footer, structured data, manifest — keeps the full name. The landing bar also overflowed at tablet widths, a separate fault: SPEC-0005 R7. | `tests/unit/nav.test.tsx`, `tests/e2e/nav.spec.ts`                                                     |
| 2026-09-26 | R17–R20 added — the site is installable and works offline: a standalone manifest with 192, 512 and maskable icons, a generated service worker whose cache is named after the build commit, an offline page, registration in production builds only. Reverses the `display: browser` decision, recorded as a correction.                                                                                                                                       | `tests/unit/sw.test.ts`, `tests/e2e/pwa.spec.ts`, `tests/unit/manifest.test.ts`                        |
| 2026-09-26 | R16 added — the site is labelled Vivekanand Balakrishnan, with an authored short form for the home screen. The Legend deck quotations keep the name the deck used.                                                                                                                                                                                                                                                                                            | `tests/contract/naming.test.ts`                                                                        |
| 2026-09-26 | R9–R15 added. The site gets a mark, generated from a vendored Fraunces; a manifest; a generated social card replacing the static `public/og.png`; a visible focus ring; and a real print stylesheet.                                                                                                                                                                                                                                                          | `tests/contract/site-identity.test.ts`, `tests/unit/manifest.test.ts`, `tests/unit/site-card.test.tsx` |
