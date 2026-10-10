import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { Strip } from '@/components/Strip';
import { caseStudies, caseStudyStart, projects, strip } from '@/content';
import { creditSource, resolveStrip } from '@/lib/strip';

/** The band itself (SPEC-0006 R12): one figure per frame, each a link, credits visible. */
describe('Strip', () => {
  const frames = resolveStrip(strip, { caseStudies, projects, caseStudyStart });

  it('is a landmark with a name, holding one linked figure per frame in order', () => {
    render(<Strip />);
    const region = screen.getByRole('region', { name: /fifteen years in pictures/i });
    const items = within(region).getAllByRole('listitem');
    expect(items).toHaveLength(frames.length);
    items.forEach((li, i) => {
      // next/link normalises the trailing slash away outside the real build
      // (trailingSlash lives in next.config); e2e asserts the slashed URLs.
      expect(li.querySelector('a')?.getAttribute('href')).toMatch(
        new RegExp(`^${frames[i].href.replace(/\/$/, '')}/?$`),
      );
      expect(li.querySelector('img')?.getAttribute('alt')).toBe(frames[i].alt);
      expect(li.textContent).toContain(String(frames[i].year));
      expect(li.textContent).toContain(frames[i].caption);
    });
  });

  it('crops each frame where its focus says, top by default', () => {
    render(<Strip />);
    const imgs = screen.getAllByRole('img');
    const mains = imgs.filter((img) => !img.hasAttribute('data-locator'));
    frames.forEach((f, i) => {
      expect(mains[i].className).toContain(`object-${f.focus ?? 'top'}`);
    });
  });

  it('shows the locator inset, with its own alt text and credit, wherever a frame has one', () => {
    render(<Strip />);
    const insets = document.querySelectorAll('img[data-locator]');
    const withLocator = frames.filter((f) => f.locator);
    expect(insets).toHaveLength(withLocator.length);
    expect(withLocator.length).toBeGreaterThanOrEqual(4);
    withLocator.forEach((f, i) => {
      expect(insets[i]).toHaveAttribute('alt', f.locator!.alt);
      expect(screen.getByText(`Inset: ${creditSource(f.locator!.credit!)}`)).toBeInTheDocument();
    });
  });

  it('loads the first image eagerly and the rest lazily', () => {
    render(<Strip />);
    const imgs = screen.getAllByRole('img').filter((img) => !img.hasAttribute('data-locator'));
    expect(imgs[0]).toHaveAttribute('loading', 'eager');
    for (const img of imgs.slice(1)) expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('shows the credit the project page shows, for every credited frame', () => {
    render(<Strip />);
    for (const f of frames) {
      if (f.credit) expect(screen.getByText(creditSource(f.credit))).toBeInTheDocument();
    }
  });
});
