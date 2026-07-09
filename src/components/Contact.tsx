import { asset } from '@/lib/asset';
import { profile } from '@/content';

export function Contact() {
  const year = new Date().getFullYear(); // evaluated at build time — site rebuilds on every deploy.
  return (
    <footer id="contact" className="border-t border-hairline">
      <div className="mx-auto w-full max-w-shell px-6 py-20 sm:py-24">
        <p className="mb-2 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-accent">
          <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
          Contact
        </p>
        <h2 className="font-display text-h2 font-semibold text-ink">Let’s build something.</h2>
        <p className="mt-4 max-w-content text-muted">
          Open to senior/staff engineering roles, founding-engineer opportunities, and conversations
          with investors and partners.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-contrast no-underline transition-opacity hover:opacity-90"
          >
            {profile.email}
          </a>
          {profile.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted no-underline hover:text-ink"
            >
              {link.label} ↗
            </a>
          ))}
          <a
            href={asset(profile.resumeFile)}
            className="text-sm font-medium text-muted no-underline hover:text-ink"
          >
            Resume (PDF) ↗
          </a>
        </div>

        <p className="mt-16 text-xs text-muted">
          © {year} {profile.name} · {profile.location}
        </p>
      </div>
    </footer>
  );
}
