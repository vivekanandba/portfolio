import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Release lane: CI/CD → release API → Postgres → dashboard → regions; UTC lane beneath. */
export function PortalDiagram() {
  return (
    <DiagramShell
      id="portal-diagram"
      title="Admin Portal release and timezone architecture"
      desc="Desktop builds flow from CI/CD through a release API that stamps metadata and SHA-256 hashes into Postgres, surfaced in an admin dashboard serving three regions; a timezone interceptor lane stores all timestamps in UTC and renders them per workspace."
      viewBox="0 0 720 380"
    >
      <DiagramBox x={16} y={72} w={120} h={64} label="CI/CD build" sublabel="desktop releases" />
      <DiagramArrow x1={136} y1={104} x2={182} y2={104} />
      <DiagramBox
        x={184}
        y={64}
        w={150}
        h={80}
        label="Release API"
        sublabel="metadata · SHA-256 · URLs"
      />
      <DiagramArrow x1={334} y1={104} x2={380} y2={104} />
      <DiagramBox x={382} y={72} w={120} h={64} label="PostgreSQL" />
      <DiagramArrow x1={502} y1={104} x2={548} y2={104} />
      <DiagramBox
        x={550}
        y={64}
        w={150}
        h={80}
        label="Admin dashboard"
        sublabel="GA / Beta · release notes"
      />
      <DiagramNote x={259} y={44} text="checksum-verified" />

      <DiagramArrow x1={625} y1={144} x2={625} y2={186} />
      <DiagramBox
        x={536}
        y={188}
        w={178}
        h={56}
        label="India · Philippines · US"
        sublabel="regional rollouts"
        dashed
      />

      <DiagramBox
        x={16}
        y={280}
        w={190}
        h={64}
        label="TimezoneInterceptor"
        sublabel="store UTC · render local"
        dashed
      />
      <DiagramArrow x1={206} y1={312} x2={548} y2={312} />
      <DiagramArrow x1={548} y1={312} x2={588} y2={246} />
      <DiagramNote x={380} y={296} text="one clock: UTC everywhere" />
      <DiagramNote x={380} y={360} text="60% fewer time-mismatch tickets" />
    </DiagramShell>
  );
}
