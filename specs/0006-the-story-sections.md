# SPEC-0006 — The story sections

**Status:** Active **Since:** 2026-09-20 **Shipped in:** #71
**Covers:** Hero · Fifteen years in pictures · Turning Points · The Arc · AI-Native Practice · Skills
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
- **R8.** The Arc section opens with the fifteen years drawn: one strip, the primary roles as abutting
  segments in the shared domain colours, a thinner lane beneath for a venture run alongside, a label
  where the domain changes, five-year ticks, the start year at the left edge and "now" at the right.
  Nothing else goes on it — no project dots, no turning-point markers, no counts. Its job is what the
  beats cannot state: how long, that it is unbroken, how much of it was aerospace, and that one
  venture ran the whole way alongside.
- **R9.** The strip is computed from `roles`, never drawn by hand. `period` keeps the one shape it
  already has — `Mon YYYY – Mon YYYY` or `Mon YYYY – Present`, with an en dash — enforced by the
  schema and parsed by `src/lib/arc.ts`; a period that does not parse fails the build, because a
  silently dropped bar is an invisible lie and a red build is a visible one. Consecutive primary
  roles may overlap by at most `HANDOVER_TOLERANCE_MONTHS` (three): within it the earlier bar yields
  to the later one at the later one's start; beyond it the build fails, so a real overlap becomes a
  decision rather than a drawing. A gap between primary roles is recorded and read out, and "no gap"
  is said only when the computed list of gaps is empty.
- **R10.** The strip draws itself once, left to right, when its section reveals — a clip wipe over
  the whole strip, riding the class `Reveal` already stamps, so the bars appear in time order with no
  new client JavaScript. With JavaScript off nothing is clipped; under reduced motion and in print
  the strip is complete and still.
- **R11.** The strip is read at year resolution. Its right edge is the end of the build year and a
  role marked Present runs to it, so the picture is stable for a calendar year and its pixel baseline
  is regenerated each January by decision rather than by drift. The exact months are in the
  accessible description, computed from the same model, and the era labels are the visible
  alternative — there is no third enumeration of the roles for screen readers, who already hear them
  in Turning Points above and the Timeline below.
- **R12.** The first thing after the hero is pictures: a full-bleed band of six to eight photographs
  across the arc, in the order the work began, each a link to its project page with a year, a short
  caption and — for anything not mine — its visible credit. Every frame must already appear, with
  its alt text and credit, in the gallery or project image of the case study it links to: the strip
  shows only what has been screened and credited once already (ADR-0007), and a frame that cannot
  be found there fails the build. Nothing on it moves except the hover the project cards have; on a
  phone it scrolls sideways under the thumb with native snapping and no JavaScript.

## Verification

```sh
npx vitest run tests/unit/turning-points.test.tsx tests/unit/sections.test.tsx
npx vitest run tests/contract/content.test.ts     # R7, the derivation rules
npx vitest run tests/unit/arc.test.ts tests/contract/arc.test.ts   # R9, the model and today's roles
npx vitest run tests/unit/strip.test.tsx tests/unit/strip-lib.test.ts tests/contract/strip.test.ts   # R12
npx playwright test tests/e2e/hydration.spec.ts --project=desktop   # R10, the wipe: clipped before, drawn after
npm run test:visual                               # the hero, Turning Points and arc baselines
npm run verify:infra                              # R8 on the live site: the strip and its computed description
```

## Not doing

- **Animating the arc.** ADR-0012 rejected decorative motion while the site was still earning
  credibility. Plan two revisits it on the grounds that motion which _carries_ information —
  fifteen years and five domain switches — satisfies that test rather than waiving it.

  _Revisited 2026-10-02: the strip in R8 draws itself once, in time order (R10). ADR-0012's test was
  that motion must be information, not decoration; a wipe that reveals fifteen years left to right
  is the information. The decision is amended in the ADR, not edited away here._

- **Drawing the projects or the turning points on the strip.** Twenty-nine dots, seven of them in
  fourteen months, is one dot every five pixels at phone width; and the turning points are directly
  above. The strip says four things and refuses the rest.
- **Authored date fields beside `period`.** `start: '2024-11'` next to `period: 'Nov 2024 – Present'`
  is two copies of one fact with nothing stopping them disagreeing. The period is parsed instead.
- **A skills proficiency rating.** Self-assessed levels are not checkable, and ADR-0008 applies.

## Revisions

| Date       | Change                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Covered by                                                                                                         |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 2026-10-10 | R12's frames re-chosen the same day, on Vivek's review ("not very convincing… doesn't cut it"): the room-and-rig frames (hangar, test rig, bench) gave way to the artefacts — a 37-channel slip ring, the S200 fixture, a live engine test cell, a repaired tablet, the NovaGuide system — every one his own work, test-enforced against the gallery's `Role:` tags; the Sanas frame gains a `focus` so the crop is the phone, never a model's face (ADR-0007).                                                                                                                                                  | `tests/contract/strip.test.ts`, `tests/unit/strip.test.tsx`                                                        |
| 2026-10-10 | R12 added (plan three, PR-B): the photo strip between the hero and Turning Points. Vivek's review of plan two: "still the delight is very, very constrained… bland"; the audit found six pieces of media on the whole landing page, none above the fold, while the repo holds 108 screened images. Frames resolve their alt and credit from the case study they link to, so the strip can show nothing unscreened. The resolver's refusal of an unscreened file is pinned on invented content; the component tests were written with the component, not before it (CON-PROC-005, stated rather than back-dated). | `tests/contract/strip.test.ts`, `tests/unit/strip.test.tsx`, `tests/e2e/visual.spec.ts`                            |
| 2026-10-02 | R8–R11 added: the fifteen years drawn at the top of The Arc, computed from `roles` by `src/lib/arc.ts`, with a named handover tolerance, a build that fails on an unparseable period or a real overlap, a once-only wipe that rides the existing reveal, and a year-resolution right edge so the new pixel baseline holds for a calendar year. The Hero's hand-written timeline list — six years and six labels in JSX, which R7 forbade from the day it was written — is removed; the arc carries it. Tests were written first and were red.                                                                    | `tests/unit/arc.test.ts`, `tests/contract/arc.test.ts`, `tests/unit/sections.test.tsx`, `tests/e2e/visual.spec.ts` |
| 2026-09-20 | Written with R1–R7, cataloguing the derivation rules these five sections already follow.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `tests/unit/sections.test.tsx`                                                                                     |
