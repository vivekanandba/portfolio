import { Section } from './Section';
import { education, patents } from '@/content';

export function Credentials() {
  return (
    <Section id="credentials" eyebrow="Credibility" title="Patents, achievements & education">
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        <div>
          <h3 className="mb-4 text-sm font-semibold text-ink">
            Patents, Publications & Achievements
          </h3>
          <ul className="space-y-4">
            {patents.map((p) => (
              <li key={p.title}>
                <p className="text-sm font-medium text-ink">
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent"
                    >
                      {p.title} ↗
                    </a>
                  ) : (
                    p.title
                  )}
                </p>
                {p.reference && <p className="tabular text-xs text-muted">{p.reference}</p>}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-ink">Education & Learning</h3>
          <ul className="space-y-4">
            {education.map((e) => (
              <li key={e.credential}>
                <p className="text-sm font-medium text-ink">{e.credential}</p>
                <p className="text-sm text-muted">{e.institution}</p>
                {e.detail && <p className="text-xs text-muted">{e.detail}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
