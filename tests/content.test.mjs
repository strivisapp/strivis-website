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

test("no hard-coded prices in the home page's components or content", () => {
  for (const dir of ["src/components/home", "src/content"]) {
    for (const file of readdirSync(new URL(`../${dir}`, import.meta.url))) {
      const text = readFileSync(new URL(`../${dir}/${file}`, import.meta.url), "utf8");
      assert.doesNotMatch(text, /[€£]\s?\d|\$\d/, `${dir}/${file}`);
    }
  }
});
