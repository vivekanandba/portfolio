import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';

/**
 * Source material in Vivek's own hand (ADR-0013). These checks keep the `source/`
 * tree honest in the ways a machine can: nothing private leaks (no phone
 * numbers, no e-mail addresses), every media reference resolves and no media
 * file is orphaned, every file respects the 2 MiB hygiene ceiling, originals
 * are pinned by sha256 to a named release, and Vivek's notes are dated.
 *
 * They do NOT judge redaction quality — whether a third party's name slipped
 * through is a human review responsibility, recorded in each deck README's
 * redaction log. And they cannot re-run the extractor (the originals are not
 * in the repository), so byte-for-byte reproduction is a local check, not a gate.
 */
const ROOT = 'source';
const DECKS = ['legend-company-v5.5', 'enti-corporate-v1.4-taml'] as const;
const RELEASE_TAG = 'source-decks-2026-09';
const ORIGINALS: Record<(typeof DECKS)[number], string> = {
  'legend-company-v5.5': '0a83f9e215367fa9fefb9ddb03d539efb021d0279a7f2ee9eae9565a72effdba',
  'enti-corporate-v1.4-taml': '75218317c1468df14084ab2458420a3a88eee9d0075bb040f9abb6028504f793',
};
const MAX_BYTES = 2 * 1024 * 1024;

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)],
  );
}
const isText = (p: string) => /\.(md|json|txt)$/.test(p);
const sha256 = (p: string) => createHash('sha256').update(readFileSync(p)).digest('hex');

describe('source/ tree shape', () => {
  it('has the README and the five sub-trees', () => {
    for (const p of ['README.md', 'decks', 'resume', 'my-notes', 'records', 'my-photos']) {
      expect(existsSync(join(ROOT, p)), `source/${p} missing`).toBe(true);
    }
  });

  it.each(DECKS)('deck %s has README, slides.md, media-map.json and media/', (deck) => {
    for (const p of ['README.md', 'slides.md', 'media-map.json', 'media']) {
      expect(existsSync(join(ROOT, 'decks', deck, p)), `${deck}/${p} missing`).toBe(true);
    }
  });
});

describe('source/ privacy invariants', () => {
  const files = walk(ROOT);
  const textFiles = files.filter(isText);

  it('contains no phone numbers or e-mail addresses in any text file', () => {
    // A phone number is a run of digits/spaces/dashes carrying 10+ digits (ISO
    // dates carry 8, so 2026-09-13 passes), bounded by non-hex characters so a
    // sha256 line cannot trip it; +91 in any spacing; anything e-mail shaped.
    const RUN = /(?<![0-9a-f])\d[\d\s-]{6,}\d(?![0-9a-f])/g;
    const INTL = /\+\s?91[\s-]?\d/;
    const EMAIL = /[\w.+-]+@[\w-]+\.[\w.-]+/;
    const phoneShaped = (line: string) =>
      [...line.matchAll(RUN)].some((m) => (m[0].match(/\d/g) ?? []).length >= 10);
    for (const f of textFiles) {
      const text = readFileSync(f, 'utf8');
      for (const line of text.split('\n')) {
        if (/sha256/i.test(line)) continue;
        expect(EMAIL.test(line), `${f}: e-mail address: ${line}`).toBe(false);
        expect(INTL.test(line), `${f}: phone number: ${line}`).toBe(false);
        expect(phoneShaped(line), `${f}: phone-shaped digit run: ${line}`).toBe(false);
      }
    }
  });

  it('keeps every file at or under the 2 MiB hygiene ceiling', () => {
    for (const f of files) {
      expect(statSync(f).size, `${f} exceeds 2 MiB`).toBeLessThanOrEqual(MAX_BYTES);
    }
  });
});

describe.each(DECKS)('deck %s', (deck) => {
  const dir = join(ROOT, 'decks', deck);
  const readme = () => readFileSync(join(dir, 'README.md'), 'utf8');
  const slides = () => readFileSync(join(dir, 'slides.md'), 'utf8');

  it('README pins the original to the release by tag and sha256', () => {
    const text = readme();
    expect(text).toContain(RELEASE_TAG);
    expect(text).toContain(ORIGINALS[deck]);
  });

  it('README carries a redaction log', () => {
    expect(readme()).toMatch(/## Redaction log/);
  });

  it('every media/ and clips/ reference in slides.md exists, and nothing is orphaned', () => {
    const refs = new Set(
      // (?<!public/) — the transcript may mention site paths in prose; only deck-relative
      // references are checked.
      [...slides().matchAll(/(?<!public\/)\b((?:media|clips)\/[A-Za-z0-9._-]+)/g)].map((m) => m[1]),
    );
    // Both decks reference well over twenty kept files; a transcript that
    // references almost nothing means the media rules silently excluded it all.
    expect(refs.size, 'transcript references almost no media').toBeGreaterThan(20);
    for (const ref of refs) {
      expect(existsSync(join(dir, ref)), `${deck}: ${ref} referenced but missing`).toBe(true);
    }
    // Clips are the files most likely to be added by hand (PR-2), so they are
    // orphan-checked too; the folder is absent for a deck with no clips.
    const present = ['media', 'clips']
      .filter((sub) => existsSync(join(dir, sub)))
      .flatMap((sub) => walk(join(dir, sub)))
      .map((p) => p.slice(dir.length + 1));
    for (const p of present) {
      expect(refs.has(p), `${deck}: ${p} is not referenced from slides.md`).toBe(true);
    }
  });

  it('media files follow the sNN-slug naming and media-map.json accounts for every one', () => {
    // 'pending' = a clip that needs re-encoding under 2 MiB before it can be
    // committed (ADR-0014 pipeline); it must say so, and must not claim a file.
    const map = JSON.parse(readFileSync(join(dir, 'media-map.json'), 'utf8')) as Record<
      string,
      { status: 'kept' | 'excluded' | 'pending'; slide: number; name?: string; reason?: string }
    >;
    const kept = new Set(
      Object.values(map)
        .filter((m) => m.status === 'kept')
        .map((m) => m.name),
    );
    for (const p of walk(join(dir, 'media'))) {
      const name = p.slice(dir.length + 1);
      expect(name).toMatch(/^media\/s\d{2,3}-[a-z0-9-]+\.(jpe?g|png)$/);
      expect(kept.has(name), `${deck}: ${name} not in media-map.json`).toBe(true);
    }
    for (const [orig, m] of Object.entries(map)) {
      if (m.status === 'kept') {
        expect(existsSync(join(dir, m.name!)), `${deck}: mapped ${m.name} missing`).toBe(true);
      } else {
        expect(m.reason, `${deck}: ${m.status} ${orig} needs a reason`).toBeTruthy();
      }
    }
  });

  it('transcript has one heading per slide, in order', () => {
    const nums = [...slides().matchAll(/^## Slide (\d+)/gm)].map((m) => Number(m[1]));
    expect(nums.length).toBeGreaterThan(40);
    expect(nums).toEqual(nums.map((_, i) => i + 1));
  });
});

describe('source/resume', () => {
  it('holds the master resume sources and the v15 PDF, and pins v15 to the served copy', () => {
    for (const f of [
      'VIVEKANANDB-RESUME-MASTER.docx',
      'VIVEKANANDB-RESUME-MASTER-v2.docx',
      'Vivekanandb-Resume-v15.pdf',
      'README.md',
    ]) {
      expect(existsSync(join(ROOT, 'resume', f)), `source/resume/${f} missing`).toBe(true);
    }
    const served = sha256('public/Vivekanandb-Resume.pdf');
    expect(sha256(join(ROOT, 'resume', 'Vivekanandb-Resume-v15.pdf'))).toBe(served);
    expect(readFileSync(join(ROOT, 'resume', 'README.md'), 'utf8')).toContain(served);
  });
});

describe('source/my-notes', () => {
  const dir = join(ROOT, 'my-notes');
  const notes = () => readdirSync(dir).filter((f) => f !== 'README.md');

  it('has at least one note', () => {
    expect(notes().length).toBeGreaterThan(0);
  });

  it('every note is dated in its name and its header, and the two agree', () => {
    for (const f of notes()) {
      const m = f.match(/^(\d{4}-\d{2}-\d{2})-[a-z0-9-]+\.md$/);
      expect(m, `${f} must be YYYY-MM-DD-slug.md`).toBeTruthy();
      const text = readFileSync(join(dir, f), 'utf8');
      expect(text, `${f} needs a "Source: my own account, <date>" header`).toContain(
        `Source: my own account, ${m![1]}`,
      );
    }
  });
});

describe('source/records — the intake table for the Legend years (PR-B)', () => {
  const file = join(ROOT, 'records', 'legend-programmes.md');
  const COLUMNS = [
    'Item',
    'Where it shows',
    'What the site says now',
    'Month / year',
    'My role',
    'One sentence',
    'Photos folder',
  ];
  const rows = () => {
    const lines = readFileSync(file, 'utf8').split('\n');
    // The first contiguous run of table lines only — a second table added to the
    // intro later must not be merged into the rows under test (CON-VER-005).
    const start = lines.findIndex((l) => /^\|/.test(l));
    const table: string[] = [];
    for (const l of lines.slice(start)) {
      if (!/^\|/.test(l)) break;
      table.push(l);
    }
    const cells = (l: string) =>
      l
        .trim()
        .replace(/^\||\|$/g, '')
        .split('|')
        .map((c) => c.trim());
    return { header: cells(table[0] ?? ''), body: table.slice(2).map(cells) };
  };

  it('exists and carries exactly the seven agreed columns, in order', () => {
    expect(existsSync(file), 'source/records/legend-programmes.md missing').toBe(true);
    expect(rows().header).toEqual(COLUMNS);
  });

  it('every row has a cell for every column, names the item and what the site says now', () => {
    const { body } = rows();
    expect(body.length, 'the table lists the open items').toBeGreaterThanOrEqual(30);
    for (const r of body) {
      expect(r, `row "${r[0]}" has ${r.length} cells, not ${COLUMNS.length}`).toHaveLength(
        COLUMNS.length,
      );
      expect(r[0], 'Item is never blank').not.toBe('');
      expect(r[2], `"${r[0]}": say what the site says now`).not.toBe('');
    }
  });

  it('gives every item a photos folder id under my-photos/, unique across the table (or — when photos do not apply)', () => {
    const ids = rows()
      .body.map((r) => r[6])
      .filter((c) => c !== '—');
    for (const id of ids) expect(id).toMatch(/^`my-photos\/[a-z0-9-]+\/`$/);
    expect(new Set(ids).size, 'duplicate photos folder').toBe(ids.length);
  });
});

describe('source/my-photos — where my own photographs come in (PR-B)', () => {
  const dir = join(ROOT, 'my-photos');
  const FIELDS = ['file', 'item', 'month', 'caption'] as const;

  it('README explains the folder-per-item layout, the manifest fields and the screening rule', () => {
    const text = readFileSync(join(dir, 'README.md'), 'utf8');
    for (const f of FIELDS) expect(text, `README must document "${f}"`).toContain(`"${f}"`);
    expect(text).toMatch(/manifest\.json/);
    expect(text).toMatch(/ADR-0007/);
    expect(text).toMatch(/legend-programmes\.md/);
  });

  it('every item folder has a manifest whose entries name existing files, an item id and a month', () => {
    const folders = readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory());
    for (const f of folders) {
      const manifestPath = join(dir, f.name, 'manifest.json');
      expect(existsSync(manifestPath), `${f.name}/manifest.json missing`).toBe(true);
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as Record<string, unknown>[];
      expect(Array.isArray(manifest), `${f.name}: manifest must be an array`).toBe(true);
      const listed = new Set<string>();
      for (const e of manifest) {
        for (const k of FIELDS)
          expect(typeof e[k], `${f.name}: "${k}" must be a string`).toBe('string');
        expect(e.file as string).toMatch(/^[a-z0-9-]+\.(jpe?g|png)$/);
        expect(
          existsSync(join(dir, f.name, e.file as string)),
          `${f.name}/${e.file} listed but missing`,
        ).toBe(true);
        expect(e.item, `${f.name}: item id must match the folder`).toBe(f.name);
        expect(e.month as string).toMatch(/^(\d{4}-\d{2}|unknown)$/);
        listed.add(e.file as string);
      }
      for (const p of readdirSync(join(dir, f.name))) {
        if (p === 'manifest.json') continue;
        expect(listed.has(p), `${f.name}/${p} is not in the manifest`).toBe(true);
      }
    }
  });
});
