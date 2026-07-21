import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** High-amperage slip ring for IGCAR spent-fuel electro-refining. */
export function IgcarSlipringDiagram() {
  return (
    <DiagramShell
      id="igcar-slipring-diagram"
      title="IGCAR slip-ring design and qualification process"
      desc="Nuclear-environment constraints — ingress protection, vibration, and thermal — drive iterative design configurations against volumetric and functional limits, a built prototype, and functional and environmental compliance testing, published as a NAMS 2015 white paper."
      viewBox="0 0 720 300"
    >
      <DiagramBox
        x={16}
        y={92}
        w={150}
        h={72}
        label="Constraints"
        sublabel="IP · vibration · thermal"
      />
      <DiagramArrow x1={166} y1={128} x2={186} y2={128} />
      <DiagramBox
        x={188}
        y={92}
        w={150}
        h={72}
        label="Design configs"
        sublabel="volumetric · functional"
      />
      <DiagramArrow x1={338} y1={128} x2={358} y2={128} />
      <DiagramBox x={360} y={92} w={150} h={72} label="Prototype" sublabel="build & test" />
      <DiagramArrow x1={510} y1={128} x2={530} y2={128} />
      <DiagramBox
        x={532}
        y={92}
        w={172}
        h={72}
        label="Compliance"
        sublabel="functional · environmental"
      />
      <DiagramNote
        x={360}
        y={64}
        text="high-amperage · high-temperature electro-refining of spent nuclear fuel"
      />
      <DiagramNote x={360} y={272} text="IGCAR · Godrej — published at NAMS 2015" />
    </DiagramShell>
  );
}
