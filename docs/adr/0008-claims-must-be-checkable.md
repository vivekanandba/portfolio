# ADR-0008 — Every claim links to a public referent, or is cut

**Status:** Accepted
**Date:** 2026-08-05 (backfilled) **Shipped in:** #32, #33

## Context

A portfolio's failure mode is unfalsifiable impact language. Searching public sources for
corroboration surfaced three separate problems in claims already shipped:

1. **The hero said "patent granted" while linking `US20230329668A1`** — the _pre-grant application
   publication_. The patent had in fact granted as **US12343195B2** on 1 July 2025. The strongest
   credential on the site was undermining itself with a weaker link, and no test could have known.
2. **"FDA-cleared" was asserted with nothing to check.** The actual clearance is 510(k) **K213279**,
   with the document publicly hosted by the FDA.
3. **"the _first_ FDA-cleared, fully-automated robotic TCD"** could not be substantiated. The
   company's own language is "the only autonomous TCD" — a different claim.

The pattern: claims degrade silently. Nothing in lint, types, tests or the build can tell you that a
number is stale or a link points at the wrong document.

## Decision

**Where a claim has a public referent, link it. Where it has none and cannot be supported, cut it.**

- Prefer a smaller verifiable claim to a larger asserted one. "an FDA-cleared platform (510(k)
  K213279)" beats "the first fully-automated platform".
- **Superlatives ship only with a citation.** "First" and "only" are removed otherwise.
- Cite the **authoritative artefact**: the granted patent, the FDA's own PDF, the ClinicalTrials.gov
  registration, the App Store listing, the live civic site.
- Third-party validation is framed as **context for the platform**, never as personal credit — the
  clearance belongs to NovaGuide, not to the engineer who built its cloud stack.
- Time-varying figures are **bound to a dated snapshot** rather than presented as standing results,
  and figures of different vintages are labelled so they cannot be read as one measurement.

## Consequences

- Content carries reference identifiers (K213279, NCT04604015/05547412/06565442) and links; `docs[]`
  gained external `href` support (ADR-0005) specifically so citations are clickable rather than
  stranded in prose.
- `npm run check:links` (ADR-0010) guards the links, but **not their correctness** — it would have
  reported the pre-grant patent URL as perfectly healthy. Only reading the source catches that class.
- Some claims read as more modest than the owner might prefer. That is the point: modest and checkable
  outperforms bold and unverifiable with the audiences this site targets.

## Alternatives rejected

- **Keep unsourced superlatives because they read stronger.** One informed reader disproving "first"
  discredits the whole page.
- **Cite everything, including routine claims.** Citation clutter; reserve links for load-bearing claims.
- **Rely on the resume as the sole source of truth.** The resume is the owner's own assertion; it cannot
  corroborate itself, and it was the resume that recorded the patent as merely filed.
