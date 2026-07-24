import { Code2, Flame, Target } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import ProfileSummary from "@/components/ProfileSummary";
import StatCard from "@/components/StatCard";
import RecentActivity from "@/components/RecentActivity";

const stats = [
  {
    icon: Code2,
    label: "Snippets Solved",
    value: "12",
    description: "Across all challenge types",
    accent: "accent" as const,
  },
  {
    icon: Flame,
    label: "Current Streak",
    value: "4 days",
    description: "Keep it going!",
    accent: "highlight" as const,
  },
  {
    icon: Target,
    label: "Accuracy",
    value: "87%",
    description: "Based on last 20 submissions",
    accent: "accent" as const,
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6">
      <DashboardHeader />

      <div className="mb-6">
        <ProfileSummary />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            description={stat.description}
            accent={stat.accent}
          />
        ))}
      </div>

      <RecentActivity />
    </div>
  );
}