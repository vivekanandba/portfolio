import type { CaseStudy } from '../schema';

// The era hub (ADR-0015): a way of working, not a system. Sources, by stage —
// MD's LinkedIn recommendation (live on /recommendations/): "end-to-end
// support… from bidding and cost estimation to design, production, and
// testing", sales & marketing, website and social media, composite-lab
// outreach, 3D printing and scripts; ENTI deck v1.4, slide 18 (org chart:
// "Vivekanand B (Technical Manager)", design team) and slide 2 (service list:
// modelling, drafting, GD&T, engineering changes, manufacturing process
// drawings, inspection documents, assembly floor sheets, acceptance test
// procedures), slides 30–31 (process sheets "followed by the manufacturing
// unit"), slides 37/39 (prototypes shown to pilots), slides 24–25 (adapter
// erected at the client's premises); Legend deck v5.5, slide 60 (division team
// table: "Design — Vivekanand B"); master resume (effort estimation, tool
// fabrication quotes, QAP, first-article proving, installation liaison);
// my note of 2026-09-13 (the account itself — marked “my account only” where
// nothing else records it).
const PHOTO = 'Photo: Legend Technologies (India) Pvt. Ltd. — capability deck v5.5';
const RENDER = 'Render: Legend Technologies (India) Pvt. Ltd. — capability deck v5.5';
const BEFORE = 'Role: company programme (before my time — shown as the standard I worked to).';
const UNDATED = 'Role: company programme (date not recorded).';

export const legendTechnologies: CaseStudy = {
  slug: 'legend-technologies',
  projectId: 'legend-technologies',
  eyebrow: 'Project · Legend Technologies · ENTI Innovations · 2013–2018',
  title: 'Legend Technologies — owning a mechanical product end to end, bid to handover',
  intro:
    'Five years at a medium-scale aerospace tooling house in Bangalore, where I carried one-off products through every gate: bid it, price it, design it with my team, prototype it, stand on the shop floor while it was machined and welded, write the process sheets, prove the first article, hand it over. Individual contributor and design-team lead at the same time. This is the loop the rest of the site was built from — and the reason a repair business got founded from inside it.',
  metrics: [
    { value: 'Bid → handover', label: 'seven stages, one pair of hands' },
    { value: '2013 – 2018', label: 'Engineer → Lead Project Engineer' },
    { value: 'IC + lead', label: 'designer and design-team manager at once' },
  ],
  problem: [
    'At a medium-scale company there is no hand-off between sales, design, production and quality. I priced the job, so I had to make the tolerance I promised machinable, and then stand at the inspection table when the first article was measured.',
    'Each gate fails in its own way — a mispriced bid, a GD&T callout the lathe cannot hold, a process sheet the quality team cannot follow, a first article that does not pass — and every failure landed on me rather than on a department.',
    'The company’s programme portfolio (jigs for the LCA, LCH, ALH, GSLV and PSLV; slip rings for ISRO, DRDO labs and BEL; test cells for Safran and Pratt & Whitney) spans two decades. Some of it predates 2013; what I touched, and how, is recorded against each item below rather than implied by a gallery.',
  ],
  constraints: [
    'Aerospace batches: small quantities, flight-hardware tolerances, first-article proving on most tooling jobs.',
    'Me across bid, design, prototype, production, process documentation, inspection and handover — while managing the design team.',
    'GD&T and production tolerances decided in design, not discovered on the floor; design-for-manufacturability and design-for-testability as standing disciplines.',
    'Evidence discipline for this page (ADR-0008): stages attested by a third party say so; the shop-floor detail only I can vouch for is marked “my account only”.',
  ],
  decisions: [
    {
      decision:
        '1 · Bid. Go and bid for the project: pre-sales, price negotiation, the technical bid, the technical discussions that convince the customer — and take the job on.',
      tradeoff:
        'Estimating a one-off jig you have not yet designed is where the loop is riskiest; it is also what the MD’s recommendation names first — “end-to-end support… from bidding and cost estimation to design, production, and testing” — and what the two capability decks in this repository were for. That the bidding authority itself was mine to exercise is my account only — my note of 2026-09-13.',
    },
    {
      decision:
        '2 · Design. Design it as one of the designers, alongside the mechanical design team I led, through a design-QA cycle — with GD&T and production tolerances designed in, and design-for-manufacturability and -testability applied as a matter of course.',
      tradeoff:
        'Designing and managing at once means the design review is sometimes a review of your own work; the ENTI org chart (Technical Manager, design team) and its service list (modelling, drafting, GD&T, engineering changes) record the seat and the disciplines.',
    },
    {
      decision: '3 · Prototype. Build the proof-of-concept before committing the batch.',
      tradeoff:
        'A prototype cycle is schedule spent before the paying part exists — the position light went to pilots as a composite prototype first (ENTI deck s37/39), and the IGCAR slip ring was tested as a prototype before delivery (resume).',
    },
    {
      decision:
        '4 · Batch production. Produce in aerospace batches, on the floor: sit with the lathe, CNC, milling and welding operators, and check the quality team’s work as it happens.',
      tradeoff:
        'Floor time is time not spent designing; it is also the only way a tolerance callout survives contact with a machine. The production and testing span is attested by the MD (“design, production, and testing”) and the resume (production and purchase liaison on every Legend project); the operator-level detail is my account only — my note of 2026-09-13.',
    },
    {
      decision:
        '5 · Process documentation. Once the drawings are done, write the process sheet for each so the production and quality teams can execute without the designer at their elbow.',
      tradeoff:
        'The least glamorous half of tooling design, and the one the ENTI deck singles out: process sheets for the PSLV nose cones were “followed by the manufacturing unit” (s30–31), and manufacturing process drawings, inspection documents, assembly floor sheets and acceptance test procedures are listed as the design arm’s deliverables (s2).',
    },
    {
      decision:
        '6 · Inspection and first-article proving. Most tooling jobs end with a first article measured against the drawing; the tool is done when the article passes.',
      tradeoff:
        'Proving costs a cycle and sometimes a rework — it is the stage the resume names on the VSSC tooling (“first article proving”, QAP) and the reason the tool defines the part rather than the other way round.',
    },
    {
      decision: '7 · Handover. Install at the customer, hand it over, and close the loop.',
      tradeoff:
        'Installation liaison at Air India, CENCO and VSSC (resume) and an adapter “erected at the client’s premises” (ENTI s24–25) — the handover is where the next bid starts, because the customer who watched you install is the one who calls again.',
    },
  ],
  results: [
    { value: '8 pages', label: 'Legend-era projects on this site' },
    { value: 'Nov 2016', label: 'Gadjoy founded from inside it' },
    { value: '2 decks', label: 'authored — now source material here' },
  ],
  resultsNote:
    '“So I was involved end to end. That is the reason it gave me a lot of impetus on my own personal entrepreneurial journey.” — in my own words, 13 September 2026.',
  diagramId: 'legend-technologies',
  gallery: [
    {
      file: 'media/legend-rlv-td-on-jig.jpg',
      alt: 'The RLV-TD winged re-entry vehicle mockup sitting in its cream-painted assembly jig on a green workshop floor, a second vehicle behind it',
      wide: true,
      credit: `RLV-TD — ISRO’s reusable launch-vehicle technology demonstrator, flown May 2016 — in its assembly jig for VSSC. Role: supported (company programme during my tenure). ${PHOTO}, slide 10`,
    },
    {
      file: 'media/legend-rlv-td-assembly-jig.jpg',
      alt: 'The RLV-TD assembly jig empty: a cream steel gantry with a circular cradle at its centre',
      credit: `RLV-TD assembly jig, VSSC. Role: supported (company programme during my tenure). ${PHOTO}, slide 10`,
    },
    {
      file: 'media/legend-lca-mockup-aero-india-2015.jpg',
      alt: 'An LCA Tejas full-scale mockup nose-on in a hangar, drop tanks under the wings, technicians at work around it',
      credit: `LCA mockup modification for Aero India 2015. Role: supported (company programme during my tenure). ${PHOTO}, slide 34`,
    },
    {
      file: 'media/legend-lca-composite-canopy-trolley.jpg',
      alt: 'A red composite canopy trolley with a yellow wheeled base in a workshop bay',
      credit: `Composite canopy trolley for the LCA — light enough to travel in the aircraft. Role: supported (ENTI design-team case, 2013). ${PHOTO}, slide 68`,
    },
    {
      file: 'media/legend-lch-coupling-jig-cad.jpg',
      alt: 'CAD render of the LCH coupling jig: a helicopter fuselage held in a lattice of yellow locating frames on a red base grid',
      wide: true,
      credit: `Coupling jig for the LCH (14 × 5 × 4 m), RWRDC / HAL — CAD. ${UNDATED} ${RENDER}, slide 8`,
    },
    {
      file: 'media/legend-lch-coupling-jig.jpg',
      alt: 'The LCH coupling jig as built, cream-painted frames around a green primed fuselage in a hangar',
      credit: `Coupling jig for the LCH, as built. ${UNDATED} ${PHOTO}, slide 8`,
    },
    {
      file: 'media/legend-gslv-mk3-middle-assembly-jig.jpg',
      alt: 'A circular assembly jig for the GSLV Mk III middle segment: a ring of locating arms on a tall cream lattice stand',
      credit: `½M (middle) assembly jig for GSLV Mk III, Aerospace Division, HAL. ${UNDATED} ${PHOTO}, slide 13`,
    },
    {
      file: 'media/legend-lca-td1-display-pylon.jpg',
      alt: 'An LCA technology demonstrator mounted nose-up on a display pylon over a lawn',
      tall: true,
      credit: `LCA TD1 after modification and transport for RCS. ${UNDATED} ${PHOTO}, slide 66`,
    },
    {
      file: 'media/legend-lca-mockup-road-transport.jpg',
      alt: 'An LCA Tejas mockup on a low-bed trailer behind a red truck in Bangalore traffic (frame cropped; faces blurred)',
      wide: true,
      credit: `The Minsk Square mockup on its way through Bangalore. ${UNDATED} ${PHOTO}, slide 37 (cropped, faces blurred)`,
    },
    {
      file: 'media/legend-tejas-trainer-mockup-republic-day.jpg',
      alt: 'A Tejas trainer mockup on a parade float in front of trees, a “Tejas Trainer” banner on the float’s side',
      wide: true,
      credit: `Tejas trainer mockup at the Republic Day parade, New Delhi. ${UNDATED} ${PHOTO}, slide 33`,
    },
    {
      file: 'media/legend-beml-metro-spot-welding-fixture.jpg',
      alt: 'A metro side-panel spot-welding fixture: rows of red toggle clamps on a steel table with a brass tool plate',
      credit: `Metro side-panel spot-welding fixture for BEML — the rail work that preceded the rolling-stock era. ${UNDATED} ${PHOTO}, slide 23`,
    },
    {
      file: 'media/legend-lca-front-fuselage-jig-cad.jpg',
      alt: 'CAD render of the LCA front fuselage assembly jig: a teal gantry over a platform with stairs and railings',
      credit: `Front fuselage assembly jig for the LCA (7 × 5 × 4 m), ARDC / HAL. ${BEFORE} ${RENDER}, slide 7`,
    },
    {
      file: 'media/legend-lca-centre-fuselage-jig-cad.jpg',
      alt: 'CAD render of the LCA centre fuselage jig, a cream truss cage on a railed platform',
      credit: `Centre fuselage jig for the LCA, ARDC / HAL. ${BEFORE} ${RENDER}, slide 18`,
    },
    {
      file: 'media/legend-alh-deck-assembly-jig.jpg',
      alt: 'An orange steel jig for the ALH engine and transmission deck on a workshop floor',
      credit: `Engine and transmission deck jig for the ALH, Helicopter Division, HAL. ${BEFORE} ${PHOTO}, slide 12`,
    },
    {
      file: 'media/legend-jaguar-station-25-fixture.jpg',
      alt: 'A machined aluminium assembly fixture with two angled locating arms, for the Jaguar aircraft',
      credit: `Assembly fixture, station 25, Jaguar — Aircraft Division, HAL. ${BEFORE} ${PHOTO}, slide 19`,
    },
    {
      file: 'media/legend-boeing-cargo-door-jig.jpg',
      alt: 'An all-aluminium assembly jig for a Boeing cargo undercarriage door, garlanded for its inauguration in a hangar',
      credit: `All-aluminium Boeing cargo U/C door assembly jig for IAI, Israel (photograph dated 2004). ${BEFORE} ${PHOTO}, slide 20`,
    },
    {
      file: 'media/legend-aircraft-hangar.jpg',
      alt: 'The company’s aircraft hangar: a long high bay with roof trusses, tooling and jig components on the floor',
      wide: true,
      credit: `The aircraft hangar. Role: workplace. ${PHOTO}, slide 81`,
    },
    {
      file: 'media/legend-haas-cnc-machining-centre.jpg',
      alt: 'A HAAS CNC vertical machining centre on the shop floor',
      credit: `HAAS CNC machining centre — one of the machines I stood beside. Role: workplace. ${PHOTO}, slide 82`,
    },
    {
      file: 'media/legend-clean-room-entrance.jpg',
      alt: 'The clean-room entrance and an office beyond it, a “Clean Room” sign above the door',
      tall: true,
      credit: `Clean room, slip-ring division. Role: workplace. ${PHOTO}, slide 84`,
    },
    {
      file: 'media/legend-inspection-room.jpg',
      alt: 'The inspection room: a granite surface table on a green steel stand with a height gauge, windows behind',
      credit: `Inspection room — where first articles were measured. Role: workplace. ${PHOTO}, slide 85`,
    },
    {
      file: 'media/legend-office-building.jpg',
      alt: 'The company’s white two-storey office building under a blue sky',
      wide: true,
      credit: `The office. Role: workplace. ${PHOTO}, slide 5`,
    },
  ],
  docs: [
    {
      label:
        'The two capability decks I authored — redacted transcripts and screened media (source/decks)',
      href: 'https://github.com/vivekanandba/portfolio/tree/main/source/decks',
    },
    {
      label: 'Original decks — GitHub Release source-decks-2026-09 (sha256 pinned)',
      href: 'https://github.com/vivekanandba/portfolio/releases/tag/source-decks-2026-09',
    },
    {
      label: 'My account of the loop, verbatim — my note of 2026-09-13',
      href: 'https://github.com/vivekanandba/portfolio/blob/main/source/my-notes/2026-09-13-legend-end-to-end.md',
    },
  ],
  seoDescription:
    'Project: five years at Legend Technologies (2013–2018) owning mechanical products end to end — bid, design with GD&T, prototype, batch production on the shop floor, process sheets, first-article proving, handover — as individual contributor and design-team lead; the origin of the entrepreneurial arc.',
};
