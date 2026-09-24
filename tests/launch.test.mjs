// Launch readiness of the site itself (docs/security.md covers headers).

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

test("from launch day on, the download buttons need the real App Store link", () => {
  const launch = new Date(/new Date\("([^"]+)"\)/.exec(read("src/lib/launchDate.js"))[1]);
  const url = /export const APP_STORE_URL = ([^;]+);/.exec(read("src/lib/appStore.js"))[1].trim();
  if (Date.now() < launch.getTime()) return; // still the countdown page
  assert.notEqual(url, "null", "set APP_STORE_URL in src/lib/appStore.js — every CTA is disabled without it");
  assert.match(url, /^"https:\/\/apps\.apple\.com\/[a-z]{2}\/app\/[^"]*id\d+"$|^"https:\/\/apps\.apple\.com\/app\/id\d+"$/);
});

test("sharing a link shows a proper preview", () => {
  const html = read("index.html");
  for (const tag of ['name="description"', 'property="og:title"', 'property="og:description"', 'property="og:image"', 'name="twitter:card"']) {
    assert.ok(html.includes(tag), tag);
  }
  const image = /property="og:image" content="https:\/\/strivis\.app\/([^"]+)"/.exec(html)?.[1];
  assert.ok(image && existsSync(new URL(`../public/${image}`, import.meta.url)), `public/${image} missing`);
});
