import { describe, it, expect } from 'vitest';
import { roles, turningPoints, caseStudyStart } from '@/content';

/**
 * The Legend-era facts the owner decided on 2026-09-13 (recorded in
 * source/resume/README.md): Legend ran Jan 2013 – Jan 2018 and Tech Mahindra
 * followed from Jan 2018. These guards stop a future "helpful" revert to the
 * Jan 2019 dates the served resume still carries, and pin the sixth Turning
 * Point — the bid-to-handover loop — to the era pages. Written red (PR-4).
 */
describe('Legend-era dates (owner decision, 2026-09-13)', () => {
  const legend = roles.find((r) => r.company.startsWith('Legend'));
  const techm = roles.find((r) => r.company === 'Tech Mahindra');

  it('Legend Technologies runs Jan 2013 – Jan 2018 with the LinkedIn title progression', () => {
    expect(legend).toBeDefined();
    expect(legend!.period).toBe('Jan 2013 – Jan 2018');
    expect(legend!.title).toMatch(/Engineer.*Lead Project Engineer/);
  });

  it('Tech Mahindra follows from Jan 2018', () => {
    expect(techm).toBeDefined();
    expect(techm!.period).toBe('Jan 2018 – Jan 2021');
    expect(caseStudyStart('rail-tooling')).toBe(201801);
  });

  it('the Legend role names the ENTI seat and the end-to-end loop', () => {
    const text = legend!.highlights.join(' ');
    expect(text).toMatch(/ENTI/);
    expect(text).toMatch(/bid/i);
    expect(text).toMatch(/handover/i);
  });
});

describe('the sixth Turning Point — the loop', () => {
  it('exists, is dated 2013, and anchors to the hub and the slip-ring line', () => {
    const node = turningPoints.find((tp) => tp.year === 2013);
    expect(node, 'a 2013 turning point').toBeDefined();
    expect(node!.projects).toContain('legend-technologies');
    expect(node!.projects).toContain('slipring-line');
    expect(turningPoints).toHaveLength(6);
  });
});
