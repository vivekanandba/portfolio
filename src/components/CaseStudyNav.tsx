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
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/80 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-shell items-center justify-between px-6 py-4"
      >
        <Link href="/" className="text-sm font-semibold tracking-tight text-ink no-underline">
          {profile.name}
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/work/" className="text-sm text-muted no-underline hover:text-ink">
            All case studies
          </Link>
          <a
            href={asset(profile.resumeFile)}
            className="rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-paper no-underline transition-opacity hover:opacity-90"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
