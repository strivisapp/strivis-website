// Real app screenshots (public/screenshots/, English UI), as WebP in two
// widths: `src` is 780 px wide (2x a 390 px phone), `src480` for small
// placements. Every file is 780 x 1688 (or 480 x 1039), so the frame can
// reserve the space before the image loads.
//
// All are iPhone captures, cropped to the frame's aspect with the iOS
// status bar (time, battery) painted over in the app's background, or faded
// out where a picture sits behind it: onboarding-focus-muscles,
// plan-preview, active-workout, exercise-library, exercise-detail and
// food-detail, dashboard, nutrition-day and progress-sets from 30 Sep 2026
// (the new app design). The *-dark.png files are older German captures and stay out of
// the English site. Order here is the gallery's order.
const shot = (name) => ({ src: `/screenshots/${name}.webp`, src480: `/screenshots/${name}-480.webp` });

export const SCREEN_WIDTH = 780;
export const SCREEN_HEIGHT = 1688;

export const SCREENSHOTS = [
  {
    ...shot("dashboard"),
    title: "Home",
    caption: "Today's workout, quick adds for water and meals, and your rings for the week and the day.",
    alt: "The Strivis home screen after today's workout: Strong, 2 min with 1,560 kg volume and a View summary button, +250 ml and Meal buttons, rings for 1 of 5 workouts this week, 2,107 kcal left and 1.5 L water, and the week strip",
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
    alt: "The Nutrition screen for today: 2,107 kcal left of 3,560, protein, carbs and fat against their goals, water at 1.5 of 3.5 L, a creatine check-off and breakfast at 1,453 kcal",
  },
  {
    ...shot("food-detail"),
    title: "Food",
    caption: "Calories and macros per portion, against your daily goal.",
    alt: "Adding Banana, raw to lunch: 100 g, 97 kcal with 0.7 g protein, 22.7 g carbs and 0.3 g fat, the day's protein, carbs and fat against their goals, and nutrition facts per 100 g",
  },
  {
    ...shot("progress-sets"),
    title: "Progress",
    caption: "Sets per muscle this week against your plan, and how well you judge your effort.",
    alt: "The Progress tab: sets per muscle this week against the plan, chest at 2 of 14 sets, and a card on how well you estimate RIR",
  },
];

export const screenshot = (title) => SCREENSHOTS.find((s) => s.title === title);
