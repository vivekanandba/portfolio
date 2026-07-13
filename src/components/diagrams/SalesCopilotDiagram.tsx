import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Dual capture surfaces → multi-modal RAG pipeline → live objection prompt. */
export function SalesCopilotDiagram() {
  return (
    <DiagramShell
      id="sales-copilot-diagram"
      title="Sanas for Sales copilot architecture"
      desc="Live call audio and screen context from a Chrome Extension and a Desktop app feed a multi-modal RAG pipeline — retrieve, augment, generate — which returns an objection-handling prompt to the sales rep in under four seconds."
      viewBox="0 0 720 360"
    >
      <DiagramBox x={16} y={64} w={136} h={60} label="Chrome Extension" sublabel="browser calls" />
      <DiagramBox x={16} y={216} w={136} h={60} label="Desktop App" sublabel="meeting apps" />
      <DiagramArrow x1={152} y1={94} x2={206} y2={152} />
      <DiagramArrow x1={152} y1={246} x2={206} y2={188} />

      <DiagramBox x={208} y={140} w={130} h={60} label="Live capture" sublabel="audio + context" />
      <DiagramArrow x1={338} y1={170} x2={392} y2={170} />

      <DiagramBox x={394} y={104} w={190} h={132} label="Multi-modal RAG" dashed />
      <DiagramBox x={410} y={130} w={158} h={28} label="Retrieve" />
      <DiagramBox x={410} y={166} w={158} h={28} label="Augment" />
      <DiagramBox x={410} y={202} w={158} h={28} label="Generate" />

      <DiagramArrow x1={584} y1={170} x2={638} y2={170} />
      <DiagramNote x={611} y={150} text="<4s" />

      <DiagramBox x={640} y={140} w={64} h={60} label="Rep" sublabel="live prompt" />

      <DiagramNote
        x={360}
        y={330}
        text="Concept → Enterprise GA in 3 months · weekly C-suite reviews"
      />
    </DiagramShell>
  );
}
