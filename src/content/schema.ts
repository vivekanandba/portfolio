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
    title: z.string().min(1), // "Staff Engineer · Internal Technical Co-founder"
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
  // Hero artifact image for the project page (path under /public, e.g.
  // "media/foo.jpg"); imageAlt is required alongside it for accessibility.
  image: z.string().optional(),
  imageAlt: z.string().min(1).optional(),
  // Visible credit line, required whenever the image isn't the author's own
  // work product (e.g. a client's or former employer's published photo).
  imageCredit: z.string().min(1).optional(),
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
  'stop-hunger',
  'aircare',
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
  'gadjoy',
  'legend-technologies',
  'slipring-line',
] as const;

/** One photograph or render in a photo grid (paths under public/). Alt text is mandatory —
 *  never publish an image here without auditing it for customer PII first. */
export const galleryItemSchema = z.object({
  file: z.string().min(1), // "media/gadjoy-workshop.jpg"
  alt: z.string().min(1),
  // Landscape items (annotated before/after cards, wide diagrams) span the
  // grid and are letterboxed instead of cropped, so labels stay readable.
  wide: z.boolean().optional(),
  // Portrait items (phone screenshots) get a taller cell and are shown
  // whole rather than cropped to a horizontal slice.
  tall: z.boolean().optional(),
  // Visible credit, required for any image that isn't the author's own.
  credit: z.string().min(1).optional(),
});
export type GalleryItem = z.infer<typeof galleryItemSchema>;

/** Long-form case study for a project, rendered at /work/<slug>/. */
export const caseStudySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/), // equals the project id — stable URLs
  projectId: z.string().min(1), // FK to projects[].id, test-enforced
  eyebrow: z.string().min(1), // "Project · Sanas.ai"
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
  // Downloadable artifacts (architecture decks, white papers, extra diagrams)
  // served from /public — `file` is the path under public/, not an absolute URL.
  docs: z
    .array(
      z
        .object({
          label: z.string().min(1), // "Telemetry white paper (PDF)"
          file: z.string().min(1).optional(), // local: "docs/gcp-telemetry-whitepaper.pdf"
          href: z.string().url().optional(), // external: a registry entry, spec, or filing
        })
        // Exactly one source — a local file resolves through asset(), an href
        // is used verbatim, and having neither would render a dead link.
        .refine((d) => Boolean(d.file) !== Boolean(d.href), {
          message: 'a doc entry needs exactly one of file (local) or href (external)',
        }),
    )
    .optional(),
  // Photo grid of real work (paths under public/). Alt text is mandatory —
  // never publish an image here without auditing it for customer PII first.
  gallery: z.array(galleryItemSchema).optional(),
  // Motion evidence (ADR-0014): short, silent simulation clips. MP4 ≤ 2 MiB,
  // ≤ 35 s, ≤ 720p, poster mandatory; rendered with browser controls and
  // preload="none", never autoplaying. Sizes are test-enforced from disk.
  clips: z
    .array(
      z.object({
        file: z.string().min(1), // "media/enti-bmp2-elevation-manual.mp4"
        poster: z.string().min(1), // still from the same source, ≤ 300 KB
        alt: z.string().min(1), // what the reader would see happen
        caption: z.string().min(1).optional(), // the claim the motion supports
        credit: z.string().min(1).optional(), // required for third-party prefixes
      }),
    )
    .optional(),
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

/**
 * A career pivot told as a decision record (ADR-0011): what was seen, what was
 * bet, what it cost, what it proved. `proved` must stay checkable against the
 * linked projects; linkage is test-enforced.
 */
export const turningPointSchema = z.object({
  year: z.number().int(),
  title: z.string().min(1),
  saw: z.string().min(1),
  bet: z.string().min(1),
  cost: z.string().min(1),
  proved: z.string().min(1),
  domain: domainSchema,
  projects: z.array(z.string().min(1)).min(1), // FK to projects[].id
});
export type TurningPoint = z.infer<typeof turningPointSchema>;

/**
 * A guided audience path (ADR-0012): a curated stop sequence for one visitor
 * intent. Targets are '#section' anchors or project ids; both test-enforced.
 */
export const tourSchema = z.object({
  id: z.enum(['hiring', 'engineer', 'builder']),
  label: z.string().min(1), // "I'm hiring"
  stops: z
    .array(
      z.object({
        target: z.string().min(1), // '#turning-points' or a project id
        note: z.string().min(1), // one line: why this stop, for this audience
      }),
    )
    .min(4)
    .max(7),
});
export type Tour = z.infer<typeof tourSchema>;

/**
 * The Now section (ADR-0012): a dated snapshot of current exploration. The
 * month is mandatory and rendered — a Now that hides its age is a lie
 * (ADR-0008's dated-capture rule applied to prose).
 */
export const nowSchema = z.object({
  month: z.string().regex(/^20\d{2}-(0[1-9]|1[0-2])$/), // "2026-09"
  exploring: z.array(z.string().min(1)).min(1).max(4),
  building: z.string().min(1),
});
export type Now = z.infer<typeof nowSchema>;

/** A course/certification credential, grouped by category in the Credentials section. */
export const certificationSchema = z.object({
  name: z.string().min(1),
  authority: z.string().min(1), // "DeepLearning.AI"
  date: z.string().min(1), // "Jun 2024" — display string, newest-first ordering is data order
  url: z.string().url(), // every cert must verify — the chip renders as a link
  category: z.string().min(1), // grouping key, e.g. "AI Agents & LLM Engineering"
});
export type Certification = z.infer<typeof certificationSchema>;

export const languageSchema = z.object({
  name: z.string().min(1),
  proficiency: z.string().min(1), // LinkedIn wording, e.g. "Full professional proficiency"
});
export type Language = z.infer<typeof languageSchema>;

/**
 * A LinkedIn recommendation, republished verbatim with attribution. `excerpt`
 * is a pulled quote for the landing cards; `featured` marks the curated set.
 */
export const recommendationSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  company: z.string().optional(),
  text: z.string().min(1), // full recommendation, verbatim
  excerpt: z.string().optional(), // short pulled quote for the landing section
  featured: z.boolean().default(false),
});
export type Recommendation = z.infer<typeof recommendationSchema>;

/* ---------------------------------------------------------------------------
 * Era archive (ADR-0016): every catalogued item from an era's source material,
 * with a tri-state date, a role tag from a closed vocabulary and its sources.
 * ------------------------------------------------------------------------- */
export const ARCHIVE_ERAS = ['legend'] as const;
export const DECK_IDS = ['legend-company-v5.5', 'enti-corporate-v1.4-taml'] as const;
export const ARCHIVE_CATEGORIES = [
  'turnkey-jigs',
  'assembly-tooling',
  'machined-components',
  'composites-mockups',
  'slip-rings',
  'design-services',
  'facilities',
  'company',
  'events',
] as const;
/** What my part was. `company-*` tags say the item is the company's, not mine. */
export const ARCHIVE_ROLES = [
  'led',
  'designed',
  'delivered',
  'supported',
  'workplace',
  'company-before',
  'company-undated',
  'company-after',
] as const;

export const archiveEntrySchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    era: z.enum(ARCHIVE_ERAS),
    title: z.string().min(1),
    customer: z.string().min(1).optional(),
    category: z.enum(ARCHIVE_CATEGORIES),
    summary: z.string().min(40), // written from the transcript, one paragraph
    // Tri-state (CON-DATA-002): a known date carries its label; `requested`
    // means a row in source/records/ asks Vivek for it (recordsId names the row).
    when: z.object({
      status: z.enum(['known', 'unknown', 'requested']),
      label: z.string().min(1).optional(),
    }),
    role: z.enum(ARCHIVE_ROLES),
    sources: z
      .array(
        z.object({
          deck: z.enum(DECK_IDS),
          slides: z.array(z.number().int().positive()).min(1),
        }),
      )
      .min(1),
    media: z.array(galleryItemSchema).optional(),
    project: z.string().min(1).optional(), // FK to projects[].id, test-enforced
    recordsId: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .optional(), // my-photos/<id>/ row
  })
  .superRefine((e, ctx) => {
    if (e.when.status === 'known' && !e.when.label)
      ctx.addIssue({
        code: 'custom',
        path: ['when', 'label'],
        message: 'a known date needs a label',
      });
    if (e.when.status === 'requested' && !e.recordsId)
      ctx.addIssue({
        code: 'custom',
        path: ['recordsId'],
        message: 'a requested date names its records row',
      });
  });
export type ArchiveEntry = z.infer<typeof archiveEntrySchema>;

/** A slide deliberately not catalogued, with the reason — rendered on the page. */
export const archiveExclusionSchema = z.object({
  deck: z.enum(DECK_IDS),
  slide: z.number().int().positive(),
  reason: z.string().min(8),
});
export type ArchiveExclusion = z.infer<typeof archiveExclusionSchema>;

export const archiveEraSchema = z.object({
  id: z.enum(ARCHIVE_ERAS),
  title: z.string().min(1), // "The Legend archive"
  eyebrow: z.string().min(1),
  intro: z.string().min(40), // first person: the rule and what the reader is looking at
  decks: z.array(z.enum(DECK_IDS)).min(1),
});
export type ArchiveEra = z.infer<typeof archiveEraSchema>;
