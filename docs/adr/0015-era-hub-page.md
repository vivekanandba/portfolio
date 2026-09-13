# ADR-0015 — An era hub page for the Legend years

**Status:** Accepted
**Date:** 2026-09-13 **Shipped in:** #45
**Amended:** 2026-09-13 — marker wording follows ADR-0013's amendment (_my account only_, citing _my note
of YYYY-MM-DD_); the hub's copy is first person throughout, with no "owner" persona.

## Context

ADR-0009 says one project page per distinct system, and the seven Legend-era pages obey it: a
slip ring, a turret study, a test-bed augmenter, a nose-cone tooling set. What none of them can carry
is the thing Vivek names as the formative fact of those five years — that at a medium-scale
aerospace tooling house one engineer was authorised to carry a mechanical product through every
gate: bid it, price it, design it with a team, prototype it, stand on the shop floor while it was
machined and welded, write the process sheets, prove the first article, hand it over. That is not a
system; it is a way of working, and it is the stated origin of the entrepreneurial arc ("that is the
reason it gave me a lot of impetus on my own personal entrepreneurial journey" — Vivek's note of
2026-09-13). The site's brief is intentionality (ADR-0011); a page about the loop is the intentional
core of the era.

The decks also carry a company programme portfolio — LCA, LCH, ALH and Jaguar jigs, GSLV and RLV-TD
tooling, the LCA mockups moved across Bangalore — that has no honest home on a system page. Some of
it predates Vivek's tenure; some is undated; for most items Vivek's part is not recorded
anywhere. Spreading those photographs across the system pages would imply deliveries; leaving them
out would hide the standard Vivek worked to.

The corroboration also varies by stage. Bidding-to-testing is attested by the MD's public
recommendation; process sheets and GD&T by the ENTI deck; prototyping by the deck and the resume;
first-article proving and handover by the resume. The shop-floor detail — sitting with the lathe,
CNC, milling and welding operators — is attested by nobody but Vivek.

## Decision

1. **One hub page per era where a way of working, not a system, is the claim.** The first is
   `legend-technologies`: its decisions are the seven lifecycle stages in Vivek's order (bid,
   design, prototype, batch production, process documentation, inspection and first-article proving,
   handover), each with its corroboration named in the tradeoff text and the two standing facts
   beside them (ENTI's technical-manager seat, the slip-ring design seat). It links the system pages
   and never restates their metrics. A test asserts the seven stages are all named, so the spine
   cannot be edited away quietly.
2. **The programme gallery is the company's, and every caption says what Vivek's part was.**
   Captions carry a `Role:` tag from a closed vocabulary — `led`, `designed`, `delivered`,
   `supported`, `workplace`, or `company programme (before my time — shown as the standard I worked
to)` / `(date not recorded)`. Items dated inside 2013–2018 default to `supported`; undated or
   pre-2013 items default to the company-programme wording; Vivek may upgrade any tag with a
   sentence of evidence. A test rejects a hub caption without a `Role:` tag.
3. **"My account only" stays visible.** A tradeoff that rests only on Vivek's account carries the
   `my account only` marker and cites the note by date — `my note of YYYY-MM-DD` (ADR-0013's rule);
   a test enforces the citation whenever the marker appears.
4. The LCA mockup and technology-demonstrator material (Aero India 2015 modification, the TD1 pylon,
   the Minsk Square road move, the Republic Day float) lives in the hub gallery with `Role:` tags
   rather than on its own page, because no record attributes a personal role in it. A page can be
   split out later if Vivek supplies role lines — the gallery is the honest default, not the
   ceiling.

## Consequences

- Route count grows by two (the hub and the slip-ring line, ADR-0009 pages in their own right); the
  featured grid gains the hub as the era's flagship, which displaces nothing — featured order is
  explicit.
- The hub duplicates some photographs already used on system pages only where the hub's point is the
  loop and the system page's point is the system (the S200 fixture appears on both, captioned
  differently). Elsewhere, the hub shows what the system pages cannot: RLV-TD, LCH, GSLV Mk III, the
  mockups, the shop itself.
- "Company programme (before my time)" captions on a personal portfolio are unusual and deliberately
  so — they are the ADR-0008 answer to a gallery that would otherwise imply authorship. Readers
  who skim will see impressive jigs; readers who check will see exactly what is claimed.
- The role vocabulary is closed and test-enforced, so upgrading a tag is a content edit plus a
  sentence of evidence, not a free-text drift.

## Alternatives rejected

- **A longer "About" essay covering the Legend years.** Prose is unscannable and unlinked; the
  decision-record shape (ADR-0011) is what lets each stage carry its own evidence marker.
- **Distributing the programme photographs across the seven system pages.** Implies delivery of
  jigs Vivek did not design; contradicts ADR-0008.
- **Omitting anything Vivek cannot be shown to have delivered.** Hides the environment — the
  standard, the scale, the shop — that the whole era's judgement was formed in.
- **A separate LCA-mockups page now.** The plan allowed for it, but with no role lines from Vivek
  it would be a page whose every caption says `supported`; the hub gallery says the same thing with
  less ceremony.
