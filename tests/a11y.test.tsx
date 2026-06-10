import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Skills } from '@/components/Skills';
import { Timeline } from '@/components/Timeline';
import { Credentials } from '@/components/Credentials';
import { Contact } from '@/components/Contact';
import NotFound from '@/app/not-found';

/**
 * Render the full page composition (minus the html/body shell, which jsdom can't
 * nest) and assert zero accessibility violations.
 */
describe('accessibility', () => {
  it('the assembled page has no axe violations', async () => {
    const { container } = render(
      <>
        <Nav />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
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
  });

  it('the 404 page has no axe violations', async () => {
    const { container } = render(<NotFound />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
