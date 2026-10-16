// German names for the exercises in ../exercises.js, as the app's catalog
// writes them (strivis/public/exercises/exercises.json `name_de`), and the
// app's German muscle and body-part labels (de.json exerciseLabels.muscle,
// exerciseLabels.bodyPart). tests/i18n.test.mjs checks the names against the
// catalog when the app repo sits next to this one.
export const EXERCISE_NAMES = {
  "bodyweight-squat": "Bodyweight Kniebeuge",
  "step-ups": "Step-Ups",
  "glute-bridge": "Glute Bridge",
  "bodyweight-reverse-lunge": "Ausfallschritt rückwärts (Körpergewicht)",
  "push-up": "Push-Up",
  "incline-push-ups": "Incline Push-Up",
  "bodyweight-overhead-press": "Bodyweight Overhead Press",
  "bodyweight-lateral-raise": "Körpergewicht Seitheben",
  superman: "Superman",
  "reverse-plank": "Reverse Plank",
  "bench-dips": "Bank-Dips",
  plank: "Plank",
  "dead-bug": "Dead Bug",
  burpees: "Burpees",
  "mountain-climbers": "Mountain Climbers",

  "db-squat": "Kurzhantel-Kniebeuge",
  "bulgarian-split-squat": "Bulgarische Kniebeuge",
  "dumbbell-romanian-deadlift": "Kurzhantel Rumänisches Kreuzheben",
  "db-lunge": "Kurzhantel-Ausfallschritt",
  "dumbbell-floor-press": "Kurzhantel Floor Press",
  "dumbbell-shoulder-press": "Kurzhantel Schulterdrücken",
  "lateral-raise": "Kurzhantel Seitheben",
  "bent-over-db-row": "Vorgebeugtes Kurzhantel-Rudern",
  "band-pull-apart": "Band-Pull-Apart",
  "bicep-curl": "Kurzhantel-Bizepscurl",
  "close-grip-db-bench-press": "Kurzhantel-Bankdrücken enger Griff",

  squat: "Langhantel-Kniebeuge",
  "leg-press": "Beinpresse",
  "romanian-deadlift": "Rumänisches Kreuzheben",
  deadlift: "Langhantel-Kreuzheben",
  "bench-press": "Langhantel-Bankdrücken",
  "incline-bench-press": "Schrägbankdrücken mit Langhantel",
  ohp: "Langhantel-Schulterdrücken (OHP)",
  "face-pull": "Kabel Face Pull",
  "lat-pulldown": "Latzug",
  "seated-cable-row": "Sitzendes Rudern am Kabelzug",
  "pull-up": "Klimmzug",
  "cable-curl": "Kabelzug-Curl",
  "close-grip-bench-press": "Bankdrücken enger Griff",
  "cable-crunch": "Kabelzug Crunch",
  "kettlebell-swing": "Kettlebell-Swing",
};

// Keyed by the English muscle names ../exercises.js uses.
export const MUSCLES = {
  "Pectoralis major": "Brust",
  "Anterior deltoid": "Vordere Schulter",
  "Lateral deltoid": "Seitliche Schulter",
  "Posterior deltoid": "Hintere Schulter",
  "Triceps brachii": "Trizeps",
  "Biceps brachii": "Bizeps",
  "Latissimus dorsi": "Lat",
  Rhomboids: "Oberer Rücken",
  "Erector spinae": "Unterer Rücken",
  "Rectus abdominis": "Bauch",
  "Transverse abdominis": "Tiefe Bauchmuskeln",
  Quadriceps: "Vorderer Oberschenkel",
  Hamstrings: "Hinterer Oberschenkel",
  "Gluteus maximus": "Gesäß",
  "Hip flexors": "Hüftbeuger",
};

export const AREAS = { Chest: "Brust", Legs: "Beine", Back: "Rücken", Shoulders: "Schultern", Core: "Rumpf" };

export const muscleLabel = (muscle) =>
  muscle
    .split(", ")
    .map((m) => MUSCLES[m] ?? m)
    .join(", ");
