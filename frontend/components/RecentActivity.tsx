import { Bug, PenLine, CheckCircle2, XCircle, Inbox } from "lucide-react";

type ActivityItem = {
  snippet: string;
  mode: string;
  result: string;
  time: string;
};

type RecentActivityProps = {
  activity: ActivityItem[];
};

export default function RecentActivity({ activity }: RecentActivityProps) {
  return (
    <div className="p-[1px] rounded-card bg-gradient-to-br from-white/15 to-transparent">
      <div className="rounded-card bg-gradient-to-br from-secondary-bg to-secondary-bg/70 p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Recent Activity
        </h2>
        {activity.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-8">
            <Inbox className="w-8 h-8 text-text-muted mb-2" />
            <p className="text-text-secondary text-sm">No activity yet</p>
            <p className="text-text-muted text-xs mt-1">
              Your recent submissions will show up here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-border-subtle">
            {activity.map((item, index) => {
              const ModeIcon = item.mode === "Bug-Fix" ? Bug : PenLine;
              const passed = item.result === "Passed";

              return (
                <div
                  key={index}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="w-9 h-9 rounded-full bg-primary-bg flex items-center justify-center shrink-0">
                    <ModeIcon className="w-4 h-4 text-text-secondary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text-primary text-sm truncate">
                      {item.snippet}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs px-2 py-0.5 bg-primary-bg text-text-muted rounded-badge">
                        {item.mode}
                      </span>
                      <span className="text-xs text-text-muted">{item.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {passed ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        passed ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {item.result}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}