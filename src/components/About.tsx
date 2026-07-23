import { Section } from './Section';
import { profile } from '@/content';
import { domainColor } from '@/lib/domain';

/** "The Arc" — the rare multidisciplinary throughline, told in ordered beats. */
export function About() {
  return (
    <Section id="about" eyebrow="The Arc" title="From aerospace precision to AI-native products">
      <p className="mb-10 max-w-content text-lg leading-relaxed text-muted">
        A rare full-stack-of-disciplines throughline — aerospace precision, hands-on electronics and
        entrepreneurship, FDA-cleared medical robotics, and now zero-to-one AI as an internal
        technical co-founder — each chapter compounding into how the next was built.
      </p>
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {profile.arc.map((beat, i) => (
          <li key={beat.phase} className="relative">
            <div className="mb-3 flex items-center gap-3">
              <span className={`tabular text-sm font-semibold ${domainColor(beat.domain).text}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                {beat.phase}
              </span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-ink">{beat.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{beat.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
