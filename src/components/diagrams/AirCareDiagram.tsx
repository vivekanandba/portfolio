import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** AirCare: the self-built ₹7,500 node is what made a dense network affordable. */
export function AirCareDiagram() {
  return (
    <DiagramShell
      id="aircare-diagram"
      title="AirCare sensor node and data path"
      desc="Each node pairs a Plantower PMS3003 laser-scattering sensor with a Raspberry Pi 3 in a six-module wall enclosure, hosted by a resident or business on their own power and WiFi. Nodes read every five minutes and upload every ten, feeding a public map that refreshes every three minutes plus per-sensor dashboards and analysis reports."
      viewBox="0 0 720 320"
    >
      <DiagramNote x={16} y={30} text="The node — built to a price" anchor="start" />
      <DiagramBox
        x={16}
        y={42}
        w={176}
        h={72}
        label="PMS3003 sensor"
        sublabel="laser scattering · PM1／2.5／10"
      />
      <DiagramArrow x1={192} y1={78} x2={266} y2={78} />
      <DiagramBox
        x={268}
        y={42}
        w={184}
        h={72}
        label="Raspberry Pi 3"
        sublabel="~2.5W · WiFi · mini-UPS"
      />
      <DiagramArrow x1={452} y1={78} x2={526} y2={78} />
      <DiagramBox
        x={528}
        y={42}
        w={176}
        h={72}
        label="6-module enclosure"
        sublabel="₹7,500 in parts"
      />

      <DiagramNote x={16} y={178} text="Hosted, then published" anchor="start" />
      <DiagramBox
        x={16}
        y={190}
        w={176}
        h={72}
        label="Citizen-hosted"
        sublabel="resident power + WiFi"
      />
      <DiagramArrow x1={192} y1={226} x2={266} y2={226} />
      <DiagramBox
        x={268}
        y={190}
        w={184}
        h={72}
        label="Read 5 min · upload 10"
        sublabel="~4MB per month"
      />
      <DiagramArrow x1={452} y1={226} x2={526} y2={226} />
      <DiagramBox
        x={528}
        y={190}
        w={176}
        h={72}
        label="Public map"
        sublabel="3-min refresh · reports"
      />
    </DiagramShell>
  );
}
