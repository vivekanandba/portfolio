import type { CaseStudy } from '../schema';

export const internalTools: CaseStudy = {
  slug: 'internal-tools',
  projectId: 'internal-tools',
  eyebrow: 'Case Study · Sanas.ai',
  title: 'Internal Tools Portal — 25+ legacy apps, one front door',
  intro:
    'Taking solo ownership of a sprawling portfolio of legacy internal applications — React, Vue, Python, Node — and replacing tool sprawl with a single searchable portal, using AI-assisted development to learn 25+ codebases in weeks instead of months.',
  metrics: [
    { value: '25+', label: 'legacy apps unified' },
    { value: 'Hours → seconds', label: 'tool & doc discovery' },
    { value: '50%', label: 'onboarding cut (projected)' },
  ],
  problem: [
    'Years of organic growth had produced 25+ internal applications across four stacks, with inconsistent documentation and no directory. Engineers lost hours locating the right tool — or rebuilt ones that already existed.',
    'The person taking ownership had to become productive in all of those codebases at once — the classic months-long archaeology project, compressed.',
  ],
  constraints: [
    'Single-handed ownership: one engineer, 25+ unfamiliar codebases, four stacks.',
    'Legacy tools had to keep running while the portal was built around them.',
    'The fix had to prevent recurrence: a standard framework for every future internal tool.',
  ],
  decisions: [
    {
      decision:
        'AI-assisted codebase diagnosis: GitHub Copilot used systematically to learn and diagnose the 25+ disparate codebases.',
      tradeoff:
        'AI-generated understanding still needs verification against running systems — but proficiency arrived in weeks instead of months, which changed what one engineer could own.',
    },
    {
      decision:
        'Build a new centralized portal from the ground up — a unified, searchable one-stop shop — rather than patching a directory onto the sprawl.',
      tradeoff:
        'Greenfield effort on top of maintenance duty; the payoff is a single front door instead of a slightly better maze.',
    },
    {
      decision: 'Codify a standardized, scalable framework for all future internal tools.',
      tradeoff:
        'Standards slow down the first tool built under them — and stop the portfolio from re-fragmenting after the cleanup.',
    },
  ],
  results: [
    { value: 'Hours → seconds', label: 'time to find tools and docs' },
    { value: '50%', label: 'projected cut in engineer onboarding time' },
    { value: 'One', label: 'source of truth for engineering resources' },
  ],
  resultsNote:
    'The portal eliminated redundant tools and standardized operations — governance as a byproduct of making the right thing the easy thing.',
  diagramId: 'internal-tools',
  seoDescription:
    'Case study: solo modernization of 25+ legacy internal applications into a unified, searchable Internal Tools Portal — AI-assisted codebase analysis, a standardized framework, and hours-to-seconds resource discovery.',
};
