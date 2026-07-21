import type { CaseStudy } from '../schema';

export const railTooling: CaseStudy = {
  slug: 'rail-tooling',
  projectId: 'rail-tooling',
  eyebrow: 'Case Study · Tech Mahindra',
  title: 'Rolling-Stock Tooling — jigs and fixtures for metros and locomotives',
  intro:
    'Manufacturing-engineering tooling for Alstom rolling-stock programs: bogie, gangway, and HVAC installation fixtures and templates across the Perth METRONET C-Series, Mumbai Metro Line 3, Singapore Metro, and the E-Loco — the jigs that decide how a rail vehicle actually goes together.',
  metrics: [
    { value: '4 programs', label: 'metro & locomotive fleets' },
    { value: 'Bogie · gangway · HVAC', label: 'installation fixtures' },
    { value: 'Alstom', label: 'rolling-stock programs' },
  ],
  problem: [
    'Rolling stock is assembled on tooling: bogie templates, sidewall and installation fixtures, gangway and HVAC jigs. Each program — Perth, Mumbai, Singapore, the E-Loco — has its own vehicle, its own interfaces, and its own build sequence.',
    'The tooling has to be right before the line runs: a fixture that does not locate correctly stalls assembly of an entire trainset.',
  ],
  constraints: [
    'Program-specific geometry — a bogie fixture for one fleet does not transfer to another.',
    'Fixtures must locate and repeat across a production run, not a single vehicle.',
    'Installation tooling (HVAC, gangway, coupler) has to fit the vehicle as built, on site.',
    'Delivery paced to each program’s manufacturing schedule.',
  ],
  decisions: [
    {
      decision:
        'Own tool development per program: bogie cross-beam / side-beam / integration jigs (Singapore), fitting and bogie templates (E-Loco), sidewall and HVAC/gangway installation fixtures (Mumbai ML3), and lifting-tackle, gangway, and automatic-coupler tooling (Perth).',
      tradeoff:
        'Bespoke tooling per fleet is more design than a reusable rig — rolling-stock interfaces differ enough that shared fixtures would not locate correctly.',
    },
    {
      decision: 'Design installation fixtures to fit the vehicle as built and prove them on site.',
      tradeoff:
        'On-site proving costs travel and schedule — it is the only way a fixture meets the real vehicle rather than the drawing.',
    },
  ],
  results: [
    { value: '4 fleets', label: 'Perth · Mumbai · Singapore · E-Loco' },
    { value: 'Bogie → HVAC', label: 'full installation-tooling coverage' },
    { value: 'Production', label: 'fixtures that repeat across the run' },
  ],
  resultsNote:
    'The bridge chapter — the same manufacturing-engineering rigor as the aerospace tooling, now on rail, spanning the transition years into software.',
  diagramId: 'rail-tooling',
  seoDescription:
    'Case study: rolling-stock manufacturing tooling for Alstom programs at Tech Mahindra — bogie, gangway, and HVAC installation fixtures for the Perth METRONET C-Series, Mumbai Metro Line 3, Singapore Metro, and E-Loco.',
};
