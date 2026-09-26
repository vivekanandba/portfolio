import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { profile } from '@/content';

/**
 * Who the site says it belongs to, and where that may be written down.
 *
 * There are two kinds of "Vivekanand B" in this repo and they are not the same
 * fact. One is the site's label for its owner, which lives in `profile` and
 * must be derived everywhere else. The other is a **quotation**: the Legend
 * deck's division table reads "Design — Vivekanand B" and its org chart reads
 * "Vivekanand B (Technical Manager)". Those are what a historical document
 * says. Editing them to match a later preference would be falsifying a source
 * (ADR-0008), so `src/content` is exempt and everything else is not.
 */
const ROOT = resolve(__dirname, '../..');

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}

const SEARCHED = ['src/components', 'src/app', 'src/lib', 'tests'];

describe('the site owner’s name', () => {
  it('is the full name, with a short form for places that truncate', () => {
    expect(profile.name).toBe('Vivekanand Balakrishnan');
    // A home screen shows about twelve characters. Anything longer is cut
    // mid-word, which looks worse than the short form does.
    expect(profile.shortName.length).toBeLessThanOrEqual(14);
    expect(profile.name.startsWith(profile.shortName.split(' ')[0])).toBe(true);
  });

  it('is never hardcoded outside content — components and tests derive it', () => {
    const offenders: string[] = [];
    for (const dir of SEARCHED) {
      for (const file of walk(join(ROOT, dir))) {
        if (!/\.(ts|tsx)$/.test(file)) continue;
        const text = readFileSync(file, 'utf8');
        // This file names both forms on purpose, to assert them.
        if (relative(ROOT, file) === 'tests/contract/naming.test.ts') continue;
        if (text.includes(profile.name) || /['"`]Vivekanand B['"`]/.test(text)) {
          offenders.push(relative(ROOT, file));
        }
      }
    }
    expect(offenders, 'files that hardcode the name instead of reading profile').toEqual([]);
  });

  it('leaves the deck quotations exactly as the decks wrote them', () => {
    // The guard above must not tempt anyone into "fixing" these.
    const archive = readFileSync(join(ROOT, 'src/content/archive/legend.ts'), 'utf8');
    expect(archive).toContain('“Design — Vivekanand B” is mine');
    expect(archive).toContain('“Vivekanand B (Technical Manager)”');
  });
});
