import { describe, it, expect } from 'vitest';
import {
  aiPracticeStepSchema,
  caseStudySchema,
  educationSchema,
  patentSchema,
  profileSchema,
  projectSchema,
  roleSchema,
  skillGroupSchema,
} from '@/content/schema';
import { profile } from '@/content/profile';
import { skills } from '@/content/skills';
import { projects, roles } from '@/content/experience';
import { education, patents } from '@/content/credentials';
import { aiPracticeSteps } from '@/content/aiPractice';
import { caseStudies } from '@/content/caseStudies';
import { diagrams } from '@/components/diagrams';

describe('content conforms to schema', () => {
  it('profile is valid', () => {
    expect(() => profileSchema.parse(profile)).not.toThrow();
  });

  it('every skill group is valid and non-empty', () => {
    expect(skills.length).toBeGreaterThan(0);
    for (const group of skills) expect(() => skillGroupSchema.parse(group)).not.toThrow();
  });

  it('every project is valid', () => {
    expect(projects.length).toBeGreaterThan(0);
    for (const p of projects) expect(() => projectSchema.parse(p)).not.toThrow();
  });

  it('every role is valid', () => {
    expect(roles.length).toBeGreaterThan(0);
    for (const r of roles) expect(() => roleSchema.parse(r)).not.toThrow();
  });

  it('patents and education are valid', () => {
    for (const p of patents) expect(() => patentSchema.parse(p)).not.toThrow();
    for (const e of education) expect(() => educationSchema.parse(e)).not.toThrow();
  });

  it('every AI-practice step is valid', () => {
    expect(aiPracticeSteps.length).toBeGreaterThanOrEqual(3);
    expect(aiPracticeSteps.length).toBeLessThanOrEqual(4);
    for (const s of aiPracticeSteps) expect(() => aiPracticeStepSchema.parse(s)).not.toThrow();
  });

  it('every case study is valid', () => {
    expect(caseStudies.length).toBeGreaterThan(0);
    for (const cs of caseStudies) expect(() => caseStudySchema.parse(cs)).not.toThrow();
  });
});

describe('content invariants for an impactful page', () => {
  it('has at least one featured project to lead the work section', () => {
    expect(projects.some((p) => p.featured)).toBe(true);
  });

  it('has secondary projects to fill the "More work" list', () => {
    expect(projects.some((p) => !p.featured)).toBe(true);
  });

  it('project ids are unique (stable keys / case-study routes)', () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('tells the arc with at least four beats, including the founder chapter', () => {
    expect(profile.arc.length).toBeGreaterThanOrEqual(4);
    expect(profile.arc.some((beat) => beat.phase.includes('Founder'))).toBe(true);
  });

  it('hero badge names all three technical domains (founder beat stays off the badge)', () => {
    expect(profile.heroDomains).toHaveLength(3);
  });

  it('career start year yields a credible experience figure', () => {
    const years = new Date().getFullYear() - profile.careerStartYear;
    expect(years).toBeGreaterThanOrEqual(15);
  });

  it('hero identity facts are present', () => {
    expect(profile.currentRole.title).toContain('Staff');
    expect(profile.heroStat.value.length).toBeGreaterThan(0);
  });

  it('roles cover all three career tracks', () => {
    const tracks = new Set(roles.map((r) => r.track));
    expect(tracks).toContain('Programming');
    expect(tracks).toContain('Entrepreneurial');
    expect(tracks).toContain('Mechanical');
  });

  it('every project, role, and arc beat declares a domain for the accent system', () => {
    for (const p of projects) expect(p.domain, `project ${p.id}`).toBeDefined();
    for (const r of roles) expect(r.domain, `role ${r.company}`).toBeDefined();
    for (const beat of profile.arc) expect(beat.domain, `arc ${beat.phase}`).toBeDefined();
  });

  it('roles cover all three colored domains', () => {
    const domains = new Set(roles.map((r) => r.domain));
    expect(domains).toContain('aerospace');
    expect(domains).toContain('healthcare-robotics');
    expect(domains).toContain('ai-native');
  });

  it('previously metric-less rescued cards are quantified', () => {
    expect(projects.find((p) => p.id === 'sanas-portal')!.metrics.length).toBeGreaterThan(0);
    expect(projects.find((p) => p.id === 'ai-driven-qa')!.metrics.length).toBeGreaterThan(0);
  });

  it('schema rejects malformed data (fails loudly)', () => {
    expect(() => profileSchema.parse({ ...profile, email: 'not-an-email' })).toThrow();
  });
});

describe('case-study invariants', () => {
  it('slugs are unique and equal to their project ids (stable URLs)', () => {
    const slugs = caseStudies.map((cs) => cs.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const cs of caseStudies) expect(cs.slug).toBe(cs.projectId);
  });

  it('every projectId resolves to a real project', () => {
    const ids = new Set(projects.map((p) => p.id));
    for (const cs of caseStudies) expect(ids.has(cs.projectId), cs.projectId).toBe(true);
  });

  it('projects and case studies are a bijection — every project gets a page', () => {
    const projectIds = new Set(projects.map((p) => p.id));
    const covered = new Set(caseStudies.map((cs) => cs.projectId));
    expect(covered).toEqual(projectIds);
    expect(caseStudies.length).toBe(projects.length);
  });

  it('diagram ids and the diagram registry are a bijection', () => {
    const used = new Set(caseStudies.map((cs) => cs.diagramId));
    const registered = new Set(Object.keys(diagrams));
    expect(used).toEqual(registered);
  });

  it('external proof links carry a label (and vice versa)', () => {
    for (const p of projects) {
      expect(Boolean(p.href), `project ${p.id} href/linkLabel must pair`).toBe(
        Boolean(p.linkLabel),
      );
    }
  });
});
