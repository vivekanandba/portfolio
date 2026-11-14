import Link from 'next/link';
import { Section } from './Section';
import { projects, turningPoints } from '@/content';
import { domainColor } from '@/lib/domain';

const projectById = new Map(projects.map((p) => [p.id, p]));

// The intro names the node count in words; it follows the data so adding a
// turning point can never leave the sentence one behind (it did, once).
const COUNT_WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];

/** One labelled line of the decision record. */
function Field({ label, children }: { label: string; children: string }) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr] gap-3">
      <dt className="text-muted text-xs font-semibold tracking-[0.14em] uppercase">{label}</dt>
      <dd className="text-muted text-sm leading-relaxed">{children}</dd>
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
      className="border-hairline border-t"
    >
      <p className="max-w-content text-muted -mt-4 mb-12 text-lg leading-relaxed">
        {COUNT_WORDS[turningPoints.length] ?? turningPoints.length} decisions explain everything on
        this site. Each one is written the way engineers record decisions — what I saw, what I bet,
        what it cost, and what it proved.
      </p>
      <ol className="border-hairline relative space-y-12 border-l pl-8">
        {turningPoints.map((tp) => (
          <li key={`${tp.year}-${tp.title}`} className="relative">
            {/* Node marker on the journey line, in the era's colour. */}
            <span
              aria-hidden="true"
              className={`ring-paper absolute top-1.5 left-[-2.4rem] h-3 w-3 rounded-full ring-4 ${domainColor(tp.domain).bg}`}
            />
            <p className="tabular text-accent text-sm font-medium">{tp.year}</p>
            <h3 className="font-display text-ink mt-1 text-xl font-semibold">{tp.title}</h3>
            <dl className="max-w-content mt-4 space-y-2.5">
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
                    className="text-accent text-sm font-medium no-underline hover:underline"
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
