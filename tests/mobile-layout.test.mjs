// Phone layout guards. WebKit (Safari and every browser on iOS) sizes an
// implicit grid column from its items' intrinsic width, so a grid holding
// screenshots needs named columns on phones and cells that may shrink, or
// the cells run past the screen edge and the page scrolls sideways
// (strivis.app on an iPhone 15 Pro, 2026-10-16).

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

test("features bento: one named column on phones, every cell may shrink", () => {
  const source = read("src/components/home/Features.jsx");
  assert.match(source, /<ul className="[^"]*\bgrid grid-cols-1\b/);
  assert.match(source, /<Bezel as="li" className=\{cn\("min-w-0", className\)\}/);
  const progress = /<Bezel as="li" className="([^"]*)" coreClassName="([^"]*)"/.exec(source);
  assert.ok(progress, "progress cell found");
  assert.match(progress[1], /\bmin-w-0\b/);
  assert.match(progress[2], /\bgrid grid-cols-1\b/);
});
