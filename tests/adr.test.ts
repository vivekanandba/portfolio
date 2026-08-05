import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';

/**
 * Decision records are part of the system, not documentation about it. Untested
 * docs rot: SPEC.md drifted 27 commits behind the code before anyone noticed.
 * These checks keep the ADR set structurally honest — every record has the
 * sections that make it usable, every record is discoverable from the index,
 * and numbering stays unambiguous.
 *
 * They deliberately do NOT judge content. A spec being *right* is a human
 * responsibility; a spec being *findable and complete* is mechanisable.
 *
 * They also do NOT detect a *missing* record — which is the failure mode that
 * prompted this directory. A PR can add a schema field, skip the ADR, and every
 * check here still passes, because these validate the records that exist rather
 * than the ones that should. That boundary is guarded in CI instead: the
 * "Spec discipline" step fails a PR that touches src/content/schema.ts without
 * also touching SPEC.md or docs/adr/. Do not mistake a green run here for
 * evidence that spec-first was followed.
 */
const DIR = 'docs/adr';
const REQUIRED_SECTIONS = [
  '## Context',
  '## Decision',
  '## Consequences',
  '## Alternatives rejected',
];
const VALID_STATUS = /^\*\*Status:\*\* (Accepted|Proposed|Rejected|Superseded by ADR-\d{4})$/m;

const files = readdirSync(DIR)
  .filter((f) => f.endsWith('.md') && f !== 'README.md')
  .sort();
const readme = readFileSync(join(DIR, 'README.md'), 'utf8');

describe('architecture decision records', () => {
  it('has records to check', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)('%s is named NNNN-kebab-title.md', (file) => {
    expect(file).toMatch(/^\d{4}-[a-z0-9-]+\.md$/);
  });

  it('numbers are unique and contiguous from 0001', () => {
    const nums = files.map((f) => Number(f.slice(0, 4)));
    expect(new Set(nums).size).toBe(nums.length);
    expect(nums).toEqual(nums.map((_, i) => i + 1));
  });

  it.each(files)('%s has a title matching its number', (file) => {
    const first = readFileSync(join(DIR, file), 'utf8').split('\n')[0];
    expect(first).toMatch(new RegExp(`^# ADR-${file.slice(0, 4)} — .+`));
  });

  it.each(files)('%s declares a valid status and a date', (file) => {
    const text = readFileSync(join(DIR, file), 'utf8');
    expect(text, 'status must be one of the allowed values').toMatch(VALID_STATUS);
    expect(text, 'needs an ISO date').toMatch(/\*\*Date:\*\* \d{4}-\d{2}-\d{2}/);
  });

  it.each(files)('%s contains every required section', (file) => {
    const text = readFileSync(join(DIR, file), 'utf8');
    for (const section of REQUIRED_SECTIONS) {
      expect(text, `missing "${section}"`).toContain(section);
    }
  });

  it.each(files)('%s records real content in each section, not a placeholder', (file) => {
    const text = readFileSync(join(DIR, file), 'utf8');
    for (const section of REQUIRED_SECTIONS) {
      const body = text.split(section)[1]?.split('\n## ')[0] ?? '';
      // A section with under ~80 characters is a stub, not a decision record.
      expect(body.trim().length, `"${section}" is too thin to be useful`).toBeGreaterThan(80);
    }
  });

  it.each(files)('%s is linked from the index', (file) => {
    expect(readme, `${file} missing from docs/adr/README.md`).toContain(`(${file})`);
  });

  it('the index does not reference records that no longer exist', () => {
    const linked = [...readme.matchAll(/\((\d{4}-[a-z0-9-]+\.md)\)/g)].map((m) => m[1]);
    for (const link of linked) {
      expect(files, `index links ${link}, which is absent`).toContain(link);
    }
  });

  it('a superseded record names its replacement, and that record exists', () => {
    for (const file of files) {
      const text = readFileSync(join(DIR, file), 'utf8');
      const m = text.match(/\*\*Status:\*\* Superseded by ADR-(\d{4})/);
      if (!m) continue;
      expect(
        files.some((f) => f.startsWith(m[1])),
        `ADR-${m[1]} does not exist`,
      ).toBe(true);
    }
  });
});
