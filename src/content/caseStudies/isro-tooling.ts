import type { CaseStudy } from '../schema';

export const isroTooling: CaseStudy = {
  slug: 'isro-tooling',
  projectId: 'isro-tooling',
  eyebrow: 'Case Study · Legend Technologies · Safran',
  title: 'Aerospace Tooling — precision hardware for ISRO, Safran & P&W',
  intro:
    'End-to-end design, fabrication, and first-article proving of aerospace tooling — launch-vehicle assembly jigs for VSSC/ISRO, an engine test-bed augmenter for Pratt & Whitney, and composite structures — where a tolerance miss is measured in program delays, not bug reports.',
  metrics: [
    { value: 'ISRO · Safran · P&W', label: 'flagship clients' },
    { value: 'First-article', label: 'tool proving' },
    { value: 'End-to-end', label: 'lifecycle ownership' },
  ],
  problem: [
    'Launch-vehicle structures and engine test programs run on tooling: assembly jigs, weld fixtures, checking tools, and master gauges that define whether flight hardware can be built at all. Each tool is a one-off engineering project with its own physics.',
    'The work spans stakeholders who rarely share a room — VSSC/ISRO, BEML, TASL, HAL on the launch-vehicle side; CENCO, Pratt & Whitney, and Air India around a single engine test bed — and the tooling owner sits in the middle of all of them.',
  ],
  constraints: [
    'Interchangeability: components and assemblies produced from the tools must interchange — the tool defines the part.',
    'Every design is a cost / manufacturability / weight trade-off negotiated against customer specifications.',
    'First-article proving: the tool is not done when drawn, but when the first real article passes.',
    'Multi-party coordination on live facilities — the P&W 1100G augmenter had to install and remove cleanly at an existing engine test bed.',
    'Quality Assurance Plans (QAP), effort estimation, and schedule ownership alongside the engineering.',
  ],
  decisions: [
    {
      decision:
        'For the VSSC SONC nose-cone assembly jig, spinner full-weld jig, and master tooling gauges: develop multiple design configurations and select against cost, manufacturability, and interchangeability.',
      tradeoff:
        'More design cycles up front than committing to the first workable concept — cheaper than discovering the trade-off during fabrication.',
    },
    {
      decision:
        'For the P&W 1100G augmenter extension: a movable-cart design engineered for easy installation and removal at the existing CENCO test bed, with on-site liaison across Air India, CENCO, and Pratt & Whitney.',
      tradeoff:
        'Liaison and documentation overhead most designers avoid — on a live test facility, coordination is the deliverable as much as the hardware.',
    },
    {
      decision:
        'Own manufacturing transfer for filament-wound carbon-epoxy shells and laminates — material selection, winding, oven curing, machining, and testing.',
      tradeoff:
        'Composites expertise built the slow way, in the shop — the foundation for high-glass-temperature composite work that followed.',
    },
    {
      decision:
        'Reverse engineering and testing of legacy aerospace tooling (VSSC/ISRO, Air India, ARDC, ADA) with CATIA V5, UG NX, and Abaqus.',
      tradeoff:
        'Reconstructing intent from hardware is slower than greenfield design — and sometimes the only path when the original documentation is gone.',
    },
    {
      decision:
        'The foundation, at Safran Engineering: Airbus A350 XWB primary/secondary structure brackets (S11–S18 sections) and FTI harness routing for wing, pylon, and landing gear — carried from C-maturity to DFM.',
      tradeoff:
        'Working to Airbus standards means the design space is mostly rules — optimizing sheet-metal, machined, and composite brackets inside them is the discipline every later jig inherited.',
    },
  ],
  results: [
    { value: 'Proven', label: 'first articles accepted across programs' },
    { value: 'Design → service', label: 'full lifecycle delivered' },
    { value: 'CATIA · NX · Abaqus', label: 'toolchain mastery' },
  ],
  resultsNote:
    'This is the chapter the rest of the portfolio stands on: the precision, lifecycle ownership, and multi-stakeholder rigor of aerospace tooling, later applied to software systems.',
  diagramId: 'aero-tooling',
  seoDescription:
    'Case study: end-to-end aerospace tooling for ISRO, Safran, and Pratt & Whitney — launch-vehicle assembly jigs, an engine test-bed augmenter, composite fabrication, and first-article proving.',
};
