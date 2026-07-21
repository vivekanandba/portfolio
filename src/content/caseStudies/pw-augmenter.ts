import type { CaseStudy } from '../schema';

export const pwAugmenter: CaseStudy = {
  slug: 'pw-augmenter',
  projectId: 'pw-augmenter',
  eyebrow: 'Case Study · Legend Technologies · Pratt & Whitney',
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
  seoDescription:
    'Case study: a movable-cart augmenter extension for testing the Pratt & Whitney PW1100G geared turbofan at an existing CENCO engine test bed, with onsite liaison across Air India, CENCO, and Pratt & Whitney.',
};
