type TooltipProps = {
  label: string;
  children: React.ReactNode;
};

export default function Tooltip({ label, children }: TooltipProps) {
  return (
    <div className="group relative inline-flex">
      {children}
      <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-input bg-surface border border-border-subtle px-2 py-1 text-xs text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">
        {label}
      </span>
    </div>
  );
}