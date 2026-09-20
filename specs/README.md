# Specs

One spec per **feature**, not per component and not per change. A small change to a feature adds a
numbered rule to that feature's spec and a dated row to its Revisions table — it does not get a
document of its own.

The distinction from `docs/adr/`: an ADR records a **decision** and its alternatives, frozen at the
moment it was taken and amended only by a dated note. A spec records what a feature **does now**,
and is edited as the feature changes. An ADR answers "why is it like this"; a spec answers "what is
it, and what would prove it broken".

Every spec carries five sections, checked by `tests/contract/specs.test.ts`:

- **What** — the feature in a paragraph, plus whatever table makes it concrete.
- **Rules** — numbered R1, R2, …, each phrased so it could be a test.
- **Verification** — the commands that check it, and which rule each covers.
- **Not doing** — the scope fence, with the reason. This is the section that stops a spec growing.
- **Revisions** — dated rows: what changed, and the test that now covers it.

## Index

| Spec                                          | Feature                       |
| --------------------------------------------- | ----------------------------- |
| [0001](0001-test-suites-and-quality-gates.md) | Test suites and quality gates |
| [0002](0002-security-posture.md)              | Security posture              |
| [0003](0003-delivery-verification.md)         | Delivery verification         |
| [0004](0004-site-identity.md)                 | Site identity                 |
| [0005](0005-landing-composition.md)           | Landing composition           |
| [0006](0006-the-story-sections.md)            | The story sections            |
| [0007](0007-projects.md)                      | Projects                      |
| [0008](0008-writing.md)                       | Writing                       |
| [0009](0009-archive.md)                       | The era archive               |
| [0010](0010-credibility.md)                   | Credibility                   |
| [0011](0011-interaction-layer.md)             | Interaction layer             |
| [0012](0012-content-and-media.md)             | Content and media             |
