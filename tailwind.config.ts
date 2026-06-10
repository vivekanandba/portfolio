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
        // Values are CSS variables (space-separated RGB channels in globals.css)
        // so dark mode swaps the palette without touching components, and
        // opacity modifiers like bg-paper/80 keep working via <alpha-value>.
        paper: 'rgb(var(--c-paper) / <alpha-value>)', // page background (avoid `base` — collides with text-base font size)
        ink: 'rgb(var(--c-ink) / <alpha-value>)', // primary text
        muted: 'rgb(var(--c-muted) / <alpha-value>)', // secondary text
        hairline: 'rgb(var(--c-hairline) / <alpha-value>)', // borders / dividers
        card: 'rgb(var(--c-card) / <alpha-value>)', // card surfaces (was white)
        accent: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)', // signal blue — used sparingly
          soft: 'rgb(var(--c-accent-soft) / <alpha-value>)', // accent tint for surfaces
          contrast: 'rgb(var(--c-accent-contrast) / <alpha-value>)', // text on accent buttons
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
