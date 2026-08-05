# ADR-0003 — Hero proves one story per era, not raw scale

**Status:** Accepted
**Date:** 2026-08-05 (backfilled) **Shipped in:** #24 (structure), #26 (revised leading proof)

## Context

The hero's "Track Record" panel originally read: `15+ years of engineering`, `430k/day requests in
production`, `US patent granted`. The owner's assessment was that the middle one did not land —
a request count with no context is a number, not evidence.

The first replacement was **"GA in 3 months — concept → enterprise AI copilot"**. The owner rejected
that too, with a sharper point: _"in the era of AI it doesn't stand ground."_ Shipping speed has been
commoditised; three months to GA no longer distinguishes anyone.

That reframed the requirement. The hero must carry proofs that **cannot be handed to someone by
better tooling**: regulatory clearance, granted IP, sustained production load under a latency budget,
and a business that survived without its founder.

## Decision

The hero states **one narrative proof per career era**, each pairing a figure with the thing that
makes it hard:

- **430k/day** — in production at sub-100ms _(scale under a hard real-time budget)_
- **FDA-cleared** — robotic platform, cloud stack _(regulated-industry rigour)_
- **US patent ↗** — vascular-flow imaging _(granted IP, linked)_
- **15,000+ repairs** — 4.7★, own business _(founder-operator evidence)_

Beneath it, a **computed** breadth line (`{years}+ yrs · 5 fields · {caseStudies.length} projects`)
so counts cannot drift from content, and a **brand constellation** of ~17 clients and employers
tiered by prominence with domain-coloured dots.

"GA in 3 months" is retained inside the Sanas for Sales project, where it is supporting context
rather than a headline.

## Consequences

- The panel is denser and needs the 2×2 grid; a gradient hairline ring gives it visual weight.
- `profile.heroStat` stays the single source of the 430k figure, so the hero and the Playground card
  cannot disagree.
- The breadth line changes automatically when a project is added — no hardcoded "26".
- Every proof now depends on an external referent staying valid (see ADR-0008).

## Alternatives rejected

- **Keep "430k/day requests in production" alone.** The owner's original objection: unconvincing
  without the latency constraint that makes it hard.
- **"GA in 3 months."** Rejected by the owner as no longer differentiating in an AI era.
- **"40 hospitals, HIPAA compliant."** Strong, but the claim rests on a recommender's wording rather
  than a document we can link.
- **Marquee of client logos.** Logo walls imply endorsement and need trademark care; names with
  domain dots convey the same breadth with none of that.
