import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

/** Consistent vertical rhythm + optional labelled heading for every page section. */
export function Section({ id, eyebrow, title, children, className }: SectionProps) {
  const labelId = title ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={labelId}
      className={`mx-auto w-full max-w-shell px-6 py-20 sm:py-24 ${className ?? ''}`}
    >
      {(eyebrow || title) && (
        <header className="mb-10">
          {eyebrow && (
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 id={labelId} className="text-h2 font-semibold text-ink">
              {title}
            </h2>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
