# ADR-0006 — Third-party media carries a visible credit

**Status:** Accepted
**Date:** 2026-08-05 (backfilled) **Shipped in:** #27, #28, #29, #35

## Context

Every image on the site was originally the owner's own work product — diagrams they drew, charts they
produced. Then media started arriving from other parties' published sites: Legend Technologies'
product photography (PSOM nose cones, the S200 fixture, an assembly jig), NeuraSignal's product
shots and security documentation, Apple/Sanas App Store screenshots, and a Mapshalli map built on a
Google base layer.

The owner's position was that they had originally supplied some of Legend's photos. Investigation
showed those particular files were uploaded to Legend's site in December 2024, years after the
owner's tenure ended — so the reuse basis rests on the subject matter being their work, not on
authorship of the files. Employer-era work is also commonly work-for-hire regardless of who held the
camera.

Without a visible credit, a page presenting someone else's photograph among the owner's own artefacts
implies authorship it does not have. That is the difference between citing and appropriating.

## Decision

Any image the owner does not own renders a **visible credit** naming the source, as a `figcaption`
beneath it. Credits also name the **subject**, so an image cannot be read as an unstated personal
deliverable — e.g. _"ADE SWIFT centre-wing assembly jig — illustrative of the tooling standard this
work was built to. Photo: Legend Technologies (India) Pvt. Ltd."_

Third-party files are named by source — `media/<source>-*` — and a content test **fails the build**
if any file matching `media/(legend|neurasignal|appstore|mapshalli)-*` lacks a credit.

Base-map and platform attribution is preserved rather than cropped out (the Google "Map data ©2026"
strip stays in frame).

## Consequences

- Adding a new third-party source means extending the regex, which is a deliberate speed bump.
- Credits consume vertical space under images; accepted.
- The naming convention carries semantics, so filenames are not free-form. A near-miss proved the
  value: `sanas-` collided with the owner's _own_ `sanas-for-sales-architecture.jpg` and the test
  caught it immediately — resolved by using the `appstore-` prefix for App Store material.
- A credit is not a licence. The standing recommendation to speak to Legend before relying further on
  their photography is recorded in `MEDIA-TODO.md`.

## Alternatives rejected

- **Credit only in a code comment.** Documents provenance for developers and nobody else; the reader
  still sees an uncredited image.
- **A single site-wide "image credits" page.** Distances the credit from the image, and nobody reads it.
- **Skip third-party media entirely.** The PSOM nose cones are the strongest aerospace artefact on the
  site; refusing them to avoid a caption would be a poor trade.
