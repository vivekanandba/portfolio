import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  aiPracticeStepSchema,
  caseStudySchema,
  educationSchema,
  certificationSchema,
  languageSchema,
  patentSchema,
  profileSchema,
  projectSchema,
  recommendationSchema,
  roleSchema,
  skillGroupSchema,
} from '@/content/schema';
import { profile } from '@/content/profile';
import { skills } from '@/content/skills';
import { projects, roles } from '@/content/experience';
import { education, patents } from '@/content/credentials';
import { aiPracticeSteps } from '@/content/aiPractice';
import { caseStudies } from '@/content/caseStudies';
import { recommendations } from '@/content/recommendations';
import { certifications } from '@/content/certifications';
import { languages } from '@/content/languages';
import { diagrams } from '@/components/diagrams';
import { caseStudyStart } from '@/content';

/** Media owned by a client or former employer, named media/<source>-* by
 *  convention. Anything matching must render a visible credit. */
const THIRD_PARTY = /^media\/(legend|enti|neurasignal|appstore|mapshalli)-/;

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

  it('every recommendation is valid', () => {
    expect(recommendations.length).toBeGreaterThan(0);
    for (const r of recommendations) expect(() => recommendationSchema.parse(r)).not.toThrow();
  });

  it('every certification and language is valid', () => {
    expect(certifications.length).toBeGreaterThan(0);
    for (const c of certifications) expect(() => certificationSchema.parse(c)).not.toThrow();
    expect(languages.length).toBeGreaterThan(0);
    for (const l of languages) expect(() => languageSchema.parse(l)).not.toThrow();
  });

  it('certifications are deduped (name + authority unique)', () => {
    const keys = certifications.map((c) => `${c.name}|${c.authority}`);
    expect(new Set(keys).size).toBe(keys.length);
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

  it('tells the arc with at least five beats, including the entrepreneurship/founder chapter', () => {
    expect(profile.arc.length).toBeGreaterThanOrEqual(5);
    expect(
      profile.arc.some((beat) => /gadjoy/i.test(beat.title) || /entrepreneur/i.test(beat.phase)),
    ).toBe(true);
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

  it('metric labels are unique within each strip (MetricBadge keys on label)', () => {
    for (const cs of caseStudies) {
      for (const [strip, metrics] of [
        ['metrics', cs.metrics],
        ['results', cs.results],
      ] as const) {
        const labels = metrics.map((m) => m.label);
        expect(new Set(labels).size, `${cs.slug} ${strip} has duplicate labels`).toBe(
          labels.length,
        );
      }
    }
  });

  it('diagram ids and the diagram registry are a bijection', () => {
    const used = new Set(caseStudies.map((cs) => cs.diagramId));
    const registered = new Set(Object.keys(diagrams));
    expect(used).toEqual(registered);
  });

  it('every referenced media/doc file exists in public/ (and images carry alt text)', () => {
    for (const p of projects) {
      if (p.image) {
        expect(existsSync(join('public', p.image)), `missing ${p.image}`).toBe(true);
        expect(p.imageAlt, `project ${p.id} image needs imageAlt`).toBeTruthy();
      }
      // Third-party imagery must carry a visible credit. Externally-owned media
      // is named media/<source>-* by convention so this rule catches all of it.
      if (p.image && THIRD_PARTY.test(p.image)) {
        expect(
          p.imageCredit,
          `project ${p.id} uses a third-party photo and needs a credit`,
        ).toBeTruthy();
      }
    }
    for (const cs of caseStudies) {
      for (const d of cs.docs ?? []) {
        // Local docs must exist on disk; external ones are just links.
        if (d.file) expect(existsSync(join('public', d.file)), `missing ${d.file}`).toBe(true);
        expect(
          Boolean(d.file) !== Boolean(d.href),
          `doc "${d.label}" needs exactly one source`,
        ).toBe(true);
      }
      for (const g of cs.gallery ?? []) {
        expect(existsSync(join('public', g.file)), `missing ${g.file}`).toBe(true);
        expect(g.alt.length, `gallery ${g.file} needs real alt text`).toBeGreaterThan(10);
        if (THIRD_PARTY.test(g.file)) {
          expect(g.credit, `third-party photo ${g.file} needs a visible credit`).toBeTruthy();
        }
      }
    }
  });

  it('clips carry a poster, alt text and credit, and respect the size budgets (ADR-0014)', () => {
    const CLIP_MAX = 2 * 1024 * 1024;
    const POSTER_MAX = 300 * 1024;
    const withClips = caseStudies.filter((cs) => (cs.clips ?? []).length > 0);
    expect(withClips.length, 'the media model has clips but no project uses them').toBeGreaterThan(
      0,
    );
    for (const cs of withClips) {
      for (const c of cs.clips!) {
        expect(c.file, `${cs.slug}: clips are MP4`).toMatch(/\.mp4$/);
        expect(existsSync(join('public', c.file)), `missing ${c.file}`).toBe(true);
        expect(existsSync(join('public', c.poster)), `missing poster ${c.poster}`).toBe(true);
        expect(statSync(join('public', c.file)).size, `${c.file} over 2 MiB`).toBeLessThanOrEqual(
          CLIP_MAX,
        );
        expect(
          statSync(join('public', c.poster)).size,
          `${c.poster} over 300 KB`,
        ).toBeLessThanOrEqual(POSTER_MAX);
        expect(c.alt.length, `clip ${c.file} needs real alt text`).toBeGreaterThan(10);
        if (THIRD_PARTY.test(c.file)) {
          expect(c.credit, `third-party clip ${c.file} needs a visible credit`).toBeTruthy();
        }
      }
    }
  });

  it('every project page has a chronological anchor (no silent fallback to 0)', () => {
    for (const cs of caseStudies) {
      expect(caseStudyStart(cs.slug), `${cs.slug} missing from CASE_STUDY_START`).toBeGreaterThan(
        0,
      );
    }
  });

  it('content carries no TODO/TBD placeholders', () => {
    const walk = (dir: string): string[] =>
      readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
        d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)],
      );
    for (const f of walk('src/content')) {
      expect(/\b(TODO|TBD)\b/.test(readFileSync(f, 'utf8')), `${f} has a placeholder`).toBe(false);
    }
  });

  it('site copy is first person — the word "owner" never renders (ownership is fine)', () => {
    // This is Vivek's portfolio in Vivek's voice. "The owner" was engineering
    // shorthand that leaked into captions and markers once; this keeps it out.
    // Comments are stripped first so dev-facing notes are not policed. The
    // line-comment strip is best-effort: a string containing "//" (not "://")
    // is truncated there, which can only hide text from the guard, never
    // invent a hit.
    const walk = (dir: string): string[] =>
      readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
        d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)],
      );
    const stripComments = (src: string) =>
      src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
    const files = ['src/content', 'src/components', 'src/app']
      .flatMap(walk)
      .filter((f) => /\.(ts|tsx)$/.test(f));
    for (const f of files) {
      const code = stripComments(readFileSync(f, 'utf8'));
      const hit = code.match(/.*\bowner\b.*/i);
      expect(hit, `${f} renders "owner": ${hit?.[0]?.trim()}`).toBeNull();
    }
  });

  it('external proof links carry a label (and vice versa)', () => {
    for (const p of projects) {
      expect(Boolean(p.href), `project ${p.id} href/linkLabel must pair`).toBe(
        Boolean(p.linkLabel),
      );
    }
  });
});

describe('recommendation invariants', () => {
  it('recommender names are unique (stable keys)', () => {
    const names = recommendations.map((r) => r.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('has a curated featured set for the landing section', () => {
    const featured = recommendations.filter((r) => r.featured);
    expect(featured.length).toBeGreaterThanOrEqual(6);
    // Every featured card renders a pulled quote.
    for (const r of featured) expect(r.excerpt, `featured ${r.name} needs an excerpt`).toBeTruthy();
  });
});
