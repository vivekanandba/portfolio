import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CaseStudyNav } from '@/components/CaseStudyNav';
import { Reveal } from '@/components/Reveal';
import { archiveEntries, archiveEras, archiveExclusions, caseStudies, projects } from '@/content';
import {
  ARCHIVE_CATEGORIES,
  ARCHIVE_ERAS,
  type ArchiveEntry,
  type ArchiveExclusion,
} from '@/content/schema';
import { asset } from '@/lib/asset';
import { archiveMetadata } from '@/lib/seo';

// Static export discipline: every era is emitted at build time; unknown eras 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return ARCHIVE_ERAS.map((era) => ({ era }));
}

type Params = { params: Promise<{ era: string }> };

export async function generateMetadata({ params }: Params) {
  const { era } = await params;
  return archiveEras.some((e) => e.id === era) ? archiveMetadata(era) : {};
}

const CATEGORY_LABELS: Record<(typeof ARCHIVE_CATEGORIES)[number], string> = {
  'turnkey-jigs': 'Turnkey assembly jigs',
  'assembly-tooling': 'Assembly tooling and fixtures',
  'machined-components': 'Machined and turned components',
  'composites-mockups': 'Composites and mockups',
  'slip-rings': 'Slip rings',
  'design-services': 'Design services — ENTI Innovations',
  facilities: 'The factory',
  company: 'The company',
  events: 'Events and network',
};

const ROLE_LABELS: Record<ArchiveEntry['role'], string> = {
  led: 'Role: led',
  designed: 'Role: designed',
  delivered: 'Role: delivered',
  supported: 'Role: supported',
  workplace: 'My workplace',
  'company-before': 'Company programme · before my time',
  'company-undated': 'Company programme · date not recorded',
  'company-after': 'Company · after my time',
};

const DECK_LABELS: Record<ArchiveEntry['sources'][number]['deck'], string> = {
  'legend-company-v5.5': 'Legend deck v5.5',
  'enti-corporate-v1.4-taml': 'ENTI deck v1.4',
};

const RECORDS_URL =
  'https://github.com/vivekanandba/portfolio/blob/main/source/records/legend-programmes.md';
const transcriptUrl = (deck: string, slide: number) =>
  `https://github.com/vivekanandba/portfolio/blob/main/source/decks/${deck}/slides.md#slide-${slide}`;

const CONTEXT_ROLES = new Set<ArchiveEntry['role']>(['company-before', 'company-after']);

function DateBadge({ when }: { when: ArchiveEntry['when'] }) {
  if (when.status === 'known') return <span className="text-ink">{when.label}</span>;
  if (when.status === 'requested')
    return (
      <span>
        Records requested —{' '}
        <a href={RECORDS_URL} className="text-accent no-underline hover:underline">
          my records table
        </a>
      </span>
    );
  return <span>{when.label ? `Date not recorded — ${when.label}` : 'Date not recorded'}</span>;
}

function EntryCard({ entry }: { entry: ArchiveEntry }) {
  const cs = entry.project ? caseStudies.find((c) => c.projectId === entry.project) : undefined;
  const project = entry.project ? projects.find((p) => p.id === entry.project) : undefined;
  return (
    <article className="border-t border-hairline py-8">
      <h3 className="font-display text-xl font-semibold text-ink">{entry.title}</h3>
      {entry.customer && <p className="mt-1 text-sm text-muted">{entry.customer}</p>}
      <ul
        aria-label="Date and role"
        className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted"
      >
        <li>
          <DateBadge when={entry.when} />
        </li>
        <li className="font-medium">{ROLE_LABELS[entry.role]}</li>
      </ul>
      <p className="mt-4 max-w-content leading-relaxed text-muted">{entry.summary}</p>
      {entry.media && entry.media.length > 0 && (
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {entry.media.map((m) => (
            <li key={m.file}>
              <figure className="overflow-hidden rounded-lg border border-hairline bg-card/60">
                <img
                  src={asset(m.file)}
                  alt={m.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                {m.credit && (
                  <figcaption className="px-3 py-2 text-[11px] leading-snug text-muted">
                    {m.credit}
                  </figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
        <span>Sources:</span>
        {entry.sources.flatMap((s) =>
          s.slides.map((n) => (
            <a
              key={`${s.deck}-${n}`}
              href={transcriptUrl(s.deck, n)}
              target="_blank"
              rel="noreferrer"
              className="text-accent no-underline hover:underline"
            >
              {DECK_LABELS[s.deck]} · slide {n} ↗
            </a>
          )),
        )}
        {cs && (
          <Link
            href={`/work/${cs.slug}/`}
            className="font-medium text-ink no-underline hover:underline"
          >
            Project page: {project?.title ?? cs.title} →
          </Link>
        )}
      </p>
    </article>
  );
}

function Exclusions({ rows }: { rows: ArchiveExclusion[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-muted">
            <th scope="col" className="py-2 pr-4 font-medium">
              Deck
            </th>
            <th scope="col" className="py-2 pr-4 font-medium">
              Slide
            </th>
            <th scope="col" className="py-2 font-medium">
              Why it is not here
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((x) => (
            <tr key={`${x.deck}-${x.slide}`} className="border-t border-hairline align-top">
              <td className="py-2 pr-4 text-muted">{DECK_LABELS[x.deck]}</td>
              <td className="tabular py-2 pr-4 text-muted">
                <a
                  href={transcriptUrl(x.deck, x.slide)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent no-underline hover:underline"
                >
                  {x.slide}
                </a>
              </td>
              <td className="py-2 text-muted">{x.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function ArchivePage({ params }: Params) {
  const { era } = await params;
  const meta = archiveEras.find((e) => e.id === era);
  if (!meta) notFound();

  const entries = archiveEntries.filter((e) => e.era === era);
  const exclusions = archiveExclusions.filter((x) => meta.decks.includes(x.deck));
  const context = entries.filter((e) => CONTEXT_ROLES.has(e.role));
  const mine = entries.filter((e) => !CONTEXT_ROLES.has(e.role));
  const slidesCited = new Set(
    entries.flatMap((e) => e.sources.flatMap((s) => s.slides.map((n) => `${s.deck}#${n}`))),
  ).size;
  const requested = entries.filter((e) => e.when.status === 'requested').length;

  return (
    <>
      <CaseStudyNav />
      {/* id="top": the layout's skip link targets #top on every page. */}
      <main id="top">
        <div className="mx-auto w-full max-w-shell px-6 pb-24">
          <header className="pt-16 sm:pt-20">
            <p className="mb-4 flex animate-fade-up items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
              {meta.eyebrow}
            </p>
            <h1
              style={{ animationDelay: '80ms' }}
              className="animate-fade-up font-display text-display font-semibold text-ink"
            >
              {meta.title}
            </h1>
            <p
              style={{ animationDelay: '160ms' }}
              className="mt-6 max-w-content animate-fade-up text-lg leading-relaxed text-muted"
            >
              {meta.intro}
            </p>
            <p
              style={{ animationDelay: '240ms' }}
              className="tabular mt-6 flex animate-fade-up flex-wrap gap-x-6 gap-y-1 border-t border-hairline pt-6 text-sm text-muted"
            >
              <span>{entries.length} entries</span>
              <span>{slidesCited} slides catalogued</span>
              <span>{exclusions.length} slides listed as excluded</span>
              <span>{requested} dates requested from my records</span>
            </p>
          </header>

          {ARCHIVE_CATEGORIES.map((category) => {
            const rows = mine.filter((e) => e.category === category);
            if (rows.length === 0) return null;
            return (
              <Reveal key={category} className="mt-16">
                <section aria-label={CATEGORY_LABELS[category]}>
                  <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-muted">
                    {CATEGORY_LABELS[category]}
                  </h2>
                  <div className="mt-4">
                    {rows.map((e) => (
                      <EntryCard key={e.id} entry={e} />
                    ))}
                  </div>
                </section>
              </Reveal>
            );
          })}

          {context.length > 0 && (
            <Reveal className="mt-16">
              <section aria-label="Company context — before and after my time">
                <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-muted">
                  Company context — before and after my time
                </h2>
                <p className="mt-3 max-w-content text-sm leading-relaxed text-muted">
                  The company’s history and programmes from before January 2013, and what it
                  certified after I left in January 2018. Shown as the standard I worked to and the
                  shop I worked in — not as my work.
                </p>
                <div className="mt-4">
                  {context.map((e) => (
                    <EntryCard key={e.id} entry={e} />
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          <Reveal className="mt-16">
            <section aria-label="What was left out, and why">
              <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-muted">
                What was left out, and why
              </h2>
              <p className="mt-3 max-w-content text-sm leading-relaxed text-muted">
                Every slide of both decks is either a source above or in this table. A test fails
                the build if a slide is neither.
              </p>
              <div className="mt-4">
                <Exclusions rows={exclusions} />
              </div>
            </section>
          </Reveal>

          <div className="mt-20 flex flex-wrap gap-x-8 gap-y-2 border-t border-hairline pt-8">
            <Link
              href="/work/"
              className="text-sm font-medium text-accent no-underline hover:underline"
            >
              ← All projects
            </Link>
            <Link
              href="/#work"
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
