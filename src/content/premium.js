// Free vs Premium, as the app actually gates it (strivis repo). Only what the
// code shows; no prices — they come from the App Store and vary by country.
// Keep in sync with the app's paywall list (en.json settings.premiumFeatures).
export const FREE_FEATURES = [
  // WorkoutPlans.jsx / PlanEditor.jsx: building your own plans isn't gated.
  "Your own training plans, as many as you like",
  // ActiveWorkout.jsx, Exercises.jsx (history, estimated 1RM): not gated.
  "Workout logging with full history and PR detection",
  // AddFood.jsx: text search is free, only the barcode scanner is Premium.
  "Nutrition logging by food search",
  // WorkoutPlans.jsx: aiAvailable = isPremium || !aiTrialUsed ("AI plan (1x free)").
  "One AI-generated training plan to try",
  // exerciseDb.js + public/exercises/exercises.json (601 entries).
  "All 601 exercises, offline after a one-time download",
  // Progress.jsx (progress photos), SettingsAccount.jsx exportAllData (CSV).
  "Progress photos and a data export",
];

export const PREMIUM_FEATURES = [
  // WorkoutPlans.jsx:79 + backend aiEntitlement (premium has a daily cap, so
  // not "unlimited" here).
  "More AI training plans, whenever you want a new one",
  // PlanLibrary.jsx:34 openPaywall; backend serves program content to premium only.
  "The Plan Library: Starting Strength, Push Pull Legs, 5/3/1",
  // AddFood.jsx:489 — the scan button opens the paywall without Premium.
  "Barcode scanner for nutrition",
  // Progress.jsx:894-907, en.json progress.advancedAnalyticsLocked.
  "Advanced analytics: 1RM trend per exercise and training frequency over 8 weeks",
];

// premiumPlans.js ids (monthly, yearly, lifetime); en.json settings.demoNotice.
export const PREMIUM_BILLING = "Monthly, yearly or a one-time lifetime purchase. Prices in the App Store.";
