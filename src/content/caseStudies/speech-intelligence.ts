import type { CaseStudy } from '../schema';

export const speechIntelligence: CaseStudy = {
  slug: 'speech-intelligence',
  projectId: 'speech-intelligence',
  eyebrow: 'Case Study · Sanas.ai',
  title: 'Speech Intelligence — total conversation coverage without the cloud',
  intro:
    'A privacy-first, edge-powered voice analytics platform built directly on the Accent Translation / Noise Cancellation desktop stack: real-time operational metrics, automated post-call CRM documentation, and near-real-time compliance alerts — with raw audio and customer PII never leaving the edge.',
  metrics: [
    { value: '1–3% → 100%', label: 'conversation coverage' },
    { value: '4s', label: 'post-call artifacts' },
    { value: '30s', label: 'fraud-dashboard refresh' },
  ],
  problem: [
    'Contact-center analytics traditionally samples a sliver of conversations — an industry baseline of 1–3%. Compliance, coaching, and fraud detection all operate on that sliver, and everything else goes unseen.',
    'The obvious fix — ship all audio to the cloud and analyze it there — is exactly what regulated voice operations cannot do. The platform had to see every interaction while raw audio and customer PII stayed on the edge.',
  ],
  constraints: [
    'Raw audio and PII never leave the edge — analysis runs on-device (ASR + rule-based NLP redaction) before anything is transmitted.',
    'Structured call artifacts must land within seconds of call termination to cut after-call work (ACW) and average handle time (AHT).',
    'Operational metrics must roll up across daily, weekly, and monthly windows without re-scanning raw log data.',
    'High-severity policy breaches and fraud patterns need near-real-time alerting.',
    'Agents in VDI-restricted environments still need to get summaries into their CRMs.',
  ],
  decisions: [
    {
      decision:
        'Build on the existing desktop stack with on-device ASR and rule-based PII redaction, instead of a cloud transcription pipeline.',
      tradeoff:
        'Edge compute constrains model size and update cadence — accepted, because it is the only architecture where 100% coverage and privacy coexist.',
    },
    {
      decision:
        'A queue-backed distributed microservice framework that ingests raw chunks, reconciles channel-wise timestamp overlaps, and stores merged data in S3.',
      tradeoff:
        'Asynchronous reconciliation is harder to reason about than a synchronous pipeline, but it absorbs bursty multi-channel ingest without dropping context.',
    },
    {
      decision:
        'A four-stage ClickHouse OLAP pipeline on the AggregatingMergeTree engine, with state combinators (sumState, argMaxMergeState, uniqState) for incremental rollups.',
      tradeoff:
        'A steeper learning curve than a conventional warehouse — repaid in rollups that never re-scan raw data, and in eliminating multi-gigabyte OOM failures via sorted primary keys and partition-aware filtering.',
    },
    {
      decision:
        'Two concurrent post-call LLM worker tracks: Track A writes summaries, discussion items, and action bullets; Track B computes performance metrics, intent hashtags, and call dispositions.',
      tradeoff:
        'Twice the inference per call, so both artifact families arrive together within seconds instead of queueing behind each other.',
    },
    {
      decision:
        'A multi-tier presentation layer: a real-time active-call widget, a VDI-whitelisted web portal for copy-paste into CRMs, and an admin fraud dashboard on a 30-second refresh.',
      tradeoff:
        'Three surfaces to maintain instead of one dashboard — each audience (agent live, agent post-call, administrator) gets the view its environment actually permits.',
    },
  ],
  results: [
    { value: '100%', label: 'interaction visibility (vs 1–3% baseline)' },
    { value: '4s', label: 'artifacts after call end' },
    { value: '<60–120s', label: 'high-severity alert SLA' },
  ],
  resultsNote:
    'The rollup design also eliminated the multi-gigabyte out-of-memory query failures that plagued raw-scan analytics — strict sorted primary keys and partition-aware filtering, enforced from day one.',
  diagramId: 'speech-intelligence',
  seoDescription:
    'Case study: a privacy-first edge voice analytics platform — on-device ASR and PII redaction, queue-backed ingestion, ClickHouse incremental rollups, and dual LLM worker tracks delivering post-call artifacts in 4 seconds at 100% conversation coverage.',
};
