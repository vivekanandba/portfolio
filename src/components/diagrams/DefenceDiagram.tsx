import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Two process tracks: the FICV turret study and the IGCAR slip ring. */
export function DefenceDiagram() {
  return (
    <DiagramShell
      id="defence-diagram"
      title="FICV turret study and IGCAR slip-ring process"
      desc="Track one: 3,000 legacy drawings are 3D-modeled by an eight-engineer team, kinematically simulated, and delivered to BEL as space studies. Track two: nuclear-environment constraints drive slip-ring design configurations, prototype testing, and a NAMS 2015 white paper."
      viewBox="0 0 720 380"
    >
      <DiagramNote x={82} y={44} text="FICV · BEL" anchor="start" />
      <DiagramBox x={16} y={56} w={140} h={72} label="3,000 drawings" sublabel="BMP-II legacy" />
      <DiagramArrow x1={156} y1={92} x2={196} y2={92} />
      <DiagramBox
        x={198}
        y={56}
        w={150}
        h={72}
        label="3D modelling"
        sublabel="team of 8 · exclusive QA"
      />
      <DiagramArrow x1={348} y1={92} x2={388} y2={92} />
      <DiagramBox
        x={390}
        y={56}
        w={160}
        h={72}
        label="Kinematics"
        sublabel="traverse · elevation · ammo"
      />
      <DiagramArrow x1={550} y1={92} x2={590} y2={92} />
      <DiagramBox x={592} y={56} w={112} h={72} label="BEL" sublabel="space studies" />
      <DiagramNote x={648} y={148} text="4 months" />

      <DiagramNote x={82} y={216} text="Slip ring · IGCAR" anchor="start" />
      <DiagramBox
        x={16}
        y={228}
        w={140}
        h={72}
        label="Constraints"
        sublabel="IP · vibration · thermal"
      />
      <DiagramArrow x1={156} y1={264} x2={196} y2={264} />
      <DiagramBox
        x={198}
        y={228}
        w={150}
        h={72}
        label="Design configs"
        sublabel="volumetric · functional"
      />
      <DiagramArrow x1={348} y1={264} x2={388} y2={264} />
      <DiagramBox
        x={390}
        y={228}
        w={160}
        h={72}
        label="Prototype test"
        sublabel="functional · environmental"
      />
      <DiagramArrow x1={550} y1={264} x2={590} y2={264} />
      <DiagramBox x={592} y={228} w={112} h={72} label="NAMS 2015" sublabel="white paper" />
      <DiagramNote x={360} y={344} text="high-amperage · high-temperature electro-refining" />
    </DiagramShell>
  );
}
