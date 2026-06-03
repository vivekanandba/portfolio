import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { siteMetadata, personJsonLd } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          // Structured data is static and self-authored — safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </body>
    </html>
  );
}
