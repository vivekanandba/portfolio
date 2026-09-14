# ADR-0013 — Source material lives in the repo, redacted; originals are release assets

**Status:** Accepted
**Date:** 2026-09-13 **Shipped in:** #43
**Amended:** 2026-09-14 — a fourth kind of source: `source/papers/` holds my published papers, each
with its provenance, a transcript of the substance and the sha256 of the PDF the site serves from
`public/papers/`. A published, peer-reviewed paper outranks a capability deck for the same fact, so
where the two disagree the paper wins and the disagreement is written down. Credentials may link a
local file as well as an external href.
**Amended:** 2026-09-13 — the marker reads _my account only_ (was _self-reported_), the notes live in
`source/my-notes/` (was `source/owner-notes/`) headed `Source: my own account, <date>`, and the site
speaks in the first person: Vivek asked that no "owner" persona appear anywhere; a test enforces it.

## Context

Vivek authored two company capability decks during the Legend Technologies years (2013–2018):
the Legend company deck (v5.5, 99 slides, 28 MB) and the ENTI Innovations corporate deck (v1.4, 48
slides, 259 MB including two large WMV recordings). They are the only visual record of the first eight
years of the career, and Vivek wants them kept in the repository "inside an appropriately named
folder", alongside the master resume that SPEC §2 already names as the fact source.

Three constraints collide. GitHub refuses any file over 100 MB, so the ENTI deck cannot be committed
at all; the local hygiene gate refuses any staged file over 2 MiB, by design. ADR-0008 wants every
site claim to cite something a sceptical reader can check — and the decks are exactly that for the
2013–2018 claims (a slide names Vivek as the slip-ring division's designer; an org chart names
Vivek as ENTI's technical manager). And the decks contain third-party personal data — directors' names,
staff names in team tables and org charts, portraits and career biographies of advisors, a private
company's turnover, phone numbers and e-mail addresses — which ADR-0007 forbids publishing, whatever
the decks' own footers say and whether or not the material was once shown to clients.

A fourth kind of source appeared while planning: Vivek's own account of owning a mechanical
product end to end — bidding, design with GD&T, prototyping, standing on the shop floor with the
lathe, CNC, milling and welding operators, process sheets, first-article proving, handover. Parts of
it are corroborated by the MD's public recommendation and by the decks; the floor-level detail exists
in no record but Vivek's words. ADR-0008 says a claim with no public referent is cut. Cutting the
most formative experience of the era because nobody else wrote it down would be honesty by amputation.

## Decision

1. A top-level `source/` tree holds **source material in Vivek's own hand**: `source/decks/<deck-id>/` (a
   redacted `slides.md` transcript, screened images at original resolution under `media/`, clips under
   `clips/`, and a `media-map.json` recording every original file as kept-with-new-name or excluded-
   with-reason), `source/resume/` (the master resume files moved from the repo root and the served
   v15 PDF's provenance), `source/my-notes/` (dated statements in Vivek's own words,
   verbatim with light punctuation, each headed `Source: my own account, <date>`), and
   `source/papers/<paper-id>/` (a published paper: venue, pagination and authorship, a transcript of
   its substance, the contradictions it creates with other sources, and the sha256 of the PDF served
   from `public/papers/` — assembled deterministically by `scripts/paper-pdf.py`).
2. **Redaction is mechanical and recorded.** The extractor (`scripts/deck-extract.py`) applies a
   checked-in rules file per deck: names of third parties are withheld (the founder, a public figure
   already named on the site, is the one exception), biographies and portraits are omitted, financials
   and contact details are dropped, images with identifiable people, vehicle plates or trademarks are
   excluded, and specific crops/blurs are declared as rules so the output is reproducible. Image
   metadata (EXIF/XMP) is stripped losslessly so pixels are byte-identical to the originals. Every deck
   README carries the redaction log. `tests/source.test.ts` enforces the shape: no phone numbers or
   e-mail addresses anywhere under `source/`, every referenced media file exists and none is orphaned,
   every file ≤ 2 MiB, every note dated in name and header.
3. **Originals are GitHub Release assets**, never git objects: release `source-decks-2026-09` holds
   both `.pptx` files; each deck README records the release tag and the file's sha256; `/*.pptx`,
   `/*.ppt` and `/*.key` are gitignored so the originals in the working directory can never be staged.
4. **Citation rule.** A site claim drawn from source material names its origin in the content-file
   comment (deck + slide, or the note's date). A claim resting **only** on Vivek's own statement is
   rendered with a visible _my account only_ marker citing _my note of YYYY-MM-DD_; a claim
   corroborated by a third-party record (a recommendation, a regulator, a client's site) carries none. Vivek's statements become citable without
   becoming indistinguishable from evidence.

## Consequences

- The repository grows by roughly 45 MB of screened images. Git history cannot shed them later, so the
  media set is curated: near-duplicate thumbnails, logos, stock collages and anything failing the
  people/plate screen are excluded up front rather than "kept just in case".
- The extractor cannot run in CI (the originals are not in the repository), so byte-for-byte
  reproduction of `slides.md` is a documented local check, not a gate. CI tests the produced tree's
  invariants instead — an honest boundary rather than a pretended one (CON-VER-004).
- The redaction rules are the record of what was withheld and why; a future editor who finds a slide
  "missing" reads the reason instead of re-adding it. Withholding every third-party name is blunter
  than judging public-figure status case by case, and deliberately so.
- The _my account only_ marker is new UI surface and a new content invariant (a tradeoff text that
  contains the marker must cite one of Vivek's notes by date). It costs a few words per claim; it
  buys the right to put shop-floor experience on the page at all.
- Release assets are outside the PR review loop; the sha256 lines in the READMEs, checked in review,
  bind the two together, and verification reads the release back rather than trusting the upload
  command's exit code (CON-VER-003).

## Alternatives rejected

- **Git LFS for the originals.** GitHub Pages does not serve LFS objects, every clone pulls ~290 MB,
  and it needs tooling that is not installed; Vivek chose release assets when offered both.
- **Committing the binaries outright.** Impossible for the 259 MB deck and undesirable for the 28 MB
  one: opaque, unsearchable, and permanent in history.
- **A Drive link and nothing in-tree.** Unversioned, unscreened, and it leaves the site's 2013–2018
  claims with nothing checkable behind them.
- **Publishing the transcript unredacted because the decks were once public.** Prior publication by
  the company is not consent from the people named; ADR-0007 already settled this for photographs.
- **Writing Vivek's account into the pages as plain fact.** That is the exact drift ADR-0008
  exists to stop; the marker rule keeps the account and the honesty both.
