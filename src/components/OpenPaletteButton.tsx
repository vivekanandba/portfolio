'use client';

import type { ReactNode } from 'react';
import { openPalette } from '@/lib/palette';

/** A button that opens the palette, for server-rendered pages that want to offer it (SPEC-0011 R10). */
export function OpenPaletteButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={() => openPalette()} className={className}>
      {children}
    </button>
  );
}
