import Link from 'next/link';
import type { Metadata } from 'next';
import { CaseStudyNav } from '@/components/CaseStudyNav';
import { PostMeta } from '@/components/PostMeta';
import { listPosts } from '@/lib/writing';
import { writingIndexMetadata } from '@/lib/seo';

// One list for the count and the page, so the two can never disagree (drafts show outside
// production, labelled, and are counted when shown).
const posts = listPosts();
export const metadata: Metadata = writingIndexMetadata(posts.length);

/** Every post, newest first (ADR-0017). Drafts appear only outside production, labelled. */
export default function WritingIndex() {
  return (
    <>
      <CaseStudyNav />
      {/* id="top": the layout's skip link targets #top on every page. */}
      <main id="top">
        <div className="mx-auto w-full max-w-shell px-6 pb-24">
          <header className="pt-16 sm:pt-20">
            <p className="mb-4 flex animate-fade-up items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
              Writing
            </p>
            <h1
              style={{ animationDelay: '80ms' }}
              className="animate-fade-up font-display text-display font-semibold text-ink"
            >
              Learnings, findings, field notes
            </h1>
            <p
              style={{ animationDelay: '160ms' }}
              className="mt-6 max-w-content animate-fade-up text-lg leading-relaxed text-muted"
            >
              What I have learned doing this work, written down project by project. Each note is{' '}
              <strong className="font-medium text-ink">dated to the work it describes</strong> and
              says when I actually wrote it — they are written now, about work done then.{' '}
              <a href="/feed.xml" className="text-accent no-underline hover:underline">
                Atom feed
              </a>
              .
            </p>
          </header>

          <ul className="mt-14">
            {posts.map((p) => (
              <li key={p.slug} className="border-t border-hairline py-7">
                <PostMeta post={p} />
                <h2 className="mt-2 font-display text-xl font-semibold text-ink">
                  <Link
                    href={`/writing/${p.slug}/`}
                    className="text-ink no-underline hover:underline"
                  >
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 max-w-content leading-relaxed text-muted">{p.summary}</p>
              </li>
            ))}
          </ul>

          <div className="mt-20 border-t border-hairline pt-8">
            <Link
              href="/#writing"
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
