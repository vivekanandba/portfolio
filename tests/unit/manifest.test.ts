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
    expect(m.description).toBe(profile.valueProp);
  });

  it('uses the short form where a home screen would truncate', () => {
    // An installed icon shows roughly twelve characters. "Vivekanand
    // Balakrishnan" is cut mid-surname, which reads worse than the short form.
    expect(m.short_name).toBe(profile.shortName);
    expect(m.short_name!.length).toBeLessThanOrEqual(14);
    expect(m.name).not.toBe(m.short_name);
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

  it('lists every mark with its real size, including the two an install prompt needs', () => {
    const icons = m.icons ?? [];
    expect(icons.map((i) => i.sizes)).toEqual([
      '32x32',
      '180x180',
      '192x192',
      '512x512',
      '512x512',
    ]);
    for (const icon of icons) {
      expect(icon.type).toBe('image/png');
      // Root-relative: Next applies the base path. A hand-written /portfolio
      // prefix here would double it in the export.
      expect(icon.src.startsWith('/')).toBe(true);
      expect(icon.src).not.toContain('/portfolio');
    }
  });

  it('offers a maskable icon, so an OS mask cuts paper and not a letter', () => {
    const maskable = (m.icons ?? []).filter((i) => i.purpose === 'maskable');
    expect(maskable).toHaveLength(1);
    expect(maskable[0].sizes).toBe('512x512');
    expect(maskable[0].src).toContain('maskable');
  });

  it('installs as an app, with an id and a scope under the base path', () => {
    // Spec 0004 recorded `browser` as the honest choice a week earlier; the
    // reversal is dated in its Not-doing section rather than edited away.
    expect(m.display).toBe('standalone');
    expect(m.id).toBe('./');
    expect(m.scope).toBe('./');
    expect((m.shortcuts ?? []).map((s) => s.url)).toEqual(['./work/', './writing/']);
  });

  it('starts relative, so it works under a base path', () => {
    expect(m.start_url).toBe('./');
  });
});
