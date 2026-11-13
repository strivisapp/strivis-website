// The home page's FAQ: the six questions of the approved wireframe, the same
// in both languages, and an answer about data storage that says only what
// the privacy policy supports.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { FAQ_ITEMS } from "../src/content/faq.js";
import { FAQ_ITEMS as FAQ_DE } from "../src/content/de/faq.js";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

test("FAQ: the six questions, in order, each answered once", () => {
  assert.deepEqual(
    FAQ_ITEMS.map((i) => i.q),
    ["Is Strivis free?", "Do I need an Apple Watch?", "Does it work without a connection?", "Can I export or delete my data?", "Where is my data stored?", "How do I cancel Premium?"]
  );
  assert.deepEqual(
    FAQ_DE.map((i) => i.q),
    ["Ist Strivis kostenlos?", "Brauche ich eine Apple Watch?", "Geht es ohne Netz?", "Kann ich meine Daten exportieren oder löschen?", "Wo liegen meine Daten?", "Wie kündige ich Premium?"]
  );
  for (const i of [...FAQ_ITEMS, ...FAQ_DE]) assert.ok(i.a.trim().length > 0, `${i.q} has no answer`);
  assert.deepEqual(FAQ_DE.map((i) => i.link?.to ?? null), FAQ_ITEMS.map((i) => i.link?.to ?? null));
});

test("FAQ: where the data is stored, only as the privacy policy says it", () => {
  const policy = { en: read("src/pages/Datenschutz.jsx"), de: read("src/pages/de/Datenschutz.jsx") };
  // The policy's basis for "EU": Railway's European region, R2 in Europe.
  assert.match(policy.en, /Hosts the Strivis backend and its database in its European region/);
  assert.match(policy.en, /R2 storage located in Europe/);
  assert.match(policy.de, /Datenbank in seiner europäischen Region/);
  for (const [item, text] of [
    [FAQ_ITEMS[4], policy.en],
    [FAQ_DE[4], policy.de],
  ]) {
    assert.doesNotMatch(item.a, /\ball\b[^.]*\bEU\b|\balle\b[^.]*\bEU\b|only in the EU|nur in der EU/i, "never 'all in the EU'");
    for (const provider of ["Supabase", "RevenueCat", "Anthropic"]) {
      assert.ok(item.a.includes(provider), `${provider} named`);
      assert.ok(text.includes(provider), `${provider} is in the privacy policy`);
    }
    assert.equal(item.link?.to, "/datenschutz");
  }
  // The policy names them as outside the EEA, in the United States.
  assert.match(policy.en, /in the United States \(Supabase, Railway, Cloudflare, RevenueCat, Apple, Google, Anthropic/);
});

test("FAQ: no prices, they vary by country and come from the App Store", () => {
  for (const i of [...FAQ_ITEMS, ...FAQ_DE]) assert.doesNotMatch(i.a, /[€$£]|\d+[.,]\d{2}/, i.q);
});
