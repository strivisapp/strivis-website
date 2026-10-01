import { EXERCISES } from "./exercises.js";

// The "try it" configurator's static example weeks. Hand-written, no AI and
// no network: the visitor's three choices pick a week template and an
// exercise per movement slot from the mapping below. The real plan is built
// in the app, by the AI, from more than these three answers (level, session
// length, body weight … — see WorkoutPlans.jsx in the app).
//
// Option ids and labels match the app's onboarding (Onboarding.jsx `goals`
// and `equipmentOptions`, en.json onboarding.options); the app offers five
// goals, the example shows three.

export const GOALS = [
  { id: "build_muscle", label: "Build muscle" },
  { id: "lose_weight", label: "Lose weight" },
  { id: "general_fitness", label: "General fitness" },
];

export const DAYS_PER_WEEK = [2, 3, 4, 5];

export const EQUIPMENT = [
  { id: "none", label: "No equipment" },
  { id: "home", label: "At home" },
  { id: "gym", label: "Gym" },
];

// One exercise per movement slot and equipment. `null` = no sensible
// exercise for that slot without equipment; the day just skips it.
const POOLS = {
  none: {
    squat: "bodyweight-squat",
    legs: "step-ups",
    hinge: "glute-bridge",
    lunge: "bodyweight-reverse-lunge",
    push: "push-up",
    push2: "incline-push-ups",
    overhead: "bodyweight-overhead-press",
    shoulders: "bodyweight-lateral-raise",
    pull: "superman",
    pull2: "reverse-plank",
    arms: null,
    triceps: "bench-dips",
    core: "plank",
    core2: "dead-bug",
    conditioning: "burpees",
  },
  home: {
    squat: "db-squat",
    legs: "bulgarian-split-squat",
    hinge: "dumbbell-romanian-deadlift",
    lunge: "db-lunge",
    push: "dumbbell-floor-press",
    push2: "push-up",
    overhead: "dumbbell-shoulder-press",
    shoulders: "lateral-raise",
    pull: "bent-over-db-row",
    pull2: "band-pull-apart",
    arms: "bicep-curl",
    triceps: "close-grip-db-bench-press",
    core: "dead-bug",
    core2: "plank",
    conditioning: "mountain-climbers",
  },
  gym: {
    squat: "squat",
    legs: "leg-press",
    hinge: "romanian-deadlift",
    lunge: "bulgarian-split-squat",
    push: "bench-press",
    push2: "incline-bench-press",
    overhead: "ohp",
    shoulders: "face-pull",
    pull: "lat-pulldown",
    pull2: "seated-cable-row",
    arms: "cable-curl",
    triceps: "close-grip-bench-press",
    core: "cable-crunch",
    core2: "plank",
    conditioning: "kettlebell-swing",
  },
};

const DAY = {
  fullA: { name: "Full body A", slots: ["squat", "push", "pull", "core"] },
  fullB: { name: "Full body B", slots: ["hinge", "overhead", "pull2", "lunge"] },
  fullC: { name: "Full body C", slots: ["legs", "push2", "pull", "core2"] },
  upperA: { name: "Upper body A", slots: ["push", "pull", "overhead", "pull2", "arms"] },
  lowerA: { name: "Lower body A", slots: ["squat", "hinge", "lunge", "core"] },
  upperB: { name: "Upper body B", slots: ["push2", "pull2", "shoulders", "pull", "triceps"] },
  lowerB: { name: "Lower body B", slots: ["legs", "hinge", "lunge", "core2"] },
  upper: { name: "Upper body", slots: ["push", "pull", "overhead", "pull2", "arms"] },
  lower: { name: "Lower body", slots: ["squat", "hinge", "lunge", "core"] },
  push: { name: "Push", slots: ["push", "overhead", "push2", "shoulders", "triceps"] },
  pull: { name: "Pull", slots: ["pull", "pull2", "arms", "core2"] },
  legs: { name: "Legs", slots: ["legs", "hinge", "lunge", "core"] },
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TEMPLATES = {
  2: { days: [0, 3], split: ["fullA", "fullB"] },
  3: { days: [0, 2, 4], split: ["fullA", "fullB", "fullC"] },
  4: { days: [0, 1, 3, 4], split: ["upperA", "lowerA", "upperB", "lowerB"] },
  5: { days: [0, 1, 2, 4, 5], split: ["upper", "lower", "push", "pull", "legs"] },
};

// Sets × reps per goal; "lose weight" ends each session with a short
// conditioning finisher.
const SCHEME = {
  build_muscle: { sets: "4 × 8-12", finisher: false },
  lose_weight: { sets: "3 × 12-15", finisher: true },
  general_fitness: { sets: "3 × 10-12", finisher: false },
};

// Held positions are done for time, not reps.
const HOLDS = new Set(["plank", "reverse-plank"]);

const exercise = (id, sets) => ({ id, name: EXERCISES[id].name, muscle: EXERCISES[id].muscle, sets: HOLDS.has(id) ? "3 × 30-45 s" : sets });

// Returns the example week for one combination, or null if a choice is unknown.
export function buildExampleWeek({ goal, days, equipment }) {
  const scheme = SCHEME[goal];
  const template = TEMPLATES[days];
  const pool = POOLS[equipment];
  if (!scheme || !template || !pool) return null;

  return template.split.map((key, i) => {
    const ids = DAY[key].slots.map((slot) => pool[slot]).filter(Boolean);
    const exercises = ids.map((id) => exercise(id, scheme.sets));
    if (scheme.finisher) exercises.push(exercise(pool.conditioning, "3 × 30 s"));
    return { weekday: WEEKDAYS[template.days[i]], name: DAY[key].name, exercises };
  });
}
