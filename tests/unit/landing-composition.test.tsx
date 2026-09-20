import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

/**
 * The landing page composition itself, not the components it assembles.
 *
 * Before this existed, `src/app/page.tsx` sat at 0% coverage behind a 97.9%
 * aggregate, and `tests/a11y.test.tsx` hand-copied the section list so it could
 * drift — and had: it rendered <Contact /> inside <main>, while the page ships
 * it outside as a footer. Asserting the real composition here, and rendering
 * <Home /> in the a11y test, removes the copy that could drift (CON-COV-003).
 */

/** Section ids in the order `page.tsx` declares them. Hero is `top` — the
 *  layout's skip link targets it. Contact is a <footer>, not a <section>. */
const SECTION_ORDER = [
  'top',
  'turning-points',
  'about',
  'work',
  'agents',
  'skills',
  'recommendations',
  'journey',
  'now',
  'writing',
  'credentials',
];

describe('the landing page composition', () => {
  it('renders every section, in the order page.tsx declares', () => {
    const { container } = render(<Home />);
    const ids = Array.from(container.querySelectorAll('section[id]')).map((s) => s.id);
    expect(ids).toEqual(SECTION_ORDER);
  });

  it('has exactly one main landmark and one h1', () => {
    render(<Home />);
    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('keeps Contact outside <main>, as a site-wide footer rather than page content', () => {
    const { container } = render(<Home />);
    const contact = container.querySelector('#contact');
    expect(contact, '#contact').not.toBeNull();
    expect(contact!.tagName).toBe('FOOTER');
    expect(contact!.closest('main')).toBeNull();
  });

  /**
   * The boundary that actually breaks: Nav.tsx keeps its own LINKS array, and
   * nothing connected it to what the page renders. A renamed or dropped section
   * would leave a nav link scrolling nowhere, silently.
   */
  it('every nav link points at a target that exists on the page', () => {
    const { container } = render(<Home />);
    const anchors = Array.from(container.querySelectorAll('nav a[href^="#"]')).map((a) =>
      (a.getAttribute('href') ?? '').slice(1),
    );
    expect(anchors.length).toBeGreaterThan(0);
    const missing = [...new Set(anchors)].filter((id) => !container.querySelector(`[id="${id}"]`));
    expect(missing, 'nav links with no matching element').toEqual([]);
  });
});
