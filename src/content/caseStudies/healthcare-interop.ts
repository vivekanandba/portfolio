import type { CaseStudy } from '../schema';

export const healthcareInterop: CaseStudy = {
  slug: 'healthcare-interop',
  projectId: 'healthcare-interop',
  eyebrow: 'Case Study · NovaSignal / NeuraSignal',
  title: 'Healthcare Interoperability — HIPAA-grade exchange for robotic devices',
  intro:
    'Secure cloud microservices connecting NovaGuide — NovaSignal’s FDA-cleared robotic stroke-assessment platform — to hospital EMR and PACS systems across the Jupiter and Venus releases: HL7, DICOM, and MLLP done properly, with the simulators and compliance tooling that made it testable at all.',
  metrics: [
    { value: 'HIPAA · HL7 · DICOM', label: 'standards compliance' },
    { value: 'TID 5100', label: 'DICOM conformance automated' },
    { value: '50%', label: 'faster deployments' },
  ],
  problem: [
    'Robotic medical devices generate exams that hospitals need inside their own EMR and PACS systems — which means speaking HL7 over MLLP and DICOM, correctly, against infrastructure that differs at every site.',
    'You cannot develop against production hospital systems, and you cannot ship healthcare data integration you have not tested. The integration problem was inseparable from a test-infrastructure problem.',
  ],
  constraints: [
    'Full standards compliance: HIPAA end to end, HL7 for clinical messaging, DICOM (including structured reports) for imaging.',
    'PHI protection verified — not assumed — across every tool output and pipeline stage.',
    'Security posture demonstrated through penetration testing.',
    'No access to real hospital systems for development or CI.',
  ],
  decisions: [
    {
      decision:
        'Build a full-stack EMR simulator (Flask, Pynetdicom, HL7) replicating hospital-side workflows.',
      tradeoff:
        'A significant investment in software that ships to no customer — it converted untestable integration work into ordinary CI.',
    },
    {
      decision:
        'A "virtual hospital": VPC networks in GCP with serverless VPC connectors mirroring real hospital ↔ cloud topology.',
      tradeoff:
        'Network complexity most teams avoid — the only honest way to test secure data flow the way it runs in production.',
    },
    {
      decision:
        'A DICOM Decoder tool automating verification of DICOM SR and images against the TID 5100 standard, wired into CI via Jenkins.',
      tradeoff:
        'Encoding the standard as executable checks is tedious up front — every subsequent release gets conformance for free.',
    },
    {
      decision:
        'The SOUP Creator: automated extraction of open-source dependencies from repositories for security review.',
      tradeoff:
        'Another internal tool to maintain — it turned dependency auditing from a manual chore into a generated artifact.',
    },
    {
      decision:
        'A reusable Flask backend framework and standardized Linux deployment templates (Europa) underneath the microservices.',
      tradeoff:
        'Framework-building time before feature time — repaid across every service that followed.',
    },
  ],
  results: [
    { value: 'Seamless', label: 'device ↔ EMR data exchange' },
    { value: 'Automated', label: 'compliance validation in CI' },
    { value: '50%', label: 'reduction in deployment time' },
  ],
  resultsNote:
    'The compliance tooling outlived the releases it was built for — the DICOM Decoder and SOUP Creator became standing infrastructure for audits and security reviews.',
  diagramId: 'interop',
  seoDescription:
    'Case study: HIPAA/HL7/DICOM-compliant cloud microservices connecting robotic medical devices to hospital EMRs — with an EMR simulator, a virtual-hospital VPC, and automated DICOM conformance tooling in CI.',
};
