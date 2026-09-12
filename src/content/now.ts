import type { Now } from './schema';

/**
 * The dated snapshot behind the Now section (ADR-0012). Update `month` whenever
 * the content changes — the month renders on the page, so staleness is visible
 * rather than hidden. The newest certifications surface automatically and are
 * not listed here.
 */
export const now: Now = {
  month: '2026-09',
  exploring: [
    'Voice agents and generative UI for AI applications',
    'Spec-driven development with coding agents',
    'Multi-agent orchestration for production engineering work',
  ],
  building:
    'This site, as a working demonstration: every feature specified first, built by directed AI agents, and shipped through human review gates.',
};
