import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Section } from '@/components/Section';

/** The section shell: a lead runs full-bleed above it; headings step up at lg (SPEC-0004 R23). */
describe('Section', () => {
  it('renders a full-bleed lead before the shell, and the heading one step up at lg', () => {
    const { container } = render(
      <Section id="x" eyebrow="E" title="T" lead={<div data-testid="lead">band</div>}>
        <p>body</p>
      </Section>,
    );
    const section = container.querySelector('section#x')!;
    expect(section.className).not.toContain('max-w-shell');
    expect(section.firstElementChild).toHaveAttribute('data-testid', 'lead');
    expect(section.lastElementChild!.className).toContain('max-w-shell');
    expect(container.querySelector('h2')!.className).toContain('lg:text-h2-lg');
  });

  it('renders nothing extra without a lead', () => {
    const { container } = render(
      <Section id="y">
        <p>body</p>
      </Section>,
    );
    const section = container.querySelector('section#y')!;
    expect(section.children).toHaveLength(1);
    expect(section.getAttribute('aria-labelledby')).toBeNull();
  });
});
