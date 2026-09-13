import Link from 'next/link';
import { Section } from './Section';
import { PostMeta } from './PostMeta';
import { listPosts } from '@/lib/writing';

/**
 * Landing teaser for Writing (ADR-0017): the latest three posts — kind, date,
 * title, summary — and the way to all of them. Server component: it reads the
 * posts from disk at build; never mark this 'use client'.
 */
export function Writing() {
  const posts = listPosts().slice(0, 3);
  return (
    <Section id="writing" eyebrow="Writing" title="Learnings, in my own words">
      <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <PostMeta post={p} />
            <h3 className="mt-2 font-display text-lg font-semibold text-ink">
              <Link href={`/writing/${p.slug}/`} className="text-ink no-underline hover:underline">
                {p.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
          </li>
        ))}
      </ul>
      <p className="mt-10">
        <Link
          href="/writing/"
          className="text-sm font-medium text-accent no-underline hover:underline"
        >
          All writing →
        </Link>
      </p>
    </Section>
  );
}
