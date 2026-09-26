import { ImageResponse } from 'next/og';
import { profile } from '@/content';
import { sanitizeForCard } from '@/lib/og-text';

// The site-level card, generated at build like the per-project and per-post
// ones (SPEC-0004 R6). It replaces a hand-made public/og.png that had drifted
// out of the site's typography and could not be regenerated from anything.
// No external fonts or assets, so it works offline in CI.

// A non-dynamic route still has to say so under `output: export`, or the build
// refuses to collect it.
export const dynamic = 'force-static';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${profile.name} — ${profile.tagline}`;

const PAPER = '#FAFAF7';
const INK = '#16161A';
const MUTED = '#5B5B66';
const ACCENT = '#1D4ED8';
const HAIRLINE = '#E6E6E0';

export default function Image() {
  const domains = profile.heroDomains.map(sanitizeForCard).join('  ·  ');
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
            {sanitizeForCard(profile.tagline)}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 76,
              lineHeight: 1.05,
              color: INK,
              fontWeight: 700,
              marginTop: 28,
              maxWidth: 980,
            }}
          >
            {sanitizeForCard(profile.name)}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              lineHeight: 1.35,
              color: MUTED,
              marginTop: 24,
              maxWidth: 980,
            }}
          >
            {sanitizeForCard(profile.valueProp)}
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
          <span>{domains}</span>
          <span style={{ color: INK, fontWeight: 600 }}>{sanitizeForCard(profile.location)}</span>
        </div>
      </div>
    ),
    size,
  );
}
