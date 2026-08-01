"use client";

import { useState, useRef, useEffect } from "react";
import { RotateCcw, Loader2 } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import CodeEditor from "@/components/CodeEditor";
import ConsolePanel from "@/components/ConsolePanel";
import Timer from "@/components/Timer";
import ResultsModal from "@/components/ResultsModal";
import { useToast } from "@/context/ToastContext";
import type { Problem } from "@/data/problems";
import { starterTemplates } from "@/data/starterTemplates";

type ConsoleLine = {
  type: "log" | "error" | "success";
  message: string;
};

type WorkspaceProps = {
  problem: Problem;
  started: boolean;
  onFirstActivity: () => void;
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

  function handleSubmit() {
    setSubmitting(true);
    setTimerRunning(false);
    setLines([{ type: "log", message: "Submitting for grading..." }]);

    setTimeout(() => {
      setLines([
        { type: "success", message: "✓ All tests passed" },
        { type: "success", message: "Submission graded: 100%" },
      ]);
      setSubmitting(false);
      showToast("Submission graded: 100%", "success");
      setShowResults(true);
    }, 1000);
  }

  return (
    <section className="relative w-full md:w-1/2 bg-surface p-4 md:p-6 flex flex-col gap-4">
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
                className="text-sm px-3 py-1.5 bg-accent text-white rounded-button hover:brightness-110 active:brightness-90 disabled:opacity-50 transition cursor-pointer"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
          <ConsolePanel
            lines={lines}
            stdin={stdin}
            onStdinChange={setStdin}
            onRun={handleRun}
            running={running}
          />
          <div ref={consoleEndRef} />
        </div>
      </div>

      {showResults && (
        <ResultsModal
          challenge={problem.title}
          score="100%"
          testsPassed={3}
          testsTotal={3}
          time="Just now"
          feedback="Great job! Your fix correctly adjusts the loop condition to prevent the extra iteration. Consider adding a comment explaining why '<' is used instead of '<=' to help future readers understand the boundary condition at a glance."
          onClose={() => setShowResults(false)}
        />
      )}
    </section>
  );
}