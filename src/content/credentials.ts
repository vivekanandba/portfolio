import type { Education, Patent } from './schema';

export const patents: Patent[] = [
  {
    kind: 'patent',
    title: 'System and Method of Generating Image of Vascular Flow Network',
    // Granted Jul 2025 as US12343195B2 (application published as
    // US20230329668A1). Eight named inventors; filed Jul 2022 from an Apr 2022
    // Indian priority application.
    reference: 'US12343195B2 · granted Jul 2025 · NovaGuide · 1 of 8 inventors',
    href: 'https://patents.google.com/patent/US12343195B2',
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
    title: 'NASA Space Apps Challenge 2023 — “Cadence of the Meteorites”',
    reference:
      'Sonified five centuries of NASA meteorite-landing data so space data could be heard, not just seen · team Cosmic Harmony, integrator',
    href: 'https://www.spaceappschallenge.org/2023/find-a-team/cosmic-harmony',
  },
  {
    kind: 'achievement',
    title: 'Organizing Committee Member — Institution of Engineers (India)',
    reference: 'Since Mar 2016',
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
