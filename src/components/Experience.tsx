import { Section } from './Section';
import { ProjectCard } from './ProjectCard';
import { caseStudyByProjectId, featuredProjects, secondaryProjects } from '@/content';
import { domainColor } from '@/lib/domain';

/** Selected Work — featured projects lead with quantified impact; earlier work follows quietly. */
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
        <div className="mt-14">
          <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-muted">More work</h3>
          <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
            {secondaryProjects.map((project) => (
              <li key={project.id} className="border-t border-hairline py-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="flex items-baseline gap-2 text-sm font-semibold text-ink">
                    <span
                      aria-hidden="true"
                      className={`inline-block h-1.5 w-1.5 shrink-0 self-center rounded-full ${domainColor(project.domain).bg}`}
                    />
                    {project.title}
                  </h4>
                  <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-muted">
                    {project.org}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted">{project.summary}</p>
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
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
