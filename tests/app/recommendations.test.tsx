import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RecommendationsPage, { metadata } from '@/app/recommendations/page';
import { recommendations } from '@/content';
import { attribution } from '@/lib/recommendation';

/** The full recommendations page: every testimonial republished verbatim. */
describe('the recommendations page', () => {
  it('publishes every recommendation, with its attribution', () => {
    render(<RecommendationsPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Recommendations' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(recommendations.length);
    for (const r of recommendations) {
      expect(screen.getByText(r.name)).toBeInTheDocument();
      expect(screen.getByText(`· ${attribution(r)}`)).toBeInTheDocument();
    }
  });

  it('republishes each testimonial verbatim, not truncated', () => {
    const { container } = render(<RecommendationsPage />);
    const quotes = Array.from(container.querySelectorAll('blockquote')).map((q) => q.textContent);
    for (const r of recommendations) expect(quotes).toContain(r.text);
  });

  it('states the count in the standfirst so it can never contradict the list', () => {
    render(<RecommendationsPage />);
    expect(
      screen.getByText(new RegExp(`^${recommendations.length} recommendations`)),
    ).toBeInTheDocument();
  });

  it('offers a way back to the landing section', () => {
    render(<RecommendationsPage />);
    expect(screen.getByRole('link', { name: /back to the portfolio/i })).toHaveAttribute(
      'href',
      '/#recommendations',
    );
  });

  it('carries its own metadata', () => {
    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBeTruthy();
  });
});
