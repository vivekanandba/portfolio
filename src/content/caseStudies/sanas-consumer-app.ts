import type { CaseStudy } from '../schema';

export const sanasConsumerApp: CaseStudy = {
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
    {
      decision:
        'Git worktrees to run multiple background AI agents in parallel — simultaneous feature development without context-switch stalls.',
      tradeoff:
        'More moving parts than one agent in one checkout; it is the mechanism that let onboarding, the Android port, and localization progress at once.',
    },
    {
      decision:
        'Re-architect onboarding around a track-based voice-calibration flow with real-time visual feedback.',
      tradeoff:
        'Rebuilding a flow that technically worked — "time to magic" dropped to ~1.5 minutes, which is the number a consumer app lives or dies by.',
    },
  ],
  results: [
    { value: '<4 weeks', label: 'concept to shipped' },
    { value: '~1.5 min', label: 'user onboarding' },
    { value: '<2s', label: 'launch time' },
    { value: '60fps', label: 'animations on both platforms' },
  ],
  resultsNote: 'Live on the App Store as Sanas Translate.',
  diagramId: 'consumer-app',
  seoDescription:
    'Case study: shipping a production React Native app in under 4 weeks with zero prior mobile experience by directing a multi-agent AI workflow — 100% iOS/Android parity, 9 languages.',
};
