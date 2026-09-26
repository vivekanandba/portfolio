import type { Metadata } from 'next';
import { CaseStudyNav } from '@/components/CaseStudyNav';
import { profile } from '@/content';

// Served by the service worker when a navigation fails (SPEC-0004). Precached
// at install, so it is the one page that is always available. It says what
// happened in plain words and offers the things that are likely already cached.
export const metadata: Metadata = {
  title: `Offline — ${profile.name}`,
  description: 'This page is shown when the site cannot be reached.',
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <>
      <CaseStudyNav />
      <main id="top" className="mx-auto w-full max-w-content px-6 py-24">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">Offline</p>
        <h1 className="mt-2 font-display text-h2 font-semibold text-ink">
          You’re offline, and this page wasn’t saved.
        </h1>
        <p className="mt-4 max-w-content leading-relaxed text-muted">
          Pages you’ve already opened here are kept on your device and will still load. Everything
          else needs a connection. Nothing is lost — try again when you’re back online.
        </p>
        <p className="mt-8 text-sm text-muted">
          <a href="./" className="text-accent underline decoration-accent/40 underline-offset-4">
            Try the front page
          </a>
        </p>
      </main>
    </>
  );
}
