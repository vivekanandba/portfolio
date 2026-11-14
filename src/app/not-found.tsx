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
      <main className="max-w-shell mx-auto w-full px-6 py-20 sm:py-28">
        <p className="text-accent text-sm font-medium tracking-[0.18em] uppercase">404</p>
        <h1 className="font-display text-h2 text-ink mt-2 font-semibold">
          This page doesn’t exist.
        </h1>
        <p className="max-w-content text-muted mt-4 text-lg leading-relaxed">
          I have moved things more than once while building this site — projects got their own
          pages, the writing got a section — so the link you followed may simply predate the move.
          The places people usually want are below.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {PLACES.map((p) => (
            <li
              key={p.href}
              className="group border-hairline bg-card/60 hover:border-accent/40 hover:shadow-lift relative rounded-xl border p-5 transition duration-300 motion-safe:hover:-translate-y-1"
            >
              <Link
                href={p.href}
                className="text-ink font-medium no-underline group-hover:underline after:absolute after:inset-0"
              >
                {p.label} →
              </Link>
              <p className="text-muted mt-1 text-sm">{p.note}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="bg-ink text-paper rounded-full px-6 py-3 text-sm font-medium no-underline transition-opacity hover:opacity-90"
          >
            Back to the portfolio
          </Link>
          <a
            href={asset(profile.resumeFile)}
            className="text-muted hover:text-ink text-sm font-medium no-underline"
          >
            Resume (PDF) ↗
          </a>
          <OpenPaletteButton className="text-muted hover:text-ink inline-flex items-center gap-2 text-sm font-medium">
            Or search the site{' '}
            <kbd className="border-hairline rounded-sm border px-1.5 py-0.5 text-xs">⌘K</kbd>
          </OpenPaletteButton>
        </div>
      </main>
    </>
  );
}
