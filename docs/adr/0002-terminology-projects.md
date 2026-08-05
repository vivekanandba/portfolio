# ADR-0002 — Say "projects", never "case studies"

**Status:** Accepted
**Date:** 2026-08-05 (backfilled) **Shipped in:** #24

## Context

The long-form pages were built and labelled "case studies" throughout — page H1, card eyebrows
("Case Study · Sanas.ai"), link text ("Read the case study →"), SEO descriptions and OG alt text.

The owner corrected this directly: _"In our industry, we don't call it case study, we call it
projects."_ The audience is engineers and engineering leaders, to whom "case study" reads as
consulting or marketing register. It quietly signals that the page is a sales artefact rather than a
description of work.

## Decision

All **user-facing copy** says "project". Internal identifiers keep their existing names:
`caseStudySchema`, `src/content/caseStudies/`, `caseStudyStart()`, `caseStudyByProjectId`, and the
`/work/<slug>/` routes.

This is a copy rule, not a refactor. URLs especially stay put — they are already public and linked.

## Consequences

- A permanent mismatch between code vocabulary and site vocabulary, which will look like an
  oversight to a new reader. Recorded here and in `SPEC.md` §2 precisely so it reads as deliberate.
- New content files copied from an existing one inherit the correct `eyebrow` shape, but the risk of
  reintroducing "Case Study" via a template is real; grep before shipping content.
- Test assertions reference the user-facing strings, so a regression in copy fails the suite.

## Alternatives rejected

- **Rename the internals too.** Touches 27 content files, the schema, the diagram registry and every
  test, changes no user-visible behaviour, and risks breaking the enforced bijections for cosmetics.
- **Change the routes to `/projects/`.** The URLs are public and already linked from the live site;
  breaking them to match vocabulary is a bad trade.
- **Keep "case studies".** Rejected by the owner, who knows the audience.
