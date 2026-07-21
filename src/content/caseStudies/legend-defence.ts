import type { CaseStudy } from '../schema';

export const legendDefence: CaseStudy = {
  slug: 'legend-defence',
  projectId: 'legend-defence',
  eyebrow: 'Case Study · Legend Technologies',
  title: 'Defence & Nuclear Engineering — a turret study and a slip ring',
  intro:
    'Two programs at the hard end of mechanical engineering: full 3D modelling and kinematic simulation of the BMP-II turret for BEL’s Futuristic Infantry Combat Vehicle studies, and a high-amperage slip ring for high-temperature electro-refining of spent nuclear fuel for IGCAR.',
  metrics: [
    { value: '3,000', label: 'drawing sheets modeled' },
    { value: '8', label: 'engineers led' },
    { value: 'NAMS 2015', label: 'white paper published' },
  ],
  problem: [
    'BEL’s FICV space studies — part of India’s flagship program to replace its Soviet-era BMP-2 infantry fighting vehicle fleet — needed the complete BMP-II turret as validated 3D, with geometry and kinematics reconstructed from 3,000 legacy drawing sheets, on a four-month clock.',
    'IGCAR needed a slip ring that survives what almost nothing survives: high amperage under the volumetric, vibration, thermal, and ingress-protection constraints of high-temperature electro-refining of spent nuclear fuel.',
  ],
  constraints: [
    'Four months for the full turret study — modelling, kinematics, and delivery.',
    'Kinematic fidelity across traverse, elevation, gearing, and ammunition supply systems.',
    'Nuclear-environment specifications: ingress protection, vibration, and thermal requirements per customer spec.',
    'The eternal product quadrilateral: cost, weight, performance, and delivery — balanced, not maximized.',
  ],
  decisions: [
    {
      decision:
        'Form and lead a project team of 8, with engineers assigned exclusively to quality assurance.',
      tradeoff:
        'Dedicating scarce heads to QA on a four-month schedule feels expensive — until the alternative is discovering modelling errors in the customer’s review.',
    },
    {
      decision:
        'Kinetic simulation of the full turret (traverse, elevation, gearing, ammunition supply) as the study’s deliverable core, not an afterthought.',
      tradeoff:
        'Simulation effort on top of geometry reconstruction — it is what made the space studies decision-grade for BEL.',
    },
    {
      decision:
        'For the slip ring: iterate design configurations against volumetric and functional constraints, then prove the prototype in functional and environmental compliance testing.',
      tradeoff:
        'Prototype-and-test cycles cost schedule — in a spent-fuel environment, analysis alone was never going to be sufficient evidence.',
    },
  ],
  results: [
    { value: '4 months', label: 'turret study delivered' },
    { value: 'Passed', label: 'functional & environmental compliance' },
    { value: 'NAMS 2015', label: 'presented at SAME / ISRO' },
  ],
  resultsNote:
    'The slip-ring work was published as a white paper at NAMS 2015 — the aerospace-manufacturing research credential that still appears in the credentials section today.',
  diagramId: 'defence',
  seoDescription:
    'Case study: BMP-II turret 3D modelling and kinematic simulation for BEL’s FICV studies (8-engineer team, 3,000 drawings, 4 months), and a high-amperage slip ring for IGCAR nuclear-fuel electro-refining, published at NAMS 2015.',
};
