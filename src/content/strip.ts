import type { StripFrame } from './schema';

/**
 * Fifteen years in pictures (SPEC-0006 R12): the frames after the hero, one
 * per chapter, listed loosely — the strip sorts them by when the work began
 * (caseStudyStart) and takes each frame's alt text and credit from the case
 * study it links to. A file that is not in that case study's gallery or its
 * project image fails the build: the strip shows only what has been screened
 * and credited once already (ADR-0007).
 *
 * Every frame is my own work — not a programme the company supported during
 * my tenure — and shows the artefact, not the room it was made in (second
 * pass, 2026-10-10: the hangar, the test rig and the bench came out).
 */
export const strip: StripFrame[] = [
  {
    file: 'media/legend-37ch-pancake-slipring.jpg',
    projectId: 'slipring-line',
    caption: 'A 37-channel pancake slip ring for a tank turret',
  },
  {
    file: 'media/enti-bmp2-turret-overview.jpg',
    projectId: 'bmp2-turret',
    caption: 'The BMP-II turret, 3,000 sheets modelled',
  },
  {
    file: 'media/legend-s200-integration-fixture.jpg',
    projectId: 'vssc-tooling',
    caption: 'The S200 booster integration fixture for ISRO',
  },
  {
    file: 'media/legend-pw1100g-test-cell.jpg',
    projectId: 'pw-augmenter',
    caption: 'A live engine test cell, my augmenter in place',
  },
  {
    file: 'media/gadjoy-tablet-before-after.jpg',
    projectId: 'gadjoy',
    caption: 'A tablet received dead, returned working',
    focus: 'center',
  },
  {
    file: 'media/mapshalli-aircare-live-map.jpg',
    projectId: 'aircare',
    caption: 'AirCare’s public map, live',
  },
  {
    file: 'media/neurasignal-ng2-system.jpg',
    projectId: 'gcp-telemetry',
    caption: 'The NovaGuide robotic system',
    focus: 'center',
  },
  {
    file: 'media/appstore-sanas-live-conversation.jpg',
    projectId: 'sanas-consumer-app',
    caption: 'Sanas Translate, mid-conversation',
    focus: 'center',
  },
];
