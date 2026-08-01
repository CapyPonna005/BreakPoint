import { Play } from "lucide-react";
import type { Problem } from "@/data/problems";

const difficultyColors = {
  Easy: "bg-highlight/15 text-highlight",
  Medium: "bg-accent/15 text-accent",
  Hard: "bg-red-500/15 text-red-400",
};

type StartScreenProps = {
  problem: Problem;
  onStart: () => void;
};

export default function StartScreen({ problem, onStart }: StartScreenProps) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-sm px-4">
      <div className="bg-secondary-bg border border-border-subtle rounded-card shadow-lg p-6 text-center">
        <span
          className={`inline-block text-xs font-medium px-3 py-1 rounded-badge mb-3 ${difficultyColors[problem.difficulty]}`}
        >
          {problem.difficulty}
        </span>
        <h2 className="text-lg font-bold text-text-primary mb-1">
          {problem.title}
        </h2>
        <p className="text-text-muted text-sm mb-6">
          Ready when you are.
        </p>

        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-button font-medium hover:brightness-110 active:brightness-90 transition cursor-pointer"
        >
          <Play className="w-4 h-4" />
          Start Challenge
        </button>
      </div>
    </div>
  );
}