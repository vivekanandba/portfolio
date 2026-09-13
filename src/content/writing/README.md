# Writing

My learnings, findings and field notes, one Markdown file per post (ADR-0017). The slug is the
filename stem — lower-case `a-z`, `0-9`, `-` — and becomes the URL `/writing/<slug>/`.

## Frontmatter (strict — an unknown key fails the build)

```yaml
---
title: 'Quote a title that contains a colon: like this one'
date: 2026-09-13 # YYYY-MM-DD, a real date, not in the future
updated: 2026-09-14 # optional, not before date
summary: One or two sentences, at most 300 characters. Shown in lists and in the feed.
kind: field-note # learning | finding | field-note | note
tags: [legend-technologies, shop-floor] # lower-case slugs
projects: [legend-technologies] # ids from src/content/experience.ts; the post appears on those pages
draft: true # optional; drafts render only outside production, labelled "Draft"
---
```

## Body rules (the build enforces them)

- No `#` heading in the body — the title is the page's `h1`. Start at `##`.
- Raw HTML is dropped, not rendered: no `<details>`, embeds or iframes. GFM works: tables, task
  lists, strikethrough, fenced code.
- Images live under `public/media/` and are referenced as `/media/<file>`, always with alt text.
  Root-relative links (`/work/<slug>/`) get the base path added at build.
- A quantified claim about a project links its project page or a public source (ADR-0008) — prose
  cannot be type-checked, so this is a review checklist item.
- This folder is prettier-ignored; write the Markdown you mean.

`tests/writing.test.ts` parses and renders every file here on every run.
