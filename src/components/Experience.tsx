import { Section } from './Section';
import { ProjectCard } from './ProjectCard';
import { featuredProjects, secondaryProjects } from '@/content';

/** Selected Work — featured projects lead with quantified impact; earlier work follows quietly. */
export function Experience() {
  return (
    <Section id="work" eyebrow="Selected Work" title="Zero-to-one products, shipped">
      <div className="grid gap-6 sm:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {secondaryProjects.length > 0 && (
        <div className="mt-14">
          <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-muted">More work</h3>
          <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
            {secondaryProjects.map((project) => (
              <li key={project.id} className="border-t border-hairline py-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="text-sm font-semibold text-ink">{project.title}</h4>
                  <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-muted">
                    {project.org}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted">{project.summary}</p>
                {project.tags.length > 0 && (
                  <p className="mt-2 text-xs text-muted">{project.tags.join(' · ')}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
