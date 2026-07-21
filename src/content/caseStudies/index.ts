import type { CaseStudy } from '../schema';
import { sanasConsumerApp } from './sanas-consumer-app';
import { playground } from './playground';
import { sanasForSales } from './sanas-for-sales';
import { speechIntelligence } from './speech-intelligence';
import { unifiedMlPlatform } from './unified-ml-platform';
import { aiNextStrategy } from './ai-next-strategy';
import { sanasPortal } from './sanas-portal';
import { internalTools } from './internal-tools';
import { mlopsTooling } from './mlops-tooling';
import { gcpTelemetry } from './gcp-telemetry';
import { healthcareInterop } from './healthcare-interop';
import { aiDrivenQa } from './ai-driven-qa';
import { vsscTooling } from './vssc-tooling';
import { safranA350 } from './safran-a350';
import { pwAugmenter } from './pw-augmenter';
import { bmp2Turret } from './bmp2-turret';
import { igcarSlipring } from './igcar-slipring';
import { filamentComposites } from './filament-composites';
import { lcaNavy } from './lca-navy';
import { aeroReverseEngineering } from './aero-reverse-engineering';
import { mapshalliVolunteer } from './mapshalli-volunteer';

/** Ordered to mirror the project-card order (featured grid, then More work). */
export const caseStudies: CaseStudy[] = [
  sanasConsumerApp,
  playground,
  sanasForSales,
  speechIntelligence,
  unifiedMlPlatform,
  aiNextStrategy,
  sanasPortal,
  internalTools,
  mlopsTooling,
  gcpTelemetry,
  healthcareInterop,
  aiDrivenQa,
  vsscTooling,
  safranA350,
  pwAugmenter,
  bmp2Turret,
  igcarSlipring,
  filamentComposites,
  lcaNavy,
  aeroReverseEngineering,
  mapshalliVolunteer,
];
