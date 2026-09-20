# SPEC — Vivekanand B Portfolio (v1.6)

> Spec-driven contract. Code follows this; if reality diverges, update this file first.
>
> **v1.9 also adds published papers as source material** (ADR-0013, amended): `source/papers/` carries
> the provenance, transcript and sha256 of each paper, the PDF is served from `public/papers/`, and a
> published paper outranks a deck for the same fact.
>
> **v1.9 dates posts by the work** (ADR-0018): a post's `date` is the end of the period it describes,
> `written` records when it was actually written, and both render together — the section is a career
> record filled in retrospectively, and says so.
>
> **v1.8 adds Writing** (ADR-0017): learnings, findings and field notes as Markdown posts under
> `src/content/writing/`, compiled at build to sanitised HTML with strict YAML frontmatter; the routes
> (`/writing/`, `/writing/<slug>/`, an Atom feed, a sitemap) and the landing section follow in the next
> change. The §2 non-goal "blog/writing engine" is withdrawn.
>
> **v1.7 adds the era archive** (ADR-0016): `/archive/<era>/` catalogues every slide of the era's source
> decks as a typed entry with a tri-state date, a role tag and its sources — or lists the slide as
> excluded, with the reason. Coverage is test-enforced; requested dates map to rows in
> `source/records/`. The palette and tours navigate correctly from any route.
>
> **v1.6 adds source material in Vivek's own hand** (ADR-0013): the two Legend/ENTI capability decks and
> Vivek's dated notes live under `source/`, redacted and test-checked; originals are release
> assets. Site claims may cite them; claims resting only on one of those notes are marked
> _my account only_. The site speaks in the first person — the word "owner" never renders
> (test-enforced). **v1.6 also adds motion evidence** (ADR-0014): short, silent simulation clips as a
> fourth media slot — poster, controls, `preload="none"`, never autoplay, ≤ 2 MiB by test — and the
> **era hub page** pattern (ADR-0015): a project page about a way of working rather than a system,
> whose gallery captions each carry a `Role:` tag from a closed vocabulary.
>
> **v1.5 adds the lived-experience layer** (ADR-0011/0012): Turning Points, audience paths, a
> command palette and a Now section — written before implementation, per §9.
>
> **v1.4 reconciled three weeks of drift.** v1.3 was written when the site had 15 projects and
> listed photo galleries and a dark-mode toggle as non-goals; both shipped, along with
> recommendations, certifications, external media with credit rules, and progressive disclosure.
> Everything below was checked against the code, not remembered.

## 1. Purpose & Driving Principle

A single-page personal portfolio landing site that is **convincing and impactful** — the overriding
principle — plus a project page per body of work. Canonical landing page for Vivekanand B.

**Primary audiences (priority order):**

1. **Recruiters / hiring managers** — grasp seniority, breadth and impact in under 20 seconds.
2. **VCs / investors** — founder-grade signal: zero-to-one delivery, patents, ownership.
3. **BD / partners** — credibility and a clear route to contact.

**Success = a first-time visitor can, within ~20 seconds, state:** who he is, the rare
Aerospace → Electronics → Medical Robotics → AI-Native arc, 2–3 quantified achievements, and how to
get in touch or download the resume.

### Driving standard: every claim must be checkable

Impact language is worth nothing unless a sceptical reader can verify it. Where a claim has a public
referent, link it — granted patent, FDA clearance, clinical-trial registration, App Store listing,
live civic site. Prefer a smaller verifiable claim to a larger asserted one. Superlatives ("first",
"only") ship **only** with a citation; otherwise they get cut.

## 2. Scope

### In scope (v1.4)

- One responsive landing page with anchor-nav sections, **a project page for every project (29)** at
  `/work/<slug>/`, a `/work/` index grouped by org, and a `/recommendations/` page.
- Content governed by the **two-tier source policy** (below).
- Downloadable resume PDF.
- SEO + social share (OpenGraph/Twitter, per-project OG images) + JSON-LD `Person`.
- Accessible (WCAG AA target) and fast (static export, near-zero runtime JS).
- **Dark mode** (CSS-variable palette + `data-theme` toggle, pre-paint script).
- **Media**: per-project artifact image, photo galleries, short silent clips, downloadable/linked artifacts.
- **Progressive disclosure** on the landing page so density stays reviewable.
- **Turning Points**: the career as 4–6 decision records — Saw / Bet / Cost / Proved — each linking
  its era's projects (ADR-0011). First-person voice permitted; Vivek reviews wording.
- **Interaction layer** (ADR-0012): audience-path tours from the hero, a ⌘K command palette over a
  build-time index, and a dated Now section derived from the newest certifications. All progressive
  enhancement — the site remains fully functional without JavaScript.
- **Source material** (ADR-0013): a `source/` tree holding the redacted transcripts and screened media
  of Vivek's own capability decks, the resume sources, and Vivek's dated notes — the checkable
  origin of the 2013–2018 claims. Originals are GitHub Release assets, never git objects.
- **Era archive** (ADR-0016): `/archive/<era>/` — every catalogued item from an era's source material
  as a card with a tri-state date (`known` · `unknown` · `requested`), a role tag from the closed
  vocabulary, its deck + slide sources and, where one exists, a link to the project page; every slide
  not catalogued is listed as excluded with a reason, and a test enforces that nothing is neither.
- **Writing** (ADR-0017): my learnings, findings and field notes as Markdown posts with strict
  frontmatter (`title`, `date`, `summary`, `kind`, `tags`, `projects`, `draft`), compiled at build to
  sanitised HTML — no raw HTML, images local and captioned, first person and dated by construction —
  listed at `/writing/`, one page per post, an Atom feed, and "Notes from this project" on the project
  pages a post cites. **Dated by the work** (ADR-0018): `date` is the month the work concluded and
  `written` is when the post was written; both are shown, and the index states the convention.

### Terminology

User-facing copy says **"project"**, never "case study" — the latter reads as consulting jargon to an
engineering audience. Internal identifiers (`caseStudySchema`, `src/content/caseStudies/`,
`caseStudyStart`, `/work/` routes) keep their names; this is a copy rule, not a refactor.

### Source policy (three-tier)

The **master resume** (`source/resume/VIVEKANANDB-RESUME-MASTER-v2.docx`) is the fact source; the
**served resume v15 PDF is the floor** — no site claim may _contradict_ it, though project pages may
carry curated master-resume detail v15 omits. Landing cards stay modest: ≤3 metrics, summary-level
claims. Tracked-changes conflicts resolve toward the v15-consistent value. Any metric absent from v15
ships only after Vivek's explicit approval — such approvals are recorded in the content-file comment.

**Third-party public sources** (a client's or employer's published site, a regulator's database, an
app store) may supply facts and media, subject to §7.

**Source material in Vivek's own hand** (`source/`, ADR-0013) — the capability decks Vivek authored, redacted,
dated first-person notes, and his published papers (`source/papers/`, transcribed and pinned by sha256,
the PDF served from `public/papers/`) — may supply facts and media. A **published paper outranks a
capability deck** for the same fact; where they disagree, the paper is followed and the disagreement is
recorded in the paper's README. A claim drawn from it cites deck + slide
or the note's date in the content-file comment. A claim resting **only** on one of those notes renders
with a visible _my account only_ marker; a claim corroborated by a third-party record carries none.

### Out of scope (v1.4) — non-goals

- CMS, backend, database, server-side contact form.
- i18n, heavy animation. For Writing: comments, reactions, a newsletter, scheduled publishing.
- Hobby/personal repos presented beside professional work (dilutes rather than adds).
- Any private data: see §7.

## 3. Sections (order is the narrative)

| #   | Section                | Goal                       | Key content                                                                                                                                                                                                 |
| --- | ---------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Hero**               | Instant identity + proof   | Domain-arc badge · name · "Staff Engineer · Internal Technical Co-founder — Sanas.ai" · value prop · CTAs · **story-proof grid** (§4) · computed breadth line · inverted timeline · **brand constellation** |
| 2   | **Turning Points**     | The intentionality         | 4–6 pivots as decision records (Saw/Bet/Cost/Proved), era-coloured, linking each era's projects                                                                                                             |
| 2b  | **The Arc** (About)    | The differentiator         | 5 beats: Aerospace·Defence·Rail → Entrepreneurship (Gadjoy) → Electronics → Medical Robotics → AI-Native                                                                                                    |
| 3   | **Selected Work**      | Prove impact               | 4 flagship cards visible, rest disclosed; earlier work as era chapters behind disclosure; all link to project pages                                                                                         |
| 4   | **AI-Native Practice** | The differentiating method | "How I direct AI agents" — steps with resume-verbatim proof metrics                                                                                                                                         |
| 5   | **Skills**             | Show breadth               | 6 groups, first 2 visible, rest disclosed                                                                                                                                                                   |
| 6   | **Testimonials**       | Third-party credibility    | 4 of 8 curated recommendations visible, rest disclosed, link to all 25                                                                                                                                      |
| 7   | **Career Timeline**    | Show the journey           | Sanas.ai → NovaSignal → Tech Mahindra → Gadjoy (side venture, `aside`) → Legend → Safran                                                                                                                    |
| 8   | **Credibility**        | Verifiable credentials     | Granted patent, publications, achievements · education · **34 certifications** (disclosed, each linked) · **6 languages**                                                                                   |
| 8b  | **Now**                | Current AI/ML pulse        | Dated "exploring now" — newest certifications surfaced automatically + hand-written line                                                                                                                    |
| 8c  | **Writing**            | Learnings in my own words  | Latest 3 posts — kind · work date · written date · title · summary — linking `/writing/` (ADR-0017, ADR-0018)                                                                                               |
| 9   | **Contact / Footer**   | Conversion                 | Email, LinkedIn, GitHub, resume · build-time "Last updated"                                                                                                                                                 |

## 4. Hero story-proofs

The hero states **one narrative proof per era**, not raw scale — delivery speed alone no longer
differentiates anyone:

- **430k/day** — in production at sub-100ms
- **FDA-cleared** — robotic platform, cloud stack
- **US patent ↗** — vascular-flow imaging (links the **granted** patent, not the application)
- **15,000+ repairs** — 4.7★, own business

Plus a computed line (`{years}+ yrs · 5 fields · {caseStudies.length} projects`) and the brand
constellation of ~17 clients/employers, tiered by prominence with domain-coloured dots.

## 5. Design (Modern Minimal)

- **Palette:** CSS variables for both schemes. Base off-white `#FAFAF7`, ink `#16161A`, muted
  `#5B5B66`, hairline `#E6E6E0`, accent signal blue `#1D4ED8`. Two quiet domain hues at hairline
  scale: drafting amber (aerospace), clinical teal (healthcare robotics); AI-native reuses accent.
  All ≥4.5:1 contrast in both schemes (test-enforced). Raw Tailwind colours are a smell — the one
  exception is `bg-white` behind letterboxed white-background artwork, which carries a comment.
- **Type:** clean grotesk, large display scale, tabular numerals for metrics.
- **Layout:** generous whitespace, ~72ch content width, mobile-first, subtle scroll-fade only.

## 6. Architecture

- **Stack:** Next.js (App Router) + TypeScript + Tailwind; `output: 'export'` (fully static).
- **Hosting:** GitHub Pages at `https://vivekanandba.github.io/portfolio/`; `basePath: '/portfolio'`,
  `images.unoptimized: true`. `metadataBase` must be **origin-only** — Next already prefixes
  file-convention images with the base path, so including it doubles the path. Regression-locked in
  `tests/seo.test.ts`.
- **Content as typed data:** all copy/metrics in `src/content/*`, validated by Zod at import so bad
  data fails the build loudly. Adding a project = edit data files; components stay prop-driven.
- **Invariants (test-enforced):** projects ↔ project pages ↔ diagram registry are 1:1;
  `slug === projectId`; metric labels unique per strip (they key React lists); every referenced
  media/doc file exists; every image has alt text; third-party media carries a visible credit.
- **Writing compiled at build** (ADR-0017): Markdown posts with strict YAML frontmatter validated by
  Zod (`yaml@2` keeps dates as strings); a synchronous unified pipeline (`remark-parse → remark-gfm →
remark-rehype → rehype-sanitize → rehype-slug → policy → rehype-stringify`) drops raw HTML, sanitises,
  refuses an `h1` in the body and any image not under `/media/` or without alt text, and prefixes
  root-relative links with the base path. The fs-backed library is `src/lib/writing.ts`; no
  `'use client'` file may import it (test-enforced). Zero published posts fails the export build by
  design.

## 7. Media & privacy policy

Hard-won rules; each exists because something was nearly or actually published in error.

- **Never commit private data.** The LinkedIn full-account export (messages, connections, contact
  details) is gitignored. Only public-profile CSVs may be read. Stage files by path — never
  `git add .`.
- **Audit every photo for third-party PII before publishing.** Device-repair photos that capture an
  _About_ screen expose the customer's name, serial, IMEI and MAC addresses. Excluded, and recorded so it
  cannot recur.
- **Never publish maps that locate vulnerable people.** The Stop Hunger dashboard's locations panel
  plots settlements needing relief; only aggregate charts ship.
- **Identifiable individuals** in an employer's marketing photo consented to _their_ use, not this
  site's. Prefer frames without people.
- **Third-party media requires a visible credit**, enforced by test on the
  `media/(legend|neurasignal|appstore|mapshalli)-*` naming convention. Preserve base-map attribution
  rather than cropping it out.
- **Date any live capture**, and bind time-varying figures to the dated snapshot instead of
  presenting them as standing results.
- **Export-control / NDA caution** on defence, ISRO and nuclear imagery; employer product
  screenshots need sign-off. Outstanding gaps and cautions live in `MEDIA-TODO.md`.
- **Source material is redacted before it is committed** (ADR-0013). Third-party names are withheld
  (the company founder, already named on the site, excepted), biographies, portraits, financials and
  contact details are omitted, images with identifiable people or vehicle plates are excluded, and every
  exclusion is logged in the deck README. `tests/source.test.ts` fails the build on any phone number or
  e-mail address under `source/`, any orphaned or missing media file, and any file over 2 MiB.
- **Prior publication is not consent.** A deck once shown to clients, or a photo once on a company
  website, does not license republishing the people or the private data in it.
- **Clips are evidence, not decoration** (ADR-0014). MP4/H.264, ≤ 2 MiB, ≤ 35 s, ≤ 720 p, silent, with
  a mandatory poster (≤ 300 KB), alt text and third-party credit; rendered with the browser's own
  controls and `preload="none"`, never autoplaying. The size budget is a content test that reads file
  sizes from disk. Web copies are produced from `source/` by `scripts/media-web.py` from a checked-in
  manifest; re-encoded clips record their ffmpeg command there.

## 8. Quality gates

Tests are four suites, one per question a failure answers, so a red build says what kind of thing
broke before anyone opens a log. A suite is a directory under `tests/`, so a file's location is its
suite. The rules live in [`specs/0001`](specs/0001-test-suites-and-quality-gates.md).

| Suite      | The question it answers                           | Runs with               |
| ---------- | ------------------------------------------------- | ----------------------- |
| `unit`     | Does the code do what it says?                    | `npm run test:unit`     |
| `contract` | Are the data and the published record still true? | `npm run test:contract` |
| `a11y`     | Can everyone use it?                              | `npm run test:a11y`     |
| `e2e`      | Can a person complete the task?                   | `npm run test:e2e`      |
| `security` | Is anything exploitable, leaked, or unpatched?    | `npm run test:security` |
| `visual`   | Has anything moved that should not have?          | `npm run test:visual`   |
| `infra`    | Is the deployed site up, and is it what we built? | `npm run verify:infra`  |

`security` has no directory: its subjects are the dependency graph, the git history and the
workflow files, so it runs as a script with a `secrets` job in CI. Its rules, and the threat model
behind them, are in [`specs/0002`](specs/0002-security-posture.md).

`visual` and `infra` check the **built artifact and the deployed site** rather than the source, which
is the gap CON-COV-001 has described since 2026-08-08 and which nothing filled. `visual` runs inside
the Playwright container so its committed baselines are compared against the fonts they were made
with; `infra` runs after each deploy and fails it when the live site is not the commit that was just
built. Both are specified in [`specs/0003`](specs/0003-delivery-verification.md).

`contract` is the largest here and the one that is not obvious from outside: it asserts facts and
publication rules rather than behaviour. When it fails the code is usually fine.

| Gate              | Command                 | Enforces                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Static quality    | `npm run quality:check` | lint + typecheck + prettier                                                                                                                                                                                                                                                                                                                                                                    |
| All vitest suites | `npm run test:coverage` | one pass over `unit`, `contract` and `a11y` (measuring per suite would report a file covered only by another suite as uncovered), **aggregate** floors (98% statements/lines, 94% branches, 97% functions, plus per-directory floors on `src/app`, `src/components`, `src/content`, `src/lib`) **and** a **per-file** floor of 90% statements/lines/functions via `scripts/coverage-floor.mjs` |
| Static export     | `npm run build`         | every route emits with the correct base path                                                                                                                                                                                                                                                                                                                                                   |
| End-to-end        | `npm run test:e2e`      | desktop + mobile, data-driven over the project collection                                                                                                                                                                                                                                                                                                                                      |
| Security          | `npm run test:security` | two dependency trees with separate thresholds, checked against `security/audit-allowlist.json`; a recorded exemption that outlives its advisory fails the build. gitleaks scans the **full history** in CI, and `tests/contract/workflows.test.ts` pins every Action to a commit SHA                                                                                                           |
| Size budgets      | `npm run check:size`    | per-file and total limits on the built output, so an oversized image or bundle cannot ship unnoticed                                                                                                                                                                                                                                                                                           |
| Pixel baselines   | `npm run test:visual`   | 16 committed region baselines, generated and compared inside the Playwright container                                                                                                                                                                                                                                                                                                          |
| Deployed site     | `npm run verify:infra`  | run by `deploy.yml` after deploying: the live commit equals the one just built, every route answers, the policy, canonical URLs and feed survive                                                                                                                                                                                                                                               |
| External links    | `npm run check:links`   | every content URL resolves (advisory — a third-party outage must not block a merge)                                                                                                                                                                                                                                                                                                            |
| Source material   | part of `npm test`      | `source/` tree shape, no PII, media references resolve, sizes ≤ 2 MiB, sha256 lines present                                                                                                                                                                                                                                                                                                    |
| Media budgets     | part of `npm test`      | every clip ≤ 2 MiB and every poster ≤ 300 KB on disk; alt, poster and credit present; every project has a chronological anchor; no `TODO` in content                                                                                                                                                                                                                                           |
| Archive coverage  | part of `npm test`      | every slide of every deck is either an archive entry's source or an exclusion with a reason; `requested` dates map to records rows; media exist and are credited                                                                                                                                                                                                                               |
| Writing           | part of `npm test`      | every post parses under the strict frontmatter schema and renders under the policy; each malformed fixture fails naming file and field; sanitisation strips scripts, handlers and `javascript:` URLs; the Atom feed is well-formed; every post carries `written` and it never precedes the work (ADR-0018)                                                                                     |

Coverage floors sit a couple of points under measured values. **Raise them as coverage improves;
never lower them to make a build pass** (CON-COV-002). The link check classifies Cloudflare/LinkedIn bot walls
(403/429/999) as _unverified_ rather than failed, so it doesn't cry wolf, and ignores URL fragments
because `fetch` never sends them.

### Why there are two coverage gates

An aggregate hides things. This repo read 97.94% statements while `app/layout.tsx`, `app/page.tsx`
and `app/recommendations/page.tsx` sat at exactly **0%** — `src/app` had no per-directory floor, and
the 27 fully-covered content files carried the average. So the floors are now enforced twice: vitest
checks the aggregate and each directory, and `scripts/coverage-floor.mjs` checks **every file**, so
no average can paper over a file again.

Branches are held to a lower per-file floor (70%) than statements. A file with four branch points
scores 75% for one uncovered `?? fallback`, so a high per-file branch floor buys assertions written
to move a number rather than to catch a defect; the aggregate branch threshold is the real guard.

The a11y suite no longer hand-copies the landing composition — it renders `<Home />`, so there is no
second list to keep in sync. It had already drifted: `<Contact />` was rendered inside `<main>` while
the page ships it outside as a `<footer>`.

### Spec coverage

Twelve feature specs in [`specs/`](specs/) cover all twelve sections of section 3 and all thirteen
routes the app serves. The number is **derived, not counted**:
`tests/contract/spec-coverage.test.ts` reads this document's section table and walks `src/app`, then
checks both against what each spec declares it owns. A new section or route with no spec fails the
build, and two specs claiming the same section fails too.

This gate exists because the answer used to be sixteen of twenty-six, nobody knew that, and the
missing one was site identity — which is why a missing favicon could never trip anything.

## 9. Process — spec at the start, tests at the end

Nothing ships without the thinking being written down first. This section is the contract; the
`.github/pull_request_template.md` checklist is where it gets enforced per PR.

### 9.1 Which changes need a spec

| Change                                                           | Needs                                      |
| ---------------------------------------------------------------- | ------------------------------------------ |
| New schema field, section, route, component, or invariant        | **SPEC edit + ADR**, before implementation |
| New policy (privacy, credit, terminology, verification)          | **ADR**, before implementation             |
| Reversing or amending an earlier decision                        | **New ADR** superseding the old one        |
| New content (a project, a metric, a photo) using existing fields | No spec; a content-test assertion instead  |
| Refactor with no behavioural change                              | No spec; note the intent in the PR body    |

Decision records live in `docs/adr/`, one per decision, in the format its README defines. Their
structure is test-enforced (`tests/adr.test.ts`): required sections, real content in each, a valid
status, a date, index linkage, and a superseded record naming an existing replacement.

### 9.2 The order of work

1. **Write the spec first.** Extend this file for _what changes_, and add an ADR for _why_, including
   the alternatives being rejected. Commit that **before** the implementation commit, so the branch
   history shows the thinking preceded the code.
2. **Write the failing test** for behavioural work — schema, component, invariant. For content edits
   this is theatre; write the assertion alongside instead.
3. **Implement** until the test passes.
4. **Close the loop at the end.** Before opening the PR: `quality:check`, `test:coverage` (floors
   must hold), `build`, `test:e2e`. Add the invariant that would have caught anything found by hand.
5. **Review** via the reviewer↔dev loop (`scripts/ship.sh`, see `docs/pr-workflow.md`): review the
   diff, post findings, fix or rebut, resolve threads, merge on a green gate.
6. **Verify the deploy**, not just the merge — check the live URL. Two bugs this project shipped
   (the doubled base path, a retired certificate domain) were only ever visible off-box.

### 9.3 Standing rules

- **When a bug escapes to build or production, add the invariant that would have caught it.** The
  doubled base path, the duplicate metric key and the uncredited image all became tests.
- **Never lower a coverage floor to make a build pass.** Raise them as coverage improves.
- **Verify a gate enforces before trusting it.** Glob coverage thresholds silently do nothing if the
  pattern misses; prove failure with a deliberately impossible value.
- **A spec is not a record of intent, it is a record of decision.** If reality diverges, the spec is
  wrong and gets fixed — not quietly tolerated, which is how v1.3 fell 27 commits behind.

## 10. Acceptance criteria

- [ ] All sections render from `src/content` (test-verified).
- [ ] Every content file passes its Zod schema; invalid data fails loudly.
- [ ] `npm run build` emits a static `out/` with the correct `/portfolio` base path.
- [ ] Resume PDF downloads.
- [ ] Zero jest-axe violations, including disclosed (`hidden`) content.
- [ ] Playwright passes on mobile + desktop.
- [ ] `quality:check` clean; `test:coverage` meets floors.
- [ ] SEO: title/description, OG/Twitter, per-project OG image, JSON-LD `Person`.
- [ ] Every third-party image carries a visible credit; every image has alt text.
- [ ] No private or third-party PII anywhere in the repo or the build.
- [ ] Every Markdown post parses and renders; a malformed post fails the build naming the file and the field.

## 11. Project pages

29 static routes `/work/<slug>/` (slug = project id) plus a `/work/` index grouped by org, ordered by
`CASE_STUDY_START` (most recent first). Two kinds of page share the structure: **system pages**
(one per distinct system, ADR-0009) and **era hub pages** (ADR-0015 — a way of working; its decisions
are lifecycle stages with their corroboration named, its gallery is the company's programme portfolio
with a `Role:` tag on every caption, and it links system pages without restating their metrics). Structure: intro + metric strip → optional artifact image
(credited) → Problem → Constraints → Decisions & tradeoffs → annotated inline-SVG diagram
(token-driven, dark-mode automatic, `role="img"` + title/desc; registry keyed by `DIAGRAM_IDS`,
bijection test-enforced) → Results → optional "From the bench" gallery → optional "In motion" clips
(ADR-0014: poster, controls, silent, `preload="none"`) → optional "Architecture & artifacts" (local
files or external references) → back link. `generateStaticParams` +
`dynamicParams = false`; per-page metadata with absolute canonical; per-slug OG image via the
co-located `opengraph-image.tsx`. Slim `CaseStudyNav` on subpages. E2E is data-driven over the
collection, so a new project is covered automatically.

**Archive pages** (ADR-0016): one static route per era at `/archive/<era>/` (`generateStaticParams` +
`dynamicParams = false`; metadata via `archiveMetadata`). Structure: first-person header stating the
rule (everything in the decks is here or listed as excluded) with counts → category sections of
entry cards (title · customer · date badge · role tag · summary · credited thumbnails · deck + slide
links into the committed transcript · project link) → "What was left out, and why" (the exclusions)
→ back links. Project pages referenced by archive entries show an "In the archive" block; the
`/work/` index links the archive. The command palette indexes archive entries via `buildIndex(extra)`,
and palette/tour anchor navigation checks `document.getElementById` instead of the pathname.

**Writing** (ADR-0017; routes land in the change after the engine): `/writing/` (newest first, kind
label per post), `/writing/<slug>/` (`generateStaticParams` over published posts, `dynamicParams =
false`, `notFound()` guard, absolute canonical, article OpenGraph with published/modified times, a
co-located typographic `opengraph-image.tsx`), `/feed.xml` (Atom 1.0, summary-only, `dynamic =
'force-static'`), `/sitemap.xml` for every route. Slug = filename stem. Drafts render only outside
production, labelled. Project pages referenced by a post's `projects` show "Notes from this project".
Posts sort by the work date; the feed and the sitemap take their recency from `written` (ADR-0018).

## 12. Future (designed-for, not built)

- An LCA-mockups page split out of the Legend hub gallery, if Vivek supplies per-item role lines
  (ADR-0015 §4).

- A syntax highlighter for code fences and per-kind index pages for Writing (ADR-0017).

Custom domain (`CNAME` + `basePath` change); the aerospace-era media pool awaiting retrieval (see
`MEDIA-TODO.md`).
