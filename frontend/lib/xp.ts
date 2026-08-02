// lib/xp.ts
//
// Shared XP/leveling formulas. Used by both the write side (grade-submission
// route, awarding XP after a graded submission) and the read side
// (ProfileSummary, displaying progress toward the next level). Keeping this
// in one place avoids the two ever silently disagreeing.
//
// PLACEHOLDER FORMULA: level * 250 XP needed per level. No specific design
// rationale behind this number yet — flagged as open to changing later once
// there's a better sense of how fast XP accumulates in practice.

export function xpForNextLevel(level: number): number {
  return level * 250;
}