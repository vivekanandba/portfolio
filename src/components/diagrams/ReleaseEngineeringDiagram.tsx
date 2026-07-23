import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Release engineering across the NovaGuide View releases. */
export function ReleaseEngineeringDiagram() {
  return (
    <DiagramShell
      id="release-engineering-diagram"
      title="Release engineering and test infrastructure"
      desc="The release backbone across NovaGuide View: a Jenkins CI/CD pipeline fed by synthetic TCD data and FFMPEG-processed test streams, on a reusable Flask backend framework and standardised Linux templates, validated with cloud simulators — hardening releases and supporting rapid scaling."
      viewBox="0 0 720 320"
    >
      <DiagramBox
        x={16}
        y={92}
        w={150}
        h={72}
        label="Code · framework"
        sublabel="reusable Flask base"
      />
      <DiagramArrow x1={166} y1={128} x2={186} y2={128} />
      <DiagramBox
        x={188}
        y={92}
        w={160}
        h={72}
        label="Jenkins CI/CD"
        sublabel="synthetic TCD · FFMPEG"
      />
      <DiagramArrow x1={348} y1={128} x2={368} y2={128} />
      <DiagramBox x={370} y={92} w={150} h={72} label="Validate" sublabel="cloud simulators" />
      <DiagramArrow x1={520} y1={128} x2={540} y2={128} />
      <DiagramBox
        x={542}
        y={92}
        w={162}
        h={72}
        label="Release at scale"
        sublabel="200% user growth"
      />
      <DiagramNote x={360} y={64} text="realistic test streams without real patient data" />
      <DiagramNote x={360} y={296} text="60% of manual tests automated · 50% faster deployments" />
    </DiagramShell>
  );
}
