import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  buildFeed,
  getPost,
  listPosts,
  parsePost,
  postsForProject,
  renderMarkdown,
  renderPost,
  splitFrontmatter,
  WRITING_DIR,
} from '@/lib/writing';
import { POST_KINDS, postFrontmatterSchema } from '@/content/schema';

/**
 * The writing engine (ADR-0017). Two halves: the real posts under
 * src/content/writing/ must all parse and render under the site's policy, and
 * the engine itself is exercised against fixtures — every malformed post fails
 * naming the file and the field, sanitisation strips what it must and keeps
 * what GFM promises, ordering and draft filtering are deterministic, and the
 * Atom feed is well-formed. Written red first (SPEC §9.2).
 */
const GOOD = 'tests/fixtures/writing/good';
const BAD = 'tests/fixtures/writing/bad';
const TODAY = new Date('2026-09-13T12:00:00Z');
const read = (dir: string, f: string) => readFileSync(join(dir, f), 'utf8');

describe('the published posts', () => {
  const posts = listPosts({ includeDrafts: true });

  it('every post is dated by the work it describes and says when it was written (ADR-0018)', () => {
    for (const p of posts) {
      // Every real post here is retrospective: written from notes long after the work.
      expect(p.written, `${p.slug} must record when it was written`).toBeTruthy();
      expect(
        p.written! >= p.date,
        `${p.slug}: written ${p.written} precedes the work ${p.date}`,
      ).toBe(true);
    }
  });

  it('there is at least one published post — a static export cannot emit a route with no params', () => {
    expect(listPosts({ includeDrafts: false }).length).toBeGreaterThan(0);
  });

  it('every post parses, renders under the policy, and is first person and dated', () => {
    for (const p of posts) {
      expect(() => renderPost(p)).not.toThrow();
      const r = renderPost(p);
      expect(r.html).not.toMatch(/<h1/);
      expect(r.html).not.toMatch(/<script/);
      expect(r.readingMinutes).toBeGreaterThanOrEqual(1);
      expect(POST_KINDS).toContain(p.kind);
      expect(/\b(TODO|TBD)\b/.test(p.body), `${p.slug} has a placeholder`).toBe(false);
    }
  });

  it('a README explains the rules, and is not itself a post', () => {
    expect(readdirSync(WRITING_DIR)).toContain('README.md');
    expect(posts.some((p) => p.slug === 'README')).toBe(false);
  });
});

describe('parsePost — malformed posts fail naming the file and the field', () => {
  it.each([
    ['missing-title.md', /frontmatter\.title/],
    ['slash-date.md', /frontmatter\.date/],
    ['impossible-date.md', /not a real calendar date/],
    ['unknown-kind.md', /frontmatter\.kind/],
    ['typo-key.md', /frontmatter.*tag|Unrecognized key|unrecognized/i],
    ['updated-before-date.md', /frontmatter\.updated/],
    ['no-frontmatter.md', /no YAML frontmatter/],
    ['unknown-project.md', /unknown project "no-such-project"/],
    ['future-date.md', /in the future/],
  ])('%s → %s', (file, message) => {
    expect(() => parsePost(join(BAD, file), read(BAD, file), TODAY)).toThrow(message);
    expect(() => parsePost(join(BAD, file), read(BAD, file), TODAY)).toThrow(file);
  });

  it.each([
    ['body-h1.md', /must not contain an h1/],
    ['image-outside-media.md', /must live under \/media\//],
    ['image-no-alt.md', /needs alt text/],
  ])('%s → policy: %s', (file, message) => {
    const post = parsePost(join(BAD, file), read(BAD, file), TODAY);
    expect(() => renderMarkdown(join(BAD, file), post.body)).toThrow(message);
  });

  it('applies defaults and keeps the date a string', () => {
    const p = parsePost(join(GOOD, 'older-post.md'), read(GOOD, 'older-post.md'), TODAY);
    expect(p.draft).toBe(false);
    expect(p.projects).toEqual([]);
    expect(typeof p.date).toBe('string');
    expect(p.date).toBe('2026-07-01');
    expect(p.readingMinutes).toBe(1);
  });

  it('accepts a date that is "tomorrow" in UTC (the author writes in IST) but not a month out', () => {
    const src = read(GOOD, 'older-post.md');
    const tomorrow = src.replace('date: 2026-07-01', 'date: 2026-09-14');
    expect(() => parsePost('x/tomorrow.md', tomorrow, TODAY)).not.toThrow();
    const monthOut = src.replace('date: 2026-07-01', 'date: 2026-10-13');
    expect(() => parsePost('x/month-out.md', monthOut, TODAY)).toThrow(/in the future/);
  });

  it('renderPost names the file a post was read from in its errors', () => {
    const post = parsePost(join(BAD, 'body-h1.md'), read(BAD, 'body-h1.md'), TODAY);
    expect(() => renderPost(post)).toThrow(join(BAD, 'body-h1.md'));
  });

  it.each([
    ['written-before-date.md', /frontmatter\.written/],
    ['written-in-future.md', /frontmatter\.written/],
  ])('%s → %s', (file, message) => {
    expect(() => parsePost(join(BAD, file), read(BAD, file), TODAY)).toThrow(message);
    expect(() => parsePost(join(BAD, file), read(BAD, file), TODAY)).toThrow(file);
  });

  it('carries `written` when given, and leaves it undefined when not (ADR-0018)', () => {
    expect(
      parsePost(join(GOOD, 'first-good-post.md'), read(GOOD, 'first-good-post.md'), TODAY).written,
    ).toBe('2026-09-05');
    expect(
      parsePost(join(GOOD, 'older-post.md'), read(GOOD, 'older-post.md'), TODAY).written,
    ).toBeUndefined();
  });

  it('rejects a slug that is reserved or not slug-shaped', () => {
    const src = read(GOOD, 'older-post.md');
    expect(() => parsePost('x/feed.xml.md', src, TODAY)).toThrow(/reserved/);
    expect(() => parsePost('x/Not Slug.md', src, TODAY)).toThrow(/slug/);
  });

  it('splitFrontmatter tolerates CRLF and reports invalid YAML', () => {
    const { data, body } = splitFrontmatter('x.md', '---\r\ntitle: T\r\n---\r\nBody');
    expect((data as { title: string }).title).toBe('T');
    expect(body.trim()).toBe('Body');
    expect(() => splitFrontmatter('x.md', '---\ntitle: [unclosed\n---\nBody')).toThrow(
      /not valid YAML/,
    );
  });

  it('the frontmatter schema is strict', () => {
    expect(
      postFrontmatterSchema.safeParse({
        title: 'T',
        date: '2026-01-01',
        summary: 's',
        kind: 'note',
        extra: 1,
      }).success,
    ).toBe(false);
  });
});

describe('listPosts — ordering by the work date, and drafts', () => {
  it('sorts newest first, slug ascending on ties, and filters drafts both ways', () => {
    const all = listPosts({ dir: GOOD, includeDrafts: true });
    expect(all.map((p) => p.slug)).toEqual(['first-good-post', 'draft-post', 'older-post']);
    const published = listPosts({ dir: GOOD, includeDrafts: false });
    expect(published.map((p) => p.slug)).toEqual(['first-good-post', 'older-post']);
    expect(getPost('draft-post', { dir: GOOD, includeDrafts: false })).toBeUndefined();
    expect(getPost('draft-post', { dir: GOOD, includeDrafts: true })?.title).toBe('Draft post');
    expect(
      postsForProject('playground', { dir: GOOD, includeDrafts: true }).map((p) => p.slug),
    ).toEqual(['first-good-post']);
    expect(postsForProject('nothing', { dir: GOOD, includeDrafts: true })).toEqual([]);
  });
});

describe('renderMarkdown — sanitisation and GFM', () => {
  const render = (md: string) => renderMarkdown('t.md', md);

  it('drops raw HTML, script and event handlers, and javascript: URLs', () => {
    const { html } = render(
      'Hello <script>alert(1)</script> <img src="/media/x.jpg" alt="a" onerror="alert(1)"> [x](javascript:alert(1)) <b onclick="x()">b</b>',
    );
    expect(html).not.toMatch(/<script/);
    expect(html).not.toMatch(/onerror|onclick/);
    expect(html).not.toMatch(/javascript:/);
  });

  it('keeps GFM tables, task lists, strikethrough, fences and gives headings ids', () => {
    const post = parsePost(
      join(GOOD, 'first-good-post.md'),
      read(GOOD, 'first-good-post.md'),
      TODAY,
    );
    const { html, headings } = renderMarkdown(join(GOOD, 'first-good-post.md'), post.body);
    expect(html).toMatch(/<table>/);
    expect(html).toMatch(/type="checkbox"/);
    expect(html).toMatch(/<del>struck<\/del>/);
    expect(html).toMatch(/<pre><code class="language-ts">/);
    expect(html).toMatch(/<h2 id="heading-one">/);
    expect(headings).toEqual([
      { depth: 2, id: 'heading-one', text: 'Heading one' },
      { depth: 3, id: 'sub-heading', text: 'Sub heading' },
    ]);
  });

  it('prefixes root-relative links and images with the base path, marks external links', () => {
    const { html } = render(
      '[a](/work/playground/) [b](https://example.com/) ![alt](/media/x.jpg)',
    );
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
    expect(html).toContain(`href="${base}/work/playground/"`);
    expect(html).toContain(`src="${base}/media/x.jpg"`);
    expect(html).toMatch(/href="https:\/\/example\.com\/"[^>]*rel="noopener noreferrer"/);
    expect(html).toMatch(/loading="lazy"/);
  });

  it('rejects a data: image (not under /media/)', () => {
    expect(() => render('![a](data:image/png;base64,AAAA)')).toThrow(/must live under \/media\//);
  });
});

describe('buildFeed — Atom 1.0', () => {
  it('escapes, orders and derives updated from the newest post', () => {
    const posts = listPosts({ dir: GOOD, includeDrafts: false });
    const xml = buildFeed(posts, {
      url: 'https://example.com/portfolio',
      title: 'T & Co',
      author: 'V',
    });
    expect(xml.startsWith('<?xml version="1.0" encoding="utf-8"?>')).toBe(true);
    expect(xml).toContain('<title>T &amp; Co</title>');
    expect((xml.match(/<entry>/g) ?? []).length).toBe(posts.length);
    // The feed publishes by work date and updates by written date (ADR-0018).
    expect(xml).toContain('<updated>2026-09-05T00:00:00Z</updated>');
    expect(xml).toContain('<link rel="self" href="https://example.com/portfolio/feed.xml"/>');
    expect(xml).toContain('A good post: colons in titles need quotes');
    expect(xml).not.toContain('<content');
    expect(buildFeed([], { url: 'u', title: 't', author: 'a' })).toContain(
      '<updated>1970-01-01T00:00:00Z</updated>',
    );
  });
});

describe('the library stays on the server', () => {
  it("no 'use client' file imports @/lib/writing", () => {
    const walk = (dir: string): string[] =>
      readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
        d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)],
      );
    for (const f of walk('src').filter((f) => /\.tsx?$/.test(f))) {
      const src = readFileSync(f, 'utf8');
      if (/^'use client'/m.test(src))
        expect(src, `${f} is a client file importing the fs-backed writing lib`).not.toMatch(
          /@\/lib\/writing/,
        );
    }
  });
});
