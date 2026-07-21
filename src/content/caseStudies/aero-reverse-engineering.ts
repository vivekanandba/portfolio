import type { CaseStudy } from '../schema';

export const aeroReverseEngineering: CaseStudy = {
  slug: 'aero-reverse-engineering',
  projectId: 'aero-reverse-engineering',
  eyebrow: 'Case Study · Legend Technologies',
  title: 'Aerospace Reverse Engineering — rebuilding hardware without drawings',
  intro:
    'Design, reverse engineering, fabrication, and testing of a range of aerospace tooling and structures for VSSC/ISRO, Air India, ARDC, and ADA — reconstructing buildable CAD from hardware whose original documentation was gone, then re-fabricating and validating it.',
  metrics: [
    { value: 'VSSC · Air India', label: 'clients' },
    { value: 'ARDC · ADA', label: 'clients' },
    { value: 'CATIA · NX · Abaqus', label: 'toolchain' },
  ],
  problem: [
    'Aerospace tooling and structures outlive their paperwork. When the original documentation is gone, the only path to a buildable part is to reconstruct intent from the hardware itself.',
    'Ownership spanned tooling product development, fabrication quoting, first-article development, and configuration changes across cost and schedule — for multiple clients at once.',
  ],
  constraints: [
    'Reconstruct design intent from physical hardware, not drawings.',
    'Re-fabricated parts must conform and interchange like the originals.',
    'Configuration management across cost estimation and schedule.',
    'Multiple clients (VSSC/ISRO, Air India, ARDC, ADA) with distinct build processes.',
  ],
  decisions: [
    {
      decision:
        'Measure and rebuild legacy hardware as CATIA/NX models, then define and implement the build process to re-fabricate it.',
      tradeoff:
        'Reconstructing intent from hardware is slower than greenfield design — and sometimes the only path when the documentation is gone.',
    },
    {
      decision:
        'Own tooling product development, fabrication quotes, first-article development, and configuration changes end to end.',
      tradeoff:
        'Carrying the whole lifecycle across several clients is heavier than a single design task — it is what kept the rebuilt hardware buildable and accountable.',
    },
    {
      decision: 'Validate re-fabricated tooling and structures by test before acceptance.',
      tradeoff:
        'Testing rebuilt parts adds a cycle — without it, reverse-engineered hardware is a guess.',
    },
  ],
  results: [
    { value: 'Restored', label: 'buildable tooling from bare hardware' },
    { value: 'Validated', label: 'by test to conformance' },
    { value: 'Multi-client', label: 'VSSC · Air India · ARDC · ADA' },
  ],
  resultsNote:
    'Reading intent out of an artifact and rebuilding it to spec — a habit that transfers cleanly to inheriting and modernizing undocumented software systems.',
  diagramId: 'aero-reverse-engineering',
  seoDescription:
    'Case study: reverse engineering, fabrication, and testing of legacy aerospace tooling and structures for VSSC/ISRO, Air India, ARDC, and ADA — reconstructing buildable CAD from undocumented hardware.',
};
