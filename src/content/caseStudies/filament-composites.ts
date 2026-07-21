import type { CaseStudy } from '../schema';

export const filamentComposites: CaseStudy = {
  slug: 'filament-composites',
  projectId: 'filament-composites',
  eyebrow: 'Case Study · Legend Technologies',
  title: 'Filament-Wound Composites — carbon-epoxy shells, owned end to end',
  intro:
    'Manufacturing transfer and fabrication of high-glass-temperature filament-wound carbon-epoxy shells and laminates (PESIT / Siemens) — owning material selection, winding, oven curing, machining, and testing rather than handing any stage off.',
  metrics: [
    { value: 'Carbon-epoxy', label: 'filament-wound shells' },
    { value: 'High-Tg', label: 'glass-transition composites' },
    { value: 'End-to-end', label: 'manufacturing transfer owned' },
  ],
  problem: [
    'Transferring a high-glass-temperature composite into repeatable manufacture is not a drawing exercise — winding, cure, and machining each move the finished part, and the qualification has to hold across all of them.',
    'As the key manufacturing representative, the whole chain from material to tested laminate had to land in one pair of hands.',
  ],
  constraints: [
    'High-glass-temperature material behaviour through winding and cure.',
    'Repeatable fabrication suitable for manufacturing transfer, not a one-off.',
    'Machining and testing of the finished shells to qualification.',
    'Ownership across material selection, winding, curing, machining, and testing.',
  ],
  decisions: [
    {
      decision:
        'Act as the manufacturing representative for the transfer — oversee material selection, filament winding, oven curing, machining, and testing as one owned process.',
      tradeoff:
        'Owning every stage is heavier than specializing in one — it is the only way the transfer actually produced conforming parts.',
    },
    {
      decision: 'Build composites expertise in the shop, on real hardware, rather than on paper.',
      tradeoff:
        'The slow way to learn a material — and the foundation for the high-glass-temperature composite work that followed.',
    },
  ],
  results: [
    { value: 'Transferred', label: 'to repeatable manufacture' },
    { value: 'Qualified', label: 'shells and laminates tested' },
    { value: 'Foundation', label: 'composites expertise, hands-on' },
  ],
  resultsNote:
    'Composite fabrication learned at the machine — the kind of ground-truth understanding that later made cross-disciplinary systems work feel familiar.',
  diagramId: 'filament-composites',
  seoDescription:
    'Case study: manufacturing transfer and fabrication of high-glass-temperature filament-wound carbon-epoxy shells and laminates — material selection, winding, oven curing, machining, and testing owned end to end.',
};
