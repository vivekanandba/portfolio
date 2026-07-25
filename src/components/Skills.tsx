import { Section } from './Section';
import { ShowMore } from './ShowMore';
import { skills } from '@/content';

function SkillGroups({ groups }: { groups: typeof skills }) {
  return (
    <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      {groups.map((group) => (
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
  );
}

export function Skills() {
  return (
    <Section id="skills" eyebrow="Capabilities" title="Skills across the full stack">
      <SkillGroups groups={skills.slice(0, 2)} />
      {skills.length > 2 && (
        <ShowMore label={`Show all ${skills.length} skill groups`}>
          <div className="mt-8">
            <SkillGroups groups={skills.slice(2)} />
          </div>
        </ShowMore>
      )}
    </Section>
  );
}
