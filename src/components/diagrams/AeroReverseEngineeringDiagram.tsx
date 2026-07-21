import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Reverse engineering of legacy aerospace tooling and structures. */
export function AeroReverseEngineeringDiagram() {
  return (
    <DiagramShell
      id="aero-reverse-engineering-diagram"
      title="Aerospace reverse-engineering process"
      desc="Legacy aerospace tooling and structures with lost documentation are measured and reconstructed as CATIA/NX models, re-fabricated, and validated by test — restoring buildable hardware for VSSC/ISRO, Air India, ARDC, and ADA."
      viewBox="0 0 720 300"
    >
      <DiagramBox x={16} y={92} w={140} h={72} label="Legacy hardware" sublabel="no drawings" />
      <DiagramArrow x1={156} y1={128} x2={176} y2={128} />
      <DiagramBox
        x={178}
        y={92}
        w={150}
        h={72}
        label="Reverse engineer"
        sublabel="measure · CAD rebuild"
      />
      <DiagramArrow x1={328} y1={128} x2={348} y2={128} />
      <DiagramBox
        x={350}
        y={92}
        w={140}
        h={72}
        label="Re-fabricate"
        sublabel="CATIA · NX · Abaqus"
      />
      <DiagramArrow x1={490} y1={128} x2={510} y2={128} />
      <DiagramBox
        x={512}
        y={92}
        w={192}
        h={72}
        label="Validate & restore"
        sublabel="test to conformance"
      />
      <DiagramNote x={360} y={64} text="reconstructing intent from hardware" />
      <DiagramNote x={360} y={272} text="customers: VSSC/ISRO · Air India · ARDC · ADA" />
    </DiagramShell>
  );
}
