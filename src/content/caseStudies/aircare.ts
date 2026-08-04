import type { CaseStudy } from '../schema';

export const airCare: CaseStudy = {
  slug: 'aircare',
  projectId: 'aircare',
  eyebrow: 'Project · Mapshalli (volunteer)',
  title: 'AirCare — a ₹7,500 sensor node that made dense air monitoring affordable',
  intro:
    'Whitefield had no neighbourhood-level air-quality data because reference-grade government stations cost around ₹1 crore each, so a city gets a handful of them. AirCare answered that by building the instrument instead of buying it: a Plantower PMS3003 laser sensor on a Raspberry Pi 3 in a wall enclosure, about ₹7,500 in parts, correlating 0.96 with reference-grade equipment — hosted by residents on their own power and WiFi, and reporting to a public map.',
  metrics: [
    { value: '₹7,500', label: 'per node, in parts' },
    { value: '0.96', label: 'correlation vs reference-grade' },
    { value: '12', label: 'sites around Whitefield' },
    { value: '~2.5W', label: 'per node, mains or UPS' },
  ],
  problem: [
    'Air quality in Whitefield was a permanent complaint with no local evidence behind it. Regulatory monitoring is accurate but sparse — at roughly ₹1 crore per station, a city of millions gets a handful, and a single citywide number tells you nothing about your own street.',
    'Density is what makes air-quality data actionable: PM2.5 varies sharply street to street with traffic, construction and burning. Getting that resolution meant the per-unit cost had to fall by orders of magnitude, which made the sensor itself the problem to solve.',
  ],
  constraints: [
    'Cost per node had to be low enough that ordinary residents and small businesses could host one — the whole model collapses otherwise.',
    'Accuracy still had to be defensible, or the readings would be dismissed as hobbyist noise exactly when they mattered.',
    'Deployed in homes and shopfronts: mains power, domestic WiFi, and monsoon humidity, with no site visits for maintenance.',
    'Volunteer-run with no field-service budget, so nodes had to survive on host goodwill alone.',
  ],
  decisions: [
    {
      decision:
        'Build the node rather than buy instruments: a Plantower PMS3003 laser-scattering sensor (PM1.0 / PM2.5 / PM10, sub-10-second response) driven by a Raspberry Pi 3, in a Roma six-module enclosure with cut-outs for power and airflow.',
      tradeoff:
        'Self-built hardware means owning assembly, siting and failures — and it is what dropped a station from about ₹1 crore to roughly ₹7,500 in parts, turning a handful of monitors into a dense grid.',
    },
    {
      decision:
        'Validate the cheap sensor against reference-grade equipment and publish the 0.96 correlation rather than asking people to take the numbers on faith.',
      tradeoff:
        'Invites direct comparison with regulatory monitors — which is the point: a low-cost node with a published correlation is far harder to dismiss than one without.',
    },
    {
      decision:
        'Sample every five minutes but upload every ten, keeping a node to roughly 4MB a month, with an optional 2600mAh mini-UPS for four to five hours of outage cover.',
      tradeoff:
        'Slightly coarser data than continuous streaming, in exchange for running unnoticed on a host’s domestic connection — the difference between a node staying plugged in and being unplugged.',
    },
    {
      decision:
        'Have residents and businesses host nodes on their own power and connectivity, and publish everything on an open map refreshed every three minutes with per-sensor dashboards and periodic analysis reports.',
      tradeoff:
        'Community-hosted means community-dependent — a host who moves takes a node offline. It also removed the recurring site cost that would have capped the network at a few units.',
    },
  ],
  results: [
    { value: '~1,300×', label: 'cheaper than a reference station' },
    { value: '12 sites', label: 'live around Whitefield' },
    { value: '3-min', label: 'public map refresh' },
    { value: 'Open data', label: 'dashboards + analysis reports' },
  ],
  resultsNote:
    'The engineering lesson sits in the hardware, not the dashboard: the network existed because the instrument was cheap enough to hand to a neighbour, and credible because its accuracy was measured and published rather than asserted. The payoff is visible on the live map — nodes a few kilometres apart reading anywhere from the single digits to the high fifties, which is exactly the street-level variation a single city-wide figure erases, and the reason density was worth engineering for. The project has since stopped adding nodes and now points newcomers to commercial PurpleAir units.',
  diagramId: 'aircare',
  gallery: [
    {
      file: 'media/mapshalli-aircare-live-map.jpg',
      alt: 'The public AirCare map over Whitefield and Mahadevapura, with nine live PM2.5 readings pinned near landmarks including ITPB, Brookefield and Marathahalli — values ranging from 4 to 59 µg/m³, the highest flagged in red',
      wide: true,
      credit:
        'The network’s public output, captured 4 Aug 2026 — readings spanning 4 to 59 µg/m³ within a few kilometres, which is the street-level variation a single city-wide number hides. Map: Mapshalli AirCare; base map data ©2026 Google.',
    },
  ],
  seoDescription:
    'Project: AirCare, a community air-quality network in Whitefield, Bangalore — a self-built ₹7,500 PM2.5 node (Plantower PMS3003 on a Raspberry Pi 3) correlating 0.96 with reference-grade equipment, citizen-hosted across 12 sites with open data.',
};
