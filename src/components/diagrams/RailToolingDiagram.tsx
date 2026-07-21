import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Rolling-stock tooling delivery across Alstom metro and locomotive programs. */
export function RailToolingDiagram() {
  return (
    <DiagramShell
      id="rail-tooling-diagram"
      title="Rolling-stock tooling delivery process"
      desc="For Alstom metro and locomotive programs, a rolling-stock assembly requirement moves through fixture and template design, fabrication, and on-site proving — delivering bogie, gangway, and HVAC installation fixtures for the Perth, Mumbai, Singapore, and E-Loco fleets."
      viewBox="0 0 720 340"
    >
      <DiagramBox x={16} y={80} w={140} h={72} label="Rolling stock" sublabel="Alstom program" />
      <DiagramArrow x1={156} y1={116} x2={176} y2={116} />
      <DiagramBox
        x={178}
        y={80}
        w={150}
        h={72}
        label="Fixture design"
        sublabel="jigs · templates"
      />
      <DiagramArrow x1={328} y1={116} x2={348} y2={116} />
      <DiagramBox x={350} y={80} w={140} h={72} label="Fabrication" sublabel="tool development" />
      <DiagramArrow x1={490} y1={116} x2={510} y2={116} />
      <DiagramBox
        x={512}
        y={80}
        w={192}
        h={72}
        label="On-site proving"
        sublabel="install & first article"
      />

      <DiagramBox
        x={110}
        y={216}
        w={500}
        h={64}
        label="Programs served"
        sublabel="Perth Metro · Mumbai ML3 · Singapore Metro · E-Loco — bogie · gangway · HVAC fixtures"
        dashed
      />
      <DiagramNote
        x={360}
        y={312}
        text="jigs and fixtures that decide how the vehicle goes together"
      />
    </DiagramShell>
  );
}
