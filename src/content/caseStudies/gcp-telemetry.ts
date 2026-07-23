import type { CaseStudy } from '../schema';

export const gcpTelemetry: CaseStudy = {
  slug: 'gcp-telemetry',
  projectId: 'gcp-telemetry',
  eyebrow: 'Case Study · NovaSignal / NeuraSignal',
  title: 'Cloud Telemetry — from manual diagnostics to fleet insight',
  intro:
    'A serverless GCP telemetry architecture for NovaGuide — the first FDA-cleared, fully-automated robotic transcranial-Doppler ultrasound for cerebral blood-flow and stroke assessment — deployed across hospitals: real-time fleet monitoring, predictive maintenance, and remote diagnostics replacing manual, device-level checks.',
  metrics: [
    { value: 'Serverless', label: 'Cloud Run + BigQuery' },
    { value: 'Real-time', label: 'fleet monitoring' },
    { value: 'HIPAA', label: 'compliant pipeline' },
  ],
  problem: [
    'NovaGuide robotic systems — life-critical, FDA-cleared cerebral-ultrasound devices — were diagnosed manually, device by device, on site. There was no central view of the fleet, a problem that grew with every hospital deployment.',
    'Without a central pipeline there was no real-time monitoring, no anomaly detection, and no data foundation for predictive maintenance across a growing, geographically spread install base.',
  ],
  constraints: [
    'HIPAA compliance end to end — authentication, encryption, and authorization on every transmission.',
    'Secure ingestion from many hospitals into one pipeline over HTTPS.',
    'Data volumes vary wildly across hospitals; the pipeline must absorb them without hand-tuned capacity.',
    'Operational cost had to stay low — this is supporting infrastructure, not a product line.',
  ],
  decisions: [
    {
      decision:
        'A fully serverless GCP architecture: a Cloud Run service ingests telemetry over HTTPS, standardizes formats (JSON), and parses for downstream processing.',
      tradeoff:
        'Serverless means accepting cold starts and platform limits — repaid in auto-scaling across hospitals and operational cost that tracks actual usage.',
    },
    {
      decision:
        'BigQuery as the long-term store, enabling time-series analysis and ML-driven predictive maintenance.',
      tradeoff:
        'A warehouse bill instead of flat storage — the analyses it unlocked (failure prediction, utilization trends) were the point of centralizing at all.',
    },
    {
      decision:
        'Cloud Monitoring and Metrics Explorer wired in for real-time insight, anomaly detection, and system health.',
      tradeoff:
        'Platform-native tooling over a custom dashboard — less control over presentation, no monitoring stack to maintain.',
    },
  ],
  results: [
    { value: 'Remote', label: 'diagnostics replaced on-site visits' },
    { value: 'Predictive', label: 'maintenance from time-series analysis' },
    { value: 'Auto-scaling', label: 'across hospital deployments' },
  ],
  resultsNote:
    'Centralized telemetry reduced on-site diagnostics, improved response times, and lowered operational costs across hospital deployments — and became the data foundation the Data View analytics app was built on.',
  diagramId: 'telemetry',
  seoDescription:
    'Case study: a serverless GCP telemetry architecture (Cloud Run, BigQuery, Cloud Monitoring) for hospital-deployed NovaGuide robotic ultrasound systems — real-time fleet monitoring, predictive maintenance, and HIPAA-compliant data flow.',
};
