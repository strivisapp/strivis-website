import { FeatureChapter } from "@/components/home/FeatureChapter";

const CHAPTERS = [
  {
    id: "features",
    eyebrow: "AI Training Plans",
    headline: "Built for you. Not the crowd.",
    body: "Tell it your goal, your level, your equipment. The AI builds a plan around that — not a generic program that fits no one in particular.",
    image: "/screenshots/plan-detail-fresh.png",
    imageAlt: "An AI-generated training plan with exercises, sets and reps",
    align: "left",
    focus: "30% 25%",
  },
  {
    id: "workout-logging",
    eyebrow: "Workout Logging",
    headline: "Every set counts. No notepad.",
    body: "Weight, reps, effort — logged in seconds. Automatic rest timer, real-time PR detection, your last session always one glance away.",
    image: "/screenshots/active-workout-fresh.png",
    imageAlt: "An active workout with logged sets, PR detection and a rest timer",
    align: "right",
    focus: "70% 30%",
  },
  {
    id: "nutrition",
    eyebrow: "Nutrition",
    headline: "Logged. Not guessed.",
    body: "Scan a barcode or search real food data — OpenFoodFacts and USDA, no estimates. Calories and macros, right in front of you.",
    image: "/screenshots/nutrition-confirm-fresh.png",
    imageAlt: "Nutrition logging with calorie and macro rings and a nutrition label",
    align: "center",
    focus: "50% 15%",
  },
  {
    id: "progress",
    eyebrow: "Progress",
    headline: "See what moved. In black and white.",
    body: "Training volume, personal records, muscle-group balance — all in one place, built from your actual training data.",
    image: "/screenshots/progress-records-fresh.png",
    imageAlt: "Progress view with training volume, personal records and muscle groups",
    align: "left",
    focus: "50% 35%",
  },
];

export function Features() {
  return (
    <>
      {CHAPTERS.map((c) => (
        <FeatureChapter key={c.id} {...c} />
      ))}
    </>
  );
}
