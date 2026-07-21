import type { CaseStudy } from '../schema';

export const igcarSlipring: CaseStudy = {
  slug: 'igcar-slipring',
  projectId: 'igcar-slipring',
  eyebrow: 'Case Study · Legend Technologies · IGCAR',
  title: 'IGCAR Slip Ring — high amperage in a spent-fuel environment',
  intro:
    'Design and development of a high-amperage slip ring for high-temperature electro-refining of spent nuclear fuel (IGCAR / Godrej) — engineered against volumetric, vibration, thermal, and ingress-protection constraints, prototyped, and proven in compliance testing, then published as a NAMS 2015 white paper.',
  metrics: [
    { value: 'High-amperage', label: 'nuclear-grade slip ring' },
    { value: 'Prototype', label: 'built & compliance-tested' },
    { value: 'NAMS 2015', label: 'white paper published' },
  ],
  problem: [
    'IGCAR needed a slip ring that survives what almost nothing survives: high amperage under the volumetric, vibration, thermal, and ingress-protection constraints of high-temperature electro-refining of spent nuclear fuel.',
    'In a spent-fuel environment, analysis alone is not sufficient evidence — the part has to be built and proven.',
  ],
  constraints: [
    'Nuclear-environment specifications: ingress protection, vibration, and thermal requirements per customer spec.',
    'High-amperage performance inside a tight volumetric envelope.',
    'The product quadrilateral — cost, weight, performance, delivery — balanced, not maximized.',
    'Compliance demonstrated by test, not by analysis alone.',
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
  seoDescription:
    'Case study: a high-amperage slip ring for IGCAR’s high-temperature electro-refining of spent nuclear fuel — designed against ingress/vibration/thermal constraints, prototyped, compliance-tested, and published at NAMS 2015.',
};
