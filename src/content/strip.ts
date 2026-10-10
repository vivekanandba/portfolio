import type { StripFrame } from './schema';

/**
 * Fifteen years in pictures (SPEC-0006 R12): the frames after the hero, one
 * per chapter, listed loosely — the strip sorts them by when the work began
 * (caseStudyStart) and takes each frame's alt text and credit from the case
 * study it links to. A file that is not in that case study's gallery or its
 * project image fails the build: the strip shows only what has been screened
 * and credited once already (ADR-0007).
 */
export const strip: StripFrame[] = [
  {
    file: 'media/legend-aircraft-hangar.jpg',
    projectId: 'legend-technologies',
    caption: 'The hangar floor at Legend',
  },
  {
    file: 'media/enti-bmp2-turret-overview.jpg',
    projectId: 'bmp2-turret',
    caption: 'The BMP-II turret, 3,000 sheets modelled',
  },
  {
    file: 'media/legend-slipring-rotational-test-rig.jpg',
    projectId: 'igcar-slipring',
    caption: 'The slip-ring test rig',
  },
  {
    file: 'media/legend-sitvc-nose-cone-and-aft-shroud.jpg',
    projectId: 'vssc-tooling',
    caption: 'A PSLV strap-on nose cone and its shroud',
  },
  { file: 'media/gadjoy-workshop.jpg', projectId: 'gadjoy', caption: 'The Gadjoy bench' },
  {
    file: 'media/mapshalli-aircare-live-map.jpg',
    projectId: 'aircare',
    caption: 'AirCare’s public map, live',
  },
  {
    file: 'media/neurasignal-ng2-headset.jpg',
    projectId: 'gcp-telemetry',
    caption: 'The NovaGuide probe headset',
  },
  {
    file: 'media/appstore-sanas-live-conversation.jpg',
    projectId: 'sanas-consumer-app',
    caption: 'Sanas Translate, mid-conversation',
  },
];
