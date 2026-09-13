import type { CaseStudy } from '../schema';

// Sources: master resume / LinkedIn Projects ("Fabrication of Filament Wound
// Carbon Epoxy Shells & Laminates", Mar–Aug 2015; PESIT / Siemens; production &
// purchase liaison, testing liaison; onsite Vijayawada); ENTI deck v1.4, slide
// 40 ("Filament winding for gas pipelines — Siemens", the two shell photographs).
const PHOTO = 'Photo: ENTI Innovations Pvt. Ltd. — corporate deck v1.4, slide 40';

export const filamentComposites: CaseStudy = {
  slug: 'filament-composites',
  projectId: 'filament-composites',
  eyebrow: 'Project · Legend Technologies',
  title: 'Filament-Wound Composites — carbon-epoxy shells, owned end to end',
  intro:
    'Manufacturing transfer and fabrication of high-glass-temperature filament-wound carbon-epoxy shells and laminates for a Siemens gas-pipeline application (with PESIT) — owning material selection, winding, oven curing, machining, and testing rather than handing any stage off.',
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
  gallery: [
    {
      file: 'media/enti-filament-wound-shells-1.jpg',
      alt: 'A single filament-wound cylindrical shell resting on plastic sheeting on a workshop floor, its wound surface catching the light',
      credit: `Filament-wound shell for the Siemens gas-pipeline programme. ${PHOTO}`,
    },
    {
      file: 'media/enti-filament-wound-shells-2.jpg',
      alt: 'Two filament-wound shells of different diameters side by side on the workshop floor',
      credit: `Two shells, machined to length. ${PHOTO}`,
    },
  ],
  seoDescription:
    'Project: manufacturing transfer and fabrication of high-glass-temperature filament-wound carbon-epoxy shells and laminates for a Siemens gas-pipeline programme — material selection, winding, oven curing, machining, and testing owned end to end.',
};
