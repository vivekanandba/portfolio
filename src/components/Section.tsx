import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type SectionProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  /** A full-bleed block above the shell — a band that runs edge to edge. */
  lead?: ReactNode;
};

/** Consistent vertical rhythm + optional labelled heading for every page section. */
export function Section({ id, eyebrow, title, children, className, lead }: SectionProps) {
  const labelId = title ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={labelId} className="w-full">
      {lead}
      <div className={`max-w-shell mx-auto w-full px-6 py-20 sm:py-24 ${className ?? ''}`}>
        {(eyebrow || title) && (
          <Reveal>
            <header className="mb-10">
              {eyebrow && (
                <p className="text-accent mb-2 flex items-center gap-3 text-sm font-medium tracking-[0.18em] uppercase">
                  <span aria-hidden="true" className="bg-accent/60 h-px w-8" />
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2
                  id={labelId}
                  className="font-display text-h2 text-ink lg:text-h2-lg font-semibold"
                >
                  {title}
                </h2>
              )}
            </header>
          </Reveal>
        )}
        <Reveal delay={100}>{children}</Reveal>
      </div>
    </section>
  );
}
