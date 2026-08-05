# ADR-0009 — One project page per distinct system

**Status:** Accepted
**Date:** 2026-08-05 (backfilled) **Shipped in:** #31

## Context

The Mapshalli volunteer work shipped as a single project, "Stop Hunger & AirCare", because both were
volunteer civic tech at the same organisation in overlapping years. The owner rejected the grouping:
_"those are two separate projects stop hunger and air care… for air care there was another added
element of adding a device in itself to support that cost. So separating it out would make sense."_

The merged page could not tell either story. Stop Hunger is a coordination protocol — a shared
registry that stops NGOs duplicating deliveries. AirCare is a **hardware** project whose entire
premise is cost: reference-grade monitoring stations cost roughly ₹1 crore each, so a self-built
₹7,500 node is what made a dense network possible at all. Merged, the ₹7,500 device was one bullet
instead of the argument.

The same principle had already been applied earlier to over-merged healthcare and rail work.

## Decision

**A project page exists per distinct system, not per employer, engagement or era.** The test is
whether the two bodies of work have different problems, constraints and decisions. If they do, they
get separate pages — even when they share an organisation and a date range.

Each gets its own diagram, its own external link (`stophunger.mapshalli.org`,
`aircare.mapshalli.org`) and its own chronological anchor.

## Consequences

- Splitting is not free: the enforced bijections mean one new page requires a new entry in
  `DIAGRAM_IDS`, a new diagram component, a registry entry, a `CASE_STUDY_START` anchor and a project
  record. The tests will refuse a partial split, which is the desired behaviour.
- Project count grows (26 → 27), and the hero's computed breadth line tracks it automatically.
- E2E coverage is data-driven over the collection, so new pages are exercised without new tests
  (87 e2e tests, up from 85, with no test authored).
- Each page can now carry its own evidence, which immediately paid off: AirCare's headline became the
  ₹7,500-versus-₹1-crore argument with a 0.96 correlation against reference-grade equipment, and Stop
  Hunger's became 889 settlements / 55,475 people / 67% reached.

## Alternatives rejected

- **Keep one page per organisation.** Fewer pages, but the AirCare hardware argument — the most
  interesting engineering in the civic work — stays invisible.
- **One page with two clearly-separated halves.** Tried; it produced generic metrics ("2 platforms
  delivered") because a shared metric strip cannot describe two different systems.
- **Split but share a diagram.** The diagram registry is a 1:1 bijection by design; sharing would need
  that invariant weakened, and each system genuinely has a different shape.
