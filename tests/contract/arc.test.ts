import { describe, it, expect } from 'vitest';
import { profile, roles } from '@/content';
import { HANDOVER_TOLERANCE_MONTHS, arcModel, arcSentence, parsePeriod, yearOf } from '@/lib/arc';
import { domainLabel } from '@/lib/domain';

/**
 * The real roles through the arc model (SPEC-0006 R9). The unit tests prove the
 * arithmetic on invented careers; this proves the published record still draws
 * as one unbroken primary lane with one venture alongside — so a future role
 * that overlaps by a year fails here, in words, before anything is drawn.
 */
describe('the arc, drawn from today’s roles', () => {
  const model = arcModel(roles, new Date('2026-10-02T00:00:00Z'));

  it('parses every period', () => {
    for (const r of roles) expect(() => parsePeriod(r.period), r.company).not.toThrow();
  });

  it('is one primary lane: every primary role drawn, every handover inside the tolerance', () => {
    expect(model.primary).toHaveLength(roles.filter((r) => !r.aside).length);
    for (const h of model.handovers) {
      expect(h.months, `${h.from} → ${h.to}`).toBeLessThanOrEqual(HANDOVER_TOLERANCE_MONTHS);
    }
  });

  it('has no gap, so the description may say so', () => {
    expect(model.gaps).toEqual([]);
    expect(arcSentence(model, domainLabel)).toMatch(/no gap between them/);
  });

  it('runs exactly one venture alongside', () => {
    expect(model.asides.map((a) => a.company)).toEqual(
      roles.filter((r) => r.aside).map((r) => r.company),
    );
    expect(model.asides).toHaveLength(1);
  });

  it('starts where the hero’s breadth line starts counting', () => {
    expect(yearOf(model.axis.start)).toBe(profile.careerStartYear);
  });

  it('labels every era with a domain the palette knows', () => {
    for (const e of model.eras) {
      expect(e.domain, 'a primary role without a domain would draw a grey era').toBeDefined();
      expect(domainLabel(e.domain)).toMatch(/^[A-Z]/);
    }
  });
});
