import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

/**
 * This repo cites the shared engineering constitution by rule ID and never
 * restates it, because copies drift and citations don't. The constitution lives
 * in a separate private repository and is loaded into the author's sessions
 * through ~/.claude/CLAUDE.md — which CI cannot read (CON-VER-004).
 *
 * So `docs/constitution-ids.txt` carries the IDs and titles, never the rule
 * text, and this guards the link: cite an ID that has been retired or mistyped
 * and the build says so, instead of the citation quietly pointing at nothing.
 */
const ROOT = resolve(__dirname, '..');
const LIST = 'docs/constitution-ids.txt';

const ID_PATTERN = /\bCON-[A-Z]{3,4}-\d{3}\b/g;
const SEARCH_DIRS = ['src', 'tests', 'docs', 'scripts', 'source', '.github'];
const SEARCH_FILES = ['CLAUDE.md', 'SPEC.md', 'README.md'];
const EXTENSIONS = /\.(ts|tsx|md|txt|sh|mjs|yml|yaml|py)$/;

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.git')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (EXTENSIONS.test(entry)) out.push(full);
  }
  return out;
}

function knownIds(): Map<string, string> {
  const map = new Map<string, string>();
  for (const line of readFileSync(join(ROOT, LIST), 'utf8').split('\n')) {
    if (!line.trim() || line.startsWith('#')) continue;
    const [id, ...rest] = line.split(' · ');
    map.set(id.trim(), rest.join(' · ').trim());
  }
  return map;
}

/** Every citation in the repo, other than the list itself. */
function citations(): Map<string, string[]> {
  const found = new Map<string, string[]>();
  const files = [
    ...SEARCH_DIRS.flatMap((d) => {
      try {
        return walk(join(ROOT, d));
      } catch {
        return [];
      }
    }),
    ...SEARCH_FILES.map((f) => join(ROOT, f)),
  ];
  for (const file of files) {
    const rel = relative(ROOT, file);
    if (rel === LIST) continue;
    let text: string;
    try {
      text = readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    for (const id of text.match(ID_PATTERN) ?? []) {
      found.set(id, [...(found.get(id) ?? []), rel]);
    }
  }
  return found;
}

describe('the vendored constitution rule list', () => {
  it('records IDs and titles, and no rule text', () => {
    const ids = knownIds();
    expect(ids.size).toBeGreaterThan(20);
    for (const [id, title] of ids) {
      expect(id, `${id} is a well-formed ID`).toMatch(/^CON-[A-Z]{3,4}-\d{3}$/);
      expect(title.length, `${id} has a title`).toBeGreaterThan(5);
      // A title is one line. Anything longer is the rule text creeping in, and
      // a copy of the rule is exactly what citing by ID exists to avoid.
      expect(title.length, `${id}'s entry is a title, not the rule`).toBeLessThan(120);
    }
  });

  it('names where the real constitution lives, so the pointer is followable', () => {
    const list = readFileSync(join(ROOT, LIST), 'utf8');
    expect(list).toContain('https://github.com/vivekanandba/constitution');
    // The captured source commit is what makes staleness detectable.
    expect(list).toMatch(/origin\/main [0-9a-f]{7,}/);
  });
});

describe('every constitution rule this repo cites', () => {
  it('exists in the vendored list', () => {
    const ids = knownIds();
    const cited = citations();
    expect(cited.size, 'the repo cites at least one rule').toBeGreaterThan(0);

    const unknown = [...cited.entries()]
      .filter(([id]) => !ids.has(id))
      .map(([id, files]) => `${id} (cited in ${[...new Set(files)].join(', ')})`);

    expect(unknown, 'citations to rules that do not exist').toEqual([]);
  });

  it('is cited somewhere a reader can follow, not only in passing', () => {
    // CLAUDE.md is the entry point: it must explain the citation convention
    // rather than leaving a bare ID for someone to decode.
    const claude = readFileSync(join(ROOT, 'CLAUDE.md'), 'utf8');
    expect(claude).toContain('https://github.com/vivekanandba/constitution');
    expect(claude).toContain(LIST);
  });
});
