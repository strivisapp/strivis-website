// A hand-copied subset of the app's exercise catalog (RepDB, 601 entries:
// strivis/public/exercises/exercises.json — `id`, `name_en` and
// `primary_muscles` as written there). Everything the site names as an
// exercise comes from here, and tests/plan-configurator.test.mjs checks each
// entry against the app's catalog when the app repo sits next to this one.
export const EXERCISE_COUNT = 601;

export const EXERCISES = {
  // No equipment
  "bodyweight-squat": { name: "Bodyweight Squat", muscle: "Gluteus maximus, Quadriceps" },
  "step-ups": { name: "Step Ups", muscle: "Gluteus maximus, Quadriceps" },
  "glute-bridge": { name: "Glute Bridge", muscle: "Gluteus maximus" },
  "bodyweight-reverse-lunge": { name: "Bodyweight Reverse Lunge", muscle: "Gluteus maximus, Quadriceps" },
  "push-up": { name: "Push-Up", muscle: "Pectoralis major, Triceps brachii" },
  "incline-push-ups": { name: "Incline Push-Up", muscle: "Pectoralis major" },
  "bodyweight-overhead-press": { name: "Bodyweight Overhead Press", muscle: "Anterior deltoid, Triceps brachii" },
  "bodyweight-lateral-raise": { name: "Bodyweight Lateral Raise", muscle: "Lateral deltoid" },
  superman: { name: "Superman", muscle: "Erector spinae, Gluteus maximus" },
  "reverse-plank": { name: "Reverse Plank", muscle: "Erector spinae, Gluteus maximus" },
  "bench-dips": { name: "Bench Dips", muscle: "Triceps brachii" },
  plank: { name: "Plank", muscle: "Rectus abdominis, Transverse abdominis" },
  "dead-bug": { name: "Dead Bug", muscle: "Rectus abdominis, Transverse abdominis" },
  burpees: { name: "Burpees", muscle: "Gluteus maximus, Pectoralis major, Quadriceps" },
  "mountain-climbers": { name: "Mountain Climbers", muscle: "Hip flexors, Rectus abdominis" },

  // At home: dumbbells and bands
  "db-squat": { name: "Dumbbell Squat", muscle: "Gluteus maximus, Quadriceps" },
  "bulgarian-split-squat": { name: "Bulgarian Split Squat", muscle: "Gluteus maximus, Quadriceps" },
  "dumbbell-romanian-deadlift": { name: "Dumbbell Romanian Deadlift", muscle: "Gluteus maximus, Hamstrings" },
  "db-lunge": { name: "Dumbbell Lunge", muscle: "Gluteus maximus, Quadriceps" },
  "dumbbell-floor-press": { name: "Dumbbell Floor Press", muscle: "Pectoralis major" },
  "dumbbell-shoulder-press": { name: "Dumbbell Shoulder Press", muscle: "Anterior deltoid, Lateral deltoid" },
  "lateral-raise": { name: "Dumbbell Lateral Raise", muscle: "Lateral deltoid" },
  "bent-over-db-row": { name: "Bent-Over Dumbbell Row", muscle: "Latissimus dorsi, Rhomboids" },
  "band-pull-apart": { name: "Band Pull Apart", muscle: "Posterior deltoid" },
  "bicep-curl": { name: "Dumbbell Bicep Curl", muscle: "Biceps brachii" },
  "close-grip-db-bench-press": { name: "Close-Grip Dumbbell Bench Press", muscle: "Triceps brachii" },

  // Gym
  squat: { name: "Barbell Back Squat", muscle: "Gluteus maximus, Quadriceps" },
  "leg-press": { name: "Leg Press", muscle: "Gluteus maximus, Quadriceps" },
  "romanian-deadlift": { name: "Romanian Deadlift", muscle: "Gluteus maximus, Hamstrings" },
  deadlift: { name: "Barbell Deadlift", muscle: "Erector spinae, Gluteus maximus, Hamstrings" },
  "bench-press": { name: "Barbell Bench Press", muscle: "Pectoralis major" },
  "incline-bench-press": { name: "Incline Barbell Bench Press", muscle: "Pectoralis major" },
  ohp: { name: "Barbell Overhead Press", muscle: "Anterior deltoid, Lateral deltoid" },
  "face-pull": { name: "Cable Face Pull", muscle: "Posterior deltoid, Rhomboids" },
  "lat-pulldown": { name: "Lat Pulldown", muscle: "Latissimus dorsi" },
  "seated-cable-row": { name: "Seated Cable Row", muscle: "Latissimus dorsi, Rhomboids" },
  "pull-up": { name: "Pull-Up", muscle: "Latissimus dorsi" },
  "cable-curl": { name: "Cable Curl", muscle: "Biceps brachii" },
  "close-grip-bench-press": { name: "Close-Grip Bench Press", muscle: "Triceps brachii" },
  "cable-crunch": { name: "Cable Crunch", muscle: "Rectus abdominis" },
  "kettlebell-swing": { name: "Kettlebell Swing", muscle: "Gluteus maximus, Hamstrings" },
};

// The exercise preview: RepDB illustrations as the app shows them, copied
// into public/exercises/ (same files the app serves from
// cdn.strivis.app/exercises/images/<id>-<start|peak|main>.webp — the site's
// CSP only allows its own images). `area` is the catalog's body_part.
export const PREVIEW_EXERCISES = [
  { id: "bench-press", area: "Chest" },
  { id: "squat", area: "Legs" },
  { id: "deadlift", area: "Back" },
  { id: "pull-up", area: "Back" },
  { id: "ohp", area: "Shoulders" },
  { id: "push-up", area: "Chest" },
  { id: "kettlebell-swing", area: "Legs" },
  { id: "plank", area: "Core" },
].map((e) => ({ ...e, ...EXERCISES[e.id], image: `/exercises/${e.id}.webp` }));
