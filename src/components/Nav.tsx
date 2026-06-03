import { asset } from '@/lib/asset';
import { profile } from '@/content';

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#journey', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
];

/** Sticky top nav with anchor links + a persistent resume CTA. */
export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/80 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-shell items-center justify-between px-6 py-4"
      >
        <a href="#top" className="text-sm font-semibold tracking-tight text-ink no-underline">
          {profile.name}
        </a>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 sm:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-muted no-underline hover:text-ink">
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
        </div>
      </nav>
    </header>
  );
}
