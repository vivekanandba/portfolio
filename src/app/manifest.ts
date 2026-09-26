import type { MetadataRoute } from 'next';
import { profile } from '@/content';

// Emitted as out/manifest.webmanifest. Next applies the base path to the icon
// paths for us, which is why they are written root-relative here (SPEC-0004).
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.tagline}`,
    short_name: profile.name,
    description: profile.valueProp,
    start_url: './',
    display: 'browser',
    // Must agree with the light value in layout.tsx's viewport.themeColor;
    // tests/unit/manifest.test.ts asserts they cannot drift apart.
    background_color: '#FAFAF7',
    theme_color: '#FAFAF7',
    icons: [
      { src: '/icon.png', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
