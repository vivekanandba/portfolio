import type { CaseStudy } from '../schema';

// Sources: master resume / LinkedIn Projects ("Design and Fabrication of
// Augmenter Extension — Safran CENCO", Jun 2016–Jun 2017; designer, production
// & purchase liaison, installation liaison, project manager; onsite New Delhi);
// MD's LinkedIn recommendation ("custom scripts streamlined the production of
// augmenter extensions for Pratt & Whitney"); Legend deck v5.5, slides 25–26
// (the PW1100G test cell and the related Nagpur airflow-ramp test cell for
// Safran / CENCO).
const PHOTO = 'Photo: Legend Technologies (India) Pvt. Ltd. — capability deck v5.5';

export const pwAugmenter: CaseStudy = {
  slug: 'pw-augmenter',
  projectId: 'pw-augmenter',
  eyebrow: 'Project · Legend Technologies · Pratt & Whitney',
  title: 'P&W 1100G Test-Bed Augmenter — tooling for a live engine test cell',
  intro:
    'An augmenter extension and movable cart for testing the Pratt & Whitney PW1100G — the geared turbofan that powers the A320neo family — at an existing CENCO engine test bed, engineered to install and remove cleanly on a live facility, with liaison across Air India, CENCO, and Pratt & Whitney.',
  metrics: [
    { value: 'PW1100G', label: 'A320neo geared turbofan' },
    { value: 'Live test bed', label: 'install & removal design' },
    { value: '3-party', label: 'onsite coordination' },
  ],
  problem: [
    'Testing the PW1100G at an existing CENCO test bed required an augmenter extension that could be installed and removed without disrupting the running facility — a hardware problem inseparable from a coordination problem.',
    'The work sat between three organizations around a single test bed: Air India (the facility), CENCO (the test-cell builder), and Pratt & Whitney (the engine) — each with its own constraints and schedule.',
  ],
  constraints: [
    'Clean installation and removal at an existing, operational engine test bed.',
    'Effort estimation and installation coordination across Air India, CENCO, and Pratt & Whitney.',
    'Welding and assembly technical support with full documentation.',
    'Design to fit the existing facility rather than a greenfield rig.',
  ],
  decisions: [
    {
      decision:
        'A movable-cart augmenter design engineered specifically for easy installation and removal at the existing test bed.',
      tradeoff:
        'A mobile design is more engineering than a fixed weldment — it is what let the augmenter coexist with a facility that could not be rebuilt around it.',
    },
    {
      decision:
        'Script the repetitive production drawings for the extension instead of drafting each variant by hand.',
      tradeoff:
        'Writing tooling for drawings is a detour from the drawings themselves — the MD’s recommendation singles it out as what “streamlined the production of augmenter extensions”, and it was the first time programming paid for itself on a shop floor.',
    },
    {
      decision:
        'Act as designer, production/purchase liaison, installation liaison, and project manager — owning coordination, not just drawings.',
      tradeoff:
        'Wearing every hat is heavier than pure design work — on a live test facility, coordination is the deliverable as much as the hardware.',
    },
    {
      decision:
        'Provide welding and assembly technical support with documentation through install.',
      tradeoff:
        'Staying involved past drawing release costs time — it is how the cart actually went in and worked.',
    },
  ],
  results: [
    { value: 'Installed', label: 'on the live CENCO test bed' },
    { value: 'Removable', label: 'without facility disruption' },
    { value: 'Coordinated', label: 'across Air India · CENCO · P&W' },
  ],
  resultsNote:
    'Multi-party coordination on a live facility — a discipline that translated directly into leading cross-functional software delivery later.',
  diagramId: 'pw-augmenter',
  gallery: [
    {
      file: 'media/legend-pw1100g-test-cell.jpg',
      alt: 'The engine test cell before the engine: the augmenter tube mouth at the far wall, acoustic lining, a staircase and railings in green-lit concrete',
      wide: true,
      credit: `The CENCO test cell with the augmenter extension in place. ${PHOTO}, slide 25`,
    },
    {
      file: 'media/legend-pw1100g-augmenter-detail.jpg',
      alt: 'Close view of the augmenter extension’s flanged joint and its blue support frame',
      tall: true,
      credit: `Augmenter extension, joint detail. ${PHOTO}, slide 25`,
    },
    {
      file: 'media/legend-nagpur-test-cell-1.jpg',
      alt: 'A white-walled airflow-ramp test cell under construction, the blue ramp structure hanging from an overhead beam',
      credit: `Airflow-ramp test cell structure, Nagpur — the related Safran / CENCO cell job. ${PHOTO}, slide 26`,
    },
    {
      file: 'media/legend-nagpur-test-cell-2.jpg',
      alt: 'Looking down the Nagpur test cell at the augmenter tube opening, yellow access platforms in the foreground',
      tall: true,
      credit: `Nagpur test cell, augmenter opening. ${PHOTO}, slide 26`,
    },
    {
      file: 'media/legend-nagpur-test-cell-3.jpg',
      alt: 'The Nagpur test cell’s augmenter tube from the front, a cherry-picker and yellow platforms below the overhead crane',
      wide: true,
      credit: `Nagpur test cell, front view. ${PHOTO}, slide 26`,
    },
  ],
  seoDescription:
    'Project: a movable-cart augmenter extension for testing the Pratt & Whitney PW1100G geared turbofan at an existing CENCO engine test bed, with onsite liaison across Air India, CENCO, and Pratt & Whitney.',
};
