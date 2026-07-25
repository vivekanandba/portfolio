import type { Domain } from '@/content/schema';
import { domainColor } from '@/lib/domain';

/**
 * Brand constellation — every client/employer the work shipped at or was built
 * for, word-cloud style: tier sets prominence (size + ink), a domain-colored
 * dot ties each name to the arc's color system. All names are resume-verbatim
 * customers/programs (Alstom is claimed on the rail diagram). Tiers are
 * interleaved in display order so sizes mix instead of banding into rows.
 */
type Org = { name: string; tier: 1 | 2 | 3; domain?: Domain };

const ORGS: Org[] = [
  { name: 'ISRO', tier: 1, domain: 'aerospace' },
  { name: 'NovaSignal', tier: 2, domain: 'healthcare-robotics' },
  { name: 'Airbus A350', tier: 1, domain: 'aerospace' },
  { name: 'IGCAR', tier: 3, domain: 'aerospace' },
  { name: 'Sanas.ai', tier: 1, domain: 'ai-native' },
  { name: 'Godrej & Boyce', tier: 2, domain: 'aerospace' },
  { name: 'Pratt & Whitney', tier: 1, domain: 'aerospace' },
  { name: 'HAL', tier: 3, domain: 'aerospace' },
  { name: 'Alstom', tier: 1, domain: 'rail' },
  { name: 'Safran', tier: 2, domain: 'aerospace' },
  { name: 'BEML', tier: 3, domain: 'aerospace' },
  { name: 'Siemens', tier: 1, domain: 'aerospace' },
  { name: 'BEL', tier: 2, domain: 'aerospace' },
  { name: 'TASL', tier: 3, domain: 'aerospace' },
  { name: 'Air India', tier: 2, domain: 'aerospace' },
  { name: 'Indian Navy (LCA)', tier: 3, domain: 'aerospace' },
  { name: 'Tech Mahindra', tier: 3, domain: 'rail' },
];

const TIER_CLASSES: Record<Org['tier'], string> = {
  1: 'text-xl font-semibold text-ink sm:text-2xl',
  2: 'text-base font-medium text-muted',
  3: 'text-sm text-muted/70',
};

export function OrgConstellation() {
  return (
    <div className="border-t border-hairline pt-8">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        Built for · shipped at
      </p>
      <ul className="mx-auto mt-5 flex max-w-4xl flex-wrap items-baseline justify-center gap-x-7 gap-y-3">
        {ORGS.map((org) => (
          <li
            key={org.name}
            className={`flex items-baseline gap-2 tracking-tight ${TIER_CLASSES[org.tier]}`}
          >
            <span
              aria-hidden="true"
              className={`inline-block h-1.5 w-1.5 shrink-0 self-center rounded-full ${domainColor(org.domain).bg}`}
            />
            {org.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
