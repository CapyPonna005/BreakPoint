"use client";

import { useState, useRef, useEffect } from "react";
import { RotateCcw, Loader2 } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import CodeEditor from "@/components/CodeEditor";
import ConsolePanel from "@/components/ConsolePanel";
import Timer from "@/components/Timer";
import ResultsModal from "@/components/ResultsModal";
import XpPopup from "@/components/XpPopup";
import { useToast } from "@/context/ToastContext";
import type { Problem } from "@/data/problems";
import { starterTemplates } from "@/data/starterTemplates";
import type { XpAwardResult } from "@/lib/awardXp";

type ConsoleLine = {
  type: "log" | "error" | "success";
  message: string;
};

type WorkspaceProps = {
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
  xpAward: XpAwardResult | null;
};

const fontSizes = [12, 14, 16, 18];

export default function Workspace({ problem, started, onFirstActivity }: WorkspaceProps) {
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState(problem.starterCode);
  const [fontSize, setFontSize] = useState(14);
  const [lines, setLines] = useState<ConsoleLine[]>([]);
  const [stdin, setStdin] = useState("");
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showXpPopup, setShowXpPopup] = useState(false);
  const [gradeResult, setGradeResult] = useState<GradeResult | null>(null);
  const { showToast } = useToast();
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  function handleFirstActivity() {
    onFirstActivity();
    setTimerRunning(true);
  }

  function handleCodeChange(newCode: string) {
    handleFirstActivity();
    setCode(newCode);
  }

  function handleReset() {
    setCode(problem.starterCode);
    setLines([]);
    showToast("Code reset to starter template", "success");
  }

  function handleLanguageChange(newLanguage: string) {
    const currentTemplateForOldLanguage = starterTemplates[language];
    const isUnedited = code === problem.starterCode || code === currentTemplateForOldLanguage;

    setLanguage(newLanguage);

    if (isUnedited) {
      setCode(starterTemplates[newLanguage] ?? problem.starterCode);
    }
  }

  async function handleRun() {
    handleFirstActivity();
    setRunning(true);
    setLines([{ type: "log", message: "Running..." }]);

    try {
      const response = await fetch("/api/execute-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, stdin }),
      });

      if (!response.ok) {
        const data = await response.json();
        setLines([{ type: "error", message: data.error ?? "Execution failed." }]);
        return;
      }

      const result = await response.json();
      const output: ConsoleLine[] = [];

      if (result.stdout) {
        output.push({ type: "success", message: result.stdout.trimEnd() });
      }
      if (result.stderr) {
        output.push({ type: "error", message: result.stderr.trimEnd() });
      }
      if (result.error) {
        output.push({ type: "error", message: result.error });
      }
      if (output.length === 0) {
        output.push({ type: "log", message: "(no output)" });
      }

      setLines(output);
    } catch {
      setLines([{ type: "error", message: "Failed to reach execution server." }]);
    } finally {
      setRunning(false);
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    setTimerRunning(false);
    setLines([{ type: "log", message: "Submitting for grading..." }]);

    try {
      const response = await fetch("/api/grade-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submittedCode: code,
          language,
          problem: {
            id: problem.id,
            title: problem.title,
            description: problem.description,
            constraints: problem.constraints,
            examples: problem.examples,
            starterCode: problem.starterCode,
          },
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setLines([{ type: "error", message: data.error ?? "Grading failed." }]);
        showToast(data.error ?? "Grading failed. Try again.", "error");
        return;
      }

      const result: GradeResult = await response.json();
      setGradeResult(result);

      setLines([
        {
          type: result.testsPassed === result.testsTotal ? "success" : "error",
          message: `${result.testsPassed}/${result.testsTotal} tests passed`,
        },
        { type: "success", message: `Submission graded: ${result.score}%` },
      ]);
      showToast(`Submission graded: ${result.score}%`, "success");
      setShowResults(true);
    } catch {
      setLines([{ type: "error", message: "Failed to reach grading server." }]);
      showToast("Failed to reach grading server.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  function handleResultsClose() {
    setShowResults(false);
    if (gradeResult?.xpAward) {
      setShowXpPopup(true);
    }
  }

  return (
    <section className="relative w-full md:w-[65%] bg-surface p-4 md:p-6 flex flex-col gap-4">
      <div
        className={`flex flex-col gap-4 transition-all duration-300 ${
          started ? "" : "blur-[2px] select-none pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-text-primary">Code Editor</h2>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2 border-y border-border-subtle py-2">
          <LanguageSelector language={language} onChange={handleLanguageChange} />
          <div className="flex items-center gap-3">
            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="text-xs border border-border-subtle rounded-input px-2 py-1 bg-secondary-bg text-text-primary cursor-pointer"
            >
              {fontSizes.map((size) => (
                <option key={size} value={size}>
                  {size}px
                </option>
              ))}
            </select>
            <Timer running={timerRunning} />
          </div>
        </div>

        <CodeEditor
          language={language}
          value={code}
          onChange={handleCodeChange}
          readOnly={!started}
          fontSize={fontSize}
        />

        <div className="border-t border-border-subtle pt-4">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <h2 className="text-sm font-semibold text-text-muted">Console</h2>
            <div className="flex gap-2">
              <button
                onClick={handleRun}
                disabled={running}
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-secondary-bg text-text-primary rounded-button hover:brightness-125 disabled:opacity-50 transition cursor-pointer"
              >
                {running && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {running ? "Running..." : "Run"}
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-accent text-white rounded-button hover:brightness-110 active:brightness-90 disabled:opacity-50 transition cursor-pointer"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
          <ConsolePanel
            lines={lines}
            stdin={stdin}
            onStdinChange={setStdin}
            running={running}
          />
          <div ref={consoleEndRef} />
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
          onClose={handleResultsClose}
        />
      )}

      {showXpPopup && gradeResult?.xpAward && (
        <XpPopup award={gradeResult.xpAward} onClose={() => setShowXpPopup(false)} />
      )}
    </section>
  );
}