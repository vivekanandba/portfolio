import type { CaseStudy } from '../schema';

// Sources: master resume ("Design, Reverse Engineering, Fabrication & Testing of
// Various Aerospace Tooling & Structures" — VSSC/ISRO, Air India, ARDC, ADA;
// designer, production & purchase liaison, testing liaison); ENTI deck v1.4,
// slides 24–25 (CFM56 workstation adapter: "neither drawings nor models were
// provided — only the pictures", erected at the client's premises, production
// team inducted from inception); Legend deck v5.5, slide 21 (the adapter with
// an engine in it, and its CAD).
const PHOTO = 'Photo: Legend Technologies (India) Pvt. Ltd. — capability deck v5.5';

export const aeroReverseEngineering: CaseStudy = {
  slug: 'aero-reverse-engineering',
  projectId: 'aero-reverse-engineering',
  eyebrow: 'Project · Legend Technologies',
  title: 'Aerospace Reverse Engineering — rebuilding hardware without drawings',
  intro:
    'Design, reverse engineering, fabrication, and testing of a range of aerospace tooling and structures for VSSC/ISRO, Air India, ARDC, and ADA — reconstructing buildable CAD from hardware whose original documentation was gone, then re-fabricating and validating it. The CFM56 maintenance workstation adapter for Air India’s MRO group is the sharpest example: replicated from photographs alone.',
  metrics: [
    { value: 'VSSC · Air India', label: 'space & airline clients' },
    { value: 'ARDC · ADA', label: 'aircraft-design clients' },
    { value: 'CATIA · NX · Abaqus', label: 'toolchain' },
  ],
  problem: [
    'Aerospace tooling and structures outlive their paperwork. When the original documentation is gone, the only path to a buildable part is to reconstruct intent from the hardware itself.',
    'For the CFM56 workstation adapter, the MRO group had neither drawings nor models — only pictures of the existing structure — and the replacement had to be designed, analysed, manufactured and erected at their premises.',
    'Ownership spanned tooling product development, fabrication quoting, first-article development, and configuration changes across cost and schedule — for multiple clients at once.',
  ],
  constraints: [
    'Reconstruct design intent from physical hardware — or from photographs of it — not drawings.',
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
        'For the adapter, extrapolate the missing data from the team’s own experience of engine handling, and induct the production team from the inception phase.',
      tradeoff:
        'Designing with fabricators in the room from day one slows the first sketches — it removed design iterations later, and let outdated parts of the original be replaced with current technology instead of copied.',
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
  gallery: [
    {
      file: 'media/legend-cfm56-workstation-adapter.jpg',
      alt: 'A CFM56 engine held in the grey steel workstation adapter, its fan case open, in a maintenance hangar',
      wide: true,
      credit: `The CFM56 maintenance workstation adapter with an engine in it, Air India MRO. ${PHOTO}, slide 21`,
    },
    {
      file: 'media/legend-cfm56-workstation-adapter-cad.jpg',
      alt: 'CAD render of the workstation adapter: four steel columns and cross-beams cradling an engine on a base plate',
      credit: `The adapter as designed — from photographs of the original. ${PHOTO}, slide 21`,
    },
    // Legend's own published photo of the tooling standard this design work fed into.
    {
      file: 'media/legend-centre-wing-assembly-jig.jpg',
      alt: 'A tall yellow modular centre-wing assembly jig, its members stencilled with FRL, centreline and bulkhead datums plus flight-direction arrows',
      credit:
        'ADE SWIFT centre-wing assembly jig — illustrative of the tooling standard this work was built to. Photo: Legend Technologies (India) Pvt. Ltd.',
    },
  ],
  seoDescription:
    'Project: reverse engineering, fabrication, and testing of legacy aerospace tooling and structures for VSSC/ISRO, Air India, ARDC, and ADA — including a CFM56 maintenance workstation adapter replicated from photographs alone.',
};
