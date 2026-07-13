import type { AiPracticeStep } from './schema';

/**
 * The AI-direction operating loop — how multi-agent work actually ships here.
 * Every proof metric is verbatim from resume v15.
 */
export const aiPracticeSteps: AiPracticeStep[] = [
  {
    name: 'Plan',
    body: 'Start from a vendor-agnostic toolchain and an explicit adoption path — the "Crawl, Walk, Run" strategy that moves an organization from AI users to agent directors.',
    proof: { value: '80%', label: 'of workforce enabled' },
  },
  {
    name: 'Direct parallel agents',
    body: 'Orchestrate multi-agent workflows (Cursor / Claude) that do the building — parallel drafts, one directing engineer.',
    proof: { value: '40%+', label: 'faster delivery' },
  },
  {
    name: 'Human review gates',
    body: 'Agents propose; people decide. Weekly C-suite reviews on the product roadmap and technical audits with 10+ research scientists keep the work honest.',
    proof: { value: '10+', label: 'research scientists aligned' },
  },
  {
    name: 'Verify & ship',
    body: 'Hold the loop to verifiable outcomes — 100% iOS/Android parity, AI-in-QA workflows (AutoUI, TestAI) — the way a production B2C app shipped with zero prior mobile experience.',
    proof: { value: '<4 weeks', label: 'concept to shipped app' },
  },
];
