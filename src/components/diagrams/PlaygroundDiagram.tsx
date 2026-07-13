import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Client → async orchestrator → three concurrent model tracks → Triton → GPU pools. */
export function PlaygroundDiagram() {
  return (
    <DiagramShell
      id="playground-diagram"
      title="Playground audio orchestration architecture"
      desc="Live client audio flows into a FastAPI/Asyncio triple-track orchestrator, which runs Accent Translation, Noise Cancellation, and Language Translation concurrently, served by Triton over gRPC on GPU pools autoscaled across AWS EKS and Modal."
      viewBox="0 0 720 400"
    >
      <DiagramBox x={16} y={160} w={104} h={64} label="Client" sublabel="live audio" />
      <DiagramArrow x1={120} y1={192} x2={168} y2={192} />
      <DiagramNote x={144} y={150} text="430k req/day" />

      <DiagramBox
        x={170}
        y={152}
        w={150}
        h={80}
        label="FastAPI / Asyncio"
        sublabel="triple-track orchestrator"
      />
      <DiagramBox
        x={170}
        y={296}
        w={150}
        h={64}
        label="Eager ingestion"
        sublabel="speculative voice cloning"
        dashed
      />
      <DiagramArrow x1={245} y1={232} x2={245} y2={294} />

      <DiagramArrow x1={320} y1={172} x2={378} y2={72} />
      <DiagramArrow x1={320} y1={192} x2={378} y2={192} />
      <DiagramArrow x1={320} y1={212} x2={378} y2={312} />
      <DiagramNote x={349} y={130} text="<100ms/chunk" />

      <DiagramBox x={380} y={44} w={152} h={56} label="Accent Translation" />
      <DiagramBox x={380} y={164} w={152} h={56} label="Noise Cancellation" />
      <DiagramBox x={380} y={284} w={152} h={56} label="Language Translation" />

      <DiagramArrow x1={532} y1={72} x2={586} y2={172} />
      <DiagramArrow x1={532} y1={192} x2={586} y2={192} />
      <DiagramArrow x1={532} y1={312} x2={586} y2={212} />

      <DiagramBox x={588} y={152} w={116} h={80} label="Triton" sublabel="gRPC inference" />
      <DiagramBox
        x={588}
        y={296}
        w={116}
        h={64}
        label="AWS EKS · Modal"
        sublabel="T4 / H100 autoscale"
        dashed
      />
      <DiagramArrow x1={646} y1={294} x2={646} y2={234} />
    </DiagramShell>
  );
}
