# SPEC-0011 — Interaction layer

**Status:** Active **Since:** 2026-09-20 **Shipped in:** #71
**Covers:** —
**Routes:** every route

## What

The parts that respond rather than render: the command palette, the guided tours, the theme toggle
and scroll reveal (ADR-0012).

All four are **progressive enhancement**. Without JavaScript the site is unchanged and complete:
the palette renders nothing, the tours are absent, the theme follows the operating system, and every
section is visible because the hidden state only applies once `html.js` is stamped. Nothing here is
load-bearing for reading the site, which is the condition under which it was allowed to exist at
all.

## Rules

- **R1.** Without JavaScript, every piece of content is in the DOM and visible. Reveal hides nothing
  that JavaScript is not running to show.
- **R2.** The palette opens on ⌘K or ctrl-K, filters as you type, moves with the arrow keys without
  wrapping, follows on Enter, and closes on Escape or a backdrop click.
- **R3.** The palette traps focus while open and returns it on close, because `aria-modal` is a
  claim and these are what make it true.
- **R4.** The palette indexes projects, sections, credentials, archive entries and posts. Entries
  that are not the client's business are supplied by the server as a prop.
- **R5.** Anchor navigation decides by the document, not the pathname: scroll if the section is
  here, route home if it is not (ADR-0016).
- **R6.** The theme toggle layers a manual choice over the system preference, persists it, and still
  switches when storage refuses to persist.
- **R7.** Reveal fires once per element and disconnects; where `IntersectionObserver` is missing,
  content shows immediately.
- **R8.** Every tour stop resolves to a section or project page that exists.
- **R9.** Hydration succeeds on every route. A mismatch between the server HTML and the client tree
  makes React discard the document and re-render it, and that strips what the pre-paint script put
  on `<html>` — the `js` class the reveals hang on and the saved theme — so every section shows at
  once and a chosen theme is forgotten, silently, on every page view. An end-to-end check loads the
  landing page, a project page and a post with a saved theme, waits for the first reveal, and asserts
  that both stamps survive and that React logged no error.
- **R10.** The palette is findable without guessing: the landing bar carries a search button with
  the ⌘K hint from the large breakpoint and a Search row in the menu below it; both open the same
  palette. Anything on the site may open the palette with a prepared query through one window event,
  so a second entry point never grows a second palette.
- **R11.** Micro-interactions are quick and respectful. Every entrance, disclosure or hover finishes
  within 300 milliseconds — the two named exceptions are the scroll reveal (600ms) and the arc's
  wipe (SPEC-0006 R10) — and anything that moves (translate, rotate, scale, keyframes) runs only
  under `motion-safe:` or is switched off in the reduced-motion block; colour and opacity may change
  regardless. Entrances play on open only; nothing animates out, because a close must be instant.
  A test reads the classes and the stylesheet and fails on an unguarded movement or a slow one.
- **R12.** Disclosure opens by growing, not jumping: `ShowMore` animates its grid row from nothing
  to its content height. Closing is instant, because `hidden` is `display: none` and the content
  must leave the accessibility tree at once.
- **R13.** A skill pill is a button, and it leads somewhere: it opens the palette prepared with that
  skill, so the hover it always had is a promise the keyboard can also reach.
- **R14.** A metric counts up once, when it scrolls into view, and only when it can be read with
  certainty: one number — optionally led by `<`, `>`, `≈` or `~` and followed by a unit with no
  digits in it — with the same grouping and decimals as written. Anything else (`1–3% → 100%`,
  `A350 XWB`, `23/69`, a date range) renders exactly as today. The server-rendered text is always
  the final value; under reduced motion or without `IntersectionObserver` nothing moves.
- **R15.** The palette's empty state acts instead of advising: the tags it suggests are buttons that
  run the search, and each is asserted to match something in the index, so the suggestion can never
  rot into a dead end.

## Verification

```sh
npx vitest run tests/unit/interaction-layer.test.tsx tests/unit/tours.test.tsx
npx vitest run tests/unit/reveal.test.tsx tests/unit/nav.test.tsx
npx vitest run tests/unit/show-more.test.tsx tests/unit/metric-badge.test.tsx tests/unit/palette-lib.test.ts   # R12–R14
npx vitest run tests/contract/motion.test.ts     # R11, every movement guarded and quick
npx playwright test tests/e2e/smoke.spec.ts tests/e2e/archive.spec.ts
npx playwright test tests/e2e/hydration.spec.ts --project=desktop   # R9, and the arc's wipe (SPEC-0006 R10)
npm run test:visual    # the palette baseline, both themes
```

The browser-only paths are stubbed deliberately: jsdom has no `IntersectionObserver`, so without a
stub every test takes the fallback and the path that runs in a real browser is never executed.

## Not doing

- **Making the palette the primary navigation.** It is a shortcut, now a visible one (R10); the
  anchor links and the index pages remain the way through the site.
- **Remembering tour progress across visits.** No storage for it and no evident need.
- **Decorative motion.** ADR-0012's test is whether motion carries information. The arc passes it
  (SPEC-0006 R10). Everything in R11–R14 is feedback on an action — a press, a hover, a disclosure,
  a number arriving — under 300ms; none of it is a set-piece. No confetti, cursor trails, parallax,
  sound or scroll-jacking, ever.

## Revisions

| Date       | Change                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Covered by                                                                                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-02 | R15 added (plan two, PR-4): the palette's two suggested tags are buttons that search, each test-asserted to match.                                                                                                                                                                                                                                                                                                                                                                                                                                            | `tests/unit/interaction-layer.test.tsx`                                                                                                                                                                    |
| 2026-10-02 | R10–R14 added (plan two, PR-3): the palette gets a visible way in and a prepared-query event; motion rules with a test behind them; `ShowMore` grows open; skill pills become buttons that open the palette; metrics count up when they can be parsed with certainty. Palette input gains a visible focus ring, results a highlight transition, the theme toggle an icon entrance; Writing, Notes and the writing index become whole-card links with the hover the project cards had; Recommendations and archive media get the same hover. Tests first, red. | `tests/contract/motion.test.ts`, `tests/unit/show-more.test.tsx`, `tests/unit/metric-badge.test.tsx`, `tests/unit/palette-lib.test.ts`, `tests/unit/nav.test.tsx`, `tests/unit/interaction-layer.test.tsx` |
| 2026-10-02 | R9 added after the arc's SVG `<title>` rendered empty on the server — React drops a title with more than one child — and full on the client. The mismatch made React re-render the document and strip `html.js` and `data-theme` on the local build, which is how it was found; the live site, without the arc, hydrated cleanly. The stamps are now asserted after hydration on three routes, and the title is asserted in server-rendered markup, where it failed.                                                                                          | `tests/e2e/hydration.spec.ts`, `tests/unit/arc-component.test.tsx`                                                                                                                                         |
| 2026-09-20 | Written with R1–R8 from ADR-0012 and the keyboard coverage added in #61.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `tests/unit/interaction-layer.test.tsx`                                                                                                                                                                    |
