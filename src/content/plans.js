// The programs in the app's Plan Library. Source of truth is
// strivis-backend/data/curatedPlans.json (name_en, tier, levels,
// days_per_week); update this list together with that file. Three are free,
// eight are Premium. Own names only: no third-party program names.
export const PLANS = [
  { key: "first_rep", name: "First Rep", tier: "free", levels: ["beginner"], days: 3 },
  { key: "comeback", name: "Comeback", tier: "free", levels: ["beginner"], days: 2 },
  { key: "hold_strong", name: "Hold Strong", tier: "free", levels: ["beginner", "intermediate", "advanced"], days: 2 },
  { key: "build_phase", name: "Build Phase", tier: "premium", levels: ["intermediate"], days: 3 },
  { key: "upper_lower_standard", name: "Upper Lower Standard", tier: "premium", levels: ["intermediate"], days: 4 },
  { key: "push_pull_legs", name: "Push Pull Legs", tier: "premium", levels: ["intermediate", "advanced"], days: 6 },
  { key: "iron_and_mass", name: "Iron & Mass", tier: "premium", levels: ["intermediate", "advanced"], days: 4 },
  { key: "golden_era_split", name: "Golden Era Split", tier: "premium", levels: ["advanced"], days: 5 },
  { key: "arm_race", name: "Arm Race", tier: "premium", levels: ["advanced"], days: 4 },
  { key: "leg_legacy", name: "Leg Legacy", tier: "premium", levels: ["advanced"], days: 4 },
  { key: "express_45", name: "Express 45", tier: "premium", levels: ["intermediate"], days: 3 },
];

export const PREMIUM_PLANS = PLANS.filter((p) => p.tier === "premium");

// "advanced", "intermediate and up", "every level".
export function levelLabel(levels) {
  if (levels.length >= 3) return "every level";
  if (levels.length === 2) return `${levels[0]} and up`;
  return levels[0];
}

export const planAnchor = (key) => `plan-${key.replace(/_/g, "-")}`;
