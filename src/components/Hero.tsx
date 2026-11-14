import { asset } from '@/lib/asset';
import { caseStudies, profile } from '@/content';
import { OrgConstellation } from './OrgConstellation';
import { TourButtons } from './Tours';

// The five fields the work spans (rail folded into aerospace/defence so the
// entrepreneurship chapter earns its own slot). Enumerated in the panel so the
// "5 fields" count is self-evident.
const FIELDS = [
  'Aerospace, Defence & Rail',
  'Entrepreneurship',
  'Electronics',
  'Medical Robotics',
  'AI',
];
// The granted patent (Jul 2025). The earlier US20230329668A1 is only the
// pre-grant application publication, so linking it undercut "patent granted".
const PATENT_URL = 'https://patents.google.com/patent/US12343195B2';
// One story-proof per career era (resume-verbatim claims) — each is a narrative,
// not a bare number: zero-to-one speed, regulated-industry rigor, IP, founder grit.
const PROOFS: { value: string; label: string; href?: string }[] = [
  // Scale under a hard real-time budget — the value comes from content so the
  // number has one source of truth (see profile.heroStat).
  { value: profile.heroStat.value, label: 'in production at sub-100ms' },
  { value: 'FDA-cleared', label: 'robotic platform, cloud stack' },
  { value: 'US patent', label: 'vascular-flow imaging', href: PATENT_URL },
  { value: '15,000+ repairs', label: '4.7★ · my own business' },
];

/** Above-the-fold identity: name + positioning claim on the left, a dense track-record panel on the right. */
export function Hero() {
  const years = new Date().getFullYear() - profile.careerStartYear;
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* Decorative backdrop: accent glow + fading hairline grid. */}
      <div aria-hidden="true" className="hero-atmosphere absolute inset-0" />
      <div aria-hidden="true" className="hero-grid absolute inset-0" />

      <div className="max-w-shell relative mx-auto grid w-full gap-x-12 gap-y-10 px-6 pt-20 pb-20 sm:pt-28 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        {/* Left — identity + positioning */}
        <div>
          <p className="animate-fade-up border-hairline bg-card/60 text-muted mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium">
            <span aria-hidden="true" className="bg-accent inline-flex h-2 w-2 rounded-full" />
            {/* Arrow glyphs are visual-only; screen readers get the comma-separated list. */}
            <span aria-hidden="true">{profile.heroDomains.join(' → ')}</span>
            <span className="sr-only">{profile.heroDomains.join(', ')}</span>
          </p>

          <p style={{ animationDelay: '80ms' }} className="animate-fade-up text-muted mb-5 text-sm">
            <span className="font-display text-ink mb-1 block text-2xl font-semibold tracking-tight sm:text-3xl">
              {profile.name}
            </span>
            {profile.currentRole.title} — {profile.currentRole.org}
          </p>

          <h1
            id="hero-heading"
            style={{ animationDelay: '140ms' }}
            className="animate-fade-up font-display text-display text-ink font-semibold"
          >
            Aerospace-grade precision, applied to production AI.
          </h1>

          <p
            style={{ animationDelay: '200ms' }}
            className="max-w-content animate-fade-up text-muted mt-6 text-lg leading-relaxed"
          >
            {profile.valueProp}
          </p>

          <div
            style={{ animationDelay: '280ms' }}
            className="animate-fade-up mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="bg-accent text-accent-contrast rounded-full px-6 py-3 text-sm font-medium no-underline transition-opacity hover:opacity-90"
            >
              View Work
            </a>
            <a
              href={asset(profile.resumeFile)}
              className="border-ink text-ink hover:bg-ink hover:text-paper rounded-full border px-6 py-3 text-sm font-medium no-underline transition-colors"
            >
              Download Resume
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
          </div>

          <TourButtons />
        </div>

        {/* Right — track record. Gradient hairline ring makes the card pop
            without leaving the token system (p-px wrapper = 1px "border"). */}
        <div
          style={{ animationDelay: '360ms' }}
          className="animate-fade-up from-accent/50 via-hairline rounded-2xl bg-linear-to-br to-transparent p-px"
        >
          <div className="bg-card rounded-2xl p-6">
            <p className="text-muted text-xs font-semibold tracking-[0.16em] uppercase">
              Track record
            </p>

            {/* One story-proof per era, 2×2. */}
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5">
              {PROOFS.map((p) =>
                p.href ? (
                  <a
                    key={p.value}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group no-underline"
                  >
                    <Proof value={p.value} label={p.label} link />
                  </a>
                ) : (
                  <Proof key={p.value} value={p.value} label={p.label} />
                ),
              )}
            </div>

            {/* Computed breadth summary. */}
            <p className="tabular border-hairline text-ink mt-6 border-t pt-4 text-sm font-medium">
              {years}+ yrs <span className="text-muted/80">·</span> 5 fields{' '}
              <span className="text-muted/80">·</span> {caseStudies.length} projects
            </p>

            {/* 5 fields — enumerated so the count is self-evident. */}
            <div className="border-hairline mt-4 border-t pt-4">
              <p className="text-muted text-sm leading-relaxed">{FIELDS.join(' · ')}</p>
            </div>
          </div>
        </div>

        {/* Full-width brand constellation under both columns. */}
        <div style={{ animationDelay: '440ms' }} className="animate-fade-up lg:col-span-2">
          <OrgConstellation />
        </div>
      </div>
    </section>
  );
}

function Proof({ value, label, link }: { value: string; label: string; link?: boolean }) {
  return (
    <div>
      <span
        className={`font-display text-ink block text-xl leading-tight font-semibold sm:text-2xl sm:leading-8 ${
          link ? 'group-hover:text-accent' : ''
        }`}
      >
        {value}
      </span>
      <span className={`text-muted text-sm ${link ? 'group-hover:text-ink' : ''}`}>
        {label}
        {link && <span aria-hidden="true"> ↗</span>}
      </span>
    </div>
  );
}
