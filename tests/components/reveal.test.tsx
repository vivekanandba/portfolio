import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Reveal } from '@/components/Reveal';

describe('Reveal', () => {
  it('always renders its children in the DOM', () => {
    render(
      <Reveal>
        <p>revealed content</p>
      </Reveal>,
    );
    expect(screen.getByText('revealed content')).toBeInTheDocument();
  });

  it('falls back to visible when IntersectionObserver is unavailable', async () => {
    render(
      <Reveal>
        <p>revealed content</p>
      </Reveal>,
    );
    await waitFor(() =>
      expect(screen.getByText('revealed content').parentElement).toHaveClass('is-visible'),
    );
  });
});
