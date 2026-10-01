// Shared app links (strivis.app/u/<handle>, strivis.app/p/<post id>): iOS opens
// them in the app (Universal Links, public/.well-known/apple-app-site-association);
// without the app the site shows only an "open in the app" page that echoes
// nothing from the URL, and search engines are told not to index them.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

test("the app claims profile and post links", () => {
  const aasa = JSON.parse(read("public/.well-known/apple-app-site-association"));
  const paths = aasa.applinks.details.flatMap((d) => d.paths);
  assert.ok(paths.includes("/u/*"));
  assert.ok(paths.includes("/p/*"));
});

test("profile and post links are noindex", () => {
  const vercel = JSON.parse(read("vercel.json"));
  for (const source of ["/u/(.*)", "/p/(.*)"]) {
    const rule = vercel.headers.find((h) => h.source === source);
    assert.ok(rule, source);
    assert.ok(rule.headers.some((h) => h.key === "X-Robots-Tag" && h.value === "noindex"), source);
  }
});

test("both fall back to the open-in-app page, which shows nothing from the URL", () => {
  const app = read("src/App.jsx");
  assert.match(app, /<Route path="\/u\/\*" element=\{<OpenInApp \/>\} \/>/);
  assert.match(app, /<Route path="\/p\/\*" element=\{<OpenInApp kind="post" \/>\} \/>/);
  const page = read("src/pages/OpenInApp.jsx");
  assert.doesNotMatch(page, /useParams|useLocation|location\.pathname/);
  assert.match(page, /This post lives in the app\./);
});
