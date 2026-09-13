# ADR-0016 — Era archive: every source item surfaces, or its exclusion is written down

**Status:** Accepted
**Date:** 2026-09-13 **Shipped in:** pending

## Context

The two Legend/ENTI capability decks (ADR-0013) hold 147 slides. The era hub (ADR-0015) shows 21
of their photographs with `Role:` tags; the system pages show a few dozen more. Roughly twenty
content slides surface nowhere on the site — the LCH tail-boom jig, UAV launch canisters, racing-car
and A320 parts, the windmill slip ring, the slip-ring technology slides, the factory, ENTI's services
and 2013 events — and neither a reader nor Vivek can tell what was left out or why. Vivek's brief:
"put all the things dated or not dated from the company images, find somewhere to put it — this is
a gold mine of data … I don't want to miss any such detail at all", and "I want deeper elaboration
on all the projects".

The material is uneven in exactly the way ADR-0015 describes: some of it predates 2013, much of it
is undated, and for most items Vivek's own part is not recorded anywhere. A gallery that grew to
sixty items would hide that unevenness; a page per item (ADR-0009) would be a page for three facts
and a photograph. And the guarantee Vivek actually asked for — nothing dropped — is a property of
the whole corpus, not of any one page, so it has to be checked mechanically or it will drift.

The records intake (`source/records/legend-programmes.md`, PR #48) already lists every undated or
role-less item for Vivek to fill in. The archive is the place those answers land.

## Decision

1. **One archive page per era**, at `/archive/<era>/`, listing every catalogued entry from that era's
   source material, grouped by category. The first is `/archive/legend/` over both decks. An entry is
   typed content (`archiveEntrySchema`): id, title, optional customer, category from a closed list,
   a one-paragraph summary written from the transcript, a **tri-state date**
   (`known` with a label · `unknown` · `requested` — CON-DATA-002; `requested` means a row in the
   records table asks Vivek for it), a **role tag** from a closed vocabulary (`led · designed ·
delivered · supported · workplace · company-before · company-undated · company-after`), its
   **sources** (deck + slide numbers, each linking the committed transcript), optional media (the
   gallery-item shape, credited) and an optional link to the project page that tells the story in
   full.
2. **Coverage is test-enforced.** `tests/archive.test.ts` parses `source/decks/*/slides.md` and, for
   every slide of every deck, requires either an archive entry citing it or a row in
   `src/content/archive/exclusions.ts` naming the slide and the reason (title and divider slides,
   third-party rosters and biographies, logo grids, financials, contact details, the controlled org
   chart). A slide that is neither fails the build. The exclusions render on the page too, under
   "What was left out, and why".
3. **Dates and roles stay honest.** A `requested` entry must name its records row (`recordsId`) and
   that row must exist; every records row with a photos folder must be claimed by at least one entry.
   Items before Jan 2013 carry `company-before` and sit under "Company context — before my time";
   the May 2018 certificates carry `company-after` and are stated, not claimed.
4. **Navigation works from any route.** The command palette and the tours decided "am I on the
   landing page?" with `pathname.includes('/work/')`, which is wrong for `/archive/` (and for
   `/writing/`, ADR-0017). Both now check whether the target section exists in the document
   (`document.getElementById`) and route home only when it does not. The palette index accepts
   server-provided entries (`buildIndex(extra)`), fed from the layout, so archive entries are
   searchable everywhere.
5. **Every page that the archive elaborates links to it.** A project page whose id is referenced by
   archive entries shows "In the archive" with the count; the hub and the `/work/` index link the
   archive directly.

## Consequences

- A new route family and a new content type; SPEC v1.7 records both. Static export emits one route
  per era (`generateStaticParams`, `dynamicParams = false`).
- The coverage test makes adding a slide to a deck transcript a content decision: catalogue it or
  exclude it with a reason. That is the point — the guarantee "nothing dropped" is mechanical, not
  remembered.
- The archive shows company items Vivek did not deliver, next to items he did. Every card carries its
  role tag and its date state; the header says so in his voice. Readers who skim see the shop; readers
  who check see exactly what is claimed (ADR-0008).
- Fifteen more screened images enter `public/media/` through `scripts/media-web.json`; each was opened
  and inspected (ADR-0007). Two certificate images were pulled from the source tree in this change:
  they carry the certifying body's signatory's signature — third-party personal data the earlier
  screening missed. The certification facts remain in the transcript and on the archive page.
- Dating the ENTI deck by its 2013 event photographs was wrong: its project cases run to mid-2016
  (BMP-II Nov 2014 – Mar 2015, LCA-Navy opto-electronics Jan – Jun 2016, the augmenter from Jun
  2016 — LinkedIn Projects). The deck README, the transcript preamble and every "2013 estimate"
  wording now say so (CON-DATA-003); the canopy-trolley caption no longer dates the case to 2013.

## Alternatives rejected

- **Expanding the hub gallery to every item.** Sixty-plus tiles is a wall; the hub's point is the loop,
  not the inventory, and the `Role:` tags would drown.
- **Leaving the rest on GitHub only.** The transcripts are already public in the repository, but
  Vivek asked for the material on the site, dated or not, and a reader should not need to read Markdown
  to see it.
- **A page per item.** ADR-0009 is about systems; most archive items have three facts and a photograph.
  Where an item has a story, it already has a project page, and the entry links it.
- **A manual checklist instead of a coverage test.** The list would be right the day it was written and
  wrong the first time a slide was added — the same drift SPEC §9 exists to stop.
