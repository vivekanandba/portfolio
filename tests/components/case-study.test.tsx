import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import CaseStudyPage, { generateStaticParams } from '@/app/work/[slug]/page';
import { ProjectCard } from '@/components/ProjectCard';
import { caseStudies, projects } from '@/content';

/** Async server component: await the element, then render it like any JSX. */
async function renderCaseStudy(slug: string) {
  const element = await CaseStudyPage({ params: Promise.resolve({ slug }) });
  return render(element);
}

describe('case-study pages', () => {
  it('generateStaticParams covers every case study', () => {
    expect(generateStaticParams()).toEqual(caseStudies.map((cs) => ({ slug: cs.slug })));
  });

  it.each(caseStudies.map((cs) => [cs.slug, cs] as const))(
    '%s renders the full article structure',
    async (_slug, cs) => {
      await renderCaseStudy(cs.slug);
      expect(screen.getByRole('heading', { level: 1, name: cs.title })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'The problem' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Constraints' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Decisions & tradeoffs' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Measured results' })).toBeInTheDocument();
      for (const m of cs.metrics) {
        expect(screen.getAllByText(m.value).length).toBeGreaterThan(0);
      }
      // The annotated systems diagram is present and named for screen readers.
      expect(screen.getByRole('img')).toHaveAccessibleName();
      // The way back.
      expect(screen.getByRole('link', { name: /back to all work/i })).toHaveAttribute(
        'href',
        '/#work',
      );
    },
  );

  it('has no axe violations (spot check: playground)', async () => {
    const { container } = await renderCaseStudy('playground');
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('ProjectCard link variants', () => {
  const withStudy = projects.find((p) => p.id === 'playground')!;
  const withHref = projects.find((p) => p.id === 'speech-intelligence')!;
  const plain = projects.find((p) => p.id === 'unified-ml-platform')!;

  it('renders a stretched case-study link when given caseStudyHref', () => {
    render(<ProjectCard project={withStudy} caseStudyHref="/work/playground/" />);
    // next/link normalizes the trailing slash outside the real build; e2e
    // asserts the slashed URL against the static export.
    expect(screen.getByRole('link', { name: /read the case study/i })).toHaveAttribute(
      'href',
      expect.stringMatching(/^\/work\/playground\/?$/),
    );
  });

  it('renders the external proof link on href-only cards', () => {
    render(<ProjectCard project={withHref} />);
    const link = screen.getByRole('link', { name: new RegExp(withHref.linkLabel!) });
    expect(link).toHaveAttribute('href', withHref.href);
    expect(link).toHaveAttribute('target', '_blank');
    expect(screen.queryByRole('link', { name: /read the case study/i })).not.toBeInTheDocument();
  });

  it('renders no link footer when the project has neither', () => {
    render(<ProjectCard project={plain} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
