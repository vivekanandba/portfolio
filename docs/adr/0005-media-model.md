# ADR-0005 — Three media slots: artifact, gallery, artifacts list

**Status:** Accepted
**Date:** 2026-08-05 (backfilled) **Shipped in:** #25, #26, #28, #29, #30, #33

## Context

Project pages were text plus a hand-drawn SVG diagram. Real artefacts existed but had nowhere to go,
and they were not one kind of thing: architecture diagrams (wide, text-bearing), device photos
(portrait), annotated before/after cards (landscape with captions baked in), spec tables
(unreadable when scaled down), PDF decks, and external references such as an FDA clearance or a
clinical-trial registration.

A single `image` field could not serve these. Forcing them into one slot produced concrete defects
during the work: a wide before/after card was cropped by `object-cover` until its "Before"/"After"
labels were cut off, and a portrait phone screenshot rendered as a horizontal slice of its middle.

## Decision

Three distinct slots, each with a different job:

1. **`project.image` + `imageAlt` (+ `imageCredit`)** — one hero artefact per project, full width
   under the intro. For the single most representative artefact.
2. **`caseStudy.gallery[]`** — a photo grid ("From the bench") of `{ file, alt, wide?, tall?,
credit? }`. `wide` spans the grid and letterboxes rather than cropping; `tall` gives a portrait
   item a taller cell shown whole. Every item links to the original at full size, because
   text-bearing images are unreadable at grid scale.
3. **`caseStudy.docs[]`** — an "Architecture & artifacts" list of `{ label, file? , href? }`, with a
   Zod refinement requiring **exactly one** source so a doc can never render a dead link. `file`
   resolves through `asset()` for the base path; `href` is used verbatim for external references.

`alt` is mandatory everywhere. Referenced files must exist on disk (test-enforced).

## Consequences

- Three fields to choose between, so the choice needs stating: hero artefact → `image`; several
  photos → `gallery`; something to download or cite → `docs`.
- `wide`/`tall` are presentation flags in content, which is a mild layering compromise; the
  alternative was per-project components, which is worse.
- The `docs` refinement means a malformed entry fails at import, not at render.
- The full-size link exists because alt text alone cannot carry a spec table's content.

## Alternatives rejected

- **One `image` field for everything.** Produced the cropping defects above.
- **Uniform `object-contain` for all gallery items.** Letterboxes portrait device photos that crop
  perfectly well, wasting grid space for no gain.
- **Allow `docs` to take both `file` and `href`.** Ambiguous precedence, and one of them would
  silently never be used.
- **A lightbox for full-size viewing.** Runtime JS and focus management for something a new tab
  already does correctly.
