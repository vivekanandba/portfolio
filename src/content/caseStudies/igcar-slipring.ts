import type { CaseStudy } from '../schema';

// Sources: master resume / LinkedIn Projects (Sep–Dec 2015; designer, production
// and purchase liaison, testing liaison, project manager; NAMS 2015 white paper);
// Legend deck v5.5, slide 58 (installation photographs, exploded CAD), slides
// 39–45 (the division's slip-ring architecture), slide 60 (division team table:
// "Design — Vivekanand B"), slides 61/84/86 (clean room, assembly room, test rig).
const PHOTO = 'Photo: Legend Technologies (India) Pvt. Ltd. — capability deck v5.5';

export const igcarSlipring: CaseStudy = {
  slug: 'igcar-slipring',
  projectId: 'igcar-slipring',
  eyebrow: 'Project · Legend Technologies · IGCAR',
  title: 'IGCAR Slip Ring — high amperage in a spent-fuel environment',
  intro:
    'Design and development of a high-amperage slip ring for high-temperature electro-refining of spent nuclear fuel (IGCAR / Godrej) — engineered against volumetric, vibration, thermal, and ingress-protection constraints, prototyped, and proven in compliance testing, then published as a NAMS 2015 white paper. Designed from the seat of Legend’s VSSC-licensed slip-ring division.',
  metrics: [
    { value: 'High-amperage', label: 'nuclear-grade slip ring' },
    { value: 'Prototype', label: 'built & compliance-tested' },
    { value: 'NAMS 2015', label: 'white paper published' },
  ],
  problem: [
    'IGCAR needed a slip ring that survives what almost nothing survives: high amperage under the volumetric, vibration, thermal, and ingress-protection constraints of high-temperature electro-refining of spent nuclear fuel.',
    'The division’s standard architecture — beryllium-copper brush wire on gold-plated, electrode-grade copper U-groove rings, PCB termination, epoxy potting and IP sealing, the upgrade from the silver-graphite design ISRO had transferred in 2000 — was the starting point. High current and high temperature pushed every element of it.',
    'In a spent-fuel environment, analysis alone is not sufficient evidence — the part has to be built and proven.',
  ],
  constraints: [
    'Nuclear-environment specifications: ingress protection, vibration, and thermal requirements per customer spec.',
    'High-amperage performance inside a tight volumetric envelope.',
    'The product quadrilateral — cost, weight, performance, delivery — balanced, not maximized.',
    'Compliance demonstrated by test, not by analysis alone — on the division’s own rotational test rig and in its class-10,000 clean room.',
  ],
  decisions: [
    {
      decision:
        'Iterate design configurations against the volumetric and functional constraints before committing.',
      tradeoff:
        'More configuration work up front — the envelope and the environment left little room to correct later.',
    },
    {
      decision:
        'Build a prototype and prove it in functional and environmental compliance testing.',
      tradeoff:
        'Prototype-and-test cycles cost schedule — in a spent-fuel environment, they were the only acceptable evidence.',
    },
    {
      decision:
        'Carry the part as designer, production and purchase liaison, testing liaison and project manager — one owner from drawing to the installation at the customer.',
      tradeoff:
        'One person across every function is the small-company way; it is also why the installation photographs exist — the designer was there.',
    },
    {
      decision: 'Publish the work as a white paper at NAMS 2015 (SAME / ISRO).',
      tradeoff:
        'Writing it up is extra effort beyond delivery — it turned the project into a lasting research credential.',
    },
  ],
  results: [
    { value: 'Passed', label: 'functional & environmental compliance' },
    { value: 'Proven', label: 'prototype in a nuclear-grade envelope' },
    { value: 'Published', label: 'NAMS 2015 white paper' },
  ],
  resultsNote:
    'The slip-ring white paper is the aerospace-manufacturing research credential that still appears in the credentials section today.',
  diagramId: 'igcar-slipring',
  gallery: [
    {
      file: 'media/legend-igcar-slipring-installation-1.jpg',
      alt: 'The high-amperage slip ring installed on the electro-refining rig at the customer, mounted above the process vessel with its cabling run down the frame',
      tall: true,
      credit: `Installed on the electro-refining rig, IGCAR / Godrej. ${PHOTO}, slide 58`,
    },
    {
      file: 'media/legend-igcar-slipring-installation-2.jpg',
      alt: 'Second view of the slip ring on the rig, the drive column and vessel beneath it in an industrial bay',
      tall: true,
      credit: `The rig from the bay floor. ${PHOTO}, slide 58`,
    },
    {
      file: 'media/legend-slipring-rotational-test-rig.jpg',
      alt: 'The division’s rotational test rig: a slip ring coupled to a drive motor on a bench, harnessed for continuity and noise measurement, a “Slipring Division — Process” board on the wall',
      credit: `The division’s rotational test rig. ${PHOTO}, slide 86`,
    },
    {
      file: 'media/legend-slipring-assembly-room.jpg',
      alt: 'The slip-ring assembly and soldering room: benches, a green inspection table and fitting tools in a clean, windowed room',
      credit: `Assembly and soldering room. ${PHOTO}, slide 84`,
    },
  ],
  seoDescription:
    'Project: a high-amperage slip ring for IGCAR’s high-temperature electro-refining of spent nuclear fuel — designed against ingress/vibration/thermal constraints, prototyped, compliance-tested, and published at NAMS 2015.',
};
