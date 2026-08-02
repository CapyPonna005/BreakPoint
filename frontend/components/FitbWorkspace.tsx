"use client";

import { useState, useMemo, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Timer from "@/components/Timer";
import ResultsModal from "@/components/ResultsModal";
import { useToast } from "@/context/ToastContext";
import type { Problem, FitbBlank } from "@/data/problems";

type FitbWorkspaceProps = {
  problem: Problem;
  started: boolean;
  onFirstActivity: () => void;
};

type FeedbackNote = {
  severity: "critical" | "suggestion";
  text: string;
};

type GradeResult = {
  score: number;
  testsPassed: number;
  testsTotal: number;
  feedback: string;
  notes: FeedbackNote[];
};

// Splits starterCode on {{BLANK_n}} markers into alternating text/blank
// segments, so we can render text as-is and a <select> in place of each
// marker, in the original order they appear in the code.
type Segment = { type: "text"; content: string } | { type: "blank"; id: string };

function parseSegments(code: string): Segment[] {
  const parts = code.split(/(\{\{BLANK_[^}]+\}\})/g);
  return parts
    .filter((part) => part.length > 0)
    .map((part) => {
      const match = part.match(/^\{\{BLANK_([^}]+)\}\}$/);
      return match ? { type: "blank" as const, id: match[1] } : { type: "text" as const, content: part };
    });
}

// Fisher-Yates shuffle. Called once per blank via useMemo (keyed on
// problem.id) so options don't reshuffle on every re-render/selection.
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function FitbWorkspace({ problem, started, onFirstActivity }: FitbWorkspaceProps) {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [gradeResult, setGradeResult] = useState<GradeResult | null>(null);
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const blanks: FitbBlank[] = problem.blanks ?? [];
  const segments = useMemo(() => parseSegments(problem.starterCode), [problem.starterCode]);

  // Shuffled once per problem, not on every render.
  const shuffledOptionsByBlank = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const blank of blanks) {
      map[blank.id] = shuffle(blank.options);
    }
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem.id]);

  useEffect(() => {
    if (started) setTimerRunning(true);
  }, [started]);

  function handleFirstActivity() {
    onFirstActivity();
    setTimerRunning(true);
  }

  function handleSelect(blankId: string, value: string) {
    handleFirstActivity();
    setSelections((prev) => ({ ...prev, [blankId]: value }));
  }

  const allBlanksFilled = blanks.length > 0 && blanks.every((b) => selections[b.id]);

  async function handleSubmit() {
    setSubmitting(true);
    setTimerRunning(false);
    setError("");

    try {
      const response = await fetch("/api/grade-fitb-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId: problem.id, selections }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error ?? "Grading failed.");
        showToast(data.error ?? "Grading failed. Try again.", "error");
        return;
      }

      const result: GradeResult = await response.json();
      setGradeResult(result);
      showToast(`Submission graded: ${result.score}%`, "success");
      setShowResults(true);
    } catch {
      setError("Failed to reach grading server.");
      showToast("Failed to reach grading server.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="relative w-full md:w-1/2 bg-surface p-4 md:p-6 flex flex-col gap-4">
      <div
        className={`flex flex-col gap-4 transition-all duration-300 ${
          started ? "" : "blur-[2px] select-none pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-text-primary">Fill in the Blanks</h2>
          <Timer running={timerRunning} />
        </div>

        <div className="border-y border-border-subtle py-2">
          <p className="text-xs text-text-muted">
            Select the correct option for each highlighted blank.
          </p>
        </div>

        <pre className="bg-primary-bg border border-border-subtle rounded-input p-4 text-sm font-mono text-text-primary whitespace-pre-wrap leading-relaxed overflow-x-auto">
          {segments.map((segment, i) =>
            segment.type === "text" ? (
              <span key={i}>{segment.content}</span>
            ) : (
              <select
                key={i}
                value={selections[segment.id] ?? ""}
                onChange={(e) => handleSelect(segment.id, e.target.value)}
                disabled={!started}
                className={`inline-block mx-1 text-sm font-mono rounded-input border px-1.5 py-0.5 cursor-pointer focus-visible:outline-none ${
                  selections[segment.id]
                    ? "bg-accent/15 border-accent text-accent"
                    : "bg-secondary-bg border-border-subtle text-text-muted"
                }`}
              >
                <option value="" disabled>
                  ___
                </option>
                {(shuffledOptionsByBlank[segment.id] ?? []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )
          )}
        </pre>

        {error && (
          <p className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-input">{error}</p>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!allBlanksFilled || submitting}
            className="flex items-center gap-1.5 text-sm px-4 py-2 bg-accent text-white rounded-button hover:brightness-110 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      {showResults && gradeResult && (
        <ResultsModal
          challenge={problem.title}
          score={`${gradeResult.score}%`}
          testsPassed={gradeResult.testsPassed}
          testsTotal={gradeResult.testsTotal}
          time="Just now"
          feedback={gradeResult.feedback}
          notes={gradeResult.notes}
          onClose={() => setShowResults(false)}
        />
      )}
    </section>
  );
}