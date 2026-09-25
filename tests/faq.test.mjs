// The FAQ is grouped (src/content/faq.js); nothing may get lost on the way.

import { test } from "node:test";
import assert from "node:assert/strict";
import { FAQ_GROUPS, FAQ_ITEMS } from "../src/content/faq.js";

// Every question the site answered before it was grouped. "Can I delete my
// account again?" was merged into "How is my data handled?" (launch
// redesign, audit item W28); its answer lives on there.
const QUESTIONS = [
  "Is Strivis free?",
  "What devices does Strivis run on?",
  "How is my data handled?",
  "Can I build my own training plan?",
  "Does the exercise database work offline?",
  "What if I train on more than one device?",
  "Where does the nutrition data come from?",
];

test("FAQ: three titled groups, none empty", () => {
  assert.equal(FAQ_GROUPS.length, 3);
  for (const g of FAQ_GROUPS) {
    assert.ok(g.id && g.title, "group needs an id and a title");
    assert.ok(g.items.length > 0, `${g.title} is empty`);
  }
});

test("FAQ: the groups contain every question, each exactly once", () => {
  const asked = FAQ_ITEMS.map((i) => i.q);
  for (const q of QUESTIONS) assert.equal(asked.filter((a) => a === q).length, 1, q);
  assert.equal(new Set(asked).size, asked.length, "duplicate question");
  for (const i of FAQ_ITEMS) assert.ok(i.a.trim().length > 0, `${i.q} has no answer`);
});

test("FAQ: the privacy answer still links the privacy policy and covers account deletion", () => {
  const item = FAQ_ITEMS.find((i) => i.q === "How is my data handled?");
  assert.equal(item.link?.to, "/datenschutz");
  assert.match(item.a, /delete your account/i, "the merged deletion answer must stay in it");
});

test("FAQ: no prices — they vary by country and come from the App Store", () => {
  for (const i of FAQ_ITEMS) assert.doesNotMatch(i.a, /[€$£]|\d+[.,]\d{2}/, i.q);
});
