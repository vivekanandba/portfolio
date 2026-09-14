import { readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import type { Element, Root } from 'hast';
import { toString as hastToString } from 'hast-util-to-string';
import rehypeSanitize, { defaultSchema, type Options as SanitizeSchema } from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { parse as parseYaml } from 'yaml';
import { projects } from '@/content';
import type { PaletteEntry } from '@/lib/palette';
import { type PostFrontmatter, postFrontmatterSchema } from '@/content/schema';

/**
 * The writing engine (ADR-0017): Markdown posts under src/content/writing/,
 * compiled at build to sanitised HTML. Server-only — this module reads the
 * filesystem and must never be imported from a 'use client' file (test-enforced).
 * Everything here is synchronous and deterministic: no clock in the output,
 * explicit ordering, the same input always the same HTML.
 */
export const WRITING_DIR = 'src/content/writing';
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const WORDS_PER_MINUTE = 200;
const RESERVED_SLUGS = new Set(['feed.xml', 'kind']);

export type Heading = { depth: 2 | 3; id: string; text: string };
export type Post = PostFrontmatter & {
  slug: string;
  file: string; // the path the post was read from — error messages name it
  body: string; // raw Markdown after the frontmatter
  readingMinutes: number;
};
export type RenderedPost = Post & { html: string; headings: Heading[] };

class PostError extends Error {
  constructor(file: string, detail: string) {
    super(`${file}: ${detail}`);
    this.name = 'PostError';
  }
}

/** Split `---\n…\n---\n` frontmatter from the body. Throws when absent. */
export function splitFrontmatter(file: string, source: string): { data: unknown; body: string } {
  const m = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new PostError(file, 'no YAML frontmatter block (--- … ---) at the top of the file');
  let data: unknown;
  try {
    data = parseYaml(m[1]);
  } catch (e) {
    throw new PostError(file, `frontmatter is not valid YAML — ${(e as Error).message}`);
  }
  return { data, body: m[2] };
}

const isRealDate = (s: string) => {
  const [y, mo, d] = s.split('-').map(Number);
  const dt = new Date(Date.UTC(y, mo - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === mo - 1 && dt.getUTCDate() === d;
};

/** Parse one post file into typed frontmatter + body. Throws PostError naming file and field. */
export function parsePost(file: string, source: string, today = new Date()): Post {
  const slug = basename(file).replace(/\.md$/, '');
  if (!/^[a-z0-9-]+$/.test(slug) || RESERVED_SLUGS.has(slug))
    throw new PostError(
      file,
      `slug "${slug}" must be lower-case a-z, 0-9 and hyphens, and not reserved`,
    );
  const { data, body } = splitFrontmatter(file, source);
  const parsed = postFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    throw new PostError(file, `frontmatter.${issue.path.join('.') || '(root)'}: ${issue.message}`);
  }
  const fm = parsed.data;
  for (const [field, value] of [
    ['date', fm.date],
    ['updated', fm.updated],
    ['written', fm.written],
  ] as const) {
    if (value && !isRealDate(value))
      throw new PostError(file, `frontmatter.${field}: ${value} is not a real calendar date`);
  }
  // "Not in the future" with the author's wall clock in mind: the build runs in UTC and
  // Vivek writes in IST (+5:30), so a post dated today by his clock can be tomorrow by the
  // build's. Allow 36 hours of skew — a real typo (a month out, 2099) still fails.
  const limit = new Date(today.getTime() + 36 * 60 * 60 * 1000).toISOString().slice(0, 10);
  if (fm.date > limit) throw new PostError(file, `frontmatter.date: ${fm.date} is in the future`);
  if (fm.updated && fm.updated < fm.date)
    throw new PostError(file, `frontmatter.updated: ${fm.updated} is before date ${fm.date}`);
  // ADR-0018: the work comes first, and you cannot have written it up in the future.
  if (fm.written && fm.written < fm.date)
    throw new PostError(
      file,
      `frontmatter.written: ${fm.written} precedes the work it describes (${fm.date})`,
    );
  if (fm.written && fm.written > limit)
    throw new PostError(file, `frontmatter.written: ${fm.written} is in the future`);
  const known = new Set(projects.map((p) => p.id));
  for (const id of fm.projects)
    if (!known.has(id)) throw new PostError(file, `frontmatter.projects: unknown project "${id}"`);
  const words = body
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return {
    ...fm,
    slug,
    file,
    body,
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };
}

/** Every post on disk, newest first (date desc, slug asc). Drafts only outside production. */
export function listPosts(opts: { includeDrafts?: boolean; dir?: string } = {}): Post[] {
  const dir = opts.dir ?? WRITING_DIR;
  const includeDrafts = opts.includeDrafts ?? process.env.NODE_ENV !== 'production';
  const posts = readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((f) => parsePost(join(dir, f), readFileSync(join(dir, f), 'utf8')))
    .filter((p) => includeDrafts || !p.draft);
  return posts.sort((a, b) =>
    a.date === b.date ? a.slug.localeCompare(b.slug) : b.date.localeCompare(a.date),
  );
}

export function getPost(
  slug: string,
  opts: { includeDrafts?: boolean; dir?: string } = {},
): Post | undefined {
  return listPosts(opts).find((p) => p.slug === slug);
}

export function postsForProject(
  projectId: string,
  opts: { includeDrafts?: boolean; dir?: string } = {},
): Post[] {
  return listPosts(opts).filter((p) => p.projects.includes(projectId));
}

/* ------------------------------------------------------------------ pipeline */

/** Local plugin: collect h2/h3 for a table of contents (after rehype-slug gave them ids). */
function collectHeadings(into: Heading[]) {
  return () => (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (
        (node.tagName === 'h2' || node.tagName === 'h3') &&
        typeof node.properties?.id === 'string'
      ) {
        into.push({
          depth: node.tagName === 'h2' ? 2 : 3,
          id: node.properties.id,
          text: hastToString(node),
        });
      }
    });
  };
}

/** Local plugin: the site's policy for post bodies. Throws so a bad post fails the build. */
function policy(file: string) {
  return () => (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'h1')
        throw new PostError(file, 'body must not contain an h1 — the title is the h1');
      if (node.tagName === 'img') {
        const src = String(node.properties?.src ?? '');
        if (!src.startsWith('/media/'))
          throw new PostError(file, `image "${src}" must live under /media/`);
        if (!node.properties?.alt || String(node.properties.alt).trim() === '')
          throw new PostError(file, `image "${src}" needs alt text`);
        node.properties.src = `${BASE_PATH}${src}`;
        node.properties.loading = 'lazy';
      }
      if (node.tagName === 'a') {
        const href = String(node.properties?.href ?? '');
        if (href.startsWith('/') && !href.startsWith('//'))
          node.properties!.href = `${BASE_PATH}${href}`;
        if (/^https?:\/\//.test(href)) {
          node.properties!.target = '_blank';
          node.properties!.rel = ['noopener', 'noreferrer'];
        }
      }
    });
  };
}

/** Markdown → sanitised HTML + headings. Synchronous; throws PostError on policy violations. */
export function renderMarkdown(
  file: string,
  markdown: string,
): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const schema: SanitizeSchema = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      // rehype-sanitize's default schema allows ids only with a `user-content-` prefix; we
      // run sanitize BEFORE slug so headings get clean ids afterwards, and allow `className`
      // on code for a highlighter later.
      code: [
        ...(defaultSchema.attributes?.code ?? []),
        ['className', /^language-/] as [string, RegExp],
      ],
    },
  };
  const result = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype) // raw HTML is dropped here; sanitize below is defence in depth
    .use(rehypeSanitize, schema)
    .use(rehypeSlug)
    .use(collectHeadings(headings))
    .use(policy(file))
    .use(rehypeStringify)
    .processSync(markdown);
  return { html: String(result), headings };
}

export function renderPost(post: Post): RenderedPost {
  return { ...post, ...renderMarkdown(post.file, post.body) };
}

/* ---------------------------------------------------------------------- feed */

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Atom 1.0 feed, summary-only, absolute URLs; `updated` derives from the newest post. */
export function buildFeed(
  posts: Post[],
  site: { url: string; title: string; author: string },
): string {
  // Published by the work date, updated by the written date (ADR-0018) — a newly written post
  // about old work still reaches a subscriber.
  const recency = (p: Post) => p.written ?? p.updated ?? p.date;
  const updated = posts.length
    ? `${posts.map(recency).sort().at(-1)}T00:00:00Z`
    : '1970-01-01T00:00:00Z';
  const entries = posts
    .map(
      (p) => `  <entry>
    <title>${escapeXml(p.title)}</title>
    <link href="${site.url}/writing/${p.slug}/"/>
    <id>${site.url}/writing/${p.slug}/</id>
    <published>${p.date}T00:00:00Z</published>
    <updated>${recency(p)}T00:00:00Z</updated>
    <summary>${escapeXml(p.summary)}</summary>${p.tags.map((t) => `\n    <category term="${escapeXml(t)}"/>`).join('')}
  </entry>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(site.title)}</title>
  <link href="${site.url}/writing/"/>
  <link rel="self" href="${site.url}/feed.xml"/>
  <id>${site.url}/writing/</id>
  <updated>${updated}</updated>
  <author><name>${escapeXml(site.author)}</name></author>
${entries}
</feed>
`;
}

/* ------------------------------------------------------------------ palette */

/** Posts as ⌘K palette rows (ADR-0017), built on the server and passed to the palette as props. */
export function postPaletteEntries(): PaletteEntry[] {
  return listPosts().map((p) => ({
    label: p.title,
    detail: `Writing · ${p.kind.replace('-', ' ')} · ${p.date}`,
    href: `/writing/${p.slug}/`,
    keywords: `${p.title} ${p.summary} ${p.tags.join(' ')} ${p.kind}`.toLowerCase(),
  }));
}
