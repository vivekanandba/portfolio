# SPEC-0008 — Writing

**Status:** Active **Since:** 2026-09-20 **Shipped in:** #71
**Covers:** Writing
**Routes:** `/writing/` · `/writing/<slug>/` · `/writing/<slug>/opengraph-image` · `/feed.xml`

## What

Posts in Vivek's own words about work he did, compiled from markdown at build time (ADR-0017).

**Posts are dated by the work, not by the writing** (ADR-0018). A post about the 2015 Godrej slip
ring is dated 2015, so `/writing/` reads as a career in sequence rather than as a burst of authoring
in 2026. The real writing date is recorded in `written` and stated **once, quietly**, in a colophon
below the article — never in the meta line above the title and never on an index card. Vivek accepted
the honesty point and asked that it not be prominent.

The voice is **first person singular, always**. Where a dictated note says "we" about something he
did himself, that is transcription slack, not modesty to preserve. Attributing his work to a
collective erases the thing these posts exist to record.

## Rules

- **R1.** Every post parses under a strict frontmatter schema. A malformed post fails the build
  naming the file and the field.
- **R2.** `date` is the end of the work described; `written` is when it was written and never
  precedes `date`. Neither may be in the future, allowing for the author writing in IST while the
  build runs in UTC.
- **R3.** The index orders by the work date. Feed recency uses `written`, then `updated`, then
  `date`.
- **R4.** The written date appears once per post, below the article, machine-readable, and nowhere
  else.
- **R5.** Markdown is sanitised on the way in: no scripts, no event handlers, no `javascript:` URLs.
- **R6.** The feed is well-formed Atom with one entry per published post.
- **R7.** Drafts are emitted outside production only.
- **R8.** The writing library stays on the server. Nothing filesystem-backed is exported through the
  content barrel, which client components import.
- **R9.** Posts speak in the first person singular, and the site says nothing it cannot source.

## Verification

```sh
npx vitest run tests/unit/writing.test.ts tests/unit/writing-pages.test.tsx
npx vitest run tests/contract/content.test.ts     # R9, the voice and sourcing guards
npx playwright test tests/e2e/writing.spec.ts
npm run test:visual                               # the post-header baseline
```

R1 is checked against fixtures under `tests/fixtures/writing/bad/`, each of which must fail for its
own stated reason — a parser that accepts everything passes every test.

## Not doing

- **Comments, reactions or a newsletter.** Nothing to host them on, and nothing to moderate them
  with.
- **Tags as routes.** The palette searches by tag; a page per tag would be mostly empty.
- **Backdating a post's `written` date** to make the sequence tidier. The work date carries the
  narrative and the written date carries the truth; conflating them was the thing ADR-0018 refused.

## Revisions

| Date       | Change                                                                           | Covered by                   |
| ---------- | -------------------------------------------------------------------------------- | ---------------------------- |
| 2026-09-20 | Written with R1–R9, consolidating ADR-0017 and ADR-0018 including its amendment. | `tests/unit/writing.test.ts` |
