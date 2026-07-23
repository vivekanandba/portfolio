import type { CaseStudy } from '../schema';

export const gadjoy: CaseStudy = {
  slug: 'gadjoy',
  projectId: 'gadjoy',
  eyebrow: 'Case Study · Gadjoy Repair Services',
  title: 'Gadjoy — a chip-level repair business, built and still running',
  intro:
    'Founded a device-repair business specialising in chip-level and board-level work — phones, laptops, tablets, desktops — and built the software that ran it. Nine years on it still operates under family (my mother, now my wife), at 4.7★ across 516 Google reviews and 1,500+ repairs.',
  metrics: [
    { value: '4.7★', label: '516 Google reviews' },
    { value: '1,500+', label: 'repairs completed' },
    { value: '~24h', label: 'typical turnaround' },
  ],
  problem: [
    'Independent device repair is a trust-and-turnaround business: customers hand over an expensive, personal device and want it fixed fast, done right, and priced honestly. Winning that trust at volume — with a team of under five — is the whole challenge.',
    'And there was no off-the-shelf system to run it: intake, diagnosis, parts, repair status, warranty, and the ledger all had to be tracked without dropping a device or a promise.',
  ],
  constraints: [
    'A small team (under five) handling 1,000+ devices a month.',
    'Quality at the hardest end — chip-level and board-level micro-soldering, with a 90-day warranty on the line.',
    'Fast turnaround (most devices back within 24 hours) without cutting corners.',
    'Trust built on transparency: free diagnosis, genuine-grade parts, no surprise bills.',
  ],
  decisions: [
    {
      decision:
        'Specialise at the chip / board level (micro-soldering, genuine-grade parts, 90-day warranty) rather than competing on swap-and-replace.',
      tradeoff:
        'Harder work that needs real hardware skill — it is also the moat: the repairs most shops turn away became the reputation.',
    },
    {
      decision:
        'Build custom ops software — a ledger, per-device checklists, and device tracking (Excel used as a functional database) — to run intake through return.',
      tradeoff:
        'Time spent building tools instead of turning wrenches — it lifted operational efficiency by 80% and kept a tiny team from dropping devices.',
    },
    {
      decision:
        'Compete on transparency: free diagnosis, honest pricing, and a warranty, backed by same-/next-day turnaround.',
      tradeoff:
        'Free diagnosis and warranties cost margin up front — they are what produced a 4.7★ reputation across 516 reviews and repeat custom.',
    },
    {
      decision:
        'Design the operation to run without me — documented process and tooling — then hand day-to-day operations to family.',
      tradeoff:
        'Building for handoff is more work than running it yourself — it is why the business still operates years after I moved into software.',
    },
  ],
  results: [
    { value: '4.7★', label: 'across 516 Google reviews' },
    { value: '1,500+', label: 'devices repaired' },
    { value: '80%', label: 'operational-efficiency lift from software' },
    { value: 'Still running', label: 'under family, years on' },
  ],
  resultsNote:
    'The entrepreneurship-and-hands-on-hardware chapter of the arc — proof that the systems instinct showed up long before the software, and that things built well outlast the builder’s attention.',
  diagramId: 'gadjoy',
  seoDescription:
    'Case study: founding and scaling Gadjoy Repair Services — a chip-level device-repair business (4.7★, 516 Google reviews, 1,500+ repairs, 24-hour turnaround) and the self-built ops software that ran it, still operating under family.',
};
