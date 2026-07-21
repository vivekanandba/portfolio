import type { ComponentType } from 'react';
import { PlaygroundDiagram } from './PlaygroundDiagram';
import { SalesCopilotDiagram } from './SalesCopilotDiagram';
import { ConsumerAppDiagram } from './ConsumerAppDiagram';
import { SpeechIntelligenceDiagram } from './SpeechIntelligenceDiagram';
import { MlPlatformDiagram } from './MlPlatformDiagram';
import { AiNextDiagram } from './AiNextDiagram';
import { PortalDiagram } from './PortalDiagram';
import { TelemetryDiagram } from './TelemetryDiagram';
import { InteropDiagram } from './InteropDiagram';
import { QaDiagram } from './QaDiagram';
import { InternalToolsDiagram } from './InternalToolsDiagram';
import { MlopsToolingDiagram } from './MlopsToolingDiagram';
import { MapshalliDiagram } from './MapshalliDiagram';
import { VsscToolingDiagram } from './VsscToolingDiagram';
import { PwAugmenterDiagram } from './PwAugmenterDiagram';
import { SafranA350Diagram } from './SafranA350Diagram';
import { FilamentCompositesDiagram } from './FilamentCompositesDiagram';
import { Bmp2TurretDiagram } from './Bmp2TurretDiagram';
import { IgcarSlipringDiagram } from './IgcarSlipringDiagram';
import { LcaNavyDiagram } from './LcaNavyDiagram';
import { AeroReverseEngineeringDiagram } from './AeroReverseEngineeringDiagram';
import { RailToolingDiagram } from './RailToolingDiagram';

/** Registry keyed by caseStudySchema.diagramId — content tests assert the bijection. */
export const diagrams = {
  playground: PlaygroundDiagram,
  'sales-copilot': SalesCopilotDiagram,
  'consumer-app': ConsumerAppDiagram,
  'speech-intelligence': SpeechIntelligenceDiagram,
  'ml-platform': MlPlatformDiagram,
  'ai-next': AiNextDiagram,
  portal: PortalDiagram,
  telemetry: TelemetryDiagram,
  interop: InteropDiagram,
  qa: QaDiagram,
  'internal-tools': InternalToolsDiagram,
  'mlops-tooling': MlopsToolingDiagram,
  mapshalli: MapshalliDiagram,
  'vssc-tooling': VsscToolingDiagram,
  'pw-augmenter': PwAugmenterDiagram,
  'safran-a350': SafranA350Diagram,
  'filament-composites': FilamentCompositesDiagram,
  'bmp2-turret': Bmp2TurretDiagram,
  'igcar-slipring': IgcarSlipringDiagram,
  'lca-navy': LcaNavyDiagram,
  'aero-reverse-engineering': AeroReverseEngineeringDiagram,
  'rail-tooling': RailToolingDiagram,
} as const satisfies Record<string, ComponentType>;

export type DiagramId = keyof typeof diagrams;
