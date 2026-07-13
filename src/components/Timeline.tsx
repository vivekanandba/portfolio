import { Section } from './Section';
import { roles } from '@/content';
import { domainColor } from '@/lib/domain';

export function Timeline() {
  return (
    <Section id="journey" eyebrow="Career" title="The journey">
      <ol className="relative border-l border-hairline">
        {roles.map((role, i) => {
          const domain = domainColor(role.domain);
          return (
            <li key={`${role.company}-${role.period}`} className="ml-6 pb-10 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full border ${domain.border} ${
                  i === 0 ? `${domain.bg} ring-4 ring-accent/15` : 'bg-paper'
                }`}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-base font-semibold text-ink">
                  {role.title} · {role.company}
                </h3>
                <span className="tabular text-sm text-muted">{role.period}</span>
              </div>
              <p
                className={`mt-0.5 text-xs font-medium uppercase tracking-[0.14em] ${domain.text}`}
              >
                {role.track}
                {role.location ? ` · ${role.location}` : ''}
              </p>
              {role.highlights.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {role.highlights.map((h) => (
                    <li key={h} className="text-sm leading-relaxed text-muted">
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
