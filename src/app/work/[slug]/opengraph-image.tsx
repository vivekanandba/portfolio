import { ImageResponse } from 'next/og';
import { caseStudies, projects, profile } from '@/content';
import type { Domain } from '@/content/schema';

// A distinct 1200×630 social card per case study, generated as a static PNG at
// build time (compatible with output: 'export'). Purely typographic — no
// external fonts or assets fetched, so it works offline in CI.

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Case study';

// Emitted for every case-study slug; unknown slugs 404 (mirrors page.tsx).
export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

// Raw hex mirrors the light-scheme palette in globals.css (Satori can't run
// Tailwind classes, so the domain accent is inlined here).
const DOMAIN_HEX: Record<Domain, string> = {
  aerospace: '#B45309',
  'healthcare-robotics': '#0F766E',
  'ai-native': '#1D4ED8',
  entrepreneurial: '#5B5B66',
  community: '#5B5B66',
};
const PAPER = '#FAFAF7';
const INK = '#16161A';
const MUTED = '#5B5B66';
const HAIRLINE = '#E6E6E0';

const projectById = new Map(projects.map((p) => [p.id, p]));

// next/og's bundled font lacks a few math/typographic glyphs and tries (and
// fails, offline) to fetch a dynamic font for them. Swap those for ASCII so the
// generated card is self-contained. The live site keeps the originals.
const sanitize = (s: string) => s.replace(/≈/g, '~');

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  const project = cs ? projectById.get(cs.projectId) : undefined;
  const accent = project?.domain ? DOMAIN_HEX[project.domain] : MUTED;
  const title = sanitize(cs?.title ?? profile.name);
  const eyebrow = sanitize(cs?.eyebrow ?? profile.tagline);
  const metrics = (cs?.metrics.slice(0, 2) ?? []).map((m) => ({
    value: sanitize(m.value),
    label: sanitize(m.label),
  }));

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
          borderLeft: `16px solid ${accent}`,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: accent,
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 68,
              lineHeight: 1.1,
              color: INK,
              fontWeight: 700,
              marginTop: 28,
              maxWidth: 960,
            }}
          >
            {title}
          </div>
        </div>

        {metrics.length > 0 && (
          <div style={{ display: 'flex', gap: 56 }}>
            {metrics.map((m) => (
              <div key={m.label} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 40, color: INK, fontWeight: 700 }}>{m.value}</div>
                <div style={{ fontSize: 22, color: MUTED, marginTop: 4 }}>{m.label}</div>
              </div>
            ))}
          </div>
        )}

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
          <span>{sanitize(profile.tagline)}</span>
        </div>
      </div>
    ),
    size,
  );
}
