// Search basics (SEO audit, 2026-10-05): robots.txt and sitemap.xml are
// real files (the single-page app's rewrite answered both with the home
// page), every public route has its own title, description and canonical,
// and the app's handoff pages and unknown paths are noindex. The home page
// and the Free vs Premium copy promise only what the app does. Prerendering
// and the German pages: tests/i18n.test.mjs.

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { metaFor, PAGE_META, HOME_META } from "../src/lib/pageMeta.js";
import { appStructuredData, sitemapXml } from "../src/lib/seo.js";
import { FREE_FEATURES, PREMIUM_FEATURES } from "../src/content/premium.js";
import { PLANS, PREMIUM_PLANS, levelLabel } from "../src/content/plans.js";
import { FAQ_ITEMS } from "../src/content/faq.js";

const file = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

test("robots.txt allows crawling and names the sitemap", () => {
  const robots = file("public/robots.txt");
  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Sitemap: https:\/\/strivis\.app\/sitemap\.xml$/m);
  assert.doesNotMatch(robots, /Disallow: \/$/m);
});

// Generated at build time (scripts/prerender.mjs writes dist/sitemap.xml).
test("the sitemap lists exactly the public pages, in both languages", () => {
  const xml = sitemapXml();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.deepEqual(locs.sort(), Object.keys(PAGE_META).map((p) => `https://strivis.app${p === "/" ? "/" : p}`).sort());
  assert.ok(locs.includes("https://strivis.app/de") && locs.includes("https://strivis.app/de/support"));
  assert.match(xml, /xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml"/);
  assert.ok(!existsSync(new URL("../public/sitemap.xml", import.meta.url)), "public/sitemap.xml would go stale next to the generated one");
});

test("every public page: own title (at most 60 characters), description, self canonical", () => {
  const titles = new Set();
  for (const path of Object.keys(PAGE_META)) {
    const m = metaFor(path);
    assert.ok(m.title.length <= 60, `${path}: ${m.title.length}`);
    assert.ok(m.description.length >= 50 && m.description.length <= 160, `${path}: ${m.description.length}`);
    assert.equal(m.canonical, `https://strivis.app${path === "/" ? "/" : path}`);
    assert.equal(m.noindex, false, path);
    assert.ok(!titles.has(m.title), `duplicate title ${m.title}`);
    titles.add(m.title);
  }
  assert.equal(metaFor("/agb/").canonical, "https://strivis.app/agb", "trailing slash");
});

test("unknown paths and the app's own links are noindex, without a canonical", () => {
  for (const path of ["/login", "/premium", "/u/someone", "/p/123", "/newsletter/confirmed", "/oauth-native-callback"]) {
    const m = metaFor(path);
    assert.equal(m.noindex, true, path);
    assert.equal(m.canonical, null, path);
  }
  assert.equal(metaFor("/nope").title, "Page not found | Strivis");
  // Before launch an unknown path shows the countdown: home's text, noindex.
  assert.deepEqual([metaFor("/nope", { gated: true }).title, metaFor("/nope", { gated: true }).noindex], [HOME_META.title, true]);
});

test("index.html carries the home page's title and description; the app's structured data has no invented claims", () => {
  const html = file("index.html");
  assert.ok(html.includes(`<title>${HOME_META.title}</title>`));
  assert.ok(html.includes(`<meta name="description" content="${HOME_META.description}" />`));
  assert.match(html, /<!-- page-head:start[\s\S]*<!-- page-head:end -->/, "the block scripts/prerender.mjs replaces per page");
  for (const lang of ["en", "de"]) {
    const ld = appStructuredData(lang);
    assert.equal(ld["@type"], "MobileApplication");
    assert.equal(ld.operatingSystem, "iOS");
    assert.equal(ld.installUrl, "https://apps.apple.com/app/id6809217490");
    assert.equal(ld.downloadUrl, "https://apps.apple.com/app/id6809217490");
    assert.match(ld.image, /^https:\/\/strivis\.app\/[\w.-]+\.png$/);
    assert.ok(existsSync(new URL(`../public/${ld.image.split("/").pop()}`, import.meta.url)), ld.image);
    assert.equal(ld.aggregateRating, undefined, "no invented rating");
    assert.equal(ld.review, undefined, "no invented reviews");
    assert.equal(ld.offers.price, "0", "only the free download, no Premium prices");
  }
  assert.match(file("src/App.jsx"), /usePageMeta\(\{ gated \}\);/);
});

// ---------- Promises match the app ----------

const THIRD_PARTY = /Starting Strength|5\/3\/1|Wendler|Rippetoe|Heavy Duty|Olympia|Arnold|lifetime/i;

test("no third-party program names and no lifetime purchase anywhere on the site", () => {
  const sources = [
    ...FREE_FEATURES,
    ...PREMIUM_FEATURES,
    ...PLANS.map((p) => p.name),
    ...FAQ_ITEMS.map((i) => `${i.q} ${i.a}`),
    file("index.html"),
    file("src/pages/Agb.jsx"),
    file("src/i18n/en.js"),
    file("src/i18n/de.js"),
    file("src/content/de/faq.js"),
    file("src/content/de/premium.js"),
  ];
  for (const text of sources) assert.doesNotMatch(text, THIRD_PARTY, text.slice(0, 80));
});

test("the Plan Library: three free programs, eight Premium ones, as in the app's catalog", () => {
  assert.equal(PLANS.length, 11);
  assert.equal(PLANS.filter((p) => p.tier === "free").length, 3);
  assert.equal(PREMIUM_PLANS.length, 8);
  assert.ok(FREE_FEATURES.some((f) => /Three programs/.test(f) && PLANS.filter((p) => p.tier === "free").every((p) => f.includes(p.name))));
  assert.ok(PREMIUM_FEATURES.some((f) => /Eight more programs/.test(f)));
  assert.equal(levelLabel(["advanced"]), "advanced");
  assert.equal(levelLabel(["intermediate", "advanced"]), "intermediate and up");
  assert.equal(levelLabel(["beginner", "intermediate", "advanced"]), "every level");
});

test("AI: two free tries per kind, Premium more every week, never a number or 'unlimited'", () => {
  assert.ok(FREE_FEATURES.includes("Two AI tries each for training plans and recipes"));
  const ai = PREMIUM_FEATURES.find((f) => /AI/.test(f));
  assert.match(ai, /every week/);
  assert.doesNotMatch(ai, /\d|unlimited/i);
  const free = FAQ_ITEMS.find((i) => i.q === "Is Strivis free?").a;
  assert.match(free, /two AI tries each for training plans and recipes/);
  assert.doesNotMatch(free, /one free AI plan/);
});
