import { asset } from '@/lib/asset';
import { profile } from '@/content';

/** Above-the-fold identity + value prop + primary calls to action. */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-name"
      className="mx-auto w-full max-w-shell px-6 pb-16 pt-20 sm:pt-28"
    >
      <div className="animate-fade-up">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-accent">
          {profile.tagline}
        </p>
        <h1 id="hero-name" className="text-display font-semibold text-ink">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-content text-lg leading-relaxed text-muted">{profile.valueProp}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white no-underline transition-opacity hover:opacity-90"
          >
            View Work
          </a>
          <a
            href={asset(profile.resumeFile)}
            className="rounded-full border border-ink px-6 py-3 text-sm font-medium text-ink no-underline transition-colors hover:bg-ink hover:text-paper"
          >
            Download Resume
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
        </div>
      </div>
    </section>
  );
}
