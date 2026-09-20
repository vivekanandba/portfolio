# SPEC-0002 — Security posture

**Status:** Active **Since:** 2026-09-20 **Shipped in:** #63
**Covers:** —
**Routes:** every route, through the document shell

## What

What this site can be attacked through, what is checked, and what the platform makes impossible.

**The threat model, stated first, because the numbers mislead without it.** This is a statically
exported site on GitHub Pages. There is no server, no database, no session, no user input and no
form. Nothing a visitor sends is processed by anything. So the classic web risks — injection,
authentication, server-side request forgery — have no surface here at all.

What remains is real and is the part that looks harmless:

| Risk                                               | Where it lives                                                                                                                       |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Supply chain**                                   | Build dependencies execute with the author's credentials locally and with a token in CI. This is the live path.                      |
| **Secrets in history**                             | On 2026-07-23 a full LinkedIn personal-data export was committed and had to be purged. A working-tree hook could not have caught it. |
| **A hostile page framing or scripting this one**   | Limited by the policy the document carries, within what a `<meta>` tag is allowed to do.                                             |
| **Publishing something that should not be public** | Third-party names, PII in images, unconsented material. Enforced by the `contract` suite, not here.                                  |

On 2026-09-20 the repo had 26 advisories. `npm audit --omit=dev` called 6 of them production, and
all six descend from `next`, so the dependency graph was correctly reported. **None of their code
reaches the built output.** Tracing the two apparent hits found the English word "sharp" in the
site's own prose and Zod's `.nanoid()` validator method. Being in the production dependency tree is
not the same as reaching a browser, and on a static export the gap is total.

## Rules

- **R1.** Dependencies are audited as two trees with different thresholds: **production** fails on
  high and above, **development** on critical. Each advisory is attributed to exactly one tree.
- **R2.** An advisory that cannot be patched here is listed in `security/audit-allowlist.json` with
  the reason it cannot reach anyone and the date it was reviewed. Silence is not an exemption
  (proposed fleet-wide in vivekanandba/constitution#5).
- **R3.** An exemption whose advisory no longer appears fails the build. A list of exceptions that
  outlives what it excuses is how exemptions become permanent.
- **R4.** Secrets are scanned over the **full git history**, not the working tree, because the
  incident that prompted this was in history.
- **R5.** Every GitHub Action is pinned to a commit SHA with a version comment beside it. A tag can
  be repointed at different code after review; a SHA cannot.
- **R6.** The document carries a Content-Security-Policy and a referrer policy. The policy contains
  no directive a `<meta>` tag ignores.
- **R7.** The policy is verified in a real browser against the built output, on every page type,
  asserting a 200 and a rendered heading first — because a 404 has no violations either.
- **R8.** Dependency updates arrive as grouped pull requests, weekly.

## Verification

```sh
npm run test:security                          # R1, R2, R3
npx vitest run tests/contract/workflows.test.ts # R4, R5
npx vitest run tests/unit/csp.test.ts           # R6
npx playwright test tests/e2e/security.spec.ts  # R6, R7
```

R4 and R5 are asserted against the workflow files themselves, since the delivery path is code that
no application suite covers (CON-COV-001). Every gate here was proven to fail before being trusted:
the audit against a stale exemption and an unexcused high, the pinning check against a restored tag,
and the browser check against its own first version, which navigated to an absolute path, dropped
the base path, and passed on a 404 page while asserting nothing.

## Not doing

- **`frame-ancestors`, `X-Content-Type-Options`, `Strict-Transport-Security` and a report endpoint.**
  GitHub Pages cannot set response headers, and a `<meta>` policy ignores `frame-ancestors`,
  `report-uri` and `sandbox` by specification. Listing them would read as clickjacking protection
  and provide none, so they are absent and recorded here instead (proposed fleet-wide in vivekanandba/constitution#5). GitHub does send
  its own `Strict-Transport-Security`.
- **A nonce-based policy.** A `<meta>` policy cannot carry a nonce, and Next inlines both the RSC
  payload and the pre-paint theme script, so `script-src` needs `'unsafe-inline'`. That is the
  honest cost of a static export. What remains still constrains `connect-src`, `base-uri`,
  `form-action` and `object-src`, which is what an injected tag reaches for.
- **Patching the five allowlisted production advisories.** All descend from `next` and are pinned by
  its own ranges. They will clear when Next moves; R3 makes sure the exemptions do not outlive them.
- **Upgrading vitest to 5.x** for its critical. That advisory needs the Vitest UI or API server
  listening; this repo runs `vitest run` only, `@vitest/ui` is not installed, and CI exposes no
  port. A major bump gets its own change.
- **Penetration testing, a bug bounty, or a `security.txt`.** No attack surface to test, and no
  inbox to route reports to.

## Revisions

| Date       | Change                                                                                                                                                             | Covered by                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| 2026-09-20 | Written with R1–R8 when the security suite was added. Next patched from 15.5.4 to 15.5.25, clearing the RCE in the React flight protocol; vitest patched to 2.1.9. | `tests/contract/workflows.test.ts`, `tests/unit/csp.test.ts`, `tests/e2e/security.spec.ts` |
