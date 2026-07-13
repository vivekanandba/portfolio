import { Section } from './Section';
import { MetricBadge } from './MetricBadge';
import { aiPracticeSteps } from '@/content';

/**
 * The AI-direction operating loop — the method behind the headline shipping
 * speed, each step anchored to a real shipped outcome.
 */
export function AiPractice() {
  return (
    <Section id="agents" eyebrow="AI-Native Practice" title="How I direct AI agents">
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {aiPracticeSteps.map((step, i) => (
          <li key={step.name} className="flex flex-col">
            <div className="mb-3 flex items-center gap-3">
              <span className="tabular text-sm font-semibold text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                {step.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted">{step.body}</p>
            <div className="mt-4 border-t border-hairline pt-3">
              <MetricBadge value={step.proof.value} label={step.proof.label} />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
