import type { CaseStudy } from '../schema';

export const vsscTooling: CaseStudy = {
  slug: 'vssc-tooling',
  projectId: 'vssc-tooling',
  eyebrow: 'Project · Legend Technologies · ISRO',
  title: 'VSSC Launch-Vehicle Tooling — jigs and gauges for flight hardware',
  intro:
    'Design, fabrication, and first-article proving of PSLV assembly tooling for VSSC, ISRO’s lead launch-vehicle centre: jigs for the PSOM and SITVC nose-cone assemblies and the SITVC aft shroud, a spinner full-weld jig, forming/locating/checking tools, and master tooling gauges that decide whether flight hardware can be built at all.',
  metrics: [
    { value: 'VSSC · ISRO', label: 'launch-vehicle client' },
    { value: 'First-article', label: 'tool proving' },
    { value: 'CATIA · UG NX', label: 'design toolchain' },
  ],
  problem: [
    'Launch-vehicle structures are built on tooling — assembly jigs, weld fixtures, checking tools, and master gauges. Each is a one-off engineering project whose tolerances define the flyable part; a tooling miss is measured in program delay, not a bug report.',
    'The hardware here sits on PSLV’s strap-on boosters. A PSOM is one of the six solid strap-on motors clustered around the first stage, and a subset of them also carry SITVC — Secondary Injection Thrust Vector Control, which steers the vehicle by injecting an aqueous strontium-perchlorate solution into the nozzle exhaust rather than gimbaling the nozzle, using tanks strapped to the motor and pressurised with nitrogen. That split is why the line runs SITVC and non-SITVC nose-cone variants, plus the SITVC aft shroud around the injection end.',
    'Delivery spans stakeholders who rarely share a room — VSSC/ISRO, BEML, TASL, and HAL-LSP — with the tooling owner accountable for estimation, quality plans, fabrication, and schedule across all of them.',
  ],
  constraints: [
    'Interchangeability: parts produced from the tools must interchange — the tool defines the part.',
    'Two closely-related configurations off related tooling: cones for strap-ons with SITVC fitted and for those without, which must not be confusable on the shop floor.',
    'Every configuration is a cost / manufacturability / weight trade-off against VSSC specifications.',
    'First-article proving: the tool is not done when drawn, but when the first real article passes.',
    'Quality Assurance Plans (QAP), effort estimation, and schedule ownership alongside the engineering.',
  ],
  decisions: [
    {
      decision:
        'Develop multiple design configurations for the PSOM/SITVC nose-cone assembly jigs, spinner full-weld jig, and master tooling gauges, and select against cost, manufacturability, and interchangeability.',
      tradeoff:
        'More design cycles up front than committing to the first workable concept — far cheaper than discovering the trade-off during fabrication.',
    },
    {
      decision:
        'Own the full chain: effort estimation, QAP, fabrication with BEML/TASL/HAL liaison, and first-article proving.',
      tradeoff:
        'Coordination and documentation overhead most designers avoid — on flight hardware, it is the deliverable as much as the tool.',
    },
    {
      decision: 'Model and detail in CATIA V5 and UG NX 10 for buildability and downstream reuse.',
      tradeoff:
        'Rigorous, standards-bound CAD is slower than sketch-and-build — it is what let the tools be proven and reused rather than re-derived.',
    },
  ],
  results: [
    { value: 'Proven', label: 'first articles accepted' },
    { value: 'Interchangeable', label: 'parts across the tool set' },
    { value: 'Reused', label: 'configurations across programs' },
  ],
  resultsNote:
    'The precision and lifecycle ownership here — the tool defines the part, and proof means a real article passing — is the discipline the rest of the portfolio was built on.',
  diagramId: 'vssc-tooling',
  gallery: [
    {
      file: 'media/legend-s200-integration-fixture.jpg',
      alt: 'The S200 integration fixture — a large blue rotating platform with access stairs and railings, built for solid-booster integration',
      credit: 'S200 integration fixture. Photo: Legend Technologies (India) Pvt. Ltd.',
    },
  ],
  seoDescription:
    'Project: design, fabrication, and first-article proving of VSSC/ISRO PSLV assembly tooling — PSOM/SITVC nose-cone jigs, the SITVC aft shroud, a spinner full-weld jig, and master tooling gauges — in CATIA V5 and UG NX.',
};
