import { asset } from '@/lib/asset';
import { profile } from '@/content';

// The five fields the work spans (rail folded into aerospace/defence so the
// entrepreneurship chapter earns its own slot). Enumerated in the panel so the
// "5 fields" count is self-evident.
const FIELDS = [
  'Aerospace, Defence & Rail',
  'Electronics',
  'Entrepreneurship',
  'Medical Robotics',
  'AI',
];
// Marquee organizations, most-recent-first to match the inverted timeline.
const MARQUEE = ['Sanas.ai', 'NovaSignal', 'Pratt & Whitney', 'Safran', 'ISRO'];
const PATENT_URL = 'https://patents.google.com/patent/US20230329668A1';
// Career timeline, latest on top — includes the founder chapter.
const TIMELINE = [
  { org: 'Sanas.ai — zero-to-one AI', year: '2024' },
  { org: 'NovaSignal — FDA-cleared robotics', year: '2020' },
  { org: 'Tech Mahindra — rolling-stock tooling', year: '2019' },
  { org: 'Gadjoy — founder · gadget-repair business', year: '2016' },
  { org: 'Legend — ISRO / Safran / P&W tooling', year: '2013' },
  { org: 'Safran — A350 XWB structures', year: '2011' },
];

/** Above-the-fold identity: name + positioning claim on the left, a dense track-record panel on the right. */
export function Hero() {
  const years = new Date().getFullYear() - profile.careerStartYear;
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* Decorative backdrop: accent glow + fading hairline grid. */}
      <div aria-hidden="true" className="hero-atmosphere absolute inset-0" />
      <div aria-hidden="true" className="hero-grid absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-shell gap-x-12 gap-y-10 px-6 pb-20 pt-20 sm:pt-28 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        {/* Left — identity + positioning */}
        <div>
          <p className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-hairline bg-card/60 px-4 py-1.5 text-xs font-medium text-muted">
            <span aria-hidden="true" className="inline-flex h-2 w-2 rounded-full bg-accent" />
            {/* Arrow glyphs are visual-only; screen readers get the comma-separated list. */}
            <span aria-hidden="true">{profile.heroDomains.join(' → ')}</span>
            <span className="sr-only">{profile.heroDomains.join(', ')}</span>
          </p>

          <p style={{ animationDelay: '80ms' }} className="mb-5 animate-fade-up text-sm text-muted">
            <span className="mb-1 block font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {profile.name}
            </span>
            {profile.currentRole.title} — {profile.currentRole.org}
          </p>

          <h1
            id="hero-heading"
            style={{ animationDelay: '140ms' }}
            className="animate-fade-up font-display text-display font-semibold text-ink"
          >
            Aerospace-grade precision, applied to production AI.
          </h1>

          <p
            style={{ animationDelay: '200ms' }}
            className="mt-6 max-w-content animate-fade-up text-lg leading-relaxed text-muted"
          >
            {profile.valueProp}
          </p>

          <div
            style={{ animationDelay: '280ms' }}
            className="mt-8 flex animate-fade-up flex-wrap items-center gap-4"
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
        </div>

        {/* Right — track record */}
        <div
          style={{ animationDelay: '360ms' }}
          className="animate-fade-up rounded-2xl border border-hairline bg-card/60 p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Track record
          </p>

          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-4">
            <Stat value={`${years}+`} label="years of engineering" />
            <Stat value={profile.heroStat.value} label={profile.heroStat.label} />
            <a
              href={PATENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group no-underline"
            >
              <span className="tabular block font-display text-xl font-semibold text-ink group-hover:text-accent">
                US
              </span>
              <span className="text-sm text-muted group-hover:text-ink">
                patent granted<span aria-hidden="true"> ↗</span>
              </span>
            </a>
          </div>

          {/* 5 fields — enumerated so the count is self-evident. */}
          <div className="mt-6 border-t border-hairline pt-5">
            <p className="text-sm leading-relaxed text-muted">
              <span className="font-display text-base font-semibold text-ink">5 fields</span>{' '}
              <span className="text-muted/80">·</span> {FIELDS.join(' · ')}
            </p>
          </div>

          {/* Marquee organizations. */}
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 border-t border-hairline pt-5 text-sm font-semibold tracking-tight text-ink">
            {MARQUEE.map((name, i) => (
              <li key={name} className="flex items-center gap-x-3">
                {i > 0 && (
                  <span aria-hidden="true" className="text-hairline">
                    ·
                  </span>
                )}
                {name}
              </li>
            ))}
          </ul>

          {/* Career timeline — latest on top. */}
          <ol className="mt-5 border-t border-hairline pt-5">
            {TIMELINE.map((t) => (
              <li key={t.year} className="flex items-baseline gap-3 py-1 text-sm">
                <span className="tabular w-9 shrink-0 font-medium text-accent">
                  ’{t.year.slice(2)}
                </span>
                <span className="text-muted">{t.org}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <span className="tabular block font-display text-xl font-semibold text-ink">{value}</span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
