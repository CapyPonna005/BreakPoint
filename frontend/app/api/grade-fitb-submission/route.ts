// app/api/grade-fitb-submission/route.ts
//
// Grades a Fill-in-the-Blank submission. Unlike grade-submission/route.ts,
// this needs no AI call — the correct answers are already known at
// generation time. Scoring is a straightforward exact-match comparison.
//
// Security note: the correct answers are fetched fresh from Supabase here,
// NOT trusted from the client request. If we scored using answers the
// client sent, a user could just read them out of page state and always
// submit a perfect score.

import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";
import { createClient } from "@/lib/supabase/server";
import { xpForNextLevel } from "@/lib/xp";
import type { ProblemRow } from "@/data/problems";

type GradeFitbRequestBody = {
  problemId: string;
  selections: Record<string, string>; // blankId -> the option the user picked
};

type FeedbackNote = {
  severity: "critical" | "suggestion";
  text: string;
};

function xpForScore(score: number): number {
  return Math.round(score / 10);
}

export async function POST(request: NextRequest) {
  const identifier = request.headers.get("x-forwarded-for") ?? "anonymous";
  const rateLimitResult = checkRateLimit(identifier);
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: `Too many requests, try again in ${rateLimitResult.retryAfterSeconds} seconds` },
      { status: 429 }
    );
  }

  let body: GradeFitbRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { problemId, selections } = body;

  if (!problemId) {
    return NextResponse.json({ error: "problemId is required" }, { status: 400 });
  }
  if (!selections || typeof selections !== "object") {
    return NextResponse.json({ error: "selections is required" }, { status: 400 });
  }

  const supabase = await createClient();

  // Fetch the authoritative problem (including correct answers) directly —
  // never trust correctness data coming from the client.
  const { data: row, error: fetchError } = await supabase
    .from("problems")
    .select("id, mode, blanks")
    .eq("id", problemId)
    .single<Pick<ProblemRow, "id" | "mode" | "blanks">>();

  if (fetchError || !row) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  if (row.mode !== "Fill-in-the-Blank" || !row.blanks || row.blanks.length === 0) {
    return NextResponse.json(
      { error: "This problem has no fill-in-the-blank data" },
      { status: 400 }
    );
  }

  const blanks = row.blanks;
  const testsTotal = blanks.length;
  let testsPassed = 0;
  const notes: FeedbackNote[] = [];

  for (const blank of blanks) {
    const picked = selections[blank.id];
    const correct = picked === blank.correctAnswer;
    if (correct) {
      testsPassed += 1;
    } else {
      notes.push({
        severity: "critical",
        text: picked
          ? `Blank ${blank.id}: you selected "${picked}", but the correct answer was "${blank.correctAnswer}".`
          : `Blank ${blank.id} was left unanswered. Correct answer: "${blank.correctAnswer}".`,
      });
    }
  }

  const score = Math.round((testsPassed / testsTotal) * 100);
  const feedback =
    testsPassed === testsTotal
      ? "All blanks filled in correctly. Nicely done."
      : `${testsPassed} of ${testsTotal} blanks correct.`;

  const result = { score, testsPassed, testsTotal, feedback, notes };

  // Persist + award XP, mirroring grade-submission/route.ts's pattern.
  // submitted_code stores the selections as a JSON string since there's no
  // free-form code submission in this mode — reuses the existing column
  // rather than adding a new one.
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error: insertError } = await supabase.from("submissions").insert({
        user_id: user.id,
        problem_id: problemId,
        submitted_code: JSON.stringify(selections),
        language: "Fill-in-the-Blank",
        score,
        tests_passed: testsPassed,
        tests_total: testsTotal,
        feedback,
        notes,
      });

      if (insertError) {
        console.error("Failed to save FITB submission:", insertError);
      }

      try {
        const { data: profile, error: profileFetchError } = await supabase
          .from("profiles")
          .select("xp, level")
          .eq("id", user.id)
          .single();

        if (profileFetchError || !profile) {
          console.error("Failed to fetch profile for XP award:", profileFetchError);
        } else {
          const earned = xpForScore(score);
          let xp = (profile.xp ?? 0) + earned;
          let level = profile.level ?? 1;

          while (xp >= xpForNextLevel(level)) {
            xp -= xpForNextLevel(level);
            level += 1;
          }

          const { error: profileUpdateError } = await supabase
            .from("profiles")
            .update({ xp, level })
            .eq("id", user.id);

          if (profileUpdateError) {
            console.error("Failed to update XP/level:", profileUpdateError);
          }
        }
      } catch (err) {
        console.error("Unexpected error awarding XP:", err);
      }
    } else {
      console.error("No authenticated user — FITB submission graded but not saved.");
    }
  } catch (err) {
    console.error("Unexpected error saving FITB submission:", err);
  }

  return NextResponse.json(result);
}