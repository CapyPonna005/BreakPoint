"use client";

import { useState } from "react";
import ProblemPanel from "@/components/ProblemPanel";
import Workspace from "@/components/Workspace";
import FitbWorkspace from "@/components/FitbWorkspace";
import StartScreen from "@/components/StartScreen";
import type { Problem } from "@/data/problems";

type ChallengeWorkspaceClientProps = {
  problem: Problem;
};

export default function ChallengeWorkspaceClient({ problem }: ChallengeWorkspaceClientProps) {
  const [started, setStarted] = useState(false);

  function handleFirstActivity() {
    setStarted(true);
  }

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen bg-primary-bg">
      <ProblemPanel problem={problem} started={started} />
      {problem.mode === "Fill-in-the-Blank" ? (
        <FitbWorkspace problem={problem} started={started} onFirstActivity={handleFirstActivity} />
      ) : (
        <Workspace problem={problem} started={started} onFirstActivity={handleFirstActivity} />
      )}
      {!started && <StartScreen problem={problem} onStart={handleFirstActivity} />}
    </div>
  );
}