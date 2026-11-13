// The exercise library on the home page: the catalog's size and a few real
// entries from it (strivis/public/exercises/exercises.json, RepDB: `id` and
// `name_en` as written there). tests/content.test.mjs checks each entry
// against the app's catalog when the app repo sits next to this one.
export const EXERCISE_COUNT = 601;

// RepDB illustrations as the app shows them, copied into public/exercises/
// (the same files the app serves from cdn.strivis.app; the site's CSP only
// allows its own images). `area` is the catalog's body_part.
export const PREVIEW_EXERCISES = [
  { id: "bench-press", name: "Barbell Bench Press", area: "Chest" },
  { id: "squat", name: "Barbell Back Squat", area: "Legs" },
  { id: "deadlift", name: "Barbell Deadlift", area: "Back" },
  { id: "pull-up", name: "Pull-Up", area: "Back" },
  { id: "ohp", name: "Barbell Overhead Press", area: "Shoulders" },
  { id: "push-up", name: "Push-Up", area: "Chest" },
  { id: "kettlebell-swing", name: "Kettlebell Swing", area: "Legs" },
  { id: "plank", name: "Plank", area: "Core" },
].map((e) => ({ ...e, image: `/exercises/${e.id}.webp` }));
