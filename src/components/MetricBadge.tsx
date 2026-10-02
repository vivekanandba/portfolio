'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type MetricBadgeProps = {
  value: string;
  label: string;
};

export type ParsedMetric = {
  prefix: string;
  number: number;
  decimals: number;
  grouped: boolean;
  suffix: string;
};

/**
 * One number, optionally led by a comparison sign and followed by a unit that
 * contains no digits (SPEC-0011 R14). Anything else — a range, a ratio, a
 * date span, a part number — is null, and renders exactly as written.
 */
export function parseMetric(value: string): ParsedMetric | null {
  const m = /^([<>≈~] ?)?(\d{1,3}(?:,\d{3})+|\d+)(\.\d+)?([^\d]*)$/u.exec(value);
  if (!m) return null;
  return {
    prefix: m[1] ?? '',
    number: Number(`${m[2].replace(/,/g, '')}${m[3] ?? ''}`),
    decimals: m[3] ? m[3].length - 1 : 0,
    grouped: m[2].includes(','),
    suffix: m[4],
  };
}

function render(parsed: ParsedMetric, n: number): string {
  const digits = n.toLocaleString('en-US', {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
    useGrouping: parsed.grouped,
  });
  return `${parsed.prefix}${digits}${parsed.suffix}`;
}

const DURATION_MS = 900;

/**
 * A single quantified achievement — the big number does the persuading. It
 * counts up once when it scrolls into view, when it can be read with
 * certainty; the server-rendered text is always the final value, so without
 * JavaScript, under reduced motion, or without an observer nothing moves.
 */
export function MetricBadge({ value, label }: MetricBadgeProps) {
  const parsed = useMemo(() => parseMetric(value), [value]);
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!parsed || !el || typeof IntersectionObserver === 'undefined') return;
    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // Off screen: hold the start of the count, not a flash of the answer.
          setShown(render(parsed, 0));
          return;
        }
        io.disconnect();
        const start = Date.now();
        const step = () => {
          const k = Math.min(1, (Date.now() - start) / DURATION_MS);
          const eased = 1 - (1 - k) ** 3;
          setShown(k < 1 ? render(parsed, parsed.number * eased) : value);
          if (k < 1) timer = setTimeout(step, 16);
        };
        step();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [parsed, value]);

  return (
    <div className="flex flex-col">
      <span ref={ref} className="tabular font-display text-2xl font-semibold text-accent">
        {shown}
      </span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
