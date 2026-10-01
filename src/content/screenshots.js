// Real app screenshots (public/screenshots/, English UI), as WebP in two
// widths: `src` is 780 px wide (2x a 390 px phone), `src480` for small
// placements. Every file is 780 x 1688 (or 480 x 1039), so the frame can
// reserve the space before the image loads.
//
// All are iPhone captures, cropped to the frame's aspect with the iOS
// status bar (time, battery) painted over in the app's background, or faded
// out where a picture sits behind it: onboarding-focus-muscles,
// plan-preview, active-workout, exercise-library, exercise-detail and
// food-detail from 30 Sep 2026 (the new app design); dashboard,
// nutrition-day and progress-records from 25 Sep 2026. The *-dark.png files are older German captures and stay out of
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
    ...shot("plan-preview"),
    title: "Plan",
    caption: "Programs built for muscle gain: days per week, time per workout, weeks and who each one is for.",
    alt: "The Golden Era Split plan: a five-day split for advanced lifters, 5 days per week, 65 minutes per workout, 8 weeks with a deload in week 8, and a Pick this plan button",
  },
  {
    ...shot("active-workout"),
    title: "Workout",
    caption: "Warm-up sets, then weight, reps and effort per set, with the rest timer running.",
    alt: "An active workout on Barbell Bench Press, exercise 1 of 8: two warm-up sets of 80 kg x 8 and 100 kg x 5, working sets of 125 kg x 7 and 125 kg x 6 at RIR 2, and a 2:24 rest timer",
  },
  {
    ...shot("exercise-library"),
    title: "Exercise library",
    caption: "601 exercises to search and filter by muscle and equipment.",
    alt: "The exercise library with a search field, filters for muscles and equipment, 601 exercises and a list starting with Ab Wheel Rollout, Air Bike and Archer Pull Ups",
  },
  {
    ...shot("exercise-detail"),
    title: "Execution",
    caption: "Start and end position with step-by-step instructions.",
    alt: "Concentration Curl with illustrated start and end positions, biceps and brachialis, dumbbell, beginner, and five numbered steps under How to do it",
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
    alt: "Adding Banana, raw to lunch: 100 g, 97 kcal with 0.7 g protein, 22.7 g carbs and 0.3 g fat, the day's protein, carbs and fat against their goals, and nutrition facts per 100 g",
  },
  {
    ...shot("progress-records"),
    title: "Progress",
    caption: "Personal records and how your training splits across muscle groups.",
    alt: "Progress view with a new record for Banded Chest Stretch, 20 kg x 10 with an estimated 1RM of 27 kg, and all sets on the chest in the muscle-group split",
  },
];

export const screenshot = (title) => SCREENSHOTS.find((s) => s.title === title);
