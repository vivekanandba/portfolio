# SPEC-0010 — Credibility

**Status:** Active **Since:** 2026-09-20 **Shipped in:** #71
**Covers:** Testimonials · Career Timeline · Credibility · Now · Contact / Footer
**Routes:** `/recommendations/`

## What

The five surfaces where someone decides whether to believe the rest: what other people said, where
he has worked, what is verifiable, what is current, and how to make contact.

They are one spec because they share one property. **None of them is Vivek's own assessment of
himself.** Each is either a third party speaking, a date that can be checked, a credential with a
link, or a dated snapshot. That is what makes the section do its job, and it is the constraint any
change to it has to keep.

## Rules

- **R1.** Recommendations are republished **verbatim** (ADR-0001). Not trimmed to the flattering
  sentence, not paraphrased, not corrected. Four are visible; all of them are on
  `/recommendations/`.
- **R2.** Every recommendation carries its author's attribution as given.
- **R3.** The standfirst states the count, derived, so it can never contradict the list.
- **R4.** Career dates match the decided record, not an older resume. Legend ran January 2013 to
  January 2018; Tech Mahindra followed. A future correction toward the served resume's dates fails
  the build.
- **R5.** Gadjoy is marked a side venture and rendered as an `aside`, because it overlapped
  employment and presenting it as a role would misstate the record.
- **R6.** Credentials are verifiable: the granted patent, publications, achievements, education,
  every certification linked.
- **R7.** "Now" is a **dated** snapshot. It states its month and surfaces the newest certifications
  automatically, so it cannot quietly become stale while looking current.
- **R8.** The footer carries contact links and a build-time last-updated date.
- **R9.** The footer ends on a line in my voice, authored in `profile`, after the links and before
  the colophon — the page closes with a sentence, not a copyright notice.
- **R10.** Testimonials open with one voice, large: the featured recommendation marked `pullQuote`
  — exactly one, test-enforced — set in the display face on a full-bleed band above the cards, its
  excerpt verbatim as R1 requires, attribution beneath. Which voice is content, not component.
- **R11.** The Career Timeline is read summary first. Each role's title, company, period and track
  are always on the page; its highlights fold behind one disclosure per role (SPEC-0011 R16),
  closed when the page loads, with one control that opens or closes all of them. The highlights are
  the same words in the served HTML. Folded, the section is held to a height budget on a phone by an
  end-to-end test.

## Verification

```sh
npx vitest run tests/unit/recommendations-page.test.tsx tests/unit/interaction-layer.test.tsx
npx vitest run tests/contract/legend-era.test.ts       # R4, R5
npx vitest run tests/unit/fold.test.tsx                # R11
npx playwright test tests/e2e/fold.spec.ts             # R11 in a browser
npx vitest run tests/contract/content.test.ts          # R1, R2, R6
npm run test:visual                                    # the footer baseline
```

R4 is a guard against a specific, likely regression: the served resume still carries the older
dates, so a future edit that "corrects" the site toward it would be wrong in a way that looks like a
fix.

## Not doing

- **Editing a recommendation for length or grammar.** ADR-0001. Whatever it costs in polish, it is
  what makes them evidence.
- **A skills endorsement count or any other vanity metric.** Not checkable, and not evidence.
- **Publishing the retired college principal's name** in the records until consent is recorded.

## Revisions

| Date       | Change                                                                                                                                                                                                                                      | Covered by                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 2026-11-28 | R11 added (plan four, move 1): the Career Timeline folds its highlights, the same way and in the same change as Turning Points (SPEC-0006 R13). It was 2,276px on a 412px phone on 2026-11-27. Vivek agreed to the fold on 2026-11-28.      | `tests/unit/fold.test.tsx`, `tests/e2e/fold.spec.ts`                                         |
| 2026-10-10 | R10 added (plan three, PR-C): one pulled quote on a full-bleed band above the testimonial cards, chosen by a `pullQuote` flag in content. The audit behind plan three: four identical bordered cards and twelve sections from one template. | `tests/unit/sections.test.tsx`, `tests/contract/content.test.ts`, `tests/e2e/visual.spec.ts` |
| 2026-10-02 | R9 added (plan two, PR-4): the footer closes on a line in my voice, from `profile.closingLine`.                                                                                                                                             | `tests/unit/sections.test.tsx`                                                               |
| 2026-09-20 | Written with R1–R8, gathering ADR-0001 and the Legend-era date decision of 2026-09-13.                                                                                                                                                      | `tests/contract/legend-era.test.ts`                                                          |
