import type { CaseStudy } from '../schema';

export const releaseEngineering: CaseStudy = {
  slug: 'release-engineering',
  projectId: 'release-engineering',
  eyebrow: 'Case Study · NovaSignal / NeuraSignal',
  title: 'Release Engineering — synthetic data, CI/CD, and scale',
  intro:
    'The release backbone across the NovaGuide View releases: Jenkins CI/CD fed by synthetic TCD data and FFMPEG-processed streams for realistic testing without patient data, a reusable Flask backend framework and standardised Linux templates underneath, and cloud simulators for validation — hardening releases and supporting rapid scaling.',
  metrics: [
    { value: '60%', label: 'of manual tests automated' },
    { value: '50%', label: 'faster deployments' },
    { value: '200%', label: 'user growth supported' },
  ],
  problem: [
    'Shipping a real-time medical-imaging platform means testing streaming and playback against realistic data — but you cannot freely test on real patient recordings, and manual regression does not keep pace with a release cadence.',
    'Underneath, every service was re-solving the same backend and deployment setup, so release velocity sagged under repeated boilerplate.',
  ],
  constraints: [
    'Realistic test streams without exposing real patient data.',
    'Automated CI/CD across multiple microservices and isolated test environments.',
    'A reusable backend/deployment foundation so services stop re-inventing setup.',
    'Capacity to absorb sharp user growth as hospital deployments expanded.',
  ],
  decisions: [
    {
      decision:
        'Build synthetic TCD data generators and use FFMPEG to process and synchronise audio/video for exam playback in tests.',
      tradeoff:
        'Building data tooling instead of features — it made real-time streaming testable at all, without patient data.',
    },
    {
      decision:
        'Stand up Jenkins CI/CD across the microservices with isolated test environments and mock APIs.',
      tradeoff: 'CI infrastructure to own — repaid in faster, safer releases across the fleet.',
    },
    {
      decision:
        'Extract a reusable Flask backend framework and standardised Linux deployment templates.',
      tradeoff:
        'Framework-building time before feature time — repaid across every service that followed, and cut deployment time roughly in half.',
    },
  ],
  results: [
    { value: '60%', label: 'manual test cases automated' },
    { value: '50%', label: 'reduction in deployment time' },
    { value: '200%', label: 'user growth supported by cloud scaling' },
  ],
  resultsNote:
    'Spanning the Europa through Saturn releases — the unglamorous infrastructure that let the clinical features ship reliably.',
  diagramId: 'release-engineering',
  seoDescription:
    'Case study: release engineering for NovaGuide View — Jenkins CI/CD, synthetic TCD data and FFMPEG test streams, a reusable Flask backend framework and Linux templates, and cloud simulators (60% test automation, 50% faster deploys, 200% growth).',
};
