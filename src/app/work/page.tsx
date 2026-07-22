import Link from 'next/link';
import type { Metadata } from 'next';
import { CaseStudyNav } from '@/components/CaseStudyNav';
import { caseStudies, caseStudyStart, projects } from '@/content';
import { domainColor } from '@/lib/domain';
import { workIndexMetadata } from '@/lib/seo';

export const metadata: Metadata = workIndexMetadata();

const projectById = new Map(projects.map((p) => [p.id, p]));

/** Index of every case study, grouped by chapter (org), most-recent org and study first. */
export default function WorkIndex() {
  const grouped = new Map<string, string[]>();
  for (const cs of caseStudies) {
    const org = projectById.get(cs.projectId)!.org;
    grouped.set(org, [...(grouped.get(org) ?? []), cs.slug]);
  }
  // Chronological, most-recent-first: sort studies within each org by start
  // date, and order the org groups by their most recent study.
  const groups = [...grouped.entries()]
    .map(([org, slugs]) => ({
      org,
      slugs: [...slugs].sort((a, b) => caseStudyStart(b) - caseStudyStart(a)),
    }))
    .sort((a, b) => caseStudyStart(b.slugs[0]) - caseStudyStart(a.slugs[0]));
  const bySlug = new Map(caseStudies.map((cs) => [cs.slug, cs]));

  return (
    <>
      <CaseStudyNav />
      {/* id="top": the layout's skip link targets #top on every page. */}
      <main id="top">
        <div className="mx-auto w-full max-w-shell px-6 pb-24">
          <header className="pt-16 sm:pt-20">
            <p className="mb-4 flex animate-fade-up items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
              Selected Work
            </p>
            <h1
              style={{ animationDelay: '80ms' }}
              className="animate-fade-up font-display text-display font-semibold text-ink"
            >
              Case studies
            </h1>
            <p
              style={{ animationDelay: '160ms' }}
              className="mt-6 max-w-content animate-fade-up text-lg leading-relaxed text-muted"
            >
              {caseStudies.length} projects across aerospace, healthcare robotics, and AI-native
              software — each told the same way: the problem, the constraints, the decisions and
              their tradeoffs, and what was measured at the end.
            </p>
          </header>

          {groups.map((group, gi) => (
            <section
              key={group.org}
              aria-label={group.org}
              style={{ animationDelay: `${240 + gi * 80}ms` }}
              className="mt-16 animate-fade-up"
            >
              <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-muted">
                {group.org}
              </h2>
              <ul className="mt-4">
                {group.slugs.map((slug) => {
                  const cs = bySlug.get(slug)!;
                  const project = projectById.get(cs.projectId)!;
                  return (
                    <li key={slug} className="border-t border-hairline py-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                        <h3 className="flex items-baseline gap-2.5 text-base font-semibold">
                          <span
                            aria-hidden="true"
                            className={`inline-block h-1.5 w-1.5 shrink-0 self-center rounded-full ${domainColor(project.domain).bg}`}
                          />
                          <Link
                            href={`/work/${cs.slug}/`}
                            className="text-ink no-underline hover:underline"
                          >
                            {cs.title}
                          </Link>
                        </h3>
                        <p className="tabular shrink-0 text-sm text-muted">
                          {cs.metrics
                            .slice(0, 2)
                            .map((m) => `${m.value} ${m.label}`)
                            .join(' · ')}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}

          <div className="mt-20 border-t border-hairline pt-8">
            <Link
              href="/#work"
              className="text-sm font-medium text-accent no-underline hover:underline"
            >
              ← Back to the portfolio
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
