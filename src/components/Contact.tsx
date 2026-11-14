import { asset } from '@/lib/asset';
import { profile } from '@/content';

export function Contact() {
  // Evaluated at build time — the site rebuilds on every deploy.
  const year = new Date().getFullYear();
  const built = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  return (
    <footer id="contact" className="border-hairline border-t">
      <div className="max-w-shell mx-auto w-full px-6 py-20 sm:py-24">
        <p className="text-accent mb-2 flex items-center gap-3 text-sm font-medium tracking-[0.18em] uppercase">
          <span aria-hidden="true" className="bg-accent/60 h-px w-8" />
          Contact
        </p>
        <h2 className="font-display text-h2 text-ink font-semibold">Let’s build something.</h2>
        <p className="max-w-content text-muted mt-4">
          Fifteen years of engineering across aerospace, healthcare robotics, and AI-native
          software. If you&rsquo;re building something ambitious, let&rsquo;s talk.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="bg-accent text-accent-contrast rounded-full px-6 py-3 text-sm font-medium no-underline transition-opacity hover:opacity-90"
          >
            {profile.email}
          </a>
          {profile.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-ink text-sm font-medium no-underline"
            >
              {link.label} ↗
            </a>
          ))}
          <a
            href={asset(profile.resumeFile)}
            className="text-muted hover:text-ink text-sm font-medium no-underline"
          >
            Resume (PDF) ↗
          </a>
        </div>

        {/* The page closes with a sentence, not a copyright notice (SPEC-0010 R9). */}
        <p className="max-w-content font-display text-ink mt-16 text-lg leading-relaxed">
          {profile.closingLine}
        </p>

        <p className="text-muted mt-6 text-xs">
          © {year} {profile.name} · {profile.location} · Last updated{' '}
          <span data-testid="built">{built}</span>
        </p>
      </div>
    </footer>
  );
}
