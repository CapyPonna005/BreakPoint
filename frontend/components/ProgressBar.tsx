type ProgressBarProps = {
  value: number;
  max?: number;
};

export default function ProgressBar({ value, max = 100 }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full h-2 bg-primary-bg rounded-badge overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-accent to-highlight rounded-badge transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}