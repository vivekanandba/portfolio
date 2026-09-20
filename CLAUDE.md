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
npm test  ·  npm run build
```

## Gates

- Hooks: `.githooks/` via `core.hooksPath` (installed by the `house-gates` skill) — secret
  scanning, protected branch (CON-PROC-008), commit message.
- CI: ci.yml, deploy.yml — the authority; hooks are the fast loop and are bypassable.

## Project notes

No specs/ yet. `out/` is build output, never a source.

## Layout

src/ · out/ · scripts/ · docs/

---

_This file was created when the constitution was introduced, from what the repo shows rather
than from a template. It is deliberately short: grow it from incidents, not from boilerplate,
and put anything transferable in the constitution via `/lesson`._
