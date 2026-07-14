import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** 25+ legacy apps → AI-assisted analysis → unified portal → engineers, on a standard framework. */
export function InternalToolsDiagram() {
  return (
    <DiagramShell
      id="internal-tools-diagram"
      title="Internal Tools Portal modernization flow"
      desc="More than twenty-five legacy applications across four stacks are analyzed with AI assistance and unified behind a single searchable Internal Tools Portal used by engineers, with a standardized framework governing all future tools."
      viewBox="0 0 720 360"
    >
      <DiagramBox
        x={16}
        y={72}
        w={172}
        h={128}
        label="25+ legacy apps"
        sublabel="React · Vue · Python · Node"
        dashed
      />
      <DiagramArrow x1={188} y1={136} x2={248} y2={136} />

      <DiagramBox
        x={250}
        y={96}
        w={172}
        h={80}
        label="AI-assisted analysis"
        sublabel="Copilot codebase diagnosis"
      />
      <DiagramNote x={336} y={76} text="weeks, not months" />
      <DiagramArrow x1={422} y1={136} x2={482} y2={136} />

      <DiagramBox
        x={484}
        y={96}
        w={172}
        h={80}
        label="Internal Tools Portal"
        sublabel="searchable one-stop shop"
      />
      <DiagramArrow x1={570} y1={176} x2={570} y2={216} />
      <DiagramBox x={508} y={218} w={124} h={52} label="Engineers" />
      <DiagramNote x={570} y={296} text="hours → seconds discovery" />

      <DiagramBox
        x={128}
        y={252}
        w={294}
        h={56}
        label="Standardized framework"
        sublabel="every future tool starts here"
        dashed
      />
      <DiagramArrow x1={424} y1={280} x2={506} y2={252} />
    </DiagramShell>
  );
}
