// The "try it" configurator (src/content/planExamples.js) and the exercise
// names the site shows (src/content/exercises.js).

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { GOALS, DAYS_PER_WEEK, EQUIPMENT, buildExampleWeek } from "../src/content/planExamples.js";
import { EXERCISES, EXERCISE_COUNT, PREVIEW_EXERCISES } from "../src/content/exercises.js";

const combinations = GOALS.flatMap((g) => DAYS_PER_WEEK.flatMap((d) => EQUIPMENT.map((e) => ({ goal: g.id, days: d, equipment: e.id }))));

test("configurator: every combination gives a full example week", () => {
  assert.equal(combinations.length, GOALS.length * DAYS_PER_WEEK.length * EQUIPMENT.length);
  for (const c of combinations) {
    const week = buildExampleWeek(c);
    const label = JSON.stringify(c);
    assert.ok(Array.isArray(week), label);
    assert.equal(week.length, c.days, `${label}: one session per training day`);
    assert.equal(new Set(week.map((d) => d.weekday)).size, c.days, `${label}: two sessions on one weekday`);
    for (const day of week) {
      assert.ok(day.name, label);
      assert.ok(day.exercises.length >= 3, `${label} ${day.name}: fewer than 3 exercises`);
      const ids = day.exercises.map((e) => e.id);
      assert.equal(new Set(ids).size, ids.length, `${label} ${day.name}: exercise twice in one session`);
      for (const ex of day.exercises) {
        assert.ok(EXERCISES[ex.id], `${label}: ${ex.id} is not in src/content/exercises.js`);
        assert.equal(ex.name, EXERCISES[ex.id].name);
        assert.ok(ex.sets, `${label}: ${ex.id} has no sets`);
      }
    }
  }
});

test("configurator: an unknown choice gives no week instead of a made-up one", () => {
  assert.equal(buildExampleWeek({ goal: "x", days: 3, equipment: "gym" }), null);
  assert.equal(buildExampleWeek({ goal: "build_muscle", days: 7, equipment: "gym" }), null);
  assert.equal(buildExampleWeek({ goal: "build_muscle", days: 3, equipment: "x" }), null);
});

test("configurator: 'no equipment' weeks only use exercises that need none", () => {
  const needsGear = /Dumbbell|Barbell|Cable|Kettlebell|Band|Machine|Leg Press|Pull-Up|Pulldown/;
  for (const c of combinations.filter((x) => x.equipment === "none")) {
    for (const day of buildExampleWeek(c)) for (const ex of day.exercises) assert.doesNotMatch(ex.name, needsGear, ex.name);
  }
});

test("exercise preview: 6-8 exercises, each with a self-hosted image", () => {
  assert.ok(PREVIEW_EXERCISES.length >= 6 && PREVIEW_EXERCISES.length <= 8);
  for (const ex of PREVIEW_EXERCISES) {
    assert.ok(ex.name && ex.muscle && ex.area, ex.id);
    assert.match(ex.image, /^\/exercises\/[a-z0-9-]+\.webp$/);
    const file = new URL(`../public${ex.image}`, import.meta.url);
    assert.ok(existsSync(file), `public${ex.image} missing`);
    assert.ok(readFileSync(file).length < 200 * 1024, `public${ex.image} over 200 KB`);
  }
});

// The app repo is a sibling checkout on Simon's machine, not in CI.
const appCatalog = ["../../strivis/public/exercises/exercises.json", "../../../strivis/public/exercises/exercises.json"]
  .map((p) => new URL(p, import.meta.url))
  .find((u) => existsSync(u));

test("exercise names match the app's catalog", (t) => {
  if (!appCatalog) return t.skip("app repo (strivis) not found next to this one");
  const catalog = JSON.parse(readFileSync(appCatalog, "utf8"));
  assert.equal(catalog.exercises.length, EXERCISE_COUNT, "the site says 601 exercises");
  const byId = new Map(catalog.exercises.map((e) => [e.id, e]));
  const pretty = (m) => m.charAt(0).toUpperCase() + m.slice(1).replace(/_/g, " ");
  for (const [id, ex] of Object.entries(EXERCISES)) {
    const real = byId.get(id);
    assert.ok(real, `${id} is not in the app's catalog`);
    assert.equal(ex.name, real.name_en, id);
    assert.equal(ex.muscle, real.primary_muscles.map(pretty).join(", "), id);
  }
});
