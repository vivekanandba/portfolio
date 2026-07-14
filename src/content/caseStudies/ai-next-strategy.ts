import type { CaseStudy } from '../schema';

export const aiNextStrategy: CaseStudy = {
  slug: 'ai-next-strategy',
  projectId: 'ai-next-strategy',
  eyebrow: 'Case Study · Sanas.ai',
  title: 'AI-Next — turning an engineering org into agent directors',
  intro:
    'A company-wide transformation from ad-hoc AI usage to a structured ecosystem where humans direct autonomous agents — phased deliberately, measured continuously, and governed so speed never outran rigor.',
  metrics: [
    { value: '80%', label: 'of workforce enabled' },
    { value: '3', label: 'maturity phases' },
    { value: '40%+', label: 'faster delivery' },
  ],
  problem: [
    'Individual engineers were using AI tools ad hoc — some brilliantly, most not at all. The organization had a widening capacity gap between the two groups, no shared practices, and no way to see what the tooling spend was buying.',
    'Unstructured adoption also carries real risks: vendor lock-in, unreviewed AI output shipping to production, and "vibe coding" replacing engineering discipline.',
  ],
  constraints: [
    'Vendor-agnostic by design — no bet on a single IDE or model provider.',
    'Costs visible and attributable: usage, cost-per-employee, and ROI per department.',
    'Security first: every AI output requires subject-matter-expert verification before it ships.',
    'A culture shift, not a tooling rollout — practices had to survive the novelty wearing off.',
  ],
  decisions: [
    {
      decision:
        'A phased "Crawl, Walk, Run" strategy: individual augmentation → team-level workflow automation → enterprise orchestration.',
      tradeoff:
        'Slower than a big-bang mandate, but each phase built the habits the next one depended on — maturity that sticks instead of tooling that lapses.',
    },
    {
      decision:
        'A vendor-agnostic toolchain (Cursor, Windsurf; Claude, Gemini) rather than standardizing on one vendor.',
      tradeoff:
        'More integration surface to maintain — in exchange, no lock-in, and each workflow gets the best available model.',
    },
    {
      decision:
        'An "AI Tools Investment Dashboard" tracking usage, cost-per-employee, and ROI across Engineering, MLOps, and QA.',
      tradeoff:
        'Instrumenting adoption takes effort that produces no features — it is also the only way budget conversations stay grounded in data.',
    },
    {
      decision:
        'Governance as engineering practice: the "Plan vs. Code" workflow, TDD-first AI protocols, and mandatory SME verification of all AI outputs.',
      tradeoff:
        'A throughput tax on every AI-assisted change — the explicit price of moving beyond "vibe coding" to professional AI-assisted engineering.',
    },
    {
      decision:
        'Culture built deliberately: monthly AI hackathons and codeathons, and the "Shoshin" (beginner\'s mind) framing for senior engineers learning new workflows.',
      tradeoff:
        'Recurring calendar cost for the whole org — adoption spread through practice and play rather than policy memos.',
    },
  ],
  results: [
    { value: '80%', label: 'of workforce using advanced coding agents' },
    { value: '40%+', label: 'delivery acceleration via multi-agent workflows' },
  ],
  resultsNote:
    'The framework is deliberately durable: scalable, secure, and budget-conscious — designed for long-term AI integration rather than a pilot that fades.',
  diagramId: 'ai-next',
  seoDescription:
    'Case study: a company-wide AI adoption strategy — Crawl/Walk/Run maturity phases, a vendor-agnostic toolchain, an investment dashboard, and TDD-first governance that took coding agents to 80% of the workforce.',
};
