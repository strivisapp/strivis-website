// The Instagram link page (/links and /de/links, src/pages/Links.jsx;
// wireframe reports/linkseite-wireframe.html in the app repo, approved
// 2026-10-17): App Store first with Apple's campaign link, website and
// support, the legal pages labelled in both languages, no consent banner
// and no Meta Pixel.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import en from "../src/i18n/en.js";
import de from "../src/i18n/de.js";
import { LOCALIZED_PAGES, localizedPath } from "../src/i18n/lang.js";
import { PAGE_META } from "../src/lib/seo.js";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

test("links: both languages are real pages with their own title", () => {
  assert.ok(LOCALIZED_PAGES.includes("/links"));
  assert.equal(localizedPath("/links", "de"), "/de/links");
  assert.equal(PAGE_META["/links"].lang, "en");
  assert.equal(PAGE_META["/de/links"].lang, "de");
  const app = read("src/App.jsx");
  assert.match(app, /<Route path="\/links" element=\{<Links \/>\} \/>/);
  assert.match(app, /<Route path="\/de\/links" element=\{<Links \/>\} \/>/);
});

test("links: the App Store badge goes through the Instagram campaign link, German badge on German pages", () => {
  const store = read("src/lib/appStore.js");
  assert.match(store, /APP_STORE_INSTAGRAM_URL = "https:\/\/apps\.apple\.com\/app\/apple-store\/id6809217490\?pt=129416292&ct=instagram&mt=8"/);
  assert.match(read("src/pages/Links.jsx"), /<AppStoreBadge height=\{52\} href=\{APP_STORE_INSTAGRAM_URL\} \/>/);
  const badge = read("src/components/download/DownloadAction.jsx");
  assert.match(badge, /lang === "de" \? APP_STORE_BADGE_DE : APP_STORE_BADGE/);
  const svg = read("public/badges/download-on-the-app-store-black-de-de.svg");
  assert.match(svg, /Badge_DE/);
  assert.doesNotMatch(svg, /<script|javascript:|onload=/i);
});

test("links: Impressum, privacy and terms on both languages; website and support", () => {
  assert.deepEqual(en.links.legal.map((l) => l.to), ["/impressum", "/datenschutz", "/agb"]);
  assert.deepEqual(de.links.legal.map((l) => l.label), ["Impressum", "Datenschutz", "AGB"]);
  assert.deepEqual(en.links.legal.map((l) => l.label), ["Impressum", "Privacy", "Terms"]);
  assert.equal(de.links.support, "Support & Kontakt");
  assert.equal(en.links.support, "Support & contact");
});

test("links: no consent banner and no Meta Pixel there", () => {
  assert.match(read("src/lib/consent.js"), /PIXEL_BLOCKED_PATHS = \[[^\]]*"\/links", "\/de\/links"\]/);
  assert.match(read("src/components/ConsentBanner.jsx"), /NO_BANNER = \["\/oauth-native-callback", "\/links", "\/de\/links"\]/);
});

test("links: the privacy policy covers the link page and the Instagram profile", () => {
  const privacy = read("src/pages/Datenschutz.jsx");
  assert.match(privacy, /Link page\.<\/span> strivis\.app\/links/);
  assert.match(privacy, /heading: "Our Instagram profile"/);
  assert.match(privacy, /joint controllers \(Art\. 26 GDPR\) under Meta's Page Insights Controller Addendum/);
});
