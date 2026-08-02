export type Difficulty = "Easy" | "Medium" | "Hard";
export type Mode = "Bug-Fix" | "Fill-in-the-Blank";

// A single blank in a Fill-in-the-Blank challenge. `options` includes the
// correct answer mixed in with plausible wrong ones — shuffled client-side
// at display time so the correct answer isn't always in the same position.
export type FitbBlank = {
  id: string; // matches a {{BLANK_id}} marker inside starterCode
  correctAnswer: string;
  options: string[]; // correctAnswer + 2-3 distractors, unshuffled here
};

export type Problem = {
  id: string;
  title: string;
  difficulty: Difficulty;
  mode: Mode;
  blurb: string;
  description: string;
  tags: string[];
  constraints: string[];
  examples: { input: string; output: string }[];
  starterCode: string;
  // Only present when mode === "Fill-in-the-Blank". Bug-Fix problems leave
  // this undefined.
  blanks?: FitbBlank[];
};

// Shape as stored in the Supabase "problems" table (snake_case columns).
// See schema.sql for the table definition.
export type ProblemRow = {
  id: string;
  title: string;
  difficulty: Difficulty;
  mode: Mode;
  blurb: string;
  description: string;
  tags: string[];
  constraints: string[];
  examples: { input: string; output: string }[];
  starter_code: string;
  created_by: string | null;
  created_at: string;
  // jsonb column, only populated for Fill-in-the-Blank rows. Nullable for
  // existing Bug-Fix rows that predate this column.
  blanks: FitbBlank[] | null;
};

export function mapRowToProblem(row: ProblemRow): Problem {
  return {
    id: row.id,
    title: row.title,
    difficulty: row.difficulty,
    mode: row.mode,
    blurb: row.blurb,
    description: row.description,
    tags: row.tags,
    constraints: row.constraints,
    examples: row.examples,
    starterCode: row.starter_code,
    blanks: row.blanks ?? undefined,
  };
}