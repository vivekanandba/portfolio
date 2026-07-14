import { DiagramArrow, DiagramBox, DiagramNote, DiagramShell } from './primitives';

/** Hub-and-spoke: three teams feeding one Kubernetes-native hub, notebooks in, pipelines out. */
export function MlPlatformDiagram() {
  return (
    <DiagramShell
      id="ml-platform-diagram"
      title="Unified ML Platform hub-and-spoke architecture"
      desc="DevOps, MLOps, and Innovation teams connect as spokes to a central Kubernetes-native hub with MLflow and a model registry; research notebooks enter on the left and production pipelines exit on the right, governed by an automated handoff framework."
      viewBox="0 0 720 380"
    >
      <DiagramBox
        x={288}
        y={140}
        w={160}
        h={88}
        label="ML Platform hub"
        sublabel="K8s · MLflow · registry"
      />

      <DiagramBox x={80} y={40} w={128} h={52} label="DevOps" sublabel="infrastructure" />
      <DiagramBox x={296} y={28} w={128} h={52} label="MLOps" sublabel="pipelines" />
      <DiagramBox x={512} y={40} w={128} h={52} label="Innovation" sublabel="model research" />
      <DiagramArrow x1={168} y1={92} x2={310} y2={148} />
      <DiagramArrow x1={360} y1={80} x2={364} y2={138} />
      <DiagramArrow x1={552} y1={92} x2={426} y2={148} />

      <DiagramBox x={40} y={160} w={140} h={56} label="Notebooks" sublabel="research" />
      <DiagramArrow x1={180} y1={188} x2={286} y2={186} />
      <DiagramBox x={540} y={160} w={150} h={56} label="Production" sublabel="pipelines" />
      <DiagramArrow x1={448} y1={186} x2={538} y2={188} />

      <DiagramBox
        x={288}
        y={288}
        w={160}
        h={56}
        label="Governance"
        sublabel="automated handoffs"
        dashed
      />
      <DiagramArrow x1={368} y1={286} x2={368} y2={230} />

      <DiagramNote x={110} y={250} text="10+ scientists interviewed" />
      <DiagramNote x={615} y={250} text="50% faster deployment" />
    </DiagramShell>
  );
}
