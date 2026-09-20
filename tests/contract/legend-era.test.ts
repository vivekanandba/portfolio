import { describe, it, expect } from 'vitest';
import { caseStudies, roles, turningPoints, caseStudyStart } from '@/content';

/**
 * The Legend-era facts Vivek decided on 2026-09-13 (recorded in
 * source/resume/README.md): Legend ran Jan 2013 – Jan 2018 and Tech Mahindra
 * followed from Jan 2018. These guards stop a future "helpful" revert to the
 * Jan 2019 dates the served resume still carries, and pin the sixth Turning
 * Point — the bid-to-handover loop — to the era pages. Written red (PR-4).
 */
describe('Legend-era dates (Vivek’s decision, 2026-09-13)', () => {
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

describe('Legend-era project start months follow the public LinkedIn Projects record (PR-B)', () => {
  // Basic_LinkedInDataExport (public-profile Projects.csv, exported 2026-07-23):
  // IGCAR slip ring Sep 2015 – Dec 2015; BMP-II turret Nov 2014 – Mar 2015;
  // filament-wound shells Mar 2015 – Aug 2015; LCA-Navy opto-electronics
  // Jan 2016 – Jun 2016. The site had placed these by inference; the record wins.
  it.each([
    ['igcar-slipring', 201509],
    ['bmp2-turret', 201411],
    ['filament-composites', 201503],
    ['lca-navy', 201601],
  ])('%s starts %i', (id, start) => {
    expect(caseStudyStart(id)).toBe(start);
  });
});

describe('the slip-ring line page points at the IGCAR deep dive (PR-B)', () => {
  it('carries the IGCAR exploded CAD in its gallery with a caption naming the project page', () => {
    const line = caseStudies.find((cs) => cs.slug === 'slipring-line');
    const item = line?.gallery?.find((g) => g.file === 'media/legend-igcar-slipring-cad.jpg');
    expect(item, 'IGCAR CAD in the slip-ring line gallery').toBeDefined();
    expect(item!.credit ?? '').toMatch(/IGCAR Nuclear Slip Ring/);
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
