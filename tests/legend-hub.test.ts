import { describe, it, expect } from 'vitest';
import { caseStudies, projects } from '@/content';

/**
 * The era hub page (ADR-0015). Three invariants keep it honest: the seven
 * lifecycle stages are all named (the spine cannot be edited away quietly),
 * every gallery caption says what Vivek's part was from a closed
 * vocabulary, and any claim marked 'my account only' cites the dated note it
 * rests on (ADR-0013). Written before the page existed (SPEC §9.2).
 */
const STAGES = [
  /bid/,
  /design/,
  /prototype/,
  /production/,
  /process/,
  /first[- ]article/,
  /handover/,
];
const ROLE = /Role: (led|designed|delivered|supported|workplace|company programme)\b/;

describe('the Legend era hub', () => {
  const hub = caseStudies.find((cs) => cs.slug === 'legend-technologies');

  it('exists and is the era flagship on the landing grid', () => {
    expect(hub, 'legend-technologies page missing').toBeDefined();
    const project = projects.find((p) => p.id === 'legend-technologies');
    expect(project?.featured, 'the hub is featured').toBe(true);
  });

  it('names all seven lifecycle stages in its decisions', () => {
    const text = (hub?.decisions ?? [])
      .map((d) => `${d.decision} ${d.tradeoff}`)
      .join(' ')
      .toLowerCase();
    for (const stage of STAGES) {
      expect(text, `stage ${stage} missing from the hub's decisions`).toMatch(stage);
    }
  });

  it('marks the shop-floor detail as my account only, citing the note', () => {
    const marked = (hub?.decisions ?? []).filter((d) => /my account only/i.test(d.tradeoff));
    expect(marked.length, 'the hub carries at least one my-account-only marker').toBeGreaterThan(0);
  });

  it('every gallery caption carries a Role: tag from the closed vocabulary', () => {
    const gallery = hub?.gallery ?? [];
    expect(gallery.length, 'the hub has a programme gallery').toBeGreaterThan(5);
    for (const g of gallery) {
      expect(g.credit ?? '', `${g.file} caption needs a Role: tag`).toMatch(ROLE);
    }
  });
});

describe('my-account-only claims (ADR-0013)', () => {
  it('cite the dated note they rest on, wherever the marker appears', () => {
    for (const cs of caseStudies) {
      for (const d of cs.decisions) {
        const text = `${d.decision} ${d.tradeoff}`;
        if (/my account only/i.test(text)) {
          expect(
            text,
            `${cs.slug}: a my-account-only claim must cite "my note of YYYY-MM-DD"`,
          ).toMatch(/my note of \d{4}-\d{2}-\d{2}/);
        }
      }
    }
  });
});
