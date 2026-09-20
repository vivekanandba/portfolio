import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { Nav } from '@/components/Nav';

describe('Nav mobile menu', () => {
  it('toggles the menu and aria-expanded on button click', () => {
    render(<Nav />);
    const button = screen.getByRole('button', { name: /open menu/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('list', { name: '' })).toBeTruthy(); // desktop list always in DOM

    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(document.getElementById('mobile-menu')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /close menu/i }));
    expect(document.getElementById('mobile-menu')).not.toBeInTheDocument();
  });

  it('closes the menu when a link is clicked', () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    const menu = document.getElementById('mobile-menu')!;
    const skillsLink = Array.from(menu.querySelectorAll('a')).find(
      (a) => a.textContent === 'Skills',
    )!;
    fireEvent.click(skillsLink);
    expect(document.getElementById('mobile-menu')).not.toBeInTheDocument();
  });
});

/**
 * The theme toggle and the scroll spy are the two pieces of Nav that only run
 * in a browser, and both were uncovered: the toggle's click handler, its
 * localStorage failure path, and the whole IntersectionObserver effect.
 */
describe('Nav theme toggle', () => {
  afterEach(() => {
    delete document.documentElement.dataset.theme;
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('offers dark when the page is light, and flips on click', () => {
    render(<Nav />);
    const button = screen.getByRole('button', { name: /switch to dark theme/i });

    fireEvent.click(button);

    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(screen.getByRole('button', { name: /switch to light theme/i })).toBeInTheDocument();
  });

  it('flips back to light on a second click', () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole('button', { name: /switch to dark theme/i }));
    fireEvent.click(screen.getByRole('button', { name: /switch to light theme/i }));

    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('reflects a theme already chosen before paint', () => {
    document.documentElement.dataset.theme = 'dark';
    render(<Nav />);
    // Already dark, so the button offers the other direction.
    expect(screen.getByRole('button', { name: /switch to light theme/i })).toBeInTheDocument();
  });

  it('follows the OS preference when nothing has been chosen', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      media: '(prefers-color-scheme: dark)',
      addEventListener: () => {},
      removeEventListener: () => {},
    } as unknown as MediaQueryList);

    render(<Nav />);
    expect(screen.getByRole('button', { name: /switch to light theme/i })).toBeInTheDocument();
  });

  it('still switches the theme when localStorage refuses to persist it', () => {
    // Private mode: setItem throws. The page must still change appearance.
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('QuotaExceededError');
    });

    render(<Nav />);
    expect(() =>
      fireEvent.click(screen.getByRole('button', { name: /switch to dark theme/i })),
    ).not.toThrow();
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});

describe('Nav scroll spy', () => {
  type IOCallback = (entries: { isIntersecting: boolean; target: { id: string } }[]) => void;
  let callbacks: IOCallback[] = [];
  let disconnects: ReturnType<typeof vi.fn>[] = [];
  let original: typeof IntersectionObserver;

  beforeEach(() => {
    callbacks = [];
    disconnects = [];
    original = globalThis.IntersectionObserver;
    class StubObserver {
      disconnect = vi.fn();
      constructor(cb: IOCallback) {
        callbacks.push(cb);
        disconnects.push(this.disconnect);
      }
      observe = vi.fn();
      unobserve = vi.fn();
      takeRecords = () => [];
      root = null;
      rootMargin = '';
      thresholds = [];
    }
    globalThis.IntersectionObserver = StubObserver as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    globalThis.IntersectionObserver = original;
    document.body.innerHTML = '';
  });

  /** The spy only observes sections that exist, so the page must supply them. */
  function withSections() {
    for (const id of ['turning-points', 'work', 'skills']) {
      const section = document.createElement('section');
      section.id = id;
      document.body.appendChild(section);
    }
  }

  it('marks the nav link for the section in view', async () => {
    withSections();
    render(<Nav />);
    expect(callbacks).toHaveLength(1);

    act(() => callbacks[0]([{ isIntersecting: true, target: { id: 'work' } }]));

    await waitFor(() => {
      const work = screen.getAllByRole('link', { name: 'Work' })[0];
      expect(work).toHaveAttribute('aria-current', 'location');
    });
    expect(screen.getAllByRole('link', { name: 'Skills' })[0]).not.toHaveAttribute('aria-current');
  });

  it('ignores sections leaving the band', async () => {
    withSections();
    render(<Nav />);
    act(() => callbacks[0]([{ isIntersecting: false, target: { id: 'work' } }]));
    await waitFor(() =>
      expect(screen.getAllByRole('link', { name: 'Work' })[0]).not.toHaveAttribute('aria-current'),
    );
  });

  it('highlights Contact at the bottom of the page, which is too short to observe', async () => {
    withSections();
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 });
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 200 });

    render(<Nav />);
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() =>
      expect(screen.getAllByRole('link', { name: 'Contact' })[0]).toHaveAttribute(
        'aria-current',
        'location',
      ),
    );
  });

  it('stops observing when the nav unmounts', () => {
    withSections();
    const { unmount } = render(<Nav />);
    unmount();
    expect(disconnects[0]).toHaveBeenCalled();
  });

  it('degrades quietly where IntersectionObserver is unavailable', () => {
    globalThis.IntersectionObserver = undefined as unknown as typeof IntersectionObserver;
    expect(() => render(<Nav />)).not.toThrow();
    expect(screen.getAllByRole('link', { name: 'Work' })[0]).not.toHaveAttribute('aria-current');
  });
});
