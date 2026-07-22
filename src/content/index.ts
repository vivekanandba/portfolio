import { z } from 'zod';
import {
  aiPracticeStepSchema,
  caseStudySchema,
  educationSchema,
  patentSchema,
  profileSchema,
  projectSchema,
  roleSchema,
  skillGroupSchema,
} from './schema';
import { profile as rawProfile } from './profile';
import { skills as rawSkills } from './skills';
import { projects as rawProjects, roles as rawRoles } from './experience';
import { education as rawEducation, patents as rawPatents } from './credentials';
import { aiPracticeSteps as rawAiPracticeSteps } from './aiPractice';
import { caseStudies as rawCaseStudies } from './caseStudies';

/**
 * Validate every content source at import time. A malformed data file throws here,
 * failing the build/tests loudly rather than rendering broken UI.
 */
export const profile = profileSchema.parse(rawProfile);
export const skills = z.array(skillGroupSchema).parse(rawSkills);
export const projects = z.array(projectSchema).parse(rawProjects);
export const roles = z.array(roleSchema).parse(rawRoles);
export const patents = z.array(patentSchema).parse(rawPatents);
export const education = z.array(educationSchema).parse(rawEducation);
export const aiPracticeSteps = z
  .array(aiPracticeStepSchema)
  .min(3)
  .max(4)
  .parse(rawAiPracticeSteps);
export const caseStudies = z.array(caseStudySchema).parse(rawCaseStudies);

/**
 * Featured cards, ordered to span domains near the top (AI-native, then a
 * healthcare-robotics and an aerospace flagship, then the rest) instead of
 * leading with a run of AI projects. Any featured id not listed sorts last.
 */
const FEATURED_ORDER = [
  'sanas-consumer-app',
  'playground',
  'gcp-telemetry',
  'vssc-tooling',
  'speech-intelligence',
  'sanas-for-sales',
  'unified-ml-platform',
  'ai-next-strategy',
];
const featuredRank = (id: string) => {
  const i = FEATURED_ORDER.indexOf(id);
  return i === -1 ? FEATURED_ORDER.length : i;
};
export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => featuredRank(a.id) - featuredRank(b.id));
export const secondaryProjects = projects.filter((p) => !p.featured);

/**
 * Chronological anchor per case study (engagement start, YYYYMM). The single
 * source of truth for ordering the /work catalog and the landing era chapters
 * most-recent-first. Legend-era months are approximate (the resume dates those
 * programs only to the year) — the org-level sequence is exact.
 */
const CASE_STUDY_START: Record<string, number> = {
  'speech-intelligence': 202601,
  playground: 202512,
  'unified-ml-platform': 202510,
  'sanas-consumer-app': 202508,
  'sanas-for-sales': 202506,
  'ai-next-strategy': 202505,
  'sanas-portal': 202502,
  'mlops-tooling': 202412,
  'internal-tools': 202411,
  'gcp-telemetry': 202408,
  'ai-driven-qa': 202403,
  'healthcare-interop': 202202,
  'rail-tooling': 201901,
  'mapshalli-volunteer': 201801,
  'pw-augmenter': 201606,
  'vssc-tooling': 201601,
  'aero-reverse-engineering': 201506,
  'igcar-slipring': 201412,
  'bmp2-turret': 201406,
  'filament-composites': 201401,
  'lca-navy': 201301,
  'safran-a350': 201108,
};

/** Sort key (engagement start, YYYYMM) for a case study / project id; sort descending for most-recent-first. */
export const caseStudyStart = (id: string): number => CASE_STUDY_START[id] ?? 0;

/** Card → case-study link derivation; internal URLs never live in project.href. */
export const caseStudyByProjectId = new Map(caseStudies.map((cs) => [cs.projectId, cs]));
