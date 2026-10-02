import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Arc } from '@/components/Arc';
import type { Role } from '@/content/schema';

/**
 * The strip on invented careers, for the branches the real one never takes
 * (SPEC-0006 R8). The real roles are rendered through About in sections.test.
 */
const at = new Date('2026-10-02T00:00:00Z');
const role = (over: Partial<Role> & Pick<Role, 'company' | 'period'>): Role => ({
  title: 'Engineer',
  track: 'Mechanical',
  highlights: [],
  domain: 'aerospace',
  ...over,
});

describe('Arc', () => {
  it('names the image in server-rendered markup, not only on the client', () => {
    // react-dom/server renders a <title> with more than one child as empty:
    // `<title>The career, {year} to now</title>` shipped as `<title></title>`
    // while the client rendered the text, and the mismatch made React
    // re-render the document (SPEC-0011 R9). One string child, asserted here
    // because testing-library's client render never showed the defect.
    const html = renderToStaticMarkup(
      <Arc roles={[role({ company: 'A', period: 'Jan 2020 – Present' })]} now={at} />,
    );
    expect(html).toContain('<title id="arc-title">The career, 2020 to now</title>');
  });

  it('draws no aside lane and no aside line when nothing ran alongside', () => {
    render(<Arc roles={[role({ company: 'A', period: 'Jan 2020 – Present' })]} now={at} />);
    const strip = screen.getByRole('img');
    expect(strip.querySelectorAll('[data-arc-lane="primary"]')).toHaveLength(1);
    expect(strip.querySelectorAll('[data-arc-lane="aside"]')).toHaveLength(0);
    expect(screen.queryByText(/alongside/)).toBeNull();
  });

  it('dates a venture that has ended with both ends', () => {
    render(
      <Arc
        roles={[
          role({ company: 'A', period: 'Jan 2020 – Present' }),
          role({
            company: 'V',
            period: 'Jan 2021 – Dec 2022',
            domain: 'entrepreneurial',
            aside: 'Side venture',
          }),
        ]}
        now={at}
      />,
    );
    expect(screen.getByText('V · alongside from Jan 2021 to Dec 2022')).toBeInTheDocument();
    expect(screen.getByRole('img').querySelectorAll('[data-arc-lane="aside"]')).toHaveLength(1);
  });
});
