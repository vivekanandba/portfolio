import { Section } from './Section';
import { certifications, now } from '@/content';

/**
 * The current AI/ML pulse (ADR-0012): a dated "exploring now" snapshot plus the
 * three newest certifications, surfaced automatically so fresh learning appears
 * here without anyone editing this section. The month is always rendered — a
 * Now section that hides its age is a lie.
 */
export function Now() {
  const newest = certifications.slice(0, 3);
  return (
    <Section id="now" eyebrow="Current pulse" title="Now">
      <p className="tabular text-muted -mt-4 mb-8 text-sm font-medium">Snapshot: {now.month}</p>
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <div>
          <h3 className="text-ink mb-3 text-sm font-semibold">Exploring</h3>
          <ul className="space-y-2">
            {now.exploring.map((item) => (
              <li key={item} className="text-muted flex gap-3 text-sm leading-relaxed">
                <span
                  aria-hidden="true"
                  className="bg-accent mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                />
                {item}
              </li>
            ))}
          </ul>
          <h3 className="text-ink mt-6 mb-2 text-sm font-semibold">Building</h3>
          <p className="max-w-content text-muted text-sm leading-relaxed">{now.building}</p>
        </div>
        <div>
          <h3 className="text-ink mb-3 text-sm font-semibold">Most recent certifications</h3>
          <ul className="space-y-3">
            {newest.map((c) => (
              <li key={`${c.name}-${c.date}`}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-sm font-medium no-underline hover:underline"
                >
                  {c.name}
                  <span aria-hidden="true"> ↗</span>
                </a>
                <p className="text-muted text-xs">
                  {c.authority} · {c.date}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
