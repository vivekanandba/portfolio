# SPEC — Vivekanand B Portfolio (v1.4)

> Spec-driven contract. Code follows this; if reality diverges, update this file first.
>
> **v1.4 reconciles three weeks of drift.** v1.3 was written when the site had 15 projects and
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

- One responsive landing page with anchor-nav sections, **a project page for every project (27)** at
  `/work/<slug>/`, a `/work/` index grouped by org, and a `/recommendations/` page.
- Content governed by the **two-tier source policy** (below).
- Downloadable resume PDF.
- SEO + social share (OpenGraph/Twitter, per-project OG images) + JSON-LD `Person`.
- Accessible (WCAG AA target) and fast (static export, near-zero runtime JS).
- **Dark mode** (CSS-variable palette + `data-theme` toggle, pre-paint script).
- **Media**: per-project artifact image, photo galleries, downloadable/linked artifacts.
- **Progressive disclosure** on the landing page so density stays reviewable.

### Terminology

User-facing copy says **"project"**, never "case study" — the latter reads as consulting jargon to an
engineering audience. Internal identifiers (`caseStudySchema`, `src/content/caseStudies/`,
`caseStudyStart`, `/work/` routes) keep their names; this is a copy rule, not a refactor.

### Source policy (two-tier)

The **master resume** (`VIVEKANANDB-RESUME-MASTER-v2.docx`) is the fact source; the **served resume
v15 PDF is the floor** — no site claim may _contradict_ it, though project pages may carry curated
master-resume detail v15 omits. Landing cards stay modest: ≤3 metrics, summary-level claims.
Tracked-changes conflicts resolve toward the v15-consistent value. Any metric absent from v15 ships
only after explicit owner approval.

**Third-party public sources** (a client's or employer's published site, a regulator's database, an
app store) may supply facts and media, subject to §7.

### Out of scope (v1.4) — non-goals

- CMS, backend, database, server-side contact form.
- Blog/writing engine, i18n, heavy animation.
- Hobby/personal repos presented beside professional work (dilutes rather than adds).
- Any private data: see §7.

## 3. Sections (order is the narrative)

| #   | Section                | Goal                       | Key content                                                                                                                                                                                                 |
| --- | ---------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Hero**               | Instant identity + proof   | Domain-arc badge · name · "Staff Engineer · Internal Technical Co-founder — Sanas.ai" · value prop · CTAs · **story-proof grid** (§4) · computed breadth line · inverted timeline · **brand constellation** |
| 2   | **The Arc** (About)    | The differentiator         | 5 beats: Aerospace·Defence·Rail → Entrepreneurship (Gadjoy) → Electronics → Medical Robotics → AI-Native                                                                                                    |
| 3   | **Selected Work**      | Prove impact               | 4 flagship cards visible, rest disclosed; earlier work as era chapters behind disclosure; all link to project pages                                                                                         |
| 4   | **AI-Native Practice** | The differentiating method | "How I direct AI agents" — steps with resume-verbatim proof metrics                                                                                                                                         |
| 5   | **Skills**             | Show breadth               | 6 groups, first 2 visible, rest disclosed                                                                                                                                                                   |
| 6   | **Testimonials**       | Third-party credibility    | 4 of 8 curated recommendations visible, rest disclosed, link to all 25                                                                                                                                      |
| 7   | **Career Timeline**    | Show the journey           | Sanas.ai → NovaSignal → Tech Mahindra → Gadjoy (side venture, `aside`) → Legend → Safran                                                                                                                    |
| 8   | **Credibility**        | Verifiable credentials     | Granted patent, publications, achievements · education · **34 certifications** (disclosed, each linked) · **6 languages**                                                                                   |
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

## 7. Media & privacy policy

Hard-won rules; each exists because something was nearly or actually published in error.

- **Never commit private data.** The LinkedIn full-account export (messages, connections, contact
  details) is gitignored. Only public-profile CSVs may be read. Stage files by path — never
  `git add .`.
- **Audit every photo for third-party PII before publishing.** Device-repair photos that capture an
  _About_ screen expose owner name, serial, IMEI and MAC addresses. Excluded, and recorded so it
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

## 8. Quality gates

| Gate                | Command                 | Enforces                                                                             |
| ------------------- | ----------------------- | ------------------------------------------------------------------------------------ |
| Static quality      | `npm run quality:check` | lint + typecheck + prettier                                                          |
| Unit/component/a11y | `npm run test:coverage` | all tests **and** coverage floors: 93% statements/lines, 86% branches, 85% functions |
| Static export       | `npm run build`         | every route emits with the correct base path                                         |
| End-to-end          | `npm run test:e2e`      | desktop + mobile, data-driven over the project collection                            |
| External links      | `npm run check:links`   | every content URL resolves (advisory — a third-party outage must not block a merge)  |

Coverage floors sit a few points under measured values. **Raise them as coverage improves; never
lower them to make a build pass.** The link check classifies Cloudflare/LinkedIn bot walls
(403/429/999) as _unverified_ rather than failed, so it doesn't cry wolf, and ignores URL fragments
because `fetch` never sends them.

### Known coverage gaps (honest, not aspirational)

`app/page.tsx` and `app/recommendations/page.tsx` sit at 0% — composition-only, never unit-rendered.
The a11y suite renders the landing composition, so **it must stay in sync with `app/page.tsx`**
(a missing section there once went unnoticed). `Nav.tsx` ~78%: IntersectionObserver and theme-toggle
branches are thinly covered.

## 9. Process

- **Spec first for behavioural change.** Schema fields, new sections, new routes and new invariants
  update this file in the same PR. Pure content edits do not.
- **Test-first where it earns its keep** — schema changes, components, invariants. For content edits
  it is theatre; write the assertion alongside instead.
- **Every PR runs the reviewer↔dev loop** (`scripts/ship.sh`, see `docs/pr-workflow.md`): review the
  diff, post findings, fix or rebut, resolve threads, then merge on a green gate.
- **When a bug escapes to build or production, add the invariant that would have caught it.** The
  doubled base path, the duplicate metric key and the uncredited image all became tests.

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

## 11. Project pages

27 static routes `/work/<slug>/` (slug = project id) plus a `/work/` index grouped by org, ordered by
`CASE_STUDY_START` (most recent first). Structure: intro + metric strip → optional artifact image
(credited) → Problem → Constraints → Decisions & tradeoffs → annotated inline-SVG diagram
(token-driven, dark-mode automatic, `role="img"` + title/desc; registry keyed by `DIAGRAM_IDS`,
bijection test-enforced) → Results → optional "From the bench" gallery → optional "Architecture &
artifacts" (local files or external references) → back link. `generateStaticParams` +
`dynamicParams = false`; per-page metadata with absolute canonical; per-slug OG image via the
co-located `opengraph-image.tsx`. Slim `CaseStudyNav` on subpages. E2E is data-driven over the
collection, so a new project is covered automatically.

## 12. Future (designed-for, not built)

Custom domain (`CNAME` + `basePath` change); writing/blog; the aerospace-era media pool awaiting
retrieval (see `MEDIA-TODO.md`).
