import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Two lanes: observability (sources → connectors → metrics → dashboard) and Model Cards. */
export function MlopsToolingDiagram() {
  return (
    <DiagramShell
      id="mlops-tooling-diagram"
      title="MLOps observability and Model Card architecture"
      desc="Data from internal APIs and DynamoDB flows through connectors and a FastAPI metric engine into a Plotly dashboard; in a second lane, specialists log model evaluations through a Model Card API into a flexible store, joining the dashboard for comparison."
      viewBox="0 0 720 380"
    >
      <DiagramBox
        x={16}
        y={56}
        w={148}
        h={72}
        label="Sources"
        sublabel="internal APIs · DynamoDB"
      />
      <DiagramArrow x1={164} y1={92} x2={216} y2={92} />
      <DiagramBox x={218} y={56} w={150} h={72} label="Connectors" sublabel="FastAPI backend" />
      <DiagramArrow x1={368} y1={92} x2={420} y2={92} />
      <DiagramBox
        x={422}
        y={56}
        w={150}
        h={72}
        label="Metric engine"
        sublabel="quality · volume · latency"
      />
      <DiagramArrow x1={572} y1={92} x2={618} y2={92} />
      <DiagramBox x={620} y={56} w={84} h={72} label="Plotly" sublabel="dashboard" />
      <DiagramNote x={495} y={36} text="first end-to-end pipeline view" />

      <DiagramBox
        x={16}
        y={248}
        w={148}
        h={72}
        label="Specialists"
        sublabel="linguists · DL · speech"
      />
      <DiagramArrow x1={164} y1={284} x2={216} y2={284} />
      <DiagramBox
        x={218}
        y={248}
        w={150}
        h={72}
        label="Model Card API"
        sublabel="log · retrieve · compare"
      />
      <DiagramArrow x1={368} y1={284} x2={420} y2={284} />
      <DiagramBox x={422} y={248} w={150} h={72} label="Card store" sublabel="Postgres / Mongo" />
      <DiagramArrow x1={572} y1={284} x2={648} y2={132} />
      <DiagramNote x={330} y={356} text="one evaluation language across 3 disciplines" />
    </DiagramShell>
  );
}
