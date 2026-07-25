import Link from 'next/link';
import { Section } from './Section';
import { ShowMore } from './ShowMore';
import { featuredRecommendations, recommendations } from '@/content';
import { attribution } from '@/lib/recommendation';
import type { Recommendation } from '@/content/schema';

function QuoteCards({ items }: { items: Recommendation[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {items.map((r) => (
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
  );
}

/**
 * Landing testimonials — the curated set as pulled-quote cards (first four
 * visible, the rest disclosed), with a link to the full page. Recommendations
 * are republished verbatim from LinkedIn; the card shows a hand-picked
 * excerpt, the /recommendations page shows each in full.
 */
export function Recommendations() {
  return (
    <Section id="recommendations" eyebrow="Testimonials" title="What colleagues say">
      <QuoteCards items={featuredRecommendations.slice(0, 4)} />
      {featuredRecommendations.length > 4 && (
        <ShowMore label={`Show ${featuredRecommendations.length - 4} more testimonials`}>
          <div className="mt-6">
            <QuoteCards items={featuredRecommendations.slice(4)} />
          </div>
        </ShowMore>
      )}
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
