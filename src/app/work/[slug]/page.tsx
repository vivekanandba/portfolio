import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CaseStudyNav } from '@/components/CaseStudyNav';
import { MetricBadge } from '@/components/MetricBadge';
import { Reveal } from '@/components/Reveal';
import { diagrams } from '@/components/diagrams';
import { caseStudies } from '@/content';
import { caseStudyMetadata } from '@/lib/seo';

// Static export discipline: every slug is emitted at build time; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  return cs ? caseStudyMetadata(cs) : {};
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-6 flex items-center gap-3 font-display text-h2 font-semibold text-ink">
      {children}
    </h2>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  const Diagram = diagrams[cs.diagramId];

  return (
    <>
      <CaseStudyNav />
      {/* id="top": the layout's skip link targets #top on every page. */}
      <main id="top">
        <article className="mx-auto w-full max-w-shell px-6 pb-24">
          <header className="pt-16 sm:pt-20">
            <p className="mb-4 flex animate-fade-up items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
              {cs.eyebrow}
            </p>
            <h1
              style={{ animationDelay: '80ms' }}
              className="max-w-4xl animate-fade-up font-display text-h2 font-semibold text-ink sm:text-display"
            >
              {cs.title}
            </h1>
            <p
              style={{ animationDelay: '160ms' }}
              className="mt-6 max-w-content animate-fade-up text-lg leading-relaxed text-muted"
            >
              {cs.intro}
            </p>
            <div
              style={{ animationDelay: '240ms' }}
              className="mt-10 flex animate-fade-up flex-wrap gap-x-12 gap-y-6 border-t border-hairline pt-8"
            >
              {cs.metrics.map((m) => (
                <MetricBadge key={m.label} value={m.value} label={m.label} />
              ))}
            </div>
          </header>

          <Reveal className="mt-20">
            <section aria-label="Problem">
              <SectionHeading>The problem</SectionHeading>
              <div className="max-w-content space-y-4">
                {cs.problem.map((p) => (
                  <p key={p} className="leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal className="mt-16">
            <section aria-label="Constraints">
              <SectionHeading>Constraints</SectionHeading>
              <ul className="max-w-content space-y-3">
                {cs.constraints.map((c) => (
                  <li key={c} className="flex gap-3 leading-relaxed text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal className="mt-16">
            <section aria-label="Key decisions and tradeoffs">
              <SectionHeading>Decisions & tradeoffs</SectionHeading>
              <dl className="space-y-8">
                {cs.decisions.map((d) => (
                  <div key={d.decision} className="max-w-content">
                    <dt className="font-medium text-ink">{d.decision}</dt>
                    <dd className="mt-2 border-l-2 border-hairline pl-4 text-sm leading-relaxed text-muted">
                      {d.tradeoff}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </Reveal>

          <Reveal className="mt-16">
            <section aria-label="System diagram">
              <SectionHeading>The system</SectionHeading>
              <Diagram />
            </section>
          </Reveal>

          <Reveal className="mt-16">
            <section aria-label="Results">
              <SectionHeading>Measured results</SectionHeading>
              <div className="flex flex-wrap gap-x-12 gap-y-6">
                {cs.results.map((m) => (
                  <MetricBadge key={m.label} value={m.value} label={m.label} />
                ))}
              </div>
              {cs.resultsNote && (
                <p className="mt-6 max-w-content leading-relaxed text-muted">{cs.resultsNote}</p>
              )}
            </section>
          </Reveal>

          <div className="mt-20 border-t border-hairline pt-8">
            <Link
              href="/#work"
              className="text-sm font-medium text-accent no-underline hover:underline"
            >
              ← Back to all work
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
