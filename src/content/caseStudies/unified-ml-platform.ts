import type { CaseStudy } from '../schema';

export const unifiedMlPlatform: CaseStudy = {
  slug: 'unified-ml-platform',
  projectId: 'unified-ml-platform',
  eyebrow: 'Case Study · Sanas.ai',
  title: 'Unified ML Platform — one hub for research and production',
  intro:
    'A centralized, Kubernetes-native ML platform that replaced fragmented tooling across DevOps, MLOps, and Innovation — built by listening to the scientists first, then giving them standards they actually wanted to adopt.',
  metrics: [
    { value: '10+', label: 'research scientists interviewed' },
    { value: '3', label: 'teams unified' },
    { value: '5', label: 'engineers led' },
  ],
  problem: [
    'Three teams — DevOps, MLOps, and Innovation — each owned a piece of the model lifecycle with their own tooling. The seams showed: manual deployment overhead, experiments nobody could reproduce, and resource contention between research and production workloads.',
    'The handoff from "research" (notebooks) to "production" (pipelines) was a human process. Every model that crossed it lost time, and sometimes lineage.',
  ],
  constraints: [
    'Research scientists keep their flexibility — a platform they route around is worse than no platform.',
    'Three teams with different incentives had to land on one technical vision.',
    'Experiment reproducibility and model lineage must be tracked, not reconstructed.',
    'Governance must automate the research → production handoff, not add a gate to it.',
  ],
  decisions: [
    {
      decision:
        'Start with deep-dive technical interviews with 10+ research scientists before designing anything.',
      tradeoff:
        'A slower start than shipping a platform and mandating it — but the bottlenecks the interviews surfaced ("manual deployment overhead", "lack of experiment reproducibility", "resource contention") became the actual requirements.',
    },
    {
      decision:
        'A "Hub-and-Spoke" architecture: standards live at the hub (Kubernetes, MLflow, central model registry); the spokes keep team-level freedom.',
      tradeoff:
        'Looser than a monolithic platform, so some duplication survives at the edges — in exchange, scientists retained flexibility while still adhering to engineering standards.',
    },
    {
      decision: 'MLflow with a centralized model registry as the single source of model truth.',
      tradeoff:
        'One more system for every team to learn — it resolved the long-standing versioning conflicts and made reproducible training the default rather than the exception.',
    },
    {
      decision:
        'A governance framework that automates the previously manual handoffs between research and production engineering.',
      tradeoff:
        'Codifying the handoff meant negotiating what "ready for production" means across three teams — once agreed, the transition stopped depending on who was in the room.',
    },
  ],
  results: [
    { value: '3', label: 'teams under one technical vision' },
    { value: '50%', label: 'faster model deployment' },
    { value: 'Org-wide', label: 'experiment tracking & lineage' },
  ],
  resultsNote:
    'The standardized experimentation lifecycle now covers the entire science team — metrics and model lineage are tracked across the organization instead of per laptop.',
  diagramId: 'ml-platform',
  seoDescription:
    'Case study: unifying DevOps, MLOps, and Innovation on a Kubernetes-native ML platform — hub-and-spoke architecture, MLflow model registry, and governance that automated the research-to-production handoff.',
};
