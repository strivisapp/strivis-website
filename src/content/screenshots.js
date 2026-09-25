// Real app screenshots (public/screenshots/, English UI), as WebP in two
// widths: `src` is 780 px wide (2x a 390 px phone), `src480` for small
// placements. Every file is 780 x 1688 (or 480 x 1039), so the frame can
// reserve the space before the image loads.
//
// The home screen capture (dashboard-fresh.png) showed a test account's
// name and was removed; it comes back once it is retaken with a neutral
// demo name. The *-dark.png files are older German captures and stay out of
// the English site.
const shot = (name) => ({ src: `/screenshots/${name}.webp`, src480: `/screenshots/${name}-480.webp` });

export const SCREEN_WIDTH = 780;
export const SCREEN_HEIGHT = 1688;

export const SCREENSHOTS = [
  {
    ...shot("plan-detail"),
    title: "Plan",
    caption: "Every training day of your plan, with sets and reps.",
    alt: "A Push Pull Legs plan day with Barbell Bench Press and Neutral Grip Pull Ups, 3 x 8-12 each",
  },
  {
    ...shot("active-workout"),
    title: "Workout",
    caption: "Weight, reps and effort per set, with the rest timer running.",
    alt: "An active workout logging three sets of Barbell Bench Press with a 1:30 rest timer",
  },
  {
    ...shot("exercise-detail"),
    title: "Exercise library",
    caption: "Target muscles, equipment and level for every exercise.",
    alt: "Exercise detail for Barbell Bench Press: primary and secondary muscles and equipment",
  },
  {
    ...shot("exercise-detail-execution"),
    title: "Execution",
    caption: "Step-by-step instructions with start and end position.",
    alt: "Execution tab of an exercise with illustrated positions and step-by-step instructions",
  },
  {
    ...shot("nutrition-confirm"),
    title: "Nutrition",
    caption: "Calories and macros per portion, against your daily goal.",
    alt: "Adding a food: amount in grams, calories and macros as rings, and a nutrition facts table",
  },
  {
    ...shot("progress-records"),
    title: "Progress",
    caption: "Personal records and how your training splits across muscle groups.",
    alt: "Progress view with a new bench press record, estimated 1RM and muscle-group split",
  },
];

export const screenshot = (title) => SCREENSHOTS.find((s) => s.title === title);
