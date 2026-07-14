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
import { AeroToolingDiagram } from './AeroToolingDiagram';
import { DefenceDiagram } from './DefenceDiagram';
import { MapshalliDiagram } from './MapshalliDiagram';

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
  'aero-tooling': AeroToolingDiagram,
  defence: DefenceDiagram,
  mapshalli: MapshalliDiagram,
} as const satisfies Record<string, ComponentType>;

export type DiagramId = keyof typeof diagrams;
