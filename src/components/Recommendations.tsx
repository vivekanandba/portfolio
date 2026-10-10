import Link from 'next/link';
import { Section } from './Section';
import { ShowMore } from './ShowMore';
import { featuredRecommendations, pullQuote, recommendations } from '@/content';
import { attribution } from '@/lib/recommendation';
import type { Recommendation } from '@/content/schema';

function QuoteCards({ items }: { items: Recommendation[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {items.map((r) => (
        <li
          key={r.name}
          className="flex rounded-xl border border-hairline bg-card/60 p-6 transition duration-300 hover:border-accent/40 hover:shadow-lift motion-safe:hover:-translate-y-1"
        >
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
  // One voice, large (SPEC-0010 R10): the featured entry marked pullQuote, on
  // a full-bleed band above the cards. Verbatim excerpt, as every card is.
  const lead = pullQuote && (
    <div id="pull-quote" className="border-y border-hairline bg-card">
      <figure className="mx-auto w-full max-w-shell px-6 py-16 sm:py-20">
        <blockquote className="max-w-4xl font-display text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl lg:text-4xl">
          “{pullQuote.excerpt}”
        </blockquote>
        <figcaption className="mt-6 text-sm text-muted">
          <span className="font-semibold text-ink">{pullQuote.name}</span> ·{' '}
          {attribution(pullQuote)}
        </figcaption>
      </figure>
    </div>
  );
  return (
    <Section id="recommendations" eyebrow="Testimonials" title="What colleagues say" lead={lead}>
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
