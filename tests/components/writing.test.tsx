import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import WritingIndex from '@/app/writing/page';
import PostPage, { generateStaticParams } from '@/app/writing/[slug]/page';
import PostImage, { generateStaticParams as ogParams } from '@/app/writing/[slug]/opengraph-image';
import WorkImage from '@/app/work/[slug]/opengraph-image';
import CaseStudyPage from '@/app/work/[slug]/page';
import { GET as feed } from '@/app/feed.xml/route';
import sitemap from '@/app/sitemap';
import { Writing } from '@/components/Writing';
import { ProjectNotes } from '@/components/ProjectNotes';
import { formatDate } from '@/components/PostMeta';
import { caseStudies, projects } from '@/content';
import { listPosts, renderPost } from '@/lib/writing';

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

  it('states the dating convention and shows when each post was written (ADR-0018)', () => {
    render(<WritingIndex />);
    expect(screen.getByText(/written now, about work done then/i)).toBeInTheDocument();
    for (const p of posts.filter((p) => p.written)) {
      expect(
        screen.getAllByText(
          new RegExp(`written ${formatDate(p.written!).replace(/^\d+ /, '')}`, 'i'),
        ).length,
      ).toBeGreaterThan(0);
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
