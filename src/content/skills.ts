import type { SkillGroup } from './schema';

export const skills: SkillGroup[] = [
  {
    category: 'AI & LLM',
    items: ['RAG', 'Vector Databases', 'Prompting', 'Agentic Workflows (Cursor / Claude / Codex)'],
  },
  {
    category: 'Mobile & Frontend',
    items: ['React', 'React Native (Expo)', 'NativeWind', 'TypeScript', 'Next.js', 'Vue.js'],
  },
  {
    category: 'Backend & Architecture',
    items: ['Python (FastAPI)', 'Nest / Node.js', 'Microservices', 'WebSocket / WebRTC'],
  },
  {
    category: 'Cloud & ML / DevOps',
    items: [
      'GCP / AWS',
      'Kubernetes',
      'Docker',
      'Terraform',
      'MLflow / Kubeflow / Ray',
      'CI/CD',
      'ClickHouse',
    ],
  },
  {
    category: 'Core Engineering',
    items: ['CAD/CAM (CATIA)', 'Finite Element Analysis (Ansys)', 'Industrial Automation'],
  },
];
