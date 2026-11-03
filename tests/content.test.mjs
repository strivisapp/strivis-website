// Launch copy rules for the home page: Free vs Premium comes from the app's
// real gating (src/content/premium.js), and no price is ever hard-coded —
// prices vary by country and come from the App Store.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { FREE_FEATURES, PREMIUM_FEATURES, PREMIUM_BILLING } from "../src/content/premium.js";

const PRICE = /[€$£]\s?\d|\d+[.,]\d{2}\s?(€|\$|£|EUR|USD)|\b\d+[.,]\d{2}\b/;

test("Free vs Premium: both columns filled, billing points to the App Store", () => {
  assert.ok(FREE_FEATURES.length >= 3);
  assert.ok(PREMIUM_FEATURES.length >= 3);
  assert.match(PREMIUM_BILLING, /App Store/);
  for (const line of [...FREE_FEATURES, ...PREMIUM_FEATURES, PREMIUM_BILLING]) assert.doesNotMatch(line, PRICE, line);
});

test("Premium is never called unlimited (the app caps AI plans per day)", () => {
  for (const line of PREMIUM_FEATURES) assert.doesNotMatch(line, /unlimited/i, line);
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

test("founder story: hidden while empty, and never placeholder text", async () => {
  const { FOUNDER_STORY, FOUNDER_SIGNATURE } = await import("../src/content/founder.js");
  assert.equal(typeof FOUNDER_STORY, "string");
  assert.doesNotMatch(`${FOUNDER_STORY} ${FOUNDER_SIGNATURE}`, /lorem|ipsum|TODO|TBD|placeholder|\[.*\]/i);
  const component = readFileSync(new URL("../src/components/home/FounderStory.jsx", import.meta.url), "utf8");
  assert.match(component, /if \(paragraphs\.length === 0\) return null;/, "FounderStory must render nothing without a story");
});

test("app 1.1: achievements are free, food photo numbers as in the backend, photos are no longer 'not there yet'", async () => {
  assert.ok(FREE_FEATURES.some((f) => /All 76 achievements/.test(f)));
  assert.ok(FREE_FEATURES.some((f) => /Five meals from a photo/.test(f)));
  assert.ok(PREMIUM_FEATURES.some((f) => /Up to 15 meals a day from a photo/.test(f)));
  assert.ok(!PREMIUM_FEATURES.some((f) => /achievement|challenge|year review|strength level/i.test(f)));
  const { default: en } = await import("../src/i18n/en.js");
  const { default: de } = await import("../src/i18n/de.js");
  for (const t of [en, de]) {
    assert.ok(!t.straight.notYet.some((i) => /photo|foto/i.test(i.title)));
    assert.equal(t.features.more.length, 6);
  }
  assert.doesNotMatch(JSON.stringify(en.straight.solid), /not from estimates/);
  assert.doesNotMatch(JSON.stringify(de.straight.solid), /nicht aus Schätzungen/);
});
