import type { TurningPoint } from './schema';

/**
 * The career as decision records (ADR-0011): Saw / Bet / Cost / Proved.
 * First-person by design — this is the narrative section. Every `proved` line
 * must stay consistent with the project pages it links; the linkage and the
 * presence of a real `cost` are test-enforced.
 *
 * DRAFTED FROM THE RECORD, PENDING VIVEK'S WORDING REVIEW (ADR-0011): the facts
 * are the site's own; the framing of intent is interpretive.
 */
export const turningPoints: TurningPoint[] = [
  {
    year: 2011,
    title: 'Precision as a starting point',
    saw: 'Fresh out of mechanical engineering, the A350 programme was hiring designers into the least forgiving discipline on offer — structures for a new airliner.',
    bet: 'Start where mistakes are measured in flight hardware. Learn precision first, and let everything else be built on it.',
    cost: 'Years of drawings under Airbus standards while classmates shipped software that iterated in days.',
    proved:
      'Primary and secondary structure and flight-test installation work on the A350 XWB — and a decade of tooling discipline built on that rigour.',
    domain: 'aerospace',
    projects: ['safran-a350', 'vssc-tooling'],
  },
  {
    // Vivek's note of 2026-09-13 is the source; the MD's recommendation and the ENTI
    // org chart corroborate the span and the seat. Pending Vivek's wording review.
    year: 2013,
    title: 'The whole product, or none of it',
    saw: 'At Safran I would have owned one bracket of one aircraft for years. At Legend Technologies — a medium-scale aerospace tooling house in Bangalore — one engineer could carry a product from the bid to the handover, and the company was willing to let me.',
    bet: 'Take the smaller company for the whole loop: bid it, price it, design it with my team, prototype it, stand on the floor while it is machined and welded, write the process sheets, prove the first article, hand it over — as an individual contributor and the design team’s manager at once.',
    cost: 'Five years off the MNC ladder, a title that trailed the work — Engineer, Senior Engineer, Lead Project Engineer — and every gate’s failure landing on me rather than on a department.',
    proved:
      'The MD’s words on record — “end-to-end support… from bidding and cost estimation to design, production, and testing” — the design seat of a VSSC-licensed slip-ring division, and Gadjoy, founded from inside this loop.',
    domain: 'aerospace',
    projects: ['legend-technologies', 'slipring-line'],
  },
  {
    year: 2016,
    title: 'A salary bet on a repair bench',
    saw: 'Nearly four years into carrying products bid-to-handover at Legend, I could see that the engineers around me designed hardware they had never repaired — and repair is where a design confesses what it really is.',
    bet: 'Found a chip-level repair business on the side, and build it to run without me.',
    cost: 'Nights and weekends for nine years, and accepting that a business only counts if it survives without its founder.',
    proved: '15,000+ repairs at 4.7★ across 516 reviews — still operating today, run by my family.',
    domain: 'entrepreneurial',
    projects: ['gadjoy'],
  },
  {
    year: 2018,
    title: 'Engineering where there is no customer',
    saw: 'My neighbourhood argued about air quality with no instrument behind the argument, and relief efforts fed the same street twice while the next one went without.',
    bet: 'Volunteer the same engineering: build the instrument cheap enough for a neighbour to host, and the registry both sides write to.',
    cost: 'Evenings given to sensor benches and relief registries while holding a full-time job through a pandemic.',
    proved:
      'A ₹7,500 sensor node correlating 0.96 with reference-grade equipment across 12 sites, and a relief registry that coordinated eleven organisations.',
    domain: 'community',
    projects: ['aircare', 'stop-hunger'],
  },
  {
    year: 2020,
    title: 'I left CAD for code',
    saw: 'The tooling I drew was finished the day it shipped; the software around it kept compounding long after.',
    bet: 'Mechanical rigour transfers — tolerances become contracts, first-article proving becomes testing, and a decade of precision is a head start, not a sunk cost.',
    cost: 'Starting over as the least experienced programmer in the room, nearly a decade into a career.',
    proved:
      'Cloud infrastructure for an FDA-cleared robotic stroke-assessment platform, and a granted US patent for vascular-flow imaging.',
    domain: 'healthcare-robotics',
    projects: ['gcp-telemetry', 'healthcare-interop'],
  },
  {
    year: 2024,
    title: 'Betting the next decade on directing AI',
    saw: 'Coding agents stopped being autocomplete and became junior engineers who never sleep — and most of the industry was still using them as autocomplete.',
    bet: 'The leverage moves to whoever can specify, review and verify. Become the engineer who directs the agents, not the one racing them.',
    cost: 'Letting go of writing every line myself, and rebuilding conviction through review gates instead of keystrokes.',
    proved:
      'A production consumer app in under four weeks with zero prior mobile experience, and 430k requests a day served at sub-100ms.',
    domain: 'ai-native',
    projects: ['sanas-consumer-app', 'speech-intelligence'],
  },
];
