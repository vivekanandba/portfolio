import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { TourBar } from '@/components/Tours';
import { CommandPalette } from '@/components/CommandPalette';
import { archivePaletteEntries } from '@/lib/palette';
import { postPaletteEntries } from '@/lib/writing';
import { siteMetadata, personJsonLd } from '@/lib/seo';
import { contentSecurityPolicy } from '@/lib/csp';

// GoatCounter (privacy-friendly, no cookies). Emitted only when a site code is
// configured at build time, so dev/test builds stay analytics-free.
const GOATCOUNTER_CODE = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Display serif for headings — the editorial contrast against Inter body text.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz'],
});

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF7' },
    { media: '(prefers-color-scheme: dark)', color: '#131316' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        {/* GitHub Pages cannot set response headers, so the policy ships in the
            document. React 19 hoists these into <head>. What a meta policy
            cannot do — frame-ancestors, X-Content-Type-Options — is recorded in
            specs/0002 rather than faked here. */}
        <meta
          httpEquiv="Content-Security-Policy"
          content={contentSecurityPolicy({ goatCounterCode: GOATCOUNTER_CODE })}
        />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>
        <script
          // Before paint: stamp .js (so scroll-reveal styles only apply when JS
          // runs) and apply any saved theme choice (so manual dark/light wins
          // over the OS media query with no flash). No choice → OS auto.
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')d.dataset.theme=t;}catch(e){}})()",
          }}
        />
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        {children}
        <TourBar />
        <CommandPalette extra={[...archivePaletteEntries(), ...postPaletteEntries()]} />
        <script
          type="application/ld+json"
          // Structured data is static and self-authored — safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        {GOATCOUNTER_CODE && (
          <Script
            data-goatcounter={`https://${GOATCOUNTER_CODE}.goatcounter.com/count`}
            src="https://gc.zgo.at/count.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
