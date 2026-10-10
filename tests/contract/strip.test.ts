import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { caseStudies, caseStudyStart, projects, strip } from '@/content';
import { resolveStrip } from '@/lib/strip';

/** Media owned by a client or former employer, named media/<source>-* by convention. */
const THIRD_PARTY = /^media\/(legend|enti|neurasignal|appstore|mapshalli)-/;

/**
 * The strip on today's content (SPEC-0006 R12): every frame exists on disk,
 * resolves to a screened, credited item in the case study it links to, and the
 * band reads across the arc rather than one era.
 */
describe('the photo strip', () => {
  const frames = resolveStrip(strip, { caseStudies, projects, caseStudyStart });

  it('has six to eight frames, each a file that exists', () => {
    expect(strip.length).toBeGreaterThanOrEqual(6);
    expect(strip.length).toBeLessThanOrEqual(8);
    for (const f of strip) expect(existsSync(join('public', f.file)), f.file).toBe(true);
  });

  it('resolves every frame to the page it links to, with real alt text', () => {
    expect(frames).toHaveLength(strip.length);
    for (const f of frames) {
      expect(f.href).toMatch(/^\/work\/[a-z0-9-]+\/$/);
      expect(f.alt.length, `${f.file} alt`).toBeGreaterThan(10);
    }
  });

  it('shows my own work, never a programme the company merely supported', () => {
    for (const f of frames)
      expect(f.credit ?? '', f.file).not.toMatch(/Role: (supported|company|workplace)/);
  });

  it('carries a visible credit for every third-party frame', () => {
    for (const f of frames) {
      if (THIRD_PARTY.test(f.file)) expect(f.credit, `${f.file} credit`).toBeTruthy();
    }
  });

  it('runs in the order the work began, across at least four domains', () => {
    const years = frames.map((f) => f.year);
    expect([...years].sort((a, b) => a - b)).toEqual(years);
    expect(new Set(frames.map((f) => f.domain)).size).toBeGreaterThanOrEqual(4);
  });
});
