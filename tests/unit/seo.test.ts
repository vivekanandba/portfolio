import { describe, it, expect } from 'vitest';
import {
  caseStudyMetadata,
  personJsonLd,
  recommendationsMetadata,
  archiveMetadata,
  postMetadata,
  writingIndexMetadata,
  siteMetadata,
  workIndexMetadata,
} from '@/lib/seo';
import { caseStudies, profile, recommendations } from '@/content';

/**
 * Metadata is the least-visible part of the site and the easiest to break
 * silently — a wrong canonical or a doubled base path costs search ranking with
 * no visual symptom. These tests exist because exactly that shipped once: the
 * per-case-study OG image resolved to /portfolio/portfolio/… because
 * `metadataBase` carried the base path Next already adds.
 */
const ORIGIN = 'https://vivekanandba.github.io';
const BASE = `${ORIGIN}/portfolio`;

describe('siteMetadata', () => {
  it('carries the identity fields from profile content', () => {
    expect(siteMetadata.title).toContain(profile.name);
    expect(siteMetadata.title).toContain(profile.tagline);
    expect(siteMetadata.description).toBe(profile.valueProp);
    expect(siteMetadata.authors).toEqual([{ name: profile.name }]);
  });

  it('sets metadataBase to the ORIGIN only — never the base path', () => {
    // Regression lock: Next prefixes file-convention images with basePath
    // itself, so a metadataBase containing /portfolio doubles it.
    const base = siteMetadata.metadataBase!;
    expect(base.origin).toBe(ORIGIN);
    expect(base.pathname).toBe('/');
    expect(base.href).not.toContain('/portfolio');
  });

  it('uses absolute, base-path-aware URLs for canonical and og:image', () => {
    expect(siteMetadata.alternates?.canonical).toBe(`${BASE}/`);
    const og = siteMetadata.openGraph as { url?: string; images?: { url: string }[] };
    expect(og.url).toBe(BASE);
    expect(og.images?.[0].url).toBe(`${BASE}/og.png`);
    // Never doubled.
    expect(og.images?.[0].url).not.toContain('/portfolio/portfolio');
  });

  it('declares a large summary card with the same image', () => {
    const tw = siteMetadata.twitter as { card?: string; images?: string[] };
    expect(tw.card).toBe('summary_large_image');
    expect(tw.images?.[0]).toBe(`${BASE}/og.png`);
  });
});

describe('workIndexMetadata', () => {
  const meta = workIndexMetadata();

  it('canonicalises to the trailing-slash /work/ URL', () => {
    expect(meta.alternates?.canonical).toBe(`${BASE}/work/`);
    expect((meta.openGraph as { url?: string }).url).toBe(`${BASE}/work/`);
  });

  it('counts the projects from content rather than hardcoding', () => {
    expect(meta.description).toContain(String(caseStudies.length));
  });

  it('uses the industry term "projects", not "case studies"', () => {
    expect(meta.title).toMatch(/projects/i);
    expect(`${meta.title} ${meta.description}`).not.toMatch(/case stud/i);
  });
});

describe('recommendationsMetadata', () => {
  const meta = recommendationsMetadata();

  it('canonicalises to /recommendations/ and counts from content', () => {
    expect(meta.alternates?.canonical).toBe(`${BASE}/recommendations/`);
    expect(meta.description).toContain(String(recommendations.length));
  });
});

describe('caseStudyMetadata', () => {
  it('builds a per-slug canonical and defers the image to the file convention', () => {
    const cs = caseStudies[0];
    const meta = caseStudyMetadata(cs);
    expect(meta.title).toContain(cs.title);
    expect(meta.title).toContain(profile.name);
    expect(meta.description).toBe(cs.seoDescription);
    expect(meta.alternates?.canonical).toBe(`${BASE}/work/${cs.slug}/`);
    expect((meta.openGraph as { type?: string }).type).toBe('article');
    // The co-located opengraph-image.tsx supplies the image; setting one here
    // would override the per-slug card with the generic one.
    expect((meta.openGraph as { images?: unknown }).images).toBeUndefined();
    expect((meta.twitter as { images?: unknown }).images).toBeUndefined();
  });

  it('produces a unique canonical for every project', () => {
    const canonicals = caseStudies.map((cs) => caseStudyMetadata(cs).alternates?.canonical);
    expect(new Set(canonicals).size).toBe(caseStudies.length);
  });
});

describe('personJsonLd', () => {
  const ld = personJsonLd();

  it('is a valid schema.org Person wired to profile content', () => {
    expect(ld['@context']).toBe('https://schema.org');
    expect(ld['@type']).toBe('Person');
    expect(ld.name).toBe(profile.name);
    expect(ld.email).toBe(profile.email);
    expect(ld.jobTitle).toBe(profile.currentRole.title);
    expect(ld.worksFor).toEqual({ '@type': 'Organization', name: profile.currentRole.org });
    expect(ld.address).toEqual({
      '@type': 'PostalAddress',
      addressLocality: profile.location,
    });
  });

  it('lists every profile link in sameAs', () => {
    expect(ld.sameAs).toEqual(profile.links.map((l) => l.href));
    expect(ld.sameAs.length).toBeGreaterThan(0);
  });
});

describe('archiveMetadata', () => {
  const meta = archiveMetadata('legend');

  it('canonicalises to /archive/legend/ and counts entries from content', () => {
    expect(meta.alternates?.canonical).toBe(
      'https://vivekanandba.github.io/portfolio/archive/legend/',
    );
    expect(String(meta.title)).toMatch(/archive/i);
    expect(String(meta.description)).toMatch(/\d+ items/);
  });

  it('falls back to generic wording for an era it does not know (never throws at build)', () => {
    const unknown = archiveMetadata('no-such-era');
    expect(String(unknown.title)).toMatch(/^Archive — /);
    expect(String(unknown.description)).toMatch(/^0 items from the source decks/);
    expect(unknown.alternates?.canonical).toBe(
      'https://vivekanandba.github.io/portfolio/archive/no-such-era/',
    );
  });
});

describe('writing metadata (ADR-0017)', () => {
  it('the index canonicalises to /writing/ and advertises the Atom feed', () => {
    const meta = writingIndexMetadata(3);
    expect(meta.alternates?.canonical).toBe('https://vivekanandba.github.io/portfolio/writing/');
    expect(meta.alternates?.types?.['application/atom+xml']).toBe(
      'https://vivekanandba.github.io/portfolio/feed.xml',
    );
    expect(String(meta.description)).toMatch(/^3 posts/);
    expect(String(writingIndexMetadata(1).description)).toMatch(/^1 post:/);
  });

  it('a post is an article with an absolute canonical and times, and defers its image to the file convention', () => {
    const meta = postMetadata({
      slug: 'x',
      title: 'T',
      summary: 'S',
      date: '2026-09-13',
      updated: '2026-09-14',
      tags: ['a'],
    });
    expect(meta.alternates?.canonical).toBe('https://vivekanandba.github.io/portfolio/writing/x/');
    const og = meta.openGraph as {
      type: string;
      publishedTime: string;
      modifiedTime: string;
      images?: unknown;
    };
    expect(og.type).toBe('article');
    expect(og.publishedTime).toBe('2026-09-13T00:00:00Z');
    expect(og.modifiedTime).toBe('2026-09-14T00:00:00Z');
    expect(og.images).toBeUndefined();
  });

  it('the site advertises the feed', () => {
    expect(siteMetadata.alternates?.types?.['application/atom+xml']).toBe(
      'https://vivekanandba.github.io/portfolio/feed.xml',
    );
  });
});
