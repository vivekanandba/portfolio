import Link from 'next/link';
import type { Metadata } from 'next';
import { CaseStudyNav } from '@/components/CaseStudyNav';
import { recommendations } from '@/content';
import { attribution } from '@/lib/recommendation';
import { recommendationsMetadata } from '@/lib/seo';

export const metadata: Metadata = recommendationsMetadata();

/** Every LinkedIn recommendation, republished verbatim with attribution. */
export default function RecommendationsPage() {
  return (
    <>
      <CaseStudyNav />
      {/* id="top": the layout's skip link targets #top on every page. */}
      <main id="top">
        <div className="max-w-content mx-auto w-full px-6 pb-24">
          <header className="pt-16 sm:pt-20">
            <p className="animate-fade-up text-accent mb-4 flex items-center gap-3 text-sm font-medium tracking-[0.18em] uppercase">
              <span aria-hidden="true" className="bg-accent/60 h-px w-8" />
              Testimonials
            </p>
            <h1
              style={{ animationDelay: '80ms' }}
              className="animate-fade-up font-display text-display text-ink font-semibold"
            >
              Recommendations
            </h1>
            <p
              style={{ animationDelay: '160ms' }}
              className="animate-fade-up text-muted mt-6 text-lg leading-relaxed"
            >
              {recommendations.length} recommendations from colleagues, managers, and clients across
              aerospace, healthcare robotics, and AI-native software — republished verbatim from
              LinkedIn.
            </p>
          </header>

          <ul className="mt-16 space-y-12">
            {recommendations.map((r, i) => (
              <li
                key={r.name}
                style={{ animationDelay: `${240 + Math.min(i, 6) * 60}ms` }}
                className="animate-fade-up border-hairline border-t pt-8"
              >
                <figure>
                  <blockquote className="text-ink text-base leading-relaxed whitespace-pre-line">
                    {r.text}
                  </blockquote>
                  <figcaption className="mt-4">
                    <span className="text-ink text-sm font-semibold">{r.name}</span>
                    <span className="text-muted text-sm"> · {attribution(r)}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <div className="border-hairline mt-20 border-t pt-8">
            <Link
              href="/#recommendations"
              className="text-accent text-sm font-medium no-underline hover:underline"
            >
              ← Back to the portfolio
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
