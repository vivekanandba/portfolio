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
  // "The Arc" narrative — the multidisciplinary differentiator, in ordered beats.
  arc: z
    .array(
      z.object({
        phase: z.string().min(1), // "Aerospace"
        title: z.string().min(1), // "Mechanical Engineering"
        body: z.string().min(1),
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
  metrics: z
    .array(
      z.object({
        value: z.string().min(1), // "430k/day", "<100ms", "40%+"
        label: z.string().min(1),
      }),
    )
    .default([]),
  tags: z.array(z.string().min(1)).default([]),
  featured: z.boolean().default(false),
  // Designed-for future case studies / photos; unused in v1.
  image: z.string().optional(),
  href: z.string().url().optional(),
});
export type Project = z.infer<typeof projectSchema>;

export const roleSchema = z.object({
  company: z.string().min(1),
  title: z.string().min(1),
  period: z.string().min(1), // "Nov 2024 – Present"
  track: z.enum(['Programming', 'Entrepreneurial', 'Mechanical']),
  location: z.string().optional(),
  highlights: z.array(z.string().min(1)).default([]),
});
export type Role = z.infer<typeof roleSchema>;

export const patentSchema = z.object({
  kind: z.enum(['patent', 'publication']),
  title: z.string().min(1),
  reference: z.string().optional(), // patent number, etc.
  href: z.string().url().optional(),
});
export type Patent = z.infer<typeof patentSchema>;

export const educationSchema = z.object({
  credential: z.string().min(1),
  institution: z.string().min(1),
  detail: z.string().optional(), // "First Class with Distinction · 2011"
});
export type Education = z.infer<typeof educationSchema>;
