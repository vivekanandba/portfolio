import type { CaseStudy } from '../schema';

export const lcaNavy: CaseStudy = {
  slug: 'lca-navy',
  projectId: 'lca-navy',
  eyebrow: 'Case Study · Legend Technologies · ARDC / HAL',
  title: 'LCA-Navy Opto-Electronics — new-product development for a fighter',
  intro:
    'Design and development of opto-electronic assemblies for the LCA-Navy — India’s naval light combat aircraft — for the Aircraft Research & Design Centre at Hindustan Aeronautics Limited, taken through new-product-development design and analysis in CATIA and Abaqus.',
  metrics: [
    { value: 'LCA-Navy', label: 'naval combat aircraft' },
    { value: 'ARDC · HAL', label: 'design authority' },
    { value: 'CATIA · Abaqus', label: 'design & analysis' },
  ],
  problem: [
    'Airborne opto-electronic assemblies for a naval fighter are a new-product-development problem: no off-the-shelf design, and airborne + naval environments to design against from the start.',
    'The work was for ARDC at HAL — a design authority whose acceptance sets the bar.',
  ],
  constraints: [
    'New-product development — designing the assembly, not adapting an existing one.',
    'Airborne and naval environmental requirements.',
    'Design and analysis rigor expected by ARDC / HAL.',
    'CATIA for design; Abaqus for analysis.',
  ],
  decisions: [
    {
      decision:
        'Run the opto-electronic assemblies as new-product development — design and analysis owned together in CATIA and Abaqus.',
      tradeoff:
        'NPD is slower and riskier than adapting a proven design — it is what the program actually required.',
    },
    {
      decision: 'Work directly to ARDC / HAL expectations as the design authority.',
      tradeoff:
        'Designing to a demanding authority adds review overhead — it is also what makes the work credible.',
    },
  ],
  results: [
    { value: 'Designed', label: 'opto-electronic assemblies (NPD)' },
    { value: 'Analyzed', label: 'in CATIA & Abaqus' },
    { value: 'For LCA-Navy', label: 'via ARDC / HAL' },
  ],
  resultsNote:
    'New-product development for a national defence-aviation program — engineering ownership from a blank sheet.',
  diagramId: 'lca-navy',
  seoDescription:
    'Case study: new-product development of opto-electronic assemblies for the LCA-Navy (India’s naval light combat aircraft) at ARDC / HAL, designed and analyzed in CATIA and Abaqus.',
};
