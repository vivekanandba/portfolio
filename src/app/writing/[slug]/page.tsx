import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CaseStudyNav } from '@/components/CaseStudyNav';
import { PostMeta } from '@/components/PostMeta';
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
        <article className="mx-auto w-full max-w-shell px-6 pb-24">
          <header className="pt-16 sm:pt-20">
            <div className="animate-fade-up">
              <PostMeta post={post} />
            </div>
            <h1
              style={{ animationDelay: '80ms' }}
              className="mt-4 max-w-4xl animate-fade-up font-display text-h2 font-semibold text-ink sm:text-display"
            >
              {post.title}
            </h1>
            <p
              style={{ animationDelay: '160ms' }}
              className="mt-6 max-w-content animate-fade-up text-lg leading-relaxed text-muted"
            >
              {post.summary}
            </p>
            {post.tags.length > 0 && (
              <ul
                aria-label="Tags"
                style={{ animationDelay: '240ms' }}
                className="mt-6 flex animate-fade-up flex-wrap gap-2 text-xs text-muted"
              >
                {post.tags.map((t) => (
                  <li key={t} className="rounded-full border border-hairline px-3 py-1">
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </header>

          {sections.length > 2 && (
            <nav
              aria-label="In this post"
              className="mt-12 border-l-2 border-hairline pl-4 text-sm"
            >
              <p className="mb-2 font-medium text-ink">In this post</p>
              <ol className="space-y-1 text-muted">
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
            className="post-body mt-12 max-w-content"
            dangerouslySetInnerHTML={{ __html: rendered.html }}
          />

          {related.length > 0 && (
            <section aria-label="From the work" className="mt-16 border-t border-hairline pt-8">
              <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-muted">
                From the work
              </h2>
              <ul className="mt-4 space-y-2">
                {related.map(({ project, cs }) => (
                  <li key={cs!.slug}>
                    <Link
                      href={`/work/${cs!.slug}/`}
                      className="font-medium text-ink no-underline hover:underline"
                    >
                      {project!.title} →
                    </Link>
                    <span className="text-sm text-muted"> · {project!.org}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-20 flex flex-wrap gap-x-8 gap-y-2 border-t border-hairline pt-8">
            <Link
              href="/writing/"
              className="text-sm font-medium text-accent no-underline hover:underline"
            >
              ← All writing
            </Link>
            <Link
              href="/#writing"
              className="text-sm font-medium text-accent no-underline hover:underline"
            >
              ← Back to the portfolio
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
