'use client';

import { useId, useState, type ReactNode } from 'react';

/**
 * Progressive disclosure for landing sections: children stay in the DOM
 * (SEO/static export keep the full content) and are toggled with `hidden`,
 * never conditionally mounted. The button flips between the two labels.
 */
export function ShowMore({
  label,
  hideLabel = 'Show less',
  children,
}: {
  label: string;
  hideLabel?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <>
      <div id={id} hidden={!open}>
        {children}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="mt-6 rounded-full border border-hairline bg-card/60 px-5 py-2 text-sm font-medium text-muted transition-colors hover:border-accent/40 hover:text-ink"
      >
        {open ? hideLabel : label}
        <span aria-hidden="true">{open ? ' ▴' : ' ▾'}</span>
      </button>
    </>
  );
}
