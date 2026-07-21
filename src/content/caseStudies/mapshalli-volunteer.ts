import type { CaseStudy } from '../schema';

export const mapshalliVolunteer: CaseStudy = {
  slug: 'mapshalli-volunteer',
  projectId: 'mapshalli-volunteer',
  eyebrow: 'Case Study · Mapshalli (volunteer)',
  title: 'Stop Hunger & AirCare — civic tech that shipped',
  intro:
    'Volunteer engineering with Mapshalli, a Bangalore non-profit working in IoT, analytics, and deep learning: a COVID-19 relief-coordination platform and a community-managed air-quality sensor network in Whitefield.',
  metrics: [
    { value: '2', label: 'platforms delivered' },
    { value: '5+', label: 'volunteer team' },
    { value: 'Whitefield', label: 'community served' },
  ],
  problem: [
    'During COVID-19, relief efforts in Bangalore were fragmented across NGOs — duplicated effort in some neighborhoods, nothing in others, and no shared picture of need.',
    'Whitefield’s air quality was a permanent conversation with no data behind it: no community-level measurement existed.',
  ],
  constraints: [
    'Volunteer capacity — a 5+ person team contributing around day jobs.',
    'Public users on both platforms: simplicity over sophistication.',
    'AirCare needed hardware support as much as software — sensors in the field, not just dashboards.',
  ],
  decisions: [
    {
      decision:
        'Stop Hunger: a software platform coordinating COVID-19 relief across NGOs — shared visibility instead of parallel spreadsheets.',
      tradeoff:
        'Building coordination software during the crisis it coordinates — shipped lean, improved live.',
    },
    {
      decision:
        'AirCare: a community-managed network of low-cost PM2.5 sensors (~₹7,500 per citizen-hosted unit) publishing open data across Whitefield, with hands-on hardware support and analytics on what they collected.',
      tradeoff:
        'Community-managed means community-maintained — durability came from local ownership rather than central control.',
    },
  ],
  results: [
    { value: 'Coordinated', label: 'NGO relief during COVID-19' },
    { value: 'Measured', label: 'community air quality in Whitefield' },
  ],
  resultsNote:
    'Small systems, honestly scoped — and both did their job for the people they served.',
  diagramId: 'mapshalli',
  seoDescription:
    'Case study: volunteer civic technology with Mapshalli — the Stop Hunger COVID-19 relief-coordination platform and the AirCare community air-quality sensor network in Whitefield, Bangalore.',
};
