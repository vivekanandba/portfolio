import { describe, it, expect } from 'vitest';
import { creditSource, resolveStrip } from '@/lib/strip';

/** The resolver on invented content (SPEC-0006 R12). */
const lookup = {
  caseStudies: [
    {
      slug: 'a',
      projectId: 'a',
      gallery: [
        { file: 'media/a-1.jpg', alt: 'Alt from the gallery', credit: 'Shot. Photo: A Co' },
        {
          file: 'media/commons-a-ctx.jpg',
          alt: 'Where it sits',
          credit: 'Photo: Someone, via Wikimedia Commons, CC BY 4.0',
        },
      ],
    },
    { slug: 'b', projectId: 'b', gallery: [] },
  ],
  projects: [
    { id: 'a', domain: 'aerospace' as const },
    {
      id: 'b',
      domain: 'ai-native' as const,
      image: 'media/b-1.jpg',
      imageAlt: 'Alt from the image',
      imageCredit: 'Image: B Inc.',
    },
  ],
  caseStudyStart: (id: string) => ({ a: 201301, b: 202408 })[id] ?? 0,
};

describe('resolveStrip', () => {
  it('takes alt and credit from the gallery item with the same file', () => {
    const [f] = resolveStrip([{ file: 'media/a-1.jpg', projectId: 'a', caption: 'A' }], lookup);
    expect(f).toMatchObject({
      href: '/work/a/',
      alt: 'Alt from the gallery',
      credit: 'Shot. Photo: A Co',
      year: 2013,
      domain: 'aerospace',
    });
  });

  it('takes them from the project image when that is the file', () => {
    const [f] = resolveStrip([{ file: 'media/b-1.jpg', projectId: 'b', caption: 'B' }], lookup);
    expect(f).toMatchObject({ alt: 'Alt from the image', credit: 'Image: B Inc.', year: 2024 });
  });

  it('fails the build on a file the page does not already show', () => {
    expect(() =>
      resolveStrip([{ file: 'media/a-9.jpg', projectId: 'a', caption: 'X' }], lookup),
    ).toThrow(/not in the gallery or project image/);
    expect(() =>
      resolveStrip([{ file: 'media/z.jpg', projectId: 'z', caption: 'X' }], lookup),
    ).toThrow(/no case study/);
  });

  it('keeps the listed order — aerospace first is a decision, not a date', () => {
    const frames = resolveStrip(
      [
        { file: 'media/b-1.jpg', projectId: 'b', caption: 'B' },
        { file: 'media/a-1.jpg', projectId: 'a', caption: 'A' },
      ],
      lookup,
    );
    expect(frames.map((f) => f.caption)).toEqual(['B', 'A']);
  });
});

describe('context', () => {
  it('resolves the locator inset from the same gallery, alt and credit included', () => {
    const [f] = resolveStrip(
      [
        {
          file: 'media/a-1.jpg',
          projectId: 'a',
          caption: 'A',
          context: { file: 'media/commons-a-ctx.jpg', focus: 'right' },
        },
      ],
      lookup,
    );
    expect(f.locator).toEqual({
      file: 'media/commons-a-ctx.jpg',
      alt: 'Where it sits',
      credit: 'Photo: Someone, via Wikimedia Commons, CC BY 4.0',
      focus: 'right',
    });
  });

  it('refuses a locator the page does not already show', () => {
    expect(() =>
      resolveStrip(
        [
          {
            file: 'media/a-1.jpg',
            projectId: 'a',
            caption: 'A',
            context: { file: 'media/commons-nope.jpg' },
          },
        ],
        lookup,
      ),
    ).toThrow(/not in the gallery/);
  });
});

describe('focus', () => {
  it('passes a frame’s focus through untouched', () => {
    const [f] = resolveStrip(
      [{ file: 'media/a-1.jpg', projectId: 'a', caption: 'A', focus: 'center' }],
      lookup,
    );
    expect(f.focus).toBe('center');
  });
});

describe('creditSource', () => {
  it('keeps the source line of a long credit, and a short credit whole', () => {
    expect(creditSource('The hangar. Role: workplace. Photo: Legend Technologies, slide 81')).toBe(
      'Photo: Legend Technologies, slide 81',
    );
    expect(
      creditSource(
        'Readings captured 4 Aug 2026. Map: Mapshalli AirCare; base map data ©2026 Google.',
      ),
    ).toBe('Map: Mapshalli AirCare; base map data ©2026 Google.');
    expect(creditSource('Courtesy of a friend')).toBe('Courtesy of a friend');
    // Two sources: the tail from the first marker keeps both.
    expect(creditSource('Shot on site. Map: A. Photo: B')).toBe('Map: A. Photo: B');
  });
});
