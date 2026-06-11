# SPEC — Vivekanand B Portfolio (v1)

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

### In scope (v1)

- One responsive page, anchor-nav sections (below).
- Static content sourced verbatim from the existing resume (no invented facts/metrics).
- Downloadable resume PDF.
- SEO + social share (OpenGraph/Twitter) + JSON-LD `Person` structured data.
- Accessible (WCAG AA target) and fast (static export, near-zero runtime JS).

### Out of scope (v1) — Non-goals

- CMS, backend, database, server-side contact form.
- Blog/writing engine, project detail pages, photo galleries (designed-for, not built).
- Dark mode toggle, heavy animation, i18n.

## 3. Sections (order is the narrative)

| #   | Section                    | Goal                   | Key content                                                                                                                                                                 |
| --- | -------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Hero**                   | Instant identity + CTA | Name · "Engineer · Intrapreneur · AI-Native Architect" · one-line value prop · CTAs: View Work, Download Resume, LinkedIn, GitHub, Email                                    |
| 2   | **The Arc** (About)        | The differentiator     | 3 beats: Aerospace Mechanical (ISRO/Safran/P&W) → Electronics & Healthcare Robotics (NovaSignal) → AI-Native Software (Sanas.ai). Intrapreneur/internal co-founder framing. |
| 3   | **Selected Work**          | Prove impact           | Project cards w/ quantified metrics (see §4 list). Future photo/case-study slot.                                                                                            |
| 4   | **Skills**                 | Show breadth           | Grouped: AI & LLM · Mobile/Frontend · Backend/Architecture · Cloud & MLOps · Core Engineering (CATIA/Ansys)                                                                 |
| 5   | **Career Timeline**        | Show the journey       | Sanas.ai → NovaSignal/NeuraSignal → Gadjoy (Founder) → Legend Technologies → Safran                                                                                         |
| 6   | **Patents & Publications** | Credibility            | US20230329668A1; aerospace/slip-ring white papers                                                                                                                           |
| 7   | **Education & Learning**   | Foundation             | VTU BE Mechanical (First Class w/ Distinction, 2011); Andrew Ng DL/ML specializations + AI courses                                                                          |
| 8   | **Contact / Footer**       | Conversion             | Email, LinkedIn, GitHub, resume download                                                                                                                                    |

## 4. Flagship projects (Selected Work) — metrics are verbatim from resume

- **Sanas Consumer App (React Native)** — shipped production B2C in <4 weeks with zero prior mobile
  experience via multi-agent AI workflow; 100% iOS/Android parity; 9-language localization;
  onboarding ~1.5 min.
- **Speech Intelligence Platform** — privacy-first edge voice analytics; ClickHouse OLAP pipeline;
  queue-driven multi-track LLM workers; real-time call widget + 30s fraud dashboard.
- **Playground** — triple-track async audio orchestration (FastAPI/Asyncio); Triton/gRPC sub-100ms
  chunk latency; AWS EKS + Modal (H100/T4) autoscaling; **430k requests/day**.
- **Sanas for Sales (AI Copilot)** — hybrid Chrome Extension/Desktop, concept→Enterprise GA in
  3 months; multi-modal RAG with <4s latency for live objection handling.
- **Unified ML Platform** — Kubernetes-native hub-and-spoke (MLflow); audits w/ 10+ research
  scientists; resolved reproducibility, accelerated deployment.
- **AI-Next Strategy** — democratized coding agents to **80% of workforce**; "Crawl, Walk, Run"
  adoption; delivery timelines accelerated **40%+**.
- (Earlier / secondary) Rendered as a quiet "More work" list under the featured grid, covering all
  four eras: **GCP Telemetry & Data View**, **Healthcare Interoperability** (HIPAA/HL7/DICOM),
  **AI-Driven Test Automation** (NovaSignal); **Internal Tools Portal**, **Admin Portal** (Sanas);
  **VSSC/ISRO Aerospace Tooling**, **BEL/IGCAR Defence Engineering** (Legend); **Mapshalli
  volunteer work** (Stop Hunger, AirCare).

## 5. Design (Modern Minimal)

- **Palette:** base off-white `#FAFAF7`, ink `#16161A`, muted `#5B5B66`, hairline `#E6E6E0`, single
  accent deep signal blue `#1D4ED8` (links, key metrics, CTA only).
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

## 8. Future (designed-for, not built)

Project detail pages + photo galleries (extend `Project` schema, drop images in `public/`); custom
domain (`CNAME` + change `basePath`); writing/blog; dark mode.
