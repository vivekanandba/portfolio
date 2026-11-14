import Link from 'next/link';
import { asset } from '@/lib/asset';
import { profile } from '@/content';

/**
 * Slim header for case-study subpages. The landing Nav is anchor-based
 * (IntersectionObserver over #sections), which is meaningless here — this
 * variant just offers the way back and the resume.
 */
export function CaseStudyNav() {
  return (
    <header className="border-hairline bg-paper/80 sticky top-0 z-50 border-b backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="max-w-shell mx-auto flex items-center justify-between px-6 py-4"
      >
        <Link href="/" className="text-ink text-sm font-semibold tracking-tight no-underline">
          {/* On a phone the surname wrapped onto a second line beside a wrapped
              "All projects", so below `sm` this bar shows the short form
              (SPEC-0004 R16). `hidden` is display:none, so assistive tech hears
              exactly one name. */}
          <span className="sm:hidden">{profile.shortName}</span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/work/" className="text-muted hover:text-ink text-sm no-underline">
            All projects
          </Link>
          {/* At 360px the bar holds the short name, the way back and the button
              with room to spare only without this link; it returns from `sm`.
              The landing bar folds all of its links away below `lg` for the same
              reason (SPEC-0005 R7). */}
          <Link
            href="/writing/"
            className="text-muted hover:text-ink hidden text-sm no-underline sm:inline"
          >
            Writing
          </Link>
          <a
            href={asset(profile.resumeFile)}
            className="bg-ink text-paper rounded-full px-4 py-1.5 text-sm font-medium no-underline transition-opacity hover:opacity-90"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
