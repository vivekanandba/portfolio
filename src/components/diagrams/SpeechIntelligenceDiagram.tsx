import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Edge capture → queue → reconciler → S3, fanning out to OLAP rollups and LLM worker tracks. */
export function SpeechIntelligenceDiagram() {
  return (
    <DiagramShell
      id="speech-intelligence-diagram"
      title="Speech Intelligence platform architecture"
      desc="Audio is processed on the agent's desktop at the edge; redacted events flow through a message queue to a reconciler and S3, then fan out to a ClickHouse OLAP pipeline feeding the fraud dashboard and to LLM worker tracks producing post-call artifacts."
      viewBox="0 0 720 400"
    >
      <DiagramBox
        x={16}
        y={152}
        w={132}
        h={80}
        label="Agent desktop"
        sublabel="edge ASR · PII redaction"
      />
      <DiagramNote x={182} y={140} text="raw audio stays on edge" />
      <DiagramArrow x1={148} y1={192} x2={214} y2={192} />

      <DiagramBox x={216} y={160} w={104} h={64} label="Queue" sublabel="chunk ingest" />
      <DiagramArrow x1={320} y1={192} x2={368} y2={192} />

      <DiagramBox x={370} y={152} w={128} h={80} label="Reconciler" sublabel="channel merge → S3" />

      <DiagramArrow x1={498} y1={172} x2={556} y2={92} />
      <DiagramArrow x1={498} y1={212} x2={556} y2={292} />

      <DiagramBox
        x={558}
        y={56}
        w={146}
        h={64}
        label="ClickHouse OLAP"
        sublabel="incremental rollups"
      />
      <DiagramArrow x1={631} y1={120} x2={631} y2={150} />
      <DiagramBox x={558} y={152} w={146} h={56} label="Fraud dashboard" />
      <DiagramNote x={631} y={228} text="30s refresh" />

      <DiagramBox
        x={558}
        y={264}
        w={146}
        h={64}
        label="LLM workers"
        sublabel="summaries · metrics"
        dashed
      />
      <DiagramArrow x1={631} y1={328} x2={631} y2={352} />
      <DiagramNote x={631} y={368} text="artifacts in 4s → widget · VDI portal" />
    </DiagramShell>
  );
}
