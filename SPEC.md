# SPEC — Vivekanand B Portfolio (v1.3)

> Spec-driven contract. Code follows this; if reality diverges, update this file first.

## 1. Purpose & Driving Principle

A single-page personal portfolio landing site that is **convincing and impactful** — this is the
overriding principle. It is the canonical landing page for Vivekanand B "for a long time to come."

**Primary audiences (in priority order):**

1. **Recruiters / hiring managers** (job search) — need to grasp seniority, breadth, and impact in
   under 20 seconds.
2. **VCs / investors** (fundraising) — need the founder-grade signal: zero-to-one delivery,
   patents, ownership, intrapreneurial track record.
3. **BD / partners** — need credibility and a clear way to make contact.

**Success = a first-time visitor can, within ~20 seconds, state:** who he is, the rare
Aerospace→Electronics→AI-Native arc, 2–3 quantified achievements, and how to contact / get the
resume.

## 2. Scope

### In scope (v1.3)

- One responsive landing page, anchor-nav sections (below), plus a **case-study page for every
  project card** (15) under `/work/<slug>/` and a **`/work/` index** grouping them by chapter.
- Content governed by the **two-tier source policy** (below).
- Downloadable resume PDF.
- SEO + social share (OpenGraph/Twitter) + JSON-LD `Person` structured data.
- Accessible (WCAG AA target) and fast (static export, near-zero runtime JS).

### Source policy (two-tier)

The **master resume** (`VIVEKANANDB-RESUME-MASTER-v2.docx`) is the fact source for all site
content; the **served resume v15 PDF is the floor** — no site claim may _contradict_ it, but
case-study pages may carry curated master-resume detail that v15 omits. Landing-page cards stay
modest: ≤3 metrics, summary-level claims. Master-resume tracked-changes conflicts resolve toward
the v15-consistent value ("Agent Directors" not "Agent Boss", unversioned model names, Gadjoy
4.7+/80%, Legend ends Nov 2016, "Sanas Core" not "Core6"); Tech Mahindra (absent from v15) stays
excluded. Any metric absent from v15 ships only after explicit owner approval — the v1.2 removals
(SI coverage/SLA, Portal 70%/100%, Internal Tools card, FICV detail, A350 specifics) are
reinstated under this policy, subject to that item-by-item approval.

### Out of scope (v1.3) — Non-goals

- CMS, backend, database, server-side contact form.
- Blog/writing engine, photo galleries (designed-for, not built).
- Dark mode toggle, heavy animation, i18n.

## 3. Sections (order is the narrative)

| #   | Section                    | Goal                       | Key content                                                                                                                                                                                                                                                                                                                                                     |
| --- | -------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Hero**                   | Instant identity + CTA     | Domain-arc badge (Aerospace → Healthcare Robotics → AI-Native) · Name · title line "Staff Software Engineer & Technical Lead — Sanas.ai" · "Engineer · Intrapreneur · AI-Native Architect" eyebrow · one-line value prop · CTAs: View Work, Download Resume, LinkedIn, GitHub · stats strip: 15+ years (computed) / 430k/day requests in production / US patent |
| 2   | **The Arc** (About)        | The differentiator         | 4 beats: Aerospace Mechanical (ISRO/Safran/P&W) → Founder (Gadjoy, 2016–20) → Electronics & Healthcare Robotics (NovaSignal) → AI-Native Software (Sanas.ai). Intrapreneur/internal co-founder framing.                                                                                                                                                         |
| 3   | **Selected Work**          | Prove impact               | Project cards w/ quantified metrics (see §4 list). Flagship cards link to case-study pages; cards with public artifacts link out (App Store, product page, patent).                                                                                                                                                                                             |
| 4   | **AI-Native Practice**     | The differentiating method | "How I direct AI agents" — 4 steps (Plan → Direct parallel agents → Human review gates → Verify & ship), each with a resume-verbatim proof metric.                                                                                                                                                                                                              |
| 5   | **Skills**                 | Show breadth               | Grouped: AI & LLM · Mobile/Frontend · Backend/Architecture · Cloud & MLOps · Core Engineering (CATIA/Ansys)                                                                                                                                                                                                                                                     |
| 6   | **Career Timeline**        | Show the journey           | Sanas.ai → NovaSignal/NeuraSignal → Gadjoy (Founder) → Legend Technologies → Safran. Node dots + track labels carry the domain accent hue.                                                                                                                                                                                                                      |
| 7   | **Patents & Publications** | Credibility                | US20230329668A1; aerospace/slip-ring white papers                                                                                                                                                                                                                                                                                                               |
| 8   | **Education & Learning**   | Foundation                 | VTU BE Mechanical (First Class w/ Distinction, 2011); Andrew Ng DL/ML specializations + AI courses                                                                                                                                                                                                                                                              |
| 9   | **Contact / Footer**       | Conversion                 | Email, LinkedIn, GitHub, resume download · profile-framed copy · "Last updated Month Year" (build-time)                                                                                                                                                                                                                                                         |

## 4. Selected Work (featured + secondary) — metrics are verbatim from resume v15

- **Sanas Consumer App (React Native)** — shipped production B2C in <4 weeks with zero prior mobile
  experience via multi-agent AI workflow; 100% iOS/Android parity; 9-language localization;
  onboarding ~1.5 min. Case study + App Store proof link.
- **Speech Intelligence Platform** — privacy-first edge voice analytics; ClickHouse OLAP pipeline;
  queue-driven multi-track LLM workers; real-time call widget + **30s-refresh fraud dashboard**
  (the only v15-verbatim SI metric). Product-page proof link.
- **Playground** — triple-track async audio orchestration (FastAPI/Asyncio); Triton/gRPC sub-100ms
  chunk latency; AWS EKS + Modal (H100/T4) autoscaling; **430k requests/day**. Case study.
- **Sanas for Sales (AI Copilot)** — hybrid Chrome Extension/Desktop, concept→Enterprise GA in
  3 months; multi-modal RAG with <4s latency for live objection handling. Case study (no public
  product page exists — verified).
- **Unified ML Platform** — Kubernetes-native hub-and-spoke (MLflow); audits w/ 10+ research
  scientists; resolved reproducibility, accelerated deployment.
- **AI-Next Strategy** — democratized coding agents to **80% of workforce**; "Crawl, Walk, Run"
  adoption; delivery timelines accelerated **40%+**.
- (Earlier / secondary) Rendered as a quiet "More work" list under the featured grid, ordered:
  **Admin Portal** (regions, 60% fewer tickets), **Internal Tools Portal** (restored v1.3),
  **MLOps Observability & Model Cards** (new v1.3) (Sanas); **GCP Telemetry & Data View**,
  **Healthcare Interoperability** (HIPAA/HL7/DICOM), **AI-Driven Test Automation** (30% shorter
  regression cycles) (NovaSignal); **Aerospace Tooling — ISRO/Safran/P&W**, **Defence & Nuclear
  Engineering — BEL/IGCAR** (restored v1.3) (Legend); **Mapshalli volunteer work** (Stop Hunger,
  AirCare — mapshalli.org proof link). Every card links to its case study (titles are links);
  every project has one (test-enforced bijection).

## 5. Design (Modern Minimal)

- **Palette:** base off-white `#FAFAF7`, ink `#16161A`, muted `#5B5B66`, hairline `#E6E6E0`, single
  accent deep signal blue `#1D4ED8` (links, key metrics, CTA only). Plus two quiet domain hues at
  hairline scale only (arc numerals, timeline dots/track labels, More-work dots): drafting amber
  `#B45309`/`#F59E0B` (aerospace) and clinical teal `#0F766E`/`#14B8A6` (healthcare robotics);
  AI-Native reuses the accent blue. All must hold ≥4.5:1 contrast on paper in both schemes
  (test-enforced).
- **Type:** clean grotesk (Inter/Geist), large confident display scale, tabular numerals for
  metrics. Strong hierarchy over decoration.
- **Layout:** generous whitespace, content max-width ~72ch, responsive (mobile-first), subtle
  scroll-fade only. Avoid generic-AI aesthetic — restraint + typographic craft.

## 6. Architecture

- **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS; `output: 'export'` (fully static).
- **Hosting:** GitHub Pages project page from `vivekanandba/portfolio` →
  `https://vivekanandba.github.io/portfolio/`; `basePath: '/portfolio'`, `images.unoptimized: true`.
- **Content as typed data:** all copy/metrics live in `src/content/*` validated by Zod schemas.
  Adding a project/metric/photo = edit one data file; components are prop-driven and untouched.

## 7. Acceptance Criteria

- [ ] All 8 sections render with content sourced from `src/content` (verified by tests).
- [ ] Every content data file passes its Zod schema; invalid data fails the build/tests loudly.
- [ ] `npm run build` produces a static `out/` with correct `/portfolio` base path on assets/links.
- [ ] Resume PDF downloads from the page.
- [ ] Lighthouse-grade: no a11y violations (jest-axe zero violations); semantic landmarks present.
- [ ] Playwright smoke passes on mobile + desktop viewports.
- [ ] `npm run quality:check` (lint + typecheck + format) clean.
- [ ] SEO: title/description, OpenGraph/Twitter tags, JSON-LD `Person` present.

## 8. Case-study pages (v1.3)

Fifteen static routes `/work/<slug>/` (slug = project id, one per project card) plus a `/work/`
index page grouping studies by chapter (Sanas.ai / NovaSignal / Legend & community) with
domain-accent dots. Content model: `caseStudySchema` collection in `src/content/caseStudies/`
(one file per slug, ordered via `index.ts`) keyed by `projectId`; structure per page: intro +
metric strip → Problem → Constraints → Decisions & tradeoffs → annotated inline-SVG systems
diagram (token-driven, dark-mode automatic, `role="img"` + title/desc; registry keyed by
`DIAGRAM_IDS`, bijection test-enforced) → Results → back link. `generateStaticParams` +
`dynamicParams = false`; per-page metadata with absolute og:url + canonical. Subpage header is a
slim `CaseStudyNav` (brand, "All case studies" → `/work/`, Resume) — the landing Nav stays
anchor-based. Facts per the two-tier source policy (§2). E2E is data-driven over the collection.

## 9. Future (designed-for, not built)

Photo galleries (drop images in `public/`); custom domain (`CNAME` + change `basePath`);
writing/blog; dark mode toggle.
