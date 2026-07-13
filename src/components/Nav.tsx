'use client';

import { useEffect, useState } from 'react';
import { asset } from '@/lib/asset';
import { profile } from '@/content';

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#agents', label: 'Agents' },
  { href: '#skills', label: 'Skills' },
  { href: '#journey', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
];

/** Sticky top nav with anchor links + a persistent resume CTA. */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const sections = LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null,
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      // A band around the upper-middle of the viewport decides the active section.
      { rootMargin: '-25% 0px -65% 0px' },
    );
    sections.forEach((s) => io.observe(s));

    // The footer is too short to ever reach the observer band, so a
    // bottom-of-page check owns the Contact highlight.
    const onScroll = () => {
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) setActive('#contact');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/80 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-shell items-center justify-between px-6 py-4"
      >
        <a href="#top" className="text-sm font-semibold tracking-tight text-ink no-underline">
          {profile.name}
        </a>
        <div className="flex items-center gap-4 sm:gap-6">
          <ul className="hidden items-center gap-6 sm:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={active === l.href ? 'location' : undefined}
                  className={`text-sm no-underline transition-colors ${
                    active === l.href ? 'font-medium text-accent' : 'text-muted hover:text-ink'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={asset(profile.resumeFile)}
            className="rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-paper no-underline transition-opacity hover:opacity-90"
          >
            Resume
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="-mr-1 p-1 text-ink sm:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {open ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </>
              ) : (
                <>
                  <line x1="3" y1="5" x2="17" y2="5" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="15" x2="17" y2="15" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>
      {open && (
        <ul
          id="mobile-menu"
          className="space-y-3 border-t border-hairline bg-paper px-6 py-4 sm:hidden"
        >
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-1 text-sm text-muted no-underline hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
