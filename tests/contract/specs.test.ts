import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

/**
 * Structure guard for `specs/`, mirroring tests/contract/adr.test.ts.
 *
 * A spec records what a feature does now and is edited as the feature changes;
 * an ADR records a decision and is frozen. The sections below are what make a
 * spec usable rather than a wish: rules phrased as tests, the commands that
 * check them, a scope fence, and a dated record of every change — which is how
 * a small UI change amends the feature it belongs to instead of spawning a
 * document nobody reads.
 */
const ROOT = resolve(__dirname, '../..');
const SPECS = join(ROOT, 'specs');

const REQUIRED_SECTIONS = [
  '## What',
  '## Rules',
  '## Verification',
  '## Not doing',
  '## Revisions',
];
const FILENAME = /^(\d{4})-[a-z0-9]+(-[a-z0-9]+)*\.md$/;

const files = readdirSync(SPECS)
  .filter((f) => f.endsWith('.md') && f !== 'README.md')
  .sort();
const readme = readFileSync(join(SPECS, 'README.md'), 'utf8');

describe('feature specs', () => {
  it('there is at least one, and every filename is NNNN-kebab-case.md', () => {
    expect(files.length).toBeGreaterThan(0);
    for (const f of files) expect(f, `${f} filename`).toMatch(FILENAME);
  });

  it('numbers are contiguous from 0001 and never reused', () => {
    const numbers = files.map((f) => Number(f.slice(0, 4)));
    expect(numbers).toEqual(numbers.map((_, i) => i + 1));
  });

  it.each(files)('%s has every required section, each with content', (file) => {
    const text = readFileSync(join(SPECS, file), 'utf8');
    expect(text.startsWith(`# SPEC-${file.slice(0, 4)} — `), `${file} title line`).toBe(true);

    for (const section of REQUIRED_SECTIONS) {
      expect(text, `${file} is missing ${section}`).toContain(section);
      const body = text.split(section)[1]?.split('\n## ')[0] ?? '';
      expect(body.trim().length, `${file} has an empty ${section}`).toBeGreaterThan(40);
    }
  });

  it.each(files)('%s numbers its rules R1, R2, … without gaps', (file) => {
    const body = readFileSync(join(SPECS, file), 'utf8').split('## Rules')[1]?.split('\n## ')[0];
    const numbers = [...(body?.matchAll(/\*\*R(\d+)\.\*\*/g) ?? [])].map((m) => Number(m[1]));
    expect(numbers.length, `${file} has numbered rules`).toBeGreaterThan(0);
    expect(numbers).toEqual(numbers.map((_, i) => i + 1));
  });

  it.each(files)('%s records at least one dated revision naming what covers it', (file) => {
    const body = readFileSync(join(SPECS, file), 'utf8').split('## Revisions')[1] ?? '';
    const rows = body.split('\n').filter((l) => /^\|\s*\d{4}-\d{2}-\d{2}/.test(l));
    expect(rows.length, `${file} has a dated revision row`).toBeGreaterThan(0);
    for (const row of rows) {
      const cells = row.split('|').map((c) => c.trim());
      expect(cells.length, `${file} revision row shape: ${row}`).toBeGreaterThanOrEqual(5);
      expect(cells[3].length, `${file} revision row names what covers it`).toBeGreaterThan(3);
    }
  });

  it('every spec is listed in the index, and the index lists nothing missing', () => {
    for (const f of files) expect(readme, `${f} missing from specs/README.md`).toContain(`(${f})`);
    const linked = [...readme.matchAll(/\((\d{4}-[a-z0-9-]+\.md)\)/g)].map((m) => m[1]);
    for (const l of linked) expect(files, `${l} is indexed but does not exist`).toContain(l);
  });
});
