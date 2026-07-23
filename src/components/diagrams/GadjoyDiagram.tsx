import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Gadjoy — the repair operation, and the self-built software that ran it. */
export function GadjoyDiagram() {
  return (
    <DiagramShell
      id="gadjoy-diagram"
      title="Gadjoy repair operation and ops software"
      desc="A device comes in for free diagnosis, gets chip-level / board-level repair with genuine-grade parts, passes a QA and 90-day-warranty check, and is returned — most within 24 hours. Underneath, self-built ops software (ledger, checklists, device tracking) coordinates the whole flow, lifting operational efficiency by 80%."
      viewBox="0 0 720 320"
    >
      <DiagramBox x={16} y={80} w={124} h={68} label="Intake" sublabel="free diagnosis" />
      <DiagramArrow x1={140} y1={114} x2={158} y2={114} />
      <DiagramBox
        x={160}
        y={80}
        w={140}
        h={68}
        label="Chip-level repair"
        sublabel="genuine parts"
      />
      <DiagramArrow x1={300} y1={114} x2={318} y2={114} />
      <DiagramBox x={320} y={80} w={130} h={68} label="QA" sublabel="90-day warranty" />
      <DiagramArrow x1={450} y1={114} x2={468} y2={114} />
      <DiagramBox x={470} y={80} w={140} h={68} label="Return" sublabel="~24-hour turnaround" />

      <DiagramNote x={360} y={52} text="15,000+ repairs · 4.7★ across 516 Google reviews" />

      <DiagramBox
        x={110}
        y={212}
        w={500}
        h={60}
        label="Self-built ops software"
        sublabel="ledger · checklists · device tracking — 80% operational-efficiency lift"
        dashed
      />
      <DiagramNote
        x={360}
        y={300}
        text="scaled with a team of under five — still running today under family"
      />
    </DiagramShell>
  );
}
