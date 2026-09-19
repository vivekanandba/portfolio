import type { CaseStudy } from '../schema';

// Sources: Legend deck v5.5 — slide 4 (VSSC/ISRO licensee for precision slip
// rings: the company's stated position), slides 39–45 (ToT from VSSC in 2000;
// the earlier silver-graphite design and its failure modes; the upgraded
// architecture; 15-year life; design in AutoCAD and UG; clean room class
// 10,000), slides 46–58 (twelve configurations, 6–108 channels), slide 60
// (division team table: "Design — Vivekanand B"), slide 61 (facilities), slide
// 64 (customers and quantities), slide 86 (rotational test rig); ENTI deck
// v1.4, slides 32–33 (miniaturisation, 5 µm tolerances, indigenisation against
// imports). Which configurations passed through Vivek's hands in 2013–2018
// is not recorded anywhere; the division table records the seat, not the parts —
// so the page is written at division level (Vivek's decision pending, ADR-0015).
const PHOTO = 'Photo: Legend Technologies (India) Pvt. Ltd. — capability deck v5.5';
const RENDER = 'Render: Legend Technologies (India) Pvt. Ltd. — capability deck v5.5';

export const slipringLine: CaseStudy = {
  slug: 'slipring-line',
  projectId: 'slipring-line',
  eyebrow: 'Project · Legend Technologies · slip-ring division',
  title: 'Precision Slip Rings — the design seat of a VSSC-licensed product line',
  intro:
    'Legend’s slip-ring division built rotary electrical joints for satellites, naval systems, battle-tank turrets, robotics and wind turbines under a technology transfer from ISRO’s Vikram Sarabhai Space Centre — twelve configurations from 6 to 108 channels, held to 5 µm tolerances and rated by the division for a fifteen-year life. From 2013 the division’s design seat was mine; the high-amperage IGCAR unit is the deep dive.',
  metrics: [
    { value: '6 → 108 ch', label: 'twelve configurations' },
    { value: '5 µm', label: 'contact tolerances (ENTI deck)' },
    { value: '15-yr life', label: 'the division’s rated life (deck claim)' },
  ],
  problem: [
    'The technology ISRO transferred in 2000 used coin-silver rings and silver-graphite brush blocks in a modified-epoxy insulation. In service it formed silver-graphite powder that shorted channels, lost continuity between rotor and stator, let water in, slipped brush blocks between channels, needed frequent lubrication and drew more power than it should.',
    'Customers wanted the opposite of all that — maintenance-free joints, ingress-protected, with continuity guaranteed for years in a satellite or a turret — and they wanted them made in India at a fraction of the imported price.',
    'A slip ring is a small part with no tolerance for error: a brush wire a few microns off its groove is a channel that fails at the worst moment.',
  ],
  constraints: [
    'Aerospace-grade materials, machined only on precision machining centres, soldered at a micro-soldering station by a skilled few.',
    'Clean-room assembly (class 10,000) and a rotational test rig, oscilloscope, RF signal generator and precision scales in-house for test.',
    'Each configuration designed to the customer’s requirement — channel count, current, envelope — in AutoCAD and UG.',
    'The company’s position as VSSC’s licensee for precision slip rings, stated in its own deck; carried here as the company’s claim, not verified independently.',
  ],
  decisions: [
    {
      decision:
        'The upgraded architecture: beryllium-copper brush wire running in U-grooves on electrode-grade copper rings, gold-plated contacts, a purpose-designed PCB for channel termination, a special epoxy potting compound applied in fixtures, and IP sealing with sealants and O-rings.',
      tradeoff:
        'Gold and BeCu cost more than silver-graphite; they end powder formation, hold continuity, and take the rated life to fifteen years, maintenance-free (deck s40–43). The division’s technology, held from 2013 in a design seat that was mine (deck s60).',
    },
    {
      decision:
        'Indigenise: reverse-engineer or develop the miniature and high-speed rings the market imported, to AWG standards, with tolerances held to 5 µm for smooth, stress-free rotation.',
      tradeoff:
        'Indigenisation is slower than reselling an import — it is what made the rings “very cost effective when compared to the overseas imported versions” (ENTI deck s32–33).',
    },
    {
      decision:
        'Test in-house: every unit on the division’s own rotational test rig, assembled in the clean room, before it left.',
      tradeoff:
        'A test rig and a clean room are fixed costs for a small division — and the only way to promise continuity “at all times” to a customer who cannot open a satellite to check.',
    },
    {
      decision:
        'Hold the division’s design seat: every configuration passed through one designer, alongside the aerospace tooling work.',
      tradeoff:
        'One designer for a product line is a single point of failure and a single point of consistency. The division table names the seat, and from 2013 it was mine — twelve configurations, from six channels to a hundred and eight, passing through one pair of hands.',
    },
  ],
  results: [
    { value: '12', label: 'configurations, 6 to 108 channels' },
    { value: '67 units', label: 'BEL naval 57-channel — the line’s volume product (deck s64)' },
    { value: 'IGCAR', label: 'the high-amperage deep dive, published at NAMS 2015' },
  ],
  resultsNote:
    'Customers on the division’s own list: VSSC and IISU (ISRO), RCI, CVRDE, NPOL and ADE (DRDO labs), BEL, Godrej / IGCAR, Avasarala, PARI, Badawe, and a wind-turbine maker — as recorded in the capability deck, slide 64.',
  diagramId: 'slipring-line',
  gallery: [
    {
      file: 'media/legend-igcar-slipring-cad.jpg',
      alt: 'Exploded CAD view of a high-amperage stacked slip ring: end flange, blue rotor housing, contact stack and red brush block laid out along one axis',
      credit: `The high-amperage unit for Godrej / IGCAR, exploded — it has its own page, IGCAR Nuclear Slip Ring (/work/igcar-slipring/). ${RENDER}, slide 58`,
    },
    {
      file: 'media/legend-108ch-slipring-cad.jpg',
      alt: 'Exploded CAD view of a 108-channel stacked slip ring: the long contact stack, brush blocks and end flanges laid out along its axis',
      wide: true,
      credit: `108-channel stacked slip ring for aerospace (RCI), exploded. ${RENDER}, slide 54`,
    },
    {
      file: 'media/legend-109ch-slipring-capsule.jpg',
      alt: 'A slim black slip-ring capsule with a bundle of over a hundred white leads coiled beside it on green cloth',
      credit: `109-channel slip-ring capsule for an aerospace application. ${PHOTO}, slide 54`,
    },
    {
      file: 'media/legend-57ch-naval-slipring-cad.jpg',
      alt: 'Cut-away CAD render of a 57-channel naval slip ring inside its translucent housing, the contact stack and green brush boards visible',
      wide: true,
      credit: `57-channel naval slip ring (BEL), cut-away. ${RENDER}, slide 53`,
    },
    {
      file: 'media/legend-57ch-naval-slipring-assembly.jpg',
      alt: 'A 57-channel slip ring under assembly, white leads fanned out from its contact stack on a bench',
      tall: true,
      credit: `57-channel naval unit under assembly. ${PHOTO}, slide 53`,
    },
    {
      file: 'media/legend-37ch-pancake-slipring-cad.jpg',
      alt: 'CAD render of a 37-channel pancake slip ring, a flat orange disc with connector ports around its rim',
      credit: `37-channel pancake slip ring for battle-tank turrets (CVRDE) — CAD. ${RENDER}, slide 55`,
    },
    {
      file: 'media/legend-37ch-pancake-slipring.jpg',
      alt: 'The 37-channel pancake slip ring as built: a black disc ringed with red connector caps on green cloth',
      credit: `37-channel pancake slip ring, as built. ${PHOTO}, slide 55`,
    },
    {
      file: 'media/legend-48ch-slipring-cad.jpg',
      alt: 'Exploded CAD render of a 48-channel stacked slip ring in a blue housing with magenta end caps',
      credit: `48-channel slip ring for INSAT / GSAT antennas (IISU) — CAD. ${RENDER}, slide 56`,
    },
    {
      file: 'media/legend-27ch-slipring-cad.jpg',
      alt: 'CAD render of a 27-channel stacked slip ring, a long stack of red and green rings inside a pink housing with a green PCB',
      wide: true,
      credit: `27-channel stacked slip ring (Badawe Engineers) — CAD. ${RENDER}, slide 52`,
    },
    {
      file: 'media/legend-27ch-slipring-units.jpg',
      alt: 'Two finished 27-channel slip rings in black housings with their lead bundles, on a dark cloth',
      credit: `27-channel units, finished. ${PHOTO}, slide 52`,
    },
    {
      file: 'media/legend-24ch-slipring-cad.jpg',
      alt: 'CAD render of a 24-channel stacked slip ring in a translucent pink housing showing the ring stack and brush boards',
      credit: `24-channel slip ring for robotics (PARI) — CAD. ${RENDER}, slide 49`,
    },
    {
      file: 'media/legend-8ch-slipring-cad.jpg',
      alt: 'Exploded CAD render of an 8-channel stacked slip ring: rings, brush boards and a flanged base along one axis',
      credit: `8-channel slip ring for a 5 HP marine winch (NPOL) — CAD. ${RENDER}, slide 46`,
    },
    {
      file: 'media/legend-6ch-slipring-cad.jpg',
      alt: 'CAD render of a 6-channel stacked slip ring in a red housing with a yellow mounting tab',
      credit: `6-channel slip ring for a power manipulator (PARI) — CAD. ${RENDER}, slide 48`,
    },
    {
      file: 'media/legend-10ch-miniature-slipring.jpg',
      alt: 'A small stainless 10-channel miniature slip ring with a black cable, a “Legend” label on its body',
      tall: true,
      credit: `10-channel miniature slip ring for satellites (VSSC). ${PHOTO}, slide 47`,
    },
    {
      file: 'media/legend-6ch-miniature-slipring.jpg',
      alt: 'A miniature 6-channel slip ring on a towel, its white leads looped either side, labelled as made under licence from ISRO',
      wide: true,
      credit: `6-channel miniature slip ring, labelled as manufactured under licence from ISRO. ${PHOTO}, slide 51`,
    },
    {
      file: 'media/legend-70ch-slipring-repair.jpg',
      alt: 'The open housing of a 70-channel slip ring during repair, colour-coded leads and brush boards inside',
      credit: `70-channel naval slip ring (BEL) in for repair — the line was serviced, not just sold. ${PHOTO}, slide 57`,
    },
    {
      file: 'media/legend-slipring-rotational-test-rig.jpg',
      alt: 'The division’s rotational test rig: a slip ring coupled to a drive motor on a bench, harnessed for continuity and noise measurement, a “Slipring Division — Process” board on the wall',
      credit: `The rotational test rig. ${PHOTO}, slide 86`,
    },
    {
      file: 'media/legend-slipring-division-building.jpg',
      alt: 'The slip-ring division’s cream two-storey building with orange trim among trees',
      credit: `The slip-ring division’s building. ${PHOTO}, slide 59`,
    },
  ],
  seoDescription:
    'Project: Legend Technologies’ VSSC-licensed slip-ring line — twelve configurations from 6 to 108 channels for ISRO, DRDO labs, BEL and industry, 5 µm tolerances, an upgraded BeCu-on-copper architecture — and the design seat held from 2013.',
};
