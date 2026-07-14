import type { CaseStudy } from '../schema';

export const sanasPortal: CaseStudy = {
  slug: 'sanas-portal',
  projectId: 'sanas-portal',
  eyebrow: 'Case Study · Sanas.ai',
  title: 'Admin Portal — global releases and one clock',
  intro:
    'Two portal features that made globally distributed operations behave like one system: cloud-based app version distribution with cryptographic integrity, and a workspace timezone framework that ended timestamp disagreements across India, the Philippines, and the US.',
  metrics: [
    { value: '≈70%', label: 'less manual release coordination' },
    { value: '100%', label: 'timestamp consistency' },
    { value: '60%', label: 'fewer support tickets' },
  ],
  problem: [
    'Desktop releases were coordinated by hand across three regions — version metadata, download URLs, and integrity checks all maintained manually, for both GA and Beta channels.',
    'Meanwhile, timestamps rendered differently depending on where you sat. Reports disagreed across regions, scheduled tasks fired at surprising times, and the support queue filled with time-mismatch tickets.',
  ],
  constraints: [
    'GA and Beta release channels, filterable per region (India, Philippines, North America).',
    'Secure internal distribution of .exe/.msi packages — integrity must be verifiable, not assumed.',
    'One canonical clock: UTC storage everywhere, per-workspace rendering.',
    'DST transitions and edge cases across Manila, India, and US zones must be tested, not hoped about.',
  ],
  decisions: [
    {
      decision:
        'Wire the release lifecycle into CI/CD: each desktop build automatically updates release metadata, download URLs, and SHA-256 hashes.',
      tradeoff:
        'The pipeline becomes release-critical infrastructure — and every manual step (and manual mistake) disappears from the process.',
    },
    {
      decision:
        'Checksum validation plus controlled URL-token authentication for package distribution.',
      tradeoff:
        'Extra friction on every download — the price of knowing an installer is exactly what the build produced.',
    },
    {
      decision:
        'A global TimezoneInterceptor in NestJS: all timestamps stored UTC, rendered per workspace preference, with audit logging on every timezone change.',
      tradeoff:
        'An invasive change touching every timestamped surface (Reports, Home, Notifications) — accepted once, so consistency holds everywhere instead of being re-fixed per page.',
    },
    {
      decision:
        'A multi-region E2E test strategy written specifically around DST edge cases and transitions.',
      tradeoff:
        'Time-zone test matrices are tedious to build and maintain — they are also the only proof that the one-clock model survives the two days a year that break naive implementations.',
    },
  ],
  results: [
    { value: '≈70%', label: 'reduction in manual release coordination' },
    { value: '100%', label: 'timestamp display consistency' },
    { value: '60%', label: 'fewer time-mismatch support tickets' },
  ],
  resultsNote:
    'The UTC-based data standard and audit framework became the foundation for future portal modules — consistency as infrastructure, not a patch.',
  diagramId: 'portal',
  seoDescription:
    'Case study: cloud app-version distribution with CI/CD-automated SHA-256 integrity, and a UTC-based workspace timezone framework — ≈70% less manual release coordination and 60% fewer support tickets across three regions.',
};
