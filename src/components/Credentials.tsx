import { Section } from './Section';
import { certifications, education, languages, patents } from '@/content';

/** Certifications grouped by category, preserving the data's newest-first order. */
function certificationGroups() {
  const groups = new Map<string, typeof certifications>();
  for (const c of certifications) {
    groups.set(c.category, [...(groups.get(c.category) ?? []), c]);
  }
  return [...groups.entries()];
}

export function Credentials() {
  return (
    <Section id="credentials" eyebrow="Credibility" title="Patents, certifications & education">
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

        <div className="sm:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-ink">
            Certifications ({certifications.length})
          </h3>
          <dl className="space-y-6">
            {certificationGroups().map(([category, certs]) => (
              <div key={category}>
                <dt className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  {category} · {certs.length}
                </dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {certs.map((c) => (
                      <li key={`${c.name}-${c.authority}`}>
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`${c.authority} · ${c.date}`}
                          aria-label={`${c.name} — ${c.authority}, ${c.date}`}
                          className="inline-block rounded-full border border-hairline bg-card/60 px-3 py-1 text-sm text-muted no-underline transition-colors hover:border-accent/40 hover:text-ink"
                        >
                          {c.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="sm:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-ink">Languages</h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {languages.map((l) => (
              <li key={l.name} className="text-sm">
                <span className="font-medium text-ink">{l.name}</span>{' '}
                <span className="text-muted">· {l.proficiency}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
