import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** P&W 1100G engine test-bed augmenter — a movable cart for a live test cell. */
export function PwAugmenterDiagram() {
  return (
    <DiagramShell
      id="pw-augmenter-diagram"
      title="P&W 1100G test-bed augmenter process"
      desc="Testing the PW1100G geared turbofan at an existing CENCO engine test bed needs an augmenter extension. A movable-cart design is engineered for clean installation and removal, fabricated, and installed on the live facility with liaison across Air India, CENCO, and Pratt & Whitney."
      viewBox="0 0 720 320"
    >
      <DiagramBox x={16} y={92} w={140} h={72} label="PW1100G test" sublabel="A320neo GTF" />
      <DiagramArrow x1={156} y1={128} x2={176} y2={128} />
      <DiagramBox
        x={178}
        y={92}
        w={150}
        h={72}
        label="Augmenter cart"
        sublabel="install / remove design"
      />
      <DiagramArrow x1={328} y1={128} x2={348} y2={128} />
      <DiagramBox x={350} y={92} w={140} h={72} label="Fabrication" sublabel="CATIA V5" />
      <DiagramArrow x1={490} y1={128} x2={510} y2={128} />
      <DiagramBox
        x={512}
        y={92}
        w={192}
        h={72}
        label="Install at existing test bed"
        sublabel="on the live CENCO facility"
      />
      <DiagramNote x={360} y={64} text="coordination is the deliverable as much as the hardware" />
      <DiagramNote x={360} y={296} text="liaison: Air India · CENCO · Pratt & Whitney" />
    </DiagramShell>
  );
}
