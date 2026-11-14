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
        <div className="max-w-shell mx-auto w-full px-6 pb-24">
          <header className="pt-16 sm:pt-20">
            <p className="animate-fade-up text-accent mb-4 flex items-center gap-3 text-sm font-medium tracking-[0.18em] uppercase">
              <span aria-hidden="true" className="bg-accent/60 h-px w-8" />
              Writing
            </p>
            <h1
              style={{ animationDelay: '80ms' }}
              className="animate-fade-up font-display text-display text-ink font-semibold"
            >
              Learnings, findings, field notes
            </h1>
            <p
              style={{ animationDelay: '160ms' }}
              className="max-w-content animate-fade-up text-muted mt-6 text-lg leading-relaxed"
            >
              What I have learned doing this work, written down project by project. Each note is{' '}
              <strong className="text-ink font-medium">dated to the work it describes</strong> and
              says when I actually wrote it — they are written now, about work done then.{' '}
              <a href="/feed.xml" className="text-accent no-underline hover:underline">
                Atom feed
              </a>
              .
            </p>
          </header>

          <ul className="mt-14">
            {posts.map((p) => (
              <li key={p.slug} className="group border-hairline relative border-t py-7">
                <PostMeta post={p} />
                <h2 className="font-display text-ink mt-2 text-xl font-semibold">
                  <Link
                    href={`/writing/${p.slug}/`}
                    className="text-ink no-underline group-hover:underline after:absolute after:inset-0"
                  >
                    {p.title}
                  </Link>
                </h2>
                <p className="max-w-content text-muted mt-2 leading-relaxed">{p.summary}</p>
              </li>
            ))}
          </ul>

          <div className="border-hairline mt-20 border-t pt-8">
            <Link
              href="/#writing"
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
