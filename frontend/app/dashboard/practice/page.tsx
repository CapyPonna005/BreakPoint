"use client";

import { useState } from "react";

type Difficulty = "Easy" | "Medium" | "Hard";

const difficultyColors: Record<Difficulty, string> = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

const challenges = [
  {
    title: "Fix the Off-by-One Loop",
    mode: "Bug-Fix",
    difficulty: "Easy" as Difficulty,
    tags: ["loops", "arrays"],
  },
  {
    title: "Complete the Binary Search",
    mode: "Fill-in-the-Blank",
    difficulty: "Medium" as Difficulty,
    tags: ["algorithms", "arrays"],
  },
  {
    title: "Fix the Null Pointer Check",
    mode: "Bug-Fix",
    difficulty: "Hard" as Difficulty,
    tags: ["pointers", "edge-cases"],
  },
];

const filters = ["All", "Easy", "Medium", "Hard"] as const;

export default function PracticePage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>(
    "All"
  );
  const [search, setSearch] = useState("");

  const filteredChallenges = challenges
    .filter((c) => activeFilter === "All" || c.difficulty === activeFilter)
    .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Practice</h1>

      <input
        type="text"
        placeholder="Search challenges..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm mb-4 text-sm border rounded-md px-3 py-2"
      />

      <div className="flex gap-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`text-sm px-3 py-1 rounded-full border transition ${
              activeFilter === filter
                ? "bg-black text-white border-black"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filteredChallenges.length === 0 ? (
          <p className="text-gray-500 text-sm">No challenges match your search.</p>
        ) : (
          filteredChallenges.map((challenge) => (
            <div
              key={challenge.title}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-medium">{challenge.title}</p>
                <p className="text-sm text-gray-500 mb-2">{challenge.mode}</p>
                <div className="flex gap-1">
                  {challenge.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  difficultyColors[challenge.difficulty]
                }`}
              >
                {challenge.difficulty}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}