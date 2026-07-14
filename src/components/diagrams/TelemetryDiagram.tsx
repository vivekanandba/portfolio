import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Robot fleet → Cloud Run ingest → Monitoring + BigQuery → Data View → stakeholders. */
export function TelemetryDiagram() {
  return (
    <DiagramShell
      id="telemetry-diagram"
      title="Centralized telemetry and Data View architecture"
      desc="NovaGuide robots across hospitals send telemetry over HTTPS to a Cloud Run ingestion service, which feeds Cloud Monitoring for real-time alerts and BigQuery for long-term analytics; the Data View application visualizes the results for sales, med-ed, and leadership."
      viewBox="0 0 720 380"
    >
      <DiagramBox
        x={16}
        y={140}
        w={148}
        h={80}
        label="NovaGuide robots"
        sublabel="multi-hospital fleet"
      />
      <DiagramNote x={228} y={130} text="HTTPS · HIPAA" />
      <DiagramArrow x1={164} y1={180} x2={228} y2={180} />

      <DiagramBox
        x={230}
        y={140}
        w={150}
        h={80}
        label="Cloud Run ingest"
        sublabel="standardize · parse JSON"
      />

      <DiagramArrow x1={380} y1={160} x2={442} y2={92} />
      <DiagramArrow x1={380} y1={200} x2={442} y2={268} />

      <DiagramBox
        x={444}
        y={56}
        w={166}
        h={64}
        label="Cloud Monitoring"
        sublabel="alerts · anomalies"
      />
      <DiagramBox
        x={444}
        y={236}
        w={166}
        h={64}
        label="BigQuery"
        sublabel="time-series · predictive"
      />

      <DiagramArrow x1={527} y1={300} x2={527} y2={324} />
      <DiagramBox x={420} y={326} w={214} h={48} label="Data View (Streamlit)" dashed />
      <DiagramNote x={180} y={350} text="sales · med-ed · leadership" />
      <DiagramArrow x1={418} y1={350} x2={286} y2={350} />
    </DiagramShell>
  );
}
