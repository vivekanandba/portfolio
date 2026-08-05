# ADR-0004 — Disclose with `hidden`, never unmount

**Status:** Accepted
**Date:** 2026-08-05 (backfilled) **Shipped in:** #25

## Context

The landing page had grown to nine sections carrying 9 flagship cards, 18 era-chapter entries, 6
skill groups, 8 testimonials and 34 certifications. The owner's read: _"it feels a little bit bland
and too much of information… maybe we can be hidden away into separate sections that can be clicked
and gone through."_

Cutting content was not an option — the breadth _is_ the argument. The problem was that everything
competed for attention simultaneously.

## Decision

A single reusable `ShowMore` component provides progressive disclosure. Landing sections show a
headline layer and disclose the rest on click:

| Section       | Visible          | Disclosed             |
| ------------- | ---------------- | --------------------- |
| Selected Work | 4 flagship cards | remaining flagships   |
| Selected Work | —                | era chapters          |
| Skills        | 2 groups         | remaining groups      |
| Testimonials  | 4 quotes         | remaining curated     |
| Credentials   | count + heading  | all 34 certifications |

**Disclosed content stays mounted in the DOM and is toggled with the `hidden` attribute.** It is
never conditionally rendered.

`/work/` and `/recommendations/` stay fully expanded — someone who navigated there has already asked
for depth.

## Consequences

- The static export contains all content, so search engines index the disclosed material and
  Ctrl-F finds it. Conditional mounting would have hidden it from both.
- `aria-expanded` + `aria-controls` on the button; jest-axe covers the collapsed state.
- Tests must query hidden content with `{ hidden: true }`, and Playwright's `toBeVisible()` fails on
  it — several assertions had to move to `toBeAttached()` or click first. This is a real ongoing tax
  on test authoring and the most likely source of confusing future test failures.
- Page weight is unchanged; this is an attention fix, not a performance one.

## Alternatives rejected

- **Conditional mounting (`{open && …}`).** Simpler React, but removes content from the static HTML —
  losing SEO and in-page search for exactly the material that proves breadth.
- **Move depth to separate subpages.** Cleanest landing page, but a recruiter skimming for 20 seconds
  will not click through, so the breadth would go unseen.
- **Keep everything expanded, fix pacing with visual rhythm only.** Considered and offered; the owner
  chose disclosure.
