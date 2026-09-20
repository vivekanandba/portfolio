import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { Reveal } from '@/components/Reveal';

/**
 * jsdom has no IntersectionObserver, so without a stub every test takes the
 * "no IO → show immediately" fallback and the observer path — the one that
 * actually runs in a browser — is never executed. These install a stub and
 * drive the callback by hand.
 */
type IOCallback = (entries: { isIntersecting: boolean }[]) => void;

const observed: { callback: IOCallback; disconnect: ReturnType<typeof vi.fn> }[] = [];

function installObserver() {
  const original = globalThis.IntersectionObserver;
  class StubObserver {
    disconnect = vi.fn();
    constructor(public callback: IOCallback) {
      observed.push({ callback, disconnect: this.disconnect });
    }
    observe = vi.fn();
    unobserve = vi.fn();
    takeRecords = () => [];
    root = null;
    rootMargin = '';
    thresholds = [];
  }
  globalThis.IntersectionObserver = StubObserver as unknown as typeof IntersectionObserver;
  return () => {
    globalThis.IntersectionObserver = original;
  };
}

afterEach(() => {
  observed.length = 0;
});

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
    // Content must never be stranded invisible on a browser without IO.
    await waitFor(() => {
      render(
        <Reveal>
          <p>no-io content</p>
        </Reveal>,
      );
      expect(screen.getByText('no-io content').parentElement).toHaveClass('is-visible');
    });
  });

  it('starts hidden and reveals only once the element intersects', async () => {
    const restore = installObserver();
    try {
      render(
        <Reveal>
          <p>scrolled content</p>
        </Reveal>,
      );
      const box = screen.getByText('scrolled content').parentElement!;
      expect(box).not.toHaveClass('is-visible');

      expect(observed).toHaveLength(1);
      act(() => observed[0].callback([{ isIntersecting: true }]));
      await waitFor(() => expect(box).toHaveClass('is-visible'));

      // Revealing is one-way: stop observing so scrolling back doesn't re-run it.
      expect(observed[0].disconnect).toHaveBeenCalled();
    } finally {
      restore();
    }
  });

  it('stays hidden while the element is out of view', () => {
    const restore = installObserver();
    try {
      render(
        <Reveal>
          <p>below the fold</p>
        </Reveal>,
      );
      const box = screen.getByText('below the fold').parentElement!;
      act(() => observed[0].callback([{ isIntersecting: false }]));
      expect(box).not.toHaveClass('is-visible');
      expect(observed[0].disconnect).not.toHaveBeenCalled();
    } finally {
      restore();
    }
  });

  it('disconnects the observer when unmounted', () => {
    const restore = installObserver();
    try {
      const { unmount } = render(
        <Reveal>
          <p>transient</p>
        </Reveal>,
      );
      unmount();
      expect(observed[0].disconnect).toHaveBeenCalled();
    } finally {
      restore();
    }
  });

  it('applies a stagger delay only when one is given', () => {
    render(
      <Reveal delay={120} className="extra">
        <p>delayed</p>
      </Reveal>,
    );
    const box = screen.getByText('delayed').parentElement!;
    expect(box).toHaveStyle({ transitionDelay: '120ms' });
    expect(box).toHaveClass('extra');

    render(
      <Reveal>
        <p>immediate</p>
      </Reveal>,
    );
    expect(screen.getByText('immediate').parentElement!.style.transitionDelay).toBe('');
  });
});
