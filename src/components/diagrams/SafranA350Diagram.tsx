import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Safran A350 XWB — structure brackets and flight-test installation, C-maturity to DFM. */
export function SafranA350Diagram() {
  return (
    <DiagramShell
      id="safran-a350-diagram"
      title="A350 XWB structures and FTI process"
      desc="On the Airbus A350 XWB, conceptual C-maturity designs are optimized into sheet-metal, machined, and composite brackets for primary and secondary structure (S11–S18), then carried to design-for-manufacturing and flight-test-installation harness routing for wing, pylon, and landing gear — all to Airbus standards."
      viewBox="0 0 720 320"
    >
      <DiagramBox x={16} y={92} w={132} h={72} label="C-maturity" sublabel="conceptual design" />
      <DiagramArrow x1={148} y1={128} x2={166} y2={128} />
      <DiagramBox
        x={168}
        y={92}
        w={148}
        h={72}
        label="Bracket design"
        sublabel="sheet · machined · composite"
      />
      <DiagramArrow x1={316} y1={128} x2={334} y2={128} />
      <DiagramBox x={336} y={92} w={132} h={72} label="DFM" sublabel="to Airbus standards" />
      <DiagramArrow x1={468} y1={128} x2={486} y2={128} />
      <DiagramBox
        x={488}
        y={92}
        w={216}
        h={72}
        label="FTI harness routing"
        sublabel="wing · pylon · landing gear"
      />
      <DiagramNote x={360} y={64} text="primary & secondary structure — S11–S18" />
      <DiagramNote x={360} y={296} text="the rules-bound discipline every later jig inherited" />
    </DiagramShell>
  );
}
