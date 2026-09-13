import type { ArchiveExclusion } from '../schema';

/**
 * Slides deliberately not catalogued in the archive, each with its reason. The
 * coverage test requires every slide of every deck to be either an archive
 * source or listed here — a slide that is neither fails the build (ADR-0016).
 */
export const archiveExclusions: ArchiveExclusion[] = [
  {
    deck: 'legend-company-v5.5',
    slide: 1,
    reason: 'title slide — the customer name and logo only',
  },
  { deck: 'legend-company-v5.5', slide: 2, reason: 'contents slide' },
  {
    deck: 'legend-company-v5.5',
    slide: 5,
    reason: 'board of directors — third-party names, withheld (ADR-0007)',
  },
  {
    deck: 'legend-company-v5.5',
    slide: 17,
    reason: 'section divider: assembly tooling, jigs and fixtures',
  },
  {
    deck: 'legend-company-v5.5',
    slide: 27,
    reason: 'section divider: machined and turned components',
  },
  { deck: 'legend-company-v5.5', slide: 32, reason: 'section divider: composites' },
  {
    deck: 'legend-company-v5.5',
    slide: 62,
    reason: 'customer logo grid — trademarks; the slip-ring customers appear as text on slide 64',
  },
  {
    deck: 'legend-company-v5.5',
    slide: 63,
    reason: 'customer logo grid, continued — trademarks; the customers appear as text on slide 64',
  },
  { deck: 'legend-company-v5.5', slide: 65, reason: 'section divider: miscellaneous' },
  { deck: 'legend-company-v5.5', slide: 70, reason: 'section divider: technical personnel' },
  {
    deck: 'legend-company-v5.5',
    slide: 71,
    reason: 'biography of a third party — omitted from the transcript',
  },
  {
    deck: 'legend-company-v5.5',
    slide: 72,
    reason: 'biography of a third party — omitted from the transcript',
  },
  {
    deck: 'legend-company-v5.5',
    slide: 73,
    reason: 'biography of a third party — omitted from the transcript',
  },
  { deck: 'legend-company-v5.5', slide: 75, reason: 'section divider: company details' },
  {
    deck: 'legend-company-v5.5',
    slide: 76,
    reason:
      'organisation chart — a controlled quality-manual page, not mine to publish; no text survives',
  },
  {
    deck: 'legend-company-v5.5',
    slide: 77,
    reason: 'private company financials — omitted from the transcript',
  },
  {
    deck: 'legend-company-v5.5',
    slide: 78,
    reason:
      "sub-contractor vendor list with addresses — the vendors' business, not work I or the company did",
  },
  {
    deck: 'legend-company-v5.5',
    slide: 79,
    reason: 'section divider: infrastructure and facilities',
  },
  { deck: 'legend-company-v5.5', slide: 87, reason: 'section divider: customers' },
  {
    deck: 'legend-company-v5.5',
    slide: 88,
    reason:
      'customer logo grid — trademarks; the customers the site names are cited on their project pages',
  },
  { deck: 'legend-company-v5.5', slide: 89, reason: 'customer logo grid, continued — trademarks' },
  { deck: 'legend-company-v5.5', slide: 90, reason: 'customer logo grid, continued — trademarks' },
  { deck: 'legend-company-v5.5', slide: 91, reason: 'section divider: awards and recognitions' },
  { deck: 'legend-company-v5.5', slide: 96, reason: 'section divider: certifications' },
  {
    deck: 'legend-company-v5.5',
    slide: 99,
    reason: 'contact slide — phone numbers, e-mail addresses and a street address, omitted',
  },
  {
    deck: 'enti-corporate-v1.4-taml',
    slide: 1,
    reason: 'title slide — the customer name and logo only',
  },
  {
    deck: 'enti-corporate-v1.4-taml',
    slide: 2,
    reason: "presenter slide — the founder's name and company logos only",
  },
  { deck: 'enti-corporate-v1.4-taml', slide: 15, reason: 'section divider: human resources' },
  {
    deck: 'enti-corporate-v1.4-taml',
    slide: 16,
    reason: 'management-team roster — third-party names and portraits, withheld',
  },
  {
    deck: 'enti-corporate-v1.4-taml',
    slide: 17,
    reason: 'advisory-board roster — third parties, withheld',
  },
  {
    deck: 'enti-corporate-v1.4-taml',
    slide: 19,
    reason: 'biography of a third party — omitted from the transcript',
  },
  {
    deck: 'enti-corporate-v1.4-taml',
    slide: 20,
    reason: 'biography of a third party — omitted from the transcript',
  },
  {
    deck: 'enti-corporate-v1.4-taml',
    slide: 22,
    reason: 'biography of a third party — omitted from the transcript',
  },
  { deck: 'enti-corporate-v1.4-taml', slide: 23, reason: 'section divider: projects' },
  { deck: 'enti-corporate-v1.4-taml', slide: 42, reason: 'section divider: professional network' },
  {
    deck: 'enti-corporate-v1.4-taml',
    slide: 47,
    reason:
      'customer logo grid — trademarks; the customers the site names are cited on their project pages',
  },
  {
    deck: 'enti-corporate-v1.4-taml',
    slide: 48,
    reason: 'thank-you slide — e-mail addresses, omitted',
  },
];
