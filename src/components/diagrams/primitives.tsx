import type { ReactNode } from 'react';

/**
 * Building blocks for the annotated systems diagrams. Everything is drawn with
 * the site's color tokens (fill- and stroke- utilities on SVG elements), so
 * dark mode and the domain hues come for free — no external assets, no animation.
 */

export function DiagramBox({
  x,
  y,
  w,
  h,
  label,
  sublabel,
  dashed = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sublabel?: string;
  dashed?: boolean;
}) {
  const cx = x + w / 2;
  const labelY = sublabel ? y + h / 2 - 4 : y + h / 2 + 4;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        strokeWidth={1}
        strokeDasharray={dashed ? '4 3' : undefined}
        className="fill-card stroke-hairline"
      />
      <text x={cx} y={labelY} textAnchor="middle" className="fill-ink text-[12px] font-medium">
        {label}
      </text>
      {sublabel && (
        <text x={cx} y={labelY + 15} textAnchor="middle" className="fill-muted text-[10px]">
          {sublabel}
        </text>
      )}
    </g>
  );
}

/** Straight connector with a small arrowhead at the end point. */
export function DiagramArrow({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 6;
  const left = {
    x: x2 - size * Math.cos(angle - Math.PI / 6),
    y: y2 - size * Math.sin(angle - Math.PI / 6),
  };
  const right = {
    x: x2 - size * Math.cos(angle + Math.PI / 6),
    y: y2 - size * Math.sin(angle + Math.PI / 6),
  };
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={1} className="stroke-muted" />
      <polygon
        points={`${x2},${y2} ${left.x},${left.y} ${right.x},${right.y}`}
        className="fill-muted"
      />
    </g>
  );
}

/** A quiet metric callout — the diagram equivalent of a MetricBadge. */
export function DiagramNote({
  x,
  y,
  text,
  anchor = 'middle',
}: {
  x: number;
  y: number;
  text: string;
  anchor?: 'start' | 'middle' | 'end';
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="fill-accent text-[10px] font-semibold">
      {text}
    </text>
  );
}

/** Accessible SVG shell: fixed viewBox, named for screen readers, scrolls on mobile. */
export function DiagramShell({
  id,
  title,
  desc,
  viewBox,
  children,
}: {
  id: string;
  title: string;
  desc: string;
  viewBox: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-hairline bg-card/40 p-4">
      <svg
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
        viewBox={viewBox}
        className="h-auto w-full min-w-[560px]"
      >
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-desc`}>{desc}</desc>
        {children}
      </svg>
    </div>
  );
}
