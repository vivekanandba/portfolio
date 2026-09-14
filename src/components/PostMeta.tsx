import type { Post } from '@/lib/writing';

/** Human labels for the closed set of post kinds (ADR-0017). */
export const KIND_LABELS: Record<Post['kind'], string> = {
  learning: 'Learning',
  finding: 'Finding',
  'field-note': 'Field note',
  note: 'Note',
};

const MONTHS = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return { y, m, d, date: new Date(Date.UTC(y, m - 1, d)) };
};

/** Format YYYY-MM-DD as "September 2026" — the month is all a written-on date needs. */
export function formatMonth(iso: string): string {
  const { y, date } = MONTHS(iso);
  return `${date.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' })} ${y}`;
}

/** Format YYYY-MM-DD as "13 September 2026" without a timezone round-trip. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const month = new Date(Date.UTC(y, m - 1, d)).toLocaleString('en-GB', {
    month: 'long',
    timeZone: 'UTC',
  });
  return `${d} ${month} ${y}`;
}

/** The dated, kind-labelled line above a post title — the same on the index, the post and the landing teaser. */
export function PostMeta({
  post,
}: {
  post: Pick<Post, 'kind' | 'date' | 'written' | 'updated' | 'readingMinutes' | 'draft'>;
}) {
  return (
    <p className="tabular flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.14em] text-muted">
      <span className="text-accent">{KIND_LABELS[post.kind]}</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      {/* ADR-0018: the date is the work; this says when it was actually written. */}
      {post.written && <span>written {formatMonth(post.written)}</span>}
      {post.updated && <span>Updated {formatDate(post.updated)}</span>}
      <span>{post.readingMinutes} min read</span>
      {post.draft && <span className="rounded bg-accent-soft px-1.5 text-accent">Draft</span>}
    </p>
  );
}
