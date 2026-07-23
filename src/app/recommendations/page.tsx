import Link from 'next/link';
import type { Metadata } from 'next';
import { CaseStudyNav } from '@/components/CaseStudyNav';
import { recommendations } from '@/content';
import { recommendationsMetadata } from '@/lib/seo';

export const metadata: Metadata = recommendationsMetadata();

/** Attribution line: "Title, Company" (company omitted when unknown). */
function attribution(r: { title: string; company?: string }) {
  return r.company ? `${r.title}, ${r.company}` : r.title;
}

/** Every LinkedIn recommendation, republished verbatim with attribution. */
export default function RecommendationsPage() {
  return (
    <>
      <CaseStudyNav />
      {/* id="top": the layout's skip link targets #top on every page. */}
      <main id="top">
        <div className="mx-auto w-full max-w-content px-6 pb-24">
          <header className="pt-16 sm:pt-20">
            <p className="mb-4 flex animate-fade-up items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
              Testimonials
            </p>
            <h1
              style={{ animationDelay: '80ms' }}
              className="animate-fade-up font-display text-display font-semibold text-ink"
            >
              Recommendations
            </h1>
            <p
              style={{ animationDelay: '160ms' }}
              className="mt-6 animate-fade-up text-lg leading-relaxed text-muted"
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
                className="animate-fade-up border-t border-hairline pt-8"
              >
                <figure>
                  <blockquote className="whitespace-pre-line text-base leading-relaxed text-ink">
                    {r.text}
                  </blockquote>
                  <figcaption className="mt-4">
                    <span className="text-sm font-semibold text-ink">{r.name}</span>
                    <span className="text-sm text-muted"> · {attribution(r)}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <div className="mt-20 border-t border-hairline pt-8">
            <Link
              href="/#recommendations"
              className="text-sm font-medium text-accent no-underline hover:underline"
            >
              ← Back to the portfolio
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
