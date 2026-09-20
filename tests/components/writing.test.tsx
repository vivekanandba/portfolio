import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import WritingIndex from '@/app/writing/page';
import PostPage, { generateStaticParams } from '@/app/writing/[slug]/page';
import PostImage, { generateStaticParams as ogParams } from '@/app/writing/[slug]/opengraph-image';
import WorkImage, { generateStaticParams as workOgParams } from '@/app/work/[slug]/opengraph-image';
import CaseStudyPage from '@/app/work/[slug]/page';
import { GET as feed } from '@/app/feed.xml/route';
import sitemap from '@/app/sitemap';
import { Writing } from '@/components/Writing';
import { ProjectNotes } from '@/components/ProjectNotes';
import { formatDate, formatMonth } from '@/components/PostMeta';
import { caseStudies, profile, projects } from '@/content';
import { listPosts, renderPost } from '@/lib/writing';
import { unsafeGlyphs } from '@/lib/og-text';

// next/og renders with Satori and a bundled font; in jsdom we only need to know
// the element tree is built and the size is declared.
vi.mock('next/og', () => ({
  ImageResponse: class {
    element: unknown;
    options: unknown;
    constructor(element: unknown, options: unknown) {
      this.element = element;
      this.options = options;
    }
  },
}));

const posts = listPosts();
const published = listPosts({ includeDrafts: false });
const first = posts[0];

describe('/writing/ index', () => {
  it('lists every post as a link, newest first, with its kind and date', () => {
    render(<WritingIndex />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    for (const p of posts) {
      expect(screen.getByRole('link', { name: p.title })).toHaveAttribute(
        'href',
        expect.stringMatching(new RegExp(`^/writing/${p.slug}/?$`)),
      );
      expect(screen.getAllByText(formatDate(p.date)).length).toBeGreaterThan(0);
    }
    expect(screen.getByRole('link', { name: /atom feed/i })).toHaveAttribute('href', '/feed.xml');
  });

  it('states the dating convention once, and does not repeat it on every card (ADR-0018)', () => {
    const { container } = render(<WritingIndex />);
    expect(screen.getByText(/written now, about work done then/i)).toBeInTheDocument();
    // The written date belongs on the post, quietly — not in the index's headline meta.
    for (const p of posts.filter((p) => p.written)) {
      expect(
        container.querySelector(`time[datetime="${p.written}"]`),
        `${p.slug}: the index should not carry the written date`,
      ).toBeNull();
    }
  });

  it('has no axe violations', async () => {
    const { container } = render(<WritingIndex />);
    expect(await axe(container)).toHaveNoViolations();
  }, 40_000);
});

describe('/writing/[slug]/', () => {
  it('emits one static route per post (drafts only outside production)', () => {
    expect(generateStaticParams()).toEqual(posts.map((p) => ({ slug: p.slug })));
    expect(ogParams()).toEqual(generateStaticParams());
  });

  it('renders the title, meta, tags, the compiled body with heading ids, and the project links', async () => {
    const element = await PostPage({ params: Promise.resolve({ slug: first.slug }) });
    const { container } = render(element);
    expect(screen.getByRole('heading', { level: 1, name: first.title })).toBeInTheDocument();
    expect(screen.getByText(formatDate(first.date))).toBeInTheDocument();
    for (const t of first.tags)
      expect(within(screen.getByRole('list', { name: 'Tags' })).getByText(t)).toBeInTheDocument();
    const { headings } = renderPost(first);
    for (const h of headings) expect(container.querySelector(`[id="${h.id}"]`)).not.toBeNull();
    expect(container.querySelector('.post-body h1')).toBeNull();
    const fromTheWork = within(screen.getByRole('region', { name: 'From the work' }));
    for (const id of first.projects) {
      const project = projects.find((p) => p.id === id)!;
      const cs = caseStudies.find((c) => c.projectId === id)!;
      expect(fromTheWork.getByRole('link', { name: new RegExp(project.title) })).toHaveAttribute(
        'href',
        expect.stringMatching(new RegExp(`^/work/${cs.slug}/?$`)),
      );
    }
    for (const img of screen.queryAllByRole('img')) expect(img).toHaveAccessibleName();
    expect(await axe(container)).toHaveNoViolations();
  }, 40_000);
});

describe('the written date is a quiet colophon on the post (ADR-0018)', () => {
  it('states when the post was written, once, below the article and machine-readable', async () => {
    const element = await PostPage({ params: Promise.resolve({ slug: first.slug }) });
    const { container } = render(element);
    const stamps = container.querySelectorAll(`time[datetime="${first.written}"]`);
    expect(stamps, 'exactly one written stamp').toHaveLength(1);
    expect(stamps[0].closest('p')!.textContent).toMatch(
      new RegExp(`written from my notes in ${formatMonth(first.written!)}`, 'i'),
    );
    // It is not part of the loud meta line above the title.
    const meta = container.querySelector('p.uppercase')!;
    expect(meta.textContent).not.toMatch(/written/i);
    expect(meta.textContent).toMatch(/min read/i);
  });
});

describe('OpenGraph images', () => {
  it('the post card builds with the declared size', async () => {
    const img = (await PostImage({ params: Promise.resolve({ slug: first.slug }) })) as unknown as {
      options: { width: number; height: number };
    };
    expect(img.options).toEqual({ width: 1200, height: 630 });
  });

  it('the project card builds with the declared size (was never rendered under test before)', async () => {
    const img = (await WorkImage({
      params: Promise.resolve({ slug: caseStudies[0].slug }),
    })) as unknown as { options: { width: number; height: number } };
    expect(img.options).toEqual({ width: 1200, height: 630 });
  });

  /**
   * Both cards fall back to the profile when the slug is unknown. That path had
   * no test, so a broken fallback would have shipped a card headed `undefined`
   * — and an OG card is the one thing a reader sees before they click.
   */
  const cardText = (img: unknown) => {
    const out: string[] = [];
    const walk = (node: unknown) => {
      if (node == null || node === false) return;
      if (typeof node === 'string' || typeof node === 'number') {
        out.push(String(node));
        return;
      }
      if (Array.isArray(node)) return node.forEach(walk);
      const children = (node as { props?: { children?: unknown } }).props?.children;
      if (children !== undefined) walk(children);
    };
    walk((img as { element: unknown }).element);
    return out.join(' ');
  };

  it('emits one project card per project page, and no more', async () => {
    // Its own generateStaticParams, not the page's: a mismatch would ship
    // pages whose og:image 404s.
    expect(workOgParams()).toEqual(caseStudies.map((cs) => ({ slug: cs.slug })));
  });

  it('names the project on its card', async () => {
    const cs = caseStudies[0];
    const img = await WorkImage({ params: Promise.resolve({ slug: cs.slug }) });
    const text = cardText(img);
    expect(text).toContain(cs.title);
    expect(text).toContain(cs.eyebrow);
  });

  it('falls back to the profile when a project slug is unknown', async () => {
    const img = await WorkImage({ params: Promise.resolve({ slug: 'no-such-project' }) });
    const text = cardText(img);
    expect(text).toContain(profile.name);
    expect(text).toContain(profile.tagline);
  });

  it('names the post, its kind and its date on the writing card', async () => {
    const img = await PostImage({ params: Promise.resolve({ slug: first.slug }) });
    const text = cardText(img);
    expect(text).toContain(first.title);
    expect(text).toContain(formatDate(first.date));
  });

  /**
   * The gate for the defect the coverage work found: AirCare's card led with
   * the metric `₹7,500`, Satori's bundled font has no `₹`, and the build tried
   * to download a dynamic font and failed with HTTP 400 — leaving the glyph
   * missing from a card that is the first thing a reader sees. It only ever
   * showed up as one warning line in a passing build (CON-PROC-003).
   */
  it('renders every project card with glyphs the bundled font actually has', async () => {
    for (const cs of caseStudies) {
      const text = cardText(await WorkImage({ params: Promise.resolve({ slug: cs.slug }) }));
      expect(unsafeGlyphs(text), `${cs.slug} card uses glyphs Satori cannot draw`).toEqual([]);
    }
  });

  it('renders every writing card with glyphs the bundled font actually has', async () => {
    for (const post of posts) {
      const text = cardText(await PostImage({ params: Promise.resolve({ slug: post.slug }) }));
      expect(unsafeGlyphs(text), `${post.slug} card uses glyphs Satori cannot draw`).toEqual([]);
    }
  });

  it('spells out the rupee amounts the font cannot draw', async () => {
    const aircare = caseStudies.find((cs) => cs.projectId === 'aircare');
    expect(aircare, 'the AirCare case study').toBeDefined();
    const text = cardText(await WorkImage({ params: Promise.resolve({ slug: aircare!.slug }) }));
    expect(text).toContain('Rs 7,500');
    expect(text).not.toContain('₹');
  });

  it('falls back to the profile when a post slug is unknown', async () => {
    const img = await PostImage({ params: Promise.resolve({ slug: 'no-such-post' }) });
    const text = cardText(img);
    expect(text).toContain('Writing');
    expect(text).toContain(profile.name);
    expect(text).toContain(profile.tagline);
  });
});

describe('feed and sitemap', () => {
  it('GET /feed.xml returns Atom with one entry per published post', async () => {
    const res = feed();
    expect(res.headers.get('Content-Type')).toMatch(/application\/atom\+xml/);
    const xml = await res.text();
    expect((xml.match(/<entry>/g) ?? []).length).toBe(published.length);
    expect(xml).toContain('/portfolio/writing/');
  });

  it('the sitemap lists every route with absolute URLs', () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain('https://vivekanandba.github.io/portfolio/');
    expect(urls).toContain('https://vivekanandba.github.io/portfolio/writing/');
    for (const cs of caseStudies)
      expect(urls).toContain(`https://vivekanandba.github.io/portfolio/work/${cs.slug}/`);
    for (const p of published)
      expect(urls).toContain(`https://vivekanandba.github.io/portfolio/writing/${p.slug}/`);
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe('landing Writing section and project notes', () => {
  it('shows the latest posts, at most three, and links to all writing', () => {
    render(<Writing />);
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(Math.min(3, posts.length));
    expect(screen.getByRole('link', { name: /all writing/i })).toHaveAttribute(
      'href',
      expect.stringMatching(/^\/writing\/?$/),
    );
  });

  it('ProjectNotes renders for a cited project and nothing otherwise', async () => {
    const cited = first.projects[0];
    const { container: withNotes } = render(<ProjectNotes projectId={cited} />);
    expect(
      within(withNotes).getByRole('heading', { name: /notes from this project/i }),
    ).toBeInTheDocument();
    const { container: none } = render(<ProjectNotes projectId="playground-does-not-exist" />);
    expect(none).toBeEmptyDOMElement();
    const element = await CaseStudyPage({ params: Promise.resolve({ slug: cited }) });
    render(element);
    expect(
      screen.getAllByRole('heading', { name: /notes from this project/i }).length,
    ).toBeGreaterThan(0);
  });
});
