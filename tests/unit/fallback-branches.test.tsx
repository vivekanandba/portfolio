import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { asset } from '@/lib/asset';
import { domainColor } from '@/lib/domain';
import { archivePaletteEntries } from '@/lib/palette';
import { Section } from '@/components/Section';
import { ClipGrid } from '@/components/ClipGrid';
import { PostMeta, formatDate, formatMonth } from '@/components/PostMeta';
import { archiveEntries, caseStudyStart } from '@/content';

/**
 * The `?? fallback` and `&& optional` paths. Individually small, collectively
 * the reason eight files sat under an 85% branch score — and each one is the
 * behaviour that shows up only for the unusual row: the entry with no customer,
 * the post with no update, the first deploy with no posts at all.
 */

describe('asset paths', () => {
  it('adds the leading slash a caller omitted', () => {
    expect(asset('media/x.jpg')).toBe(asset('/media/x.jpg'));
    expect(asset('media/x.jpg').endsWith('/media/x.jpg')).toBe(true);
  });

  it('leaves an already-rooted path alone', () => {
    expect(asset('/resume.pdf').endsWith('/resume.pdf')).toBe(true);
    expect(asset('/resume.pdf')).not.toContain('//resume');
  });
});

describe('domain colours', () => {
  it('gives a named domain its own treatment', () => {
    expect(domainColor('aerospace').text).toBe('text-domain-aero');
  });

  it('falls back to neutral when a record has no domain', () => {
    expect(domainColor(undefined)).toEqual({
      text: 'text-muted',
      bg: 'bg-muted',
      border: 'border-muted',
    });
  });
});

describe('archive palette entries', () => {
  it('builds one row per archive entry, with the era spelled out', () => {
    const rows = archivePaletteEntries();
    expect(rows).toHaveLength(archiveEntries.length);
    for (const row of rows) {
      expect(row.detail.startsWith('Archive · ')).toBe(true);
      expect(row.href).toMatch(/^\/archive\/.+\/$/);
      // The haystack is matched lower-cased, so it must be stored that way.
      expect(row.keywords).toBe(row.keywords.toLowerCase());
    }
  });

  it('keeps a searchable row for an entry with no named customer', () => {
    // Withheld customer names are the norm here, not the exception.
    const withoutCustomer = archiveEntries.filter((e) => !e.customer);
    const rows = archivePaletteEntries();
    for (const entry of withoutCustomer) {
      const row = rows.find((r) => r.label === entry.title);
      expect(row, entry.title).toBeDefined();
      expect(row!.keywords).toContain(entry.title.toLowerCase());
    }
  });
});

describe('Section', () => {
  it('labels itself by its heading when it has one', () => {
    const { container } = render(
      <Section id="demo" eyebrow="Eyebrow" title="A title">
        <p>body</p>
      </Section>,
    );
    const section = container.querySelector('section')!;
    expect(section.getAttribute('aria-labelledby')).toBe('demo-title');
    expect(screen.getByRole('heading', { level: 2, name: 'A title' })).toHaveAttribute(
      'id',
      'demo-title',
    );
  });

  it('carries no dangling label when it has no heading', () => {
    const { container } = render(
      <Section id="bare">
        <p>body</p>
      </Section>,
    );
    const section = container.querySelector('section')!;
    expect(section.hasAttribute('aria-labelledby')).toBe(false);
    expect(container.querySelector('header')).toBeNull();
  });

  it('renders an eyebrow without a title, and a title without an eyebrow', () => {
    const { container: a } = render(
      <Section id="eyebrow-only" eyebrow="Just the eyebrow">
        <p>body</p>
      </Section>,
    );
    expect(a.textContent).toContain('Just the eyebrow');
    expect(a.querySelector('h2')).toBeNull();

    const { container: b } = render(
      <Section id="title-only" title="Just the title">
        <p>body</p>
      </Section>,
    );
    expect(b.querySelector('h2')!.textContent).toBe('Just the title');
    expect(b.querySelectorAll('p')).toHaveLength(1); // the body only, no eyebrow
  });
});

describe('PostMeta', () => {
  const base = { kind: 'note' as const, date: '2026-01-15', readingMinutes: 4 };

  it('shows kind, date and reading time', () => {
    render(<PostMeta post={base} />);
    expect(screen.getByText('Note')).toBeInTheDocument();
    expect(screen.getByText('15 January 2026')).toBeInTheDocument();
    expect(screen.getByText('4 min read')).toBeInTheDocument();
  });

  it('mentions an update only when there is one', () => {
    const { rerender } = render(<PostMeta post={base} />);
    expect(screen.queryByText(/updated/i)).not.toBeInTheDocument();

    rerender(<PostMeta post={{ ...base, updated: '2026-03-02' }} />);
    expect(screen.getByText('Updated 2 March 2026')).toBeInTheDocument();
  });

  it('flags a draft only while it is one', () => {
    const { rerender } = render(<PostMeta post={base} />);
    expect(screen.queryByText('Draft')).not.toBeInTheDocument();

    rerender(<PostMeta post={{ ...base, draft: true }} />);
    expect(screen.getByText('Draft')).toBeInTheDocument();
  });

  it('formats dates without a timezone round-trip', () => {
    // Built in UTC, written in IST: a naive Date would shift these by a day.
    expect(formatDate('2015-01-01')).toBe('1 January 2015');
    expect(formatDate('2015-12-31')).toBe('31 December 2015');
    expect(formatMonth('2015-12-31')).toBe('December 2015');
  });
});

describe('the sitemap on a site with no posts yet', () => {
  it('omits lastModified from /writing/ rather than emitting an empty one', async () => {
    vi.resetModules();
    vi.doMock('@/lib/writing', () => ({ listPosts: () => [] }));
    const { default: sitemap } = await import('@/app/sitemap');

    const writing = sitemap().find((e) => e.url.endsWith('/writing/'));
    expect(writing, '/writing/ entry').toBeDefined();
    expect(writing!.lastModified).toBeUndefined();
    expect(sitemap().some((e) => e.url.includes('/writing/'))).toBe(true);

    vi.doUnmock('@/lib/writing');
    vi.resetModules();
  });
});

describe('ClipGrid captions and credits', () => {
  const clip = {
    file: 'media/demo.mp4',
    poster: 'media/demo.jpg',
    alt: 'A silent simulation of the gripper closing',
  };

  it('always gives a silent clip a captions track naming what happens', () => {
    const { container } = render(<ClipGrid clips={[clip]} />);
    const track = container.querySelector('track')!;
    expect(track).toHaveAttribute('kind', 'captions');
    expect(decodeURIComponent(track.getAttribute('src')!)).toContain(clip.alt);
    // Nothing downloads until the reader asks for it.
    expect(container.querySelector('video')).toHaveAttribute('preload', 'none');
  });

  it('renders a caption and a credit when both are present', () => {
    const { container } = render(
      <ClipGrid clips={[{ ...clip, caption: 'Gripper cycle', credit: 'Courtesy Acme' }]} />,
    );
    const caption = container.querySelector('figcaption')!.textContent!;
    expect(caption).toContain('Gripper cycle');
    expect(caption).toContain('Courtesy Acme');
  });

  it('renders neither when the clip is my own and needs no line', () => {
    const { container } = render(<ClipGrid clips={[clip]} />);
    const caption = container.querySelector('figcaption')!.textContent!.trim();
    expect(caption).not.toContain('undefined');
    expect(caption).not.toContain('null');
  });
});

describe('case study sort keys', () => {
  it('dates a known project by the month the engagement started', () => {
    expect(caseStudyStart('lca-navy')).toBe(201601);
  });

  it('sorts an id it has never seen to the end rather than throwing', () => {
    expect(caseStudyStart('not-a-project')).toBe(0);
  });
});
