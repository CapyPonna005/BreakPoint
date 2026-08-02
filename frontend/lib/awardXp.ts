// lib/awardXp.ts
//
// Shared XP-award logic. Used by both grade-submission/route.ts (Bug-Fix)
// and grade-fitb-submission/route.ts (Fill-in-the-Blank) after a submission
// is successfully graded, so both modes accumulate XP/levels identically.
// Extracted to avoid the two routes drifting apart, same reasoning as the
// FloatingField.tsx and lib/xp.ts extractions earlier in the project.
//
// Returns before/after xp+level state so the client can show an XP-earned
// popup (progress bar fill, level-up celebration) instead of the award
// happening invisibly. Returns null if the award couldn't be applied —
// callers should treat that as "no popup to show", not as a hard failure;
// grading itself already succeeded by this point.

import { xpForNextLevel } from "@/lib/xp";
import { createClient } from "@/lib/supabase/server";

// Every graded submission awards XP scaled by score, regardless of mode or
// pass/fail — no passing threshold. Matches the common practice-app pattern
// of reinforcing attempts, not just wins.
function xpForScore(score: number): number {
  return Math.round(score / 10);
}

export type XpAwardResult = {
  earned: number;
  beforeXp: number;
  beforeLevel: number;
  afterXp: number;
  afterLevel: number;
  leveledUp: boolean;
};

export async function awardXp(userId: string, score: number): Promise<XpAwardResult | null> {
  const supabase = await createClient();

  try {
    const { data: profile, error: profileFetchError } = await supabase
      .from("profiles")
      .select("xp, level")
      .eq("id", userId)
      .single();

    if (profileFetchError || !profile) {
      console.error("Failed to fetch profile for XP award:", profileFetchError);
      return null;
    }

    const beforeXp = profile.xp ?? 0;
    const beforeLevel = profile.level ?? 1;

    const earned = xpForScore(score);
    let xp = beforeXp + earned;
    let level = beforeLevel;

    while (xp >= xpForNextLevel(level)) {
      xp -= xpForNextLevel(level);
      level += 1;
    }

    const { error: profileUpdateError } = await supabase
      .from("profiles")
      .update({ xp, level })
      .eq("id", userId);

    if (profileUpdateError) {
      console.error("Failed to update XP/level:", profileUpdateError);
      return null;
    }

    return {
      earned,
      beforeXp,
      beforeLevel,
      afterXp: xp,
      afterLevel: level,
      leveledUp: level > beforeLevel,
    };
  } catch (err) {
    console.error("Unexpected error awarding XP:", err);
    return null;
  }
}