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
    title: 'Published research on aerospace manufacturing and slip-ring design',
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
];
