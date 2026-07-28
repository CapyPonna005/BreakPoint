"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { Problem, Difficulty } from "@/data/problems";

const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"];

type StartScreenProps = {
  problem: Problem;
  onStart: () => void;
};

export default function StartScreen({ problem, onStart }: StartScreenProps) {
  const [selected, setSelected] = useState<Difficulty>(problem.difficulty);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-sm px-4">
      <div className="bg-secondary-bg border border-border-subtle rounded-card shadow-lg p-6 text-center">
        <h2 className="text-lg font-bold text-text-primary mb-1">
          Ready to begin?
        </h2>
        <p className="text-text-muted text-sm mb-5">
          Choose a difficulty and start the challenge.
        </p>

        <div className="flex justify-center gap-2 mb-6">
          {difficulties.map((level) => (
            <button
              key={level}
              onClick={() => setSelected(level)}
              className={`text-sm px-3 py-1.5 rounded-badge border transition cursor-pointer ${
                selected === level
                  ? "bg-accent text-text-primary border-accent"
                  : "border-border-subtle text-text-muted hover:text-text-secondary"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 bg-accent text-text-primary px-5 py-2.5 rounded-button font-medium hover:brightness-110 active:brightness-90 transition cursor-pointer"
        >
          <Play className="w-4 h-4" />
          Start Challenge
        </button>
      </div>
    </div>
  );
}