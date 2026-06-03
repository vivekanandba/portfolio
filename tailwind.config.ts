import type { Config } from 'tailwindcss';

/**
 * Modern Minimal design tokens.
 * Off-white base, ink text, one restrained accent. Strong typographic hierarchy.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAFAF7', // off-white page background (avoid `base` — collides with text-base font size)
        ink: '#16161A', // primary text
        muted: '#5B5B66', // secondary text
        hairline: '#E6E6E0', // borders / dividers
        accent: {
          DEFAULT: '#1D4ED8', // deep signal blue — used sparingly
          soft: '#EFF3FE', // accent tint for surfaces
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        h2: ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        content: '72ch',
        shell: '64rem',
      },
      fontVariantNumeric: {
        tabular: 'tabular-nums',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
