import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { TourBar, TourButtons } from '@/components/Tours';
import { tours } from '@/content/tours';
import { projects } from '@/content/experience';

/**
 * The tour system survives page navigation via sessionStorage, so these tests
 * drive it the way a visitor does: start from a hero button, walk with
 * next/prev, exit. jsdom provides sessionStorage natively.
 */
const hiring = tours.find((t) => t.id === 'hiring')!;

beforeEach(() => {
  sessionStorage.clear();
});

describe('<TourButtons />', () => {
  it('renders one starter per tour', () => {
    render(<TourButtons />);
    for (const t of tours) {
      expect(screen.getByRole('button', { name: t.label })).toBeInTheDocument();
    }
  });

  it('starting a tour persists state and the bar appears', () => {
    render(
      <>
        <TourButtons />
        <TourBar />
      </>,
    );
    expect(screen.queryByRole('region', { name: /guided tour/i })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: hiring.label }));
    expect(JSON.parse(sessionStorage.getItem('portfolio-tour')!)).toEqual({
      id: 'hiring',
      step: 0,
    });
    const bar = screen.getByRole('region', { name: /guided tour/i });
    expect(bar).toHaveTextContent(hiring.stops[0].note);
  });
});

describe('<TourBar />', () => {
  it('renders nothing when no tour is active', () => {
    render(<TourBar />);
    expect(screen.queryByRole('region', { name: /guided tour/i })).not.toBeInTheDocument();
  });

  it('walks forward and back through the stops', () => {
    sessionStorage.setItem('portfolio-tour', JSON.stringify({ id: 'hiring', step: 0 }));
    render(<TourBar />);
    expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText(new RegExp(hiring.stops[1].note.slice(0, 24)))).toBeInTheDocument();
    // A project stop shows the project's title in the bar.
    const projectStop = hiring.stops[1];
    if (!projectStop.target.startsWith('#')) {
      const title = projects.find((p) => p.id === projectStop.target)!.title;
      expect(screen.getByText(new RegExp(`· ${title.slice(0, 16)}`))).toBeInTheDocument();
    }
    fireEvent.click(screen.getByRole('button', { name: /prev/i }));
    expect(screen.getByText(new RegExp(hiring.stops[0].note.slice(0, 24)))).toBeInTheDocument();
  });

  it('shows Done on the final stop, which ends the tour', () => {
    sessionStorage.setItem(
      'portfolio-tour',
      JSON.stringify({ id: 'hiring', step: hiring.stops.length - 1 }),
    );
    render(<TourBar />);
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /done/i }));
    expect(sessionStorage.getItem('portfolio-tour')).toBeNull();
    expect(screen.queryByRole('region', { name: /guided tour/i })).not.toBeInTheDocument();
  });

  it('the exit button abandons the tour from any stop', () => {
    sessionStorage.setItem('portfolio-tour', JSON.stringify({ id: 'engineer', step: 1 }));
    render(<TourBar />);
    fireEvent.click(screen.getByRole('button', { name: /exit the tour/i }));
    expect(sessionStorage.getItem('portfolio-tour')).toBeNull();
  });

  it('ignores corrupt stored state instead of crashing', () => {
    sessionStorage.setItem('portfolio-tour', '{not json');
    render(<TourBar />);
    expect(screen.queryByRole('region', { name: /guided tour/i })).not.toBeInTheDocument();
    sessionStorage.setItem('portfolio-tour', JSON.stringify({ id: 'no-such-tour', step: 0 }));
    render(<TourBar />);
    expect(screen.queryByRole('region', { name: /guided tour/i })).not.toBeInTheDocument();
  });
});
