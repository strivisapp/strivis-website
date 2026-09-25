// Real app screenshots (public/screenshots/, English UI), as WebP in two
// widths: `src` is 780 px wide (2x a 390 px phone), `src480` for small
// placements. Every file is 780 x 1688 (or 480 x 1039), so the frame can
// reserve the space before the image loads.
//
// dashboard, onboarding-focus-muscles, nutrition-day, food-detail and
// progress-records are iPhone captures (25 Sep 2026): cropped to the frame's
// aspect, with the iOS status bar (time, battery) painted over in the app's
// background. The *-dark.png files are older German captures and stay out of
// the English site. Order here is the gallery's order.
const shot = (name) => ({ src: `/screenshots/${name}.webp`, src480: `/screenshots/${name}-480.webp` });

export const SCREEN_WIDTH = 780;
export const SCREEN_HEIGHT = 1688;

export const SCREENSHOTS = [
  {
    ...shot("dashboard"),
    title: "Home",
    caption: "Today's workout, quick adds for water and meals, and your rings for the week and the day.",
    alt: "The Strivis home screen: today is day 1 of 6, Push, with Barbell Bench Press and Incline Dumbbell Press, a Start workout button, +250 ml and Meal buttons, and rings for workouts this week, kcal left and water",
  },
  {
    ...shot("onboarding-focus-muscles"),
    title: "Onboarding",
    caption: "Questions about your training, down to the muscle groups you want to focus on.",
    alt: "Onboarding question 6 of 10, Focus muscle groups?, with the chest selected on a front-view body figure",
  },
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
    ...shot("nutrition-day"),
    title: "Nutrition",
    caption: "Calories left, macros, water and supplements for the day.",
    alt: "The Nutrition screen for today: 2875 kcal left, rings for protein, carbs and fat, the macro split, micronutrients, water at 0.3 of 2.5 L and supplements",
  },
  {
    ...shot("food-detail"),
    title: "Food",
    caption: "Calories and macros per portion, against your daily goal.",
    alt: "Adding Banana, raw: 100 g selected, 97 kcal and its protein, carbs and fat as rings against the daily goal, and a nutrition facts table per 100 g",
  },
  {
    ...shot("progress-records"),
    title: "Progress",
    caption: "Personal records and how your training splits across muscle groups.",
    alt: "Progress view with a new record for Banded Chest Stretch, 20 kg x 10 with an estimated 1RM of 27 kg, and all sets on the chest in the muscle-group split",
  },
];

export const screenshot = (title) => SCREENSHOTS.find((s) => s.title === title);
