"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Code2,
  Image as ImageIcon,
  Sparkles,
  Loader2,
  Upload,
  X,
  Zap,
  Flame,
  Skull,
} from "lucide-react";
import { addGeneratedProblem, type Problem, type Difficulty } from "@/data/problems";

type Tab = "paste" | "screenshot";

const difficulties: { level: Difficulty; icon: typeof Zap }[] = [
  { level: "Easy", icon: Zap },
  { level: "Medium", icon: Flame },
  { level: "Hard", icon: Skull },
];

// Matches the color scheme already established in ProblemPanel / StartScreen / Practice badges.
const difficultyStyles: Record<Difficulty, { bg: string; text: string; border: string }> = {
  Easy: { bg: "bg-highlight/15", text: "text-highlight", border: "border-highlight" },
  Medium: { bg: "bg-accent/15", text: "text-accent", border: "border-accent" },
  Hard: { bg: "bg-red-500/15", text: "text-red-400", border: "border-red-500" },
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function CreateChallengePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("paste");
  const [code, setCode] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleGenerate() {
    if (!code.trim()) return;

    setGenerating(true);
    setError("");

    try {
      const response = await fetch("/api/generate-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, difficulty }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate challenge.");
      }

      const generated = await response.json();

      const problem: Problem = {
        id: `${slugify(generated.title)}-${Date.now()}`,
        mode: "Bug-Fix", // only mode with real functionality today; see note below for Fill-in-the-Blank
        ...generated,
      };

      addGeneratedProblem(problem);
      router.push(`/dashboard/workspace/${problem.id}`);
    } catch {
      setError("Something went wrong generating your challenge. Please try again.");
      setGenerating(false);
    }
  }

  function handleFileSelect(file: File) {
    if (!file.type.startsWith("image/")) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setImagePreview(null);
  }

  async function handleGenerateFromImage() {
    if (!imageFile) return;

    setGenerating(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("difficulty", difficulty);

      const response = await fetch("/api/generate-challenge-from-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate challenge.");
      }

      const generated = await response.json();

      const problem: Problem = {
        id: `${slugify(generated.title)}-${Date.now()}`,
        mode: "Bug-Fix", // only mode with real functionality today; see note below for Fill-in-the-Blank
        ...generated,
      };

      addGeneratedProblem(problem);
      router.push(`/dashboard/workspace/${problem.id}`);
    } catch {
      setError("Something went wrong generating your challenge. Please try again.");
      setGenerating(false);
    }
  }

  return (
    <div className="min-h-screen bg-primary-bg p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-text-primary mb-1">
          Create a Challenge
        </h1>
        <p className="text-text-muted text-sm mb-6">
          Paste code or upload a screenshot — we&apos;ll turn it into a debugging challenge.
        </p>

        <div className="flex gap-2 mb-6 border-b border-border-subtle">
          <button
            onClick={() => setActiveTab("paste")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition cursor-pointer ${
              activeTab === "paste"
                ? "border-accent text-accent"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            <Code2 className="w-4 h-4" />
            Paste Code
          </button>
          <button
            onClick={() => setActiveTab("screenshot")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition cursor-pointer ${
              activeTab === "screenshot"
                ? "border-accent text-accent"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Upload Screenshot
          </button>
        </div>

        <div className="bg-secondary-bg border border-border-subtle rounded-card p-6">
          <div className="mb-5">
            <p className="text-sm text-text-secondary mb-2">Target difficulty</p>
            <div className="flex gap-2">
              {difficulties.map(({ level, icon: Icon }) => {
                const isSelected = difficulty === level;
                const style = difficultyStyles[level];
                return (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`flex items-center gap-1.5 text-sm px-3.5 py-1.5 rounded-badge border transition cursor-pointer ${
                      isSelected
                        ? `${style.bg} ${style.text} ${style.border}`
                        : "border-border-subtle text-text-muted hover:text-text-secondary hover:border-text-muted"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {level}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-input mb-4">
              {error}
            </p>
          )}

          {activeTab === "paste" ? (
            <div className="flex flex-col gap-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                rows={12}
                className="w-full bg-primary-bg border border-border-subtle rounded-input px-3 py-2.5 text-sm font-mono text-text-primary placeholder:text-text-muted resize-none focus-visible:outline-none focus:border-accent transition-colors"
              />
              <button
                onClick={handleGenerate}
                disabled={!code.trim() || generating}
                className="self-end flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-button font-medium hover:brightness-110 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Challenge
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Uploaded code screenshot"
                    className="w-full rounded-input border border-border-subtle max-h-80 object-contain bg-primary-bg"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-primary-bg/90 text-text-secondary hover:text-text-primary rounded-full p-1.5 transition cursor-pointer"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex flex-col items-center justify-center text-center py-12 border-2 border-dashed rounded-input cursor-pointer transition-colors ${
                    isDragging
                      ? "border-accent bg-accent/5"
                      : "border-border-subtle hover:border-accent/50"
                  }`}
                >
                  <Upload className="w-8 h-8 text-text-muted mb-3" />
                  <p className="text-text-secondary text-sm mb-1">
                    Drag and drop a screenshot here
                  </p>
                  <p className="text-text-muted text-xs">or click to browse</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                    className="hidden"
                  />
                </div>
              )}

              <button
                onClick={handleGenerateFromImage}
                disabled={!imageFile || generating}
                className="self-end flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-button font-medium hover:brightness-110 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Reading code...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Challenge
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}