import { describe, it, expect, vi } from 'vitest';
import manifest from '@/app/manifest';
import { viewport } from '@/app/layout';
import { profile } from '@/content';

// Importing the layout for its viewport pulls in next/font/google, which the
// Next compiler resolves and Node does not.
vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-sans', className: 'mock-inter' }),
  Fraunces: () => ({ variable: '--font-display', className: 'mock-fraunces' }),
}));

/**
 * The web manifest. Small, but it is the thing that decides what an installed
 * or bookmarked copy of the site is called and what colour its chrome is, and
 * nothing else in the repo would notice if it disagreed with the page.
 */
describe('the web manifest', () => {
  const m = manifest();

  it('names the site from content, not from a second copy of the name', () => {
    expect(m.name).toContain(profile.name);
    expect(m.short_name).toBe(profile.name);
    expect(m.description).toBe(profile.valueProp);
  });

  it('agrees with the page about the theme colour', () => {
    // Two declarations of one fact. A browser reads the manifest for the
    // installed shell and the meta tag for the tab, so a drift here shows up
    // as two different colours on the same site.
    const light = (viewport.themeColor as { media: string; color: string }[]).find((t) =>
      t.media.includes('light'),
    );
    expect(m.theme_color).toBe(light?.color);
    expect(m.background_color).toBe(light?.color);
  });

  it('lists both marks with their real sizes', () => {
    const icons = m.icons ?? [];
    expect(icons.map((i) => i.sizes)).toEqual(['32x32', '180x180']);
    for (const icon of icons) {
      expect(icon.type).toBe('image/png');
      // Root-relative: Next applies the base path. A hand-written /portfolio
      // prefix here would double it in the export.
      expect(icon.src.startsWith('/')).toBe(true);
      expect(icon.src).not.toContain('/portfolio');
    }
  });

  it('starts relative, so it works under a base path', () => {
    expect(m.start_url).toBe('./');
  });
});
