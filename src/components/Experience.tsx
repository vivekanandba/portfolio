import Link from 'next/link';
import { Section } from './Section';
import { ProjectCard } from './ProjectCard';
import {
  caseStudyByProjectId,
  caseStudyStart,
  featuredProjects,
  secondaryProjects,
} from '@/content';
import type { Domain } from '@/content/schema';
import { domainColor } from '@/lib/domain';

// Earlier work is grouped into era chapters by domain so it reads as substantial
// bodies of work rather than an undifferentiated "more work" list.
const DOMAIN_LABELS: Record<Domain, string> = {
  'ai-native': 'AI-Native Software',
  'healthcare-robotics': 'Healthcare Robotics',
  aerospace: 'Aerospace',
  rail: 'Rail',
  community: 'Civic Tech',
  entrepreneurial: 'Entrepreneurial',
};

// Chapters, most-recent-first: each domain's studies sorted by start date, and
// the chapters themselves ordered by their most recent study.
const CHAPTERS = [...new Set(secondaryProjects.map((p) => p.domain))]
  .filter((d): d is Domain => Boolean(d))
  .map((domain) => ({
    domain,
    items: secondaryProjects
      .filter((p) => p.domain === domain)
      .sort((a, b) => caseStudyStart(b.id) - caseStudyStart(a.id)),
  }))
  .sort((a, b) => caseStudyStart(b.items[0].id) - caseStudyStart(a.items[0].id));

/** Selected Work — featured cards span domains up top; earlier work follows as era chapters. */
export function Experience() {
  return (
    <Section id="work" eyebrow="Selected Work" title="Zero-to-one products, shipped">
      <div className="grid gap-6 sm:grid-cols-2">
        {featuredProjects.map((project) => {
          const caseStudy = caseStudyByProjectId.get(project.id);
          return (
            <ProjectCard
              key={project.id}
              project={project}
              caseStudyHref={caseStudy ? `/work/${caseStudy.slug}/` : undefined}
            />
          );
        })}
      </div>

      {secondaryProjects.length > 0 && (
        <div className="mt-16">
          <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-muted">
            More across the arc
          </h3>
          {CHAPTERS.map(({ domain, items }) => (
            <section key={domain} className="mt-8" aria-label={DOMAIN_LABELS[domain]}>
              <h4
                className={`text-xs font-semibold uppercase tracking-[0.14em] ${domainColor(domain).text}`}
              >
                {DOMAIN_LABELS[domain]}
              </h4>
              <ul className="mt-3 grid gap-x-10 sm:grid-cols-2">
                {items.map((project) => {
                  const caseStudy = caseStudyByProjectId.get(project.id);
                  return (
                    <li key={project.id} className="border-t border-hairline py-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <h5 className="flex items-baseline gap-2 text-sm font-semibold text-ink">
                          <span
                            aria-hidden="true"
                            className={`inline-block h-1.5 w-1.5 shrink-0 self-center rounded-full ${domainColor(project.domain).bg}`}
                          />
                          {caseStudy ? (
                            <Link
                              href={`/work/${caseStudy.slug}/`}
                              className="text-ink no-underline hover:underline"
                            >
                              {project.title}
                            </Link>
                          ) : (
                            project.title
                          )}
                        </h5>
                        <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-muted">
                          {project.org}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{project.summary}</p>
                      {project.metrics.length > 0 && (
                        <p className="tabular mt-2 text-xs font-medium text-ink">
                          {project.metrics
                            .slice(0, 2)
                            .map((m) => `${m.value} ${m.label}`)
                            .join('  ·  ')}
                        </p>
                      )}
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                        {project.tags.length > 0 && (
                          <p className="text-xs text-muted">{project.tags.join(' · ')}</p>
                        )}
                        {project.href && project.linkLabel && (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-muted no-underline hover:text-ink"
                          >
                            {project.linkLabel} ↗
                          </a>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
          <p className="mt-10">
            <Link
              href="/work/"
              className="text-sm font-medium text-accent no-underline hover:underline"
            >
              All case studies →
            </Link>
          </p>
        </div>
      )}
    </Section>
  );
}
