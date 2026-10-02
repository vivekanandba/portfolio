import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { MetricBadge, parseMetric } from '@/components/MetricBadge';

/**
 * A metric counts up only when it can be read with certainty (SPEC-0011 R14).
 * The parser is the whole decision, so it is tested as a table against the
 * shapes the content actually uses.
 */
describe('parseMetric', () => {
  it.each([
    ['15,000+', { prefix: '', number: 15000, decimals: 0, grouped: true, suffix: '+' }],
    ['4.7★', { prefix: '', number: 4.7, decimals: 1, grouped: false, suffix: '★' }],
    ['430k/day', { prefix: '', number: 430, decimals: 0, grouped: false, suffix: 'k/day' }],
    ['<100ms', { prefix: '<', number: 100, decimals: 0, grouped: false, suffix: 'ms' }],
    ['< 100 mΩ', { prefix: '< ', number: 100, decimals: 0, grouped: false, suffix: ' mΩ' }],
    ['0.96', { prefix: '', number: 0.96, decimals: 2, grouped: false, suffix: '' }],
    ['55,475', { prefix: '', number: 55475, decimals: 0, grouped: true, suffix: '' }],
    ['12 sites', { prefix: '', number: 12, decimals: 0, grouped: false, suffix: ' sites' }],
  ])('reads %j as one number with its dressing', (value, parsed) => {
    expect(parseMetric(value)).toEqual(parsed);
  });

  it.each([
    '1–3% → 100%',
    'A350 XWB',
    '23/69',
    '2013 – 2018',
    '100×90×50 mm',
    '6 → 108 ch',
    '67% / 66% / 53%',
    'FDA-cleared',
    '300 A · 5 V DC',
    '',
  ])('refuses %j — more than one number, or a number that is a name', (value) => {
    expect(parseMetric(value)).toBeNull();
  });
});

type IOCallback = (entries: { isIntersecting: boolean }[]) => void;
const observers: { callback: IOCallback; disconnect: ReturnType<typeof vi.fn> }[] = [];
function installObserver() {
  const original = globalThis.IntersectionObserver;
  class Stub {
    disconnect = vi.fn();
    constructor(public callback: IOCallback) {
      observers.push({ callback, disconnect: this.disconnect });
    }
    observe = vi.fn();
    unobserve = vi.fn();
    takeRecords = () => [];
    root = null;
    rootMargin = '';
    thresholds = [];
  }
  globalThis.IntersectionObserver = Stub as unknown as typeof IntersectionObserver;
  return () => {
    globalThis.IntersectionObserver = original;
  };
}

describe('MetricBadge', () => {
  const restores: (() => void)[] = [];
  afterEach(() => {
    observers.length = 0;
    for (const r of restores.splice(0)) r();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders the final value as written where nothing can observe it', () => {
    render(<MetricBadge value="15,000+" label="repairs" />);
    expect(screen.getByText('15,000+')).toBeInTheDocument();
    expect(screen.getByText('repairs')).toBeInTheDocument();
  });

  it('renders an unparseable value exactly as today, and never observes it', () => {
    restores.push(installObserver());
    render(<MetricBadge value="1–3% → 100%" label="coverage" />);
    expect(screen.getByText('1–3% → 100%')).toBeInTheDocument();
    expect(observers).toHaveLength(0);
  });

  it('counts from nothing to exactly the value as written once it scrolls into view', () => {
    vi.useFakeTimers();
    restores.push(installObserver());
    render(<MetricBadge value="15,000+" label="repairs" />);
    expect(observers).toHaveLength(1);
    // Off screen: shows the start of the count, not a flash of the answer.
    act(() => observers[0].callback([{ isIntersecting: false }]));
    expect(screen.getByText('0+')).toBeInTheDocument();
    act(() => observers[0].callback([{ isIntersecting: true }]));
    expect(observers[0].disconnect).toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('15,000+')).toBeInTheDocument();
  });

  it('keeps decimals and prefixes through the count', () => {
    vi.useFakeTimers();
    restores.push(installObserver());
    render(<MetricBadge value="<4.7★" label="rating" />);
    act(() => observers[0].callback([{ isIntersecting: true }]));
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('<4.7★')).toBeInTheDocument();
  });

  it('does not move under reduced motion', () => {
    restores.push(installObserver());
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: () => {},
      removeEventListener: () => {},
    } as unknown as MediaQueryList);
    render(<MetricBadge value="430k/day" label="requests" />);
    expect(observers).toHaveLength(0);
    expect(screen.getByText('430k/day')).toBeInTheDocument();
  });
});
