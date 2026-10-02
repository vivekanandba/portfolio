import type { Domain } from '@/content/schema';

type DomainClasses = { text: string; bg: string; border: string; fill: string };

/**
 * The single domain → color mapping. Class strings are complete literals —
 * Tailwind's JIT scanner cannot see constructed names, so never template these.
 * Rail/entrepreneurial/community stay neutral by design: three hues mark the
 * three-domain technical arc (aerospace, healthcare-robotics, ai-native); a
 * fourth signal colour would dilute exactly that. Rail is a secondary
 * mechanical-era chapter, so it takes the neutral treatment.
 */
const DOMAIN_CLASSES: Record<Domain, DomainClasses> = {
  aerospace: {
    text: 'text-domain-aero',
    bg: 'bg-domain-aero',
    border: 'border-domain-aero',
    fill: 'fill-domain-aero',
  },
  'healthcare-robotics': {
    text: 'text-domain-health',
    bg: 'bg-domain-health',
    border: 'border-domain-health',
    fill: 'fill-domain-health',
  },
  'ai-native': {
    text: 'text-accent',
    bg: 'bg-accent',
    border: 'border-accent',
    fill: 'fill-accent',
  },
  rail: { text: 'text-muted', bg: 'bg-muted', border: 'border-muted', fill: 'fill-muted' },
  entrepreneurial: {
    text: 'text-muted',
    bg: 'bg-muted',
    border: 'border-muted',
    fill: 'fill-muted',
  },
  community: { text: 'text-muted', bg: 'bg-muted', border: 'border-muted', fill: 'fill-muted' },
};

const NEUTRAL: DomainClasses = {
  text: 'text-muted',
  bg: 'bg-muted',
  border: 'border-muted',
  fill: 'fill-muted',
};

export function domainColor(domain?: Domain): DomainClasses {
  return domain ? DOMAIN_CLASSES[domain] : NEUTRAL;
}

/** The display name of a domain, as the hero and the arc's labels write it. */
const DOMAIN_LABELS: Record<Domain, string> = {
  aerospace: 'Aerospace',
  rail: 'Rail',
  'healthcare-robotics': 'Healthcare Robotics',
  'ai-native': 'AI-Native',
  entrepreneurial: 'Entrepreneurship',
  community: 'Community',
};

export function domainLabel(domain?: Domain): string {
  return domain ? DOMAIN_LABELS[domain] : 'Other';
}
