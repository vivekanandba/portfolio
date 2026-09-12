import Link from 'next/link';
import { Section } from './Section';
import { projects, turningPoints } from '@/content';
import { domainColor } from '@/lib/domain';

const projectById = new Map(projects.map((p) => [p.id, p]));

/** One labelled line of the decision record. */
function Field({ label, children }: { label: string; children: string }) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr] gap-3">
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="text-sm leading-relaxed text-muted">{children}</dd>
    </div>
  );
}

/**
 * The career as decision records (ADR-0011). Each pivot renders as a node on a
 * vertical journey — Saw / Bet / Cost / Proved — in its era's domain colour,
 * anchored to that era's projects so every "proved" claim is one click from
 * its evidence.
 */
export function TurningPoints() {
  return (
    <Section
      id="turning-points"
      eyebrow="The Why"
      title="Turning points"
      className="border-t border-hairline"
    >
      <p className="-mt-4 mb-12 max-w-content text-lg leading-relaxed text-muted">
        Five decisions explain everything on this site. Each one is written the way engineers record
        decisions — what I saw, what I bet, what it cost, and what it proved.
      </p>
      <ol className="relative space-y-12 border-l border-hairline pl-8">
        {turningPoints.map((tp) => (
          <li key={`${tp.year}-${tp.title}`} className="relative">
            {/* Node marker on the journey line, in the era's colour. */}
            <span
              aria-hidden="true"
              className={`absolute -left-[2.4rem] top-1.5 h-3 w-3 rounded-full ring-4 ring-paper ${domainColor(tp.domain).bg}`}
            />
            <p className="tabular text-sm font-medium text-accent">{tp.year}</p>
            <h3 className="mt-1 font-display text-xl font-semibold text-ink">{tp.title}</h3>
            <dl className="mt-4 max-w-content space-y-2.5">
              <Field label="Saw">{tp.saw}</Field>
              <Field label="Bet">{tp.bet}</Field>
              <Field label="Cost">{tp.cost}</Field>
              <Field label="Proved">{tp.proved}</Field>
            </dl>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
              {tp.projects.map((id) => {
                const project = projectById.get(id);
                if (!project) return null;
                return (
                  <Link
                    key={id}
                    href={`/work/${id}/`}
                    className="text-sm font-medium text-accent no-underline hover:underline"
                  >
                    {project.title}
                    <span aria-hidden="true"> →</span>
                  </Link>
                );
              })}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
