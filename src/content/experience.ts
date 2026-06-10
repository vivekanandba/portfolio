import type { Project, Role } from './schema';

/** Flagship projects — metrics verbatim from the resume. Featured ones lead the grid. */
export const projects: Project[] = [
  {
    id: 'sanas-consumer-app',
    title: 'Sanas Consumer Mobile App',
    org: 'Sanas.ai',
    summary:
      'Built and shipped a production-ready B2C React Native app with zero prior mobile experience by orchestrating a multi-agent AI workflow (Cursor / Claude). Achieved 100% iOS/Android parity with complex permissions.',
    metrics: [
      { value: '<4 weeks', label: 'concept to shipped' },
      { value: '9 languages', label: 'localized' },
      { value: '~1.5 min', label: 'onboarding time' },
    ],
    tags: ['React Native', 'Multi-Agent AI', 'B2C'],
    featured: true,
  },
  {
    id: 'playground',
    title: 'Playground — Audio Orchestration',
    org: 'Sanas.ai',
    summary:
      'Designed a triple-track asynchronous pipeline (FastAPI / Asyncio) running Accent Translation, Noise Cancellation, and Language Translation in one session. Optimized Triton/gRPC inference and autoscaled across AWS EKS and Modal (H100/T4).',
    metrics: [
      { value: '430k/day', label: 'requests handled' },
      { value: '<100ms', label: 'chunk latency' },
    ],
    tags: ['FastAPI', 'Triton', 'AWS EKS', 'Modal'],
    featured: true,
  },
  {
    id: 'sanas-for-sales',
    title: 'Sanas for Sales — Real-Time AI Copilot',
    org: 'Sanas.ai',
    summary:
      'Architected a hybrid Chrome Extension / Desktop solution from concept to Enterprise GA. Led the technical roadmap and weekly C-suite reviews, engineering a multi-modal RAG pipeline for live objection handling.',
    metrics: [
      { value: '3 months', label: 'concept to Enterprise GA' },
      { value: '<4s', label: 'RAG latency' },
    ],
    tags: ['RAG', 'Chrome Extension', 'Real-Time'],
    featured: true,
  },
  {
    id: 'speech-intelligence',
    title: 'Speech Intelligence Platform',
    org: 'Sanas.ai',
    summary:
      'Architected a privacy-first, edge-powered voice analytics platform processing high-fidelity audio locally without cloud PII exposure — a ClickHouse OLAP pipeline, queue-driven multi-track LLM workers for post-call CRM summaries, and a real-time active-call widget with a 30-second fraud dashboard.',
    metrics: [
      { value: '100%', label: 'conversation coverage (vs 1–3% industry baseline)' },
      { value: '<4s', label: 'call artifacts after call end' },
      { value: '60–120s', label: 'fraud-alert SLA' },
    ],
    tags: ['ClickHouse', 'LLM Workers', 'Privacy-First'],
    featured: true,
  },
  {
    id: 'unified-ml-platform',
    title: 'Unified ML Platform',
    org: 'Sanas.ai',
    summary:
      'Led a cross-functional team (DevOps / MLOps / Innovation) to consolidate fragmented tooling into a Kubernetes-native, hub-and-spoke ML platform (MLflow). Conducted audits with 10+ research scientists, resolving reproducibility and accelerating deployment.',
    metrics: [{ value: '10+', label: 'research scientists aligned' }],
    tags: ['Kubernetes', 'MLflow', 'MLOps'],
    featured: true,
  },
  {
    id: 'ai-next-strategy',
    title: 'AI-Next Adoption Strategy',
    org: 'Sanas.ai',
    summary:
      'Spearheaded the shift from "AI Users" to "Agent Directors." Established a vendor-agnostic toolchain and investment dashboard, democratizing advanced coding agents and defining the "Crawl, Walk, Run" adoption strategy.',
    metrics: [
      { value: '80%', label: 'of workforce enabled' },
      { value: '40%+', label: 'faster delivery' },
    ],
    tags: ['Enterprise Adoption', 'Strategy'],
    featured: true,
  },
  {
    id: 'gcp-telemetry',
    title: 'Cloud Telemetry & Data View',
    org: 'NovaSignal / NeuraSignal',
    summary:
      'Designed a serverless GCP telemetry architecture (Cloud Run + BigQuery) replacing manual diagnostics with real-time fleet monitoring and predictive maintenance, plus a Streamlit/Flask Data View for hospital-utilization business intelligence.',
    metrics: [],
    tags: ['GCP', 'BigQuery', 'Telemetry'],
    featured: false,
  },
  {
    id: 'healthcare-interop',
    title: 'Healthcare Interoperability',
    org: 'NovaSignal / NeuraSignal',
    summary:
      'Engineered secure cloud microservices compliant with HIPAA, HL7, and DICOM for seamless data exchange between robotic devices and hospital EMR systems, with automated compliance tooling (DICOM Decoder, SOUP Creator).',
    metrics: [],
    tags: ['HIPAA', 'HL7', 'DICOM'],
    featured: false,
  },
];

/** Career timeline — most recent first. */
export const roles: Role[] = [
  {
    company: 'Sanas.ai',
    title: 'Staff Engineer',
    period: 'Nov 2024 – Present',
    track: 'Programming',
    location: 'Bangalore, India',
    highlights: [
      'Internal technical co-founder driving zero-to-one initiatives across consumer, sales, and speech-intelligence products.',
    ],
  },
  {
    company: 'NovaSignal / NeuraSignal',
    title: 'Software Engineer',
    period: 'Nov 2020 – Nov 2024',
    track: 'Programming',
    highlights: [
      'Cloud telemetry, healthcare interoperability, and AI-driven QA automation for robotic medical devices.',
    ],
  },
  {
    company: 'Gadjoy Repair Services',
    title: 'Founder & Technician',
    period: 'Nov 2016 – Nov 2020',
    track: 'Entrepreneurial',
    location: 'Bangalore, India',
    highlights: [
      'Founded and ran a gadget repair business — 1,000+ devices and 100+ customers/month at a 4.7+ satisfaction rating.',
      'Built custom software (ledger, checklists, device tracking) that lifted operational efficiency ~80%.',
    ],
  },
  {
    company: 'Legend Technologies',
    title: 'Senior Lead Engineer',
    period: 'Jan 2013 – Nov 2016',
    track: 'Mechanical',
    highlights: [
      'Led multidisciplinary teams designing aerospace & locomotive jigs and fixtures for ISRO, Safran, and Pratt & Whitney.',
    ],
  },
  {
    company: 'Safran Engineering India',
    title: 'Trainee Engineer',
    period: 'Aug 2011 – Dec 2012',
    track: 'Mechanical',
    highlights: [
      'Mechanical design and analysis of aerospace components with advanced CAD/simulation; automated design tasks via custom scripts.',
    ],
  },
];
