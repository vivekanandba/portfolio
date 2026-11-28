import { describe, it, expect, afterEach } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { roles, turningPoints } from '@/content';
import { Fold } from '@/components/Fold';
import { FoldAll } from '@/components/FoldAll';
import { TurningPoints } from '@/components/TurningPoints';
import { Timeline } from '@/components/Timeline';

/**
 * Records read summary first (SPEC-0006 R13, SPEC-0010 R11, SPEC-0011 R16).
 * What folds is the detail; what a reader needs in order to decide whether to
 * open it never does. Written before the components and watched fail.
 */
const closedFold = (el: Element) => el.closest('details.fold') as HTMLDetailsElement | null;

/** React's serializer escapes text; compare against the same escaping. */
const escaped = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');

describe('<Fold />', () => {
  it('is a native details, closed, whose summary names the record it belongs to', () => {
    render(
      <Fold label="Highlights" name="Acme">
        <p>Inside</p>
      </Fold>,
    );
    const details = closedFold(screen.getByText('Inside'))!;
    expect(details).not.toBeNull();
    expect(details.tagName).toBe('DETAILS');
    expect(details.open).toBe(false);
    const summary = details.querySelector('summary')!;
    expect(summary.textContent).toContain('Highlights');
    expect(summary.textContent).toContain('Acme');
    // 44px: the smallest target a thumb reliably hits.
    expect(summary.className).toMatch(/\bmin-h-11\b/);
    // The control is the first child, as the content model requires.
    expect(details.firstElementChild).toBe(summary);
  });
});

describe('<TurningPoints /> folded (SPEC-0006 R13)', () => {
  it('folds Saw, Bet and Cost behind one closed disclosure per record', () => {
    render(<TurningPoints />);
    for (const tp of turningPoints) {
      const folds = new Set(
        [tp.saw, tp.bet, tp.cost].map((text) => closedFold(screen.getByText(text))),
      );
      expect(folds.size, `"${tp.title}" folds its three fields together`).toBe(1);
      const [details] = [...folds];
      expect(details, `"${tp.title}" detail is not inside a fold`).not.toBeNull();
      expect(details!.open).toBe(false);
    }
  });

  it('never folds the title, what it proved, or the links to the evidence', () => {
    render(<TurningPoints />);
    for (const tp of turningPoints) {
      expect(closedFold(screen.getByText(tp.title))).toBeNull();
      expect(closedFold(screen.getByText(tp.proved))).toBeNull();
      const record = screen.getByText(tp.title).closest('li')!;
      for (const link of within(record).getAllByRole('link')) {
        expect(closedFold(link), `${link.getAttribute('href')} is folded away`).toBeNull();
      }
    }
  });

  it('keeps the title a heading outside the control, and names the control after it', () => {
    render(<TurningPoints />);
    for (const tp of turningPoints) {
      const heading = screen.getByRole('heading', { level: 3, name: tp.title });
      expect(heading.closest('summary')).toBeNull();
      const summary = heading.closest('li')!.querySelector('details.fold > summary')!;
      expect(summary.textContent).toContain(tp.title);
      expect(summary.textContent).toMatch(/saw, bet and cost/i);
    }
  });

  it('gives each record an id a link can open, and no two the same', () => {
    render(<TurningPoints />);
    const ids = turningPoints.map((tp) => {
      const record = screen.getByText(tp.title).closest('li')!;
      expect(record.id).toBe(`tp-${tp.year}`);
      return record.id;
    });
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('serves all four fields in the HTML, folded or not', () => {
    const html = renderToStaticMarkup(<TurningPoints />);
    for (const tp of turningPoints) {
      for (const field of [tp.saw, tp.bet, tp.cost, tp.proved]) {
        expect(html, `"${tp.title}" lost a field from the served HTML`).toContain(escaped(field));
      }
    }
    // Closed on the server: `open` is the reader's choice, never the default.
    expect(html).not.toMatch(/<details[^>]*\sopen/);
  });

  it('offers one control for the whole section', () => {
    render(<TurningPoints />);
    const section = screen.getByRole('region', { name: /turning points/i });
    expect(within(section).getAllByRole('button', { name: /^open all$/i })).toHaveLength(1);
  });
});

describe('<Timeline /> folded (SPEC-0010 R11)', () => {
  it('folds each role’s highlights and nothing else', () => {
    render(<Timeline />);
    for (const role of roles) {
      const heading = screen.getByRole('heading', {
        level: 3,
        name: `${role.title} · ${role.company}`,
      });
      expect(closedFold(heading)).toBeNull();
      const record = heading.closest('li')!;
      expect(closedFold(within(record).getByText(role.period))).toBeNull();
      const folds = new Set(role.highlights.map((h) => closedFold(within(record).getByText(h))));
      expect(folds.size, `${role.company} folds its highlights together`).toBe(1);
      const [details] = [...folds];
      expect(details).not.toBeNull();
      expect(details!.open).toBe(false);
      const summary = details!.querySelector('summary')!;
      expect(summary.textContent).toMatch(/highlights/i);
      expect(summary.textContent).toContain(role.company);
    }
  });

  it('serves every highlight in the HTML', () => {
    const html = renderToStaticMarkup(<Timeline />);
    for (const role of roles) {
      for (const h of role.highlights) expect(html).toContain(escaped(h));
    }
    expect(html).not.toMatch(/<details[^>]*\sopen/);
  });

  it('offers one control for the whole section', () => {
    render(<Timeline />);
    const section = screen.getByRole('region', { name: /the journey/i });
    expect(within(section).getAllByRole('button', { name: /^open all$/i })).toHaveLength(1);
  });
});

describe('<FoldAll /> (SPEC-0011 R16)', () => {
  afterEach(() => {
    window.location.hash = '';
  });

  /** A section with three records, the middle one addressable. */
  function Fixture({ target = 'records' }: { target?: string }) {
    return (
      <div>
        <section id="records">
          <FoldAll within={target} />
          <ol>
            {['a', 'b', 'c'].map((k) => (
              <li key={k} id={`rec-${k}`}>
                <Fold label="More" name={k}>
                  <p>{`detail ${k}`}</p>
                </Fold>
              </li>
            ))}
          </ol>
        </section>
        <div id="elsewhere">
          <details className="fold" data-testid="outsider">
            <summary>Not this section</summary>
          </details>
        </div>
      </div>
    );
  }
  const folds = () => ['a', 'b', 'c'].map((k) => closedFold(screen.getByText(`detail ${k}`))!);
  /** jsdom queues `toggle` as a task, like a browser; the tests do not wait on
   *  its timing — they deliver the event the browser would. */
  const toggled = (d: HTMLDetailsElement, open: boolean) =>
    act(() => {
      d.open = open;
      d.dispatchEvent(new Event('toggle'));
    });

  it('is marked as needing JavaScript, so the stylesheet can withhold it', () => {
    render(<Fixture />);
    const button = screen.getByRole('button', { name: /open all/i });
    expect(button.closest('[data-needs-js]')).not.toBeNull();
    // A control, not content: paper has no use for it.
    expect(button.closest('[data-print-hide]')).not.toBeNull();
  });

  it('opens every record in its section and then offers to close them', () => {
    render(<Fixture />);
    fireEvent.click(screen.getByRole('button', { name: /open all/i }));
    expect(folds().map((d) => d.open)).toEqual([true, true, true]);
    expect(screen.getByTestId('outsider')).not.toHaveAttribute('open');
    fireEvent.click(screen.getByRole('button', { name: /close all/i }));
    expect(folds().map((d) => d.open)).toEqual([false, false, false]);
    expect(screen.getByRole('button', { name: /open all/i })).toBeInTheDocument();
  });

  it('says "Close all" only while every record is open, however they got that way', () => {
    render(<Fixture />);
    const [a, b, c] = folds();
    toggled(a, true);
    toggled(b, true);
    expect(screen.getByRole('button', { name: /open all/i })).toBeInTheDocument();
    toggled(c, true);
    expect(screen.getByRole('button', { name: /close all/i })).toBeInTheDocument();
    toggled(b, false);
    const button = screen.getByRole('button', { name: /open all/i });
    // One closed: the control opens the rest rather than closing the two.
    fireEvent.click(button);
    expect(folds().map((d) => d.open)).toEqual([true, true, true]);
  });

  it('opens the record a link points at when the page loads', () => {
    window.location.hash = '#rec-b';
    render(<Fixture />);
    expect(folds().map((d) => d.open)).toEqual([false, true, false]);
  });

  it('opens the record a link points at when the hash changes', () => {
    render(<Fixture />);
    act(() => {
      window.location.hash = '#rec-c';
      window.dispatchEvent(new Event('hashchange'));
    });
    expect(folds().map((d) => d.open)).toEqual([false, false, true]);
  });

  it('ignores a hash that names nothing, or something outside its section', () => {
    window.location.hash = '#elsewhere';
    render(<Fixture />);
    expect(folds().map((d) => d.open)).toEqual([false, false, false]);
    expect(screen.getByTestId('outsider')).not.toHaveAttribute('open');
    act(() => {
      window.location.hash = '#no-such-id';
      window.dispatchEvent(new Event('hashchange'));
    });
    expect(folds().map((d) => d.open)).toEqual([false, false, false]);
  });

  it('leaves every record closed when the link names the section itself', () => {
    // The navigation bar links to the section. A section contains itself, so
    // "the target is inside my section" is true of it — and every record
    // opened on the most common way into the section.
    window.location.hash = '#records';
    render(<Fixture />);
    expect(folds().map((d) => d.open)).toEqual([false, false, false]);
    act(() => {
      window.location.hash = '';
      window.location.hash = '#records';
      window.dispatchEvent(new Event('hashchange'));
    });
    expect(folds().map((d) => d.open)).toEqual([false, false, false]);
  });

  it('opens everything before the page is printed', () => {
    render(<Fixture />);
    act(() => {
      window.dispatchEvent(new Event('beforeprint'));
    });
    expect(folds().map((d) => d.open)).toEqual([true, true, true]);
  });

  it('puts the page back as the reader had it once printing is over', () => {
    render(<Fixture />);
    const [, b] = folds();
    toggled(b, true);
    act(() => {
      window.dispatchEvent(new Event('beforeprint'));
    });
    expect(folds().map((d) => d.open)).toEqual([true, true, true]);
    act(() => {
      window.dispatchEvent(new Event('afterprint'));
    });
    // The one they opened stays open; the two the print opened close again.
    expect(folds().map((d) => d.open)).toEqual([false, true, false]);
    // A second `afterprint` with no print before it closes nothing.
    act(() => {
      window.dispatchEvent(new Event('afterprint'));
    });
    expect(folds().map((d) => d.open)).toEqual([false, true, false]);
  });

  it('does nothing, and does not throw, when its section is not on the page', () => {
    render(<Fixture target="missing" />);
    const button = screen.getByRole('button', { name: /open all/i });
    expect(() => fireEvent.click(button)).not.toThrow();
    expect(folds().map((d) => d.open)).toEqual([false, false, false]);
  });

  it('stops listening once it leaves the page', () => {
    const { unmount } = render(<Fixture />);
    const kept = folds();
    const host = document.createElement('section');
    host.id = 'records';
    unmount();
    // The same shape, rebuilt by hand: nothing of the component is left to act on it.
    kept.forEach((d) => host.appendChild(d));
    document.body.appendChild(host);
    window.dispatchEvent(new Event('beforeprint'));
    window.location.hash = '#records';
    window.dispatchEvent(new Event('hashchange'));
    expect(kept.map((d) => d.open)).toEqual([false, false, false]);
    host.remove();
  });
});
