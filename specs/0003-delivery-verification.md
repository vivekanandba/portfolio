# SPEC-0003 — Delivery verification

**Status:** Active **Since:** 2026-09-20 **Shipped in:** #64

## What

Checks that run against the **built artifact and the deployed site**, rather than against the source.

The gap this closes is old and was written down long before it was filled. The engineering
constitution has said since 2026-08-08 that application coverage says nothing about whether software
ships, and listed what to do instead: build the artifact in CI, assert it contains what it needs,
and after deploying assert the running version equals the version just built. **No project in the
fleet implemented any of it.** A deploy job here went green when the artifact was _published_ — not
when the site worked, and not even when the site was this artifact, since an older run can be live
and still read "success".

Everything below was also, until now, something a person did by hand on the day they thought of it.
Every screenshot of this site came from a script written and thrown away; every live check was
retyped. Work that is not in the repository is work nobody else can do and nobody does twice.

| Check          | What it catches                                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `verify:infra` | The deployed site is not the commit just built, a route 404s, the policy or canonical URLs are gone, the feed is malformed, hedging language crept back |
| `test:visual`  | A CSS regression that no assertion describes, in the nav, hero, headers, palette or 404                                                                 |
| `check:size`   | A photograph or bundle that ships far larger than intended                                                                                              |
| `shots`        | Nothing. It is for looking at the site, and is deliberately not a gate                                                                                  |

## Rules

- **R1.** The build emits `version.json` carrying the commit, ref and build time. Off CI it says
  `local` rather than inventing a commit, because a plausible wrong answer is worse than an honest
  unknown.
- **R2.** `deploy.yml` runs `verify-live.mjs` against the **deployed URL** after deploying, passing
  the commit it built, and fails the job on any mismatch.
- **R3.** `verify-live.mjs` reports **every** failure, not the first, so one run says everything
  that is wrong.
- **R4.** Pixel baselines cover **regions, not whole pages**: the nav, the hero, Turning Points, a
  project header, a post header, the footer, the palette and the 404, in both themes.
- **R5.** Baselines are generated and compared **inside the Playwright container**, and the visual
  tests are their own Playwright project and their own CI job.
- **R6.** Every visual and infra check asserts the page is real — a 200 and rendered content —
  before asserting anything about it.
- **R7.** The built output has size budgets, per file and in total.
- **R8.** `npm run shots` writes screenshots for a human to look at. It has no assertions, is never
  a gate, and its output is gitignored.

## Verification

```sh
npm run check:size                     # R7, after a build
npm run test:visual                    # R4, R5, R6 — in the container
npm run verify:infra                   # R3, R6 — against the deployed site
npm run verify:infra -- --base <url> --commit <sha>   # R2, as CI runs it
npm run shots                          # R8
npm run test:visual:update             # regenerate the baselines, in the container
```

Regenerating baselines outside the container produces images CI will reject, so
`scripts/visual-baselines.sh` is the only supported way. It runs the container as the host user;
without that the container writes root-owned files into `test-results/` and the snapshots directory,
and every later local Playwright run fails with `EACCES` for reasons that look nothing like the
cause. Never regenerate baselines to clear a failure without looking at what moved.

R1, R2 and R5 are asserted from `tests/contract/workflows.test.ts` and `tests/unit/version.test.ts`,
because a workflow is code that no application suite covers.

**Why regions and not whole pages.** A full-page baseline of the archive is sixty-eight thousand
pixels tall. One added entry rewrites all of it, producing a diff nobody can read that fails for a
reason nobody cares about — and a gate that cries wolf gets muted. The regions pinned here are
chrome and typography, which is where a CSS regression shows and which do not move when content is
added.

**Why the container.** Text renders differently between machines. Baselines made here and compared
on a bare runner would fail for font reasons unrelated to any change. `maxDiffPixelRatio` is 0.01
rather than zero, because antialiasing differs even within one image version.

## Not doing

- **A full-page baseline of every route.** See above. The archive alone would be a 20 MB image.
- **Blocking merges on the live verifier.** It runs after deploy, against production. A pull request
  has no deployed site of its own to check.
- **A performance budget in milliseconds.** Timings on a shared runner are noise. Bytes are not, so
  the budget is in bytes.
- **Committing screenshots from `npm run shots`.** They are for looking at. The baselines are the
  committed images, and they are a different thing with a different purpose.
- **Uptime monitoring.** This verifies a deploy, not the hosting. GitHub Pages being down is not
  something this repository can detect usefully or act on.

## Revisions

| Date       | Change                                                                                                                                                   | Covered by                                                                                   |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 2026-09-20 | `scripts/visual-baselines.sh` added after the container left root-owned files that broke later local runs.                                               | `tests/contract/workflows.test.ts`                                                           |
| 2026-09-20 | Written with R1–R8 when the infra suite was added: `version.json`, the post-deploy verifier, 16 pixel baselines, size budgets and the screenshot script. | `tests/contract/workflows.test.ts`, `tests/unit/version.test.ts`, `tests/e2e/visual.spec.ts` |
