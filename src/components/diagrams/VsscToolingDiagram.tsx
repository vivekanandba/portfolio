import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** VSSC/ISRO launch-vehicle assembly tooling — spec to proven first article. */
export function VsscToolingDiagram() {
  return (
    <DiagramShell
      id="vssc-tooling-diagram"
      title="VSSC launch-vehicle tooling lifecycle"
      desc="A VSSC/ISRO requirement for launch-vehicle assembly hardware moves through design configurations in CATIA and UG NX, fabrication with BEML/TASL/HAL supplier liaison, first-article proving, and delivery of the nose-cone assembly jig, spinner full-weld jig, and master tooling gauges."
      viewBox="0 0 720 340"
    >
      <DiagramBox x={16} y={80} w={128} h={72} label="VSSC / ISRO" sublabel="requirement" />
      <DiagramArrow x1={144} y1={116} x2={162} y2={116} />
      <DiagramBox x={164} y={80} w={132} h={72} label="Design configs" sublabel="CATIA · UG NX" />
      <DiagramArrow x1={296} y1={116} x2={314} y2={116} />
      <DiagramBox x={316} y={80} w={132} h={72} label="Fabrication" sublabel="BEML · TASL · HAL" />
      <DiagramArrow x1={448} y1={116} x2={466} y2={116} />
      <DiagramBox x={468} y={80} w={120} h={72} label="First-article" sublabel="tool proving" />
      <DiagramArrow x1={588} y1={116} x2={606} y2={116} />
      <DiagramBox x={608} y={80} w={96} h={72} label="Flight" sublabel="hardware" />

      <DiagramBox
        x={110}
        y={216}
        w={500}
        h={64}
        label="Delivered tooling"
        sublabel="SONC nose-cone assembly jig · spinner full-weld jig · forming / checking tools · master gauge"
        dashed
      />
      <DiagramNote
        x={360}
        y={312}
        text="interchangeability is the contract — the tool defines the part"
      />
    </DiagramShell>
  );
}
