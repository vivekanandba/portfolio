type MetricBadgeProps = {
  value: string;
  label: string;
};

/** A single quantified achievement — the big number does the persuading. */
export function MetricBadge({ value, label }: MetricBadgeProps) {
  return (
    <div className="flex flex-col">
      <span className="tabular font-display text-2xl font-semibold text-accent">{value}</span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
