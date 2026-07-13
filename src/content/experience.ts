import type { Project, Role } from './schema';

/**
 * Flagship projects — every claim and metric verbatim from resume v15 (the
 * served PDF). Claims beyond v15 were removed in v1.2; reinstate only after
 * shipping a resume that contains them. Featured ones lead the grid.
 */
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
    domain: 'ai-native',
    href: 'https://apps.apple.com/us/app/sanas-translate/id6748606509',
    linkLabel: 'App Store',
  },
  {
    id: 'playground',
    title: 'Playground — Audio Orchestration',
    org: 'Sanas.ai',
    summary:
      'Designed a triple-track asynchronous pipeline (FastAPI / Asyncio) running Accent Translation, Noise Cancellation, and Language Translation in one session. Optimized Triton/gRPC inference and autoscaled across AWS EKS and Modal (H100/T4).',
    metrics: [
      { value: '430k/day', label: 'requests in production' },
      { value: '<100ms', label: 'chunk latency' },
    ],
    tags: ['FastAPI', 'Triton', 'AWS EKS', 'Modal'],
    featured: true,
    domain: 'ai-native',
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
    domain: 'ai-native',
  },
  {
    id: 'speech-intelligence',
    title: 'Speech Intelligence Platform',
    org: 'Sanas.ai',
    summary:
      'Architected a privacy-first, edge-powered voice analytics platform processing high-fidelity audio locally without cloud PII exposure — a ClickHouse OLAP pipeline, queue-driven multi-track LLM workers for post-call CRM summaries, and a real-time active-call widget with a fraud dashboard.',
    metrics: [{ value: '30s', label: 'fraud-dashboard refresh' }],
    tags: ['ClickHouse', 'LLM Workers', 'Privacy-First'],
    featured: true,
    domain: 'ai-native',
    href: 'https://www.sanas.ai/speech-intelligence',
    linkLabel: 'Product page',
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
    domain: 'ai-native',
  },
  {
    id: 'ai-next-strategy',
    title: 'AI-Next Adoption Strategy',
    org: 'Sanas.ai',
    summary:
      'Spearheaded the shift from "AI Users" to "Agent Directors." Established a vendor-agnostic toolchain and investment dashboard, democratizing advanced coding agents and defining the "Crawl, Walk, Run" adoption strategy.',
    metrics: [{ value: '80%', label: 'of workforce enabled' }],
    tags: ['Enterprise Adoption', 'Strategy'],
    featured: true,
    domain: 'ai-native',
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
    domain: 'healthcare-robotics',
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
    domain: 'healthcare-robotics',
  },
  {
    id: 'ai-driven-qa',
    title: 'AI-Driven Test Automation',
    org: 'NovaSignal / NeuraSignal',
    summary:
      'Pioneered the integration of OpenAI APIs into QA workflows (AutoUI, TestAI), automating test-script generation, plus an AI-powered Jira Analyzer classifying issues and visualizing error paths.',
    metrics: [{ value: '30%', label: 'shorter regression cycles' }],
    tags: ['OpenAI APIs', 'AutoUI', 'TestAI'],
    featured: false,
    domain: 'healthcare-robotics',
  },
  {
    id: 'sanas-portal',
    title: 'Admin Portal — Releases & Timezones',
    org: 'Sanas.ai',
    summary:
      'Designed a workspace-level timezone-management system and app version distribution, enabling consistent global reporting standards across India, Philippines, and US regions.',
    metrics: [{ value: '60%', label: 'fewer support tickets' }],
    tags: ['NestJS', 'React', 'PostgreSQL'],
    featured: false,
    domain: 'ai-native',
  },
  {
    id: 'isro-tooling',
    title: 'Aerospace Tooling — ISRO / Safran / P&W',
    org: 'Legend Technologies',
    summary:
      'Design and fabrication of aerospace & locomotive jigs and fixtures for ISRO, Safran, and Pratt & Whitney, with end-to-end support across manufacturing, testing, and service — owning the entire product lifecycle.',
    metrics: [],
    tags: ['CATIA', 'Jigs & Fixtures', 'ISRO · Safran · P&W'],
    featured: false,
    domain: 'aerospace',
  },
  {
    id: 'mapshalli-volunteer',
    title: 'Stop Hunger & AirCare',
    org: 'Mapshalli (volunteer)',
    summary:
      'Contributed to a COVID-19 relief-distribution platform (Stop Hunger) and an IoT air-quality monitoring network (AirCare) in Whitefield, Bangalore.',
    metrics: [],
    tags: ['Civic Tech', 'IoT'],
    featured: false,
    domain: 'community',
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
    domain: 'ai-native',
    highlights: [
      'Internal technical co-founder driving zero-to-one initiatives across consumer, sales, and speech-intelligence products.',
      'Led the technical roadmap and weekly C-suite reviews for Sanas for Sales, and a cross-functional DevOps/MLOps/Innovation team consolidating fragmented tooling into a Kubernetes-native ML platform.',
      "Orchestrated multi-agent workflows accelerating delivery timelines by 40%+, and democratized advanced coding agents to 80% of the workforce via the 'Crawl, Walk, Run' strategy.",
    ],
  },
  {
    company: 'NovaSignal / NeuraSignal',
    title: 'Software Engineer',
    period: 'Nov 2020 – Nov 2024',
    track: 'Programming',
    domain: 'healthcare-robotics',
    highlights: [
      'Cloud telemetry, healthcare interoperability, and AI-driven QA automation for robotic medical devices.',
      'Pioneered AI-powered QA automation (OpenAI APIs — AutoUI, TestAI), reducing regression cycles by 30%.',
      'Built the Data View app (Streamlit/Flask) visualizing hospital-utilization metrics for sales and leadership.',
    ],
  },
  {
    company: 'Gadjoy Repair Services',
    title: 'Founder & Technician',
    period: 'Nov 2016 – Nov 2020',
    track: 'Entrepreneurial',
    location: 'Bangalore, India',
    domain: 'entrepreneurial',
    highlights: [
      'Founded and ran a gadget repair business — 1,000+ devices and 100+ customers/month at a 4.7+ satisfaction rating.',
      'Built custom software (ledger, checklists, device tracking) that increased operational efficiency by 80%.',
    ],
  },
  {
    company: 'Legend Technologies',
    title: 'Senior Lead Engineer',
    period: 'Jan 2013 – Nov 2016',
    track: 'Mechanical',
    domain: 'aerospace',
    highlights: [
      'Led multidisciplinary teams designing aerospace & locomotive jigs and fixtures for ISRO, Safran, and Pratt & Whitney.',
      'Provided end-to-end support in manufacturing, testing, and service — overseeing the entire product lifecycle.',
    ],
  },
  {
    company: 'Safran Engineering India',
    title: 'Trainee Engineer',
    period: 'Aug 2011 – Dec 2012',
    track: 'Mechanical',
    domain: 'aerospace',
    highlights: [
      'Mechanical design and analysis of aerospace components with advanced CAD and simulation tools; developed custom software scripts to automate design tasks, reducing design time.',
    ],
  },
];
