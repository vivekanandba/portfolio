import type { ComponentType } from 'react';
import { PlaygroundDiagram } from './PlaygroundDiagram';
import { SalesCopilotDiagram } from './SalesCopilotDiagram';
import { ConsumerAppDiagram } from './ConsumerAppDiagram';

/** Registry keyed by caseStudySchema.diagramId — content tests assert the bijection. */
export const diagrams = {
  playground: PlaygroundDiagram,
  'sales-copilot': SalesCopilotDiagram,
  'consumer-app': ConsumerAppDiagram,
} as const satisfies Record<string, ComponentType>;

export type DiagramId = keyof typeof diagrams;
