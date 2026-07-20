import type { Metadata } from 'next';
import { caseStudies, profile } from '@/content';

const TITLE = `${profile.name} — ${profile.tagline}`;
const DESCRIPTION = profile.valueProp;

// Absolute site URL including the base path. Crawlers require absolute og:image
// URLs, and `metadataBase` alone would drop the /portfolio base path when
// resolving root-relative paths — so build the full URL explicitly.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivekanandba.github.io/portfolio';
const OG_IMAGE = { url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: TITLE };

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
  alternates: { canonical: `${SITE_URL}/` },
  authors: [{ name: profile.name }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: SITE_URL,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
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
  const title = `Case studies — ${profile.name}`;
  const description = `${caseStudies.length} case studies across aerospace, healthcare robotics, and AI-native software — problem, constraints, decisions, and measured results.`;
  const url = `${SITE_URL}/work/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, type: 'website', url, images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE.url] },
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
