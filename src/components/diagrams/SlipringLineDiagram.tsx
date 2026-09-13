import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/**
 * A stacked slip ring, schematically: what carries the current across the
 * rotating joint and what the division's upgrade changed (Legend deck s39–43).
 */
export function SlipringLineDiagram() {
  return (
    <DiagramShell
      id="slipring-line-diagram"
      title="Stacked slip ring — the upgraded architecture"
      desc="Inside an ingress-protected, epoxy-potted stator housing, gold-plated beryllium-copper brush wires run in U-grooves on gold-plated electrode-grade copper rotor rings; each channel terminates on a purpose-designed PCB. This replaced the coin-silver rings and silver-graphite brush blocks of the year-2000 technology transfer, whose powder formation shorted channels and whose brushes needed lubrication. Every unit was assembled in a class-10,000 clean room and run on the division's rotational test rig."
      viewBox="0 0 720 300"
    >
      <DiagramNote
        x={360}
        y={24}
        text="twelve configurations, 6 to 108 channels · tolerances held to 5 µm"
      />

      <DiagramBox
        x={40}
        y={44}
        w={640}
        h={196}
        label="Stator housing"
        sublabel="IP-sealed with O-rings · epoxy-potted in fixtures"
        dashed
      />

      <DiagramBox
        x={72}
        y={124}
        w={200}
        h={72}
        label="Rotor rings"
        sublabel="electrode-grade Cu · U-groove · gold"
      />
      <DiagramArrow x1={272} y1={148} x2={324} y2={148} />
      <DiagramArrow x1={324} y1={172} x2={272} y2={172} />
      <DiagramBox
        x={324}
        y={124}
        w={168}
        h={72}
        label="Brush wires"
        sublabel="beryllium copper · gold-plated"
      />
      <DiagramArrow x1={492} y1={160} x2={540} y2={160} />
      <DiagramBox x={540} y={124} w={116} h={72} label="PCB" sublabel="channel termination" />

      <DiagramNote
        x={360}
        y={224}
        text="replaced: coin-silver rings + silver-graphite brushes (ToT 2000) — powder, shorts, lubrication"
      />
      <DiagramNote
        x={360}
        y={276}
        text="assembled in a class-10,000 clean room · proven on the division’s rotational test rig"
      />
    </DiagramShell>
  );
}
