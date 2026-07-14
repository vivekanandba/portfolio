import type { CaseStudy } from '../schema';

export const mlopsTooling: CaseStudy = {
  slug: 'mlops-tooling',
  projectId: 'mlops-tooling',
  eyebrow: 'Case Study · Sanas.ai',
  title: 'MLOps Observability & Model Cards — making the pipeline visible',
  intro:
    'Two foundational tools for the ML organization: the first end-to-end observability dashboard for the MLOps data pipeline, and a Model Card system giving data linguists, DL specialists, and speech scientists a shared language for evaluating models.',
  metrics: [
    { value: 'End-to-end', label: 'pipeline visibility (first ever)' },
    { value: '3', label: 'specialist disciplines bridged' },
    { value: 'Automated', label: 'quality · volume · latency metrics' },
  ],
  problem: [
    'The MLOps data pipeline had never been visualized end to end. Data quality, volume, and latency issues surfaced downstream, where they were expensive to trace back.',
    'The analytics team spans three disciplines — data linguists, computational DL specialists, speech scientists — each evaluating models in their own vocabulary, with no common record of what was measured or how models compared.',
  ],
  constraints: [
    'Multiple heterogeneous sources: internal APIs and AWS DynamoDB, ingested and normalized.',
    'Metric tracking (quality, volume, latency) automated — not compiled by hand for reviews.',
    'The Model Card schema had to flex across radically different specialist metrics.',
    'Non-programmers among the specialists needed to read and compare results directly.',
  ],
  decisions: [
    {
      decision:
        'Purpose-built data connectors and a FastAPI backend feeding a Plotly dashboard, mapping the entire data flow.',
      tradeoff:
        'A custom dashboard over an off-the-shelf observability product — the pipeline’s shape was too specific for generic tooling to say anything useful.',
    },
    {
      decision:
        'Automated metric tracking for data quality, volume, and latency, computed continuously along the mapped flow.',
      tradeoff:
        'Instrumentation work that produces no features — it is what turned pipeline debugging from archaeology into observation.',
    },
    {
      decision:
        'An independently designed Model Card schema (PostgreSQL/MongoDB) flexible enough to hold each discipline’s metrics, with REST APIs for programmatic log / retrieve / compare.',
      tradeoff:
        'A flexible schema is harder to validate than a rigid one — rigidity would have excluded two of the three disciplines on day one.',
    },
    {
      decision: 'AI-assisted development for boilerplate across both systems.',
      tradeoff:
        'Generated scaffolding still gets reviewed — and the initial development phase compressed substantially.',
    },
  ],
  results: [
    { value: 'First', label: 'end-to-end view of the ML data pipeline' },
    { value: 'Faster', label: 'R&D feedback loops between disciplines' },
    { value: 'Data-driven', label: 'pipeline architecture decisions' },
  ],
  resultsNote:
    'The dashboard’s analyses fed directly into strategic pipeline-architecture improvements, and the Model Card system became the common ground where specialists compare models without reading each other’s code.',
  diagramId: 'mlops-tooling',
  seoDescription:
    'Case study: the first end-to-end MLOps pipeline observability dashboard (FastAPI, Plotly, DynamoDB connectors) and a flexible Model Card evaluation system bridging linguists, DL specialists, and speech scientists.',
};
