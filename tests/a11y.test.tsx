import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import Home from '@/app/page';
import RecommendationsPage from '@/app/recommendations/page';
import NotFound from '@/app/not-found';

/**
 * Render what actually ships and assert zero accessibility violations.
 *
 * This used to hand-copy the section list out of app/page.tsx with a comment
 * asking whoever edited one to remember the other. It drifted: <Contact /> was
 * rendered inside <main> here while the page ships it outside as a <footer>.
 * Rendering <Home /> directly means there is no copy left to drift, and this
 * suite now also covers page.tsx rather than only the components it assembles.
 *
 * Axe over a whole page takes several seconds and grows with the content, so
 * these get an explicit generous timeout rather than inheriting the 5s default,
 * which flaked once the suite ran them under parallel load.
 */
const AXE_TIMEOUT = 40_000;

describe('accessibility', () => {
  it(
    'the landing page has no axe violations',
    async () => {
      const { container } = render(<Home />);
      expect(await axe(container)).toHaveNoViolations();

      // Re-run with the mobile menu open.
      fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
      expect(await axe(container)).toHaveNoViolations();
    },
    AXE_TIMEOUT,
  );

  it(
    'the recommendations page has no axe violations',
    async () => {
      const { container } = render(<RecommendationsPage />);
      expect(await axe(container)).toHaveNoViolations();
    },
    AXE_TIMEOUT,
  );

  it(
    'the 404 page has no axe violations',
    async () => {
      const { container } = render(<NotFound />);
      expect(await axe(container)).toHaveNoViolations();
    },
    AXE_TIMEOUT,
  );
});
