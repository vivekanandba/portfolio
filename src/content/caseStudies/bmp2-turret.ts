import type { CaseStudy } from '../schema';

// Sources: master resume (3,000 sheets, team of 8, 4 months, simulations of
// traverse/elevation/gearing/ammunition supply); MD's LinkedIn recommendation
// ("single-handedly formed and led a dedicated team on-site" in Chennai);
// ENTI deck v1.4, slides 34–35 (renders and the seven kinematic clips; the
// deck's 2013 estimate of "2,000 drawings" is recorded in the source transcript —
// Vivek keeps the resume figure). Clips re-encoded per scripts/media-web.json.
const CREDIT = 'Animation: ENTI Innovations Pvt. Ltd. — corporate deck v1.4, slide 35';

export const bmp2Turret: CaseStudy = {
  slug: 'bmp2-turret',
  projectId: 'bmp2-turret',
  eyebrow: 'Project · Legend Technologies · BEL',
  title: 'BMP-II Turret — a 3D and kinematic study for FICV',
  intro:
    'Full 3D modelling and kinematic simulation of the BMP-II turret for Bharat Electronics’ Futuristic Infantry Combat Vehicle space studies — part of India’s flagship program to replace its Soviet-era BMP-2 fleet — reconstructing 3,000 legacy drawings into validated, simulated geometry on a four-month clock. The simulations below are the deliverable itself, moving.',
  metrics: [
    { value: '3,000', label: 'drawing sheets modeled' },
    { value: '8', label: 'engineers led' },
    { value: '4 months', label: 'study delivered' },
  ],
  problem: [
    'BEL’s FICV space studies needed the complete BMP-II turret as validated 3D — geometry and kinematics reconstructed from 3,000 legacy drawing sheets — decision-grade, and on a four-month clock.',
    'Space studies are only as good as the model’s fidelity: traverse, elevation, gearing, and ammunition-supply motion all had to be simulated, not just drawn. A joint that does not turn in the model is a clash nobody finds until the vehicle is built.',
  ],
  constraints: [
    'Four months for the full turret study — modelling, kinematics, and delivery.',
    'Kinematic fidelity across traverse, elevation, gearing, and ammunition supply — in manual and motorised modes.',
    '3,000 legacy sheets to reconcile into one coherent, validated 3D model.',
    'Customer-facing delivery to BEL, on site in Chennai, with QA that holds up in review.',
  ],
  decisions: [
    {
      decision:
        'Form and lead a project team of 8, with engineers assigned exclusively to quality assurance.',
      tradeoff:
        'Dedicating scarce heads to QA on a four-month schedule feels expensive — until the alternative is discovering modelling errors in the customer’s review.',
    },
    {
      decision:
        'Make kinetic simulation of the full turret (traverse, elevation, gearing, ammunition supply) the deliverable core, not an afterthought — one animation per mechanism and mode.',
      tradeoff:
        'Simulation on top of geometry reconstruction is real added effort — it is what made the space studies decision-grade for BEL, and what lets a reader check the claim today.',
    },
    {
      decision: 'Own project management and customer interaction across the four-month window.',
      tradeoff:
        'Leading delivery is more than engineering the model — the positive customer feedback was the point.',
    },
  ],
  results: [
    { value: 'Delivered', label: 'full turret study in 4 months' },
    { value: 'Simulated', label: 'traverse · elevation · gearing · ammo' },
    { value: 'Positive', label: 'customer feedback from BEL' },
  ],
  resultsNote:
    'Leading an eight-engineer team to a decision-grade study on a fixed clock — the first taste of technical leadership under a hard deadline.',
  diagramId: 'bmp2-turret',
  clips: [
    {
      file: 'media/enti-bmp2-elevation-and-traverse.mp4',
      poster: 'media/enti-bmp2-turret-overview.jpg',
      alt: 'The complete turret rotates in traverse while the gun elevates, seen from above the ring',
      caption: 'Elevation and traverse together — the whole turret, moving (34 s).',
      credit: CREDIT,
    },
    {
      file: 'media/enti-bmp2-elevation-manual.mp4',
      poster: 'media/enti-bmp2-elevation-manual-poster.jpg',
      alt: 'The manual elevation gearbox turns, its handwheel driving the gear train that raises the gun',
      caption: 'Elevation drive, manual mode — the gearing the resume mentions.',
      credit: CREDIT,
    },
    {
      file: 'media/enti-bmp2-elevation-motor.mp4',
      poster: 'media/enti-bmp2-elevation-motor-poster.jpg',
      alt: 'The motorised elevation drive spins its motor and reduction gears to elevate the gun',
      caption: 'Elevation drive, motorised.',
      credit: CREDIT,
    },
    {
      file: 'media/enti-bmp2-traverse-motor.mp4',
      poster: 'media/enti-bmp2-traverse-motor-poster.jpg',
      alt: 'The motorised traverse drive turns the turret ring through its gear train',
      caption: 'Traverse drive, motorised.',
      credit: CREDIT,
    },
    {
      file: 'media/enti-bmp2-traverse-manual.mp4',
      poster: 'media/enti-bmp2-traverse-manual-poster.jpg',
      alt: 'The manual traverse gearbox rotates the turret ring via its handwheel and gears',
      caption: 'Traverse drive, manual mode.',
      credit: CREDIT,
    },
    {
      file: 'media/enti-bmp2-ammo-supply-pos2.mp4',
      poster: 'media/enti-bmp2-ammo-supply-pos2-poster.jpg',
      alt: 'The ammunition-supply mechanism cycles a round into the breech from its second feed position',
      caption: 'Ammunition supply, position 2.',
      credit: CREDIT,
    },
    {
      file: 'media/enti-bmp2-ammo-supply-pos1-2.mp4',
      poster: 'media/enti-bmp2-ammo-supply-pos1-2-poster.jpg',
      alt: 'The ammunition-supply mechanism cycles from feed position 1.2, the loader arm swinging through its arc',
      caption: 'Ammunition supply, position 1.2.',
      credit: CREDIT,
    },
  ],
  seoDescription:
    'Project: 3D modelling and kinematic simulation of the BMP-II turret for Bharat Electronics’ FICV space studies — an eight-engineer team reconstructing 3,000 legacy drawings in four months, with the simulation clips.',
};
