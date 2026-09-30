// The page Brevo's double opt-in link leads to (BREVO_DOI_REDIRECT_URL in
// strivis-backend docs/runbooks/brevo.md): routed outside the launch gate,
// kept out of search results.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

test("newsletter confirmation: routed at /newsletter/confirmed, before the catch-all", () => {
  const app = read("src/App.jsx");
  const route = app.indexOf('path="/newsletter/confirmed"');
  assert.ok(route > 0, "route missing");
  assert.ok(route < app.indexOf('path="*"'), "must come before the catch-all route");
  assert.match(read("src/pages/NewsletterConfirmed.jsx"), /You're on the list/);
});

test("newsletter confirmation: noindex", () => {
  const vercel = JSON.parse(read("vercel.json"));
  const rule = vercel.headers.find((h) => h.source === "/newsletter/(.*)");
  assert.ok(rule, "no header rule for /newsletter/(.*)");
  assert.ok(rule.headers.some((h) => h.key === "X-Robots-Tag" && h.value === "noindex"));
});
