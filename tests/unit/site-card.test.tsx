import { describe, it, expect, vi } from 'vitest';
import { profile } from '@/content';
import { unsafeGlyphs } from '@/lib/og-text';

// next/og renders with Satori; under Vitest we only need the element tree.
vi.mock('next/og', () => ({
  ImageResponse: class {
    element: unknown;
    options: unknown;
    constructor(element: unknown, options: unknown) {
      this.element = element;
      this.options = options;
    }
  },
}));

/**
 * The site-level social card. It replaced a hand-made public/og.png that had
 * drifted out of the site's typography and could not be regenerated from
 * anything — so what matters here is that it is derived from content and that
 * it only uses glyphs the bundled font can draw (SPEC-0004 R6).
 */
const text = (img: unknown): string => {
  const out: string[] = [];
  const walk = (node: unknown) => {
    if (node == null || node === false) return;
    if (typeof node === 'string' || typeof node === 'number') return void out.push(String(node));
    if (Array.isArray(node)) return node.forEach(walk);
    const children = (node as { props?: { children?: unknown } }).props?.children;
    if (children !== undefined) walk(children);
  };
  walk((img as { element: unknown }).element);
  return out.join(' ');
};

describe('the site social card', () => {
  it('builds at the declared size', async () => {
    const { default: Image, size } = await import('@/app/opengraph-image');
    expect(size).toEqual({ width: 1200, height: 630 });
    expect((Image() as unknown as { options: unknown }).options).toEqual(size);
  });

  it('says who it is, from content', async () => {
    const { default: Image } = await import('@/app/opengraph-image');
    const t = text(Image());
    expect(t).toContain(profile.name);
    expect(t).toContain(profile.location);
    for (const domain of profile.heroDomains) expect(t).toContain(domain);
  });

  it('uses only glyphs the bundled font can draw', async () => {
    const { default: Image } = await import('@/app/opengraph-image');
    expect(unsafeGlyphs(text(Image()))).toEqual([]);
  });

  it('is static, so the export can emit it', async () => {
    const mod = await import('@/app/opengraph-image');
    expect(mod.dynamic).toBe('force-static');
    expect(mod.alt).toContain(profile.name);
  });
});
