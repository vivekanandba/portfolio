import type { CaseStudy } from '../schema';

export const healthcareInterop: CaseStudy = {
  slug: 'healthcare-interop',
  projectId: 'healthcare-interop',
  eyebrow: 'Case Study · NovaSignal / NeuraSignal',
  title: 'Healthcare Interoperability — HIPAA-grade exchange for robotic devices',
  intro:
    'Secure cloud microservices connecting NovaGuide — NovaSignal’s FDA-cleared robotic stroke-assessment platform — to hospital EMR and PACS systems across the Jupiter and Venus releases: HL7, DICOM, and MLLP done properly, made testable by an EMR simulator and a “virtual hospital” that mirrored real hospital ↔ cloud topology.',
  metrics: [
    { value: 'HIPAA · HL7 · DICOM', label: 'standards compliance' },
    { value: 'EMR simulator', label: 'hospital-side workflows replicated' },
    { value: 'Virtual hospital', label: 'production-like VPC topology' },
  ],
  problem: [
    'Robotic medical devices generate exams that hospitals need inside their own EMR and PACS systems — which means speaking HL7 over MLLP and DICOM, correctly, against infrastructure that differs at every site.',
    'You cannot develop against production hospital systems, and you cannot ship healthcare data integration you have not tested. The integration problem was inseparable from a test-infrastructure problem.',
  ],
  constraints: [
    'Full standards compliance: HIPAA end to end, HL7 for clinical messaging, DICOM (including structured reports) for imaging.',
    'PHI protection verified — not assumed — across every stage of the exchange.',
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
        'A “virtual hospital”: VPC networks in GCP with serverless VPC connectors mirroring real hospital ↔ cloud topology.',
      tradeoff:
        'Network complexity most teams avoid — the only honest way to test secure data flow the way it runs in production.',
    },
    {
      decision:
        'Implement the exchange to spec — HL7 over MLLP for clinical messaging and DICOM (with structured reports) for imaging — across the qCH, reporting, core, and transmission services.',
      tradeoff:
        'Rigorous conformance to healthcare standards is slow, exacting work — it is the difference between an integration hospitals trust and one they reject.',
    },
  ],
  results: [
    { value: 'Seamless', label: 'device ↔ EMR data exchange' },
    { value: 'Tested', label: 'against a virtual hospital, in CI' },
    { value: 'Compliant', label: 'HL7 · DICOM · MLLP to spec' },
  ],
  resultsNote:
    'The EMR simulator and virtual-hospital VPC turned integration that could not be tested against production into ordinary, repeatable CI — the conformance and security tooling that rode on top became its own body of work.',
  diagramId: 'interop',
  seoDescription:
    'Case study: HIPAA/HL7/DICOM-compliant cloud microservices connecting NovaGuide robotic devices to hospital EMR/PACS systems — with a full-stack EMR simulator and a virtual-hospital VPC making the integration testable in CI.',
};
