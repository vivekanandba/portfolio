# SPEC-0005 — Landing composition

**Status:** Active **Since:** 2026-09-20 **Shipped in:** #71
**Covers:** —
**Routes:** `/`

## What

The order of the landing page and the navigation that moves through it. Not what each section says —
that is SPEC-0006 and SPEC-0010 — but the arrangement, the landmarks and the anchors.

The order is the argument. SPEC §3 calls it "the narrative": identity, then why the pivots were
deliberate, then the throughline, then proof, then method, then breadth, then third-party
credibility, then the journey, then what is current, then writing, then credentials, then contact.
Reordering it changes what the page claims, which is why the order is asserted rather than assumed.

## Rules

- **R1.** Sections render in the declared order. `tests/unit/landing-composition.test.tsx` holds the
  list and fails on any change to it, so a reorder is a decision rather than an accident.
- **R2.** There is exactly one `main` landmark and exactly one `h1`.
- **R3.** Contact is a `footer` outside `main`, because it is site furniture rather than page
  content.
- **R4.** Every navigation link resolves to an element the page actually renders. The nav keeps its
  own list, and nothing else connected the two.
- **R5.** The nav marks the section in view, and marks Contact at the bottom of the page, which is
  too short to reach the observer band.
- **R6.** Accessibility is asserted against the real page, by rendering it, never against a copy of
  its composition.
- **R7.** The link row appears only where it fits. Eight links, the theme toggle and the Resume
  button need about 890px beside the owner's full name, so the row shows from the large breakpoint
  and the menu button serves everything narrower. The bar never overflows its viewport and never
  wraps the name, at any width.

## Verification

```sh
npx vitest run tests/unit/landing-composition.test.tsx tests/unit/nav.test.tsx
npx vitest run tests/a11y/pages.test.tsx
npm run test:visual    # the nav, hero and Turning Points baselines
npx playwright test tests/e2e/nav.spec.ts --project=desktop   # R7, the bar at eight widths
```

R6 is the rule with an incident behind it. The accessibility suite used to hand-copy the section list
out of `app/page.tsx` with a comment asking whoever edited one to remember the other, and it had
drifted: `Contact` was being tested inside `main` while the page shipped it outside.

## Not doing

- **A configurable or data-driven section order.** The order is an argument, not a setting.
- **Deep-linking state beyond anchors.** No query parameters, no history entries for disclosure.

## Revisions

| Date       | Change                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Covered by                                         |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| 2026-09-26 | R7 added. Measured while checking where the owner's full name fits: from 640 to about 1000px the link row appeared at the small breakpoint, wrapped the name onto two lines and pushed the Resume button past the edge of the viewport. Nothing measured there — the pixel baseline is 1280 wide and the mobile project is 412. The row now shows from the large breakpoint, and an end-to-end sweep asserts the bar fits at eight widths on the landing page and a project page. | `tests/e2e/nav.spec.ts`, `tests/unit/nav.test.tsx` |
| 2026-09-20 | Written with R1–R6 after the drift between the page and its accessibility mirror was found and removed.                                                                                                                                                                                                                                                                                                                                                                           | `tests/unit/landing-composition.test.tsx`          |
