import Link from 'next/link';
import { PostMeta } from './PostMeta';
import { postsForProject } from '@/lib/writing';

/** "Notes from this project" on a project page — the posts whose frontmatter cites it (ADR-0017). Renders nothing when there are none. */
export function ProjectNotes({ projectId }: { projectId: string }) {
  const posts = postsForProject(projectId);
  if (posts.length === 0) return null;
  return (
    <section aria-label="Notes from this project">
      <h2 className="font-display text-h2 text-ink mb-6 flex items-center gap-3 font-semibold">
        Notes from this project
      </h2>
      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="group max-w-content relative">
            <PostMeta post={p} />
            <h3 className="text-ink mt-1 font-medium">
              <Link
                href={`/writing/${p.slug}/`}
                className="text-ink no-underline group-hover:underline after:absolute after:inset-0"
              >
                {p.title} →
              </Link>
            </h3>
            <p className="text-muted mt-1 text-sm leading-relaxed">{p.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
