'use client';

import { useEffect, useState } from 'react';

const foldsIn = (root: HTMLElement | null) =>
  root ? Array.from(root.querySelectorAll<HTMLDetailsElement>('details.fold')) : [];

/**
 * One control for every `Fold` in a section (SPEC-0011 R16). The records open
 * on their own without JavaScript; this is the convenience on top, so it is
 * marked `data-needs-js` and the stylesheet withholds it until the pre-paint
 * script has run. It also does the two things a native `<details>` cannot do
 * for itself: open the record a link points at, and open everything for print.
 */
export function FoldAll({ within, className }: { within: string; className?: string }) {
  const [allOpen, setAllOpen] = useState(false);

  useEffect(() => {
    const root = document.getElementById(within);
    if (!root) return;

    // The label follows the records, not the last click: a reader can open
    // them one at a time and this still has to tell the truth.
    const sync = () => {
      const folds = foldsIn(root);
      setAllOpen(folds.length > 0 && folds.every((d) => d.open));
    };
    // The browser has already scrolled to the target; the record opens below
    // its own heading, so nothing above the reader's eye moves.
    const openTarget = () => {
      const id = window.location.hash.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target || !root.contains(target)) return;
      foldsIn(target).forEach((d) => (d.open = true));
      sync();
    };
    const openAll = () => {
      foldsIn(root).forEach((d) => (d.open = true));
      sync();
    };

    // `toggle` does not bubble, so it is caught on the way down.
    root.addEventListener('toggle', sync, true);
    window.addEventListener('hashchange', openTarget);
    window.addEventListener('beforeprint', openAll);
    openTarget();
    sync();
    return () => {
      root.removeEventListener('toggle', sync, true);
      window.removeEventListener('hashchange', openTarget);
      window.removeEventListener('beforeprint', openAll);
    };
  }, [within]);

  const toggleAll = () => {
    const folds = foldsIn(document.getElementById(within));
    if (folds.length === 0) return;
    const next = !allOpen;
    folds.forEach((d) => (d.open = next));
    setAllOpen(next);
  };

  return (
    <p data-needs-js data-print-hide className={className}>
      <button
        type="button"
        onClick={toggleAll}
        className="border-hairline bg-card/60 text-muted hover:border-accent/40 hover:text-ink min-h-11 rounded-full border px-5 text-sm font-medium transition-colors"
      >
        {allOpen ? 'Close all' : 'Open all'}
      </button>
    </p>
  );
}
