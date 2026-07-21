import type { CaseStudy } from '../schema';

export const bmp2Turret: CaseStudy = {
  slug: 'bmp2-turret',
  projectId: 'bmp2-turret',
  eyebrow: 'Case Study · Legend Technologies · BEL',
  title: 'BMP-II Turret — a 3D and kinematic study for FICV',
  intro:
    'Full 3D modelling and kinematic simulation of the BMP-II turret for Bharat Electronics’ Futuristic Infantry Combat Vehicle space studies — part of India’s flagship program to replace its Soviet-era BMP-2 fleet — reconstructing 3,000 legacy drawings into validated, simulated geometry on a four-month clock.',
  metrics: [
    { value: '3,000', label: 'drawing sheets modeled' },
    { value: '8', label: 'engineers led' },
    { value: '4 months', label: 'study delivered' },
  ],
  problem: [
    'BEL’s FICV space studies needed the complete BMP-II turret as validated 3D — geometry and kinematics reconstructed from 3,000 legacy drawing sheets — decision-grade, and on a four-month clock.',
    'Space studies are only as good as the model’s fidelity: traverse, elevation, gearing, and ammunition-supply motion all had to be simulated, not just drawn.',
  ],
  constraints: [
    'Four months for the full turret study — modelling, kinematics, and delivery.',
    'Kinematic fidelity across traverse, elevation, gearing, and ammunition supply.',
    '3,000 legacy sheets to reconcile into one coherent, validated 3D model.',
    'Customer-facing delivery to BEL with QA that holds up in review.',
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
        'Make kinetic simulation of the full turret (traverse, elevation, gearing, ammunition supply) the deliverable core, not an afterthought.',
      tradeoff:
        'Simulation on top of geometry reconstruction is real added effort — it is what made the space studies decision-grade for BEL.',
    },
    {
      decision: 'Own project management and customer interaction across the four-month window.',
      tradeoff:
        'Leading delivery is more than engineering the model — the positive customer feedback was the point.',
    },
  ],
  results: [
    { value: 'Delivered', label: 'full turret study in 4 months' },
    { value: 'Simulated', label: 'traverse · elevation · gearing · ammo' },
    { value: 'Positive', label: 'customer feedback from BEL' },
  ],
  resultsNote:
    'Leading an eight-engineer team to a decision-grade study on a fixed clock — the first taste of technical leadership under a hard deadline.',
  diagramId: 'bmp2-turret',
  seoDescription:
    'Case study: 3D modelling and kinematic simulation of the BMP-II turret for Bharat Electronics’ FICV space studies — an eight-engineer team reconstructing 3,000 legacy drawings in four months.',
};
