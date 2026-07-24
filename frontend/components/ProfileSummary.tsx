import { Flame } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";

export default function ProfileSummary() {
  const xp = 650;
  const xpToNextLevel = 1000;
  const level = 4;
  const streak = 4;

  return (
    <div className="p-[1px] rounded-card bg-gradient-to-br from-white/15 to-transparent">
      <div className="rounded-card bg-gradient-to-br from-secondary-bg to-secondary-bg/70 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-text-primary font-bold text-lg">
              P
            </div>
            <div>
              <p className="font-semibold text-text-primary">Ponna</p>
              <p className="text-sm text-text-muted">
                BS Computer Science · Level {level}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-primary-bg px-3 py-1.5 rounded-badge">
            <Flame className="w-4 h-4 text-highlight" />
            <span className="text-sm font-medium text-text-primary">
              {streak}-day streak
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-text-muted">
              Level {level} Progress
            </span>
            <span className="text-xs text-text-muted">
              {xp} / {xpToNextLevel} XP
            </span>
          </div>
          <ProgressBar value={xp} max={xpToNextLevel} />
        </div>
      </div>
    </div>
  );
}