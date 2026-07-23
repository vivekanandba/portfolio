import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Data View — hospital data to business insight. */
export function DataViewDiagram() {
  return (
    <DiagramShell
      id="data-view-diagram"
      title="Data View analytics pipeline"
      desc="Hospital exam data is pulled via SQL, processed in Python/Pandas, and visualised in a Streamlit/Plotly dashboard that gives sales, medical education, and leadership real-time insight into NovaGuide utilisation and clinical outcomes."
      viewBox="0 0 720 300"
    >
      <DiagramBox x={16} y={92} w={140} h={72} label="Hospital data" sublabel="SQL · Power BI" />
      <DiagramArrow x1={156} y1={128} x2={176} y2={128} />
      <DiagramBox
        x={178}
        y={92}
        w={150}
        h={72}
        label="Processing"
        sublabel="Python · Pandas · Flask"
      />
      <DiagramArrow x1={328} y1={128} x2={348} y2={128} />
      <DiagramBox x={350} y={92} w={150} h={72} label="Data View" sublabel="Streamlit · Plotly" />
      <DiagramArrow x1={500} y1={128} x2={520} y2={128} />
      <DiagramBox
        x={522}
        y={92}
        w={182}
        h={72}
        label="Sales · Med-ed · Leadership"
        sublabel="decisions"
      />
      <DiagramNote x={360} y={64} text="exam utilisation · RLS detection · hospital performance" />
      <DiagramNote
        x={360}
        y={272}
        text="cross-hospital comparison, iterated with AI-assisted development"
      />
    </DiagramShell>
  );
}
