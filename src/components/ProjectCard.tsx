import Link from 'next/link';
import type { Project } from '@/content/schema';
import { MetricBadge } from './MetricBadge';

/**
 * Prop-driven project card. With a caseStudyHref the whole card becomes a
 * stretched link to the case study; an external href renders independently
 * (kept above the stretched overlay via z-10).
 */
export function ProjectCard({
  project,
  caseStudyHref,
}: {
  project: Project;
  caseStudyHref?: string;
}) {
  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-hairline bg-card/60 p-6 transition duration-300 hover:border-accent/40 hover:shadow-lift motion-safe:hover:-translate-y-1">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
        <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-muted">
          {project.org}
        </span>
      </div>

      <p className="mb-5 text-sm leading-relaxed text-muted">{project.summary}</p>

      {project.metrics.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-x-8 gap-y-3">
          {project.metrics.map((m) => (
            <MetricBadge key={m.label} value={m.value} label={m.label} />
          ))}
        </div>
      )}

      {project.tags.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-hairline px-3 py-1 text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {(caseStudyHref || project.href) && (
        <div className="mt-5 flex items-center gap-5 border-t border-hairline pt-4">
          {caseStudyHref && (
            <Link
              href={caseStudyHref}
              className="text-sm font-medium text-accent no-underline after:absolute after:inset-0 hover:underline"
            >
              Read the case study
              {/* Distinct accessible names per card; the arrow is decorative. */}
              <span className="sr-only">: {project.title}</span>
              <span aria-hidden="true"> →</span>
            </Link>
          )}
          {project.href && project.linkLabel && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 text-sm font-medium text-muted no-underline hover:text-ink"
            >
              {project.linkLabel} ↗
            </a>
          )}
        </div>
      )}
    </article>
  );
}
