import type { StripFrame } from './schema';

/**
 * Fifteen years in pictures (SPEC-0006 R12): the frames after the hero, in
 * the order listed — aerospace first, the rare half, then the arc onward —
 * each taking its alt text and credit from the case study it links to. A
 * file that is not in that case study's gallery or its project image fails
 * the build: the strip shows only what has been screened and credited once
 * already (ADR-0007). Every frame is my own work and shows the artefact, with
 * an openly licensed photograph of the machine it serves beside it where the
 * artefact alone would not be understood.
 */
export const strip: StripFrame[] = [
  {
    file: 'media/legend-s200-integration-fixture.jpg',
    projectId: 'vssc-tooling',
    caption: 'The S200 booster integration fixture, for LVM3',
    context: { file: 'media/commons-lvm3-m4-to-the-pad.jpg', focus: 'right' },
  },
  {
    file: 'media/legend-pw1100g-test-cell.jpg',
    projectId: 'pw-augmenter',
    caption: 'A live PW1100G test cell, my augmenter in place',
    context: { file: 'media/commons-pw1100g-on-a320neo.jpg', focus: 'center' },
  },
  {
    file: 'media/legend-37ch-pancake-slipring.jpg',
    projectId: 'slipring-line',
    caption: 'A 37-channel pancake slip ring, for a tank turret',
    context: { file: 'media/commons-arjun-mbt-mark-1a.jpg', focus: 'center' },
  },
  {
    file: 'media/enti-bmp2-turret-overview.jpg',
    projectId: 'bmp2-turret',
    caption: 'The BMP-II turret, 3,000 sheets modelled',
    context: { file: 'media/commons-bmp-2-on-display.jpg', focus: 'center' },
  },
  { file: 'media/gadjoy-workshop.jpg', projectId: 'gadjoy', caption: 'The Gadjoy bench' },
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
