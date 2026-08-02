"use client";

import { useEffect, useState } from "react";
import { Sparkles, TrendingUp } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import { xpForNextLevel } from "@/lib/xp";
import type { XpAwardResult } from "@/lib/awardXp";

type XpPopupProps = {
  award: XpAwardResult;
  onClose: () => void;
};

// Two-stage animation when leveling up: first fill the OLD level's bar to
// full, hold on a "Level Up!" moment, then reset to 0 and fill the NEW
// level's bar up to the leftover XP. Non-level-up case animates straight
// from beforeXp to afterXp on the same bar. Timings are slower/more
// deliberate than the first pass, per user feedback that v1 felt too fast.
export default function XpPopup({ award, onClose }: XpPopupProps) {
  const { earned, beforeXp, beforeLevel, afterXp, afterLevel, leveledUp } = award;

  const [displayLevel, setDisplayLevel] = useState(beforeLevel);
  const [displayXp, setDisplayXp] = useState(beforeXp);
  const [showLevelUpBadge, setShowLevelUpBadge] = useState(false);

  useEffect(() => {
    if (!leveledUp) {
      const t = setTimeout(() => setDisplayXp(afterXp), 500);
      return () => clearTimeout(t);
    }

    const fillOldBar = setTimeout(() => {
      setDisplayXp(xpForNextLevel(beforeLevel));
    }, 500);

    const revealLevelUp = setTimeout(() => {
      setShowLevelUpBadge(true);
      setDisplayLevel(afterLevel);
      setDisplayXp(0);
    }, 2200);

    const fillNewBar = setTimeout(() => {
      setDisplayXp(afterXp);
    }, 2800);

    return () => {
      clearTimeout(fillOldBar);
      clearTimeout(revealLevelUp);
      clearTimeout(fillNewBar);
    };
  }, [leveledUp, beforeLevel, afterLevel, afterXp]);

  const displayMax = xpForNextLevel(displayLevel);

  return (
    <div className="fixed inset-0 z-50 bg-primary-bg/80 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="relative p-[1px] rounded-card bg-gradient-to-br from-accent/40 to-highlight/40 overflow-hidden">
          <div className="shine-sweep rounded-card" />
          <div className="relative rounded-card bg-gradient-to-br from-secondary-bg to-secondary-bg/70 p-6 text-center">
            {showLevelUpBadge ? (
              <div className="flex flex-col items-center gap-1 mb-4">
                <TrendingUp className="w-8 h-8 text-highlight" />
                <p className="text-lg font-bold text-text-primary">Level Up!</p>
                <p className="text-sm text-text-muted">You reached Level {afterLevel}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 mb-4">
                <Sparkles className="w-6 h-6 text-accent" />
                <p className="text-sm font-medium text-text-secondary">
                  +{earned} XP earned
                </p>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-text-muted">Level {displayLevel} Progress</span>
                <span className="text-xs text-text-muted">
                  {displayXp} / {displayMax} XP
                </span>
              </div>
              <ProgressBar value={displayXp} max={displayMax} />
            </div>

            <button
              onClick={onClose}
              className="mt-5 text-sm px-4 py-2 bg-accent text-white rounded-button hover:brightness-110 active:brightness-90 transition cursor-pointer"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}