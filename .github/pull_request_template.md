<!--
SPEC.md §9 is the contract; this is where it gets checked. Delete rows that
genuinely do not apply — but delete them deliberately, not silently.
-->

## What changed

<!-- One paragraph. What a reader of the diff would not infer on their own. -->

## Spec (SPEC.md §9.1)

- [ ] **Behavioural change?** (schema field / section / route / component / invariant / policy)
  - [ ] `SPEC.md` updated for _what_ changed
  - [ ] ADR added under `docs/adr/` for _why_, with alternatives rejected
  - [ ] Spec/ADR committed **before** the implementation commit — the evidence is this PR's
        commit list, which survives on the PR page. `main` is squash-merged, so the ordering is
        **not** recoverable there; a schema change without a spec change is caught by the
        "Spec discipline" CI step regardless of order.
- [ ] **Content-only?** No spec needed — a content-test assertion covers it instead
- [ ] **Amends an earlier decision?** New ADR added; the superseded one marked
      `Superseded by ADR-NNNN`

## Tests (SPEC.md §9.2)

- [ ] Failing test written first for behavioural work (or: content edit, assertion written alongside)
- [ ] `npm run quality:check` clean
- [ ] `npm run test:coverage` passes — global **and** per-directory floors
- [ ] `npm run build` emits the static export with the correct base path
- [ ] `npm run test:e2e` passes (desktop + mobile)
- [ ] Anything found by hand during review became an invariant

## Media & privacy (SPEC.md §7, ADR-0006, ADR-0007)

- [ ] Every new image **opened and inspected** — no owner names, serials, IMEIs, MAC addresses
- [ ] No map or dataset locating vulnerable people
- [ ] No identifiable third party who did not consent to appearing here
- [ ] Third-party media carries a **visible credit**; base-map attribution preserved
- [ ] Every image has real `alt` text; live captures are dated
- [ ] Files staged by path — no `git add .`

## Claims (ADR-0008)

- [ ] Each new claim links its public referent, or was cut
- [ ] No unsourced superlatives ("first", "only")
- [ ] Figures of different vintages are labelled; time-varying figures bound to a dated snapshot
- [ ] `npm run check:links` run if content URLs changed

## Deploy verification (SPEC.md §9.2 step 6)

- [ ] Live URL checked after merge, not just the green merge
