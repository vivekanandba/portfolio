# ADR-0011 — Turning Points: the career told as decision records

**Status:** Accepted
**Date:** 2026-09-12 **Shipped in:** not yet shipped

## Context

The owner's brief: the site "looks too generic… it should be more than a portfolio that just
showcases my work. More like it shows the intentionality of whatever I have done." The current
structure proves _what_ was built (27 project pages, evidence, credits) but the _why_ of each pivot —
aerospace → founder → electronics → medical robotics → AI — exists only as inference. The Arc names
the eras; nothing explains the decisions between them.

The house already has a trusted format for exactly this: the decision record. Engineers believe
Context / Decision / Consequences because it shows the thinking, including what it cost. Applying
that format to career pivots turns biography into evidence of judgement — which is what the site's
audiences (hiring managers, investors) are actually evaluating.

## Decision

A **Turning Points** section on the landing page: the career as four to six decision records, each a
node on a vertical journey in the era's domain colour, with the fixed shape:

- **Saw** — the observation that prompted the move
- **Bet** — the decision, stated as the wager it was
- **Cost** — what it genuinely cost (nights, salary, rework, years)
- **Proved** — the outcome, phrased so it is checkable against the site's own projects

Each node links to the projects of its era (`projects: [id]`, resolution test-enforced). Content is
typed data (`turningPointSchema`) like everything else. Claims obey ADR-0008: `proved` lines must be
consistent with the project pages they link to; no new unverifiable figures.

First-person voice is allowed here — it is explicitly a narrative section — but **the owner reviews
the wording before it ships**, since these are interpretive statements about their intent, drafted
from the session record rather than dictated by them.

## Consequences

- A new schema, content file, component, section id and nav entry; the a11y composition test and
  e2e section list must be updated in the same PR (SPEC §8 known-gaps note).
- The landing page gains one more section against the density budget; mitigated because Turning
  Points _is_ the narrative spine, so it earns above-the-fold placement and is not disclosed away.
- The `cost` field commits the site to admitting costs, which most portfolios omit — that asymmetry
  is the credibility mechanism, same as Stop Hunger's unflattering coverage gauges (ADR-0008).
- Interpretive claims can drift from the owner's own telling; owner review is the gate.

## Alternatives rejected

- **A prose "About me" essay.** Generic — the exact complaint — and unscannable in 20 seconds.
- **Field notes attached to projects.** Adds texture but not the through-line; the pivots stay
  unexplained. Considered as a later complement, not the spine.
- **A thesis-first "constant thread" map.** Strong idea, but it argues one abstraction ("precision")
  where the decision-record format shows judgement directly and reuses a form the repo already
  enforces elsewhere.
