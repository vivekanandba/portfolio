/**
 * The career arc as geometry (SPEC-0006 R8–R11): pure functions over the
 * `period` strings the roles already carry. No imports, generic over the role
 * shape, so the drawing can never disagree with the data it is drawn from.
 *
 * Months are integers — year × 12 + month — so adjacent months differ by one
 * across a year boundary. A period's end month is inclusive, as "Jan 2013 –
 * Jan 2018" reads; a bar is drawn to the month after its end.
 */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** The one shape `period` takes. The schema enforces it; this parses it. The dash is U+2013. */
export const PERIOD_PATTERN =
  /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) – (?:(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4})|Present)$/;

/**
 * Consecutive primary roles may overlap by this many months: a notice period
 * served while the next job has begun. Within it the earlier bar yields to the
 * later one at the later one's start. Beyond it two roles were genuinely held
 * at once, and the build fails so that becomes a decision rather than a drawing.
 */
export const HANDOVER_TOLERANCE_MONTHS = 3;

export function monthIndex(year: number, month: number): number {
  return year * 12 + (month - 1);
}

export function yearOf(index: number): number {
  return Math.floor(index / 12);
}

export function formatMonth(index: number, style: 'short' | 'long' = 'short'): string {
  const names = style === 'long' ? MONTHS_LONG : MONTHS;
  return `${names[index - yearOf(index) * 12]} ${yearOf(index)}`;
}

/** A parsed period. `end` is the inclusive last month, or null for Present. */
export type Span = { start: number; end: number | null };

export function parsePeriod(period: string): Span {
  const m = PERIOD_PATTERN.exec(period);
  if (!m) {
    throw new Error(
      `Unparseable period "${period}": expected "Mon YYYY – Mon YYYY" or "Mon YYYY – Present", with an en dash (SPEC-0006 R9).`,
    );
  }
  const start = monthIndex(Number(m[2]), MONTHS.indexOf(m[1]) + 1);
  if (!m[3]) return { start, end: null };
  const end = monthIndex(Number(m[4]), MONTHS.indexOf(m[3]) + 1);
  if (end < start) throw new Error(`Period "${period}" ends before it starts.`);
  return { start, end };
}

export type ArcRole<D extends string = string> = {
  company: string;
  period: string;
  domain?: D;
  aside?: string;
};

/** One bar. `from`/`to` are month indices (to exclusive); `x`/`w` are fractions of the axis. */
export type Segment<D extends string = string> = {
  company: string;
  domain?: D;
  from: number;
  to: number;
  x: number;
  w: number;
  present: boolean;
};

/** A run of consecutive primary segments in one domain; what gets a label. */
export type Era<D extends string = string> = {
  domain?: D;
  startYear: number;
  x: number;
  w: number;
  share: number;
};
export type Gap = { from: number; to: number; months: number };
export type Handover = { from: string; to: string; months: number };

export type ArcModel<D extends string = string> = {
  axis: { start: number; end: number; months: number };
  /** The month the model was built in. The right edge is later: see R11. */
  now: number;
  primary: Segment<D>[];
  asides: Segment<D>[];
  eras: Era<D>[];
  ticks: { year: number; x: number }[];
  gaps: Gap[];
  handovers: Handover[];
  /** Each domain's share of the months actually worked on the primary lane. */
  share: Record<string, number>;
};

export function arcModel<D extends string>(
  roles: readonly ArcRole<D>[],
  now: Date = new Date(),
): ArcModel<D> {
  const nowIndex = monthIndex(now.getFullYear(), now.getMonth() + 1);
  const spans = roles
    .map((role) => ({ role, ...parsePeriod(role.period) }))
    .sort((a, b) => a.start - b.start);
  const primarySpans = spans.filter((s) => !s.role.aside);
  if (primarySpans.length === 0) throw new Error('The arc has no primary role to draw.');

  // The strip is read at year resolution: its right edge is the end of the
  // build year, so the geometry holds for a calendar year (R11).
  const axisStart = spans[0].start;
  const axisEnd = monthIndex(now.getFullYear() + 1, 1);
  const months = axisEnd - axisStart;
  const x = (month: number) => (month - axisStart) / months;
  const drawnEnd = (s: Span) => (s.end === null ? axisEnd : s.end + 1);
  const segment = (s: (typeof spans)[number], to: number): Segment<D> => ({
    company: s.role.company,
    domain: s.role.domain,
    from: s.start,
    to,
    x: x(s.start),
    w: (to - s.start) / months,
    present: s.end === null,
  });

  const gaps: Gap[] = [];
  const handovers: Handover[] = [];
  const primary = primarySpans.map((s, i) => {
    let to = drawnEnd(s);
    const next = primarySpans[i + 1];
    if (next && next.start < to) {
      const overlap = to - next.start;
      if (overlap > HANDOVER_TOLERANCE_MONTHS) {
        throw new Error(
          `${s.role.company} and ${next.role.company} overlap by ${overlap} months, more than HANDOVER_TOLERANCE_MONTHS (${HANDOVER_TOLERANCE_MONTHS}). Two roles held at once need a decision about how to draw them, not a silent overlap (SPEC-0006 R9).`,
        );
      }
      handovers.push({ from: s.role.company, to: next.role.company, months: overlap });
      to = next.start;
    } else if (next && next.start > to) {
      gaps.push({ from: to, to: next.start, months: next.start - to });
    }
    return segment(s, to);
  });
  const asides = spans.filter((s) => s.role.aside).map((s) => segment(s, drawnEnd(s)));

  // Shares count months worked, so a Present bar drawn to December does not
  // claim the rest of the year.
  const worked = (s: Segment) => Math.max(0, Math.min(s.to, nowIndex + 1) - s.from);
  const total = primary.reduce((n, s) => n + worked(s), 0);
  const share: Record<string, number> = {};
  for (const s of primary) {
    const key = s.domain ?? 'other';
    share[key] = (share[key] ?? 0) + worked(s) / total;
  }

  const eras: Era<D>[] = [];
  for (const s of primary) {
    const last = eras[eras.length - 1];
    if (last && last.domain === s.domain) {
      last.w = s.x + s.w - last.x;
      last.share += worked(s) / total;
    } else {
      eras.push({
        domain: s.domain,
        startYear: yearOf(s.from),
        x: s.x,
        w: s.w,
        share: worked(s) / total,
      });
    }
  }

  const ticks: { year: number; x: number }[] = [];
  for (let year = yearOf(axisStart) + 5; monthIndex(year, 1) < axisEnd; year += 5) {
    ticks.push({ year, x: x(monthIndex(year, 1)) });
  }

  return {
    axis: { start: axisStart, end: axisEnd, months },
    now: nowIndex,
    primary,
    asides,
    eras,
    ticks,
    gaps,
    handovers,
    share,
  };
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;
const joinAnd = (parts: string[]) =>
  parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;

/**
 * The accessible description, composed from the model so every word in it is
 * computed: "no gap" appears only when the gap list is empty, the shares are
 * measured, the dates are the parsed ones.
 */
export function arcSentence<D extends string>(
  model: ArcModel<D>,
  label: (domain?: D) => string = (domain) => domain ?? 'other',
): string {
  const total = model.now - model.axis.start + 1;
  const years = Math.floor(total / 12);
  const rem = total % 12;
  const duration =
    rem === 0
      ? plural(years, 'year')
      : years === 0
        ? plural(rem, 'month')
        : `${plural(years, 'year')} and ${plural(rem, 'month')}`;
  const span = `${formatMonth(model.axis.start, 'long')} to ${formatMonth(model.now, 'long')}`;
  const gaps =
    model.gaps.length === 0
      ? 'no gap between them'
      : `${model.gaps.length === 1 ? 'a gap' : 'gaps'} of ${joinAnd(
          model.gaps.map((g) => `${plural(g.months, 'month')} from ${formatMonth(g.from, 'long')}`),
        )}`;
  const eras = model.eras.map((e) => `${label(e.domain)} ${Math.round(e.share * 100)}%`);
  const erasText = eras.length === 1 ? eras[0] : `${eras[0]}, then ${joinAnd(eras.slice(1))}`;
  const alongside = model.asides.map(
    (a) =>
      `${a.company} ran alongside from ${formatMonth(a.from, 'long')}${
        a.present ? '' : ` to ${formatMonth(a.to - 1, 'long')}`
      }.`,
  );
  return [
    `${duration}, ${span}, in ${plural(model.primary.length, 'role')} with ${gaps}: ${erasText}.`,
    ...alongside,
  ].join(' ');
}
