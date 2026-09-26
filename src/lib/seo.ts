import type { Metadata } from 'next';
import { archiveEntries, archiveEras, caseStudies, profile, recommendations } from '@/content';

const TITLE = `${profile.name} — ${profile.tagline}`;
const DESCRIPTION = profile.valueProp;

// Absolute site URL including the base path. Crawlers require absolute og:image
// URLs, and `metadataBase` alone would drop the /portfolio base path when
// resolving root-relative paths — so build the full URL explicitly.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivekanandba.github.io/portfolio';
// The social card is generated at build by src/app/opengraph-image.tsx — a Next
// file convention, so every route that does not supply its own inherits it and
// Next applies the base path itself. Setting `images` here would override that
// with a hand-made file, which is what this replaced: a static og.png that had
// drifted out of the site's typography and could not be regenerated from
// anything (SPEC-0004 R6).

// metadataBase resolves file-convention images (e.g. the per-case-study
// opengraph-image). Next already prefixes those paths with basePath, so
// metadataBase must be the ORIGIN only — including /portfolio here would
// double it (…/portfolio/portfolio/…). Explicit absolute URLs below
// (canonicals, og.png) are strings and don't depend on this.
const SITE_ORIGIN = new URL(SITE_URL).origin;

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/`,
    types: { 'application/atom+xml': `${SITE_URL}/feed.xml` },
  },
  authors: [{ name: profile.name }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

/** JSON-LD Person structured data for richer search results. */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    email: profile.email,
    jobTitle: profile.currentRole.title,
    worksFor: { '@type': 'Organization', name: profile.currentRole.org },
    address: { '@type': 'PostalAddress', addressLocality: profile.location },
    sameAs: profile.links.map((l) => l.href),
  };
}

/** Metadata for the /work/ case-study index. */
export function workIndexMetadata(): Metadata {
  const title = `Projects — ${profile.name}`;
  const description = `${caseStudies.length} projects across aerospace, healthcare robotics, and AI-native software — problem, constraints, decisions, and measured results.`;
  const url = `${SITE_URL}/work/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, type: 'website', url },
    twitter: { card: 'summary_large_image', title, description },
  };
}

/** Metadata for an era archive page (ADR-0016), e.g. /archive/legend/. */
export function archiveMetadata(era: string): Metadata {
  const meta = archiveEras.find((e) => e.id === era);
  const count = archiveEntries.filter((e) => e.era === era).length;
  const title = `${meta?.title ?? 'Archive'} — ${profile.name}`;
  const description = `${count} items from ${meta?.subject ?? 'the source decks'} — dated or not, each with its source slide and my part in it.`;
  const url = `${SITE_URL}/archive/${era}/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, type: 'website', url },
    twitter: { card: 'summary_large_image', title, description },
  };
}

/** Metadata for the /recommendations/ testimonials index. */
export function recommendationsMetadata(): Metadata {
  const title = `Recommendations — ${profile.name}`;
  const description = `${recommendations.length} recommendations from colleagues, managers, and clients across aerospace, healthcare robotics, and AI-native software — republished verbatim from LinkedIn.`;
  const url = `${SITE_URL}/recommendations/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, type: 'website', url },
    twitter: { card: 'summary_large_image', title, description },
  };
}

/** Per-page metadata for case-study routes — absolute URLs, same reasoning as above.
 *  The per-slug social image comes from the co-located opengraph-image.tsx
 *  (generated statically at build); Next injects it into openGraph + twitter,
 *  so no `images` are set here. */
export function caseStudyMetadata(cs: {
  title: string;
  seoDescription: string;
  slug: string;
}): Metadata {
  const title = `${cs.title} — ${profile.name}`;
  const url = `${SITE_URL}/work/${cs.slug}/`;
  return {
    title,
    description: cs.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: cs.seoDescription,
      type: 'article',
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: cs.seoDescription,
    },
  };
}

/** Metadata for the /writing/ index (ADR-0017). */
export function writingIndexMetadata(count: number): Metadata {
  const title = `Writing — ${profile.name}`;
  const description = `${count} ${count === 1 ? 'post' : 'posts'}: learnings, findings and field notes from the work, dated and in my own words.`;
  const url = `${SITE_URL}/writing/`;
  return {
    title,
    description,
    alternates: { canonical: url, types: { 'application/atom+xml': `${SITE_URL}/feed.xml` } },
    openGraph: { title, description, type: 'website', url },
    twitter: { card: 'summary_large_image', title, description },
  };
}

/** Per-post metadata (ADR-0017). The co-located opengraph-image.tsx supplies the image,
 *  so no `images` are set here (same convention as caseStudyMetadata). */
export function postMetadata(post: {
  slug: string;
  title: string;
  summary: string;
  date: string;
  updated?: string;
  tags: string[];
}): Metadata {
  const title = `${post.title} — ${profile.name}`;
  const url = `${SITE_URL}/writing/${post.slug}/`;
  return {
    title,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.summary,
      type: 'article',
      url,
      publishedTime: `${post.date}T00:00:00Z`,
      modifiedTime: `${post.updated ?? post.date}T00:00:00Z`,
      authors: [profile.name],
      tags: post.tags,
    },
    twitter: { card: 'summary_large_image', title, description: post.summary },
  };
}
