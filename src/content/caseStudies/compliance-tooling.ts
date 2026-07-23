import type { CaseStudy } from '../schema';

export const complianceTooling: CaseStudy = {
  slug: 'compliance-tooling',
  projectId: 'compliance-tooling',
  eyebrow: 'Case Study · NovaSignal / NeuraSignal',
  title: 'Compliance & Test Tooling — proving HIPAA-grade data by machine',
  intro:
    'The automated tooling that made a regulated medical-device pipeline verifiable: a DICOM Decoder checking structured reports and images against the TID 5100 standard, the SOUP Creator auto-extracting open-source dependencies for security review, and an infrastructure-validation tool — all gated in CI so conformance and PHI protection were verified, not assumed.',
  metrics: [
    { value: 'TID 5100', label: 'DICOM conformance automated' },
    { value: 'SOUP', label: 'OSS dependency audit automated' },
    { value: 'CI-gated', label: 'PHI protection verified' },
  ],
  problem: [
    'In a regulated medical-device pipeline, "we think it complies" is not evidence. DICOM conformance, PHI protection, and open-source provenance all had to be demonstrable on every release — and doing that by hand does not scale across releases.',
    'The verification work was as much a part of shipping as the features it guarded.',
  ],
  constraints: [
    'DICOM structured reports and images must conform to TID 5100 — checked, not trusted.',
    'PHI protection verified across every tool output and pipeline stage.',
    'Open-source components auditable for security review.',
    'Everything runs unattended in CI, on every build.',
  ],
  decisions: [
    {
      decision:
        'Build a DICOM Decoder that validates DICOM SR and images against TID 5100, wired into CI via Jenkins and PyTest.',
      tradeoff:
        'Encoding the standard as executable checks is tedious up front — every subsequent release gets conformance for free.',
    },
    {
      decision:
        'Build the SOUP Creator to extract open-source dependencies from repositories automatically for security review.',
      tradeoff:
        'Another internal tool to maintain — it turned dependency auditing from a manual chore into a generated artifact.',
    },
    {
      decision:
        'Add an infrastructure-validation tool that compares microservices, storage, and databases against a golden configuration.',
      tradeoff:
        'Up-front work to define "golden" — it caught drift before it reached a hospital deployment.',
    },
  ],
  results: [
    { value: 'Automated', label: 'DICOM (TID 5100) conformance in CI' },
    { value: 'Generated', label: 'OSS dependency audits' },
    { value: 'Standing', label: 'infrastructure for audits & security reviews' },
  ],
  resultsNote:
    'The tooling outlived the releases it was built for — the DICOM Decoder and SOUP Creator became standing infrastructure across the program.',
  diagramId: 'compliance-tooling',
  seoDescription:
    'Case study: automated compliance and test tooling for a regulated medical-device pipeline — a DICOM Decoder (TID 5100), the SOUP Creator for OSS dependency audits, and infrastructure validation, all gated in Jenkins CI.',
};
