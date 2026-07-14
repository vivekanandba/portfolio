import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Hospital systems ↔ protocol layer ↔ GCP VPC microservices ↔ clinician PWA, with compliance tooling. */
export function InteropDiagram() {
  return (
    <DiagramShell
      id="interop-diagram"
      title="Healthcare interoperability architecture"
      desc="Hospital EMR and imaging systems exchange data through HL7 and DICOM/PACS protocol layers with microservices inside a GCP VPC, surfaced to clinicians through a progressive web app; a DICOM decoder and SOUP creator automate compliance checks in CI."
      viewBox="0 0 720 400"
    >
      <DiagramBox x={16} y={120} w={136} h={88} label="Hospital" sublabel="EMR · modalities" />

      <DiagramBox x={196} y={64} w={140} h={60} label="HL7 transformer" sublabel="MLLP messaging" />
      <DiagramBox x={196} y={184} w={140} h={60} label="DICOM / PACS" sublabel="imaging · SR" />
      <DiagramArrow x1={152} y1={144} x2={194} y2={98} />
      <DiagramArrow x1={152} y1={176} x2={194} y2={210} />

      <DiagramBox x={380} y={48} w={220} h={216} label="" dashed />
      <text x={490} y={74} textAnchor="middle" className="fill-ink text-[12px] font-medium">
        GCP VPC
      </text>
      <DiagramBox x={396} y={92} w={188} h={36} label="core API" />
      <DiagramBox x={396} y={136} w={188} h={36} label="reporting · qCH" />
      <DiagramBox x={396} y={180} w={188} h={36} label="transmission" />
      <DiagramNote x={490} y={244} text="serverless VPC connectors" />
      <DiagramArrow x1={336} y1={94} x2={394} y2={106} />
      <DiagramArrow x1={336} y1={214} x2={394} y2={200} />

      <DiagramBox x={620} y={120} w={84} h={88} label="PWA" sublabel="clinicians" />
      <DiagramArrow x1={600} y1={160} x2={618} y2={160} />

      <DiagramBox
        x={196}
        y={304}
        w={388}
        h={56}
        label="DICOM Decoder · SOUP Creator"
        sublabel="automated compliance in CI (Jenkins)"
        dashed
      />
      <DiagramArrow x1={390} y1={302} x2={390} y2={268} />
      <DiagramNote x={110} y={336} text="HIPAA · HL7 · DICOM" />
    </DiagramShell>
  );
}
