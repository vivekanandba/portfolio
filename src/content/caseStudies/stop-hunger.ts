import type { CaseStudy } from '../schema';

export const stopHunger: CaseStudy = {
  slug: 'stop-hunger',
  projectId: 'stop-hunger',
  eyebrow: 'Project · Mapshalli (volunteer)',
  title: 'Stop Hunger — relief coordination that prevented duplicate deliveries',
  intro:
    'Launched in March 2020 to coordinate COVID-19 relief among the NGOs working in and around Mahadevapura, Bangalore. Citizens register a settlement that needs help; any NGO can shortlist an unserved one, deliver food, rations or water, then record what they gave — so the next NGO sees current status instead of feeding the same street twice.',
  metrics: [
    { value: 'Mar 2020', label: 'launched, mid-lockdown' },
    { value: 'Mahadevapura', label: 'Bangalore wards served' },
    { value: 'Citizens + NGOs', label: 'two-sided platform' },
  ],
  problem: [
    'When the lockdown hit, relief in Bangalore was uncoordinated by default. Each NGO worked from its own list, so some settlements were served repeatedly while others were missed entirely — and nobody could see the difference in time to fix it.',
    'The information that would have solved it was distributed: residents knew which settlements were going hungry, and NGOs knew where they had already delivered. Neither could see the other’s half.',
  ],
  constraints: [
    'A volunteer team building during the crisis it was meant to coordinate — no runway for a discovery phase.',
    'Two very different user groups on the same data: residents reporting need, NGOs reporting delivery.',
    'Public, unsupported users on low-end phones — anything requiring training or an app install would not get used.',
    'Trust: an NGO acts on this data, so a stale or wrong status wastes a real trip during a lockdown.',
  ],
  decisions: [
    {
      decision:
        'Make the settlement registry the shared source of truth, with relief status attached to each site rather than held per-NGO.',
      tradeoff:
        'Only as current as the last submission — but it converts the coordination problem into one list everyone reads and writes, which is the only version that scales past a WhatsApp group.',
    },
    {
      decision:
        'Close the loop by asking NGOs to submit relief after delivering, including past efforts, not just to consume the list.',
      tradeoff:
        'Asks work of the very people you want to help, at their busiest — it is also the only thing that keeps the map honest, so the ask was kept to a single short form.',
    },
    {
      decision:
        'Ship as plain web forms and a public map, no app and no login for the citizen path.',
      tradeoff:
        'Gives up identity, moderation and fine-grained permissions; during a lockdown, reach and zero friction mattered more than access control.',
    },
    {
      decision: 'Publish the relief map and dashboard openly so anyone can audit coverage.',
      tradeoff:
        'Open coverage data also exposes where nothing has reached yet — which is precisely the signal the platform exists to surface.',
    },
  ],
  results: [
    { value: 'Coordinated', label: 'relief across multiple NGOs' },
    { value: 'De-duplicated', label: 'deliveries per settlement' },
    { value: 'Still online', label: 'years after the emergency' },
  ],
  resultsNote:
    'Built in weeks by volunteers around day jobs, and still standing years later. The engineering was modest on purpose: the hard part was the protocol — get both sides writing to one list — not the stack.',
  diagramId: 'stop-hunger',
  seoDescription:
    'Project: Stop Hunger, a volunteer-built COVID-19 relief-coordination platform for Mahadevapura, Bangalore — a shared settlement registry and public relief map that stopped NGOs duplicating deliveries.',
};
