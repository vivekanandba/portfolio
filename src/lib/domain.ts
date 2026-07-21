import type { Domain } from '@/content/schema';

type DomainClasses = { text: string; bg: string; border: string };

/**
 * The single domain → color mapping. Class strings are complete literals —
 * Tailwind's JIT scanner cannot see constructed names, so never template these.
 * Rail/entrepreneurial/community stay neutral by design: three hues mark the
 * three-domain technical arc (aerospace, healthcare-robotics, ai-native); a
 * fourth signal colour would dilute exactly that. Rail is a secondary
 * mechanical-era chapter, so it takes the neutral treatment.
 */
const DOMAIN_CLASSES: Record<Domain, DomainClasses> = {
  aerospace: { text: 'text-domain-aero', bg: 'bg-domain-aero', border: 'border-domain-aero' },
  'healthcare-robotics': {
    text: 'text-domain-health',
    bg: 'bg-domain-health',
    border: 'border-domain-health',
  },
  'ai-native': { text: 'text-accent', bg: 'bg-accent', border: 'border-accent' },
  rail: { text: 'text-muted', bg: 'bg-muted', border: 'border-muted' },
  entrepreneurial: { text: 'text-muted', bg: 'bg-muted', border: 'border-muted' },
  community: { text: 'text-muted', bg: 'bg-muted', border: 'border-muted' },
};

const NEUTRAL: DomainClasses = { text: 'text-muted', bg: 'bg-muted', border: 'border-muted' };

export function domainColor(domain?: Domain): DomainClasses {
  return domain ? DOMAIN_CLASSES[domain] : NEUTRAL;
}
