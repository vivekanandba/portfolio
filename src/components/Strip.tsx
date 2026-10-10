import Link from 'next/link';
import { Reveal } from './Reveal';
import { caseStudies, caseStudyStart, projects, strip } from '@/content';
import { asset } from '@/lib/asset';
import { domainColor } from '@/lib/domain';
import { creditSource, resolveStrip } from '@/lib/strip';

/**
 * Fifteen years in pictures (SPEC-0006 R12): the first thing after the hero.
 * Full bleed — a grid of four at `lg`, a sideways snap-scroll under the thumb
 * below it, with no JavaScript. Every frame links its project page and shows
 * the credit that page shows. Server component.
 */
// Complete literals: Tailwind's scanner cannot see a constructed class name.
const FOCUS = { top: 'object-top', center: 'object-center', bottom: 'object-bottom' } as const;

export function Strip() {
  const frames = resolveStrip(strip, { caseStudies, projects, caseStudyStart });
  return (
    <section
      id="strip"
      aria-labelledby="strip-title"
      className="border-y border-hairline bg-card/40"
    >
      <h2 id="strip-title" className="sr-only">
        Fifteen years in pictures
      </h2>
      <Reveal>
        <ol className="flex snap-x snap-mandatory gap-px overflow-x-auto overscroll-x-contain lg:grid lg:grid-cols-4 lg:overflow-visible">
          {frames.map((f, i) => (
            <li key={f.file} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-auto">
              <Link href={f.href} className="group block no-underline">
                <figure className="overflow-hidden bg-card">
                  <div aria-hidden="true" className={`h-[3px] ${domainColor(f.domain).bg}`} />
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(f.file)}
                      alt={f.alt}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      className={`aspect-[4/3] w-full object-cover transition duration-300 motion-safe:group-hover:scale-[1.02] ${FOCUS[f.focus ?? 'top']}`}
                    />
                    {/* Where it sits (SPEC-0006 R12): the vehicle or machine the artefact
                        serves, as a locator inset — the rocket beside the fixture. */}
                    {f.locator && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={asset(f.locator.file)}
                        alt={f.locator.alt}
                        loading="lazy"
                        data-locator
                        className="absolute left-2 top-2 aspect-[4/3] w-[42%] rounded border-2 border-paper bg-paper object-cover shadow-lift"
                      />
                    )}
                  </div>
                  <figcaption className="px-4 py-3">
                    <p className="text-sm text-ink">
                      <span className="tabular font-medium text-muted">{f.year}</span>
                      <span aria-hidden="true" className="text-muted">
                        {' '}
                        ·{' '}
                      </span>
                      <span className="group-hover:underline">{f.caption}</span>
                    </p>
                    {f.credit && (
                      <p className="mt-1 text-[11px] leading-snug text-muted">
                        {creditSource(f.credit)}
                      </p>
                    )}
                    {f.locator?.credit && (
                      <p className="text-[11px] leading-snug text-muted">
                        Inset: {creditSource(f.locator.credit)}
                      </p>
                    )}
                  </figcaption>
                </figure>
              </Link>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
