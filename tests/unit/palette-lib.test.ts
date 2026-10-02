import { describe, it, expect, vi } from 'vitest';
import { PALETTE_EVENT, openPalette } from '@/lib/palette';

/** One event opens the palette from anywhere (SPEC-0011 R10). */
describe('openPalette', () => {
  it('dispatches the palette event with the prepared query', () => {
    const seen = vi.fn();
    window.addEventListener(PALETTE_EVENT, seen as EventListener, { once: true });
    openPalette('DICOM');
    expect(seen).toHaveBeenCalledTimes(1);
    expect((seen.mock.calls[0][0] as CustomEvent).detail).toEqual({ query: 'DICOM' });
  });

  it('opens with an empty query when none is prepared', () => {
    const seen = vi.fn();
    window.addEventListener(PALETTE_EVENT, seen as EventListener, { once: true });
    openPalette();
    expect((seen.mock.calls[0][0] as CustomEvent).detail).toEqual({ query: '' });
  });
});
