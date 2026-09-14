# Architecture Decision Records

`SPEC.md` says **what** this site is. These records say **why** — the context a decision was made
in, what was chosen, what it costs, and what was rejected. A future reader (including a future me)
can then change a decision deliberately instead of rediscovering the reasoning by accident.

## Honesty note

**ADRs 0001–0010 are backfilled.** They were written on 2026-08-05, after the features they
describe had already shipped in PRs #22–#37. The decisions were real and were argued at the time —
several inside PR review threads — but they were not written down first, which is the gap this
directory closes. Each record names the PR that actually shipped it, so the sequence is
recoverable rather than implied.

From ADR-0011 onward, records are written **before** implementation (see `SPEC.md` §9).

## Index

| ADR                                      | Decision                                                                  | Status   | Shipped in   |
| ---------------------------------------- | ------------------------------------------------------------------------- | -------- | ------------ |
| [0001](0001-testimonials-verbatim.md)    | Republish recommendations verbatim, curate a subset                       | Accepted | #22          |
| [0002](0002-terminology-projects.md)     | Say "projects", never "case studies"                                      | Accepted | #24          |
| [0003](0003-hero-story-proofs.md)        | Hero proves one story per era, not raw scale                              | Accepted | #24, #26     |
| [0004](0004-progressive-disclosure.md)   | Disclose with `hidden`, never unmount                                     | Accepted | #25          |
| [0005](0005-media-model.md)              | Three media slots: artifact, gallery, artifacts list                      | Accepted | #25–#30, #33 |
| [0006](0006-third-party-media-credit.md) | Third-party media carries a visible credit                                | Accepted | #27–#29, #35 |
| [0007](0007-media-privacy-screening.md)  | Screen every image for third-party PII before shipping                    | Accepted | #26, #36     |
| [0008](0008-claims-must-be-checkable.md) | Every claim links to a public referent, or is cut                         | Accepted | #32, #33     |
| [0009](0009-one-project-per-system.md)   | One project page per distinct system                                      | Accepted | #31          |
| [0010](0010-quality-gates.md)            | Enforce coverage floors and external link integrity                       | Accepted | #37          |
| [0011](0011-turning-points.md)           | Turning Points: the career told as decision records                       | Accepted | #41          |
| [0012](0012-interaction-layer.md)        | Audience paths, command palette, Now section                              | Accepted | #42          |
| [0013](0013-source-material-in-repo.md)  | Source material in the repo, redacted; originals released                 | Accepted | #43          |
| [0014](0014-motion-evidence-clips.md)    | Motion evidence: short muted clips with posters                           | Accepted | #44          |
| [0015](0015-era-hub-page.md)             | An era hub page for the Legend years                                      | Accepted | #45          |
| [0016](0016-era-archive.md)              | Era archive: every source item surfaces, or its exclusion is written down | Accepted | #49          |
| [0017](0017-writing-section.md)          | A Markdown writing section, compiled at build                             | Accepted | #50          |
| [0018](0018-posts-dated-by-the-work.md)  | A post is dated by the work it describes, and says when it was written    | Accepted | pending      |

## Format

Each record is short and fixed-shape, validated by `tests/adr.test.ts`:

```
# ADR-NNNN — Title
**Status:** Accepted | Superseded by ADR-NNNN | Rejected
**Date:** YYYY-MM-DD   **Shipped in:** #PR (or "not yet shipped")

## Context      — the forces at play, including what went wrong
## Decision     — what we do, stated so it can be checked
## Consequences — what this costs, and what enforces it
## Alternatives rejected — options considered and why they lost
```

A decision is never edited into a different decision. To change one, add a new ADR and mark the old
one `Superseded by ADR-NNNN`.
