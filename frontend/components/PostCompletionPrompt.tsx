"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shuffle, List, Sparkles, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type PostCompletionPromptProps = {
  currentProblemId: string;
};

export default function PostCompletionPrompt({
  currentProblemId,
}: PostCompletionPromptProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loadingNext, setLoadingNext] = useState(false);

  async function handleNextChallenge() {
    setLoadingNext(true);

    const { data } = await supabase
      .from("problems")
      .select("id")
      .neq("id", currentProblemId);

    if (data && data.length > 0) {
      const random = data[Math.floor(Math.random() * data.length)];
      router.push(`/dashboard/workspace/${random.id}`);
    } else {
      // No other problems exist yet — Practice is the sensible fallback.
      router.push("/dashboard/practice");
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-primary-bg/80 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-secondary-bg border border-border-subtle rounded-card shadow-lg p-6 text-center">
        <h2 className="text-lg font-bold text-text-primary mb-1">What&apos;s next?</h2>
        <p className="text-sm text-text-muted mb-6">Keep the momentum going.</p>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={handleNextChallenge}
            disabled={loadingNext}
            className="flex items-center justify-center gap-2 bg-accent text-white rounded-button py-2.5 text-sm font-medium hover:brightness-110 active:brightness-90 disabled:opacity-50 transition cursor-pointer"
          >
            {loadingNext ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Shuffle className="w-4 h-4" />
            )}
            {loadingNext ? "Finding one..." : "Next Challenge"}
          </button>

          <button
            onClick={() => router.push("/dashboard/practice")}
            className="flex items-center justify-center gap-2 bg-primary-bg border border-border-subtle text-text-primary rounded-button py-2.5 text-sm font-medium hover:brightness-125 transition cursor-pointer"
          >
            <List className="w-4 h-4" />
            Back to Practice
          </button>

          <button
            onClick={() => router.push("/dashboard/create")}
            className="flex items-center justify-center gap-2 text-text-muted hover:text-text-secondary text-sm py-1.5 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Create Your Own
          </button>
        </div>
      </div>
    </div>
  );
}