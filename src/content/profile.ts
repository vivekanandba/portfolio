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
      phase: 'Aerospace',
      title: 'Mechanical Engineering',
      body: 'Began designing and fabricating aerospace & locomotive jigs and fixtures for ISRO, Safran, and Pratt & Whitney — where precision, lifecycle ownership, and analytical rigor were non-negotiable.',
      domain: 'aerospace',
    },
    {
      phase: 'Electronics · Founder',
      title: 'Gadjoy Repair Services',
      body: 'Founded a gadget repair business that still runs today under family (my mother, now my wife) — 1,000+ devices, 100+ customers a month, a 4.7+ satisfaction rating — hands-on electronics, plus self-built ops software that increased operational efficiency by 80%.',
      domain: 'entrepreneurial',
    },
    {
      phase: 'Programming',
      title: 'Healthcare Robotics',
      body: 'The transition into software: engineered HIPAA/HL7/DICOM-compliant cloud microservices and serverless GCP telemetry for robotic medical devices, turning manual diagnostics into real-time fleet monitoring and predictive maintenance.',
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
