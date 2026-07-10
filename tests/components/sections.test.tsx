import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Skills } from '@/components/Skills';
import { Timeline } from '@/components/Timeline';
import { Credentials } from '@/components/Credentials';
import { Contact } from '@/components/Contact';
import { profile, featuredProjects, secondaryProjects, skills, roles } from '@/content';

describe('Hero', () => {
  it('renders name, tagline, and primary CTAs', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument();
    expect(screen.getByText(profile.tagline)).toBeInTheDocument();
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

  it('shows the experience stats strip', () => {
    render(<Hero />);
    const years = new Date().getFullYear() - profile.careerStartYear;
    expect(screen.getByText(`${years}+`)).toBeInTheDocument();
    expect(screen.getByText('years of engineering')).toBeInTheDocument();
    expect(screen.getByText('domains mastered')).toBeInTheDocument();
    expect(screen.getByText('patent granted')).toBeInTheDocument();
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

  it('renders the "More work" list with every secondary project', () => {
    render(<Experience />);
    expect(screen.getByRole('heading', { name: /more work/i })).toBeInTheDocument();
    for (const p of secondaryProjects) {
      expect(screen.getByRole('heading', { name: p.title })).toBeInTheDocument();
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
    expect(screen.getByText('US20230329668A1')).toBeInTheDocument();
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

  it('shows the current year in the copyright line', () => {
    render(<Contact />);
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))).toBeInTheDocument();
  });
});
