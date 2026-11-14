import { Section } from './Section';
import { ShowMore } from './ShowMore';
import { certifications, education, languages, patents } from '@/content';
import { asset } from '@/lib/asset';

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
          <h3 className="text-ink mb-4 text-sm font-semibold">
            Patents, Publications & Achievements
          </h3>
          <ul className="space-y-4">
            {patents.map((p) => (
              <li key={p.title}>
                <p className="text-ink text-sm font-medium">
                  {/* Schema allows at most one of href (external) or file (served from /public). */}
                  {p.href || p.file ? (
                    <a
                      href={p.href ?? asset(p.file!)}
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
                {p.reference && <p className="tabular text-muted text-xs">{p.reference}</p>}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-ink mb-4 text-sm font-semibold">Education & Learning</h3>
          <ul className="space-y-4">
            {education.map((e) => (
              <li key={e.credential}>
                <p className="text-ink text-sm font-medium">{e.credential}</p>
                <p className="text-muted text-sm">{e.institution}</p>
                {e.detail && <p className="text-muted text-xs">{e.detail}</p>}
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2">
          <h3 className="text-ink mb-4 text-sm font-semibold">
            Certifications ({certifications.length})
          </h3>
          <ShowMore
            label={`Browse all ${certifications.length} certifications`}
            hideLabel="Collapse certifications"
          >
            <dl className="space-y-6">
              {certificationGroups().map(([category, certs]) => (
                <div key={category}>
                  <dt className="text-muted mb-2 text-xs font-medium tracking-[0.14em] uppercase">
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
                            className="border-hairline bg-card/60 text-muted hover:border-accent/40 hover:text-ink inline-block rounded-full border px-3 py-1 text-sm no-underline transition-colors"
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
          </ShowMore>
        </div>

        <div className="sm:col-span-2">
          <h3 className="text-ink mb-4 text-sm font-semibold">Languages</h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {languages.map((l) => (
              <li key={l.name} className="text-sm">
                <span className="text-ink font-medium">{l.name}</span>{' '}
                <span className="text-muted">· {l.proficiency}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
