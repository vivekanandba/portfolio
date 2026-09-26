import type { MetadataRoute } from 'next';
import { profile } from '@/content';

// Emitted as out/manifest.webmanifest. Next applies the base path to the icon
// paths for us, which is why they are written root-relative here (SPEC-0004).
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.tagline}`,
    short_name: profile.shortName,
    description: profile.valueProp,
    id: './',
    start_url: './',
    scope: './',
    // `standalone` is what makes an installed copy open as an app rather than a
    // tab. Spec 0004 recorded `browser` as the honest choice for a website;
    // Vivek asked for a PWA on 2026-09-26, and the concern that motivated
    // `browser` — no back button — is met by the nav on every page and the
    // command palette, both of which work inside a standalone window.
    display: 'standalone',
    orientation: 'any',
    // Must agree with the light value in layout.tsx's viewport.themeColor;
    // tests/unit/manifest.test.ts asserts they cannot drift apart.
    background_color: '#FAFAF7',
    theme_color: '#FAFAF7',
    icons: [
      { src: '/icon.png', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      // 192 and 512 are the two sizes an install prompt requires. The maskable
      // one is what Android actually shows: its content sits inside the safe
      // zone so a circular or squircle mask cuts paper, never a letter.
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'Projects', url: './work/', description: 'Every project, by system' },
      { name: 'Writing', url: './writing/', description: 'Learnings in my own words' },
    ],
  };
}
