# SPEC-0001 — Test suites and quality gates

**Status:** Active **Since:** 2026-09-20 **Shipped in:** #62
**Covers:** —
**Routes:** — (the gates themselves, not a surface)

## What

Tests are split into four suites, one per question a failure answers, so a red build says what kind
of thing broke before anyone opens a log. A suite is a directory under `tests/`, which means a test
file's location _is_ its suite and there is no registry to fall out of date.

| Suite      | The question it answers                           | Runs with               |
| ---------- | ------------------------------------------------- | ----------------------- |
| `unit`     | Does the code do what it says?                    | `npm run test:unit`     |
| `contract` | Are the data and the published record still true? | `npm run test:contract` |
| `a11y`     | Can everyone use it?                              | `npm run test:a11y`     |
| `e2e`      | Can a person complete the task?                   | `npm run test:e2e`      |
| `security` | Is anything exploitable, leaked, or unpatched?    | `npm run test:security` |

**`security` is the exception to the directory rule**, deliberately. Its subjects are the dependency
graph, the git history and the workflow files — none of them code this repo wrote, so none has a
test file's natural home. It runs as a script, with a `secrets` job in CI for the history scan, and
what can be asserted from a test file is, in `tests/contract/workflows.test.ts`. Its rules are in
[SPEC-0002](0002-security-posture.md).

`contract` is the one that would not be obvious from the outside, and on this repo it is the
largest. Its tests assert facts and publication rules rather than behaviour: that a photograph
carries its credit, that no third party is named without consent, that the site says nothing it
cannot source, that the archive drops no slide silently, that a cited constitution rule still
exists. When those fail the code is usually fine. Before the split they were indistinguishable from
a broken component.

## Rules

- **R1.** Every test file lives in exactly one suite directory. A file elsewhere under `tests/`
  belongs to no suite and fails `tests/contract/suites.test.ts`.
- **R2.** Every suite is runnable alone, by a script named `test:<suite>`.
- **R3.** Vitest owns `tests/**/*.test.*`; Playwright owns `tests/e2e/**/*.spec.*`. The extension
  is what keeps the two runners from overlapping, so a file with the wrong one is either run twice
  or never.
- **R4.** CI runs one named step per suite, so the failing suite is visible on the checks list
  without opening the log.
- **R5.** Coverage is measured over **all** vitest suites in a single pass. Measuring per suite
  would report a file covered only by another suite as uncovered.
- **R6.** Coverage is enforced three ways: aggregate floors, per-directory floors on every
  directory under `src/`, and a per-file floor of 90% statements, lines and functions via
  `scripts/coverage-floor.mjs`. Vitest's `thresholds.perFile` cannot express the aggregate and the
  per-file floor together, which is why the second check exists as a script.
- **R7.** Per-file branch coverage is held at 70%, lower than the rest, deliberately. A file with
  four branch points scores 75% for one uncovered `?? fallback`; a higher floor there buys
  assertions written to move a number rather than to catch a defect. The aggregate branch threshold
  is the real guard.
- **R8.** Floors only ever rise (CON-COV-002). Raising them is part of the change that improves
  coverage; lowering one to make a build pass is never the fix.
- **R9.** Every axe assertion lives in `a11y`, not scattered through the page tests. Accessibility
  is a credibility surface here, so it gets a number of its own — and axe was the slowest thing in
  the unit lane by a wide margin, at eighty seconds for the archive page alone.

## Verification

```sh
npm run test:contract        # 225 tests, ~32s
npm run test:unit            # 233 tests, ~54s
npm run test:a11y            #  12 tests, ~33s
npm run test:e2e             # 125 runs, desktop + mobile
npm run test:security        # both dependency trees, against the allowlist
npm run test:coverage        # all vitest suites, then the per-file floor
```

R1, R2, R3, R5 and R9 are asserted by `tests/contract/suites.test.ts`, which reads `package.json` and
walks `tests/` rather than trusting a list. R4 is visible on any pull request. R6 and R7 are
enforced by `vitest.config.ts` and `scripts/coverage-floor.mjs`; both were proven to fail before
being trusted, and every directory glob was confirmed to match real files, because a mistyped glob
threshold silently does nothing.

## Not doing

- **A separate coverage number per suite.** See R5. One number over one pass is the honest figure.
- **A backend or integration suite.** This is a static export with no server. The suite model
  belongs fleet-wide, where four deployed services do need those lanes, and is proposed there
  rather than mimicked here.
- **Parallel CI jobs per suite.** Named steps in one job give the same failure attribution without
  paying `npm ci` four times. The cost is that vitest runs roughly twice per CI pass, once across
  the suites and once for coverage, which is about thirty seconds.
- **Splitting files whose tests span two suites.** A file goes where its dominant concern sits. The
  suite is a coarse signal and the test name is the fine one; splitting files to chase a clean
  taxonomy would cost more than it explains.

## Revisions

| Date       | Change                                                                                                                                                                        | Covered by                         |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| 2026-09-20 | Written with R1–R8 when the suites were split out of one lane.                                                                                                                | `tests/contract/suites.test.ts`    |
| 2026-09-20 | `security` added as a script-based suite, with `secrets` as its CI companion. No directory, because its subjects are the dependency graph, the git history and the workflows. | `tests/contract/workflows.test.ts` |
| 2026-09-20 | R9 added — five of nine axe assertions were in the unit lane, where they were invisible as a number and cost it two minutes.                                                  | `tests/contract/suites.test.ts`    |
