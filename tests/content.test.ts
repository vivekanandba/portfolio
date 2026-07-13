import { describe, it, expect } from 'vitest';
import {
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
});

describe('content invariants for an impactful page', () => {
  it('has at least one featured project to lead the work section', () => {
    expect(projects.some((p) => p.featured)).toBe(true);
  });

  it('has secondary projects to fill the "More work" list', () => {
    expect(projects.some((p) => !p.featured)).toBe(true);
  });

  it('project ids are unique (stable keys / future routes)', () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('tells the multidisciplinary arc with at least three beats', () => {
    expect(profile.arc.length).toBeGreaterThanOrEqual(3);
  });

  it('hero badge names all three domains', () => {
    expect(profile.heroDomains).toHaveLength(3);
  });

  it('career start year yields a credible experience figure', () => {
    const years = new Date().getFullYear() - profile.careerStartYear;
    expect(years).toBeGreaterThanOrEqual(15);
  });

  it('roles cover all three career tracks', () => {
    const tracks = new Set(roles.map((r) => r.track));
    expect(tracks).toContain('Programming');
    expect(tracks).toContain('Entrepreneurial');
    expect(tracks).toContain('Mechanical');
  });

  it('schema rejects malformed data (fails loudly)', () => {
    expect(() => profileSchema.parse({ ...profile, email: 'not-an-email' })).toThrow();
  });
});
