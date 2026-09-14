import type { CaseStudy } from '../schema';

// Primary source: the published paper — Ranga Reddy and B. Vivekanand, "A Typical
// Development of High Amperage Slip Ring", NAMS 2015 (SAME, Thiruvananthapuram,
// 27–28 Nov 2015), pp. 288–295, transcribed in source/papers/. Every number below
// with a rating, a tolerance or a test limit comes from it and is checkable in the
// served PDF. Also: master resume / LinkedIn Projects (Sep–Dec 2015; designer, production
// and purchase liaison, testing liaison, project manager);
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
    { value: '300 A · 5 V DC', label: 'rating (published paper)' },
    { value: '11', label: 'unique components developed' },
    { value: 'NAMS 2015', label: 'published & presented' },
  ],
  problem: [
    'Godrej & Boyce came to the division for a slip ring rated 300 A at 5 V DC — an order of magnitude beyond anything the line had built — to sit on top of a stirrer in high-temperature electro-refining of spent nuclear fuel at IGCAR.',
    'High amperage at low rpm was the deviation. The technology ISRO transferred in 2000 was for miniature, low-current rings; at 300 A the heat a contact generates, and the way current has to cross from the rotating side to the stationary side, are different problems with the same name.',
    'The division’s standard architecture — beryllium-copper brush wire on gold-plated, electrode-grade copper U-groove rings, PCB termination, epoxy potting and IP sealing, the upgrade from the silver-graphite design ISRO had transferred in 2000 — was the starting point. High current and high temperature pushed every element of it.',
    'In a spent-fuel environment, analysis alone is not sufficient evidence — the part has to be built and proven.',
  ],
  constraints: [
    'Contact resistance under 100 mΩ per ring static and 150 mΩ dynamic at 200 rpm; insulation over 200 MΩ at 500 V DC between any two rings and between ring and body; electrical noise under 5 mV per amp per ring — the plan the product had to be certified against (paper, Table 4).',
    'Environmental qualification: 200 rpm with vibration at 3 Hz; sinusoidal 5–13 Hz at ±6 mm and 13–500 Hz at 15 m/s², an hour per axis; 55 °C and 70 °C soaks of sixteen hours (paper, Table 2).',
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
        'Choose each of the eleven components for its job: a stainless steel shaft for the rotating stresses, polyurethane shaft insulation for adherence and curing, aluminium sleeves and skeleton to keep the weight down, and gold-plated beryllium-copper brush wires against the powder formation that killed the old design.',
      tradeoff:
        'Mixed materials complicate manufacture and assembly; the paper’s line is that “all the components have a reason and a use for their choice” — at 300 A there is no spare margin to spend on convenience.',
    },
    {
      decision:
        'Machine every shaft dimension in one setting, then cut the contact rings off the shaft by EDM.',
      tradeoff:
        'One setting is slower and unforgiving — but re-chucking moves the centre, and the bearings and contact rings need perpendicularity and concentricity. Electrode-grade copper is too soft to turn to tolerance conventionally, so the rings are turned on the full shaft and separated by electro-discharge machining (paper, Table 3).',
    },
    {
      decision:
        'Build a prototype and prove it in functional and environmental compliance testing.',
      tradeoff:
        'Prototype-and-test cycles cost schedule — in a spent-fuel environment, they were the only acceptable evidence.',
    },
    {
      decision:
        'Carry the part as designer, production and purchase liaison, testing liaison and project manager — me, from drawing to the installation at the customer.',
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
    { value: '< 100 mΩ', label: 'static contact resistance, per ring' },
    { value: '> 200 MΩ', label: 'insulation at 500 V DC' },
    { value: 'Published', label: 'NAMS 2015 · presented at Thiruvananthapuram' },
  ],
  resultsNote:
    'Testing was the hardest part of the job: the paper records that even CPRI could not supply the 300 A at 5 V DC the quality plan required. The write-up became the one peer-reviewed publication of my mechanical years — the whole paper is linked below, and its numbers are what this page is built on.',
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
  docs: [
    {
      label:
        'The published paper — “A Typical Development of High Amperage Slip Ring”, NAMS 2015, pp. 288–295 (PDF)',
      file: 'papers/nams-2015-high-amperage-slip-ring.pdf',
    },
  ],
  seoDescription:
    'Project: a high-amperage slip ring for IGCAR’s high-temperature electro-refining of spent nuclear fuel — designed against ingress/vibration/thermal constraints, prototyped, compliance-tested, and published at NAMS 2015.',
};
