import Card from "@/components/Card";
import RecentActivity from "@/components/RecentActivity";
import ProfileSummary from "@/components/ProfileSummary";

const stats = [
  { label: "Snippets Solved", value: "12" },
  { label: "Current Streak", value: "4 days" },
  { label: "Accuracy", value: "87%" },
];

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="mb-6">
        <ProfileSummary />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </Card>
        ))}
      </div>
      <RecentActivity />
    </div>
  );
}