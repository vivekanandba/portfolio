'use client';

import { useEffect, useId, useState, type ReactNode } from 'react';

/**
 * Progressive disclosure for landing sections: children stay in the DOM
 * (SEO/static export keep the full content) and are toggled with `hidden`,
 * never conditionally mounted. Opening grows a grid row from nothing to the
 * content's height (`.disclosure` in globals.css, SPEC-0011 R12); closing is
 * instant, because `hidden` is display:none and the content must leave the
 * accessibility tree at once. While it grows the content is clipped, then the
 * clip comes off so hover shadows can breathe.
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
  const [growing, setGrowing] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!growing) return;
    const t = setTimeout(() => setGrowing(false), 320);
    return () => clearTimeout(t);
  }, [growing]);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) setGrowing(true);
  };

  return (
    <>
      <div id={id} hidden={!open} className="disclosure">
        <div className={growing ? 'overflow-hidden' : undefined}>{children}</div>
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
        className="mt-6 rounded-full border border-hairline bg-card/60 px-5 py-2 text-sm font-medium text-muted transition-colors hover:border-accent/40 hover:text-ink"
      >
        {open ? hideLabel : label}
        <span aria-hidden="true">{open ? ' ▴' : ' ▾'}</span>
      </button>
    </>
  );
}
