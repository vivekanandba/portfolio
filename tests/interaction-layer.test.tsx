import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { nowSchema, tourSchema } from '@/content/schema';
import { tours } from '@/content/tours';
import { now } from '@/content/now';
import { projects } from '@/content/experience';
import { certifications } from '@/content/certifications';
import { Now } from '@/components/Now';
import { CommandPalette, buildIndex } from '@/components/CommandPalette';
import { archivePaletteEntries } from '@/lib/palette';

// A shared router stub so navigation decisions can be asserted (setup.ts's
// default returns a fresh fn per call, which cannot be observed).
const push = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push, prefetch: vi.fn() }),
  usePathname: () => '/',
}));

/**
 * Interaction layer (ADR-0012): audience-path tours, a command palette over a
 * build-time index, and a dated Now section. Written before implementation
 * (SPEC §9.2). Progressive enhancement is the contract: nothing here may be
 * required to read the site.
 */

// Section ids that exist on the landing page (mirrors app/page.tsx).
const SECTION_IDS = new Set([
  'top',
  'turning-points',
  'about',
  'work',
  'agents',
  'skills',
  'recommendations',
  'journey',
  'now',
  'credentials',
  'contact',
]);
const PROJECT_IDS = new Set(projects.map((p) => p.id));

describe('tours content', () => {
  it('parses and there are exactly the three audiences', () => {
    for (const t of tours) expect(() => tourSchema.parse(t)).not.toThrow();
    expect(tours.map((t) => t.id).sort()).toEqual(['builder', 'engineer', 'hiring']);
  });

  it('every stop resolves to a real section or project page', () => {
    for (const t of tours) {
      expect(t.stops.length).toBeGreaterThanOrEqual(4);
      expect(t.stops.length).toBeLessThanOrEqual(7);
      for (const stop of t.stops) {
        if (stop.target.startsWith('#')) {
          expect(
            SECTION_IDS.has(stop.target.slice(1)),
            `tour "${t.id}" stop targets unknown section ${stop.target}`,
          ).toBe(true);
        } else {
          expect(
            PROJECT_IDS.has(stop.target),
            `tour "${t.id}" stop targets unknown project "${stop.target}"`,
          ).toBe(true);
        }
      }
    }
  });
});

describe('now content', () => {
  it('parses and states its month (the dated-snapshot rule)', () => {
    expect(() => nowSchema.parse(now)).not.toThrow();
    expect(now.month).toMatch(/^20\d{2}-(0[1-9]|1[0-2])$/);
  });
});

describe('<Now />', () => {
  it('renders the stated month and the newest certifications automatically', () => {
    render(<Now />);
    // The month must be visible — a Now section that hides its age is a lie.
    expect(screen.getByText(new RegExp(now.month.replace('-', '.?')))).toBeInTheDocument();
    // The three newest certifications surface without hand-editing.
    for (const c of certifications.slice(0, 3)) {
      expect(screen.getByText(c.name)).toBeInTheDocument();
    }
  });
});

describe('command palette', () => {
  it('builds a non-trivial index from content at module scope', () => {
    const index = buildIndex();
    // Every project page is reachable from the palette.
    for (const p of projects) {
      expect(
        index.some((e) => e.href.includes(`/work/${p.id}`)),
        `project ${p.id} missing from palette index`,
      ).toBe(true);
    }
    // Sections and certifications are represented too.
    expect(index.some((e) => e.href === '#turning-points')).toBe(true);
    expect(index.length).toBeGreaterThan(projects.length + 5);
  });

  it('traps focus while open and returns it on close', () => {
    render(
      <>
        <button type="button">outside</button>
        <CommandPalette />
      </>,
    );
    const outside = screen.getByRole('button', { name: 'outside' });
    outside.focus();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    const input = screen.getByRole('combobox');
    expect(input).toHaveFocus();
    // Tab must not escape the dialog.
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(input).toHaveFocus();
    // Focus goes back where it came from on close.
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(outside).toHaveFocus();
  });

  it('opens on ctrl-k, filters, and closes on escape', () => {
    render(<CommandPalette />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    const dialog = screen.getByRole('dialog', { name: /search/i });
    expect(dialog).toBeInTheDocument();
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'dicom' } });
    expect(
      screen.getByRole('option', { name: /healthcare interoperability/i }),
    ).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('command palette — routes outside /work/ (ADR-0016)', () => {
  it('indexes server-provided extra entries, such as the archive', () => {
    const extra = archivePaletteEntries();
    expect(extra.length).toBeGreaterThan(20);
    for (const e of extra) expect(e.href).toMatch(/^\/archive\/[a-z]+\/$/);
    const index = buildIndex(extra);
    expect(index.length).toBe(buildIndex().length + extra.length);
    render(<CommandPalette extra={extra} />);
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'windmill' } });
    expect(screen.getByRole('option', { name: /windmill/i })).toBeInTheDocument();
  });

  it('scrolls to a section that exists on the current page instead of routing home', () => {
    push.mockClear();
    render(
      <>
        <section id="turning-points" />
        <CommandPalette />
      </>,
    );
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'turning points' } });
    expect(screen.getByRole('option', { name: /turning points/i })).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' }); // the first result is the section
    expect(push).not.toHaveBeenCalled();
    expect(window.location.hash).toBe('#turning-points');
  });

  it('routes home when the section is absent — whatever the pathname is', () => {
    push.mockClear();
    window.location.hash = '';
    render(<CommandPalette />);
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'the arc' } });
    expect(screen.getByRole('option', { name: /the arc/i })).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });
    expect(push).toHaveBeenCalledWith('/#about');
  });
});
