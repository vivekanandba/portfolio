import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OfflinePage, { metadata } from '@/app/offline/page';
import { profile } from '@/content';

/**
 * The page the service worker serves when a navigation fails (SPEC-0004 R19).
 * It is precached at install, so it is the one page that is always available —
 * which means it has to be right without ever being looked at in production.
 */
describe('the offline page', () => {
  it('says what happened, in plain words, and offers the front page', () => {
    render(<OfflinePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/offline/i);
    expect(screen.getByText(/already opened here are kept on your device/i)).toBeInTheDocument();
    // Relative, not root-relative: under the base path "./" resolves to
    // /portfolio/ from /portfolio/offline/, and a leading slash would not.
    expect(screen.getByRole('link', { name: /front page/i })).toHaveAttribute('href', './');
  });

  it('carries the skip-link target every page has', () => {
    const { container } = render(<OfflinePage />);
    expect(container.querySelector('main#top')).not.toBeNull();
  });

  it('is titled for the owner and kept out of search', () => {
    expect(String(metadata.title)).toContain(profile.name);
    expect(String(metadata.title)).toMatch(/offline/i);
    const robots = metadata.robots as { index?: boolean; follow?: boolean };
    expect(robots.index).toBe(false);
    expect(robots.follow).toBe(false);
  });
});
