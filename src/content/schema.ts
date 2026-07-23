import { z } from 'zod';

/**
 * Content schemas — the single source of truth for the shape of all site data.
 * Every data file in src/content is validated against these. Adding a field
 * (e.g. a project image for a future case study) means extending a schema here;
 * tests then guarantee every data file conforms.
 */

export const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().url(),
});
export type Link = z.infer<typeof linkSchema>;

/** A quantified figure rendered as a MetricBadge — shared by projects, the hero, and case studies. */
export const metricSchema = z.object({
  value: z.string().min(1), // "430k/day", "<100ms", "40%+"
  label: z.string().min(1),
});
export type Metric = z.infer<typeof metricSchema>;

/**
 * The three-domain career arc plus non-technical chapters. Colors derive from
 * this (see src/lib/domain.ts) — never from company names or track labels.
 */
export const domainSchema = z.enum([
  'aerospace',
  'rail',
  'healthcare-robotics',
  'ai-native',
  'entrepreneurial',
  'community',
]);
export type Domain = z.infer<typeof domainSchema>;

export const profileSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1), // "Engineer · Intrapreneur · AI-Native Architect"
  valueProp: z.string().min(1), // one-line hero statement
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().min(1),
  resumeFile: z.string().min(1), // filename in /public, prefixed with basePath at use
  links: z.array(linkSchema).min(1), // LinkedIn, GitHub, ...
  careerStartYear: z.number().int(), // first professional role — years of experience derive from this
  heroDomains: z.array(z.string().min(1)).min(2), // ordered domain names for the hero badge
  currentRole: z.object({
    title: z.string().min(1), // "Staff Software Engineer & Technical Lead"
    org: z.string().min(1), // "Sanas.ai"
  }),
  heroStat: metricSchema, // the hard production number in the hero stats strip
  // "The Arc" narrative — the multidisciplinary differentiator, in ordered beats.
  arc: z
    .array(
      z.object({
        phase: z.string().min(1), // "Aerospace"
        title: z.string().min(1), // "Mechanical Engineering"
        body: z.string().min(1),
        domain: domainSchema.optional(),
      }),
    )
    .min(1),
});
export type Profile = z.infer<typeof profileSchema>;

export const skillGroupSchema = z.object({
  category: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});
export type SkillGroup = z.infer<typeof skillGroupSchema>;

export const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  org: z.string().min(1),
  summary: z.string().min(1),
  // Quantified impact — rendered as metric badges. Optional but recommended.
  metrics: z.array(metricSchema).default([]),
  tags: z.array(z.string().min(1)).default([]),
  featured: z.boolean().default(false),
  domain: domainSchema.optional(),
  // Photo slot for future galleries; unused in v1.2.
  image: z.string().optional(),
  // External public artifact only (App Store, product page, patent). Absolute
  // URLs enforced — internal case-study links derive from caseStudies instead.
  href: z.string().url().optional(),
  linkLabel: z.string().min(1).optional(), // "App Store" — text for the href link
});
export type Project = z.infer<typeof projectSchema>;

export const roleSchema = z.object({
  company: z.string().min(1),
  title: z.string().min(1),
  period: z.string().min(1), // "Nov 2024 – Present"
  track: z.enum(['Programming', 'Entrepreneurial', 'Mechanical']),
  location: z.string().optional(),
  highlights: z.array(z.string().min(1)).default([]),
  domain: domainSchema.optional(),
  // Marks a parallel / side venture run alongside a primary role (e.g. a
  // founder gig operated by family). The string is a short descriptor shown in
  // place of the track line; its presence also renders the entry visually
  // distinct (dashed marker) so it doesn't read as competing full-time work.
  aside: z.string().optional(),
});
export type Role = z.infer<typeof roleSchema>;

/** One step of the AI-direction operating loop, tied to a shipped, resume-verbatim outcome. */
export const aiPracticeStepSchema = z.object({
  name: z.string().min(1), // "Plan"
  body: z.string().min(1),
  proof: metricSchema,
});
export type AiPracticeStep = z.infer<typeof aiPracticeStepSchema>;

/**
 * Diagram registry keys — one per case study. The registry in
 * src/components/diagrams/index.ts must mirror this exactly (test-enforced
 * bijection); the enum keeps diagrams[cs.diagramId] compile-time safe.
 */
export const DIAGRAM_IDS = [
  'playground',
  'sales-copilot',
  'consumer-app',
  'speech-intelligence',
  'ml-platform',
  'ai-next',
  'portal',
  'telemetry',
  'interop',
  'qa',
  'internal-tools',
  'mlops-tooling',
  'mapshalli',
  'vssc-tooling',
  'pw-augmenter',
  'safran-a350',
  'filament-composites',
  'bmp2-turret',
  'igcar-slipring',
  'lca-navy',
  'aero-reverse-engineering',
  'rail-tooling',
  'data-view',
  'compliance-tooling',
  'release-engineering',
] as const;

/** Long-form case study for a project, rendered at /work/<slug>/. */
export const caseStudySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/), // equals the project id — stable URLs
  projectId: z.string().min(1), // FK to projects[].id, test-enforced
  eyebrow: z.string().min(1), // "Case Study · Sanas.ai"
  title: z.string().min(1),
  intro: z.string().min(1), // dek paragraph under the H1
  metrics: z.array(metricSchema).min(1), // headline strip
  problem: z.array(z.string().min(1)).min(1), // paragraphs
  constraints: z.array(z.string().min(1)).min(1), // bullet list
  decisions: z
    .array(
      z.object({
        decision: z.string().min(1),
        tradeoff: z.string().min(1), // why / what it cost
      }),
    )
    .min(1),
  results: z.array(metricSchema).min(1),
  resultsNote: z.string().optional(),
  diagramId: z.enum(DIAGRAM_IDS),
  seoDescription: z.string().min(1),
});
export type CaseStudy = z.infer<typeof caseStudySchema>;

export const patentSchema = z.object({
  kind: z.enum(['patent', 'publication', 'achievement']),
  title: z.string().min(1),
  reference: z.string().optional(), // patent number, venue, context
  href: z.string().url().optional(),
});
export type Patent = z.infer<typeof patentSchema>;

export const educationSchema = z.object({
  credential: z.string().min(1),
  institution: z.string().min(1),
  detail: z.string().optional(), // "First Class with Distinction · 2011"
});
export type Education = z.infer<typeof educationSchema>;
