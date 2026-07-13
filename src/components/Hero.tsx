import { asset } from '@/lib/asset';
import { profile } from '@/content';
import { MetricBadge } from './MetricBadge';

/** Above-the-fold identity + value prop + primary calls to action. */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-name" className="relative overflow-hidden">
      {/* Decorative backdrop: accent glow + fading hairline grid. */}
      <div aria-hidden="true" className="hero-atmosphere absolute inset-0" />
      <div aria-hidden="true" className="hero-grid absolute inset-0" />

      <div className="relative mx-auto w-full max-w-shell px-6 pb-20 pt-20 sm:pt-28">
        <p className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-hairline bg-card/60 px-4 py-1.5 text-xs font-medium text-muted">
          <span aria-hidden="true" className="inline-flex h-2 w-2 rounded-full bg-accent" />
          {/* Arrow glyphs are visual-only; screen readers get the comma-separated list. */}
          <span aria-hidden="true">{profile.heroDomains.join(' → ')}</span>
          <span className="sr-only">{profile.heroDomains.join(', ')}</span>
        </p>

        <p
          style={{ animationDelay: '80ms' }}
          className="mb-4 animate-fade-up text-sm font-medium uppercase tracking-[0.18em] text-accent"
        >
          {profile.tagline}
        </p>
        <h1
          id="hero-name"
          style={{ animationDelay: '140ms' }}
          className="animate-fade-up font-display text-display font-semibold text-ink"
        >
          {profile.name}
        </h1>
        <p
          style={{ animationDelay: '220ms' }}
          className="mt-6 max-w-content animate-fade-up text-lg leading-relaxed text-muted"
        >
          {profile.valueProp}
        </p>

        <div
          style={{ animationDelay: '300ms' }}
          className="mt-10 flex animate-fade-up flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-contrast no-underline transition-opacity hover:opacity-90"
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

        <div
          style={{ animationDelay: '380ms' }}
          className="mt-12 flex animate-fade-up flex-wrap gap-x-12 gap-y-6 border-t border-hairline pt-8"
        >
          {/* Years computed at build time — the site rebuilds on every deploy. */}
          <MetricBadge
            value={`${new Date().getFullYear() - profile.careerStartYear}+`}
            label="years of engineering"
          />
          <MetricBadge value={String(profile.heroDomains.length)} label="domains mastered" />
          <MetricBadge value="US" label="patent granted" />
        </div>
      </div>
    </section>
  );
}
