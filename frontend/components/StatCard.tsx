import { LucideIcon } from "lucide-react";

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
  accent?: "accent" | "highlight";
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  description,
  accent = "accent",
}: StatCardProps) {
  const glowColor = accent === "accent" ? "bg-accent" : "bg-highlight";
  const iconColor = accent === "accent" ? "text-accent" : "text-highlight";

  return (
    <div className="group relative p-[1px] rounded-card bg-gradient-to-br from-white/15 to-transparent hover:from-white/30 transition-all">
      <div className="relative overflow-hidden rounded-card bg-gradient-to-br from-secondary-bg to-secondary-bg/70 p-6 h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
        {/* Glow accent */}
        <div
          className={`absolute -top-6 -right-6 w-24 h-24 ${glowColor} opacity-20 blur-2xl rounded-full pointer-events-none`}
        />

        <div className="relative flex items-center justify-between mb-3">
          <p className="text-text-muted text-sm">{label}</p>
          <Icon
            className={`w-5 h-5 ${iconColor} transition-colors group-hover:brightness-125`}
          />
        </div>

        <p
          className={`relative text-3xl font-bold text-text-primary transition-colors group-hover:${iconColor}`}
        >
          {value}
        </p>
        <p className="relative text-text-muted text-xs mt-1">{description}</p>
      </div>
    </div>
  );
}