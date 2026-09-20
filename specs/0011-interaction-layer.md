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

## Verification

```sh
npx vitest run tests/unit/interaction-layer.test.tsx tests/unit/tours.test.tsx
npx vitest run tests/unit/reveal.test.tsx tests/unit/nav.test.tsx
npx playwright test tests/e2e/smoke.spec.ts tests/e2e/archive.spec.ts
npm run test:visual    # the palette baseline, both themes
```

The browser-only paths are stubbed deliberately: jsdom has no `IntersectionObserver`, so without a
stub every test takes the fallback and the path that runs in a real browser is never executed.

## Not doing

- **Making the palette the primary navigation.** It is a shortcut for people who already know it
  exists. That it is currently invisible to everyone else is a gap plan two closes with a badge.
- **Remembering tour progress across visits.** No storage for it and no evident need.
- **Decorative motion.** ADR-0012's test is whether motion carries information. Plan two argues the
  arc passes it; nothing else has.

## Revisions

| Date       | Change                                                                   | Covered by                              |
| ---------- | ------------------------------------------------------------------------ | --------------------------------------- |
| 2026-09-20 | Written with R1–R8 from ADR-0012 and the keyboard coverage added in #61. | `tests/unit/interaction-layer.test.tsx` |
