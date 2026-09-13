import type { CaseStudy } from '../schema';

// Sources: master resume ("Design, Fabrication & Tool Proving of VSSC SONC Nose
// Cone Assembly Jig, Spinner Full Weld Jig, Forming, Locating, Checking Tools,
// and Master Tooling Gauge" — VSSC/ISRO, BEML, TASL, HAL-LSP; QAP, effort
// estimation, first-article proving); LinkedIn Projects ("Nose Cone Assemblies
// for PSLV", from Jun 2017); ENTI deck v1.4, slides 30–31 (process sheets for the
// PSOM / SITVC / non-SITVC cones "followed by the manufacturing unit") and 26–27
// (S200 integration fixture, ~4 m, 1+ month for modelling, fabrication and
// assembly); Legend deck v5.5, slides 14–16, 22, 24, 69 (photographs and CAD).
const PHOTO = 'Photo: Legend Technologies (India) Pvt. Ltd. — capability deck v5.5';
const RENDER = 'Render: Legend Technologies (India) Pvt. Ltd. — capability deck v5.5';

export const vsscTooling: CaseStudy = {
  slug: 'vssc-tooling',
  projectId: 'vssc-tooling',
  eyebrow: 'Project · Legend Technologies · ISRO',
  title: 'VSSC Launch-Vehicle Tooling — jigs and gauges for flight hardware',
  intro:
    'Design, fabrication, and first-article proving of PSLV assembly tooling for VSSC, ISRO’s lead launch-vehicle centre: jigs for the PSOM and SITVC nose-cone assemblies and the SITVC aft shroud, a spinner full-weld jig, forming/locating/checking tools, and master tooling gauges that decide whether flight hardware can be built at all — with the process sheets that let the shop build to them.',
  metrics: [
    { value: 'VSSC · ISRO', label: 'launch-vehicle client' },
    { value: 'First-article', label: 'tool proving' },
    { value: 'CATIA · UG NX', label: 'design toolchain' },
  ],
  problem: [
    'Launch-vehicle structures are built on tooling — assembly jigs, weld fixtures, checking tools, and master gauges. Each is a one-off engineering project whose tolerances define the flyable part; a tooling miss is measured in program delay, not a bug report.',
    'The hardware here sits on PSLV’s strap-on boosters. A PSOM is one of the six solid strap-on motors clustered around the first stage, and a subset of them also carry SITVC — Secondary Injection Thrust Vector Control, which steers the vehicle by injecting an aqueous strontium-perchlorate solution into the nozzle exhaust rather than gimbaling the nozzle, using tanks strapped to the motor and pressurised with nitrogen. That split is why the line runs SITVC and non-SITVC nose-cone variants, plus the SITVC aft shroud around the injection end.',
    'Delivery spans stakeholders who rarely share a room — VSSC/ISRO, BEML, TASL, and HAL-LSP — with me accountable for estimation, quality plans, fabrication, and schedule across all of them.',
  ],
  constraints: [
    'Interchangeability: parts produced from the tools must interchange — the tool defines the part.',
    'Two closely-related configurations off related tooling: cones for strap-ons with SITVC fitted and for those without, which must not be confusable on the shop floor.',
    'Every configuration is a cost / manufacturability / weight trade-off against VSSC specifications.',
    'GD&T and production tolerances designed in, and written down: every drawing needs the process sheet the production and quality teams will work from.',
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
        'Write detailed process sheets for the PSOM, SITVC and non-SITVC cones — the sequence, the datums, the inspection points — so the manufacturing unit and the quality team could build and check to them without the designer at their elbow.',
      tradeoff:
        'Process documentation is the least glamorous half of tooling design and doubles the paperwork — the ENTI deck records that it is what let the cones be “carried out flawlessly” on the floor.',
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
      file: 'media/legend-sitvc-cones-and-shrouds.jpg',
      alt: 'A row of finished PSLV strap-on nose cones and cylindrical aft shrouds on a workshop floor, bare riveted aluminium',
      wide: true,
      credit: `SITVC nose cones and aft shrouds, a production batch. ${PHOTO}, slide 15`,
    },
    {
      file: 'media/legend-psom-nose-cone-assemblies.jpg',
      alt: 'Five completed PSOM nose cone assemblies crated on pallets, each stencilled “PSOM Nose Cone Assembly” in SITVC and non-SITVC variants',
      wide: true,
      credit:
        'PSOM nose cone assemblies, crated. Photo: Legend Technologies (India) Pvt. Ltd. — published product portfolio',
    },
    {
      file: 'media/legend-psom-nose-cone-assembly.jpg',
      alt: 'A single PSOM nose cone assembly, type II, standing on its gold-anodised base ring, part number and weight stencilled down its side',
      tall: true,
      credit: `PSOM nose cone assembly, type II. ${PHOTO}, slide 16`,
    },
    {
      file: 'media/legend-sitvc-nose-cone-jig.jpg',
      alt: 'The SITVC nose-cone assembly jig: a conical locating fixture on a cream-painted steel table frame beside a workshop window',
      tall: true,
      credit: `SITVC nose-cone assembly jig. ${PHOTO}, slide 15`,
    },
    {
      file: 'media/legend-sitvc-aft-shroud-jig.jpg',
      alt: 'The SITVC aft-shroud assembly jig, a cylindrical locating fixture on a steel stand',
      tall: true,
      credit: `SITVC aft-shroud assembly jig. ${PHOTO}, slide 15`,
    },
    {
      file: 'media/legend-sonc-nose-cone-assembly-jig.jpg',
      alt: 'The SONC nose-cone assembly jig, a tiered conical fixture with clamps on a workshop bench',
      tall: true,
      credit: `SONC nose-cone assembly jig. ${PHOTO}, slide 16`,
    },
    {
      file: 'media/enti-strap-on-nose-cone-cad.jpg',
      alt: 'CAD render of a PSLV strap-on nose cone, riveted skin panels on a green base ring',
      tall: true,
      credit:
        'Strap-on nose cone, CAD. Render: ENTI Innovations Pvt. Ltd. — corporate deck v1.4, slide 30',
    },
    {
      file: 'media/legend-s200-integration-fixture-cad.jpg',
      alt: 'CAD render of the S200 integration fixture: a two-tier circular platform with yellow railings and ladders around a central ring',
      credit: `S200 solid-booster integration fixture for SHAR, ISRO — CAD; ~4 m tall, delivered on a 1+ month schedule. ${RENDER}, slide 24`,
    },
    {
      file: 'media/legend-s200-integration-fixture.jpg',
      alt: 'The S200 integration fixture as built — a large blue two-tier rotating platform with access stairs and railings, in a workshop bay',
      credit: `S200 integration fixture, as built. ${PHOTO}, slide 24`,
    },
    {
      file: 'media/legend-vssc-lifting-tilting-fixture.jpg',
      alt: 'A wheeled aluminium lifting-and-tilting fixture for loading stores onto a spacecraft, with two cradle arms on a castor base',
      credit: `Lifting and tilting fixture for loading stores on a spacecraft, VSSC. ${PHOTO}, slide 22`,
    },
    {
      file: 'media/legend-gslv-fin-panel.jpg',
      alt: 'A riveted aluminium GSLV fin panel lying flat on red-painted trestles',
      credit: `GSLV fin assembly panel, VSSC. ${PHOTO}, slide 14`,
    },
    {
      file: 'media/legend-gslv-access-platform.jpg',
      alt: 'A tall steel access platform with ladders and grating, built for GSLV work, standing in a workshop',
      tall: true,
      credit: `Access platform for GSLV. ${PHOTO}, slide 69`,
    },
  ],
  seoDescription:
    'Project: design, fabrication, and first-article proving of VSSC/ISRO PSLV assembly tooling — PSOM/SITVC nose-cone jigs, the SITVC aft shroud, a spinner full-weld jig, and master tooling gauges — in CATIA V5 and UG NX, with the process sheets the shop built to.',
};
