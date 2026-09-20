# SPEC-0006 — The story sections

**Status:** Active **Since:** 2026-09-20 **Shipped in:** #71
**Covers:** Hero · Turning Points · The Arc · AI-Native Practice · Skills
**Routes:** `/`

## What

The five sections that make the argument before any project is named: who this is, why the pivots
were deliberate, what connects them, how the work is done now, and how broad it is.

They are one spec because they share one constraint. **Every claim in them is derived from content
data, never written into a component.** A number in JSX cannot be checked against a source and
quietly becomes untrue; a number computed from the same records the project pages use cannot
disagree with them.

## Rules

- **R1.** Hero states identity and role, and carries story-proofs — each a claim with a number that
  comes from the project records (ADR-0003).
- **R2.** The breadth line is computed from the records, not typed. It cannot contradict the pages
  it summarises.
- **R3.** Turning Points are four to six pivots, each as Saw / Bet / Cost / Proved, coloured by era
  and linking that era's projects (ADR-0011).
- **R4.** The Arc is five beats, ordered, each naming its domain, and uses the shared domain colours
  so an era looks the same everywhere.
- **R5.** AI-Native Practice states method steps with proof metrics that match the resume record
  (ADR-0008: a claim on the site must be checkable against a source).
- **R6.** Skills show two groups, with the rest behind progressive disclosure (ADR-0004).
- **R7.** No section states a number, a count or a date that is not derived from `src/content`.

## Verification

```sh
npx vitest run tests/unit/turning-points.test.tsx tests/unit/sections.test.tsx
npx vitest run tests/contract/content.test.ts     # R7, the derivation rules
npm run test:visual                               # the hero and Turning Points baselines
```

## Not doing

- **Animating the arc.** ADR-0012 rejected decorative motion while the site was still earning
  credibility. Plan two revisits it on the grounds that motion which _carries_ information —
  fifteen years and five domain switches — satisfies that test rather than waiving it.
- **A skills proficiency rating.** Self-assessed levels are not checkable, and ADR-0008 applies.

## Revisions

| Date       | Change                                                                                   | Covered by                     |
| ---------- | ---------------------------------------------------------------------------------------- | ------------------------------ |
| 2026-09-20 | Written with R1–R7, cataloguing the derivation rules these five sections already follow. | `tests/unit/sections.test.tsx` |
