// Launch readiness of the site itself (docs/security.md covers headers).

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

const launch = new Date(/new Date\("([^"]+)"\)/.exec(read("src/lib/launchDate.js"))[1]);
const launched = Date.now() >= launch.getTime();

test("APP_STORE_URL is either not set yet or a real App Store listing", (t) => {
  const url = /export const APP_STORE_URL = ([^;]+);/.exec(read("src/lib/appStore.js"))[1].trim();
  if (url === "null") {
    // Allowed on purpose (owner decision, 2026-09-25): without a listing,
    // every download action offers the waitlist instead of the badge, so a
    // late App Store approval never shows a dead button.
    if (launched) t.diagnostic("launched without APP_STORE_URL: download actions show the waitlist");
    return;
  }
  assert.match(url, /^"https:\/\/apps\.apple\.com\/[a-z]{2}\/app\/[^"]*id\d+"$|^"https:\/\/apps\.apple\.com\/app\/id\d+"$/);
});

test("download actions: official badge with a listing, waitlist without, never a disabled button", () => {
  const source = read("src/components/download/DownloadAction.jsx");
  assert.match(source, /if \(APP_STORE_URL\)/);
  assert.match(source, /Coming soon to the App Store/);
  assert.match(source, /<WaitlistForm/);
  assert.doesNotMatch(source, /disabled(=|\s*\/?>)/, "no disabled download button");
  const badge = read("public/badges/download-on-the-app-store-black-en-us.svg");
  assert.match(badge, /Download_on_the_App_Store_Badge/, "the badge file must stay Apple's original");
});

test("no screenshot with a test account's name anywhere (dashboard-fresh.png)", () => {
  assert.ok(!existsSync(new URL("../public/screenshots/dashboard-fresh.png", import.meta.url)));
  const src = new URL("../src/", import.meta.url);
  for (const f of readdirSync(src, { recursive: true }).filter((x) => /\.(jsx?|html)$/.test(x))) {
    assert.doesNotMatch(readFileSync(new URL(f.replaceAll("\\", "/"), src), "utf8"), /\/screenshots\/dashboard-fresh/, f);
  }
  assert.doesNotMatch(read("index.html"), /\/screenshots\/dashboard-fresh/);
});

test("sharing a link shows a proper preview", () => {
  const html = read("index.html");
  for (const tag of ['name="description"', 'property="og:title"', 'property="og:description"', 'property="og:image"', 'name="twitter:card"']) {
    assert.ok(html.includes(tag), tag);
  }
  const image = /property="og:image" content="https:\/\/strivis\.app\/([^"]+)"/.exec(html)?.[1];
  assert.ok(image && existsSync(new URL(`../public/${image}`, import.meta.url)), `public/${image} missing`);
});
