# ADR-0001 — Republish recommendations verbatim, curate a subset

**Status:** Accepted
**Date:** 2026-08-05 (backfilled) **Shipped in:** #22

## Context

The LinkedIn export contained 25 recommendations marked `VISIBLE` — written publicly by colleagues,
managers and clients spanning aerospace, healthcare robotics and AI work. Third-party testimony is
the one form of credibility a portfolio cannot manufacture, and the site had none.

Two forces pulled against each other: 25 full recommendations is far more text than a landing page
can carry, but paraphrasing or trimming someone's words puts claims in their mouth they did not
write. The export also sat inside a file tree containing private data (see ADR-0007's sibling
concern), so the source boundary had to be explicit.

## Decision

Republish all 25 **verbatim**, with faithful attribution (name · title · company), on a dedicated
`/recommendations/` page. Curate **8** for the landing section, each shown as a hand-picked
**excerpt** drawn word-for-word from that person's text, never a summary of it.

Curation spans employers and seniority rather than picking superlatives: NeuraSignal's CEO, a Sanas
product director, a J&J programme manager, an NVIDIA engineer, an L'Oréal TPM, a cloud consultant,
Legend's director of operations, and an engineering director.

Recommender LinkedIn URLs are **not** published. Only public-profile export files are read.

## Consequences

- The full text is long; the `/recommendations/` page absorbs it so the landing page stays scannable.
- Excerpts must be checked against the source text on any edit — they are quotations, not copy.
- `recommendationSchema` enforces name/title/text; `featured` items must carry an `excerpt`
  (test-enforced), so a curated card can never render an empty quote.
- Attribution is fixed at export time. If someone changes their job title, ours goes stale — an
  acceptable cost for not re-scraping people's profiles.

## Alternatives rejected

- **Paraphrase into short blurbs.** Cheaper to lay out, but it fabricates attributed speech.
- **Show all 25 on the landing page.** Buries everything else; nobody reads twenty-five testimonials.
- **Link out to LinkedIn instead of hosting.** Requires a login to read, and LinkedIn blocks
  crawlers, so the credibility would be invisible to search and to anyone not signed in.
