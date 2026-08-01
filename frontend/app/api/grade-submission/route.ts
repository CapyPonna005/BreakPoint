// app/api/grade-submission/route.ts
//
// Real AI code grading via Gemini. Evaluates a user's submitted fix against
// the original problem (correctness + style + explanation), mirroring the
// same architecture as generate-challenge/route.ts and
// generate-challenge-from-image/route.ts (rate limiting, Gemini client,
// forced JSON output).

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { checkRateLimit } from "@/lib/rateLimit";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Keep this in sync with data/problems.ts's Problem type.
// Only the fields the grader actually needs are required here.
interface GradingProblem {
  title: string;
  description: string;
  constraints?: string[];
  examples?: { input: string; output: string }[];
  starterCode: string; // the original buggy code, for reference
}

interface GradeSubmissionRequestBody {
  submittedCode: string;
  language: string;
  problem: GradingProblem;
}

// Shape returned to the client. Matches the existing ScoreCard/AIFeedbackCard
// prop contracts exactly (challenge/submittedAt are filled in client-side,
// not by the model):
//   ScoreCard: { challenge, score, testsPassed, testsTotal, submittedAt }
//   AIFeedbackCard: { feedback }
type NoteSeverity = "critical" | "suggestion";

interface GradeNote {
  severity: NoteSeverity; // "critical" = must fix (red), "suggestion" = optional improvement (yellow)
  text: string;
}

interface GradeResult {
  score: number; // 0-100
  testsPassed: number; // how many of the provided examples the fix actually satisfies
  testsTotal: number; // should equal problem.examples.length (clamped server-side below)
  feedback: string; // 1-2 sentence overall summary, shown above the bullet list
  notes: GradeNote[]; // bullet list: red "must change" items and yellow "suggestion" items
}

const SYSTEM_PROMPT = `You are a code reviewer grading a student's fix to a debugging challenge.

You will be given:
1. The original problem description and constraints
2. The ORIGINAL buggy starter code (for reference only — do not grade against this)
3. The example input/output pairs the fixed code should satisfy
4. The student's SUBMITTED code (their attempted fix)

Evaluate the submission on:
- Correctness: trace through EACH provided example by hand against the submitted code, and count how many actually produce the expected output
- Whether the original bug was actually fixed (not just changed or hidden)
- Code style: naming, clarity, avoiding unnecessary complexity (be reasonably lenient — this is a learning exercise, not production code review)
- Whether new bugs were introduced

Return STRICT JSON matching this shape, and nothing else:
{
  "score": <integer 0-100, holistic score factoring in both correctness and style>,
  "testsPassed": <integer, how many of the given examples the submitted code satisfies>,
  "testsTotal": <integer, total number of examples provided>,
  "feedback": "<one short sentence or two, overall summary — state plainly whether the bug is fixed>",
  "notes": [
    { "severity": "critical", "text": "<a correctness bug, broken example, or unfixed issue that MUST be changed>" },
    { "severity": "suggestion", "text": "<a style, naming, clarity, or minor improvement that's optional>" }
  ]
}

Rules on "notes":
- "critical" entries are ONLY for things that are actually wrong: failing examples, the original bug not fixed, new bugs introduced, broken logic. If the submission is fully correct, there should be ZERO critical notes.
- "suggestion" entries are for optional polish: naming, comments, minor style, alternative approaches. These are fine to include even on a perfect submission.
- Keep each note to one short sentence. Prefer 1-4 notes total, most relevant first. Don't pad with filler notes just to fill space.
- Order: any critical notes first, then suggestions.

Other rules:
- If every example passes and style is reasonable, score 85-100.
- If the bug is fixed but something else is subtly broken, testsPassed should reflect that (not all examples passing).
- If the bug was NOT fixed at all, testsPassed should be low/0 and score should be below 50.
- If no examples were provided, set testsTotal to 1 and testsPassed to 1 or 0 based on your own correctness judgment.
- Do not wrap the JSON in markdown code fences. Return raw JSON only.`;

export async function POST(request: NextRequest) {
  const identifier = request.headers.get("x-forwarded-for") ?? "anonymous";
  const rateLimitResult = checkRateLimit(identifier);
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: `Too many requests, try again in ${rateLimitResult.retryAfterSeconds} seconds` },
      { status: 429 }
    );
  }

  let body: GradeSubmissionRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { submittedCode, language, problem } = body;

  if (!submittedCode || submittedCode.trim().length === 0) {
    return NextResponse.json({ error: "submittedCode is required" }, { status: 400 });
  }
  if (!problem || !problem.title || !problem.starterCode) {
    return NextResponse.json({ error: "problem (with title + starterCode) is required" }, { status: 400 });
  }

  const userPrompt = `Language: ${language}

Problem: ${problem.title}
Description: ${problem.description}

Constraints:
${(problem.constraints ?? []).map((c) => `- ${c}`).join("\n") || "(none specified)"}

Examples:
${(problem.examples ?? []).map((e) => `Input: ${e.input}\nExpected Output: ${e.output}`).join("\n\n") || "(none specified)"}

Original buggy code (for reference only):
\`\`\`${language}
${problem.starterCode}
\`\`\`

Student's submitted code:
\`\`\`${language}
${submittedCode}
\`\`\``;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const result = await model.generateContent([
      { text: SYSTEM_PROMPT },
      { text: userPrompt },
    ]);

    const raw = result.response.text();
    const parsed: GradeResult = JSON.parse(raw);

    // Defensive clamping in case the model drifts outside expected ranges.
    parsed.score = Math.max(0, Math.min(100, Math.round(parsed.score)));
    const exampleCount = problem.examples?.length || 1;
    parsed.testsTotal = exampleCount;
    parsed.testsPassed = Math.max(0, Math.min(exampleCount, Math.round(parsed.testsPassed)));

    // Defend against the model returning an invalid severity or omitting notes.
    parsed.notes = Array.isArray(parsed.notes)
      ? parsed.notes
          .filter((n) => n && typeof n.text === "string" && n.text.trim().length > 0)
          .map((n) => ({
            severity: n.severity === "critical" ? "critical" : ("suggestion" as NoteSeverity),
            text: n.text,
          }))
      : [];

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("grade-submission error:", err);
    return NextResponse.json(
      { error: "Failed to grade submission. Please try again." },
      { status: 500 }
    );
  }
}