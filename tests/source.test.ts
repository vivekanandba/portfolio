import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';

/**
 * Owner-authored source material (ADR-0013). These checks keep the `source/`
 * tree honest in the ways a machine can: nothing private leaks (no phone
 * numbers, no e-mail addresses), every media reference resolves and no media
 * file is orphaned, every file respects the 2 MiB hygiene ceiling, originals
 * are pinned by sha256 to a named release, and owner statements are dated.
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
  it('has the README and the three sub-trees', () => {
    for (const p of ['README.md', 'decks', 'resume', 'owner-notes']) {
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
      [...slides().matchAll(/\b((?:media|clips)\/[A-Za-z0-9._-]+)/g)].map((m) => m[1]),
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

describe('source/owner-notes', () => {
  const dir = join(ROOT, 'owner-notes');
  const notes = () => readdirSync(dir).filter((f) => f !== 'README.md');

  it('has at least one note', () => {
    expect(notes().length).toBeGreaterThan(0);
  });

  it('every note is dated in its name and its header, and the two agree', () => {
    for (const f of notes()) {
      const m = f.match(/^(\d{4}-\d{2}-\d{2})-[a-z0-9-]+\.md$/);
      expect(m, `${f} must be YYYY-MM-DD-slug.md`).toBeTruthy();
      const text = readFileSync(join(dir, f), 'utf8');
      expect(text, `${f} needs a "Source: owner, <date>" header`).toContain(
        `Source: owner, ${m![1]}`,
      );
    }
  });
});
