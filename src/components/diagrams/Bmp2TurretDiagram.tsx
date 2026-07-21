import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** BMP-II turret 3D + kinematics study for BEL's FICV program. */
export function Bmp2TurretDiagram() {
  return (
    <DiagramShell
      id="bmp2-turret-diagram"
      title="BMP-II turret study process"
      desc="For BEL's Futuristic Infantry Combat Vehicle space studies, 3,000 legacy BMP-II drawings are reconstructed as validated 3D by an eight-engineer team with dedicated QA, kinematically simulated across traverse, elevation, gearing, and ammunition supply, and delivered to BEL in four months."
      viewBox="0 0 720 300"
    >
      <DiagramBox x={16} y={92} w={140} h={72} label="3,000 drawings" sublabel="BMP-II legacy" />
      <DiagramArrow x1={156} y1={128} x2={176} y2={128} />
      <DiagramBox
        x={178}
        y={92}
        w={150}
        h={72}
        label="3D modelling"
        sublabel="team of 8 · exclusive QA"
      />
      <DiagramArrow x1={328} y1={128} x2={348} y2={128} />
      <DiagramBox
        x={350}
        y={92}
        w={168}
        h={72}
        label="Kinematics"
        sublabel="traverse · elevation · ammo"
      />
      <DiagramArrow x1={518} y1={128} x2={538} y2={128} />
      <DiagramBox x={540} y={92} w={164} h={72} label="BEL space studies" sublabel="FICV" />
      <DiagramNote x={360} y={64} text="India's program to replace the Soviet-era BMP-2 fleet" />
      <DiagramNote x={360} y={272} text="decision-grade fidelity, delivered in 4 months" />
    </DiagramShell>
  );
}
