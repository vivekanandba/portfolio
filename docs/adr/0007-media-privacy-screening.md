# ADR-0007 — Screen every image for third-party PII before shipping

**Status:** Accepted
**Date:** 2026-08-05 (backfilled) **Shipped in:** #26, #36

## Context

This rule exists because of two near-misses and one actual incident.

**The incident.** The owner's full LinkedIn account export — 48 CSVs including ~5,183 private
messages, 339 connections with their email addresses, phone and WhatsApp numbers, receipts and
ad-targeting data — was committed by a broad `git add` and pushed to a **public** repository, where
it sat in `main` until discovered. It required a `git filter-repo` history rewrite and a force-push.

**Near-miss one.** Harvesting repair photos from gadjoy.in for the Gadjoy gallery, several
before/after cards turned out to photograph the device's _About_ screen — publishing the owner's
name, serial number, IMEIs and MAC addresses of real customers ("Sheikh's iPad", "Dipti's A03").
These were caught only because each image was opened and read before use.

**Near-miss two.** The Stop Hunger dashboard's most data-rich panel is "Distributions: Locations" — a
map plotting the coordinates of settlements needing food relief. Publishing it would have mapped
where vulnerable communities live.

In each case the material was already public on someone else's site. Prior publication by others is
not consent for republication here.

## Decision

**Every image is opened and inspected before it is published.** Never publish based on a filename, a
thumbnail, or an assumption. Specifically:

- **Reject** device screens showing owner names, serial numbers, IMEIs or MAC addresses.
- **Reject** any map or dataset that locates vulnerable people.
- **Prefer frames without identifiable people.** An individual in an employer's marketing photo
  consented to _their_ use of it, not to appearing on a personal portfolio. A CNC-machine photo was
  dropped for this reason and a people-free frame of the same capability used instead.
- **Keep live captures at aggregate zoom** rather than resolving individual homes or hosts.
- **Never `git add .`** while an export or scratch media tree is in the working directory; stage by path.

Exclusions are recorded **in the content file** next to the gallery they apply to, so a future editor
sees why a panel is missing rather than adding it back.

## Consequences

- Media work is slower: every candidate is viewed, and some sets are largely discarded (four of six
  App Store frames, three of the audited Gadjoy cards, one CNC photo).
- Some genuinely better material is refused — the locations map is the most compelling panel on the
  Stop Hunger dashboard.
- `.gitignore` blocks `Basic_LinkedInDataExport*`; `MEDIA-TODO.md` carries the standing cautions.
- Two findings belong to third parties and were reported to the owner rather than fixed here: the
  gadjoy.in cards still carry customer identifiers, and Legend's WordPress media API publicly serves
  40+ job applicants' résumés.

## Alternatives rejected

- **Trust that publicly-posted images are safe to reuse.** Directly falsified: the gadjoy.in cards are
  public and expose customer IMEIs.
- **Automated PII detection on images.** OCR plus pattern matching would help, but a wrong "clean"
  verdict publishes real identifiers; a human read is the backstop, not the fallback.
- **Publish the locations map at low zoom.** Reduces precision without removing the category of harm.
