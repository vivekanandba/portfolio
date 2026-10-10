import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WorkIndex from '@/app/work/page';
import { caseStudies, projects } from '@/content';

/** The projects index (SPEC-0007 R10): a thumbnail beside each row that has an image. */
describe('the projects index', () => {
  it('shows a decorative thumbnail for every project with an image, and only those', () => {
    render(<WorkIndex />);
    const withImage = caseStudies.filter(
      (cs) => projects.find((p) => p.id === cs.projectId)?.image,
    );
    const thumbs = screen.getAllByRole('presentation').filter((el) => el.tagName === 'IMG');
    expect(thumbs).toHaveLength(withImage.length);
    for (const img of thumbs) expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('still links every case study', () => {
    render(<WorkIndex />);
    for (const cs of caseStudies) {
      expect(screen.getByRole('link', { name: cs.title })).toBeInTheDocument();
    }
  });
});
