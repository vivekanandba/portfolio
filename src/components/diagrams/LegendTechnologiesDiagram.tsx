import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/**
 * The bid-to-handover loop one engineer carried at Legend (ADR-0015): seven
 * stages with the two gates where it fails — design QA and inspection — drawn
 * dashed, and the return arrow because a handover is where the next bid begins.
 */
export function LegendTechnologiesDiagram() {
  return (
    <DiagramShell
      id="legend-technologies-diagram"
      title="Bid-to-handover loop for a one-off mechanical product"
      desc="Seven stages carried by one owner at a medium-scale aerospace tooling house: bid (pre-sales, price and technical negotiation), design with the team through a design-QA gate, prototype, batch production on the shop floor, process documentation for production and quality, inspection and first-article proving, and handover at the customer — which is where the next enquiry starts. The design-QA and inspection gates are where the loop fails."
      viewBox="0 0 720 300"
    >
      <DiagramNote
        x={360}
        y={24}
        text="one owner in both seats — individual contributor and design-team lead"
      />

      <DiagramBox x={12} y={44} w={84} h={64} label="1 Bid" sublabel="price · technical" />
      <DiagramArrow x1={96} y1={76} x2={112} y2={76} />
      <DiagramBox x={112} y={44} w={96} h={64} label="2 Design" sublabel="GD&T · DFM/DFT" />
      <DiagramArrow x1={208} y1={76} x2={224} y2={76} />
      <DiagramBox x={224} y={52} w={72} h={48} label="design QA" dashed />
      <DiagramArrow x1={296} y1={76} x2={312} y2={76} />
      <DiagramBox x={312} y={44} w={96} h={64} label="3 Prototype" sublabel="proof of concept" />
      <DiagramArrow x1={408} y1={76} x2={424} y2={76} />
      <DiagramBox
        x={424}
        y={44}
        w={120}
        h={64}
        label="4 Batch production"
        sublabel="on the floor"
      />
      <DiagramArrow x1={544} y1={76} x2={560} y2={76} />
      <DiagramBox x={560} y={44} w={112} h={64} label="5 Process sheets" sublabel="per drawing" />

      <DiagramArrow x1={616} y1={108} x2={616} y2={192} />
      <DiagramBox x={560} y={192} w={112} h={48} label="inspection" dashed />
      <DiagramArrow x1={560} y1={216} x2={544} y2={216} />
      <DiagramBox x={400} y={184} w={144} h={64} label="6 First article" sublabel="proved" />
      <DiagramArrow x1={400} y1={216} x2={384} y2={216} />
      <DiagramBox
        x={248}
        y={184}
        w={136}
        h={64}
        label="7 Handover"
        sublabel="installed at the customer"
      />

      <DiagramArrow x1={248} y1={216} x2={62} y2={216} />
      <DiagramArrow x1={54} y1={212} x2={54} y2={110} />
      <DiagramNote x={150} y={238} text="the next enquiry" />
      <DiagramNote x={360} y={276} text="gates drawn dashed — where a one-off product fails" />
    </DiagramShell>
  );
}
