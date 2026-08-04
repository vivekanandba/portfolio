## Summary

Staff Software Engineer with an intrapreneurial DNA and a multidisciplinary foundation spanning Mechanical, Electronics, and Software Engineering. Expert in applying the precision of aerospace design (ISRO, Safran) to build scalable, enterprise-grade AI products. Currently driving "Zero-to-One" initiatives at Sanas.ai, operating as a technical co-founder within the organization to deliver the Sanas Consumer App and Sales Copilot from concept to GA. A pioneer in AI-Native Development, orchestrating multi-agent workflows to accelerate delivery while bridging the gap between Research, Engineering, and Product strategy.

## Career Highlights

- Zero-to-One Product Leadership (Intrapreneurship): Architected and delivered Sanas for Sales—a real-time AI copilot—from raw concept to Enterprise-Ready GA in 3 months. Led the technical roadmap and weekly C-suite reviews, securing immediate adoption by analyzing live conversation context for sales agents.
- Rapid Mobile Engineering (Language Translation): Built the Sanas Consumer App (React Native) in <4 weeks with zero prior mobile experience. Orchestrated AI Agents (Cursor/Claude) to achieve 100% iOS/Android parity, creating a seamless onboarding and voice calibration experience for 9 international markets.
- Cross-Functional Orchestration: Unified fragmented DevOps, MLOps, and Innovation teams to build a centralized ML Platform. Bridged the gap between Research Scientists and Platform Engineering, implementing a Kubernetes-native ecosystem that standardized model experimentation and reduced deployment time by 50%.
- Multidisciplinary Engineering Roots: Leveraging a foundational decade in Mechanical & Aerospace Engineering (designing high-precision jigs for ISRO and Safran) and Electronics. Uniquely skilled at translating the rigor of physical engineering systems into reliable, high-performance software architectures.
- Enterprise AI Strategy: Spearheaded the "AI-Next" initiative, shifting the engineering culture from "AI Users" to "Agent Directors." Democratized advanced tooling across the organization, establishing a vendor-agnostic toolchain that optimized costs and increased developer velocity.

## Experience

### Staff Engineer | Sanas.ai | Nov 2024 – Present

**Speech Intelligence (SI) Platform (Jan 2026 – Present)**
- Designed and implemented Speech Intelligence (SI), a privacy-first, edge-powered conversational intelligence and voice analytics platform built directly on top of the company’s core Accent Translation (AT) and Noise Cancellation (NC) desktop stack. The system processes high-fidelity audio streams locally to generate real-time operational metrics, automated post-call CRM documentation, and near-real-time compliance alerts without exporting raw audio or customer PII to the cloud.
- High-Throughput Asynchronous Orchestration: Architected a distributed microservice framework backed by a message queue to ingest raw chunks, reconcile channel-wise timestamp overlaps, and store merged data efficiently within Amazon S3.
- Cascading Real-Time Analytics Pipeline: Designed a highly scalable, four-stage analytical data pipeline using a ClickHouse OLAP database. Utilized the AggregatingMergeTree engine paired with state combinators (sumState, argMaxMergeState, uniqState) to incrementally aggregate operational metrics (AHT, agent/customer talk-time ratios, distinct call volumes) across daily, weekly, and monthly rollups without re-scanning raw log data.
- Multi-Track AI Analytics Workers: Developed asynchronous queue-driven workers executing concurrent post-call LLM pipelines. Track A generates concise call summaries, discussion items, and action bullet points. Track B computes automated performance metrics, customer intent hashtags, and best-fit call dispositions.
- Context-Aware Presentation Layer: Built a multi-tier visualization framework consisting of a real-time active call widget , a VDI-whitelisted web portal enabling agents in restricted environments to copy-paste summaries into CRMs , and an administrative dashboard highlighting near-real-time fraud and misrepresentation alerts on a 30-second refresh cycle.
- Expanded conversational data coverage from an industry baseline of 1%–3% to 100% total interaction visibility across all deployed voice operations.
- Delivered structured call artifacts within 4 seconds of termination, systematically driving down After-Call Work (ACW) and overall Average Handle Time (AHT).
- Achieved an alert latency SLA of under 60–120 seconds for flagging high-severity policy breaches and fraud patterns.
- Eliminated multi-gigabyte query out-of-memory (OOM) failures by strict adherence to sorted database primary keys and partition-aware query filtering.
- _Tech:_ FastAPI, Python, Asyncio, gRPC, React, Next.js, ClickHouse OLAP, PostgreSQL, Message Queue (Kafka/RabbitMQ), Amazon S3, Distributed Redis Caching, On-device English ASR, Rule-Based NLP Redaction, LLM Text Orchestration
**Playground – Unified Audio Transformation Showcase Platform (Dec 2025 – Mar 2026)**
- Designed and implemented an interactive web platform and high-throughput audio orchestration pipeline showcasing the company’s full suite of core AI offerings: Accent Translation, Noise Cancellation, Speech Enhancement, and Language Translation. Modeled after ElevenLabs , the system serves as both a high-fidelity enterprise technology demonstration and a foundational developer platform , utilizing an asynchronous, multi-track architecture to deliver real-time audio orchestration.
- Asynchronous Multi-Track Pipeline: Engineered a triple-track asynchronous execution layer using FastAPI and Python asyncio to concurrently manage core translation, Voice Activity Detection (VAD Masking), and speaker identity profiling.
- Unified AI Product Suite Integration: Integrated distributed machine learning models to orchestrate noise cancellation, voice isolation, speech enhancement, and language translation simultaneously within a single user session.
- Inference Optimization & Cloud Scaling: Hosted deep learning models on an NVIDIA Triton Inference Server via gRPC to maintain sub-100ms chunk latency. Automated dynamic batching and horizontal auto-scaling across AWS EKS and Modal (utilizing NVIDIA H100 and T4 GPUs) to reliably serve up to 430k requests per day.
- Speculative Processing Layer: Developed an eager-ingestion workflow that intercepts browser-based audio recordings or uploads , resamples them to 16kHz mono PCM , and speculatively computes voice cloning and core translation tracks in the background before the user initiates the final request.
- Hybrid Storage & Session Security: Configured an optimized storage architecture utilizing in-memory FastAPI buffers for fast Triton communication , AWS S3 for raw audio persistence , and Redis for distributed track synchronization and metadata state caching. Hardened edge security with signature-based file validation, malware scanning, reCAPTCHA v3, and an automated 10-minute asset TTL.
- Successfully deployed the unified corporate showcase environment live at https://www.sanas.ai/#playground.
- Eliminated AI audio hallucinations by executing elementwise binary mask multiplication between synthesized audio outputs and VAD tracking maps.
- Enforced hard file constraints (max 30-second duration and 10MB file limits) at ingress to tightly regulate production cloud costs and protect against abuse.
- Implemented a custom shareability growth hack that transparently prepends a branded audio tag to local file downloads (sanas.wav) while maintaining pristine browser playback.
- _Tech:_ FastAPI, Python asyncio, gRPC, NVIDIA Triton Inference Server, AWS EKS, React, Next.js, Web Audio API, WebSockets, Modal, NVIDIA H100/T4 GPUs, Redis, Amazon S3, Sanas AT Core, Noise Cancellation & Isolation VAD, Nvidia Sortformer (Diarization), ElevenLabs STS & IVC
**Unified ML Platform – Cross-Functional Orchestration (Dec 2025 – Feb 2026)**
- Project Overview: Orchestrated the development of a centralized ML Platform to unify disparate workflows across DevOps, MLOps, and Innovation teams. I led a cross-functional team of 5 engineers to replace fragmented tooling with a standardized, scalable infrastructure.
- Strategic Requirement Gathering: Conducted deep-dive technical interviews with 10+ Research Scientists to identify critical bottlenecks, specifically "manual deployment overhead," "lack of experiment reproducibility," and "resource contention".
- Platform Architecture & Design: Architected a Kubernetes-native ecosystem incorporating MLflow for unified experiment tracking and a centralized Model Registry. This design resolved long-standing versioning conflicts and enabled reproducible model training.
- Cross-Team Coordination: aligned DevOps (infrastructure), MLOps (pipelines), and Innovation (model research) teams to implement a "Hub-and-Spoke" architecture, ensuring scientists retained flexibility while adhering to engineering standards.
- Operational Excellence: Established a Governance Framework for model evaluation and deployment, automating previously manual handoffs between research and production engineering.
- Unified 3 disparate teams (DevOps, MLOps, Innovation) under a single technical vision, eliminating siloed workflows.
- Reduced model deployment time by automating the transition from "Research" (Notebooks) to "Production" (Pipelines).
- Standardized the experimentation lifecycle for the entire science team, enabling accurate tracking of metrics and model lineage across the organization.
- _Tech:_ Python, Kubernetes (K8s), Docker, MLflow, Kubeflow, Ray (Compute Orchestration), AWS/GCP, Terraform, GitHub Actions
**Sanas for Sales – Speech Companion (Innovation Lab)**
- Jun 2025 – Aug 2025 | Technical Lead | Sanas.ai
- Led the "Zero to One" R&D and engineering of a real-time AI sales copilot, taking it from concept to enterprise-ready GA in 3 months. As the technical owner, I drove the roadmap and architecture, presenting progress in weekly reviews with the CEO. The product empowers sales agents with live objection handling and battlecards by analyzing conversation context in real-time.
- Architecture & Development: Designed a hybrid Chrome Extension and Desktop App architecture to deliver non-intrusive, real-time assistance overlaid on sales tools (e.g., Salesforce, HubSpot).
- Advanced RAG Pipeline: Built a multi-modal Retrieval-Augmented Generation (RAG) engine capable of ingesting and indexing diverse enterprise data sources (PDFs, Web links, YouTube videos) to ground AI responses.
- Latency & Performance Optimization: Engineered the end-to-end pipeline (Transcription -> Retrieval -> Generation) to minimize latency, achieving near real-time performance targets (<4s) critical for live calls.
- Evaluation Framework: Implemented automated LLM evaluation pipelines using DeepEval and Ragas to rigorously test response accuracy, hallucination rates, and safety compliance before deployment.
- Feature Delivery: Delivered critical sales enablement features including Live Objection Handling, Dynamic Battlecards, and Sentiment Analysis.
- Successfully transitioned a high-priority R&D concept into a fully functional General Availability (GA) product integrated into Sanas Core6.
- Established a scalable Knowledge Ingestion System used across future AI products.
- Reduced agent ramp-up time and improved objection handling success rates through real-time AI guidance.
- _Tech:_ Python (FastAPI), ReactJS (Chrome Extension), WebSocket, RAG (LlamaIndex/LangChain), Vector Databases, DeepEval, Ragas, Chrome Extension API, Electron, Speech-to-Text (STT) services
**Language Translation**
- Cross Platform App – B2C (Sanas Mobile) Aug 2025 – Nov 2025 | Staff Engineer | Sanas.ai
- Project Overview: Led the rapid development of the Sanas Consumer Mobile App, delivering a launch-ready React Native application in under 4 weeks. Achieved 100% iOS/Android parity and global readiness with zero prior mobile experience by pioneering an AI-orchestrated development workflow.
- AI-Native Development Strategy: Orchestrated a multi-agent workflow using Cursor, Claude, and Codex to accelerate delivery. Leveraged git worktrees to run multiple background AI agents in parallel, enabling simultaneous feature development and context switching without velocity loss.
- Android Porting & Parity: Engineered full feature parity for Android (v11-13+), implementing complex runtime permission flows for Camera, Microphone, and Notifications. Resolved platform-specific UI/UX fragmentation to ensure consistent performance across devices.
- Onboarding & Voice Calibration: Re-architected the user onboarding flow to reduce "Time to Magic" to ~1.5 minutes. Built a track-based voice calibration system with real-time visual feedback and seamless ElevenLabs voice enrollment integration.
- Global Localization Infrastructure: Implemented a scalable internationalization framework using i18next, supporting 9 languages (including Mandarin, Hindi, and Spanish) with dynamic device locale detection and runtime switching capabilities.
- Shipped 3 complex features (Onboarding, Android Port, Localization) in <1 month.
- Achieved performance targets of <2s launch time and 60fps animations on both platforms.
- Enabled immediate expansion into 9 key international markets upon launch.
- _Tech:_ React Native (Expo Managed Workflow), NativeWind, TypeScript, TanStack Query, Zustand, Supabase, AsyncStorage, WebRTC, Socket.io, i18next, PostHog Analytics, Cursor, Claude, GitHub Copilot
**AI-Next – Enterprise AI Adoption & Transformation**
- May 2025 – Present
 Full-Stack Engineer | Sanas.ai
- Overview: Spearheaded a company-wide strategic initiative to bridge a critical market gap in AI adoption, transforming engineering operations from ad-hoc usage to a "Frontier AI Firm" model. Architected the organizational shift from "AI User" to "Agent Director," establishing a structured ecosystem where humans direct autonomous agents to execute complex workflows.
- Strategic Roadmap & Vision: Defined and executed a "Crawl, Walk, Run" strategy to scale AI maturity. Transitioned the organization through phases: from individual augmentation to team-level workflow automation and enterprise orchestration.
- Tooling & Infrastructure: Implemented a vendor-agnostic toolchain to prevent lock-in, integrating best-in-class IDEs (Cursor, Windsurf) and LLMs (Claude, Gemini). Developed an "AI Tools Investment Dashboard" to track usage, cost-per-employee, and ROI across Engineering, MLOps, and QA departments.
- Cultural Transformation & Training: Evangelized "Professional AI-Assisted Engineering", moving beyond "Vibe Coding" to rigorous, test-driven methodologies. Instilled the "Shoshin" (Beginner's Mind) mindset through monthly AI Hackathons and Codeathons.
- * Governance & Best Practices:** established the "Plan vs. Code" workflow and TDD-first AI protocols. Enforced a "Security First" policy requiring mandatory SME verification of all AI outputs.
- Accelerated development velocity by integrating AI agents into core team processes.
- Democratized access to advanced coding tools, reducing the "capacity gap" for over 80% of the workforce.
- Established a scalable, secure, and budget-conscious framework for long-term AI integration.
**Portal (Feb 2025 – May 2025)**
- Team Overview
- The Sanas Portal was a collaborative, cross-functional initiative designed to extend Sanas’ AI-powered desktop application into a cloud-based administrative and analytics platform.
**Project 1: App Version Distribution – Cloud Portal**
- Feb 2025 – Apr 2025
 Full-Stack Engineer | Sanas.ai
- Developed and deployed a cloud-based application version management and distribution feature within the Sanas Admin Portal, complementing the company’s desktop release ecosystem. The system provided a single interface for administrators to monitor, manage, and securely deliver application builds across multiple global regions (India, Philippines, North America). It streamlined version tracking, rollout coordination, and security validation for General Availability (GA) and Beta releases.
- Designed End-to-End Architecture: Modeled relational schemas in portal-prod-db-instance linking App Releases and App Downloads, with keys for Release ID, Model Type ID, and Country Code.
- Automated Release Lifecycle: Integrated backend APIs with CI/CD pipelines so each desktop build automatically updated release metadata, download URLs, and SHA-256 hashes—eliminating manual steps.
- Built Interactive Portal UI: Implemented a React-based admin dashboard to visualize version status, filter by region or type (GA/Beta), and access release notes in real time.
- Enhanced Security & Integrity: Added checksum validation and controlled URL-token authentication for secure internal distribution of .exe and .msi packages.
- Cross-Functional Collaboration: Partnered with desktop, infra, and QA teams to align build cadence with portal analytics and improve release visibility.
- Reduced manual release coordination time by ≈ 70 %.
- Enabled real-time visibility into version rollouts across 3 regions.
- Increased deployment reliability through automated checksum validation.
- Laid the groundwork for a scalable global release pipeline within the portal.
- _Tech:_ React JS, Tailwind, TypeScript
 Backend: Nest JS, PostgreSQL, Prisma ORM, .NET
 Infrastructure: AWS EKS, Docker
 CI/CD: Gitlab CI/CD
 Security & Validation: SHA-256 Checksum Verification, GCP IAM Roles
**Project 2: Workspace Time Zone Selector – Cloud Portal**
- Mar 2025
 Full-Stack Engineer | Sanas.ai
- Project Overview: Designed and implemented a workspace-level time zone management system for the Sanas Admin Portal, resolving long-standing timestamp inconsistencies across distributed regions (India, Philippines, U.S.). This feature ensured 100% display consistency, aligning global operations with internal analytics through a standardized UTC-based data framework.
- Architected End-to-End Framework: Implemented workspace-scoped time zone configurations persisted in the database and applied globally across Reports, Home, and Notification pages.
- Backend Implementation (NestJS): Created TimezoneService, WorkspaceSettingsController, and a global TimezoneInterceptor. Enforced UTC storage for all timestamps while rendering based on workspace preference. Added full audit logging (UPDATE_TIMEZONE) to capture user changes.
- Frontend Integration (ReactJS): Built reusable components (TimezoneSelector, DateTimeDisplay, TimezoneBadge) and integrated a TimezoneContext provider for real-time updates. Updated dashboards to display contextual time zone indicators.
- Audit & Validation: Conducted a full production schema audit to ensure UTC compliance. Authored and executed a multi-region E2E test strategy covering DST edge cases and transitions across Manila, India, and U.S. zones.
- Achieved 100% consistency in timestamp display across all admin regions.
- Improved cross-region data accuracy for reports and scheduled tasks.
- Reduced user confusion and support tickets related to time mismatches by over 60%.
- Established a robust UTC-based data standard and auditing framework for future modules.
- _Tech:_ NestJS, TypeORM, PostgreSQL, date-fns-tz, ReactJS, Ant Design, Context API, TypeScript, Jest, React Testing Library, Cypress, AWS EKS, Docker, Gitlab CI/CD
**Internal Tools (Nov 2024 – Jan 2025)**
- Team Overview
- Brought in to modernize a complex portfolio of internal applications. Pioneered the use of AI-powered development tools like GitHub Copilot to rapidly analyze legacy systems, accelerate new development, and deliver robust, full-stack solutions across the company.
**Project 1: Internal Tools Portal & Application Modernization**
- Project Overview: Addressed critical issues of "tool sprawl" and inconsistent documentation by taking ownership of over 25 legacy internal applications and building a new, centralized portal to house them.
- Leveraged GitHub Copilot extensively to rapidly learn and diagnose over 25 disparate codebases written in React, Vue, Python, and Node.js, achieving proficiency in weeks instead of months.
- Single-handedly architected and developed a new Internal Tools Portal from the ground up, creating a unified and searchable "one-stop shop" for all engineering resources.
- Designed and implemented a standardized, scalable framework for all future internal tool development, ensuring consistency and maintainability.
- Improved Productivity: Reduced the time for engineers to find tools and documentation from hours to seconds.
- Reduced Onboarding Time: The portal was projected to cut the technical onboarding time for new engineers by 50%.
- Established Governance: Created a single source of truth that eliminated redundant tools and standardized operations.
- _Tech:_ Vue.js, React, NestJS, Node.js, Python (Flask), PostgreSQL, Docker, AWS, CI/CD, GitHub Copilot
**Project 2: MLOps Data Observability Dashboard**
- Project Overview: Developed a comprehensive data observability dashboard to provide the first-ever end-to-end visualization of the company's complex MLOps data pipeline, enabling deep analysis and strategic improvements.
- Used AI-assisted coding to accelerate the development of the entire full-stack dashboard, from data ingestion to frontend visualization.
- Engineered data connectors and a robust backend service to ingest and process data from multiple sources, including internal APIs and AWS DynamoDB.
- Mapped the entire data flow and built automated metric tracking for data quality, volume, and latency, which were then visualized in the dashboard.
- Provided Unprecedented Visibility: Gave stakeholders a real-time, holistic view of the ML data pipeline's health and performance.
- Drove Strategic Improvements: The analysis and visualizations from the dashboard provided critical, data-driven feedback that directly informed strategic decisions to improve the pipeline's architecture.
- Identified Bottlenecks: Pinpointed key inefficiencies in data processing, leading to targeted optimization efforts.
- _Tech:_ React, Plotly.js, Python (FastAPI), AWS DynamoDB, PostgreSQL, Docker, AWS, GitHub Copilot
**Project 3: MLOps Model Card System for Analytics Team**
- Project Overview: Architected and built a foundational "Model Card" system specifically for the company's multi-disciplinary analytics team to bridge the gap between Data Linguists, Computational DL Specialists, and Speech Scientists.
- Independently designed the complete database schema for the Model Card Evaluation System, creating a flexible foundation to capture diverse metrics relevant to different specialists.
- Developed the backend services and REST APIs to allow team members to programmatically log, retrieve, and compare model metadata and performance results.
- Championed the use of AI tools to automate the generation of boilerplate code, significantly speeding up the initial development phase of the system.
- Fostered Cross-Functional Collaboration: Created a common language and a single source of truth for a diverse team of specialists to collaboratively evaluate models.
- Empowered Subject-Matter Experts: Enabled Data Linguists and Speech Scientists to directly visualize and analyze model performance without needing to interpret raw code.
- Accelerated R&D Cycles: Streamlined the collaborative feedback loop between computational DL specialists and domain experts, leading to faster, more informed model improvements.
- _Tech:_ Python (FastAPI), PostgreSQL / MongoDB, Docker, AWS, GitHub Copilot

### Software Engineer | NovaSignal/NeuraSignal | Nov 2020 – Nov 2024

**Centralized Telemetry (Aug 2024 – Present)**
- Project Overview:
Developed a centralized telemetry and logging architecture for the NovaGuide robotic systems, streamlining data collection, storage, and analysis by leveraging Google Cloud Platform (GCP). This new system enabled real-time monitoring, predictive maintenance, and remote diagnostics, replacing manual, device-level diagnostics.
- Architectural Design: Designed a scalable, serverless architecture on GCP, using Cloud Run, Cloud Logging, and BigQuery to centralize telemetry and log data collection.
- Data Ingestion and Transformation: Implemented a Cloud Run service to securely ingest telemetry and log data over HTTPS, standardize formats (JSON), and parse for downstream processing.
- Real-Time Monitoring & Alerts: Integrated Cloud Monitoring and Metrics Explorer for real-time insights, anomaly detection, and system health monitoring.
- Predictive Maintenance & Analytics: Utilized BigQuery for long-term storage and advanced analytics, enabling time-series analysis and machine learning-driven predictive maintenance.
- Security & Compliance: Ensured secure data transmission and compliance with HIPAA using robust authentication, encryption, and authorization.
- Cost Efficiency & Scalability: Leveraged serverless infrastructure to reduce operational costs, handle varying data volumes from multiple hospitals, and support auto-scaling.
- _Tech:_ Cloud Run, BigQuery, Cloud Logging, Metrics Explorer, and Cloud Monitoring., Python, Docker (for containerized services), HTTPS, GCP IAM Policies., Centralized telemetry and logging reduced on-site diagnostics, improved response times, enhanced system reliability, and enabled predictive maintenance. This led to lower operational costs and improved scalability across hospital deployments.
**AutoUI Testing (Mar 2024 – Jul 2024)**
- As an Automation Test Engineer, I developed automated test scripts for a GUI application based on System Requirements Specifications (SRS). A key innovation was leveraging AI tools, including the OpenAI Assistant API, to automate the test script development process. This improved efficiency, reduced manual effort, and introduced new methods in test automation.
- AI-Driven Test Automation: Used the OpenAI Assistant API and other AI tools to automate test script creation, significantly reducing development time.
- Developed Automated Test Scripts: Created test scripts using Python, PyTest, and Pywinauto, covering all SRS items.
- Optimized Testing Framework: Improved the framework by integrating AI-generated code, creating reusable helper functions, and following best coding practices.
- Advanced Testing Strategies: Utilized AI-driven parameterization and PyTest markers to test across multiple configurations and scenarios.
- GUI Automation: Automated user interface interactions using Inspect.exe and Windows Simulator, streamlining the testing process.
- Collaboration and Version Control: Used Git for version control, integrated AI-generated scripts, and collaborated with the team on code reviews.
- Innovated Test Automation: Introduced AI into test automation, reducing development time and enhancing efficiency.
- Improved Software Quality: AI-assisted script generation increased testing coverage and software quality.
- Increased Efficiency: Reduced manual effort and optimized test execution time, supporting quicker release cycles.
- Advanced Team Capabilities: Encouraged AI adoption within the team, fostering innovation.
- Ensured Compliance: Verified that software met system requirements, aiding compliance and successful audits.
- _Tech:_ Python, PyTest, Pywinauto, OpenAI Assistant API, Vision API, Vertex AI and other AI automation tools, Visual Studio Code
**Jira Analyzer**
- Jan 2024
- The Jira Analyzer is an AI-driven tool designed to analyze Jira tickets, providing insights into system performance, data management, and navigation-related issues. The tool leverages AI to classify and categorize issues, infer error paths, and suggest solutions, all while aiding in long-form text generation for human analysis.
- Developed AI-based models to analyze and classify Jira tickets.
- Utilized ChatGPT-4 and other AI tools for prompt generation and long-form text analysis.
- Designed and implemented an architecture for outputting recommendations and hotspots in CSV format.
- Generated test scripts using Python and Pywinauto to address rapid navigation and UI click issues.
- Worked on clustering and error path identification based on system performance and navigation issues.
- Created word clouds to visualize the most common error paths and system issues.
- Automated analysis of 33% of the total Jira issues (23/69).
- Identified key system performance and navigation/UI issues that helped prioritize fixes (e.g., 12 system performance issues, 3 navigation/workflow issues).
- Streamlined the error path identification process, improving the accuracy of issue categorization and reducing manual workload for human analysis.
- Improved the efficiency of generating AI-driven prompts, resulting in a faster analysis cycle for Jira tickets.
- _Tech:_ ChatGPT-4, OpenAI Chat Assistant API, Python, Pywinauto, Matplotlib, Python scripts for high-speed UI navigation and data output., CSV for data output and analysis.
**TestAI**
- Feb 2024
- AI-Based Verification for Automated Software Testing
Developed a proof-of-concept (PoC) AI-driven system to automate the generation of test cases from Software Requirement Specifications (SRS), enhancing test coverage and traceability.
- Extracted and analyzed SRS text using ChatGPT-4 and Vision API, automating the creation of test scenarios and cases.
- Designed an AI-driven process to generate requirement trace matrices, ensuring all software features were covered and traceable to the SRS.
- Integrated a chatbot for session-based test generation, improving the accuracy and consistency of results across multiple sessions.
- Built the Test AI architecture, utilizing REST APIs to interface with test tools and backend services like MySQL for data storage and Microsoft Identity Server for authentication.
- Addressed AI limitations like hallucinated features, recommending fine-tuning with retrieval-augmented generation (RAG) to improve model accuracy.
- Efficiency: Reduced manual effort in test case generation, speeding up the testing process.
- Consistency: Improved test case accuracy and traceability, ensuring better alignment with requirements.
- Scalability: Built a scalable architecture for AI-driven test automation, adaptable to future projects.
- _Tech:_ ChatGPT-4, OpenAI Assistant API, Vision API, Python, REST API, MySQL, Andromeda Identity Server, Google Cloud Platform (GCP)
**Data View (July 2023 – Dec 2024)**
- Project Overview: Led the development of a Data View Application for a medical technology company, providing sales teams, medical education (med-ed), and upper management with critical insights into the performance and deployment of robotic systems across multiple hospitals. The application facilitated real-time data analysis, enabling stakeholders to monitor system usage and clinical outcomes.
- Extracted large datasets using SQL queries across various hospitals and conducted initial analysis in Power BI.
- Developed the first version of the Data View Application using Streamlit, backed by robust Python-based processes for efficient data handling.
- Leveraged GitHub Copilot extensively to accelerate development cycles, enabling rapid updates to the app and facilitating continuous feedback from internal customers.
- Created automated pipelines for real-time data updates and provided comprehensive visualizations of key metrics such as exam utilization, RLS detection, and hospital performance.
- Collaborated closely with cross-functional teams, ensuring the application aligned with business needs and supported data-driven decision-making.
- Empowered the sales, med-ed, and upper management teams with real-time insights into robotic system deployments, helping them track performance and optimize strategies.
- Significantly increased development speed by utilizing GitHub Copilot, allowing for frequent app updates and rapid feedback loops from internal customers.
- Reduced manual effort in reporting by automating data collection and visualization processes.
- Provided essential data for decision-making, improving resource allocation and operational efficiency in hospitals.
- Enabled cross-hospital comparison and analysis of trends, leading to targeted improvements in robotic system utilization.
- _Tech:_ SQL, Power BI, Python, Pandas, Flask, Streamlit, Plotly, Docker, Google Cloud Run, GitHub Copilot
**Saturn (November 2022 – May 2023)**
- The Saturn release of NovaGuide View (NGV) aimed to improve medical data visualization, enhance exam workflows, real-time data streaming, and optimize post-exam report generation. This project expanded NGV functionalities for exam review, signal processing, image generation, and data streaming using advanced tools like FFMPEG and synthetic TCD data generation.
- Test Strategy & Automation: Developed the overall test strategy, including SRS verification, and created automated test suites using PyTest. Designed test cases covering both functional and non-functional requirements.
- Jenkins & DevOps: Set up Jenkins for CI/CD, enabling automated builds and deployments across multiple microservices. Managed a separate test environment for isolated testing and integration.
- Synthetic Data Tools: Created internal tools to generate synthetic TCD data, crucial for testing real-time streaming and playback services, ensuring robustness.
- Mock API & Integration Testing: Reviewed and implemented mock APIs to simulate real-world medical data, supporting seamless microservice integration and testing.
- FFMPEG & Digital Audio: Gained expertise in digital audio fundamentals and binary data, leveraging FFMPEG for processing and synchronizing audio/video files for exam playback.
- Automated 60% of manual test cases, significantly reducing testing time.
- Improved product reliability by simulating real-time environments with synthetic data tools.
- Streamlined DevOps processes, enhancing deployment efficiency and team collaboration.
- _Tech:_ PyTest, Playwright, Jenkins, Python, Bash, RESTful APIs, Google Cloud Run, FFMPEG (video processing), Docker, Google Cloud Platform (GCP), AWS (for notifications via Pinpoint), FFmpeg, Pillow, Websockets, GCS Fuse
**Jupiter (April 2022 - October 2022)**
- Project Overview: The Jupiter Release was focused on enhancing NovaSignal’s NovaGuide View (NGV) system for secure healthcare data integration and real-time monitoring. It introduced new capabilities, such as advanced reporting, cloud-based data exchange using HL7 and DICOM standards, and infrastructure improvements for hospitals and cloud systems. The project aimed to ensure robust, secure data transmission between hospital EMR systems and cloud services while complying with healthcare regulations.
- Test Automation: Automated UI and API testing for key features, including reporting, qCH, core, transmission, and HL7 transformer, improving test coverage and efficiency.
- EMR Simulator Development: Developed a full-stack EMR simulator to replicate hospital-side workflows using Flask (API), Pynetdicom (DICOM), and HL7 protocols, enabling thorough testing of healthcare data exchange.
- Virtual Hospital Setup: Designed and deployed complex VPC networks in GCP with serverless VPC connectors, ensuring secure and efficient data flow between hospital systems and cloud services.
- Cybersecurity & Penetration Testing: Supported penetration testing, contributing to the security of healthcare data pipelines and compliance with industry standards.
- Infrastructure Testing Tool: Built a tool to validate the infrastructure setup by comparing microservices, storage, and databases against a golden configuration, ensuring system integrity.
- Accelerated release cycles through automated testing.
- Enhanced data security and compliance with healthcare standards.
- Improved cloud-to-hospital system integration through secure infrastructure and validation tools.
- _Tech:_ Python, Flask, Docker, GCP (Cloud Run, SQL, Storage), Serverless VPC Connectors, DICOM, HL7, MLLP, PyTest, Playwright, Penetration testing, GCP firewalls, secure VPC networks
**Galileo (July 2021 – April 2022)**
- The Galileo project focused on enhancing NovaSignal’s cloud-based platform for managing Transcranial Doppler (TCD) exams. It provided secure storage, real-time streaming of exam data, and improved reporting. The platform integrated with hospital systems using DICOM and PACS standards, giving clinicians remote access to patient data through a Progressive Web App (PWA).
- Microservices Testing: Conducted testing for key microservices like qCH, reporting, core API, and transmission to ensure reliability. This involved writing and executing test cases based on system requirements (SRS).
- SOUP Creator Tool: Developed a tool that analyzed GitHub repositories, extracting dependencies to compile a list for security reviews. The tool helped identify potential vulnerabilities in open-source components.
- PACS Server Setup: Set up a PACS server in the cloud, enabling secure storage and retrieval of medical images, facilitating sharing between hospitals and clinicians.
- Windows GUI Automation: Automated GUI tests for a Windows-based application using Python and Pywinauto, reducing manual testing efforts and improving coverage.
- Cloud Simulators: Deployed Windows VMs in the cloud with pre-configured simulators, allowing team members to test systems without needing local setups, improving efficiency.
- Security Audits: The SOUP tool automated the identification of open-source components, improving security management.
- Testing Efficiency: Automated tests for microservices and GUIs led to faster release cycles and improved system stability.
- Cloud Efficiency: Reduced setup time by using cloud simulators, streamlining the testing process.
- _Tech:_ Python, Pywinauto, Jenkins, GCP, AWS, Cloud SQL, Cloud Run, DICOM, PACS, GitHub, Docker, Flask, PyTest, Playwright
**Venus (February 2021 – June 2021)**
- Project Overview: The Venus project at NovaSignal focused on developing the NovaGuide View Cloud App, a cloud-based platform for managing Transcranial Doppler (TCD) exams. This app facilitated secure real-time uploading, storing, and viewing of TCD data using Google Cloud Platform (GCP). Key features included live streaming, advanced Circle of Willis (CoW) visualizations, and physician-entered interpretations stored as DICOM files.
- Automated and manually tested the core, reporting, and qCH modules.
- Developed a DICOM Decoder Tool to automate the verification and validation of DICOM SR and images, ensuring compliance with DICOM TID 5100 standards.
- Conducted thorough testing to ensure PHI protection, preventing data leaks or mishandling.
- Validated critical attributes, values, and file conformance using exam.json and sequence_repository.json for structural consistency.
- Supported verification for various exam types, including custom protocols, monitoring, emboli detection, and VMR exams.
- Integrated the Decoder Tool into CI/CD pipelines using Jenkins, with automated validation through PyTest.
- Implemented additional validation checks using a five-way structural design pattern to ensure conformance of DICOM images.
- Increased Efficiency: Automated DICOM file verification, reducing manual efforts and minimizing errors.
- Enhanced Compliance: Ensured strict adherence to DICOM standards, avoiding costly errors.
- Improved Reliability: Developed robust processes, reducing bugs in medical imaging data validation.
- PHI Security: Ensured comprehensive protection of patient data by thoroughly testing all tool outputs and processes.
- _Tech:_ Python, PyTest, Jenkins, Git, Docker, Terraform, DICOM, PHI Compliance, Google Cloud Platform (GCP), Google Cloud Run
**Europa (November 2020 - January 2021)**
- Europa is a cloud-based project focused on automating the management, processing, and analysis of medical imaging data to improve clinical decision-making. Key focus areas include automating backend API development, setting up server-side frameworks, and creating reusable project templates for deployment in a medical environment.
- API Automation: Led the automation of RESTful API development, enabling faster iterations and scaling across multiple environments.
- Flask Backend Framework: Developed a reusable Flask-based backend framework for API integration, automating key backend functions.
- Linux Templates: Created standardized Linux templates for server-side deployment, ensuring consistency and reducing setup time.
- 50% Reduction in Deployment Time: Automation reduced manual setup time, accelerating development cycles.
- 30% API Performance Boost: Optimized APIs improved response times, enhancing data retrieval efficiency for users.
- Enhanced Security and Compliance: Ensured encryption, secure uploads, and adherence to healthcare standards (HIPAA).
- Scalability: Supported 200% user growth by leveraging cloud-based architecture for dynamic scaling.
- _Tech:_ Python (Flask), Docker, GCP, RESTful APIs

### Founder & Technician | Gadjoy Repair Services | Nov 2016 – Nov 2020

**General**
- http://gadjoy.in/
- Founded and managed a successful laptop and gadget repair service, handling over 1,000 devices and 100+ customers per month, and achieving a 4.7+ customer satisfaction rating across multiple platforms.
- Developed and implemented custom software systems to monitor customer devices, manage checklists, and streamline ledger and enquiry entries. Leveraged Excel as a functional database, utilizing advanced features to trace device activities, which increased operational efficiency by ~80%.
- Acquired transferable skills in team management, customer service, and business development, alongside technical expertise in software development, database management, and process automation, enhancing capabilities relevant to software engineering roles.

### Community Volunteer | Bangalore, India | Jan 2018 – Jan 2023

**General**
- Organization:
Mapshalli – Non-Profit Specializing in IoT, Analytics, Deep Learning
- Duration:
January 2018 – January 2022
- Activities:
- Stop Hunger: Developed a software platform to coordinate COVID-19 relief efforts among various NGOs.
- AirCare: Contributed to a community-managed network of air quality sensors.
- Clients:
Public
- Team Size:
5+
- Value Addition:
- Provided hardware support.
- Worked hands-on with applications and analytics for data obtained from the projects.

### Senior Lead Engineer | Legend Technologies | Jan 2013 – Nov 2016

**General**
- Led end-to-end design and fabrication of jigs and fixtures for aerospace clients like ISRO, Safran, and Pratt & Whitney.  Managed cross-functional teams and supplier relationships.
**Fabrication of Augmenter Extension & Movable Cart for Easy Installation and Removal at an Existing Engine Test Bed for Testing P&W 1100G**
- Customer:
CENCO Inc. | Pratt & Whitney | Air India
- Position:
Designer, Production & Purchase Liaison, Installation Liaison, Project Manager
- Designed tooling jigs for assembly.
- Provided welding and assembly technical support along with documentation.
- Estimated effort and facilitated installation coordination between Air India, CENCO, and Pratt & Whitney.
- Software:
CATIA V5, MS Office
- Project Location:
- Onsite: New Delhi
- Offshore: Bangalore
**3D Modelling & Kinematics of BMP II Turret for Space Studies for FICV (Futuristic Infantry Combat Vehicle)**
- Customer:
Bharat Electronics Limited
- Formed and led a project team of 8 members.
- Managed 3D modeling of 3000 drawing sheets.
- Directed the project management of the team over a 4-month period.
- Ensured quality assurance by assigning exclusive engineers to the task.
- Conducted kinetic simulations of the BMP II turret, including traverse, elevation, gearing, and ammunition supply systems.
- Successfully handled customer interactions, receiving positive feedback.
**Design & Development of High Amperage Slipring for High Temperature Electro-refining of Spent Nuclear Fuel**
- Customer:
Godrej & Boyce Mfg. Ltd. | IGCAR
- Position:
Designer, Production & Purchase Liaison, Testing Liaison, Project Manager
- Developed design configurations to meet volumetric and functional constraints.
- Addressed environmental parameters such as ingress protection, vibration, and thermal requirements as per customer specifications.
- Tested the prototype for functional and environmental compliance.
- Managed the balance of key product attributes, including cost, weight, performance, and delivery.
- Software:
CATIA V5, MS Office
- Project Location:
- Onsite: Mumbai
- Offshore: Bangalore
**Design, Fabrication & Tool Proving of VSSC SONC Nose Cone Assembly Jig, Spinner Full Weld Jig, Forming, Locating, Checking Tools, and Master Tooling Gauge**
- Customer:
VSSC, ISRO | BEML | TASL | HAL-LSP
- Position:
Designer, Production & Purchase Liaison, Installation Liaison, Project Manager
- Accountable for effort estimation, QAP, tool development, fabrication, schedule coordination, and first article proving.
- Developed different design configurations for optimized cost, manufacturability, and interchangeability of components and assemblies from the tools.
- Software:
CATIA V5, UG NX 10, MS Office
- Project Location:
Offshore: Bangalore
**Fabrication of Filament Wound Carbon Epoxy Shells & Laminates**
- Customer:
- PESIT | Siemens
- Position:
- Production & Purchase Liaison, Testing Liaison
- Acted as the key manufacturing representative for manufacturing transfer.
- Oversaw material selection, filament winding, oven curing, machining, and testing processes for fabricating high glass temperature composites.
- Project Location:
- Onsite: Vijayawada
- Offshore: Bangalore
**Design, Reverse Engineering, Fabrication & Testing of Various Aerospace Tooling & Structures**
- Customer:
VSSC, ISRO, Air India, ARDC, ADA
- Position:
Designer, Production & Purchase Liaison, Testing Liaison
- Accountable for tooling product development, tool fabrication quotes, and first article development.
- Managed configuration changes, including cost estimation and schedule coordination.
- Defined and implemented build processes for the project.
- Software:
CATIA V5, UG NX 10, Abaqus
- Project Location:
Offshore: Bangalore
**General Management, Technical Documentation, Logistics, Marketing & Accountancy, Establishing Composite Labs**
- Customer:
Various
- Position:
Manager, Marketing
- Managed the establishment of composite laboratories and engineering services.
- Handled general management, technical documentation, logistics, marketing, and accountancy for the projects.
- Project Location:
- Onsite: Mysore, Colleges in South India
- Offshore: Bangalore
**Design & Development of Opto-Electronic Assemblies for LCA-Navy**
- Client:
Aircraft Research & Design Center (ARDC), Hindustan Aeronautics Limited
- Duration:
January 2013 – June 2014
- Role:
Engineer
- Skills Used:
New Product Development, CATIA, Abaqus

### Trainee Engineer | Safran Engineering India | Aug 2011 – Dec 2012

**General**
- Overview: Design, development & analysis of engine components, aircraft equipment, automotive components & software development.
- Projects Involved in (Program: Airbus A350 XWB, Phase: ADF-ADAP)
- Primary and Secondary Structures (Installation Structure Brackets) - S11/12, S13/14, S15/21, S16/18
- Creation, modification of assemblies and drawings for A350 Structure in accordance with aerospace (explicitly Airbus) standards.
- Designing components along with creation of drawings for Primary as well as Secondary Structure, Brackets & Associated Assemblies.
- Optimization of fixed & loaded brackets (sheet metal, machined & Composite brackets)
- Designing the Secondary structure supports electrical harness by using the guidelines of the provided conceptual design.
- Provided fixation details for the bracket’s installation over the primary structure.
- FTI (Flight Test Installation) - Wing, Pylon & Landing Gear
- Design for Manufacturing (DFM) of component & subassemblies (from C-Maturity to DFM Parts).
- Harness Routing Design for the precise requirements of FTI Equipment’s.
- FTI Installation Positioning & assembly for the explicit measure of Flight Test Parameters.
- DFM installation drawings –Bracket Installation, Washing Line, Harness Protection & System Installation (for the various measures that are needed for Flight Test).

## Skills

- **General:** Sales, Marketing, Entrepreneurial
- **Technology:** Data science, Machine Learning, Artificial Intelligence, IoT, Additive Manufacturing, Mechanical Design, Manufacturing, Tooling
- **Languages:** Python, JavaScript, TypeScript, C#
- **AI/ML Tools:** OpenAI (Open AI Assistant, Vision API), Gemini (Vertex AI, Vision AI)
- **Frameworks:** Flask, VueJS, Playwright, NestJS, ReactJS, .NET
- **Data Analysis:** PowerBI, Juptyer Notebooks, Anaconda
- **Cloud:** GCP (VM, Serverless, VPN, Setup), AWS (EC2, S3, Route 53)
- **Databases:** MongoDB, MySQL, SQLite, PostgreSQL
- **OS:** Windows, Linux, Raspberry Pi, MacOS
- **Software Misc:** Photoshop, GIT, GitHub, Jira, Arena, MS Office, CorelDraw
- **Documentation:** MS Office (Excel, Word, PowerPoint, Access, Visio)
- **Design:** CATIA V5, Siemens NX, Autodesk Inventor, AutoCAD, Solid Edge, Pro-E
- **Analysis:** Ansys, MSC Nastran/Patran, Abaqus
- **PDM:** PDM Link SSCI, ENNOVIA VPM
- **Hardware:** Network & Hardware, Gadget repairs
- **Mechanical:** Welding, CNC
- **Electronics:** Soldering, Basic PCB Design

## Education

- Bachelor of Engineering (Mechanical Engineering) | 2007-2011 | M.V.J.College of Engineering (Visvesvaraya Technological University) | First Class with Distinction | 78.26%
- PUC in Science {Physics, Chemistry, Maths, Biology}  | St. Joseph’s Pre-University College (Department of Pre University Education, Karnataka) | 2005-2007 | 61.83%
- SSLC | St. Joseph’s Indian High School (Karnataka Secondary Education Board) | 2005 | 78.88%

## Patents & Publications

- Patent: “System and Method of Generating Image of Vascular Flow Network.”  - US20230329668A1
- Community Project: Supported an IoT-based air quality monitoring system in Whitefield.
- White Paper Presented on “Design & Development of High Amperage Slip ring” at NAMS 2015, SAME, ISRO.

## Certifications & Training

- Attended BEL Quality Fundamental for MSMEs @ BEQI, BEL Bangalore.
- Organizing Committee Member of 31st National Convention of Mechanical Engineers, IEI
- Passed the Certificate ‘A’ Examination for NCC.
- Completed courses in Python, Data Science, and Machine Learning (Andrew Ng’s “Deep Learning”, “Machine Learning”).
- Associate Member of “Indian Institute of Production Engineers”, “Institution of Engineers (India)”, “Aeronautical Society of India”, “ISAMPE(Indian society for Advancement of materials and Processing Engineering)”.
- Completed Center for Continuing Education @ IISC in Finite Element Method | Analysis & Design of Composite Structures.
- Completed “A2” Level in German Language at Goethe Institute.
- 2nd Place at “National Level Students Symposium MECH I-PRIX-10” for Paper Presentation on “Structural Heath Monitoring”.
- Seminars on “Tsunami Warning & Mitigation Systems, Space Debris, Bio mechatronics”
- Secured 2nd Place in Intra-mural Quiz at “Prerana” Cultural fest.
- Completed The Junior Level Program of “All India General Knowledge Examination” with Distinction.
- Participated in 2nd International Level Science Talent Examination and secured 2nd Class in School Level.
- Attended Training at CADD Centre on Catia & Ansys, & obtained a “Diploma in 3D Modeling & Analysis
- “Organization Study” at Bharat Fritz Werner Ltd.(BFW)