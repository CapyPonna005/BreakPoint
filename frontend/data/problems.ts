export type Difficulty = "Easy" | "Medium" | "Hard";

export type Problem = {
  id: string;
  title: string;
  difficulty: Difficulty;
  blurb: string;
  description: string;
  tags: string[];
  constraints: string[];
  examples: { input: string; output: string }[];
  starterCode: string;
};

export const problems: Problem[] = [
  {
    id: "off-by-one-loop",
    title: "Fix the Off-by-One Loop",
    difficulty: "Easy",
    blurb: "A short bug-fix challenge involving loop boundaries.",
    description:
      "The loop below is supposed to print numbers 1 through 5, but it's printing one too many. Find and fix the bug.",
    tags: ["loops", "arrays"],
    constraints: [
      "Do not change the function signature.",
      "The loop must use a for-loop (no while-loops).",
    ],
    examples: [
      { input: "printNumbers(5)", output: "1 2 3 4 5" },
      { input: "printNumbers(3)", output: "1 2 3" },
    ],
    starterCode: `function example() {\n  // your code here\n}`,
  },
];

export function getProblemById(id: string): Problem | undefined {
  return problems.find((p) => p.id === id);
}