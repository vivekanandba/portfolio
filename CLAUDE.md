# portfolio — working agreement

> Machine-wide engineering rules live in the **engineering constitution**, versioned at
> <https://github.com/vivekanandba/constitution> (private) and loaded into every session on the
> author's machine via `~/.claude/CLAUDE.md`. Cite a rule ID (e.g. `CON-VER-001`) rather than
> restating it — copies drift, citations don't. This file holds only what is specific to this repo.
>
> CI never sees `~/.claude` (CON-VER-004), so the repo carries **`docs/constitution-ids.txt`** —
> the rule IDs and titles, never the rule text, so there is no copy to drift.
> `tests/constitution.test.ts` fails the build if this repo cites an ID that list does not contain.

## What this is

Typography-only personal portfolio. Next.js 15 + React 19 + TypeScript (strict) + Tailwind, statically exported.

## Commands

```sh
npm test                # all vitest suites
npm run build           # static export
npm run test:unit       # does the code do what it says
npm run test:contract   # are the data and the published record still true
npm run test:a11y       # can everyone use it
npm run test:e2e        # can a person complete the task
npm run test:security   # is anything exploitable, leaked, or unpatched
npm run test:visual     # has anything moved that should not have (needs the PW container)
npm run verify:infra    # is the deployed site up, and is it what we built
npm run shots           # screenshots to look at; never a gate
npm run test:coverage   # all vitest suites + aggregate, per-directory and per-file floors
```

A suite is a directory under `tests/`, so a test file's location is its suite. See
[`specs/0001`](specs/0001-test-suites-and-quality-gates.md).

## Gates

- Hooks: `.githooks/` via `core.hooksPath` (installed by the `house-gates` skill) — secret
  scanning, protected branch (CON-PROC-008), commit message.
- CI: ci.yml, deploy.yml — the authority; hooks are the fast loop and are bypassable.

## Project notes

`specs/` holds one spec per **feature** — what it does now, edited as it changes. `docs/adr/` holds
**decisions** — why it is like this, frozen, amended only by a dated note. A small UI change adds a
numbered rule and a dated Revisions row to the relevant feature spec; it never gets its own
document and it is not an ADR.

`out/` is build output, never a source.

## Layout

src/ · out/ · scripts/ · docs/ · specs/ · security/ · tests/{unit,contract,a11y,e2e}

Pixel baselines live in `tests/e2e/visual.spec.ts-snapshots/` and are regenerated only inside
`mcr.microsoft.com/playwright:v1.51.1-noble` — see [`specs/0003`](specs/0003-delivery-verification.md).

---

_This file was created when the constitution was introduced, from what the repo shows rather
than from a template. It is deliberately short: grow it from incidents, not from boilerplate,
and put anything transferable in the constitution via `/lesson`._
