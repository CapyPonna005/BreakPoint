import type { Problem } from "@/data/problems";

const difficultyColors = {
  Easy: "bg-highlight/15 text-highlight",
  Medium: "bg-accent/15 text-accent",
  Hard: "bg-red-500/15 text-red-400",
};

type ProblemPanelProps = {
  problem: Problem;
  started: boolean;
};

export default function ProblemPanel({ problem, started }: ProblemPanelProps) {
  return (
    <section
      className={`w-full md:w-1/2 bg-surface p-4 md:p-6 border-b md:border-b-0 md:border-r border-border-subtle transition-all duration-300 overflow-y-auto ${
        started ? "" : "blur-[2px] select-none pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-lg font-semibold text-text-primary">
          {problem.title}
        </h2>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-badge ${
            difficultyColors[problem.difficulty]
          }`}
        >
          {problem.difficulty}
        </span>
      </div>

      <div className="flex gap-1 mb-4">
        {problem.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 bg-primary-bg text-text-muted rounded-badge"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-text-secondary mb-5">{problem.description}</p>

      <div className="mb-5">
        <h3 className="text-sm font-semibold text-text-primary mb-2">
          Constraints
        </h3>
        <ul className="list-disc list-inside text-text-secondary text-sm flex flex-col gap-1">
          {problem.constraints.map((constraint, index) => (
            <li key={index}>{constraint}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-2">
          Examples
        </h3>
        <div className="flex flex-col gap-2">
          {problem.examples.map((example, index) => (
            <div
              key={index}
              className="bg-primary-bg border border-border-subtle rounded-input p-3 font-mono text-xs"
            >
              <p className="text-text-muted">
                Input: <span className="text-text-secondary">{example.input}</span>
              </p>
              <p className="text-text-muted">
                Output: <span className="text-text-secondary">{example.output}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}