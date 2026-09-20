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

## Verification

```sh
npx vitest run tests/unit/recommendations-page.test.tsx tests/unit/interaction-layer.test.tsx
npx vitest run tests/contract/legend-era.test.ts       # R4, R5
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

| Date       | Change                                                                                 | Covered by                          |
| ---------- | -------------------------------------------------------------------------------------- | ----------------------------------- |
| 2026-09-20 | Written with R1–R8, gathering ADR-0001 and the Legend-era date decision of 2026-09-13. | `tests/contract/legend-era.test.ts` |
