import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import ArchivePage, { generateStaticParams } from '@/app/archive/[era]/page';
import CaseStudyPage from '@/app/work/[slug]/page';
import WorkIndex from '@/app/work/page';
import { archiveEntries, archiveExclusions } from '@/content';
import { ARCHIVE_ERAS } from '@/content/schema';

async function renderArchive(era: string) {
  const element = await ArchivePage({ params: Promise.resolve({ era }) });
  return render(element);
}

describe('the era archive page (ADR-0016)', () => {
  it('emits one static route per era', () => {
    expect(generateStaticParams()).toEqual(ARCHIVE_ERAS.map((era) => ({ era })));
  });

  it('renders every entry, its date state and role tag, and the exclusions', async () => {
    await renderArchive('legend');
    expect(screen.getByRole('heading', { level: 1, name: /Legend archive/i })).toBeInTheDocument();
    for (const e of archiveEntries) {
      expect(
        screen.getByRole('heading', {
          level: 3,
          name: new RegExp('^' + e.title.slice(0, 30).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
        }),
      ).toBeInTheDocument();
    }
    // Tri-state dates are visible words, not colours.
    // Undated items read as an archivist would write them, not as questions about himself.
    expect(screen.getAllByText(/^Undated$/).length).toBeGreaterThan(0);
    expect(screen.queryByText(/Records requested/)).toBeNull();
    expect(screen.queryByText(/my records table/i)).toBeNull();
    expect(screen.getAllByText(/before my time/i).length).toBeGreaterThan(0);
    // The exclusions render with their reasons.
    expect(screen.getByRole('heading', { name: /What was left out/i })).toBeInTheDocument();
    for (const x of archiveExclusions.slice(0, 5)) {
      expect(
        screen.getAllByText(
          new RegExp(x.reason.slice(0, 24).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
        ).length,
      ).toBeGreaterThan(0);
    }
    // Sources link into the committed transcript; project links use the site's routes.
    const transcriptLinks = screen
      .getAllByRole('link')
      .filter((a) => (a.getAttribute('href') ?? '').includes('source/decks/'));
    expect(transcriptLinks.length).toBeGreaterThan(archiveEntries.length / 2);
    expect(screen.getAllByRole('link', { name: /IGCAR Nuclear Slip Ring/ })[0]).toHaveAttribute(
      'href',
      expect.stringMatching(/^\/work\/igcar-slipring\/?$/),
    );
    for (const img of screen.getAllByRole('img')) expect(img).toHaveAccessibleName();
  });

  it('has no axe violations', async () => {
    const { container } = await renderArchive('legend');
    expect(await axe(container)).toHaveNoViolations();
  }, 40_000);
});

describe('the archive is reachable from the pages it elaborates', () => {
  it('a project page referenced by archive entries shows the In-the-archive block', async () => {
    const element = await CaseStudyPage({ params: Promise.resolve({ slug: 'igcar-slipring' }) });
    render(element);
    expect(screen.getByRole('link', { name: /Legend archive/i })).toHaveAttribute(
      'href',
      expect.stringMatching(/^\/archive\/legend\/?$/),
    );
  });

  it('a project page with no archive entries shows nothing', async () => {
    const element = await CaseStudyPage({ params: Promise.resolve({ slug: 'playground' }) });
    render(element);
    expect(screen.queryByRole('link', { name: /Legend archive/i })).not.toBeInTheDocument();
  });

  it('the /work/ index links the archive', () => {
    render(<WorkIndex />);
    expect(screen.getByRole('link', { name: /Legend archive/i })).toHaveAttribute(
      'href',
      expect.stringMatching(/^\/archive\/legend\/?$/),
    );
  });
});
