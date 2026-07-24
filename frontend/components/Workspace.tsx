"use client";

import { useState } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import CodeEditor from "@/components/CodeEditor";
import ConsolePanel from "@/components/ConsolePanel";
import Timer from "@/components/Timer";
import { useToast } from "@/context/ToastContext";

type ConsoleLine = {
  type: "log" | "error" | "success";
  message: string;
};

export default function Workspace() {
  const [language, setLanguage] = useState("JavaScript");
  const [lines, setLines] = useState<ConsoleLine[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  function handleRun() {
    setLines([
      { type: "log", message: "Running tests..." },
      { type: "success", message: "✓ Test 1 passed" },
      { type: "error", message: "✗ Test 2 failed: expected 5, got 6" },
    ]);
  }

  function handleSubmit() {
    setSubmitting(true);
    setLines([{ type: "log", message: "Submitting for grading..." }]);

    setTimeout(() => {
      setLines([
        { type: "success", message: "✓ All tests passed" },
        { type: "success", message: "Submission graded: 100%" },
      ]);
      setSubmitting(false);
      showToast("Submission graded: 100%", "success");
    }, 1000);
  }

  return (
    <section className="w-full md:w-1/2 p-4 md:p-6 bg-gray-50 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Code Editor</h2>

      <div className="flex items-center justify-between flex-wrap gap-2 border-y py-2">
        <LanguageSelector language={language} onChange={setLanguage} />
        <Timer />
      </div>

      <CodeEditor language={language} />

      <div className="border-t pt-4">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <h2 className="text-sm font-semibold text-gray-600">Console</h2>
          <div className="flex gap-2">
            <button
              onClick={handleRun}
              className="text-sm px-3 py-1 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Run
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="text-sm px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
        <ConsolePanel lines={lines} />
      </div>
    </section>
  );
}