import type { CaseStudy } from '../schema';

export const aiDrivenQa: CaseStudy = {
  slug: 'ai-driven-qa',
  projectId: 'ai-driven-qa',
  eyebrow: 'Case Study · NovaSignal / NeuraSignal',
  title: 'AI-Driven Test Automation — LLMs inside a medical-device QA loop',
  intro:
    'Three tools that put LLMs to work inside a regulated QA process — AutoUI generating test scripts from requirements, TestAI proving SRS-to-test-case automation, and a Jira Analyzer that triaged the backlog — years before "AI in testing" was a product category.',
  metrics: [
    { value: '30%', label: 'shorter regression cycles' },
    { value: '33%', label: 'of Jira issues auto-analyzed' },
    { value: 'SRS → tests', label: 'generation automated' },
  ],
  problem: [
    'The device under test was NovaGuide — an FDA-cleared robotic stroke-diagnosis platform — where a missed defect is a patient-safety and regulatory event, not a bug report. Its GUI testing starts from System Requirements Specifications and ends in scripted, traceable test cases, and writing those scripts by hand was the bottleneck of every regression cycle.',
    'The defect backlog had the same shape: Jira tickets triaged manually, error patterns spotted by whoever happened to remember similar tickets.',
  ],
  constraints: [
    'Traceability is non-negotiable: every requirement maps to test coverage (requirement trace matrices).',
    'Regulated environment — AI-generated artifacts are verified by engineers before use, never trusted blind.',
    'Coverage across multiple configurations and scenarios, not just the happy path.',
    'Hallucinated features in generated tests are worse than no automation.',
  ],
  decisions: [
    {
      decision:
        'AutoUI: generate test scripts (Python, PyTest, Pywinauto) from SRS items using the OpenAI Assistant API, with AI-driven parameterization and PyTest markers for multi-configuration coverage.',
      tradeoff:
        'Generated code demands review discipline and a curated framework of reusable helpers — the payoff is script development measured in hours instead of days.',
    },
    {
      decision:
        'TestAI: a proof-of-concept generating test scenarios and requirement trace matrices directly from SRS text (ChatGPT-4 + Vision API), with a session-based chatbot for consistent multi-session output.',
      tradeoff:
        'A PoC by design — its honest finding was that hallucinated features are the failure mode, and retrieval-augmented generation is the fix to productionize it.',
    },
    {
      decision:
        'The Jira Analyzer: LLM classification and clustering of tickets, error-path inference, word-cloud visualization, and CSV outputs for human analysis.',
      tradeoff:
        'Its output is a triage aid, not a verdict — deliberately shaped to accelerate human analysis rather than replace it.',
    },
  ],
  results: [
    { value: '30%', label: 'reduction in regression cycles' },
    { value: '23/69', label: 'Jira issues auto-analyzed (33%)' },
    { value: '12', label: 'performance hotspots identified' },
  ],
  resultsNote:
    'The pattern — LLM generates, engineer verifies, traceability enforced — prefigured the AI-native development practice that later scaled org-wide at Sanas.',
  diagramId: 'qa',
  seoDescription:
    'Case study: LLM-powered QA for medical-device software — AI-generated PyTest/Pywinauto suites from requirements, SRS-to-test-case automation with trace matrices, and an AI Jira Analyzer triaging a third of the backlog.',
};
