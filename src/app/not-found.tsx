import Link from 'next/link';
import { CaseStudyNav } from '@/components/CaseStudyNav';
import { OpenPaletteButton } from '@/components/OpenPaletteButton';
import { profile } from '@/content';
import { asset } from '@/lib/asset';

// The few places people actually want from a dead link (SPEC-0004 R8).
const PLACES = [
  { href: '/work/', label: 'All projects', note: 'every project, by system' },
  { href: '/writing/', label: 'Writing', note: 'learnings in my own words' },
  { href: '/recommendations/', label: 'Recommendations', note: 'what colleagues wrote, verbatim' },
  { href: '/#about', label: 'The Arc', note: 'fifteen years, drawn' },
];

/** A page of the site, not a dead end: the bar, a line in my voice, the places people want, the palette. */
export default function NotFound() {
  return (
    <>
      <CaseStudyNav />
      <main className="mx-auto w-full max-w-shell px-6 py-20 sm:py-28">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">404</p>
        <h1 className="mt-2 font-display text-h2 font-semibold text-ink">
          This page doesn’t exist.
        </h1>
        <p className="mt-4 max-w-content text-lg leading-relaxed text-muted">
          I have moved things more than once while building this site — projects got their own
          pages, the writing got a section — so the link you followed may simply predate the move.
          Nothing here is lost; it is somewhere below.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {PLACES.map((p) => (
            <li
              key={p.href}
              className="group relative rounded-xl border border-hairline bg-card/60 p-5 transition duration-300 hover:border-accent/40 hover:shadow-lift motion-safe:hover:-translate-y-1"
            >
              <Link
                href={p.href}
                className="font-medium text-ink no-underline after:absolute after:inset-0 group-hover:underline"
              >
                {p.label} →
              </Link>
              <p className="mt-1 text-sm text-muted">{p.note}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper no-underline transition-opacity hover:opacity-90"
          >
            Back to the portfolio
          </Link>
          <a
            href={asset(profile.resumeFile)}
            className="text-sm font-medium text-muted no-underline hover:text-ink"
          >
            Resume (PDF) ↗
          </a>
          <OpenPaletteButton className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink">
            Or search the site{' '}
            <kbd className="rounded border border-hairline px-1.5 py-0.5 text-xs">⌘K</kbd>
          </OpenPaletteButton>
        </div>
      </main>
    </>
  );
}
