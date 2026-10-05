// Free vs Premium, as the app actually gates it (strivis repo). Only what the
// code shows; no prices (they come from the App Store and vary by country)
// and no AI counts (the Premium quota is weekly and set on the server).
// Keep in sync with the app's paywall list (en.json premium.features) and
// the App Store description.
export const FREE_FEATURES = [
  // WorkoutPlans.jsx / PlanEditor.jsx: building your own plans isn't gated.
  "Your own training plans, as many as you like",
  // strivis-backend data/curatedPlans.json: tier "free" (content/plans.js).
  "Three programs from the Plan Library: First Rep, Comeback and Hold Strong",
  // ActiveWorkout.jsx, Exercises.jsx (history, estimated 1RM): not gated.
  "Workout logging with full history and PR detection",
  // AddFoodSheet.jsx: text search is free, only the barcode scanner is Premium.
  "Nutrition logging by food search",
  // strivis-backend lib/aiEntitlement.ts FREE_AI_GENERATIONS = 2 per kind.
  "Two AI tries each for training plans and recipes",
  // The exercise catalog (601 entries), cached on the device.
  "All 601 exercises, offline after a one-time download",
  // Progress.jsx (progress photos), SettingsAccount.jsx exportAllData (CSV).
  "Progress photos and a data export",
];

export const PREMIUM_FEATURES = [
  // lib/aiEntitlement.ts PREMIUM_WEEKLY_AI_GENERATIONS: a weekly quota, so
  // never "unlimited" here.
  "More AI training plans and recipes every week",
  // curatedPlans.json: tier "premium" (content/plans.js).
  "Eight more programs in the Plan Library",
  // AddFoodSheet.jsx: the scan button opens the paywall without Premium.
  "Barcode scanner for nutrition",
  // lib/analysisRange.js: 6 months, a year and all time, plus the plateau
  // and block comparison cards.
  "Progress over 6 months, a year or all time, with plateau detection and block comparison",
];

// The app's plans: lib/paywallOffer.js PLAN_ORDER (yearly, monthly, weekly).
export const PREMIUM_BILLING = "Weekly, monthly or yearly subscription. Prices in the App Store.";
