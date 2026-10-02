import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';
import { profile } from '@/content';
import { PALETTE_EVENT } from '@/lib/palette';

/** The 404 is a page of the site, not a dead end (SPEC-0004 R8). */
describe('the 404 page', () => {
  it('keeps the navigation bar and the heading the smoke test looks for', () => {
    render(<NotFound />);
    expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/doesn’t exist/);
  });

  it('speaks in my voice and offers the places people actually want', () => {
    render(<NotFound />);
    expect(screen.getByText(/\bI\b/)).toBeInTheDocument();
    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href') ?? '');
    for (const want of [/^\/work\/?$/, /^\/writing\/?$/, /^\/recommendations\/?$/]) {
      expect(
        hrefs.some((h) => want.test(h)),
        `a link matching ${want}`,
      ).toBe(true);
    }
    expect(hrefs.some((h) => h.includes(profile.resumeFile))).toBe(true);
  });

  it('offers the palette, through the one event that opens it', () => {
    const seen = vi.fn();
    window.addEventListener(PALETTE_EVENT, seen as EventListener, { once: true });
    render(<NotFound />);
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(seen).toHaveBeenCalledTimes(1);
  });
});
