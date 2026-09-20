import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';
import Home from '@/app/page';
import NotFound from '@/app/not-found';
import RecommendationsPage from '@/app/recommendations/page';
import WorkIndex from '@/app/work/page';
import CaseStudyPage from '@/app/work/[slug]/page';
import WritingIndex from '@/app/writing/page';
import PostPage from '@/app/writing/[slug]/page';
import ArchivePage from '@/app/archive/[era]/page';
import { ARCHIVE_ERAS } from '@/content/schema';
import { listPosts } from '@/lib/writing';

/**
 * Every page type, checked with axe, in one place.
 *
 * These assertions used to be scattered through the page tests in tests/unit,
 * where they were both the slowest thing in that lane — archive-page alone took
 * eighty seconds, nearly all of it axe — and invisible as a number. Accessibility
 * is a credibility surface on this site, so it gets its own suite and its own
 * count, and the unit lane gets fast enough to run on every save (SPEC-0001 R1).
 *
 * Axe over a whole page takes seconds and grows with the content, so each gets a
 * generous explicit timeout rather than vitest's 5s default, which flaked under
 * parallel load. A timed-out axe run also leaves its global lock set and fails
 * the next one, so the budget is deliberate rather than optimistic.
 */
const AXE_TIMEOUT = 40_000;

/** Async server components: await the element, then render it like any JSX. */
const renderAsync = async (element: Promise<React.ReactElement>) => render(await element);

async function expectNoViolations(container: HTMLElement) {
  expect(await axe(container)).toHaveNoViolations();
}

beforeEach(() => cleanup());

describe('accessibility — the landing page', () => {
  it(
    'has no violations, menu closed or open',
    async () => {
      const { container } = render(<Home />);
      await expectNoViolations(container);

      fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
      await expectNoViolations(container);
    },
    AXE_TIMEOUT,
  );
});

describe('accessibility — the standalone pages', () => {
  it(
    'the recommendations page',
    async () => {
      await expectNoViolations(render(<RecommendationsPage />).container);
    },
    AXE_TIMEOUT,
  );

  it(
    'the 404 page',
    async () => {
      await expectNoViolations(render(<NotFound />).container);
    },
    AXE_TIMEOUT,
  );

  it(
    'the /work/ index',
    async () => {
      await expectNoViolations(render(<WorkIndex />).container);
    },
    AXE_TIMEOUT,
  );

  it(
    'the /writing/ index',
    async () => {
      await expectNoViolations(render(<WritingIndex />).container);
    },
    AXE_TIMEOUT,
  );
});

describe('accessibility — the generated pages', () => {
  /**
   * Five project pages rather than all of them: they share one template, and
   * these cover its variants — gallery, clips, process diagram, compact. A page
   * with seven <video> elements and their tracks is the expensive case.
   */
  it.each(['playground', 'speech-intelligence', 'vssc-tooling', 'aircare', 'bmp2-turret'])(
    'the project page for %s',
    async (slug) => {
      const { container } = await renderAsync(CaseStudyPage({ params: Promise.resolve({ slug }) }));
      await expectNoViolations(container);
    },
    AXE_TIMEOUT,
  );

  it.each(ARCHIVE_ERAS)(
    'the %s archive page',
    async (era) => {
      const { container } = await renderAsync(ArchivePage({ params: Promise.resolve({ era }) }));
      await expectNoViolations(container);
    },
    AXE_TIMEOUT,
  );

  it(
    'a writing post, which carries compiled markdown rather than authored JSX',
    async () => {
      const [first] = listPosts();
      const { container } = await renderAsync(
        PostPage({ params: Promise.resolve({ slug: first.slug }) }),
      );
      await expectNoViolations(container);
    },
    AXE_TIMEOUT,
  );
});
