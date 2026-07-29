import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Stop Hunger's coordination loop: the registry is what stops duplicate delivery. */
export function StopHungerDiagram() {
  return (
    <DiagramShell
      id="stop-hunger-diagram"
      title="Stop Hunger relief-coordination loop"
      desc="Citizens register a settlement that needs help; the shared registry lets any NGO shortlist an unserved settlement, deliver relief, then submit what was delivered — which updates the registry and map so the next NGO sees current status instead of duplicating the same street."
      viewBox="0 0 720 300"
    >
      <DiagramNote x={16} y={30} text="Citizens report need" anchor="start" />
      <DiagramBox
        x={16}
        y={42}
        w={176}
        h={64}
        label="Register a settlement"
        sublabel="who needs help, where"
      />
      <DiagramArrow x1={192} y1={74} x2={266} y2={74} />

      <DiagramBox
        x={268}
        y={42}
        w={184}
        h={64}
        label="Shared registry"
        sublabel="settlements · relief status"
      />
      <DiagramArrow x1={452} y1={74} x2={526} y2={74} />
      <DiagramBox
        x={528}
        y={42}
        w={176}
        h={64}
        label="Relief map"
        sublabel="latest status per site"
      />

      <DiagramNote x={16} y={172} text="NGOs act on it" anchor="start" />
      <DiagramBox
        x={16}
        y={184}
        w={176}
        h={64}
        label="Shortlist unserved"
        sublabel="pick where to go"
      />
      <DiagramArrow x1={192} y1={216} x2={266} y2={216} />
      <DiagramBox
        x={268}
        y={184}
        w={184}
        h={64}
        label="Deliver relief"
        sublabel="food · rations · water"
      />
      <DiagramArrow x1={452} y1={216} x2={526} y2={216} />
      <DiagramBox
        x={528}
        y={184}
        w={176}
        h={64}
        label="Submit what was given"
        sublabel="closes the loop"
      />

      {/* The feedback edge is the whole point: submissions update the registry. */}
      <DiagramArrow x1={616} y1={184} x2={616} y2={110} />
      <DiagramNote x={624} y={150} text="no duplicate streets" anchor="start" />
    </DiagramShell>
  );
}
