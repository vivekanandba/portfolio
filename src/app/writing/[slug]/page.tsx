import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CaseStudyNav } from '@/components/CaseStudyNav';
import { PostMeta, formatMonth } from '@/components/PostMeta';
import { caseStudies, projects } from '@/content';
import { postMetadata } from '@/lib/seo';
import { getPost, listPosts, renderPost } from '@/lib/writing';

// Static export discipline: every published slug is emitted at build time;
// unknown slugs 404. Drafts are emitted only outside production.
export const dynamicParams = false;

export function generateStaticParams() {
  return listPosts().map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  return post ? postMetadata(post) : {};
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const rendered = renderPost(post);
  // The contents list is the h2s; gate on those, not on every heading.
  const sections = rendered.headings.filter((h) => h.depth === 2);
  const related = post.projects
    .map((id) => ({
      project: projects.find((p) => p.id === id),
      cs: caseStudies.find((c) => c.projectId === id),
    }))
    .filter((r) => r.project && r.cs);

  return (
    <>
      <CaseStudyNav />
      {/* id="top": the layout's skip link targets #top on every page. */}
      <main id="top">
        <article className="max-w-shell mx-auto w-full px-6 pb-24">
          <header className="pt-16 sm:pt-20">
            <div className="animate-fade-up">
              <PostMeta post={post} />
            </div>
            <h1
              style={{ animationDelay: '80ms' }}
              className="animate-fade-up font-display text-h2 text-ink sm:text-display mt-4 max-w-4xl font-semibold"
            >
              {post.title}
            </h1>
            <p
              style={{ animationDelay: '160ms' }}
              className="max-w-content animate-fade-up text-muted mt-6 text-lg leading-relaxed"
            >
              {post.summary}
            </p>
            {post.tags.length > 0 && (
              <ul
                aria-label="Tags"
                style={{ animationDelay: '240ms' }}
                className="animate-fade-up text-muted mt-6 flex flex-wrap gap-2 text-xs"
              >
                {post.tags.map((t) => (
                  <li key={t} className="border-hairline rounded-full border px-3 py-1">
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </header>

          {sections.length > 2 && (
            <nav
              aria-label="In this post"
              className="border-hairline mt-12 border-l-2 pl-4 text-sm"
            >
              <p className="text-ink mb-2 font-medium">In this post</p>
              <ol className="text-muted space-y-1">
                {sections.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="no-underline hover:underline">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Sanitised at build (ADR-0017): raw HTML was dropped by remark-rehype and the
              tree passed rehype-sanitize before stringify. */}
          <div
            className="post-body max-w-content mt-12"
            dangerouslySetInnerHTML={{ __html: rendered.html }}
          />

          {/* ADR-0018: the date above is the work; this is the one small note saying when the
              post was actually written, so a retrospective piece never passes for a contemporaneous
              one without shouting about it. */}
          {post.written && (
            <p className="max-w-content text-muted mt-10 text-xs">
              Written from my notes in{' '}
              <time dateTime={post.written}>{formatMonth(post.written)}</time>, about work done at
              the time this post is dated.
            </p>
          )}

          {related.length > 0 && (
            <section aria-label="From the work" className="border-hairline mt-16 border-t pt-8">
              <h2 className="text-muted text-sm font-medium tracking-[0.18em] uppercase">
                From the work
              </h2>
              <ul className="mt-4 space-y-2">
                {related.map(({ project, cs }) => (
                  <li key={cs!.slug}>
                    <Link
                      href={`/work/${cs!.slug}/`}
                      className="text-ink font-medium no-underline hover:underline"
                    >
                      {project!.title} →
                    </Link>
                    <span className="text-muted text-sm"> · {project!.org}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="border-hairline mt-20 flex flex-wrap gap-x-8 gap-y-2 border-t pt-8">
            <Link
              href="/writing/"
              className="text-accent text-sm font-medium no-underline hover:underline"
            >
              ← All writing
            </Link>
            <Link
              href="/#writing"
              className="text-accent text-sm font-medium no-underline hover:underline"
            >
              ← Back to the portfolio
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
