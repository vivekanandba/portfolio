import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Two modest civic-tech flows — deliberately no invented architecture. */
export function MapshalliDiagram() {
  return (
    <DiagramShell
      id="mapshalli-diagram"
      title="Stop Hunger and AirCare flows"
      desc="Stop Hunger coordinates NGO relief requests through a shared platform to delivery; AirCare collects readings from community-managed air-quality sensors in Whitefield into a community dashboard."
      viewBox="0 0 720 320"
    >
      <DiagramNote x={82} y={48} text="Stop Hunger" anchor="start" />
      <DiagramBox x={16} y={60} w={168} h={64} label="NGO requests" sublabel="relief needs" />
      <DiagramArrow x1={184} y1={92} x2={258} y2={92} />
      <DiagramBox
        x={260}
        y={60}
        w={200}
        h={64}
        label="Coordination platform"
        sublabel="shared visibility"
      />
      <DiagramArrow x1={460} y1={92} x2={534} y2={92} />
      <DiagramBox
        x={536}
        y={60}
        w={168}
        h={64}
        label="Relief delivered"
        sublabel="COVID-19 response"
      />

      <DiagramNote x={82} y={196} text="AirCare" anchor="start" />
      <DiagramBox x={16} y={208} w={168} h={64} label="Sensors" sublabel="community-managed" />
      <DiagramArrow x1={184} y1={240} x2={258} y2={240} />
      <DiagramBox
        x={260}
        y={208}
        w={200}
        h={64}
        label="AirCare network"
        sublabel="IoT · analytics"
      />
      <DiagramArrow x1={460} y1={240} x2={534} y2={240} />
      <DiagramBox
        x={536}
        y={208}
        w={168}
        h={64}
        label="Community"
        sublabel="Whitefield, Bangalore"
      />
    </DiagramShell>
  );
}
