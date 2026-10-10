import type { CaseStudy, Domain, Project, StripFrame } from '@/content/schema';

export type ResolvedFrame = StripFrame & {
  href: string;
  alt: string;
  credit?: string;
  year: number;
  domain?: Domain;
};

type Lookup = {
  caseStudies: readonly Pick<CaseStudy, 'slug' | 'projectId' | 'gallery'>[];
  projects: readonly Pick<Project, 'id' | 'domain' | 'image' | 'imageAlt' | 'imageCredit'>[];
  caseStudyStart: (id: string) => number;
};

/**
 * Resolve the strip's frames against the case studies they link to
 * (SPEC-0006 R12). Alt text and credit come from the gallery item or project
 * image with the same file; a frame found in neither throws, so the strip can
 * only show what that page already shows, screened and credited. Sorted by
 * when the work began, then by listed order.
 */
export function resolveStrip(frames: readonly StripFrame[], lookup: Lookup): ResolvedFrame[] {
  return frames
    .map((frame, index) => {
      const cs = lookup.caseStudies.find((c) => c.projectId === frame.projectId);
      const project = lookup.projects.find((p) => p.id === frame.projectId);
      if (!cs || !project) {
        throw new Error(
          `Strip frame ${frame.file}: no case study for project "${frame.projectId}".`,
        );
      }
      const inGallery = cs.gallery?.find((g) => g.file === frame.file);
      const asImage = project.image === frame.file;
      if (!inGallery && !asImage) {
        throw new Error(
          `Strip frame ${frame.file} is not in the gallery or project image of /work/${cs.slug}/ — the strip shows only what that page already shows (SPEC-0006 R12).`,
        );
      }
      const alt = inGallery ? inGallery.alt : (project.imageAlt ?? '');
      const credit = inGallery ? inGallery.credit : project.imageCredit;
      return {
        ...frame,
        href: `/work/${cs.slug}/`,
        alt,
        credit: credit || undefined,
        year: Math.floor(lookup.caseStudyStart(frame.projectId) / 100),
        domain: project.domain,
        index,
      };
    })
    .sort((a, b) => a.year - b.year || a.index - b.index)
    .map(({ index: _index, ...frame }) => frame);
}

/**
 * The source line of a credit — "Photo: …", "Map: …", "Image: …",
 * "Animation: …" — for a caption with no room for the whole sentence. A credit
 * without such a marker is shown whole.
 */
export function creditSource(credit: string): string {
  const match = /(?:^|\s)((?:Photo|Map|Image|Animation|Video): .*)$/.exec(credit);
  return match ? match[1] : credit;
}
