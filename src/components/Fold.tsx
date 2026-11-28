import type { ReactNode } from 'react';

type FoldProps = {
  /** What the control opens, in a few words: "Highlights". */
  label: string;
  /** The record it belongs to. Read out with the label, so six controls with
   *  the same visible words are six different controls to a screen reader. */
  name: string;
  children: ReactNode;
};

/**
 * A record's detail behind a native `<details>` (SPEC-0011 R16, ADR-0004 as
 * amended). Native, so it opens before hydration and without JavaScript, and
 * the content is in the served HTML either way. Nothing here moves: the icon
 * swaps, it does not turn.
 */
export function Fold({ label, name, children }: FoldProps) {
  return (
    <details className="fold group mt-3">
      <summary className="border-hairline bg-card/60 text-muted hover:border-accent/40 hover:text-ink inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors">
        <svg
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M1.5 6h9" />
          {/* The upright of the plus; gone once open, which leaves a minus. */}
          <path d="M6 1.5v9" className="group-open:hidden" />
        </svg>
        <span>
          {label}
          <span className="sr-only"> — {name}</span>
        </span>
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}
