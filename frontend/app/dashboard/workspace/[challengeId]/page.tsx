"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import ProblemPanel from "@/components/ProblemPanel";
import Workspace from "@/components/Workspace";
import StartScreen from "@/components/StartScreen";
import { getProblemById } from "@/data/problems";

export default function ChallengeWorkspacePage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const { challengeId } = use(params);
  const [started, setStarted] = useState(false);
  const problem = getProblemById(challengeId);

  if (!problem) {
    notFound();
  }

  function handleFirstActivity() {
    setStarted(true);
  }

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen bg-primary-bg">
      <ProblemPanel problem={problem} started={started} />
      <Workspace problem={problem} started={started} onFirstActivity={handleFirstActivity} />
      {!started && <StartScreen problem={problem} onStart={handleFirstActivity} />}
    </div>
  );
}