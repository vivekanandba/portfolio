import { ImageResponse } from 'next/og';
import { profile } from '@/content';
import { KIND_LABELS, formatDate } from '@/components/PostMeta';
import { getPost, listPosts } from '@/lib/writing';
import { sanitizeForCard } from '@/lib/og-text';

// A typographic 1200×630 card per post, generated statically at build (ADR-0017);
// no external fonts or assets, so it works offline in CI — mirrors /work/[slug].

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Writing';

export const dynamicParams = false;
export function generateStaticParams() {
  return listPosts().map((p) => ({ slug: p.slug }));
}

const PAPER = '#FAFAF7';
const INK = '#16161A';
const MUTED = '#5B5B66';
const ACCENT = '#1D4ED8';
const HAIRLINE = '#E6E6E0';
// Shared with the other card route: one substitution table, one test.
// The live site keeps the original glyphs; only the card is sanitised.
const sanitize = sanitizeForCard;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const eyebrow = post ? `${KIND_LABELS[post.kind]} · ${formatDate(post.date)}` : 'Writing';
  const title = sanitize(post?.title ?? profile.name);
  const summary = sanitize(post?.summary ?? profile.tagline);
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: PAPER,
          padding: '72px 80px',
          borderLeft: `16px solid ${ACCENT}`,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: ACCENT,
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 60,
              lineHeight: 1.1,
              color: INK,
              fontWeight: 700,
              marginTop: 28,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              lineHeight: 1.35,
              color: MUTED,
              marginTop: 24,
              maxWidth: 980,
            }}
          >
            {summary}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `2px solid ${HAIRLINE}`,
            paddingTop: 28,
            fontSize: 26,
            color: MUTED,
          }}
        >
          <span style={{ color: INK, fontWeight: 600 }}>{sanitize(profile.name)}</span>
          <span>Writing</span>
        </div>
      </div>
    ),
    size,
  );
}
