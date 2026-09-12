import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { nowSchema, tourSchema } from '@/content/schema';
import { tours } from '@/content/tours';
import { now } from '@/content/now';
import { projects } from '@/content/experience';
import { certifications } from '@/content/certifications';
import { Now } from '@/components/Now';
import { CommandPalette, buildIndex } from '@/components/CommandPalette';

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
