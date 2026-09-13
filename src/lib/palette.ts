import { archiveEntries, archiveEras } from '@/content';

/** One searchable row in the ⌘K palette (ADR-0012). */
export type PaletteEntry = {
  label: string;
  detail: string;
  href: string; // '#section', '/work/<slug>/' or '/archive/<era>/'
  keywords: string; // lower-cased haystack for matching
};

/**
 * Archive entries as palette rows (ADR-0016). Built on the server (the layout)
 * and handed to the client palette as a prop, so the palette component never
 * grows a dependency on the archive content itself.
 */
export function archivePaletteEntries(): PaletteEntry[] {
  const eraTitle = new Map(archiveEras.map((e) => [e.id, e.title]));
  return archiveEntries.map((e) => ({
    label: e.title,
    detail: `Archive · ${eraTitle.get(e.era) ?? e.era}`,
    href: `/archive/${e.era}/`,
    keywords: `${e.title} ${e.customer ?? ''} ${e.category} ${e.summary}`.toLowerCase(),
  }));
}
