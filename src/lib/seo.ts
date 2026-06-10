import type { Metadata } from 'next';
import { profile } from '@/content';

const TITLE = `${profile.name} — ${profile.tagline}`;
const DESCRIPTION = profile.valueProp;

// Absolute site URL including the base path. Crawlers require absolute og:image
// URLs, and `metadataBase` alone would drop the /portfolio base path when
// resolving root-relative paths — so build the full URL explicitly.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivekanandba.github.io/portfolio';
const OG_IMAGE = { url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: TITLE };

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
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
    jobTitle: profile.tagline,
    address: { '@type': 'PostalAddress', addressLocality: profile.location },
    sameAs: profile.links.map((l) => l.href),
  };
}
