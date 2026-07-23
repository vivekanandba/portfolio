import type { Profile } from './schema';

export const profile: Profile = {
  name: 'Vivekanand B',
  tagline: 'Engineer · Intrapreneur · AI-Native Architect',
  valueProp:
    'Applying the precision of aerospace design to build scalable, privacy-first, enterprise-grade AI products — from concept to GA.',
  email: 'vivekanandb@hotmail.com',
  phone: '+91-97381-26623',
  location: 'Bangalore, India',
  resumeFile: 'Vivekanandb-Resume.pdf',
  links: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/vivekanand-balakrishnan-68448777',
    },
    { label: 'GitHub', href: 'https://github.com/vivekanandba' },
  ],
  careerStartYear: 2011,
  heroDomains: ['Aerospace', 'Healthcare Robotics', 'AI-Native'],
  currentRole: { title: 'Staff Software Engineer & Technical Lead', org: 'Sanas.ai' },
  heroStat: { value: '430k/day', label: 'requests in production' },
  arc: [
    {
      phase: 'Aerospace · Defence · Rail',
      title: 'Mechanical Engineering',
      body: 'Designed and fabricated jigs, fixtures, and tooling for aerospace (ISRO, Safran, Pratt & Whitney), defence and nuclear programs (BEL’s FICV, IGCAR), and rolling stock (Tech Mahindra) — where precision, lifecycle ownership, and analytical rigor were non-negotiable.',
      domain: 'aerospace',
    },
    {
      phase: 'Entrepreneurship',
      title: 'Gadjoy Repair Services',
      body: 'Founded a gadget-repair business that still runs today under family (my mother, now my wife) — 15,000+ devices repaired, around 150 a month over nine years, at a 4.7★ rating — plus self-built ops software that lifted operational efficiency by 80%.',
      domain: 'entrepreneurial',
    },
    {
      phase: 'Electronics',
      title: 'Hands-on Hardware',
      body: 'Chip-level board repair and Apple-product fixes across thousands of devices — the physical-systems intuition, grounded in real hardware, that later shaped how the software systems were architected.',
      domain: 'entrepreneurial',
    },
    {
      phase: 'Medical Robotics',
      title: 'Healthcare Robotics',
      body: 'The transition into software: HIPAA/HL7/DICOM-compliant cloud microservices and serverless GCP telemetry for NovaGuide — an FDA-cleared robotic stroke-assessment platform — turning manual diagnostics into real-time fleet monitoring and predictive maintenance.',
      domain: 'healthcare-robotics',
    },
    {
      phase: 'AI-Native',
      title: 'Zero-to-One Software',
      body: 'Now a Staff Engineer operating as an internal technical co-founder — shipping consumer apps, real-time AI copilots, and high-throughput audio pipelines, and orchestrating multi-agent workflows that cut delivery timelines 40%+.',
      domain: 'ai-native',
    },
  ],
};
