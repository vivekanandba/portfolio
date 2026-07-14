import type { CaseStudy } from '../schema';

export const sanasForSales: CaseStudy = {
  slug: 'sanas-for-sales',
  projectId: 'sanas-for-sales',
  eyebrow: 'Case Study · Sanas.ai',
  title: 'Sanas for Sales — concept to Enterprise GA in three months',
  intro:
    'A real-time AI copilot for sales teams: a hybrid Chrome Extension / Desktop application with a multi-modal RAG pipeline answering live objections in under four seconds.',
  metrics: [
    { value: '3 months', label: 'concept to Enterprise GA' },
    { value: '<4s', label: 'RAG latency' },
    { value: 'Weekly', label: 'C-suite reviews' },
  ],
  problem: [
    'Sales conversations are won or lost in the moment. A copilot that surfaces the right answer thirty seconds late is a transcript annotator, not a copilot — the product only exists if retrieval-augmented answers arrive while the objection is still on the table.',
    'It had to reach enterprise quality fast: the product went from concept to Enterprise GA in three months, with the technical roadmap reviewed at executive level throughout.',
  ],
  constraints: [
    'Enterprise GA in 3 months — scope had to be cut to what could be hardened, not just built.',
    'Live objection handling demands <4s end-to-end RAG latency on multi-modal context.',
    'Sales reps live in the browser and on the desktop — the copilot had to meet them in both.',
  ],
  decisions: [
    {
      decision: 'A hybrid Chrome Extension / Desktop architecture instead of picking one surface.',
      tradeoff:
        'Two packaging targets to maintain, but the copilot overlays non-intrusively where the call actually happens — browser dialers and desktop meeting apps, on top of tools like Salesforce and HubSpot.',
    },
    {
      decision: 'A multi-modal RAG pipeline tuned for a hard <4s answer budget.',
      tradeoff:
        'Aggressive latency budgets constrain how much context can be retrieved and re-ranked per turn; the pipeline favors fast, good-enough retrieval over exhaustive search.',
    },
    {
      decision: 'Weekly C-suite technical roadmap reviews baked into the delivery process.',
      tradeoff: 'Real overhead for the engineering lead — in exchange for decision speed.',
    },
    {
      decision:
        'Automated LLM evaluation pipelines (DeepEval, Ragas) gating response accuracy, hallucination rates, and safety compliance before deployment.',
      tradeoff:
        'Evaluation infrastructure before feature velocity — the only way to harden a copilot to enterprise quality on a three-month clock.',
    },
  ],
  results: [
    { value: '3 months', label: 'concept to Enterprise GA' },
    { value: '<4s', label: 'live objection answers' },
  ],
  resultsNote:
    'Shipped with live objection handling, dynamic battlecards, and sentiment analysis — and the knowledge-ingestion system built for it became shared infrastructure for future AI products.',
  diagramId: 'sales-copilot',
  seoDescription:
    'Case study: a hybrid Chrome Extension / Desktop AI sales copilot with a multi-modal RAG pipeline answering live objections in under 4 seconds — concept to Enterprise GA in 3 months.',
};
