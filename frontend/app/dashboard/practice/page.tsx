"use client";

import { useState } from "react";
import Link from "next/link";
import { problems } from "@/data/problems";

const filters = ["All", "Easy", "Medium", "Hard"] as const;

export default function PracticePage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>(
    "All"
  );
  const [search, setSearch] = useState("");

  const difficultyColors = {
    Easy: "bg-highlight/15 text-highlight",
    Medium: "bg-accent/15 text-accent",
    Hard: "bg-red-500/15 text-red-400",
  };

  const filteredChallenges = problems
    .filter((c) => activeFilter === "All" || c.difficulty === activeFilter)
    .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-primary-bg p-6">
      <h1 className="text-2xl font-bold text-text-primary mb-4">Practice</h1>

      <input
        type="text"
        placeholder="Search challenges..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm mb-4 text-sm bg-secondary-bg border border-border-subtle rounded-input px-3 py-2 text-text-primary placeholder:text-text-muted"
      />

      <div className="flex gap-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`text-sm px-3 py-1 rounded-badge border transition cursor-pointer ${
              activeFilter === filter
                ? "bg-accent text-white border-accent"
                : "border-border-subtle text-text-muted hover:text-text-secondary"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filteredChallenges.length === 0 ? (
          <p className="text-text-muted text-sm">No challenges match your search.</p>
        ) : (
          filteredChallenges.map((challenge) => (
            <Link
              key={challenge.id}
              href={`/dashboard/workspace/${challenge.id}`}
              className="flex items-center justify-between p-4 bg-secondary-bg/90 border border-border-subtle rounded-card hover:border-accent/50 transition cursor-pointer"
            >
              <div>
                <p className="font-medium text-text-primary">{challenge.title}</p>
                <div className="flex gap-1 mt-2">
                  {challenge.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-primary-bg text-text-muted rounded-badge"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-badge ${
                  difficultyColors[challenge.difficulty]
                }`}
              >
                {challenge.difficulty}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}