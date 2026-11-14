# SPEC-0003 — Delivery verification

**Status:** Active **Since:** 2026-09-20 **Shipped in:** #64
**Covers:** —
**Routes:** every route, as deployed

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
  project header, a post header, the footer, the palette and the 404, in both themes. A region's
  baseline fails only for changes inside that region: the sticky nav is hidden when any other
  section is captured, and the palette baseline is of its panel rather than of the translucent
  backdrop and the page behind it.
- **R5.** Baselines are generated and compared **inside the Playwright container**, and the visual
  tests are their own Playwright project and their own CI job.
- **R6.** Every visual and infra check asserts the page is real — a 200 and rendered content —
  before asserting anything about it.
- **R7.** The built output has size budgets, per file and in total.
- **R8.** `npm run shots` writes screenshots for a human to look at. It has no assertions, is never
  a gate, and its output is gitignored.
- **R9.** A baseline is captured in a state the page reaches by construction, never by timing:
  after hydration (Next's route announcer is client-only, so its presence is the signal) and under
  reduced motion applied explicitly with `page.emulateMedia` **before navigation** — an effect that
  reads the preference at mount must see it, or it arms and the baseline records a number
  mid-count — which makes the stylesheet show every
  reveal, still the arc and skip the count-ups whatever any observer did. Lazy images are still
  scrolled into loading — except for the nav, which has none and whose scroll spy would otherwise
  record whichever observer callback landed last. The `reducedMotion` option in `test.use` did not reach `matchMedia` in the
  container and must not be relied on.
- **R10.** Every workflow is one Actions will start: each step is exactly one of `uses` or `run`,
  a `with` block belongs only to a `uses` step, and the checkout in `checks` fetches full history.
  A contract test parses the files and asserts the structure, because valid YAML is not a valid
  workflow and a run that dies before its first job reports nothing a reader can act on.
- **R11.** Every job declares `timeout-minutes`, and every `container:` job runs as the host user
  (`options: --user 1001:1001`). These are the house-gates workflow gate's rules, asserted here
  too because CI cannot run the hook: a hung job otherwise runs for six hours, and a root
  container leaves files on the self-hosted runner that break every job after it.
- **R12.** Every job that drives a browser runs in `mcr.microsoft.com/playwright:v<version>-noble`,
  where the version is the lockfile's `@playwright/test`, asserted by a contract test. A bare
  runner's image moves under the job: `ubuntu-latest` became Ubuntu 26.04 on 2026-11-07 and
  Playwright 1.51.1 could not install Chromium there, which failed every PR with no change to
  any of them. The container does not move, and the tag must match the lockfile — a range in
  `package.json` resolved to two different versions in two fleet repos.

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
on a bare runner would fail for font reasons unrelated to any change.

**Why an absolute pixel budget, not a ratio.** The tolerance shipped as `maxDiffPixelRatio: 0.01`,
which sounds strict and is not: one percent of the 1280×65 nav strip is 832 pixels, an entire word.
Renaming the site owner from "Vivekanand B" to "Vivekanand Balakrishnan" changed the most prominent
text in the nav and all sixteen baselines passed. A ratio scales tolerance with image size, which is
backwards — a short, wide strip is exactly where a small absolute change matters most. The budget is
now `maxDiffPixels: 120`. Baselines are generated and compared inside one container, so genuine
antialiasing drift is a handful of pixels; on the rebuild that proved this, the six unchanged
regions differed by zero.

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

| Date       | Change                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Covered by                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 2026-11-14 | Tailwind 4 (dependabot #66). No baseline was regenerated: all 22 match the Tailwind 3 renders. That took two fixes. In Tailwind 3 a responsive text size (`sm:text-2xl`) brought its own line-height and beat `leading-*`; in 4, `leading-*` wins at every breakpoint. The pulled quote grew 29 px and the hero metrics lost 2 px a line, so both now state their breakpoint leading. Also found: on one of three checks the dark 404 was captured at viewport height. That capture alone skipped `networkidle`, and none of the captures waited for web fonts. Both waits are now by construction (R9), and the check then passed five times in a row. | `tests/e2e/visual.spec.ts`                                                                   |
| 2026-11-14 | Playwright 1.51.1 → 1.65.0, with both containers moved to `playwright:v1.65.0-noble` as R12 requires. Against the new browser, 20 of 22 baselines matched unchanged. The two 404 baselines differed by 1,798 and 951 antialiasing pixels spread across the page, with old and new crops visually identical, so they were regenerated and then checked three times.                                                                                                                                                                                                                                                                                      | `tests/e2e/visual.spec.ts`, `tests/contract/workflows.test.ts`                               |
| 2026-11-07 | R12 added the same day: the first run of this PR's e2e job died at `playwright install` with "Playwright does not support chromium on ubuntu26.04-x64" — GitHub had rolled `ubuntu-latest` between 2 and 7 November, and the job's browser cache keyed on the Playwright version alone. The e2e job now runs in the same pinned container as the visual job, with no setup-node, cache or install steps, and the contract test ties both tags to the lockfile. Red on the bare-runner job before the change.                                                                                                                                            | `tests/contract/workflows.test.ts`                                                           |
| 2026-11-07 | Footer baselines regenerated after both failed by 210 pixels in the container with no change to the footer: the `built` mask hid the month's text but not its width, and November is 14px wider than October, so the baseline still expired on the 1st of some months. The capture now pins the text to a fixed month before the shot (R9 — a state reached by construction) and compares the whole footer; the two baselines were regenerated once and checked three times.                                                                                                                                                                            | `tests/e2e/visual.spec.ts`                                                                   |
| 2026-11-07 | R11 added. The fleet's workflow gate had been shipped in house-gates 1.4–1.6 and vendored here on 2026-10-02, but `.house-gates.json` predated the `workflows` switch, so the hook never ran it; the fleet audit and two harvests named the two faults it would have refused — the visual container without `--user`, the deploy jobs without a timeout. The switch is on, the hooks carry the 1.6.0 header, and the contract test was red on both faults before the fix.                                                                                                                                                                               | `tests/contract/workflows.test.ts`                                                           |
| 2026-10-10 | R10 added after every CI run for a week — on `main`, every branch and dependabot's — ended with no jobs and "log not found": #87 had inserted a `run:` step between `actions/checkout` and its `with:` block, which also silently dropped `fetch-depth: 0`. Valid YAML, invalid workflow, nothing parsed it. The test was red on the broken file before the fix.                                                                                                                                                                                                                                                                                        | `tests/contract/workflows.test.ts`                                                           |
| 2026-10-02 | R9 added after the project-header check failed in every run on one branch and none on `main`, with identical DOM state in both — and the committed baseline turned out to be a page whose whole body below the header was blank, a baseline of nothing, since #74: the reveals hold sections at opacity 0 until an observer fires, and whether it fired before the pixels were read was a race the baselines had been winning by luck — one more inline script in the shell lost it. Capture now waits for hydration and forces reduced motion explicitly; the check was then run three times and passed three times (CON-VER-008).                     | `tests/e2e/visual.spec.ts`                                                                   |
| 2026-09-26 | Tolerance changed from a 1% ratio to an absolute 120-pixel budget after the ratio let a rename of the nav's most prominent text pass all sixteen baselines. Section captures now hide the sticky nav and the palette capture is of its panel, so each region fails only for its own changes. All baselines regenerated.                                                                                                                                                                                                                                                                                                                                 | `tests/e2e/visual.spec.ts`, `playwright.config.ts`                                           |
| 2026-09-20 | `scripts/visual-baselines.sh` added after the container left root-owned files that broke later local runs.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `tests/contract/workflows.test.ts`                                                           |
| 2026-09-20 | Written with R1–R8 when the infra suite was added: `version.json`, the post-deploy verifier, 16 pixel baselines, size budgets and the screenshot script.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `tests/contract/workflows.test.ts`, `tests/unit/version.test.ts`, `tests/e2e/visual.spec.ts` |
