import type { CSSProperties } from 'react';
import { roles as allRoles } from '@/content';
import type { Role } from '@/content/schema';
import { arcModel, arcSentence, formatMonth, yearOf } from '@/lib/arc';
import { domainColor, domainLabel } from '@/lib/domain';

// SVG user units. The viewBox is 1000 wide and stretches to its container
// (preserveAspectRatio="none"); the element's height is fixed in pixels by its
// class, so one unit is one pixel vertically and the strokes below are kept at
// one pixel by vector-effect.
const W = 1000;
const LANE = { top: 2, height: 14 }; // the primary lane
const TICK = { top: 16, height: 5 }; // five-year ticks hang below it
const ASIDE = { top: 25, height: 4 }; // the venture alongside
const H = 30;

type ArcProps = { roles?: readonly Role[]; now?: Date };

/**
 * The fifteen years drawn (SPEC-0006 R8–R11): one strip computed from `roles`,
 * the venture alongside on a thinner lane beneath, a label where the domain
 * changes. Server-rendered. The only motion is the `.arc-draw` clip wipe in
 * globals.css, keyed to the reveal the section already has.
 */
export function Arc({ roles = allRoles, now }: ArcProps) {
  const model = arcModel(roles, now);
  const sentence = arcSentence(model, domainLabel);
  const pct = (fraction: number) => `${(fraction * 100).toFixed(3)}%`;
  const ux = (fraction: number) => Number((fraction * W).toFixed(2));
  return (
    <div className="mb-12">
      {/* Era labels: the visible alternative to the image. From lg each sits in
          a box as wide as its era, so it begins where its colour begins; below
          lg the same items wrap into a legend. */}
      <ol
        aria-label="Eras"
        className="mb-2 flex flex-wrap gap-x-5 gap-y-1 text-xs font-medium uppercase tracking-[0.14em] text-muted lg:flex-nowrap lg:gap-0"
      >
        {model.eras.map((era) => (
          <li
            key={`${era.domain}-${era.startYear}`}
            style={{ '--w': pct(era.w) } as CSSProperties}
            className="flex items-center gap-2 whitespace-nowrap lg:min-w-0 lg:shrink-0 lg:grow-0 lg:basis-[var(--w)]"
          >
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${domainColor(era.domain).bg}`}
            />
            {domainLabel(era.domain)} {era.startYear}
          </li>
        ))}
      </ol>

      <svg
        role="img"
        aria-labelledby="arc-title arc-desc"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="arc-draw block w-full overflow-visible"
        style={{ height: H }}
      >
        {/* One string child: React renders a <title> with several children as empty. */}
        <title id="arc-title">{`The career, ${yearOf(model.axis.start)} to now`}</title>
        <desc id="arc-desc">{sentence}</desc>
        {/* The track: a hairline the full width, so the strip reads as one span
            even where two neutral segments meet. */}
        <rect x={0} y={LANE.top} width={W} height={LANE.height} className="fill-hairline" />
        {model.primary.map((s) => (
          <rect
            key={s.company}
            data-arc-role={s.company}
            data-arc-lane="primary"
            x={ux(s.x)}
            y={LANE.top}
            width={ux(s.w)}
            height={LANE.height}
            className={domainColor(s.domain).fill}
          />
        ))}
        {/* A paper hairline where one role hands to the next, so two roles in
            one domain stay two. */}
        {model.primary.slice(0, -1).map((s) => (
          <line
            key={`handover-${s.company}`}
            x1={ux(s.x + s.w)}
            x2={ux(s.x + s.w)}
            y1={LANE.top}
            y2={LANE.top + LANE.height}
            className="stroke-paper"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {model.ticks.map((t) => (
          <line
            key={t.year}
            x1={ux(t.x)}
            x2={ux(t.x)}
            y1={TICK.top}
            y2={TICK.top + TICK.height}
            className="stroke-muted"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {/* Now: a cap at the right edge. */}
        <line
          x1={W}
          x2={W}
          y1={0}
          y2={LANE.top + LANE.height + 2}
          className="stroke-ink"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {model.asides.map((a) => (
          <rect
            key={a.company}
            data-arc-role={a.company}
            data-arc-lane="aside"
            x={ux(a.x)}
            y={ASIDE.top}
            width={ux(a.w)}
            height={ASIDE.height}
            className={domainColor(a.domain).fill}
          />
        ))}
      </svg>

      <div className="tabular mt-1 flex justify-between text-xs text-muted">
        <span>{yearOf(model.axis.start)}</span>
        <span>now</span>
      </div>
      {model.asides.map((a) => (
        <p
          key={a.company}
          style={{ '--x': pct(a.x) } as CSSProperties}
          className="mt-1 text-xs text-muted lg:ml-[var(--x)]"
        >
          {a.company} · alongside{' '}
          {a.present
            ? `since ${formatMonth(a.from)}`
            : `from ${formatMonth(a.from)} to ${formatMonth(a.to - 1)}`}
        </p>
      ))}
    </div>
  );
}
