# ADR-0012 — Interaction layer: audience paths, command palette, Now section

**Status:** Accepted
**Date:** 2026-09-12 **Shipped in:** #42

## Context

Same brief as ADR-0011: "more interactive, easier to use." The site is one linear page plus project
pages; every visitor gets the same order regardless of intent, and the only navigation is anchor
links and a projects index. Interactivity today is three small client components — there is JS
budget to spend, but the static-export, near-zero-runtime principle (SPEC §2) still governs: no
backend, nothing that breaks without JavaScript.

Also in the brief: making the "enormous interest in AI and ML" visible as _current_, not historical
— today the newest evidence is a certifications list behind a disclosure.

## Decision

Three additions, all static-friendly, chosen with the owner:

1. **Audience paths.** Three buttons in the hero — _I'm hiring / I'm an engineer / I'm building
   something_ — each starting a curated tour of five-to-six stops (sections and project pages) with
   progress dots and next/prev. Paths are typed data (`tourSchema`); stop targets must resolve
   (test-enforced). Exit anywhere; the site works identically if the buttons are never touched.
2. **Command palette (⌘K / ctrl-K).** Fuzzy search over a build-time index of projects, skills,
   certifications and sections. Client-only, no network, closes on escape, fully keyboard-driven.
   Signals craft to the engineer audience by existing.
3. **Now section.** "What I'm exploring now" — derived automatically from the newest certifications
   (already dated content) plus a small hand-written `now` content entry with a stated month. The
   dated-snapshot rule (ADR-0008) applies: the month renders next to the claims.

Progressive enhancement is the constraint on all three: the palette and tours are additive; with JS
disabled the page remains the current site.

## Consequences

- Meaningful growth in client JS (palette + tour state). Bounded by building the search index at
  build time from content rather than shipping a search library's runtime indexing.
- Tours hard-code editorial judgements about what each audience should see; they will need pruning
  as projects are added — the resolution test keeps them from silently rotting.
- The Now section ages by design; its month makes staleness visible rather than hidden, and it reads
  from certifications data so new learning surfaces without editing the section.
- Keyboard/focus behaviour of the palette is an a11y surface that must be axe-tested like everything
  else.

## Alternatives rejected

- **A live "ask my portfolio" LLM.** No backend by principle; a client-side model (WebLLM) is a
  multi-hundred-MB download for a portfolio page. A curated Q&A chat was considered and deferred —
  it risks reading as a fake chatbot, the opposite of the site's honesty rule (ADR-0008).
- **Scroll-driven animation / heavy motion.** Explicitly out of scope in SPEC §2 since v1.3; motion
  is decoration here, not information.
- **Per-audience separate landing pages.** Splits the canonical URL and triples content upkeep;
  tours give the same adaptation on one page.
