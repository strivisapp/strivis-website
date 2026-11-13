// German names for the exercises in ../exercises.js, as the app's catalog
// writes them (strivis/public/exercises/exercises.json `name_de`), and the
// app's German body-part labels (de.json exerciseLabels.bodyPart).
// tests/i18n.test.mjs checks the names against the catalog when the app repo
// sits next to this one.
export const EXERCISE_NAMES = {
  "bench-press": "Langhantel-Bankdrücken",
  squat: "Langhantel-Kniebeuge",
  deadlift: "Langhantel-Kreuzheben",
  "pull-up": "Klimmzug",
  ohp: "Langhantel-Schulterdrücken (OHP)",
  "push-up": "Push-Up",
  "kettlebell-swing": "Kettlebell-Swing",
  plank: "Plank",
};

export const AREAS = { Chest: "Brust", Legs: "Beine", Back: "Rücken", Shoulders: "Schultern", Core: "Rumpf" };
