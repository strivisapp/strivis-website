// The curated programs in the app's Plan Library (a Premium feature). Source
// of truth is strivis-backend/data/curatedPlans.json — the app no longer
// bundles them (strivis/src/lib/curatedPlans.js). It has exactly these three:
// starting_strength (beginner, 3 days), ppl (intermediate, 6 days) and
// five_three_one (advanced, 4 days), each four weeks long. Update this list
// together with that file. `trainDays` is only how the card lays the
// sessions out over a week; the programs themselves just number their days.
export const PLANS = [
  { key: "starting_strength", name: "Starting Strength", level: "Beginner", weeks: 4, trainDays: [0, 2, 4] },
  { key: "ppl", name: "Push Pull Legs", level: "Intermediate", weeks: 4, trainDays: [0, 1, 2, 3, 4, 5] },
  { key: "five_three_one", name: "5/3/1 Strength Focus", level: "Experienced", weeks: 4, trainDays: [0, 1, 3, 4] },
];

export const planAnchor = (key) => `plan-${key.replace(/_/g, "-")}`;
