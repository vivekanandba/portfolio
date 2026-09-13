# Source material

Material in my own hand that the site's claims can cite (ADR-0013, SPEC §2 "three-tier source policy").
Everything here is public the moment it is committed, so it is **redacted before it lands** and
checked by `tests/source.test.ts` (no phone numbers or e-mail addresses, every media reference
resolves, every file ≤ 2 MiB, originals pinned to a release by sha256, my notes dated).

| Folder      | What it holds                                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| `decks/`    | Redacted transcripts + screened images of the two capability decks I authored at Legend Technologies / ENTI Innovations. |
| `resume/`   | The master resume (the fact source) and the served v15 PDF's provenance.                                                 |
| `my-notes/` | Dated statements in my own words, verbatim with light punctuation — citable, and labelled _my account only_ on the site. |

## How to cite

In a content file, the comment above a claim names its origin:

```ts
// Source: Legend deck v5.5, slide 60 — division team table, "Design — Vivekanand B".
// Source: my note of 2026-09-13 (my account only; no third-party record).
```

A claim resting **only** on one of my notes renders with a visible _my account only_ marker. A claim
corroborated by a third-party record (a LinkedIn recommendation, a regulator, a client's site) carries
none. That is the whole point of keeping the two apart.

## Originals

The `.pptx` files are GitHub Release assets, not git objects — GitHub refuses files over 100 MB and this
repository's hygiene gate refuses anything over 2 MiB. Each deck README names the release tag and the
sha256 of its original. `/*.pptx` is gitignored so an original in the working directory can never be
staged by accident.

## Reproducing a deck folder

```sh
python3 scripts/deck-extract.py --pptx "<original>.pptx" \
  --rules scripts/deck-rules/<deck-id>.json --out source/decks/<deck-id>          # regenerate
python3 scripts/deck-extract.py --pptx "<original>.pptx" \
  --rules scripts/deck-rules/<deck-id>.json --out source/decks/<deck-id> --verify # byte-for-byte check
```

The rules file is the redaction record: which names are withheld, which slide bodies are omitted and
why, and — for every media file in the original — whether it was kept (under what name), excluded (for
what reason) or is pending re-encoding. CI cannot run the extractor (the originals are not in the
repository); it tests the produced tree's invariants instead.

## What is deliberately not here

- Anything private: the LinkedIn account export (gitignored; see SPEC §7), messages, contacts.
- Third-party personal data from the decks: directors' and staff names, advisers' portraits and
  biographies, a private company's turnover, phone numbers, e-mail addresses.
- Raw video recordings over the size ceiling (they remain inside the release-asset `.pptx`).
