# ADR-0010 — Enforce coverage floors and external link integrity

**Status:** Accepted
**Date:** 2026-08-05 (backfilled) **Shipped in:** #37

## Context

The owner asked three questions the repository could not answer: where deployment bugs were coming
from, how good the test suite was, and what the coverage was.

The answer to the third was that **nobody knew** — there was no coverage provider installed, no
configuration and no script. Measuring it for the first time gave 94.31% statements but 85% functions,
with the real gaps concentrated in logic: `src/lib/seo.ts` at **49% statements / 25% functions**, and
`app/page.tsx` at 0%.

Reviewing where defects had actually been caught was more revealing. The suite caught structural
faults reliably — schema violations, broken bijections, missing files, missing alt text, a11y
landmarks. It caught nothing about **truthfulness**: the wrong patent link, stale figures,
uncredited media and customer PII were all found by a person reading, or by the owner. One class was
purely external: links rot off-box, after merge, when someone else's site changes.

## Decision

Two gates, each aimed at a class the existing suite could not see.

**1. Coverage, measured and enforced.** `@vitest/coverage-v8`, a `test:coverage` script, and
thresholds in `vitest.config.ts` — in CI in place of bare `npm test`. Global floors (93% statements/
lines, 86% branches, 85% functions) **plus per-directory floors** on `src/lib/**` and
`src/components/**`, because 27 fully-covered content data files dominate the global average and would
mask a new untested file in either directory — which is exactly how `seo.ts` sat at 49% unnoticed.

Floors sit a few points under measured values. **Raise them as coverage improves; never lower them to
make a build pass.**

**2. External link integrity.** `npm run check:links` walks every `https` URL in `src/content` and
reports what no longer resolves. **Advisory in CI** (`continue-on-error`) because a third party's
outage must not block a merge — but it writes to `$GITHUB_STEP_SUMMARY`, since an advisory step that
merely goes green is unread, and silent accumulation of link rot is the failure it exists to prevent.

Bot-walled responses (403/429/999 from Cloudflare-fronted hosts such as Udemy and LinkedIn) are
classified **unverified**, not failed, so the check does not cry wolf. URL fragments are ignored when
detecting redirects, because `fetch` never sends them.

## Consequences

- CI is slower (coverage run ~20s versus ~9s) and makes one network pass over ~48 URLs.
- Both gates were verified to actually enforce rather than decorate: a deliberately impossible global
  floor produces `ERROR: Coverage for statements (95.03%) does not meet global threshold (98%)`, and an
  impossible per-directory floor produces `… does not meet "src/lib/**" threshold`. Glob thresholds
  silently do nothing if the pattern misses, so this check mattered.
- The link check found real rot on its first run: five Google badge URLs on the retired
  `cloudskillsboost.google` domain, and two Coursera links silently redirecting `records/` → `verify/`.
- Coverage gaps are recorded honestly in `SPEC.md` §8 rather than papered over. Notably the a11y suite
  renders the landing composition and **must stay in sync with `app/page.tsx`** — drift there once went
  unnoticed for four PRs.
- Neither gate addresses truthfulness. That remains a human responsibility under ADR-0008.

## Alternatives rejected

- **A single global coverage floor.** Maskable by the content files, per the `seo.ts` case.
- **`perFile: true` globally.** Would immediately fail on `app/page.tsx` (0%) and `Nav.tsx` (78%),
  forcing either busywork tests or a floor low enough to be meaningless.
- **Blocking CI on link failures.** Hands every third party a veto over merging.
- **Link checking inside `npm test`.** Network I/O makes the unit suite slow and flaky; it belongs in a
  separate, explicitly-invoked script.
