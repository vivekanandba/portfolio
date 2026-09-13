import { asset } from '@/lib/asset';
import type { CaseStudy } from '@/content/schema';

type Clip = NonNullable<CaseStudy['clips']>[number];

/**
 * Motion evidence (ADR-0014): short, silent simulation clips. Nothing downloads
 * or plays until the reader presses play — `preload="none"`, no autoplay, the
 * browser's own controls — and every clip carries a real poster still from the
 * same source, its accessible name, and (for third-party sources) a credit.
 * A server component: no client JavaScript is involved.
 */
export function ClipGrid({ clips }: { clips: Clip[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {clips.map((c) => (
        <li key={c.file} className="overflow-hidden rounded-lg border border-hairline bg-card/60">
          <figure>
            {/* bg-black is deliberate: letterboxing around portrait simulations
                reads as a video frame, not as a themed surface. */}
            <video
              src={asset(c.file)}
              poster={asset(c.poster)}
              controls
              muted
              playsInline
              preload="none"
              aria-label={c.alt}
              className="aspect-video w-full bg-black object-contain"
            />
            <figcaption className="border-t border-hairline px-3 py-2 text-[11px] leading-snug text-muted">
              {c.caption && <span className="text-ink">{c.caption} </span>}
              {c.credit ? `${c.credit} ` : ''}
              <a
                href={asset(c.file)}
                download
                className="whitespace-nowrap text-accent no-underline hover:underline"
              >
                Download clip<span aria-hidden="true"> ↗</span>
              </a>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
