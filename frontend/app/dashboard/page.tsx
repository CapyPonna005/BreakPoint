import { Code2, Flame, Target } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import DashboardHeader from "@/components/DashboardHeader";
import ProfileSummary from "@/components/ProfileSummary";
import StatCard from "@/components/StatCard";
import RecentActivity from "@/components/RecentActivity";
import WeeklyActivityChart from "@/components/WeeklyActivityChart";

function timeAgo(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

function toDateKey(dateString: string): string {
  return new Date(dateString).toISOString().slice(0, 10);
}

function computeStreak(dateKeys: string[]): number {
  const uniqueDays = Array.from(new Set(dateKeys)).sort().reverse();
  if (uniqueDays.length === 0) return 0;

  const todayKey = new Date().toISOString().slice(0, 10);
  const yesterdayKey = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  if (uniqueDays[0] !== todayKey && uniqueDays[0] !== yesterdayKey) return 0;

  let streak = 1;
  let cursor = new Date(uniqueDays[0]);

  for (let i = 1; i < uniqueDays.length; i++) {
    cursor = new Date(cursor.getTime() - 86400000);
    const expectedKey = cursor.toISOString().slice(0, 10);
    if (uniqueDays[i] === expectedKey) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

function computeWeeklyData(dateKeys: string[]) {
  const days: { key: string; day: string }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    days.push({
      key: d.toISOString().slice(0, 10),
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
    });
  }

  return days.map(({ key, day }) => ({
    day,
    solved: dateKeys.filter((k) => k === key).length,
  }));
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: profile, error: profileError }, { data: submissions, error: submissionsError }] = await Promise.all([
    supabase.from("profiles").select("bio, level, xp, streak").eq("id", user?.id).single(),
    supabase
      .from("submissions")
      .select("id, score, tests_passed, tests_total, submitted_at, problems(title, mode)")
      .eq("user_id", user?.id)
      .order("submitted_at", { ascending: false }),
  ]);

  if (profileError) {
    console.error("Dashboard: failed to load profile:", profileError);
  }
  if (submissionsError) {
    console.error("Dashboard: failed to load submissions:", submissionsError);
  }

  const allSubmissions = submissions ?? [];
  const dateKeys = allSubmissions.map((s) => toDateKey(s.submitted_at));

  const totalSolved = allSubmissions.length;
  const currentStreak = computeStreak(dateKeys);
  const averageAccuracy =
    totalSolved > 0
      ? Math.round(allSubmissions.reduce((sum, s) => sum + s.score, 0) / totalSolved)
      : 0;

  const weeklyData = computeWeeklyData(dateKeys);

  const recentActivity = allSubmissions.slice(0, 20).map((s) => ({
    snippet: (s.problems as unknown as { title: string; mode: string } | null)?.title ?? "Untitled Challenge",
    mode: (s.problems as unknown as { title: string; mode: string } | null)?.mode ?? "Bug-Fix",
    result: s.tests_passed === s.tests_total ? "Passed" : "Failed",
    time: timeAgo(s.submitted_at),
  }));

  const stats = [
    {
      icon: Code2,
      label: "Snippets Solved",
      value: String(totalSolved),
      description: "Across all challenge types",
      accent: "accent" as const,
    },
    {
      icon: Flame,
      label: "Current Streak",
      value: currentStreak === 1 ? "1 day" : `${currentStreak} days`,
      description: currentStreak > 0 ? "Keep it going!" : "Solve one today to start a streak",
      accent: "highlight" as const,
    },
    {
      icon: Target,
      label: "Accuracy",
      value: `${averageAccuracy}%`,
      description: totalSolved > 0 ? `Based on ${totalSolved} submission${totalSolved === 1 ? "" : "s"}` : "No submissions yet",
      accent: "accent" as const,
    },
  ];

  return (
    <div className="p-6">
      <DashboardHeader name={user?.user_metadata?.full_name ?? "there"} />

      <div className="mb-6">
        <ProfileSummary
          bio={profile?.bio ?? "No bio yet."}
          level={profile?.level ?? 1}
          xp={profile?.xp ?? 0}
          streak={currentStreak}
        />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <WeeklyActivityChart data={weeklyData} />
        <RecentActivity activity={recentActivity} />
      </div>
    </div>
  );
}