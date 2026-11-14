import Link from 'next/link';
import type { Metadata } from 'next';
import { CaseStudyNav } from '@/components/CaseStudyNav';
import { caseStudies, caseStudyStart, projects } from '@/content';
import { asset } from '@/lib/asset';
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
        <div className="max-w-shell mx-auto w-full px-6 pb-24">
          <header className="pt-16 sm:pt-20">
            <p className="animate-fade-up text-accent mb-4 flex items-center gap-3 text-sm font-medium tracking-[0.18em] uppercase">
              <span aria-hidden="true" className="bg-accent/60 h-px w-8" />
              Selected Work
            </p>
            <h1
              style={{ animationDelay: '80ms' }}
              className="animate-fade-up font-display text-display text-ink font-semibold"
            >
              Projects
            </h1>
            <p
              style={{ animationDelay: '160ms' }}
              className="max-w-content animate-fade-up text-muted mt-6 text-lg leading-relaxed"
            >
              {caseStudies.length} projects across aerospace, healthcare robotics, and AI-native
              software — each told the same way: the problem, the constraints, the decisions and
              their tradeoffs, and what was measured at the end.
            </p>
            <p
              style={{ animationDelay: '200ms' }}
              className="max-w-content animate-fade-up text-muted mt-4 text-sm leading-relaxed"
            >
              Everything the two Legend-era capability decks show — dated or not — is catalogued in{' '}
              <Link href="/archive/legend/" className="text-accent no-underline hover:underline">
                the Legend archive
              </Link>
              .
            </p>
          </header>

          {groups.map((group, gi) => (
            <section
              key={group.org}
              aria-label={group.org}
              style={{ animationDelay: `${240 + gi * 80}ms` }}
              className="animate-fade-up mt-16"
            >
              <h2 className="text-muted text-sm font-medium tracking-[0.18em] uppercase">
                {group.org}
              </h2>
              <ul className="mt-4">
                {group.slugs.map((slug) => {
                  const cs = bySlug.get(slug)!;
                  const project = projectById.get(cs.projectId)!;
                  return (
                    <li key={slug} className="border-hairline flex gap-5 border-t py-5">
                      {/* The project's image as a thumbnail where one exists (SPEC-0007 R10);
                          decorative here — the row's title is the name. */}
                      {project.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={asset(project.image)}
                          alt=""
                          loading="lazy"
                          className="border-hairline h-[72px] w-24 shrink-0 rounded-md border object-cover object-top"
                        />
                      )}
                      <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                        <h3 className="flex min-w-0 items-baseline gap-2.5 text-base font-semibold">
                          {!project.image && (
                            <span
                              aria-hidden="true"
                              className={`inline-block h-1.5 w-1.5 shrink-0 self-center rounded-full ${domainColor(project.domain).bg}`}
                            />
                          )}
                          <Link
                            href={`/work/${cs.slug}/`}
                            className="text-ink no-underline hover:underline"
                          >
                            {cs.title}
                          </Link>
                        </h3>
                        {/* Allowed to shrink and wrap: as shrink-0 this line pushed the page
                            past a phone's width and Chrome zoomed the index out (SPEC-0004 R24). */}
                        <p className="tabular text-muted min-w-0 text-sm">
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

          <div className="border-hairline mt-20 border-t pt-8">
            <Link
              href="/#work"
              className="text-accent text-sm font-medium no-underline hover:underline"
            >
              ← Back to the portfolio
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
