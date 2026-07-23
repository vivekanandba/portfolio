import type { Education, Patent } from './schema';

export const patents: Patent[] = [
  {
    kind: 'patent',
    title: 'System and Method of Generating Image of Vascular Flow Network',
    reference: 'US20230329668A1',
    href: 'https://patents.google.com/patent/US20230329668A1',
  },
  {
    kind: 'publication',
    title: 'White paper — “Design & Development of a High-Amperage Slip Ring”',
    reference: 'NAMS 2015 · SAME / ISRO',
  },
  {
    kind: 'achievement',
    title: 'Certificate “A” — National Cadet Corps (NCC)',
  },
  {
    kind: 'achievement',
    title: '3,000 drawing sheets · 8 engineers · 4 months — BMP-II turret study',
    reference: 'FICV space studies · Legend Technologies · BEL',
  },
  {
    kind: 'achievement',
    title: 'First-article tool proving — VSSC / ISRO launch-vehicle jigs',
    reference: 'Nose-cone assembly · spinner weld · master tooling gauges',
  },
  {
    kind: 'achievement',
    title: 'P&W 1100G engine test-bed augmenter extension',
    reference: 'Installation coordinated across Air India · CENCO · Pratt & Whitney',
  },
  {
    kind: 'achievement',
    title: '15,000+ devices repaired · 4.7★ across 516 reviews',
    reference:
      'Gadjoy Repair Services · 80% ops-efficiency lift from self-built software · still running',
  },
];

export const education: Education[] = [
  {
    credential: 'B.E. — Mechanical Engineering',
    institution: 'Visvesvaraya Technological University (VTU)',
    detail: 'First Class with Distinction · 2011',
  },
  {
    credential: 'Deep Learning & Machine Learning Specializations',
    institution: 'Andrew Ng (DeepLearning.AI)',
    detail: 'Plus multiple short courses on AI, tooling, and ops',
  },
  {
    credential: 'Finite Element Method · Analysis & Design of Composite Structures',
    institution: 'Indian Institute of Science (IISc) — Centre for Continuing Education',
  },
  {
    credential: 'Diploma in 3D Modeling & Analysis (CATIA · Ansys)',
    institution: 'CADD Centre',
  },
];
