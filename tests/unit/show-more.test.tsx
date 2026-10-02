import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ShowMore } from '@/components/ShowMore';

/**
 * Disclosure grows open and snaps shut (SPEC-0011 R12). The grow is CSS — a
 * grid row from 0fr to 1fr, started by @starting-style when `hidden` comes off
 * — so what React owns is the clip during the grow and the `hidden` attribute.
 */
describe('ShowMore', () => {
  afterEach(() => vi.useRealTimers());

  it('keeps the content in the DOM, hidden, until opened', () => {
    render(
      <ShowMore label="Show all">
        <p>More</p>
      </ShowMore>,
    );
    const region = screen.getByText('More').parentElement!.parentElement!;
    expect(region).toHaveAttribute('hidden');
    expect(region.className).toContain('disclosure');
  });

  it('clips the content while it grows, then lets hover shadows breathe again', () => {
    vi.useFakeTimers();
    render(
      <ShowMore label="Show all">
        <p>More</p>
      </ShowMore>,
    );
    fireEvent.click(screen.getByRole('button', { name: /show all/i }));
    const inner = screen.getByText('More').parentElement!;
    const region = inner.parentElement!;
    expect(region).not.toHaveAttribute('hidden');
    expect(inner.className).toContain('overflow-hidden');
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(inner.className).not.toContain('overflow-hidden');
  });

  it('closes at once, so the content leaves the accessibility tree immediately', () => {
    render(
      <ShowMore label="Show all">
        <p>More</p>
      </ShowMore>,
    );
    const button = screen.getByRole('button', { name: /show all/i });
    fireEvent.click(button);
    fireEvent.click(screen.getByRole('button', { name: /show less/i }));
    expect(screen.getByText('More').parentElement!.parentElement!).toHaveAttribute('hidden');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
