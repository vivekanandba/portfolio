import type { MetadataRoute } from 'next';
import { archiveEras, caseStudies } from '@/content';
import { SITE_URL } from '@/lib/seo';
import { listPosts } from '@/lib/writing';

// Every route of the static export, absolute URLs (ADR-0017). Emitted as out/sitemap.xml.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = listPosts({ includeDrafts: false });
  const newest = posts[0]?.updated ?? posts[0]?.date;
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/work/`, changeFrequency: 'monthly', priority: 0.8 },
    ...caseStudies.map((cs) => ({
      url: `${SITE_URL}/work/${cs.slug}/`,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/recommendations/`, changeFrequency: 'yearly', priority: 0.5 },
    ...archiveEras.map((e) => ({
      url: `${SITE_URL}/archive/${e.id}/`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    {
      url: `${SITE_URL}/writing/`,
      changeFrequency: 'weekly',
      priority: 0.8,
      ...(newest ? { lastModified: newest } : {}),
    },
    ...posts.map((p) => ({
      url: `${SITE_URL}/writing/${p.slug}/`,
      lastModified: p.updated ?? p.date,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
