import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Delivery lifecycle as a process pipeline — deliberately not a data-flow diagram. */
export function AeroToolingDiagram() {
  return (
    <DiagramShell
      id="aero-tooling-diagram"
      title="Aerospace tooling delivery lifecycle"
      desc="A customer specification from ISRO, Safran, or Pratt & Whitney moves through design trade-offs in CATIA and NX, fabrication with supplier liaison, first-article tool proving, and installation with in-service support — end-to-end lifecycle ownership."
      viewBox="0 0 720 360"
    >
      <DiagramBox
        x={16}
        y={92}
        w={124}
        h={72}
        label="Customer spec"
        sublabel="VSSC · Safran · P&W"
      />
      <DiagramArrow x1={140} y1={128} x2={158} y2={128} />
      <DiagramBox x={160} y={92} w={124} h={72} label="Design" sublabel="CATIA / NX trade-offs" />
      <DiagramArrow x1={284} y1={128} x2={302} y2={128} />
      <DiagramBox
        x={304}
        y={92}
        w={124}
        h={72}
        label="Fabrication"
        sublabel="supplier · QAP liaison"
      />
      <DiagramArrow x1={428} y1={128} x2={446} y2={128} />
      <DiagramBox x={448} y={92} w={124} h={72} label="Tool proving" sublabel="first article" />
      <DiagramArrow x1={572} y1={128} x2={590} y2={128} />
      <DiagramBox x={592} y={92} w={112} h={72} label="Install" sublabel="& service" />

      <DiagramNote
        x={360}
        y={64}
        text="the tool defines the part — interchangeability is the contract"
      />

      <DiagramBox
        x={110}
        y={236}
        w={500}
        h={64}
        label="Delivered artifacts"
        sublabel="nose-cone assembly jig · augmenter test-bed cart · composite shells · A350 brackets & FTI routing"
        dashed
      />
      <DiagramNote x={360} y={336} text="end-to-end lifecycle ownership" />
    </DiagramShell>
  );
}
