import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CaseStudyNav } from '@/components/CaseStudyNav';
import { ClipGrid } from '@/components/ClipGrid';
import { ProjectNotes } from '@/components/ProjectNotes';
import { MetricBadge } from '@/components/MetricBadge';
import { Reveal } from '@/components/Reveal';
import { diagrams } from '@/components/diagrams';
import { archiveEntriesForProject, archiveEras, caseStudies, projects } from '@/content';
import { asset } from '@/lib/asset';
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
    <h2 className="font-display text-h2 text-ink mb-6 flex items-center gap-3 font-semibold">
      {children}
    </h2>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  const Diagram = diagrams[cs.diagramId];
  const project = projects.find((p) => p.id === cs.projectId);
  const inArchive = archiveEntriesForProject(cs.projectId);
  const archiveEra = inArchive.length
    ? archiveEras.find((e) => e.id === inArchive[0].era)
    : undefined;

  return (
    <>
      <CaseStudyNav />
      {/* id="top": the layout's skip link targets #top on every page. */}
      <main id="top">
        <article className="max-w-shell mx-auto w-full px-6 pb-24">
          <header className="pt-16 sm:pt-20">
            <p className="animate-fade-up text-accent mb-4 flex items-center gap-3 text-sm font-medium tracking-[0.18em] uppercase">
              <span aria-hidden="true" className="bg-accent/60 h-px w-8" />
              {cs.eyebrow}
            </p>
            <h1
              style={{ animationDelay: '80ms' }}
              className="animate-fade-up font-display text-h2 text-ink sm:text-display max-w-4xl font-semibold"
            >
              {cs.title}
            </h1>
            <p
              style={{ animationDelay: '160ms' }}
              className="max-w-content animate-fade-up text-muted mt-6 text-lg leading-relaxed"
            >
              {cs.intro}
            </p>
            <div
              style={{ animationDelay: '240ms' }}
              className="animate-fade-up border-hairline mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t pt-8"
            >
              {cs.metrics.map((m) => (
                <MetricBadge key={m.label} value={m.value} label={m.label} />
              ))}
            </div>
          </header>

          {/* Real artifact image (architecture diagram, chart) when the project has one. */}
          {project?.image && (
            <Reveal className="mt-14">
              <figure className="border-hairline bg-card/60 overflow-hidden rounded-xl border">
                <img
                  src={asset(project.image)}
                  alt={project.imageAlt ?? `${cs.title} — project artifact`}
                  loading="lazy"
                  className="w-full"
                />
                {project.imageCredit && (
                  <figcaption className="border-hairline text-muted border-t px-5 py-3 text-xs">
                    {project.imageCredit}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          )}

          <Reveal className="mt-20">
            <section aria-label="Problem">
              <SectionHeading>The problem</SectionHeading>
              <div className="max-w-content space-y-4">
                {cs.problem.map((p) => (
                  <p key={p} className="text-muted leading-relaxed">
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
                  <li key={c} className="text-muted flex gap-3 leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="bg-accent mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
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
                    <dt className="text-ink font-medium">{d.decision}</dt>
                    <dd className="border-hairline text-muted mt-2 border-l-2 pl-4 text-sm leading-relaxed">
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
                <p className="max-w-content text-muted mt-6 leading-relaxed">{cs.resultsNote}</p>
              )}
            </section>
          </Reveal>

          {cs.gallery && cs.gallery.length > 0 && (
            <Reveal className="mt-16">
              <section aria-label="Photos from the work">
                <SectionHeading>From the bench</SectionHeading>
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {cs.gallery.map((g) => (
                    <li
                      key={g.file}
                      className={`border-hairline bg-card/60 overflow-hidden rounded-lg border ${
                        g.wide ? 'col-span-2 sm:col-span-3 lg:col-span-4' : ''
                      }`}
                    >
                      <figure>
                        {/* Opens the original file: gallery items are constrained
                            here, and text-bearing images (annotated cards, spec
                            tables) are unreadable at grid scale without this. */}
                        <a
                          href={asset(g.file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={asset(g.file)}
                            alt={g.alt}
                            loading="lazy"
                            // bg-white is deliberate (not a token slip): wide items are
                            // letterboxed with object-contain, and these annotated cards
                            // have white backgrounds, so white bars blend invisibly in
                            // both themes rather than framing the art with a mismatch.
                            className={
                              g.wide
                                ? 'max-h-96 w-full bg-white object-contain'
                                : g.tall
                                  ? 'h-96 w-full object-contain'
                                  : 'h-56 w-full object-cover'
                            }
                          />
                          <span className="sr-only">— open full size</span>
                        </a>
                        <figcaption className="border-hairline text-muted border-t px-3 py-2 text-[11px] leading-snug">
                          {g.credit ? `${g.credit} ` : ''}
                          <a
                            href={asset(g.file)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent whitespace-nowrap no-underline hover:underline"
                          >
                            View full size<span aria-hidden="true"> ↗</span>
                          </a>
                        </figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          {cs.clips && cs.clips.length > 0 && (
            <Reveal className="mt-16">
              <section aria-label="In motion">
                <SectionHeading>In motion</SectionHeading>
                <p className="max-w-content text-muted mb-6 text-sm leading-relaxed">
                  Short, silent simulation clips. Nothing downloads or plays until you press play.
                </p>
                <ClipGrid clips={cs.clips} />
              </section>
            </Reveal>
          )}

          {cs.docs && cs.docs.length > 0 && (
            <Reveal className="mt-16">
              <section aria-label="Architecture and artifacts">
                <SectionHeading>Architecture & artifacts</SectionHeading>
                <ul className="max-w-content space-y-3">
                  {cs.docs.map((d) => {
                    // Schema guarantees exactly one of href (external) or file (local).
                    const url = d.href ?? asset(d.file!);
                    return (
                      <li key={url}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent text-sm font-medium no-underline hover:underline"
                        >
                          {d.label}
                          <span aria-hidden="true"> ↗</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </Reveal>
          )}

          <Reveal className="mt-16">
            <ProjectNotes projectId={cs.projectId} />
          </Reveal>

          {archiveEra && (
            <Reveal className="mt-16">
              <section aria-label="In the archive">
                <SectionHeading>In the archive</SectionHeading>
                <p className="max-w-content text-muted leading-relaxed">
                  {inArchive.length === 1
                    ? 'One item from the Legend-era decks references this project'
                    : `${inArchive.length} items from the Legend-era decks reference this project`}{' '}
                  — each with its source slide, its date as far as the record goes, and my part in
                  it.
                </p>
                <Link
                  href={`/archive/${archiveEra.id}/`}
                  className="text-accent mt-4 inline-block text-sm font-medium no-underline hover:underline"
                >
                  Browse {archiveEra.title.replace(/^The /, 'the ')} →
                </Link>
              </section>
            </Reveal>
          )}

          <div className="border-hairline mt-20 border-t pt-8">
            <Link
              href="/#work"
              className="text-accent text-sm font-medium no-underline hover:underline"
            >
              ← Back to all work
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
