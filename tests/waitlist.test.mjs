// The launch waitlist request (src/lib/waitlist.js), shared by the
// countdown and every download action while APP_STORE_URL is not set.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { joinWaitlist, WAITLIST_CONSENT_ERROR, WAITLIST_CONSENT_TEXT } from "../src/lib/waitlist.js";

const fakeFetch = (status, calls = []) => async (url, init) => {
  calls.push({ url, init });
  return { ok: status >= 200 && status < 300, status };
};

test("waitlist: posts email, source, honeypot and the consent flags to the backend's endpoint", async () => {
  const calls = [];
  const result = await joinWaitlist({ email: "  a@b.co ", website: "", source: "home_hero", consent: true }, { fetchImpl: fakeFetch(201, calls) });
  assert.deepEqual(result, { ok: true });
  assert.match(calls[0].url, /\/api\/waitlist$/);
  assert.equal(calls[0].init.method, "POST");
  const body = JSON.parse(calls[0].init.body);
  assert.equal(body.email, "a@b.co");
  assert.equal(body.source, "home_hero");
  assert.equal(body.website, "");
  // The backend answers 400 without both (18+ and the launch-email consent).
  assert.equal(body.adult, true);
  assert.equal(body.consent, true);
});

test("waitlist: nothing is sent until the consent box is ticked", async () => {
  for (const consent of [undefined, false, "true", 1]) {
    const calls = [];
    const result = await joinWaitlist({ email: "a@b.co", source: "s", consent }, { fetchImpl: fakeFetch(201, calls) });
    assert.deepEqual(result, { error: WAITLIST_CONSENT_ERROR, field: "consent" }, String(consent));
    assert.equal(calls.length, 0, `${consent}: no request without consent`);
  }
  assert.match(WAITLIST_CONSENT_ERROR, /18 or older/);
});

test("waitlist: the consent text is the approved wording (wireframe 5a)", () => {
  assert.equal(WAITLIST_CONSENT_TEXT, "I'm 18 or older and want the launch email. You'll get one email to confirm. Unsubscribe any time.");
});

test("WaitlistForm: required checkbox bound to its label, 44 px target, Privacy link, error announced", () => {
  const form = readFileSync(new URL("../src/components/download/WaitlistForm.jsx", import.meta.url), "utf8");
  assert.match(form, /type="checkbox"/);
  assert.match(form, /\{WAITLIST_CONSENT_TEXT\}/, "the label shows the shared consent text");
  assert.equal((form.match(/htmlFor=\{consentId\}/g) || []).length, 2, "text label and tap-area label both point at the box");
  assert.match(form, /id=\{consentId\}/);
  assert.match(form, /h-11 w-11/, "44 px tap area around the box");
  assert.match(form, /aria-required="true"/);
  assert.match(form, /role="alert"/);
  assert.match(form, /to="\/datenschutz"[^>]*>\s*Privacy\s*</);
  assert.match(form, /consent \}\)/, "the ticked state is passed to joinWaitlist");
  assert.match(form, /Check your inbox to confirm\./);
  // The Meta Lead event only after the backend accepted the address, and
  // only through an already loaded (consented) pixel.
  assert.match(form, /if \(result\.ok\) \{[\s\S]*?window\.fbq\?\.\("track", "Lead"\)/);
  assert.equal((form.match(/fbq/g) || []).length, 1);
  // The honeypot stays.
  assert.match(form, /name="website"[\s\S]*?tabIndex=\{-1\}[\s\S]*?aria-hidden="true"/);
});

test("waitlist: readable errors for invalid input, rate limit and failures", async () => {
  const input = { email: "x", source: "s", consent: true };
  assert.match((await joinWaitlist(input, { fetchImpl: fakeFetch(400) })).error, /valid email/);
  assert.match((await joinWaitlist(input, { fetchImpl: fakeFetch(429) })).error, /Too many attempts/);
  assert.match((await joinWaitlist(input, { fetchImpl: fakeFetch(500) })).error, /went wrong/);
  const offline = async () => {
    throw new TypeError("network");
  };
  assert.match((await joinWaitlist(input, { fetchImpl: offline })).error, /went wrong/);
});

test("waitlist: every source tag fits the backend's pattern", async () => {
  const { readFileSync, readdirSync } = await import("node:fs");
  const src = new URL("../src/", import.meta.url);
  const tags = new Set();
  for (const f of readdirSync(src, { recursive: true }).filter((x) => x.endsWith(".jsx"))) {
    const text = readFileSync(new URL(f.replaceAll("\\", "/"), src), "utf8");
    for (const m of text.matchAll(/source(?:=|: )"([^"]+)"/g)) tags.add(m[1]);
  }
  assert.ok(tags.size >= 1, "no waitlist source tag found");
  for (const tag of tags) assert.match(tag, /^[A-Za-z0-9_.-]{1,50}$/, tag);
});
