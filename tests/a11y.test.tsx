import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { AiPractice } from '@/components/AiPractice';
import { Skills } from '@/components/Skills';
import { Recommendations } from '@/components/Recommendations';
import { Timeline } from '@/components/Timeline';
import { Credentials } from '@/components/Credentials';
import { Contact } from '@/components/Contact';
import NotFound from '@/app/not-found';

/**
 * Render the full page composition (minus the html/body shell, which jsdom can't
 * nest) and assert zero accessibility violations. Section order mirrors
 * app/page.tsx — keep them in sync so this covers what actually ships.
 *
 * Axe over the whole landing page takes several seconds and grows with the
 * content, so these get an explicit generous timeout rather than inheriting the
 * 5s default, which flaked once the suite ran them under parallel load.
 */
const AXE_TIMEOUT = 40_000;

describe('accessibility', () => {
  it(
    'the assembled page has no axe violations',
    async () => {
      const { container } = render(
        <>
          <Nav />
          <main>
            <Hero />
            <About />
            <Experience />
            <AiPractice />
            <Skills />
            <Recommendations />
            <Timeline />
            <Credentials />
            <Contact />
          </main>
        </>,
      );
      expect(await axe(container)).toHaveNoViolations();

      // Re-run with the mobile menu open.
      fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
      expect(await axe(container)).toHaveNoViolations();
    },
    AXE_TIMEOUT,
  );

  it(
    'the 404 page has no axe violations',
    async () => {
      const { container } = render(<NotFound />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    },
    AXE_TIMEOUT,
  );
});
