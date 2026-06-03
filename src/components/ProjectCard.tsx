import type { Project } from '@/content/schema';
import { MetricBadge } from './MetricBadge';

/** Prop-driven project card. The optional image slot is the future case-study hook. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-hairline bg-white/60 p-6 transition-colors hover:border-accent/40">
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
    </article>
  );
}
