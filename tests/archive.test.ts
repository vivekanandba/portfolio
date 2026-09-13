import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  archiveEntries,
  archiveExclusions,
  archiveEras,
  archiveEntriesForProject,
  caseStudies,
  projects,
} from '@/content';
import {
  ARCHIVE_CATEGORIES,
  ARCHIVE_ERAS,
  ARCHIVE_ROLES,
  DECK_IDS,
  archiveEntrySchema,
  archiveExclusionSchema,
} from '@/content/schema';

/**
 * The era archive (ADR-0016). The guarantee Vivek asked for — "I don't want to
 * miss any such detail at all" — is a property of the whole corpus, so it is
 * checked here mechanically: every slide of every deck is either cited by an
 * archive entry or listed as excluded with a reason. Dates stay tri-state and
 * requested dates bind to the records table. Written red first (SPEC §9.2).
 */
const THIRD_PARTY = /^media\/(legend|enti|neurasignal|appstore|mapshalli)-/;

function slideCount(deck: string): number {
  const text = readFileSync(join('source/decks', deck, 'slides.md'), 'utf8');
  const nums = [...text.matchAll(/^## Slide (\d+)/gm)].map((m) => Number(m[1]));
  return Math.max(...nums);
}

function recordsFolderIds(): Set<string> {
  const lines = readFileSync('source/records/legend-programmes.md', 'utf8').split('\n');
  const ids = new Set<string>();
  for (const l of lines) {
    const m = l.match(/`my-photos\/([a-z0-9-]+)\/`/);
    if (m) ids.add(m[1]);
  }
  return ids;
}

describe('archive content conforms to schema', () => {
  it('every entry, exclusion and era parses', () => {
    expect(archiveEntries.length).toBeGreaterThanOrEqual(50);
    for (const e of archiveEntries) expect(() => archiveEntrySchema.parse(e)).not.toThrow();
    for (const x of archiveExclusions) expect(() => archiveExclusionSchema.parse(x)).not.toThrow();
    expect(archiveEras.map((e) => e.id)).toEqual([...ARCHIVE_ERAS]);
  });

  it('ids are unique and slug-shaped', () => {
    const ids = archiveEntries.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]+$/);
  });

  it('a known date carries its label; a requested date names its records row', () => {
    for (const e of archiveEntries) {
      if (e.when.status === 'known')
        expect(e.when.label, `${e.id}: known needs a label`).toBeTruthy();
      if (e.when.status === 'requested')
        expect(e.recordsId, `${e.id}: requested needs a recordsId`).toBeTruthy();
    }
    // The schema itself refuses the two malformed shapes.
    const base = archiveEntries[0];
    expect(() =>
      archiveEntrySchema.parse({ ...base, when: { status: 'known' }, recordsId: undefined }),
    ).toThrow();
    expect(() =>
      archiveEntrySchema.parse({ ...base, when: { status: 'requested' }, recordsId: undefined }),
    ).toThrow();
  });

  it('roles and categories come from the closed vocabularies', () => {
    for (const e of archiveEntries) {
      expect(ARCHIVE_ROLES).toContain(e.role);
      expect(ARCHIVE_CATEGORIES).toContain(e.category);
    }
    // company-after is reserved for what happened after Jan 2018 and is never claimed.
    for (const e of archiveEntries.filter((e) => e.role === 'company-after')) {
      expect(e.when.status).toBe('known');
      expect(e.when.label).toMatch(/2018/);
    }
  });
});

describe('archive coverage — nothing from the decks is dropped silently', () => {
  it.each([...DECK_IDS])('%s: every slide is catalogued or excluded with a reason', (deck) => {
    const n = slideCount(deck);
    expect(n).toBeGreaterThan(40);
    const cited = new Set<number>();
    for (const e of archiveEntries)
      for (const s of e.sources) if (s.deck === deck) s.slides.forEach((x) => cited.add(x));
    const excluded = new Map<number, string>();
    for (const x of archiveExclusions) if (x.deck === deck) excluded.set(x.slide, x.reason);
    for (let s = 1; s <= n; s++) {
      expect(
        cited.has(s) || excluded.has(s),
        `${deck} slide ${s} is neither an archive source nor an exclusion`,
      ).toBe(true);
      expect(cited.has(s) && excluded.has(s), `${deck} slide ${s} is both cited and excluded`).toBe(
        false,
      );
    }
    for (const s of [...cited, ...excluded.keys()]) {
      expect(s, `${deck} cites slide ${s}, beyond the deck`).toBeLessThanOrEqual(n);
    }
    for (const [s, reason] of excluded)
      expect(reason.length, `slide ${s} reason`).toBeGreaterThan(8);
  });

  it('exclusions are unique per deck and slide', () => {
    const keys = archiveExclusions.map((x) => `${x.deck}#${x.slide}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe('archive entries bind to the rest of the site', () => {
  it('every project reference resolves to a project with a page', () => {
    const ids = new Set(projects.map((p) => p.id));
    const withPage = new Set(caseStudies.map((cs) => cs.projectId));
    for (const e of archiveEntries.filter((e) => e.project)) {
      expect(ids.has(e.project!), `${e.id}: project ${e.project}`).toBe(true);
      expect(withPage.has(e.project!), `${e.id}: ${e.project} has no page`).toBe(true);
    }
    expect(archiveEntriesForProject('igcar-slipring').length).toBeGreaterThan(0);
    expect(archiveEntriesForProject('no-such-project')).toEqual([]);
  });

  it('every media file exists, has alt text and, being the company’s, a visible credit', () => {
    for (const e of archiveEntries)
      for (const m of e.media ?? []) {
        expect(existsSync(join('public', m.file)), `${e.id}: ${m.file} missing`).toBe(true);
        expect(m.alt.length).toBeGreaterThan(10);
        if (THIRD_PARTY.test(m.file))
          expect(m.credit, `${e.id}: ${m.file} needs a credit`).toBeTruthy();
      }
  });

  it('requested dates map to records rows, and every records photos folder is claimed', () => {
    const rows = recordsFolderIds();
    expect(rows.size).toBeGreaterThan(20);
    for (const e of archiveEntries.filter((e) => e.when.status === 'requested')) {
      expect(rows.has(e.recordsId!), `${e.id}: no records row for ${e.recordsId}`).toBe(true);
    }
    const claimed = new Set(archiveEntries.map((e) => e.recordsId).filter(Boolean));
    for (const id of rows)
      expect(claimed.has(id), `records row ${id} has no archive entry`).toBe(true);
  });

  it('the requested/unknown items are the minority — most entries are dated', () => {
    const known = archiveEntries.filter((e) => e.when.status === 'known').length;
    expect(known).toBeGreaterThan(archiveEntries.length / 3);
  });
});
