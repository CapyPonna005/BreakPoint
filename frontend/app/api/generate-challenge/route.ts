import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { checkRateLimit } from "@/lib/rateLimit";

type Difficulty = "Easy" | "Medium" | "Hard";
type Mode = "Bug-Fix" | "Fill-in-the-Blank";

type GenerateRequestBody = {
  code: string;
  difficulty: Difficulty;
  mode: Mode;
};

const BUGFIX_SYSTEM_PROMPT = `You are BreakPoint's challenge generator. BreakPoint is a coding practice platform where users learn by debugging real code, not writing from scratch.

Given a piece of code and a target difficulty, you will:
1. Introduce exactly ONE realistic, findable bug into the code (an off-by-one error, a wrong comparison operator, a swapped variable, a missing edge case, etc.) — never something contrived or impossible to reasonably find.
2. Write a "description" that explains what the code is SUPPOSED to do, without revealing what the bug is or where it is.
3. Write 2-3 sensible "constraints" (rules the user must follow while fixing it, e.g. "do not change the function signature").
4. Write 1-2 "examples" showing input/expected-output pairs that demonstrate the CORRECT (bug-free) behavior.
5. Choose a short, clear "title" describing the challenge (not "Fix the bug", something specific like "Fix the Off-by-One Loop").
6. Set "tags" — 1-3 short lowercase topic words relevant to the code (e.g. "loops", "arrays", "recursion").
7. Return the buggy version of the code as "starterCode" — this is what the user will see and need to fix.

You must respond with ONLY valid JSON matching this exact shape, no other text:
{
  "title": string,
  "blurb": string (one short sentence teaser),
  "description": string,
  "tags": string[],
  "constraints": string[],
  "examples": [{ "input": string, "output": string }],
  "starterCode": string
}`;

const FITB_SYSTEM_PROMPT = `You are BreakPoint's challenge generator. BreakPoint is a coding practice platform. In this mode ("Fill-in-the-Blank"), users learn by selecting the correct piece of code from multiple choices at specific blanked-out spots, rather than writing or fixing free-form code.

Given a piece of code and a target difficulty, you will:
1. Choose 2-4 MEANINGFUL blanks in the code — things that test real understanding (a loop boundary condition, a comparison operator, a key variable name, a return value, an increment/decrement, a conditional). Do NOT blank out trivial syntax (semicolons, brackets, keywords like "function" or "if" alone).
2. For each blank, replace the chosen token(s) in the code with a marker in the exact form {{BLANK_1}}, {{BLANK_2}}, etc. (sequential, starting at 1).
3. For each blank, provide the single correct answer (exactly what was removed, as a short code fragment — e.g. "<", "i++", "n - 1") and 2-3 plausible but WRONG distractor options of similar length/style (things a learner might mistakenly pick — off-by-one variants, swapped operators, etc.). Never make distractors absurd or obviously wrong.
4. Write a "description" explaining what the code is supposed to do (correct, fully-working behavior — there is no bug in this mode, only blanks to fill correctly).
5. Write 2-3 sensible "constraints".
6. Write 1-2 "examples" showing input/expected-output pairs for the CORRECT, fully-filled-in code.
7. Choose a short, clear "title" (e.g. "Complete the Loop Boundary").
8. Set "tags" — 1-3 short lowercase topic words.
9. Return the blanked-out version of the code (with {{BLANK_n}} markers in place) as "starterCode".

You must respond with ONLY valid JSON matching this exact shape, no other text:
{
  "title": string,
  "blurb": string (one short sentence teaser),
  "description": string,
  "tags": string[],
  "constraints": string[],
  "examples": [{ "input": string, "output": string }],
  "starterCode": string (with {{BLANK_n}} markers),
  "blanks": [
    { "id": string (e.g. "1", "2"), "correctAnswer": string, "options": string[] (correctAnswer plus 2-3 distractors, in any order) }
  ]
}`;

export async function POST(request: NextRequest) {
  const identifier = request.headers.get("x-forwarded-for") ?? "anonymous";
  const rateLimit = checkRateLimit(identifier);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: `Too many requests. Please try again in ${rateLimit.retryAfterSeconds} seconds.` },
      { status: 429 }
    );
  }

  const body: GenerateRequestBody = await request.json();
  const { code, difficulty, mode } = body;

  if (!code || !code.trim()) {
    return NextResponse.json(
      { error: "No code provided." },
      { status: 400 }
    );
  }

  if (mode !== "Bug-Fix" && mode !== "Fill-in-the-Blank") {
    return NextResponse.json(
      { error: "Invalid or missing mode." },
      { status: 400 }
    );
  }

  const systemPrompt = mode === "Fill-in-the-Blank" ? FITB_SYSTEM_PROMPT : BUGFIX_SYSTEM_PROMPT;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const result = await model.generateContent(
      `${systemPrompt}\n\nDifficulty: ${difficulty}\n\nCode:\n${code}`
    );

    const text = result.response.text();
    const generated = JSON.parse(text);

    return NextResponse.json({ ...generated, difficulty, mode });
  } catch (error) {
    console.error("Gemini generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate challenge." },
      { status: 500 }
    );
  }
}