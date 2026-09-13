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

      {/* Components sit below the housing's centred label so nothing overlaps. */}
      <DiagramBox
        x={72}
        y={166}
        w={200}
        h={64}
        label="Rotor rings"
        sublabel="electrode-grade Cu · U-groove · gold"
      />
      <DiagramArrow x1={272} y1={188} x2={324} y2={188} />
      <DiagramArrow x1={324} y1={208} x2={272} y2={208} />
      <DiagramBox
        x={324}
        y={166}
        w={168}
        h={64}
        label="Brush wires"
        sublabel="beryllium copper · gold-plated"
      />
      <DiagramArrow x1={492} y1={198} x2={540} y2={198} />
      <DiagramBox x={540} y={166} w={116} h={64} label="PCB" sublabel="channel termination" />

      <DiagramNote
        x={360}
        y={260}
        text="replaced: coin-silver rings + silver-graphite brushes (ToT 2000) — powder, shorts, lubrication"
      />
      <DiagramNote
        x={360}
        y={286}
        text="assembled in a class-10,000 clean room · proven on the division’s rotational test rig"
      />
    </DiagramShell>
  );
}
