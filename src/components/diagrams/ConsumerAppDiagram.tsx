import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Plan → parallel coding agents → human review gate → React Native app → both platforms. */
export function ConsumerAppDiagram() {
  return (
    <DiagramShell
      id="consumer-app-diagram"
      title="Consumer app multi-agent delivery workflow"
      desc="A plan is executed by parallel coding agents (Cursor and Claude), every change passes a human review gate, and the resulting React Native codebase ships to iOS and Android with full parity."
      viewBox="0 0 720 360"
    >
      <DiagramBox x={16} y={150} w={100} h={60} label="Plan" sublabel="director" />
      <DiagramArrow x1={116} y1={180} x2={168} y2={180} />

      <DiagramBox x={170} y={92} w={160} h={176} label="" dashed />
      <text x={250} y={112} textAnchor="middle" className="fill-ink text-[12px] font-medium">
        Parallel agents
      </text>
      <DiagramBox x={186} y={126} w={128} h={32} label="Cursor" />
      <DiagramBox x={186} y={168} w={128} h={32} label="Claude" />
      <DiagramBox x={186} y={210} w={128} h={32} label="Test agents" />

      <DiagramArrow x1={330} y1={180} x2={382} y2={180} />

      <DiagramBox x={384} y={150} w={130} h={60} label="Human review" sublabel="expert gate" />
      <DiagramArrow x1={514} y1={180} x2={566} y2={180} />

      <DiagramBox x={560} y={150} w={144} h={60} label="React Native app" sublabel="9 languages" />
      <DiagramArrow x1={608} y1={210} x2={584} y2={266} />
      <DiagramArrow x1={656} y1={210} x2={680} y2={266} />
      <DiagramBox x={536} y={268} w={84} h={44} label="iOS" />
      <DiagramBox x={632} y={268} w={84} h={44} label="Android" />
      <DiagramNote x={626} y={330} text="100% parity" />

      <DiagramNote x={250} y={330} text="<4 weeks concept → shipped · ~1.5 min onboarding" />
    </DiagramShell>
  );
}
