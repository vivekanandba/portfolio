import { z } from 'zod';
import {
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

export const featuredProjects = projects.filter((p) => p.featured);
