import type { CaseStudy } from './schema';

/**
 * Long-form case studies for the flagship projects, rendered at /work/<slug>/.
 * Slugs equal project ids (stable URLs). Facts verbatim from resume v15 —
 * the connective prose interprets, but never exceeds, the resume's claims.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'playground',
    projectId: 'playground',
    eyebrow: 'Case Study · Sanas.ai',
    title: 'Playground — real-time audio orchestration at 430k requests a day',
    intro:
      'An ElevenLabs-style interactive web platform where Accent Translation, Noise Cancellation, and Language Translation run concurrently in a single session — on live audio, under a hard real-time latency budget.',
    metrics: [
      { value: '430k/day', label: 'requests in production' },
      { value: '<100ms', label: 'chunk latency' },
      { value: 'H100/T4', label: 'GPU autoscaling' },
    ],
    problem: [
      'An interactive platform for experiencing speech models live means running three heavyweight models concurrently in one session, on streaming audio, without letting any of them block the others.',
      'Audio is unforgiving: a chunk that misses its latency window is audible. The pipeline had to hold sub-100ms chunk latency while daily volume grew to 430k requests.',
    ],
    constraints: [
      'Sub-100ms chunk latency on live streams.',
      'Three concurrent model tracks (Accent Translation, Noise Cancellation, Language Translation) in one session.',
      'GPU capacity split across two platforms and two hardware classes — AWS EKS and Modal, H100 and T4.',
      '430k requests a day with automated autoscaling, not hand-tuned capacity.',
    ],
    decisions: [
      {
        decision:
          'Triple-track asynchronous orchestration (FastAPI / Asyncio) instead of a sequential pipeline.',
        tradeoff:
          'Concurrency logic is harder to reason about than a chain, but it is the only way three tracks share one session without head-of-line blocking.',
      },
      {
        decision: 'NVIDIA Triton inference served over gRPC rather than HTTP.',
        tradeoff:
          'A heavier integration than plain HTTP, bought back in wire efficiency and streaming semantics that keep chunk latency under 100ms.',
      },
      {
        decision: 'Automated autoscaling across AWS EKS and Modal (H100/T4 GPUs).',
        tradeoff:
          'Two control planes to operate — in exchange for elastic capacity across both classes of GPU hardware.',
      },
      {
        decision: 'An eager-ingestion speculative processing layer for background voice cloning.',
        tradeoff:
          'Spends compute on work that may be discarded, so the result is ready the moment the user asks for it.',
      },
    ],
    results: [
      { value: '430k/day', label: 'requests in production' },
      { value: '<100ms', label: 'chunk latency held' },
    ],
    diagramId: 'playground',
    seoDescription:
      'Case study: a triple-track asynchronous audio orchestration pipeline (FastAPI/Asyncio, Triton gRPC, AWS EKS + Modal) holding sub-100ms chunk latency at 430k requests a day.',
  },
  {
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
        decision:
          'A hybrid Chrome Extension / Desktop architecture instead of picking one surface.',
        tradeoff:
          'Two packaging targets to maintain, but the copilot works where the call actually happens — browser-based dialers and desktop meeting apps alike.',
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
    ],
    results: [
      { value: '3 months', label: 'concept to Enterprise GA' },
      { value: '<4s', label: 'live objection answers' },
    ],
    diagramId: 'sales-copilot',
    seoDescription:
      'Case study: a hybrid Chrome Extension / Desktop AI sales copilot with a multi-modal RAG pipeline answering live objections in under 4 seconds — concept to Enterprise GA in 3 months.',
  },
  {
    slug: 'sanas-consumer-app',
    projectId: 'sanas-consumer-app',
    eyebrow: 'Case Study · Sanas.ai',
    title: 'Sanas Consumer App — a production B2C app in under four weeks',
    intro:
      'A production-ready React Native app, shipped by an engineer with zero prior mobile experience — by directing a multi-agent AI workflow instead of learning the stack the slow way.',
    metrics: [
      { value: '<4 weeks', label: 'concept to shipped' },
      { value: '100%', label: 'iOS/Android parity' },
      { value: '9', label: 'languages localized' },
    ],
    problem: [
      'Sanas needed a consumer-grade mobile app, and the conventional answers — months of ramp-up on an unfamiliar stack, or hiring the work out — did not fit the timeline.',
      'The bet: an experienced systems engineer directing coding agents (Cursor / Claude) can reach production quality on an unfamiliar stack faster than they can learn it — if the process has real review gates.',
    ],
    constraints: [
      'Zero prior mobile experience on the engineer who owned it.',
      'Production quality: 100% iOS/Android parity, including the platform-permission edge cases that sink first mobile apps.',
      'Localization in 9 languages.',
      'Onboarding had to stay radically short — measured at ~1.5 minutes.',
    ],
    decisions: [
      {
        decision: 'React Native (single codebase) with parity as an explicit, tested requirement.',
        tradeoff:
          'Platform-specific polish is harder to reach than with native apps, but parity plus speed was the whole point — and permissions handling was engineered per platform where it mattered.',
      },
      {
        decision:
          'A multi-agent AI workflow (Cursor / Claude) as the primary builder, with the engineer as director and reviewer.',
        tradeoff:
          'Every agent-written change still needs expert review — the leverage comes from parallelism and never typing boilerplate, not from skipping judgment.',
      },
    ],
    results: [
      { value: '<4 weeks', label: 'concept to shipped' },
      { value: '~1.5 min', label: 'user onboarding' },
      { value: '9', label: 'languages localized' },
    ],
    resultsNote: 'Live on the App Store as Sanas Translate.',
    diagramId: 'consumer-app',
    seoDescription:
      'Case study: shipping a production React Native app in under 4 weeks with zero prior mobile experience by directing a multi-agent AI workflow — 100% iOS/Android parity, 9 languages.',
  },
];
