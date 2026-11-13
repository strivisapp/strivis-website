// Real app screenshots (public/screenshots/, English UI), as WebP in two
// widths: `src` is 780 px wide (2x a 390 px phone), `src480` for small
// placements. Every file is 780 x 1688 (or 480 x 1039), so the frame can
// reserve the space before the image loads.
//
// All are iPhone captures, cropped to the frame's aspect with the iOS
// status bar (time, battery) painted over in the app's background, or faded
// out where a picture sits behind it, all from 30 Sep 2026 (the new app
// design). Only the screens the site shows: the hero and /links
// (active-workout), Training (exercise-detail), Progress and /links
// (dashboard, nutrition-day, progress-sets).
const shot = (name) => ({ id: name, src: `/screenshots/${name}.webp`, src480: `/screenshots/${name}-480.webp` });

export const SCREEN_WIDTH = 780;
export const SCREEN_HEIGHT = 1688;

export const SCREENSHOTS = [
  {
    ...shot("dashboard"),
    title: "Home",
    alt: "The Strivis home screen after today's workout: Strong, 2 min with 1,560 kg volume and a View summary button, +250 ml and Meal buttons, rings for 1 of 5 workouts this week, 2,107 kcal left and 1.5 L water, and the week strip",
  },
  {
    ...shot("active-workout"),
    title: "Workout",
    alt: "An active workout on Barbell Bench Press, exercise 1 of 8: two warm-up sets of 80 kg x 8 and 100 kg x 5, working sets of 125 kg x 7 and 125 kg x 6 at RIR 2, and a 2:24 rest timer",
  },
  {
    ...shot("exercise-detail"),
    title: "Execution",
    alt: "Concentration Curl with illustrated start and end positions, biceps and brachialis, dumbbell, beginner, and five numbered steps under How to do it",
  },
  {
    ...shot("nutrition-day"),
    title: "Nutrition",
    alt: "The Nutrition screen for today: 2,107 kcal left of 3,560, protein, carbs and fat against their goals, water at 1.5 of 3.5 L, a creatine check-off and breakfast at 1,453 kcal",
  },
  {
    ...shot("progress-sets"),
    title: "Progress",
    alt: "The Progress tab: sets per muscle this week against the plan, chest at 2 of 14 sets, and a card on how well you estimate RIR",
  },
];

// By English title (the pre-launch page, src/pages/ComingSoon.jsx).
export const screenshot = (title) => SCREENSHOTS.find((s) => s.title === title);

// By file name, from a list in either language (src/i18n/en.js and de.js
// carry SCREENSHOTS with their own titles and alt texts).
export const shotById = (list, id) => list.find((s) => s.id === id);
