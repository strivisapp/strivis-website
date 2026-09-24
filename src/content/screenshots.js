// Real app screenshots (public/screenshots/, English UI). The *-dark.png
// files are older German captures and stay out of the English site.
export const SCREENSHOTS = [
  {
    src: "/screenshots/dashboard-fresh.png",
    title: "Home",
    caption: "Your week, your programs and the next workout, one tap away.",
    alt: "Strivis home screen with the week calendar, programs and the weekly training goal",
  },
  {
    src: "/screenshots/plan-detail-fresh.png",
    title: "Plan",
    caption: "Every training day of your plan, with sets and reps.",
    alt: "A Push Pull Legs plan day with Barbell Bench Press and Neutral Grip Pull Ups, 3 × 8-12 each",
  },
  {
    src: "/screenshots/active-workout-fresh.png",
    title: "Workout",
    caption: "Weight, reps and effort per set, with the rest timer running.",
    alt: "An active workout logging three sets of Barbell Bench Press with a 1:30 rest timer",
  },
  {
    src: "/screenshots/exercise-detail-fresh.png",
    title: "Exercise library",
    caption: "Target muscles, equipment and level for every exercise.",
    alt: "Exercise detail for Barbell Bench Press: primary and secondary muscles and equipment",
  },
  {
    src: "/screenshots/exercise-detail-execution-fresh.png",
    title: "Execution",
    caption: "Step-by-step instructions with start and end position.",
    alt: "Execution tab of an exercise with illustrated positions and step-by-step instructions",
  },
  {
    src: "/screenshots/nutrition-confirm-fresh.png",
    title: "Nutrition",
    caption: "Calories and macros per portion, against your daily goal.",
    alt: "Adding a food: amount in grams, calories and macros as rings, and a nutrition facts table",
  },
  {
    src: "/screenshots/progress-records-fresh.png",
    title: "Progress",
    caption: "Personal records and how your training splits across muscle groups.",
    alt: "Progress view with a new bench press record, estimated 1RM and muscle-group split",
  },
];

export const screenshot = (title) => SCREENSHOTS.find((s) => s.title === title);
