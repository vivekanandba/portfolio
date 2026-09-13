import { profile } from '@/content';
import { SITE_URL } from '@/lib/seo';
import { buildFeed, listPosts } from '@/lib/writing';

// Emitted as out/feed.xml by the static export (ADR-0017).
export const dynamic = 'force-static';

export function GET() {
  const xml = buildFeed(listPosts({ includeDrafts: false }), {
    url: SITE_URL,
    title: `${profile.name} — Writing`,
    author: profile.name,
  });
  return new Response(xml, {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
}
