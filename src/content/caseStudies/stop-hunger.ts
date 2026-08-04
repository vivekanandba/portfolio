import type { CaseStudy } from '../schema';

export const stopHunger: CaseStudy = {
  slug: 'stop-hunger',
  projectId: 'stop-hunger',
  eyebrow: 'Project · Mapshalli (volunteer)',
  title: 'Stop Hunger — relief coordination that prevented duplicate deliveries',
  intro:
    'Launched in March 2020 to coordinate COVID-19 relief among the NGOs working in and around Mahadevapura, Bangalore. Citizens register a settlement that needs help; any NGO can shortlist an unserved one, deliver food, rations or water, then record what they gave — so the next NGO sees current status instead of feeding the same street twice. By the dashboard snapshot published in May 2020, the registry held 889 settlements across 37 BBMP wards — 14,178 families, 55,475 people — with deliveries logged by eleven different organisations.',
  // Two vintages on purpose: the registry totals are the May 2020 dashboard
  // snapshot, the coverage share is what the live dashboard reports now. The
  // labels say so, because 67% is not computed against 55,475.
  metrics: [
    { value: '889', label: 'settlements registered (May 2020)' },
    { value: '55,475', label: 'people registered (May 2020)' },
    { value: '67%', label: 'of registered people reached' },
    { value: '37', label: 'BBMP wards' },
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
    { value: '67% / 66% / 53%', label: 'of people / families / settlements served' },
    { value: '11', label: 'organisations recording deliveries' },
    { value: 'Still online', label: 'years after the emergency' },
  ],
  resultsNote:
    'The dashboard is candid in a way advocacy numbers usually are not: it publishes what was *not* reached as plainly as what was. Just over half the registered settlements were served, but two-thirds of the registered people were — larger settlements got reached first, which is defensible triage and only visible because coverage was measured per settlement rather than counted in meals. Deliveries came from eleven different organisations, from Whitefield Rising and Hasirudala through Rotary chapters to BBMP and the Bangalore City Police, which is the multi-NGO coordination the platform existed to make possible. Built in weeks by volunteers around day jobs; the hard part was the protocol — getting both sides writing to one list — not the stack.',
  diagramId: 'stop-hunger',
  // Aggregate charts only. The dashboard's "Distributions: Locations" panel
  // plots settlement coordinates, so it is deliberately not republished here.
  gallery: [
    {
      file: 'media/mapshalli-stophunger-coverage.png',
      alt: 'Three gauges from the Stop Hunger dashboard showing the share of unique registrations served: settlements 53%, families 66%, people 67%',
      credit:
        'Coverage against the registry — the platform reporting its own gaps. Chart: Mapshalli Stop Hunger dashboard.',
    },
    {
      file: 'media/mapshalli-stophunger-organisations.png',
      alt: 'Bar chart of recorded distributions by organisation — Whitefield Rising far ahead, followed by BBMP/Hasirudala/Rotary, Hasirudala, BBMP, Bangalore City Police, Rotary chapters and others',
      credit:
        'Eleven organisations writing to one shared ledger. Chart: Mapshalli Stop Hunger dashboard.',
    },
  ],
  seoDescription:
    'Project: Stop Hunger, a volunteer-built COVID-19 relief-coordination platform for Mahadevapura, Bangalore — a shared settlement registry and public relief map that stopped NGOs duplicating deliveries.',
};
