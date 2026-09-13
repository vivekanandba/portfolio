# ADR-0017 — A Markdown writing section, compiled at build

**Status:** Accepted
**Date:** 2026-09-13 **Shipped in:** pending
**Supersedes:** the SPEC §2 non-goal "Blog/writing engine" (v1.3 – v1.7)

## Context

SPEC §2 has listed "Blog/writing engine" as a non-goal since v1.3, for good reasons: a static export
with near-zero client JavaScript, typed content validated at import, and claims a sceptical reader
can check. Vivek now wants exactly this: "another section … where I want to publish some of my
learnings, findings and other such things — basically like my own blog. So make provisions for it."
He chose Markdown files as the authoring format, a section named **Writing** at `/writing/`, and a
teaser on the landing page after Now.

Facts that shape the design (verified against the repository): nothing Markdown-related is
installed (dependencies are next, react, react-dom, zod); `output: 'export'` fails the build when a
dynamic route has zero static params, so the section needs at least one published post from day one;
`yaml@2` keeps `date: 2026-09-13` a string where gray-matter would coerce it to a `Date`;
`remark-rehype` drops raw HTML unless told otherwise, so sanitising is defence in depth against
`javascript:` URLs rather than the only line; `src/content/index.ts` is imported by client components,
so nothing fs-backed may be exported from it; Playwright specs run as CommonJS on Node 20 and cannot
import the ESM Markdown pipeline; the palette and tours navigate correctly from any route since
ADR-0016.

## Decision

1. **Posts are Markdown files** under `src/content/writing/<slug>.md`; the slug is the filename stem
   (`^[a-z0-9-]+$`, not `feed.xml`). YAML frontmatter, parsed with `yaml@2` and validated by a
   strict Zod schema (`postFrontmatterSchema`): `title`, `date` (a real calendar date, `YYYY-MM-DD`,
   not in the future), optional `updated` (not before `date`), `summary` (≤ 300 characters), `kind`
   (`learning · finding · field-note · note`), `tags`, `projects` (ids that exist), `draft`
   (default false). A malformed post fails the build naming the file and the field.
2. **Compiled at build, sanitised, no raw HTML.** A synchronous unified pipeline —
   `remark-parse → remark-gfm → remark-rehype → rehype-sanitize → rehype-slug → heading
collector → policy plugin → rehype-stringify` — in `src/lib/writing.ts`. The policy plugin throws
   on an `h1` in the body, on an image outside `/media/`, on an image without alt text, and prefixes
   root-relative links and images with the base path. Sanitising runs before slugging so heading ids
   are never clobber-prefixed. Reading time is words ÷ 200, minimum one minute. Output is
   deterministic: explicit sort (date desc, slug asc), no clock in rendered output. Drafts are
   excluded when `NODE_ENV` is `production` and shown with a "Draft" label otherwise.
3. **Routes and surfaces** (the next change): `/writing/` (newest first), `/writing/<slug>/`
   (`generateStaticParams`, `dynamicParams = false`, `notFound()` guard, canonical URL, article
   OpenGraph, a co-located typographic `opengraph-image.tsx`), `/feed.xml` (Atom 1.0, summary-only,
   `dynamic = 'force-static'`), `/sitemap.xml` for the whole site, a **Writing** landing section
   after Now (latest three), a nav link, palette rows, and "Notes from this project" on project pages
   referenced by a post's `projects`.
4. **The library never reaches the client.** `src/lib/writing.ts` reads the filesystem; a test
   asserts no `'use client'` file imports it. The content barrel stays fs-free.
5. **Posts carry no evidence marker.** They are first-person and dated by construction. A quantified
   claim about a project in a post links the project page or a public referent (ADR-0008) — a review
   checklist item, since prose cannot be type-checked.

## Consequences

- Ten build-time ESM dependencies, pinned exactly (unified 11.0.5, remark-parse 11.0.0, remark-gfm
  4.0.1, remark-rehype 11.1.2, rehype-sanitize 6.0.0, rehype-slug 6.0.0, rehype-stringify 10.0.1,
  unist-util-visit 5.1.0, hast-util-to-string 3.0.1, yaml 2.9.1; dev `@types/hast` 3.0.5). No MDX, no
  gray-matter, no syntax highlighter yet, no typography plugin — a `.post-body` block in
  `globals.css` using the existing tokens.
- Raw HTML in posts is dropped, not rendered: no `<details>`, embeds or iframes. Images must live
  under `public/media/` and carry alt text, like every other image on the site.
- Zero published posts breaks the export build by design; the first post ships with the engine and
  the content test says why.
- `src/content/writing/` joins `.prettierignore` (prettier rewrites Markdown); the link checker and
  the TODO/TBD invariant extend to `.md`.
- SPEC §2 gains "Writing" in scope and loses the non-goal; §3 gains row 8c; §6, §8, §10, §11 and §12
  record the pipeline, gates, acceptance items, routes and follow-ups (highlighter, kind-filter pages).

## Alternatives rejected

- **MDX.** Components inside prose invite exactly the client JavaScript and unreviewable markup the
  constraints forbid; the posts are essays, not apps.
- **Typed TypeScript posts like the rest of `src/content`.** Prose in string literals is unwritable at
  length; Vivek asked for Markdown.
- **gray-matter.** Coerces `date:` to a JavaScript `Date` (timezone drift on a static build) and is
  unmaintained; `yaml@2` plus a strict Zod schema is smaller and honest about types.
- **contentlayer / velite.** A second build system and a generated-types layer for one content type.
- **An external blog (Medium, Substack).** The whole point is that learnings sit beside the work they
  came from, under the same claims discipline and the same review gates.
- **Client-side rendering of Markdown.** Ships a parser to every visitor to render text that never
  changes between builds.
