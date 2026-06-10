# Portfolio — Vivekanand B

Typography-only personal portfolio. Next.js 15 (App Router) + React 19 + TypeScript (strict) + Tailwind CSS, statically exported (`output: 'export'`) and deployed to GitHub Pages at <https://vivekanandba.github.io/portfolio/>.

Content is **typed data, not markup**: everything rendered on the page lives in `src/content/*.ts` and is validated by Zod schemas at import time, so a malformed entry fails the build instead of silently breaking the UI. The full design/architecture contract is in [SPEC.md](./SPEC.md).

## Development

Requires Node 20.

```bash
npm ci                  # install
npm run dev             # dev server at http://localhost:3000
npm run quality:check   # lint + typecheck + prettier
npm test                # vitest: content schema, component, a11y (jest-axe) tests
npm run test:e2e        # playwright: builds with BASE_PATH=/portfolio, stages under
                        # .pw-site to mirror GitHub Pages, runs desktop + mobile projects
```

## Editing content

| What                                 | Where                                    |
| ------------------------------------ | ---------------------------------------- |
| Name, tagline, bio arc, links, email | `src/content/profile.ts`                 |
| Projects (cards in Selected Work)    | `src/content/experience.ts` (`projects`) |
| Career timeline                      | `src/content/experience.ts` (`roles`)    |
| Skill groups                         | `src/content/skills.ts`                  |
| Patents / publications / education   | `src/content/credentials.ts`             |
| Schemas (shape + invariants)         | `src/content/schema.ts`                  |

Notes:

- Project `id`s must be unique and at least three projects must be `featured` — enforced by `tests/content.test.ts`.
- To update the resume, replace `public/Vivekanandb-Resume.pdf` (filename is referenced via `profile.resumeFile`).
- SEO/OpenGraph metadata lives in `src/lib/seo.ts`.

## Design tokens

Defined in `tailwind.config.ts`: `paper` (off-white background), `ink` (primary text), `muted` (secondary text), `hairline` (borders), `accent` / `accent-soft` (single signal blue). Type scale uses `text-display` and `text-h2` clamps; layout widths via `max-w-content` (72ch) and `max-w-shell` (64rem).

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`: quality gate → tests → `next build` with `BASE_PATH=/portfolio` → deploy the `out/` static export to GitHub Pages. There is no server; everything must work as static files (`trailingSlash: true`, unoptimized images, asset URLs prefixed via `src/lib/asset.ts`).

For a future custom domain: build with `BASE_PATH=''` and set `NEXT_PUBLIC_SITE_URL` to the new origin (used for absolute OpenGraph URLs).

**Analytics:** [GoatCounter](https://www.goatcounter.com/) (free, no cookies) is wired but dormant. To enable: create a GoatCounter site, then set a repository variable `GOATCOUNTER_CODE` (Settings → Secrets and variables → Actions → Variables) to your site code. The script is only emitted when the variable is present at build time.

## Future work (deliberately deferred)

- **Contact form** — `mailto:` is intentional; if needed later, a small client component POSTing to Formspree slots into `Contact.tsx`.
- **Project detail pages** — `projectSchema` already supports optional `href`/`image`; add `app/work/[id]/page.tsx` with `generateStaticParams` once real case-study prose exists.
- **Dark-mode toggle** — color tokens are CSS variables, so a class-strategy toggle can be layered on without reworking components.
