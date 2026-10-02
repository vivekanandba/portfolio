'use client';

import { openPalette } from '@/lib/palette';

/**
 * A skill as a button that leads somewhere (SPEC-0011 R13): it opens the
 * palette with the skill typed, so the projects that used it are one keypress
 * away — and the hover the pill always had is now a promise the keyboard can
 * also reach.
 */
export function SkillPill({ item }: { item: string }) {
  return (
    <button
      type="button"
      onClick={() => openPalette(item)}
      title="Find this in my projects"
      className="rounded-full border border-hairline bg-card/60 px-3 py-1 text-sm text-muted transition-colors hover:border-accent/40 hover:text-ink"
    >
      {item}
    </button>
  );
}
