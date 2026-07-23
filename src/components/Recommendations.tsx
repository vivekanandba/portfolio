import Link from 'next/link';
import { Section } from './Section';
import { featuredRecommendations, recommendations } from '@/content';
import { attribution } from '@/lib/recommendation';

/**
 * Landing testimonials — the curated set as pulled-quote cards, with a link to
 * the full page. Recommendations are republished verbatim from LinkedIn; the
 * card shows a hand-picked excerpt, the /recommendations page shows each in full.
 */
export function Recommendations() {
  return (
    <Section id="recommendations" eyebrow="Testimonials" title="What colleagues say">
      <ul className="grid gap-6 sm:grid-cols-2">
        {featuredRecommendations.map((r) => (
          <li key={r.name} className="flex rounded-xl border border-hairline bg-card/60 p-6">
            <figure className="flex flex-1 flex-col">
              <blockquote className="flex-1 text-base leading-relaxed text-ink">
                “{r.excerpt}”
              </blockquote>
              <figcaption className="mt-5 border-t border-hairline pt-4">
                <span className="block text-sm font-semibold text-ink">{r.name}</span>
                <span className="block text-sm text-muted">{attribution(r)}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <Link
          href="/recommendations/"
          className="text-sm font-medium text-accent no-underline hover:underline"
        >
          Read all {recommendations.length} recommendations →
        </Link>
      </div>
    </Section>
  );
}
