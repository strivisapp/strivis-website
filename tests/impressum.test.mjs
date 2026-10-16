// The Impressum's data (src/content/impressum.js) and its links.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { IMPRESSUM, IMPRESSUM_PLACEHOLDER } from "../src/content/impressum.js";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const launch = new Date(/new Date\("([^"]+)"\)/.exec(read("src/lib/launchDate.js"))[1]);

test("Impressum: every required detail has a value (or a marked placeholder)", () => {
  for (const key of ["name", "street", "city", "country", "email", "responsible"]) {
    assert.ok(typeof IMPRESSUM[key] === "string" && IMPRESSUM[key].trim(), `IMPRESSUM.${key} is empty`);
  }
});

test("Impressum: no placeholders left from launch day on", () => {
  if (Date.now() < launch.getTime()) return; // expected until the owner fills them in
  for (const [key, value] of Object.entries(IMPRESSUM)) {
    if (value !== null) assert.doesNotMatch(value, IMPRESSUM_PLACEHOLDER, `fill in IMPRESSUM.${key} in src/content/impressum.js`);
  }
});

test("Impressum: routed, and linked from the countdown and the shared legal links", () => {
  assert.match(read("src/App.jsx"), /path="\/impressum"/);
  for (const dict of ["src/i18n/en.js", "src/i18n/de.js"]) assert.match(read(dict), /\{ to: "\/impressum", label: "Impressum" \}/, dict);
  assert.match(read("src/components/site/LegalLinks.jsx"), /t\.footer\.legal\.map/);
  assert.match(read("src/pages/ComingSoon.jsx"), /<LegalLinks/);
});
