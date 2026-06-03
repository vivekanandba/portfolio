import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Skills } from '@/components/Skills';
import { Timeline } from '@/components/Timeline';
import { Credentials } from '@/components/Credentials';
import { Contact } from '@/components/Contact';

/**
 * Render the full page composition (minus the html/body shell, which jsdom can't
 * nest) and assert zero accessibility violations.
 */
describe('accessibility', () => {
  it('the assembled page has no axe violations', async () => {
    const { container } = render(
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Timeline />
        <Credentials />
        <Contact />
      </main>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
