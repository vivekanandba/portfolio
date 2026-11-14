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
              <span className="tabular text-accent text-sm font-semibold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-muted text-xs font-medium tracking-[0.18em] uppercase">
                {step.name}
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed">{step.body}</p>
            <div className="border-hairline mt-4 border-t pt-3">
              <MetricBadge value={step.proof.value} label={step.proof.label} />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
