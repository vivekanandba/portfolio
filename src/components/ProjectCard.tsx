import Link from 'next/link';
import type { Project } from '@/content/schema';
import { asset } from '@/lib/asset';
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
    <article className="border-hairline bg-card/60 hover:border-accent/40 hover:shadow-lift relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition duration-300 motion-safe:hover:-translate-y-1">
      {/* Optional artifact banner — the schema `image` slot. Static export
          uses unoptimized <img>; asset() prefixes the GitHub Pages base path. */}
      {project.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(project.image)}
          alt={project.imageAlt ?? `${project.title} — project artifact`}
          className="border-hairline -mx-6 -mt-6 mb-5 h-44 w-[calc(100%+3rem)] max-w-none border-b object-cover object-top"
        />
      )}
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="text-ink text-lg font-semibold">{project.title}</h3>
        <span className="text-muted shrink-0 text-xs font-medium tracking-wide uppercase">
          {project.org}
        </span>
      </div>

      <p className="text-muted mb-5 text-sm leading-relaxed">{project.summary}</p>

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
              className="border-hairline text-muted rounded-full border px-3 py-1 text-xs"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {(caseStudyHref || project.href) && (
        <div className="border-hairline mt-5 flex items-center gap-5 border-t pt-4">
          {caseStudyHref && (
            <Link
              href={caseStudyHref}
              className="text-accent text-sm font-medium no-underline after:absolute after:inset-0 hover:underline"
            >
              Read the full project
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
              className="text-muted hover:text-ink relative z-10 text-sm font-medium no-underline"
            >
              {project.linkLabel} ↗
            </a>
          )}
        </div>
      )}
    </article>
  );
}
