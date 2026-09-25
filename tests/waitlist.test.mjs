// The launch waitlist request (src/lib/waitlist.js), shared by the
// countdown and every download action while APP_STORE_URL is not set.

import { test } from "node:test";
import assert from "node:assert/strict";
import { joinWaitlist } from "../src/lib/waitlist.js";

const fakeFetch = (status, calls = []) => async (url, init) => {
  calls.push({ url, init });
  return { ok: status >= 200 && status < 300, status };
};

test("waitlist: posts email, source and honeypot to the backend's endpoint", async () => {
  const calls = [];
  const result = await joinWaitlist({ email: "  a@b.co ", website: "", source: "home_hero" }, { fetchImpl: fakeFetch(201, calls) });
  assert.deepEqual(result, { ok: true });
  assert.match(calls[0].url, /\/api\/waitlist$/);
  assert.equal(calls[0].init.method, "POST");
  const body = JSON.parse(calls[0].init.body);
  assert.equal(body.email, "a@b.co");
  assert.equal(body.source, "home_hero");
  assert.equal(body.website, "");
});

test("waitlist: readable errors for invalid input, rate limit and failures", async () => {
  assert.match((await joinWaitlist({ email: "x", source: "s" }, { fetchImpl: fakeFetch(400) })).error, /valid email/);
  assert.match((await joinWaitlist({ email: "x", source: "s" }, { fetchImpl: fakeFetch(429) })).error, /Too many attempts/);
  assert.match((await joinWaitlist({ email: "x", source: "s" }, { fetchImpl: fakeFetch(500) })).error, /went wrong/);
  const offline = async () => {
    throw new TypeError("network");
  };
  assert.match((await joinWaitlist({ email: "x", source: "s" }, { fetchImpl: offline })).error, /went wrong/);
});

test("waitlist: every source tag fits the backend's pattern", async () => {
  const { readFileSync, readdirSync } = await import("node:fs");
  const src = new URL("../src/", import.meta.url);
  const tags = new Set();
  for (const f of readdirSync(src, { recursive: true }).filter((x) => x.endsWith(".jsx"))) {
    const text = readFileSync(new URL(f.replaceAll("\\", "/"), src), "utf8");
    for (const m of text.matchAll(/source(?:=|: )"([^"]+)"/g)) tags.add(m[1]);
  }
  assert.ok(tags.size >= 4, [...tags].join(", "));
  for (const tag of tags) assert.match(tag, /^[A-Za-z0-9_.-]{1,50}$/, tag);
});
