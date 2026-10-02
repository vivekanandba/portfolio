import { describe, it, expect } from 'vitest';
import {
  HANDOVER_TOLERANCE_MONTHS,
  PERIOD_PATTERN,
  arcModel,
  arcSentence,
  formatMonth,
  monthIndex,
  parsePeriod,
  yearOf,
} from '@/lib/arc';

/**
 * The arc's geometry is arithmetic over `role.period` strings (SPEC-0006
 * R9–R11). Everything in src/lib/arc.ts is a pure function with no imports, so
 * the fixtures here are small invented careers; tests/contract/arc.test.ts runs
 * the real roles through the same model.
 */
const at = new Date('2026-10-02T00:00:00Z');

const role = (company: string, period: string, domain?: string, aside?: string) => ({
  company,
  period,
  domain,
  aside,
});

describe('parsePeriod', () => {
  it('reads "Mon YYYY – Mon YYYY" as inclusive months', () => {
    expect(parsePeriod('Aug 2011 – Dec 2012')).toEqual({
      start: monthIndex(2011, 8),
      end: monthIndex(2012, 12),
    });
  });

  it('reads Present as an open end', () => {
    expect(parsePeriod('Nov 2024 – Present')).toEqual({ start: monthIndex(2024, 11), end: null });
  });

  it.each(['Nov 2024 - Present', 'November 2024 – Present', '2024 – 2026', 'Nov 2024 – now', ''])(
    'rejects %j — a bar that cannot be drawn must fail the build, not vanish',
    (bad) => {
      expect(() => parsePeriod(bad)).toThrow(/period/i);
    },
  );

  it('refuses an end before its start', () => {
    expect(() => parsePeriod('Jan 2018 – Jan 2013')).toThrow(/before/);
  });

  it('exposes the pattern the schema enforces, so the two cannot disagree', () => {
    expect(PERIOD_PATTERN.test('Jan 2013 – Jan 2018')).toBe(true);
    // A hyphen-minus is the mistake a keyboard makes.
    expect(PERIOD_PATTERN.test('Jan 2013 - Jan 2018')).toBe(false);
  });
});

describe('month arithmetic', () => {
  it('indexes months so consecutive months differ by one across a year boundary', () => {
    expect(monthIndex(2013, 1) - monthIndex(2012, 12)).toBe(1);
    expect(yearOf(monthIndex(2026, 10))).toBe(2026);
  });

  it('formats a month short for labels and long for prose', () => {
    expect(formatMonth(monthIndex(2016, 11))).toBe('Nov 2016');
    expect(formatMonth(monthIndex(2016, 11), 'long')).toBe('November 2016');
  });
});

describe('arcModel', () => {
  const contiguous = [
    role('C', 'Jan 2021 – Present', 'ai'),
    role('B', 'Jan 2015 – Dec 2020', 'health'),
    role('A', 'Aug 2011 – Dec 2014', 'aero'),
  ];

  it('orders primary roles by start regardless of input order, and abuts them', () => {
    const m = arcModel(contiguous, at);
    expect(m.primary.map((s) => s.company)).toEqual(['A', 'B', 'C']);
    expect(m.gaps).toEqual([]);
    expect(m.handovers).toEqual([]);
    expect(m.primary[0].to).toBe(m.primary[1].from);
    expect(m.primary[1].to).toBe(m.primary[2].from);
  });

  it('quantises the right edge to the end of the build year, and runs a Present role to it', () => {
    const m = arcModel(contiguous, at);
    expect(m.axis.end).toBe(monthIndex(2027, 1));
    expect(m.primary[2].present).toBe(true);
    expect(m.primary[2].to).toBe(m.axis.end);
    // The same career drawn in March has the same geometry as in October, so
    // the pixel baseline holds for a calendar year (R11).
    const march = arcModel(contiguous, new Date('2026-03-15T00:00:00Z'));
    expect(march.primary.map((s) => [s.x, s.w])).toEqual(m.primary.map((s) => [s.x, s.w]));
  });

  it('places bars as fractions of the axis that sum to one when there is no gap', () => {
    const m = arcModel(contiguous, at);
    expect(m.primary[0].x).toBe(0);
    expect(m.primary.reduce((n, s) => n + s.w, 0)).toBeCloseTo(1, 10);
    expect(m.axis.months).toBe(monthIndex(2027, 1) - monthIndex(2011, 8));
  });

  it('lets a handover overlap within the tolerance, the earlier bar yielding at the later start', () => {
    const roles = [role('A', 'Jan 2011 – Mar 2015', 'aero'), role('B', 'Jan 2015 – Present', 'ai')];
    const m = arcModel(roles, at);
    expect(m.handovers).toEqual([{ from: 'A', to: 'B', months: 3 }]);
    expect(m.primary[0].to).toBe(monthIndex(2015, 1));
    expect(m.gaps).toEqual([]);
  });

  it('fails the build on an overlap beyond the tolerance, naming both roles and the number', () => {
    const roles = [role('A', 'Jan 2011 – Dec 2015', 'aero'), role('B', 'Jan 2015 – Present', 'ai')];
    expect(() => arcModel(roles, at)).toThrow(/A.*B.*12 months.*HANDOVER_TOLERANCE_MONTHS/s);
    expect(HANDOVER_TOLERANCE_MONTHS).toBe(3);
  });

  it('refuses two primary roles that are both Present — one lane means one current role', () => {
    const roles = [role('A', 'Jan 2011 – Present', 'aero'), role('B', 'Jan 2020 – Present', 'ai')];
    expect(() => arcModel(roles, at)).toThrow(/HANDOVER_TOLERANCE_MONTHS/);
  });

  it('records a gap between primary roles instead of papering over it', () => {
    const roles = [role('A', 'Jan 2011 – Dec 2014', 'aero'), role('B', 'Mar 2015 – Present', 'ai')];
    const m = arcModel(roles, at);
    expect(m.gaps).toEqual([{ from: monthIndex(2015, 1), to: monthIndex(2015, 3), months: 2 }]);
    expect(m.primary[0].to + 2).toBe(m.primary[1].from);
  });

  it('puts a venture marked aside on its own lane, off the primary one', () => {
    const roles = [...contiguous, role('V', 'Nov 2016 – Present', 'venture', 'Side venture')];
    const m = arcModel(roles, at);
    expect(m.primary.map((s) => s.company)).toEqual(['A', 'B', 'C']);
    expect(m.asides).toHaveLength(1);
    expect(m.asides[0]).toMatchObject({
      company: 'V',
      present: true,
      from: monthIndex(2016, 11),
      to: m.axis.end,
    });
  });

  it('merges neighbouring segments of one domain into one era, labelled by the year it began', () => {
    const roles = [
      role('A1', 'Aug 2011 – Dec 2012', 'aero'),
      role('A2', 'Jan 2013 – Jan 2018', 'aero'),
      role('B', 'Jan 2018 – Present', 'ai'),
    ];
    const m = arcModel(roles, at);
    expect(m.eras.map((e) => [e.domain, e.startYear])).toEqual([
      ['aero', 2011],
      ['ai', 2018],
    ]);
    expect(m.eras[0].w).toBeCloseTo(m.primary[0].w + m.primary[1].w, 10);
    expect(m.eras[1].x).toBeCloseTo(m.primary[2].x, 10);
  });

  it('ticks every five years from the start year, strictly inside the axis', () => {
    const m = arcModel(contiguous, at);
    expect(m.ticks.map((t) => t.year)).toEqual([2016, 2021, 2026]);
    for (const t of m.ticks) {
      expect(t.x).toBeGreaterThan(0);
      expect(t.x).toBeLessThan(1);
    }
  });

  it('measures each domain’s share of the months actually worked, not the months drawn', () => {
    // A Present bar is drawn to December; its share stops at the current month.
    const roles = [role('A', 'Jan 2016 – Dec 2020', 'aero'), role('B', 'Jan 2021 – Present', 'ai')];
    const m = arcModel(roles, at); // Jan 2016 .. Oct 2026 is 130 months, 60 of them A
    expect(m.share.aero).toBeCloseTo(60 / 130, 10);
    expect(m.share.ai).toBeCloseTo(70 / 130, 10);
  });

  it('defaults "now" to the clock', () => {
    const m = arcModel(contiguous);
    expect(yearOf(m.axis.end)).toBe(new Date().getFullYear() + 1);
  });

  it('needs at least one primary role', () => {
    expect(() => arcModel([], at)).toThrow(/no primary/i);
  });
});

describe('arcSentence', () => {
  const label = (d?: string) =>
    ({ aero: 'Aerospace', health: 'Healthcare Robotics', ai: 'AI-Native' })[d ?? ''] ?? 'Other';

  it('states duration, span and count from the model, and says "no gap" only when there is none', () => {
    const roles = [
      role('A', 'Aug 2011 – Dec 2014', 'aero'),
      role('B', 'Jan 2015 – Dec 2020', 'health'),
      role('C', 'Jan 2021 – Present', 'ai'),
      role('V', 'Nov 2016 – Present', 'venture', 'aside'),
    ];
    const s = arcSentence(arcModel(roles, at), label);
    expect(s).toMatch(
      /^15 years and 3 months, August 2011 to October 2026, in 3 roles with no gap between them: Aerospace \d+%, then Healthcare Robotics \d+% and AI-Native \d+%\./,
    );
    expect(s).toMatch(/V ran alongside from November 2016\.$/);
  });

  it('names the gap instead of claiming there was none', () => {
    const roles = [role('A', 'Jan 2011 – Dec 2014', 'aero'), role('B', 'Mar 2015 – Present', 'ai')];
    const s = arcSentence(arcModel(roles, at), label);
    expect(s).not.toMatch(/no gap/);
    expect(s).toMatch(/with a gap of 2 months from January 2015/);
  });

  it('closes a venture that has ended, and reads a single era without a "then"', () => {
    const roles = [
      role('A', 'Jan 2011 – Present', 'aero'),
      role('V', 'Jan 2012 – Dec 2013', 'venture', 'aside'),
    ];
    const s = arcSentence(arcModel(roles, at), label);
    expect(s).toMatch(/in 1 role with no gap between them: Aerospace 100%\./);
    expect(s).toMatch(/V ran alongside from January 2012 to December 2013\.$/);
  });

  it('says whole years without months, and months without years', () => {
    // Jan 2011 to Dec 2026 inclusive is sixteen years exactly.
    const whole = arcSentence(
      arcModel([role('A', 'Jan 2011 – Present', 'aero')], new Date('2026-12-15T00:00:00Z')),
      label,
    );
    expect(whole).toMatch(/^16 years, January 2011 to December 2026,/);
    const young = arcSentence(
      arcModel([role('A', 'Aug 2026 – Present', 'aero')], new Date('2026-10-02T00:00:00Z')),
      label,
    );
    expect(young).toMatch(/^3 months, August 2026 to October 2026, in 1 role/);
  });

  it('lists several gaps, each with its own month', () => {
    const roles = [
      role('A', 'Jan 2011 – Dec 2014', 'aero'),
      role('B', 'Mar 2015 – Dec 2016', 'health'),
      role('C', 'Feb 2017 – Present', 'ai'),
    ];
    const s = arcSentence(arcModel(roles, at), label);
    expect(s).toMatch(/with gaps of 2 months from January 2015 and 1 month from January 2017:/);
  });

  it('labels domains through the function it is given, and falls back to the raw domain', () => {
    const roles = [role('A', 'Jan 2011 – Present', 'aero')];
    expect(arcSentence(arcModel(roles, at), label)).toContain('Aerospace');
    expect(arcSentence(arcModel(roles, at))).toContain('aero 100%');
  });
});
