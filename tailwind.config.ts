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
        domain: {
          aero: 'rgb(var(--c-domain-aero) / <alpha-value>)', // aerospace era markers
          health: 'rgb(var(--c-domain-health) / <alpha-value>)', // healthcare-robotics era markers
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Serif display wants looser tracking than the old sans values.
        display: ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        h2: ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        content: '72ch',
        shell: '64rem',
      },
      boxShadow: {
        lift: '0 12px 32px -16px rgb(var(--c-ink) / 0.25)',
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
