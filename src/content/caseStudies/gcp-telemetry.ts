import type { CaseStudy } from '../schema';

export const gcpTelemetry: CaseStudy = {
  slug: 'gcp-telemetry',
  projectId: 'gcp-telemetry',
  eyebrow: 'Case Study · NovaSignal / NeuraSignal',
  title: 'Cloud Telemetry & Data View — from manual diagnostics to fleet insight',
  intro:
    'A serverless GCP telemetry architecture for NovaGuide — the first FDA-cleared, fully-automated robotic transcranial-Doppler ultrasound for cerebral blood-flow and stroke assessment — deployed across hospitals: real-time fleet monitoring, predictive maintenance, and remote diagnostics, plus the Data View application that turned that data into decisions for sales, med-ed, and leadership.',
  metrics: [
    { value: 'Serverless', label: 'Cloud Run + BigQuery' },
    { value: 'Real-time', label: 'fleet monitoring' },
    { value: 'HIPAA', label: 'compliant pipeline' },
  ],
  problem: [
    'NovaGuide robotic systems — life-critical, FDA-cleared cerebral-ultrasound devices — were diagnosed manually, device by device, on site. There was no central view of the fleet, a problem that grew with every hospital deployment.',
    'The data existed but reached no one who could act on it: sales, medical education, and leadership had no visibility into how systems were actually used across hospitals.',
  ],
  constraints: [
    'HIPAA compliance end to end — authentication, encryption, and authorization on every transmission.',
    'Data volumes vary wildly across hospitals; the pipeline must absorb them without hand-tuned capacity.',
    'Operational cost had to stay low — this is supporting infrastructure, not a product line.',
    'Non-engineers (sales, med-ed, leadership) needed to read the results directly.',
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
    {
      decision:
        'The Data View application (Streamlit + Flask, iterated rapidly with AI-assisted development) on top: exam utilization, RLS detection, and hospital performance, visualized for stakeholders.',
      tradeoff:
        'Streamlit trades pixel-perfect UI control for iteration speed — which is what let internal-customer feedback turn into shipped updates in days.',
    },
  ],
  results: [
    { value: 'Remote', label: 'diagnostics replaced on-site visits' },
    { value: 'Predictive', label: 'maintenance from time-series analysis' },
    { value: 'Cross-hospital', label: 'utilization comparison for stakeholders' },
  ],
  resultsNote:
    'Centralized telemetry reduced on-site diagnostics, improved response times, and lowered operational costs — and Data View gave sales, med-ed, and leadership their first real-time window into the deployed fleet.',
  diagramId: 'telemetry',
  seoDescription:
    'Case study: a serverless GCP telemetry architecture (Cloud Run, BigQuery, Cloud Monitoring) for hospital-deployed robotic systems, with the Streamlit-based Data View app delivering fleet insight to business stakeholders.',
};
