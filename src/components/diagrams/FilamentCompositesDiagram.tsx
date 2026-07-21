import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Filament-wound carbon-epoxy shells — a manufacturing-transfer process. */
export function FilamentCompositesDiagram() {
  return (
    <DiagramShell
      id="filament-composites-diagram"
      title="Filament-wound composite fabrication process"
      desc="As manufacturing representative for the transfer of high-glass-temperature carbon-epoxy composites: material selection, filament winding, oven curing, machining, and testing of the finished shells and laminates."
      viewBox="0 0 720 300"
    >
      <DiagramBox x={12} y={92} w={124} h={72} label="Material" sublabel="carbon-epoxy" />
      <DiagramArrow x1={136} y1={128} x2={152} y2={128} />
      <DiagramBox x={154} y={92} w={124} h={72} label="Filament winding" sublabel="shells" />
      <DiagramArrow x1={278} y1={128} x2={294} y2={128} />
      <DiagramBox x={296} y={92} w={120} h={72} label="Oven curing" sublabel="high glass temp" />
      <DiagramArrow x1={416} y1={128} x2={432} y2={128} />
      <DiagramBox x={434} y={92} w={120} h={72} label="Machining" sublabel="to spec" />
      <DiagramArrow x1={554} y1={128} x2={570} y2={128} />
      <DiagramBox x={572} y={92} w={132} h={72} label="Testing" sublabel="laminate qualification" />
      <DiagramNote x={360} y={64} text="manufacturing transfer — PESIT · Siemens" />
      <DiagramNote
        x={360}
        y={272}
        text="high-glass-temperature composite fabrication owned end to end"
      />
    </DiagramShell>
  );
}
