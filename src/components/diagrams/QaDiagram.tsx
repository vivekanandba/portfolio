import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** SRS + Jira inputs → LLM generation → test suites → app under test, with an analyzer feedback loop. */
export function QaDiagram() {
  return (
    <DiagramShell
      id="qa-diagram"
      title="AI-driven test automation architecture"
      desc="System requirement specifications feed LLM-based test generation producing PyTest and Pywinauto suites that exercise the medical-device GUI; in parallel, a Jira analyzer classifies tickets and infers error paths, feeding hotspots back into test generation."
      viewBox="0 0 720 380"
    >
      <DiagramBox x={16} y={56} w={132} h={64} label="SRS documents" sublabel="requirements" />
      <DiagramBox x={16} y={248} w={132} h={64} label="Jira tickets" sublabel="defect backlog" />

      <DiagramArrow x1={148} y1={88} x2={210} y2={88} />
      <DiagramBox
        x={212}
        y={48}
        w={168}
        h={80}
        label="LLM test generation"
        sublabel="OpenAI Assistant · Vision"
      />
      <DiagramArrow x1={380} y1={88} x2={438} y2={88} />
      <DiagramBox x={440} y={48} w={150} h={80} label="Test suites" sublabel="PyTest · Pywinauto" />
      <DiagramArrow x1={590} y1={88} x2={634} y2={88} />
      <DiagramBox x={636} y={56} w={68} h={64} label="GUI" sublabel="device" />
      <DiagramNote x={515} y={36} text="trace matrices — every requirement covered" />

      <DiagramArrow x1={148} y1={280} x2={210} y2={280} />
      <DiagramBox
        x={212}
        y={240}
        w={168}
        h={80}
        label="Jira Analyzer"
        sublabel="classify · cluster · paths"
      />
      <DiagramArrow x1={380} y1={280} x2={438} y2={280} />
      <DiagramBox x={440} y={240} w={150} h={80} label="Hotspots" sublabel="CSV · word clouds" />
      <DiagramArrow x1={515} y1={238} x2={330} y2={130} />
      <DiagramNote x={560} y={348} text="33% of issues auto-analyzed" />
      <DiagramNote x={150} y={180} text="engineer verifies every AI artifact" />
    </DiagramShell>
  );
}
