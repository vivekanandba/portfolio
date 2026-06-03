import type { Metadata } from 'next';
import { profile } from '@/content';

const TITLE = `${profile.name} — ${profile.tagline}`;
const DESCRIPTION = profile.valueProp;

export const siteMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: profile.name }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
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
    jobTitle: profile.tagline,
    address: { '@type': 'PostalAddress', addressLocality: profile.location },
    sameAs: profile.links.map((l) => l.href),
  };
}
