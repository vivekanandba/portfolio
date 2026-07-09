import { Section } from './Section';
import { skills } from '@/content';

export function Skills() {
  return (
    <Section id="skills" eyebrow="Capabilities" title="Skills across the full stack">
      <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category}>
            <dt className="mb-3 text-sm font-semibold text-ink">{group.category}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-hairline bg-card/60 px-3 py-1 text-sm text-muted transition-colors hover:border-accent/40 hover:text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
