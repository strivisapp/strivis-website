// Copy rules for the home page: Free vs Premium comes from the app's real
// gating (src/content/premium.js), the counts on the page match the Plan
// Library and the exercise catalog, no price is ever hard-coded (prices vary
// by country and come from the App Store), and the reviews and the founder
// note are real text from their content files.

import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { FREE_FEATURES, PREMIUM_FEATURES, PREMIUM_BILLING } from "../src/content/premium.js";
import * as premiumDe from "../src/content/de/premium.js";
import { PLANS } from "../src/content/plans.js";
import { EXERCISE_COUNT, PREVIEW_EXERCISES } from "../src/content/exercises.js";
import { REVIEWS, reviewDate } from "../src/content/reviews.js";
import { FOUNDER, FOUNDER_PHOTO } from "../src/content/founder.js";
import en from "../src/i18n/en.js";
import de from "../src/i18n/de.js";

const PRICE = /[€$£]\s?\d|\d+[.,]\d{2}\s?(€|\$|£|EUR|USD)|\b\d+[.,]\d{2}\b/;

test("Free vs Premium: both columns filled, the same length in both languages, billing points to the App Store", () => {
  assert.equal(FREE_FEATURES.length, premiumDe.FREE_FEATURES.length);
  assert.equal(PREMIUM_FEATURES.length, premiumDe.PREMIUM_FEATURES.length);
  assert.ok(FREE_FEATURES.length >= 3 && PREMIUM_FEATURES.length >= 3);
  assert.match(PREMIUM_BILLING, /Prices in the App Store/);
  assert.match(premiumDe.PREMIUM_BILLING, /Preise im App Store/);
  for (const line of [...FREE_FEATURES, ...PREMIUM_FEATURES, PREMIUM_BILLING]) assert.doesNotMatch(line, PRICE, line);
});

test("Free vs Premium: the real limits (backend: 5 photos in total free, 15 a day Premium, 2 AI tries each)", () => {
  assert.ok(FREE_FEATURES.some((f) => /5 meals from a photo/.test(f)));
  assert.ok(FREE_FEATURES.some((f) => /Two AI tries each for plans and recipes/.test(f)));
  assert.ok(PREMIUM_FEATURES.some((f) => /Up to 15 meals a day from a photo/.test(f)));
  assert.ok(premiumDe.FREE_FEATURES.some((f) => /5 Mahlzeiten per Foto/.test(f)));
  assert.ok(premiumDe.PREMIUM_FEATURES.some((f) => /Bis zu 15 Mahlzeiten am Tag per Foto/.test(f)));
  // Achievements, the challenge and the watch are free, never Premium.
  assert.ok(FREE_FEATURES.some((f) => /All achievements, the monthly challenge and Apple Watch/.test(f)));
  assert.ok(!PREMIUM_FEATURES.some((f) => /achievement|challenge|year review|strength level|watch/i.test(f)));
});

test("Premium is never called unlimited, and no AI count is promised (the quota is weekly)", () => {
  for (const line of [...PREMIUM_FEATURES, ...premiumDe.PREMIUM_FEATURES]) {
    assert.doesNotMatch(line, /unlimited|unbegrenzt/i, line);
    if (/\bAI\b|KI/.test(line)) assert.doesNotMatch(line, /\d/, line);
  }
});

test("program and exercise counts on the page match the Plan Library and the catalog", () => {
  const free = PLANS.filter((p) => p.tier === "free").length;
  const premium = PLANS.filter((p) => p.tier === "premium").length;
  assert.equal(free, 3);
  assert.equal(premium, 8);
  assert.ok(FREE_FEATURES.includes(`${free} programs from the plan library`));
  assert.ok(PREMIUM_FEATURES.includes(`${premium} more programs`));
  assert.ok(premiumDe.FREE_FEATURES.includes(`${free} Programme aus der Plan-Bibliothek`));
  assert.ok(premiumDe.PREMIUM_FEATURES.includes(`${premium} weitere Programme`));
  assert.match(en.plans.paths[0].body, new RegExp(`^${PLANS.length} programs`));
  assert.match(de.plans.paths[0].body, new RegExp(`^${PLANS.length} Programme`));
  assert.ok(FREE_FEATURES.includes(`All ${EXERCISE_COUNT} exercises, offline`));
  assert.ok(en.hero.facts.includes(`${EXERCISE_COUNT} exercises`));
  assert.ok(de.hero.facts.includes(`${EXERCISE_COUNT} Übungen`));
});

test("no hard-coded prices in the home page's components, content or texts (both languages)", () => {
  for (const dir of ["src/components/home", "src/content", "src/i18n"]) {
    for (const file of readdirSync(new URL(`../${dir}`, import.meta.url), { recursive: true })) {
      if (!/\.(jsx?|mjs)$/.test(file)) continue;
      const text = readFileSync(new URL(`../${dir}/${file.replaceAll("\\", "/")}`, import.meta.url), "utf8");
      assert.doesNotMatch(text, /[€£]\s?\d|\$\d|\d\s?€/, `${dir}/${file}`);
    }
  }
});

test("reviews: exactly the three picked, verbatim, five stars, from the German App Store", () => {
  assert.deepEqual(
    REVIEWS.map((r) => [r.author, r.title, r.lang, r.rating, r.store]),
    [
      ["FlorianTra", "Best Gym App for Tracking Progress!", "en", 5, "App Store DE"],
      ["YasaminMns", "Everything fitness in one place!", "en", 5, "App Store DE"],
      ["DerWeise_", "Super App fürs Training und Tracking!", "de", 5, "App Store DE"],
    ]
  );
  assert.equal(REVIEWS[0].text, "Super easy to use, with great features for tracking calories, workouts, and progress.");
  // Only the positive sentence of this one (owner's choice).
  assert.equal(REVIEWS[1].text, "Super helpful having everything from workouts and training plans to nutrition and progress tracking all in one place.");
  assert.equal(REVIEWS[2].text, "Besonders gut gefällt mir das moderne Design und wie unkompliziert sich das Training planen und dokumentieren lässt.");
  assert.deepEqual(REVIEWS.map((r) => r.date), ["2026-11-03", "2026-10-16", "2026-10-13"]);
  assert.equal(reviewDate("2026-11-03", "en"), "3 Nov 2026");
  assert.equal(reviewDate("2026-10-16", "de"), "16. Okt. 2026");
});

test("founder note: Simon's final text in both languages, signed, and one swappable photo file", () => {
  assert.equal(FOUNDER.en.signature, "Simon, founder of Strivis");
  assert.equal(FOUNDER.de.signature, "Simon, Gründer von Strivis");
  for (const lang of ["en", "de"]) {
    const words = FOUNDER[lang].paragraphs.join(" ").split(/\s+/).length;
    assert.ok(words >= 80 && words <= 120, `${lang}: ${words} words`);
    assert.doesNotMatch(FOUNDER[lang].paragraphs.join(" "), /lorem|ipsum|TODO|TBD|placeholder|\[.*\]|—/i);
  }
  assert.equal(FOUNDER_PHOTO.src, "/founder/founder.webp");
  assert.ok(existsSync(new URL(`../public${FOUNDER_PHOTO.src}`, import.meta.url)), "the photo slot file exists");
});

test("exercise preview: 6-8 exercises, each with a self-hosted image", () => {
  assert.ok(PREVIEW_EXERCISES.length >= 6 && PREVIEW_EXERCISES.length <= 8);
  for (const ex of PREVIEW_EXERCISES) {
    assert.ok(ex.name && ex.area, ex.id);
    assert.match(ex.image, /^\/exercises\/[a-z0-9-]+\.webp$/);
    const file = new URL(`../public${ex.image}`, import.meta.url);
    assert.ok(existsSync(file), `public${ex.image} missing`);
    assert.ok(readFileSync(file).length < 200 * 1024, `public${ex.image} over 200 KB`);
  }
});

// The app repo is a sibling checkout on Simon's machine, not in CI. Its
// committed catalog counts, not a working tree in the middle of a change
// (the 1.1.1 catalog cleanup); the file itself when git is not available.
const appCatalog = ["../../strivis/public/exercises/exercises.json", "../../../strivis/public/exercises/exercises.json"]
  .map((p) => new URL(p, import.meta.url))
  .find((u) => existsSync(u));

test("exercise names and the count match the app's catalog", (t) => {
  if (!appCatalog) return t.skip("app repo (strivis) not found next to this one");
  const repo = fileURLToPath(new URL("../..", appCatalog));
  let raw;
  try {
    raw = execFileSync("git", ["-C", repo, "show", "HEAD:public/exercises/exercises.json"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    raw = readFileSync(appCatalog, "utf8");
  }
  const catalog = JSON.parse(raw);
  assert.equal(catalog.exercises.length, EXERCISE_COUNT, `the site says ${EXERCISE_COUNT} exercises`);
  const byId = new Map(catalog.exercises.map((e) => [e.id, e]));
  for (const ex of PREVIEW_EXERCISES) {
    assert.ok(byId.get(ex.id), `${ex.id} is not in the app's catalog`);
    assert.equal(ex.name, byId.get(ex.id).name_en, ex.id);
  }
});
