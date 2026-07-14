import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Maturity roadmap: Crawl → Walk → Run, standing on the toolchain and the investment dashboard. */
export function AiNextDiagram() {
  return (
    <DiagramShell
      id="ai-next-diagram"
      title="AI-Next adoption roadmap"
      desc="A three-phase maturity roadmap — Crawl (individual augmentation), Walk (team workflow automation), Run (enterprise orchestration) — supported by a vendor-agnostic toolchain and an AI investment dashboard, with governance gates throughout."
      viewBox="0 0 720 360"
    >
      <DiagramBox x={32} y={80} w={188} h={76} label="Crawl" sublabel="individual augmentation" />
      <DiagramArrow x1={220} y1={118} x2={264} y2={118} />
      <DiagramBox x={266} y={80} w={188} h={76} label="Walk" sublabel="team workflow automation" />
      <DiagramArrow x1={454} y1={118} x2={498} y2={118} />
      <DiagramBox x={500} y={80} w={188} h={76} label="Run" sublabel="enterprise orchestration" />

      <DiagramNote x={360} y={48} text='"AI users" → "Agent Directors"' />

      <DiagramBox
        x={72}
        y={240}
        w={268}
        h={64}
        label="Vendor-agnostic toolchain"
        sublabel="Cursor · Windsurf · Claude · Gemini"
        dashed
      />
      <DiagramBox
        x={388}
        y={240}
        w={260}
        h={64}
        label="Investment dashboard"
        sublabel="usage · cost · ROI"
        dashed
      />
      <DiagramArrow x1={206} y1={238} x2={206} y2={160} />
      <DiagramArrow x1={518} y1={238} x2={518} y2={160} />

      <DiagramNote x={186} y={334} text="80% of workforce enabled" />
      <DiagramNote x={534} y={334} text="Plan-vs-Code · TDD-first · SME verification" />
    </DiagramShell>
  );
}
