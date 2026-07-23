import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { AiPractice } from '@/components/AiPractice';
import { Skills } from '@/components/Skills';
import { Recommendations } from '@/components/Recommendations';
import { Timeline } from '@/components/Timeline';
import { Credentials } from '@/components/Credentials';
import { Contact } from '@/components/Contact';
import {
  aiPracticeSteps,
  caseStudyByProjectId,
  certifications,
  profile,
  featuredProjects,
  featuredRecommendations,
  languages,
  recommendations,
  secondaryProjects,
  skills,
  roles,
} from '@/content';

describe('Hero', () => {
  it('leads with the positioning headline, states the name, and shows the primary CTAs', () => {
    render(<Hero />);
    // The H1 is now the positioning claim, not the name.
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/production AI/i);
    expect(screen.getByText(profile.name)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view work/i })).toHaveAttribute('href', '#work');
    expect(screen.getByRole('link', { name: /download resume/i })).toHaveAttribute(
      'href',
      expect.stringContaining(profile.resumeFile),
    );
  });

  it('shows the domain-arc badge instead of availability copy', () => {
    render(<Hero />);
    expect(screen.getByText(profile.heroDomains.join(' → '))).toBeInTheDocument();
    // Screen-reader alternative without the arrow glyphs.
    expect(screen.getByText(profile.heroDomains.join(', '))).toBeInTheDocument();
    expect(screen.queryByText(/open to/i)).not.toBeInTheDocument();
  });

  it('shows the experience stats strip with the production stat', () => {
    render(<Hero />);
    const years = new Date().getFullYear() - profile.careerStartYear;
    expect(screen.getByText(`${years}+`)).toBeInTheDocument();
    expect(screen.getByText('years of engineering')).toBeInTheDocument();
    expect(screen.getByText(profile.heroStat.value)).toBeInTheDocument();
    expect(screen.getByText(profile.heroStat.label)).toBeInTheDocument();
    // Patent is a clickable credential linking to the granted US patent.
    expect(screen.getByRole('link', { name: /patent granted/i })).toHaveAttribute(
      'href',
      expect.stringContaining('patents.google.com'),
    );
    expect(screen.queryByText('domains mastered')).not.toBeInTheDocument();
  });

  it('states the current role and name in the hero eyebrow', () => {
    render(<Hero />);
    // Scope to the eyebrow line — the org also appears in the marquee and timeline.
    const eyebrow = screen.getByText(profile.name).closest('p');
    expect(eyebrow).toHaveTextContent(profile.currentRole.title);
    expect(eyebrow).toHaveTextContent(profile.currentRole.org);
  });
});

describe('About (The Arc)', () => {
  it('renders every arc beat title', () => {
    render(<About />);
    for (const beat of profile.arc) {
      expect(screen.getByText(beat.title)).toBeInTheDocument();
    }
  });
});

describe('Experience (Selected Work)', () => {
  it('renders a card per featured project with its first metric', () => {
    render(<Experience />);
    for (const p of featuredProjects) {
      expect(screen.getByRole('heading', { name: p.title })).toBeInTheDocument();
    }
    // Spot-check a headline metric persuades.
    expect(screen.getAllByText('430k/day').length).toBeGreaterThan(0);
  });

  it('renders the era chapters with every secondary project', () => {
    render(<Experience />);
    expect(screen.getByRole('heading', { name: /more across the arc/i })).toBeInTheDocument();
    for (const p of secondaryProjects) {
      expect(screen.getByRole('heading', { name: new RegExp(p.title) })).toBeInTheDocument();
    }
  });

  it('links every flagship with a case study and renders external proof links', () => {
    render(<Experience />);
    const caseStudyLinks = screen.getAllByRole('link', { name: /read the case study/i });
    const flagshipsWithStudies = featuredProjects.filter((p) => caseStudyByProjectId.has(p.id));
    expect(caseStudyLinks).toHaveLength(flagshipsWithStudies.length);
    for (const link of caseStudyLinks) {
      // next/link normalizes the trailing slash away outside the real build
      // (trailingSlash lives in next.config); e2e asserts the slashed URLs.
      expect(link).toHaveAttribute('href', expect.stringMatching(/^\/work\/[a-z0-9-]+\/?$/));
    }
    // External proof links open in a new tab with the safe rel.
    const appStore = screen.getByRole('link', { name: /app store/i });
    expect(appStore).toHaveAttribute('target', '_blank');
    expect(appStore).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByRole('link', { name: /product page/i })).toBeInTheDocument();
  });
});

describe('AiPractice (How I direct AI agents)', () => {
  it('renders every step with its proof metric', () => {
    render(<AiPractice />);
    for (const step of aiPracticeSteps) {
      expect(screen.getByText(step.name)).toBeInTheDocument();
      expect(screen.getByText(step.proof.value)).toBeInTheDocument();
    }
  });
});

describe('Skills', () => {
  it('renders each category heading', () => {
    render(<Skills />);
    for (const group of skills) {
      expect(screen.getByText(group.category)).toBeInTheDocument();
    }
  });
});

describe('Recommendations', () => {
  it('shows each curated testimonial with attribution and links to the full page', () => {
    render(<Recommendations />);
    for (const r of featuredRecommendations) {
      expect(screen.getByText(r.name)).toBeInTheDocument();
    }
    // next/link normalizes the trailing slash away outside the real build
    // (trailingSlash lives in next.config); e2e asserts the slashed URL.
    expect(
      screen.getByRole('link', {
        name: new RegExp(`all ${recommendations.length} recommendations`, 'i'),
      }),
    ).toHaveAttribute('href', expect.stringMatching(/^\/recommendations\/?$/));
  });
});

describe('Timeline', () => {
  it('renders each role with its company', () => {
    render(<Timeline />);
    for (const role of roles) {
      expect(
        screen.getByText(new RegExp(role.company.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))),
      ).toBeInTheDocument();
    }
  });
});

describe('Credentials', () => {
  it('shows the patent reference number', () => {
    render(<Credentials />);
    expect(screen.getByText(/US20230329668A1/)).toBeInTheDocument();
  });

  it('renders every certification as a verifying link, and the languages', () => {
    render(<Credentials />);
    for (const c of certifications.slice(0, 3)) {
      expect(screen.getByRole('link', { name: c.name })).toHaveAttribute('href', c.url);
    }
    expect(screen.getAllByRole('link', { name: certifications[0].name }).length).toBe(1);
    for (const l of languages) {
      expect(screen.getByText(l.name)).toBeInTheDocument();
    }
  });
});

describe('Contact', () => {
  it('exposes a mailto link and resume download', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: profile.email })).toHaveAttribute(
      'href',
      `mailto:${profile.email}`,
    );
    expect(screen.getByRole('link', { name: /resume/i })).toHaveAttribute(
      'href',
      expect.stringContaining(profile.resumeFile),
    );
  });

  it('shows the current year and a build-time freshness stamp', () => {
    render(<Contact />);
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))).toBeInTheDocument();
    expect(screen.getByText(/Last updated/)).toBeInTheDocument();
  });
});
