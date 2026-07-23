import type { SkillGroup } from './schema';

export const skills: SkillGroup[] = [
  {
    category: 'AI & LLM',
    items: [
      'Generative AI',
      'RAG',
      'Vector Databases',
      'LangChain / LlamaIndex',
      'LLMOps',
      'Speech AI',
      'Predictive Analytics',
      'Prompting',
      'Agentic Workflows (Cursor / Claude / Codex)',
    ],
  },
  {
    category: 'Mobile & Frontend',
    items: ['React', 'React Native (Expo)', 'NativeWind', 'TypeScript', 'Next.js', 'Vue.js'],
  },
  {
    category: 'Backend & Architecture',
    items: [
      'Python (FastAPI)',
      'Nest / Node.js',
      'Microservices',
      'Distributed Systems',
      'WebSocket / WebRTC',
    ],
  },
  {
    category: 'Testing & QA',
    items: ['PyTest', 'Playwright', 'Selenium', 'API Testing', 'Test Automation'],
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
      'Data Science & Analytics',
    ],
  },
  {
    category: 'Core Engineering',
    items: [
      'CAD/CAM (CATIA / UG NX)',
      'Finite Element Analysis (Ansys / Abaqus)',
      'GD&T',
      'Stress Analysis',
      'New Product Development',
      'Additive Manufacturing',
      'IoT & Sensor Analytics',
      'Industrial Automation',
    ],
  },
];
