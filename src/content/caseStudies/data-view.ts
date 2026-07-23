import type { CaseStudy } from '../schema';

export const dataView: CaseStudy = {
  slug: 'data-view',
  projectId: 'data-view',
  eyebrow: 'Case Study · NovaSignal / NeuraSignal',
  title: 'Data View — hospital-fleet analytics for the business',
  intro:
    'A Data View application giving sales, medical education, and leadership their first real-time window into how NovaGuide robotic systems were used across hospitals — exam utilisation, RLS detection, and hospital performance — built and iterated fast with AI-assisted development.',
  metrics: [
    { value: 'Real-time', label: 'hospital-utilisation BI' },
    { value: 'Cross-hospital', label: 'comparison for stakeholders' },
    { value: 'SQL → Streamlit', label: 'days-fast iteration' },
  ],
  problem: [
    'The deployed fleet generated rich usage and clinical data, but the people who needed it — sales, med-ed, and leadership — had no way to see it. Decisions were made without a real-time picture of how systems were actually used.',
    'And the audience was non-technical: whatever shipped had to be read directly by business stakeholders, not interpreted from raw queries.',
  ],
  constraints: [
    'Non-engineers consume the output directly — clarity over sophistication.',
    'Data spans many hospitals, extracted via SQL and reconciled for comparison.',
    'Fast iteration on internal-customer feedback, not a big-bang release.',
    'Runs as supporting infrastructure — low operational overhead.',
  ],
  decisions: [
    {
      decision:
        'Extract with SQL and do first-pass analysis in Power BI, then build the app in Streamlit + Flask on Python/Pandas processing.',
      tradeoff:
        'Streamlit trades pixel-perfect UI control for iteration speed — which is what let internal feedback turn into shipped updates in days.',
    },
    {
      decision:
        'Lean on AI-assisted development (GitHub Copilot) to accelerate the full-stack build and keep pace with feedback.',
      tradeoff:
        'Generated code needs review, but it kept a one-person analytics app moving at the speed the business asked questions.',
    },
    {
      decision:
        'Automate the data pipeline and surface exam utilisation, RLS detection, and hospital performance as the headline views.',
      tradeoff:
        'Choosing a few decision-grade metrics over exhaustive dashboards — the point was decisions, not charts.',
    },
  ],
  results: [
    { value: 'Real-time', label: 'insight for sales / med-ed / leadership' },
    { value: 'Cross-hospital', label: 'utilisation trends compared' },
    { value: 'Faster', label: 'data-driven resource decisions' },
  ],
  resultsNote:
    'Sits alongside the cloud-telemetry pipeline — telemetry centralised the data, Data View turned it into decisions.',
  diagramId: 'data-view',
  seoDescription:
    'Case study: the Data View analytics application (SQL, Python/Pandas, Streamlit/Plotly) giving sales, med-ed, and leadership real-time insight into NovaGuide hospital-fleet utilisation and clinical outcomes.',
};
