import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Opto-electronic assemblies for the LCA-Navy program (ARDC / HAL). */
export function LcaNavyDiagram() {
  return (
    <DiagramShell
      id="lca-navy-diagram"
      title="LCA-Navy opto-electronic assembly process"
      desc="For the Aircraft Research & Design Centre at HAL, opto-electronic assemblies for the LCA-Navy are taken from requirements through new-product-development design and analysis to prototype and qualification, using CATIA and Abaqus."
      viewBox="0 0 720 300"
    >
      <DiagramBox x={16} y={92} w={140} h={72} label="ARDC / HAL" sublabel="requirement" />
      <DiagramArrow x1={156} y1={128} x2={176} y2={128} />
      <DiagramBox
        x={178}
        y={92}
        w={150}
        h={72}
        label="NPD design"
        sublabel="opto-electronic assy"
      />
      <DiagramArrow x1={328} y1={128} x2={348} y2={128} />
      <DiagramBox x={350} y={92} w={150} h={72} label="Analysis" sublabel="CATIA · Abaqus" />
      <DiagramArrow x1={500} y1={128} x2={520} y2={128} />
      <DiagramBox x={522} y={92} w={182} h={72} label="LCA-Navy" sublabel="prototype & qualify" />
      <DiagramNote x={360} y={64} text="India's naval light combat aircraft program" />
      <DiagramNote x={360} y={272} text="new-product development for airborne opto-electronics" />
    </DiagramShell>
  );
}
