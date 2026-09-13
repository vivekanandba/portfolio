import type { CaseStudy } from '../schema';

// Sources: master resume / LinkedIn Projects ("Design & Development of
// Opto-Electronic Assemblies for LCA-Navy", Jan–Jun 2016; CATIA, Abaqus; ARDC/
// HAL); ENTI deck v1.4, slides 36–39 (position light 100×90×50 mm on the
// landing gear, wander light 110×110×50 mm with a 1.5 m retractable cord,
// composite prototypes shown to pilots, DFM-driven miniaturisation) and the
// seven qualification animations (six load cases) on slide 37 (altitude, high-temperature
// storage/operation, low-temperature operation, thermal shock, natural-
// frequency sweep, transit drop). The two transit-drop clips are 35 s excerpts
// of 3-minute recordings (first 70 s at 2× speed); see scripts/media-web.json.
const CREDIT = 'Simulation: ENTI Innovations Pvt. Ltd. — corporate deck v1.4, slide 37';
const RENDER = 'Render: ENTI Innovations Pvt. Ltd. — corporate deck v1.4';

export const lcaNavy: CaseStudy = {
  slug: 'lca-navy',
  projectId: 'lca-navy',
  eyebrow: 'Project · Legend Technologies · ARDC / HAL',
  title: 'LCA-Navy Opto-Electronics — position light and wander light, from a blank sheet',
  intro:
    'Indigenisation of two imported opto-electronic units for the LCA-Navy — India’s naval light combat aircraft — for the Aircraft Research & Design Centre at HAL: an external position light that had to fit a 100 × 90 × 50 mm envelope on the landing gear and survive the aircraft’s environment, and a cockpit wander light with a 1.5 m retractable cord in 110 × 110 × 50 mm. Designed in CATIA, qualified in simulation before a prototype was cut.',
  metrics: [
    { value: '100×90×50 mm', label: 'position-light envelope' },
    { value: '6 load cases', label: 'qualification simulated first' },
    { value: 'ARDC · HAL', label: 'design authority' },
  ],
  problem: [
    'Both units were imported line-replaceable items; indigenising them meant new-product development from a blank sheet — no drawings to adapt, and airborne plus naval environments to design against from the first sketch.',
    'The position light sits on the landing gear, so its shape is an aerodynamic problem as well as an optical and structural one, and the whole assembly had to hold together inside 100 × 90 × 50 mm through altitude, temperature extremes, thermal shock, vibration and a transit drop.',
    'The wander light had a different squeeze: a focused, narrow beam a pilot can move around the cockpit, with the cord’s extraction and retraction built into a 110 × 110 × 50 mm body.',
  ],
  constraints: [
    'Hard volume envelopes: 100 × 90 × 50 mm (position light), 110 × 110 × 50 mm with a 1.5 m cord (wander light).',
    'Aerodynamic placement on the landing gear; sturdiness through the environmental test sequence.',
    'Airborne and naval environmental requirements, set by ARDC / HAL as the design authority.',
    'Design in CATIA; analysis by finite-element simulation (Abaqus per the resume) before hardware.',
  ],
  decisions: [
    {
      decision:
        'Simplify each design to the bare minimum of parts — fewer iterations, easier fabrication — and choose the wander light’s retraction mechanism for part count rather than novelty.',
      tradeoff:
        'A spartan design gives up elegance and some features — inside a 50 mm-deep envelope it is the only way to leave room for the optics and the cord.',
    },
    {
      decision:
        'Simulate the qualification envelope before the real tests: altitude, high-temperature storage and operation, low-temperature operation, thermal shock, a natural-frequency sweep, and the transit-drop impact.',
      tradeoff:
        'Six analyses before a single part exists is slow up front — and it is why the prototypes went to environmental test with the failure modes already known. The animations below are those runs (the transit drop in two views).',
    },
    {
      decision:
        'Build composite proof-of-concept prototypes and put them in front of the pilots, using design-for-manufacturability to drive the miniaturisation.',
      tradeoff:
        'Prototyping for the user costs a cycle that pure analysis would skip — the pilots’ reaction is what a light for a cockpit is for.',
    },
    {
      decision: 'Work directly to ARDC / HAL expectations as the design authority.',
      tradeoff:
        'Designing to a demanding authority adds review overhead — it is also what makes the work credible.',
    },
  ],
  results: [
    { value: 'Prototyped', label: 'composite proof-of-concept units' },
    { value: 'Simulated', label: '6 qualification cases before test' },
    { value: 'Shown to pilots', label: 'for LCA-Navy via ARDC / HAL' },
  ],
  resultsNote:
    'New-product development for a national defence-aviation program — engineering ownership from a blank sheet, with the qualification thinking done before the metal.',
  diagramId: 'lca-navy',
  gallery: [
    {
      file: 'media/enti-position-light-exploded-1.jpg',
      alt: 'Exploded CAD view of the position light: lens cap, faceted housing, base plate and fasteners laid out along the assembly axis',
      credit: `Position light, exploded. ${RENDER}, slide 36`,
    },
    {
      file: 'media/enti-position-light-exploded-2.jpg',
      alt: 'Second exploded CAD view of the position light showing the internal mounting plate and the opto-electronic module inside the housing',
      credit: `Position light, internal module. ${RENDER}, slide 36`,
    },
    {
      file: 'media/enti-wander-light-catia-1.jpg',
      alt: 'CATIA screenshot of the wander-light body with its part tree: bottom chamber, top chamber, covers, PCB and slide bushes',
      credit: `Wander light in CATIA. ${RENDER}, slide 38`,
    },
    {
      file: 'media/enti-wander-light-catia-2.jpg',
      alt: 'CATIA screenshot of the wander-light torch head in section, optical lens, retainer ring, switch and potentiometer listed in the tree',
      credit: `Wander-light torch head. ${RENDER}, slide 38`,
    },
    {
      file: 'media/enti-wander-light-exploded.jpg',
      alt: 'Tall exploded view of the wander light: cover, cord reel, springs, fasteners and base stacked vertically',
      tall: true,
      credit: `Wander light, exploded. ${RENDER}, slide 39`,
    },
  ],
  clips: [
    {
      file: 'media/enti-position-light-fea-altitude.mp4',
      poster: 'media/enti-position-light-fea-altitude-poster.jpg',
      alt: 'Von Mises stress contours build on the position-light housing mesh as the altitude pressure case is applied',
      caption: 'Altitude — pressure differential on the housing.',
      credit: CREDIT,
    },
    {
      file: 'media/enti-position-light-fea-high-temp.mp4',
      poster: 'media/enti-position-light-fea-high-temp-poster.jpg',
      alt: 'Resultant displacement contours grow across the housing during high-temperature storage and operation',
      caption: 'High-temperature storage and operation — displacement.',
      credit: CREDIT,
    },
    {
      file: 'media/enti-position-light-fea-low-temp.mp4',
      poster: 'media/enti-position-light-fea-low-temp-poster.jpg',
      alt: 'Stress contours on the housing under the low-temperature operating case',
      caption: 'Low-temperature operation — stress.',
      credit: CREDIT,
    },
    {
      file: 'media/enti-position-light-fea-thermal-shock.mp4',
      poster: 'media/enti-position-light-fea-thermal-shock-poster.jpg',
      alt: 'Stress contours sweep across the housing as the thermal-shock transient is applied',
      caption: 'Thermal shock — transient stress.',
      credit: CREDIT,
    },
    {
      file: 'media/enti-position-light-fea-natural-frequency.mp4',
      poster: 'media/enti-position-light-fea-natural-frequency-poster.jpg',
      alt: 'The housing mesh deforms through its vibration modes during the natural-frequency sweep',
      caption: 'Natural-frequency sweep — the modes that vibration testing will excite.',
      credit: CREDIT,
    },
    {
      file: 'media/enti-position-light-fea-transit-drop-3d.mp4',
      poster: 'media/enti-position-light-fea-transit-drop-3d-poster.jpg',
      alt: 'The lens strikes the ground in a transit-drop simulation; stress contours flare at the impact corner and the lens rebounds',
      caption: 'Transit drop, 3D stress view — first 70 s of the recording at 2× speed.',
      credit: CREDIT,
    },
    {
      file: 'media/enti-position-light-fea-transit-drop-section.mp4',
      poster: 'media/enti-position-light-fea-transit-drop-section-poster.jpg',
      alt: 'Cross-section of the housing and lens during the transit drop; the green lens deforms against the red housing and recovers',
      caption: 'Transit drop, cross-section — first 70 s at 2× speed.',
      credit: CREDIT,
    },
  ],
  seoDescription:
    'Project: indigenised position light and wander light for the LCA-Navy at ARDC / HAL — 100×90×50 mm and 110×110×50 mm envelopes, six qualification cases simulated before hardware, composite prototypes shown to pilots.',
};
