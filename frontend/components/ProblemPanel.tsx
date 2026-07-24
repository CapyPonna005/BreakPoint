type Difficulty = "Easy" | "Medium" | "Hard";

const difficultyColors: Record<Difficulty, string> = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

const problem = {
  title: "Fix the Off-by-One Loop",
  difficulty: "Easy" as Difficulty,
  description:
    "The loop below is supposed to print numbers 1 through 5, but it's printing one too many. Find and fix the bug.",
};

export default function ProblemPanel() {
  return (
    <section className="w-full md:w-1/2 p-4 md:p-6 border-b md:border-b-0 md:border-r">
      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-lg font-semibold">{problem.title}</h2>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            difficultyColors[problem.difficulty]
          }`}
        >
          {problem.difficulty}
        </span>
      </div>
      <div className="max-h-[40vh] md:max-h-none overflow-y-auto">
        <p className="text-gray-500">{problem.description}</p>
      </div>
    </section>
  );
}