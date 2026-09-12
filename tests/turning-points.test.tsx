import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { turningPointSchema } from '@/content/schema';
import { turningPoints } from '@/content/turningPoints';
import { projects } from '@/content/experience';
import { TurningPoints } from '@/components/TurningPoints';

/**
 * Turning Points is the intentionality spine (ADR-0011): each pivot is a
 * decision record — Saw / Bet / Cost / Proved — whose `proved` claim must stay
 * checkable against the projects it links. These tests are written before the
 * implementation (SPEC §9.2).
 */
describe('turning points content', () => {
  it('parses against the schema and there are 4–6 of them', () => {
    for (const tp of turningPoints) {
      expect(() => turningPointSchema.parse(tp)).not.toThrow();
    }
    expect(turningPoints.length).toBeGreaterThanOrEqual(4);
    expect(turningPoints.length).toBeLessThanOrEqual(6);
  });

  it('is ordered chronologically (the journey reads forward)', () => {
    const years = turningPoints.map((tp) => tp.year);
    expect(years).toEqual([...years].sort((a, b) => a - b));
  });

  it('every linked project resolves to a real project id', () => {
    const ids = new Set(projects.map((p) => p.id));
    for (const tp of turningPoints) {
      for (const id of tp.projects) {
        expect(ids.has(id), `turning point "${tp.title}" links unknown project "${id}"`).toBe(true);
      }
      expect(
        tp.projects.length,
        `"${tp.title}" should anchor to at least one project`,
      ).toBeGreaterThan(0);
    }
  });

  it('every turning point declares a domain for the accent system', () => {
    for (const tp of turningPoints) {
      expect(tp.domain, `turning point "${tp.title}"`).toBeDefined();
    }
  });

  it('admits a real cost — the credibility mechanism is non-optional', () => {
    for (const tp of turningPoints) {
      expect(tp.cost.trim().length, `"${tp.title}" cost is a stub`).toBeGreaterThan(20);
    }
  });
});

describe('<TurningPoints />', () => {
  it('renders every pivot with its four record fields', () => {
    render(<TurningPoints />);
    for (const tp of turningPoints) {
      expect(screen.getByText(tp.title)).toBeInTheDocument();
      expect(screen.getByText(tp.saw)).toBeInTheDocument();
      expect(screen.getByText(tp.bet)).toBeInTheDocument();
      expect(screen.getByText(tp.cost)).toBeInTheDocument();
      expect(screen.getByText(tp.proved)).toBeInTheDocument();
    }
  });

  it('links each pivot to its era projects', () => {
    render(<TurningPoints />);
    for (const tp of turningPoints) {
      for (const id of tp.projects) {
        const project = projects.find((p) => p.id === id)!;
        expect(
          screen.getByRole('link', { name: new RegExp(project.title.slice(0, 24)) }),
        ).toHaveAttribute('href', expect.stringMatching(new RegExp(`/work/${id}/?$`)));
      }
    }
  });

  it('labels the section for the accessibility tree', () => {
    render(<TurningPoints />);
    expect(screen.getByRole('region', { name: /turning points/i })).toBeInTheDocument();
  });
});
