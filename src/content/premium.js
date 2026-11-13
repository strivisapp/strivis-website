// Free vs Premium on the home page, as the app actually gates it (strivis
// repo), in the approved wireframe's words (2026-11-13). Only what the code
// shows; no prices (they come from the App Store and vary by country) and no
// AI plan counts for Premium (the quota is weekly and set on the server).
// Keep in sync with the app's paywall list (en.json premium.features) and
// the App Store description. German: ./de/premium.js, line for line.
export const FREE_FEATURES = [
  // WorkoutPlans.jsx / PlanEditor.jsx, ActiveWorkout.jsx: not gated.
  "Your own plans and workout logging, unlimited",
  // The exercise catalog (601 entries), cached on the device.
  "All 601 exercises, offline",
  // strivis-backend data/curatedPlans.json: tier "free" (content/plans.js).
  "3 programs from the plan library",
  // AddFoodSheet.jsx: search and barcode are free; strivis-backend
  // lib/foodPhoto.ts FREE_FOOD_PHOTOS = 5, period "total".
  "Nutrition with search and barcode, 5 meals from a photo",
  // docs/api/achievements.md, gamification decision: nothing gated; the
  // watch app has no Premium check.
  "All achievements, the monthly challenge and Apple Watch",
  // strivis-backend lib/aiEntitlement.ts FREE_AI_GENERATIONS = 2 per kind.
  "Two AI tries each for plans and recipes",
];

export const PREMIUM_FEATURES = [
  // lib/aiEntitlement.ts PREMIUM_WEEKLY_AI_GENERATIONS: a weekly quota, so
  // never "unlimited" here.
  "More AI plans and recipes every week",
  // curatedPlans.json: tier "premium" (content/plans.js).
  "8 more programs",
  // strivis-backend lib/foodPhoto.ts PREMIUM_FOOD_PHOTOS_PER_DAY = 15.
  "Up to 15 meals a day from a photo",
  // lib/adaptiveEnergy.js, settings.nutrition.adaptiveGoal (402 without Premium).
  "A calorie goal that adapts every week",
  // lib/analysisRange.js: 6 months, a year and all time.
  "Progress over 6 months, a year or all time",
];

// The app's plans: lib/paywallOffer.js PLAN_ORDER (yearly, monthly, weekly).
export const PREMIUM_BILLING = "Weekly, monthly or yearly. Prices in the App Store.";
