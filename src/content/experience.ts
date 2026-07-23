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
    href: 'https://www.sanas.ai/#playground',
    linkLabel: 'Live demo',
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
    metrics: [
      { value: '1–3% → 100%', label: 'conversation coverage' },
      { value: '4s', label: 'post-call artifacts' },
      { value: '30s', label: 'fraud-dashboard refresh' },
    ],
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
    id: 'internal-tools',
    title: 'Internal Tools Portal & Modernization',
    org: 'Sanas.ai',
    summary:
      'Took ownership of 25+ legacy internal applications across React, Vue, Python, and Node, and built a centralized, searchable Internal Tools Portal — one place for every engineering resource, on a standardized framework for future tools.',
    metrics: [
      { value: '25+', label: 'legacy apps unified' },
      { value: 'Hours → seconds', label: 'tool & doc discovery' },
    ],
    tags: ['Vue.js', 'NestJS', 'GitHub Copilot'],
    featured: false,
    domain: 'ai-native',
  },
  {
    id: 'mlops-tooling',
    title: 'MLOps Observability & Model Cards',
    org: 'Sanas.ai',
    summary:
      'Built the first end-to-end observability dashboard for the MLOps data pipeline (internal APIs + DynamoDB feeding automated quality, volume, and latency metrics) and a Model Card evaluation system bridging data linguists, DL specialists, and speech scientists.',
    metrics: [
      { value: 'End-to-end', label: 'pipeline visibility (first ever)' },
      { value: '3', label: 'specialist disciplines bridged' },
    ],
    tags: ['FastAPI', 'Plotly', 'DynamoDB'],
    featured: false,
    domain: 'ai-native',
  },
  {
    id: 'gcp-telemetry',
    title: 'Cloud Telemetry & Data View',
    org: 'NovaSignal / NeuraSignal',
    summary:
      'Designed a serverless GCP telemetry architecture (Cloud Run + BigQuery) replacing manual diagnostics with real-time fleet monitoring and predictive maintenance, plus a Streamlit/Flask Data View for hospital-utilization business intelligence.',
    metrics: [
      { value: 'Real-time', label: 'fleet monitoring' },
      { value: 'Serverless', label: 'Cloud Run + BigQuery' },
    ],
    tags: ['GCP', 'BigQuery', 'Telemetry'],
    featured: true,
    domain: 'healthcare-robotics',
  },
  {
    id: 'healthcare-interop',
    title: 'Healthcare Interoperability',
    org: 'NovaSignal / NeuraSignal',
    summary:
      'Engineered secure cloud microservices compliant with HIPAA, HL7, and DICOM for seamless data exchange between robotic devices and hospital EMR systems, with automated compliance tooling (DICOM Decoder, SOUP Creator).',
    metrics: [
      { value: 'HIPAA · HL7 · DICOM', label: 'standards compliance' },
      { value: '50%', label: 'faster deployments' },
    ],
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
    id: 'data-view',
    title: 'Data View — Hospital-Fleet Analytics',
    org: 'NovaSignal / NeuraSignal',
    summary:
      'A Streamlit/Flask analytics app giving sales, medical education, and leadership real-time insight into NovaGuide utilisation and clinical outcomes across hospitals — exam utilisation, RLS detection, and hospital performance.',
    metrics: [
      { value: 'Real-time', label: 'hospital-utilisation BI' },
      { value: 'Cross-hospital', label: 'comparison' },
    ],
    tags: ['Streamlit', 'Plotly', 'SQL · Pandas'],
    featured: false,
    domain: 'healthcare-robotics',
  },
  {
    id: 'compliance-tooling',
    title: 'Compliance & Test Tooling',
    org: 'NovaSignal / NeuraSignal',
    summary:
      'Automated verification for a regulated pipeline — a DICOM Decoder validating against TID 5100, the SOUP Creator auto-extracting open-source dependencies for security review, and infrastructure validation — all gated in CI.',
    metrics: [
      { value: 'TID 5100', label: 'DICOM conformance automated' },
      { value: 'SOUP', label: 'OSS audit automated' },
    ],
    tags: ['DICOM', 'Jenkins CI', 'Security'],
    featured: false,
    domain: 'healthcare-robotics',
  },
  {
    id: 'release-engineering',
    title: 'Release Engineering — CI/CD & Synthetic Data',
    org: 'NovaSignal / NeuraSignal',
    summary:
      'The release backbone across NovaGuide View — Jenkins CI/CD fed by synthetic TCD data and FFMPEG streams, a reusable Flask framework and Linux templates, and cloud simulators — hardening releases and supporting scale.',
    metrics: [
      { value: '60%', label: 'manual tests automated' },
      { value: '200%', label: 'user growth supported' },
    ],
    tags: ['Jenkins', 'FFMPEG', 'Flask'],
    featured: false,
    domain: 'healthcare-robotics',
  },
  {
    id: 'vssc-tooling',
    title: 'VSSC Launch-Vehicle Tooling',
    org: 'Legend Technologies',
    summary:
      'Design, fabrication, and first-article proving of launch-vehicle assembly tooling for VSSC/ISRO — the SONC nose-cone assembly jig, spinner full-weld jig, checking tools, and master tooling gauges that decide whether flight hardware can be built.',
    metrics: [
      { value: 'VSSC · ISRO', label: 'launch-vehicle client' },
      { value: 'First-article', label: 'tool proving' },
    ],
    tags: ['CATIA · UG NX', 'Jigs & Gauges', 'ISRO'],
    featured: true,
    domain: 'aerospace',
  },
  {
    id: 'safran-a350',
    title: 'Airbus A350 XWB — Structures & FTI',
    org: 'Safran Engineering India',
    summary:
      'Primary/secondary structure installation brackets (S11–S18) and flight-test-installation harness routing for wing, pylon, and landing gear on the Airbus A350 XWB — carried from conceptual C-maturity to design-for-manufacturing, to Airbus standards.',
    metrics: [
      { value: 'A350 XWB', label: 'Airbus composite widebody' },
      { value: 'C-maturity → DFM', label: 'design maturity owned' },
    ],
    tags: ['CATIA', 'Structures', 'FTI'],
    featured: false,
    domain: 'aerospace',
  },
  {
    id: 'pw-augmenter',
    title: 'P&W 1100G Test-Bed Augmenter',
    org: 'Legend Technologies',
    summary:
      'A movable-cart augmenter extension for testing the Pratt & Whitney PW1100G (the A320neo geared turbofan) at an existing CENCO engine test bed — engineered to install and remove cleanly on a live facility, with Air India / CENCO / P&W liaison.',
    metrics: [
      { value: 'PW1100G', label: 'A320neo geared turbofan' },
      { value: 'Live test bed', label: 'install & removal design' },
    ],
    tags: ['CATIA', 'Test-cell tooling', 'Pratt & Whitney'],
    featured: false,
    domain: 'aerospace',
  },
  {
    id: 'bmp2-turret',
    title: 'BMP-II Turret — FICV Study',
    org: 'Legend Technologies',
    summary:
      'Full 3D modelling and kinematic simulation of the BMP-II turret for Bharat Electronics’ Futuristic Infantry Combat Vehicle space studies — 3,000 legacy drawings reconstructed into validated, simulated geometry by an eight-engineer team in four months.',
    metrics: [
      { value: '3,000', label: 'drawing sheets modeled' },
      { value: '8', label: 'engineers led' },
    ],
    tags: ['CATIA', 'Kinematics', 'BEL · FICV'],
    featured: false,
    domain: 'aerospace',
  },
  {
    id: 'igcar-slipring',
    title: 'IGCAR Nuclear Slip Ring',
    org: 'Legend Technologies',
    summary:
      'A high-amperage slip ring for high-temperature electro-refining of spent nuclear fuel (IGCAR / Godrej) — engineered against ingress-protection, vibration, and thermal constraints, prototyped, compliance-tested, and published at NAMS 2015.',
    metrics: [
      { value: 'High-amperage', label: 'nuclear-grade slip ring' },
      { value: 'NAMS 2015', label: 'white paper published' },
    ],
    tags: ['Design', 'Prototype & test', 'IGCAR'],
    featured: false,
    domain: 'aerospace',
  },
  {
    id: 'filament-composites',
    title: 'Filament-Wound Composites',
    org: 'Legend Technologies',
    summary:
      'Manufacturing transfer and fabrication of high-glass-temperature filament-wound carbon-epoxy shells and laminates (PESIT / Siemens) — material selection, winding, oven curing, machining, and testing owned end to end.',
    metrics: [
      { value: 'Carbon-epoxy', label: 'filament-wound shells' },
      { value: 'End-to-end', label: 'manufacturing transfer' },
    ],
    tags: ['Composites', 'Filament winding', 'PESIT · Siemens'],
    featured: false,
    domain: 'aerospace',
  },
  {
    id: 'lca-navy',
    title: 'LCA-Navy Opto-Electronics',
    org: 'Legend Technologies',
    summary:
      'New-product-development design and analysis of opto-electronic assemblies for the LCA-Navy — India’s naval light combat aircraft — for the Aircraft Research & Design Centre at HAL, in CATIA and Abaqus.',
    metrics: [
      { value: 'LCA-Navy', label: 'naval combat aircraft' },
      { value: 'ARDC · HAL', label: 'design authority' },
    ],
    tags: ['CATIA · Abaqus', 'NPD', 'ARDC · HAL'],
    featured: false,
    domain: 'aerospace',
  },
  {
    id: 'aero-reverse-engineering',
    title: 'Aerospace Reverse Engineering',
    org: 'Legend Technologies',
    summary:
      'Reverse engineering, fabrication, and testing of legacy aerospace tooling and structures for VSSC/ISRO, Air India, ARDC, and ADA — reconstructing buildable CAD from hardware whose original documentation was gone.',
    metrics: [
      { value: 'VSSC · Air India', label: 'clients' },
      { value: 'CATIA · NX · Abaqus', label: 'toolchain' },
    ],
    tags: ['Reverse engineering', 'Fabrication', 'VSSC · ARDC · ADA'],
    featured: false,
    domain: 'aerospace',
  },
  {
    id: 'rail-tooling',
    title: 'Rolling-Stock Tooling — Metros & Locomotives',
    org: 'Tech Mahindra',
    summary:
      'Manufacturing-engineering tooling for Alstom rolling-stock programs — bogie, gangway, and HVAC installation fixtures and templates across the Perth METRONET C-Series, Mumbai Metro Line 3, Singapore Metro, and the E-Loco.',
    metrics: [
      { value: '4 programs', label: 'metro & locomotive fleets' },
      { value: 'Bogie · gangway · HVAC', label: 'installation fixtures' },
    ],
    tags: ['Jigs & Fixtures', 'Rolling Stock', 'Alstom'],
    featured: false,
    domain: 'rail',
  },
  {
    id: 'mapshalli-volunteer',
    title: 'Stop Hunger & AirCare',
    org: 'Mapshalli (volunteer)',
    summary:
      'Contributed to a COVID-19 relief-distribution platform (Stop Hunger) and an IoT air-quality monitoring network (AirCare) in Whitefield, Bangalore.',
    metrics: [
      { value: '2', label: 'platforms delivered' },
      { value: '5+', label: 'volunteer team' },
    ],
    tags: ['Civic Tech', 'IoT'],
    featured: false,
    domain: 'community',
    href: 'https://mapshalli.org',
    linkLabel: 'mapshalli.org',
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
    location: 'Bangalore, India',
    domain: 'healthcare-robotics',
    highlights: [
      'Cloud telemetry, healthcare interoperability, and AI-driven QA automation for robotic medical devices.',
      'Pioneered AI-powered QA automation (OpenAI APIs — AutoUI, TestAI), reducing regression cycles by 30%.',
      'Built the Data View app (Streamlit/Flask) visualizing hospital-utilization metrics for sales and leadership.',
    ],
  },
  {
    company: 'Tech Mahindra',
    title: 'Senior Engineer',
    period: 'Jan 2019 – Jan 2021',
    track: 'Mechanical',
    location: 'Bangalore, India',
    domain: 'rail',
    highlights: [
      'Designed jigs, fixtures, and installation tooling for locomotive programs — Perth Metro, Mumbai ML3 Metro, E-Loco, and Singapore Metro.',
      'Owned bogie, gangway, and HVAC installation fixtures from design through fabrication and on-site proving.',
    ],
  },
  {
    company: 'Legend Technologies',
    title: 'Senior Lead Engineer',
    period: 'Jan 2013 – Jan 2019',
    track: 'Mechanical',
    location: 'Bangalore, India',
    domain: 'aerospace',
    highlights: [
      'Led multidisciplinary teams designing aerospace & locomotive jigs and fixtures for ISRO, Safran, and Pratt & Whitney.',
      'Provided end-to-end support in manufacturing, testing, and service — overseeing the entire product lifecycle.',
    ],
  },
  {
    // Founder venture run in parallel with the roles above — day-to-day
    // operations handed to family, so it's marked as a side venture (aside)
    // rather than a competing full-time role.
    company: 'Gadjoy Repair Services',
    title: 'Founder',
    period: 'Nov 2016 – Present',
    track: 'Entrepreneurial',
    domain: 'entrepreneurial',
    aside: 'Side venture · family-run',
    highlights: [
      'Founded a gadget-repair business that still runs today — day-to-day operations handed to family (my mother, now my wife): 1,000+ devices and 100+ customers/month at a 4.7+ satisfaction rating.',
      'Built the custom software behind it (ledger, checklists, device tracking) that increased operational efficiency by 80%.',
    ],
  },
  {
    company: 'Safran Engineering India',
    title: 'Trainee Engineer',
    period: 'Aug 2011 – Dec 2012',
    track: 'Mechanical',
    location: 'Bangalore, India',
    domain: 'aerospace',
    highlights: [
      'Mechanical design and analysis of aerospace components with advanced CAD and simulation tools; developed custom software scripts to automate design tasks, reducing design time.',
    ],
  },
];
