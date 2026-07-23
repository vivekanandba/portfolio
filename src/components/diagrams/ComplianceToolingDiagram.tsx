import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Compliance & test tooling — automated verification gated in CI. */
export function ComplianceToolingDiagram() {
  return (
    <DiagramShell
      id="compliance-tooling-diagram"
      title="Compliance and test tooling in CI"
      desc="DICOM artifacts and open-source dependencies flow through automated tools — a DICOM Decoder validating structured reports and images against the TID 5100 standard, and the SOUP Creator extracting dependencies for security review — wired into the Jenkins CI pipeline so every release is verified, not assumed."
      viewBox="0 0 720 320"
    >
      <DiagramBox x={16} y={92} w={150} h={72} label="DICOM · OSS" sublabel="artifacts & deps" />
      <DiagramArrow x1={166} y1={128} x2={186} y2={128} />
      <DiagramBox
        x={188}
        y={64}
        w={170}
        h={56}
        label="DICOM Decoder"
        sublabel="TID 5100 conformance"
      />
      <DiagramBox
        x={188}
        y={136}
        w={170}
        h={56}
        label="SOUP Creator"
        sublabel="OSS dependency audit"
      />
      <DiagramArrow x1={358} y1={128} x2={378} y2={128} />
      <DiagramBox x={380} y={92} w={130} h={72} label="CI gate" sublabel="Jenkins · PyTest" />
      <DiagramArrow x1={510} y1={128} x2={530} y2={128} />
      <DiagramBox
        x={532}
        y={92}
        w={172}
        h={72}
        label="Verified release"
        sublabel="PHI-safe · conformant"
      />
      <DiagramNote x={360} y={40} text="PHI protection verified, not assumed" />
      <DiagramNote
        x={360}
        y={296}
        text="the standard encoded as executable checks — conformance for free thereafter"
      />
    </DiagramShell>
  );
}
