import type { CaseStudy } from '../schema';

export const safranA350: CaseStudy = {
  slug: 'safran-a350',
  projectId: 'safran-a350',
  eyebrow: 'Case Study · Safran Engineering India',
  title: 'Airbus A350 XWB — structure brackets and flight-test installation',
  intro:
    'The starting point of the whole arc: at Safran Engineering India, structural design for the Airbus A350 XWB — primary and secondary structure installation brackets (S11–S18) and Flight-Test-Installation harness routing for wing, pylon, and landing gear — carried from conceptual C-maturity to design-for-manufacturing, all to Airbus standards.',
  metrics: [
    { value: 'A350 XWB', label: 'Airbus composite widebody' },
    { value: 'S11–S18', label: 'structure sections' },
    { value: 'C-maturity → DFM', label: 'design maturity owned' },
  ],
  problem: [
    'The A350 XWB is Airbus’s composite widebody, and Safran a top-tier supplier on it. Structure brackets and flight-test-installation routing must be designed inside a dense envelope of Airbus rules — the design space is mostly constraints.',
    'Brackets come in sheet-metal, machined, and composite forms, each optimized differently; harness routing for flight-test equipment must be precise enough to trust the flight-test measurements that depend on it.',
  ],
  constraints: [
    'Full conformance to Airbus (and aerospace) standards throughout.',
    'Optimization of fixed and loaded brackets across sheet-metal, machined, and composite types.',
    'Flight-Test-Installation routing and fixation precise enough for valid flight-test parameters.',
    'Designs carried from C-maturity through to buildable DFM parts.',
  ],
  decisions: [
    {
      decision:
        'Design primary/secondary structure brackets (S11/12, S13/14, S15/21, S16/18) and their associated assemblies, optimizing each bracket type within the Airbus rule set.',
      tradeoff:
        'Working to standards means the design space is mostly rules — optimizing inside them is the discipline, not a limitation.',
    },
    {
      decision:
        'Own FTI installation positioning and harness routing for wing, pylon, and landing gear, with fixation details for the primary structure.',
      tradeoff:
        'Routing precision for flight-test equipment is exacting up front — it is what makes the measured flight-test parameters trustworthy.',
    },
    {
      decision:
        'Carry components from C-maturity conceptual design through to DFM installation drawings.',
      tradeoff:
        'Following a part all the way to manufacturability is slower than handing off at concept — it is where the rigor is learned.',
    },
  ],
  results: [
    { value: 'To standard', label: 'Airbus-conformant structure design' },
    { value: 'Buildable', label: 'DFM parts and installation drawings' },
    { value: 'Foundation', label: 'the rigor every later jig inherited' },
  ],
  resultsNote:
    'This is where the precision and lifecycle discipline began — the habits formed on A350 structures carried through every launch-vehicle jig and, eventually, into software architecture.',
  diagramId: 'safran-a350',
  seoDescription:
    'Case study: Airbus A350 XWB structural design at Safran Engineering India — primary/secondary structure brackets (S11–S18) and flight-test-installation harness routing, from C-maturity to DFM, to Airbus standards.',
};
