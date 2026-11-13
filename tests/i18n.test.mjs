// The German site and the prerendered pages (owner decision 2026-10-16,
// wireframe variant A): English at "/", German under "/de", both rendered
// from the same components with one dictionary per language (src/i18n/en.js,
// de.js), the switch remembers the choice, a German browser gets /de on
// arriving at the bare home address (owner decision 2026-11-13, website
// rebuild) while the switch's choice wins, and every indexable page ships as its own HTML with title, lang,
// canonical and hreflang (scripts/prerender.mjs). The dist/ checks run after
// `npm run build` (CI builds before testing) and skip otherwise.

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import en from "../src/i18n/en.js";
import de from "../src/i18n/de.js";
import {
  LANG_STORAGE_KEY,
  arrivalRedirect,
  langOfPath,
  preferredLang,
  localizedPath,
  readStoredLang,
  storeLang,
  switchPath,
} from "../src/i18n/lang.js";
import { FAQ_ITEMS as FAQ_EN } from "../src/content/faq.js";
import { FAQ_ITEMS as FAQ_DE } from "../src/content/de/faq.js";
import { PREVIEW_EXERCISES } from "../src/content/exercises.js";
import { EXERCISE_NAMES, AREAS } from "../src/content/de/exercises.js";
import { PAGE_META, metaFor, prerenderedPage, structuredDataFor } from "../src/lib/seo.js";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

// ---- Paths and the remembered choice ----------------------------------------

test("paths: German under /de, copyright and Impressum once, the switch goes to the same page", () => {
  assert.equal(langOfPath("/"), "en");
  assert.equal(langOfPath("/support/"), "en");
  assert.equal(langOfPath("/de"), "de");
  assert.equal(langOfPath("/de/support"), "de");
  assert.equal(langOfPath("/de/nope"), "de");
  assert.equal(langOfPath("/datenschutz"), "en", "privacy and terms have German twins");
  assert.equal(langOfPath("/agb"), "en");
  assert.equal(langOfPath("/de/datenschutz"), "de");
  assert.equal(langOfPath("/de/agb"), "de");
  assert.equal(langOfPath("/impressum"), null, "exists once");
  assert.equal(langOfPath("/copyright"), null, "exists once");
  assert.equal(langOfPath("/deutsch"), null, "only the /de segment, not a prefix of a word");

  assert.equal(switchPath("/", "de"), "/de");
  assert.equal(switchPath("/de", "en"), "/");
  assert.equal(switchPath("/support", "de"), "/de/support");
  assert.equal(switchPath("/de/support/", "en"), "/support");
  assert.equal(switchPath("/de/support", "de"), "/de/support");
  assert.equal(switchPath("/agb", "de"), "/de/agb");
  assert.equal(switchPath("/de/agb", "en"), "/agb");
  assert.equal(switchPath("/datenschutz", "de"), "/de/datenschutz");
  assert.equal(switchPath("/de/datenschutz/", "en"), "/datenschutz");
  assert.equal(switchPath("/impressum", "de"), "/impressum", "a page that exists once stays where it is");
  assert.equal(switchPath("/de/nope", "en"), "/");

  assert.equal(localizedPath("/datenschutz", "de"), "/de/datenschutz");
  assert.equal(localizedPath("/agb", "de"), "/de/agb");
  assert.equal(localizedPath("/datenschutz", "en"), "/datenschutz");
  assert.equal(localizedPath("/copyright", "de"), "/copyright");
  assert.equal(localizedPath("/support", "de"), "/de/support");
});

test("the choice is kept in localStorage and survives storage that throws", () => {
  const store = new Map();
  globalThis.localStorage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)) };
  assert.equal(readStoredLang(), null);
  storeLang("de");
  assert.equal(store.get(LANG_STORAGE_KEY), "de");
  assert.equal(readStoredLang(), "de");
  storeLang("fr");
  assert.equal(readStoredLang(), "de", "only known languages are stored");
  store.set(LANG_STORAGE_KEY, "<script>");
  assert.equal(readStoredLang(), null, "an unknown stored value is ignored");

  globalThis.localStorage = {
    getItem() {
      throw new Error("SecurityError");
    },
    setItem() {
      throw new Error("QuotaExceededError");
    },
  };
  assert.doesNotThrow(() => storeLang("de"));
  assert.equal(readStoredLang(), null);
  delete globalThis.localStorage;
  assert.equal(readStoredLang(), null, "no storage at all (prerendering in Node)");
});

test("language on arrival: the browser's first known language, only at the bare home address, the switch wins", () => {
  assert.equal(preferredLang(["de-DE", "en-US"]), "de");
  assert.equal(preferredLang(["de_AT"]), "de");
  assert.equal(preferredLang(["en-GB", "de"]), "en");
  assert.equal(preferredLang(["fr-FR", "de-CH", "en"]), "de", "the first language the site has");
  assert.equal(preferredLang(["fr", "es"]), null);
  assert.equal(preferredLang(undefined), null);

  // First arrival, no stored choice: German browsers go to /de.
  assert.equal(arrivalRedirect("/", { languages: ["de-DE", "en"] }), "/de");
  assert.equal(arrivalRedirect("/", { languages: ["en-US", "de"] }), null);
  assert.equal(arrivalRedirect("/", { languages: ["fr"] }), null, "English is the default");
  assert.equal(arrivalRedirect("/", {}), null);
  // The switch's remembered choice wins over the browser.
  assert.equal(arrivalRedirect("/", { stored: "en", languages: ["de-DE"] }), null);
  assert.equal(arrivalRedirect("/", { stored: "de", languages: ["en-US"] }), "/de");
  // Never a deep page, never the German pages themselves.
  for (const path of ["/support", "/datenschutz", "/agb", "/links", "/impressum", "/u/someone", "/de", "/de/support"]) {
    assert.equal(arrivalRedirect(path, { languages: ["de-DE"] }), null, path);
    assert.equal(arrivalRedirect(path, { stored: "de", languages: ["de-DE"] }), null, path);
  }
});

test("the redirect runs in the browser only: before React, from main.jsx, never by user agent or on the server", () => {
  const main = read("src/main.jsx");
  assert.match(main, /arrivalRedirect\(window\.location\.pathname, \{\s*stored: readStoredLang\(\),\s*languages: navigator\.languages/);
  assert.match(main, /window\.history\.replaceState/);
  assert.doesNotMatch(main, /storeLang/, "an automatic move is never remembered as a choice");
  const everywhere = ["src/main.jsx", "src/i18n/lang.js", "src/i18n/LanguageProvider.jsx", "src/App.jsx", "scripts/prerender.mjs", "vercel.json"].map(read).join(" ");
  assert.doesNotMatch(everywhere, /userAgent|user-agent|Googlebot|bingbot/i, "no user-agent sniffing");
  assert.doesNotMatch(read("vercel.json"), /accept-language/i, "no server-side language redirect");
  assert.doesNotMatch(read("scripts/prerender.mjs") + read("src/App.jsx"), /navigator\.language/, "the prerendered HTML never depends on the browser");
});

// ---- One set of components, two dictionaries -----------------------------------

function shape(value) {
  // Lines of a headline may differ in number (the German hero has three).
  if (Array.isArray(value)) return value.every((v) => typeof v === "string") ? "string[]" : value.map(shape);
  if (typeof value === "function") return "fn";
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map((k) => [k, shape(value[k])]));
  return typeof value;
}

test("German dictionary: exactly the keys of the English one", () => {
  assert.deepEqual(shape(de), shape(en));
  assert.equal(en.lang, "en");
  assert.equal(de.lang, "de");
});

test("German FAQ: the same number of questions and the same links as the English one", () => {
  assert.equal(FAQ_DE.length, FAQ_EN.length);
  assert.deepEqual(FAQ_DE.map((i) => i.link?.to ?? null), FAQ_EN.map((i) => i.link?.to ?? null));
});

// Every German string the site shows, for the copy rules below.
function strings(value, out = []) {
  if (typeof value === "string") out.push(value);
  else if (typeof value === "function") out.push(String(value("X", 1, "Y")));
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => strings(v, out));
  return out;
}

test("German copy: informal du, no em dashes, no emojis, no prices, no invented superlatives", () => {
  // "unbegrenzt" only where it is a fact: own plans and logging are not
  // gated in the app (content/premium.js); never for Premium or AI.
  const factual = new Set([de.pricing.freeFeatures[0]]);
  assert.match(de.pricing.freeFeatures[0], /^Eigene Pläne und Trainings loggen, unbegrenzt$/);
  const texts = strings(de).filter((s) => s !== "en" && s !== "de" && !factual.has(s));
  assert.ok(texts.length > 100);
  for (const s of texts) {
    assert.doesNotMatch(s, /—|\s–\s/, `dash: ${s}`);
    assert.doesNotMatch(s, /\p{Extended_Pictographic}/u, `emoji: ${s}`);
    assert.doesNotMatch(s, /\b(Sie|Ihnen|Ihre[mnrs]?)\b/, `formal address: ${s}`);
    assert.doesNotMatch(s, /[€$£]\s?\d|\d\s?€/, `price: ${s}`);
    assert.doesNotMatch(s, /\b(beste[nr]?|revolutionär|einzigartig|unbegrenzt)\b/i, `claim: ${s}`);
  }
  for (const s of strings(en)) assert.doesNotMatch(s, /—/, `dash: ${s}`);
});

test("German exercise library: a German name and area for every exercise the site shows", () => {
  assert.deepEqual(Object.keys(EXERCISE_NAMES).sort(), PREVIEW_EXERCISES.map((e) => e.id).sort());
  for (const ex of de.plans.library.preview) {
    assert.equal(ex.name, EXERCISE_NAMES[ex.id], ex.id);
    assert.ok(Object.values(AREAS).includes(ex.area), ex.id);
  }
});

const appCatalog = ["../../strivis/public/exercises/exercises.json", "../../../strivis/public/exercises/exercises.json"]
  .map((p) => new URL(p, import.meta.url))
  .find((u) => existsSync(u));

test("German exercise names match the app's catalog", (t) => {
  if (!appCatalog) return t.skip("app repo (strivis) not found next to this one");
  const byId = new Map(JSON.parse(readFileSync(appCatalog, "utf8")).exercises.map((e) => [e.id, e]));
  for (const [id, name] of Object.entries(EXERCISE_NAMES)) assert.equal(name, byId.get(id)?.name_de, id);
});

test("the language switch: real links, 44 px targets, both places of the approved design", () => {
  const sw = read("src/components/site/LanguageSwitch.jsx");
  assert.match(sw, /<Link[\s\S]*?hrefLang=\{item\.code\}/);
  assert.equal((sw.match(/\bh-11\b/g) || []).length, 2, "segmented and text variants are both 44 px high");
  assert.match(sw, /choose\(code\)/);
  const nav = read("src/components/site/SiteNav.jsx");
  assert.match(nav, /<LanguageSwitch variant="inline" className="[^"]*hidden md:flex"/, "desktop: next to Get the app");
  assert.match(nav, /<LanguageSwitch variant="segmented"/, "phones: top of the menu");
  assert.match(read("src/components/site/SiteFooter.jsx"), /<LanguageSwitch variant="footer"/);
});

// ---- Prerendered pages (after `npm run build`) ----------------------------------

const dist = new URL("../dist/", import.meta.url);
const built = existsSync(new URL("de/index.html", dist));
const page = (rel) => readFileSync(new URL(rel, dist), "utf8");
const fileFor = (route) => (route === "/" ? "index.html" : `${route.slice(1)}/index.html`);
const unescape = (s) => s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const text = (html) => unescape(html.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, ""));

test("dist: every page in both languages with its own title, lang, canonical and hreflang", (t) => {
  if (!built) return t.skip("not built");
  for (const route of Object.keys(PAGE_META)) {
    const html = page(fileFor(route));
    const meta = metaFor(route);
    assert.match(html, new RegExp(`<html lang="${meta.lang}"`), route);
    assert.equal(unescape(html.match(/<title>([^<]*)<\/title>/)[1]), meta.title, route);
    assert.ok(html.includes(`<link rel="canonical" href="${meta.canonical}" />`), route);
    assert.ok(html.includes(`<div id="root" data-page="${route}"><!--$-->`) || html.includes(`<div id="root" data-page="${route}"><`), `${route}: prerendered markup`);
    assert.equal(prerenderedPage(route), route);
    const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)" \/>/g)].map((m) => `${m[1]} ${m[2]}`);
    assert.deepEqual(alternates, meta.alternates.map((a) => `${a.hreflang} ${a.href}`), route);
    assert.doesNotMatch(html, /name="robots"/, `${route} is indexable`);
  }
  const de = page("de/index.html");
  assert.ok(de.includes('<link rel="alternate" hreflang="x-default" href="https://strivis.app/" />'));
  assert.ok(text(de).includes("Kenn deinen nächsten Satz."), "German home in German");
  assert.ok(text(page("de/support/index.html")).includes("Häufige Fragen"));
  assert.ok(text(page("index.html")).includes("Know your next set."), "English home in English");
  // The switch is in the prerendered markup, pointing at the twin.
  assert.match(page("support/index.html"), /<a[^>]*href="\/de\/support"[^>]*hrefLang="de"|<a[^>]*hrefLang="de"[^>]*href="\/de\/support"/i);
});

test("dist: nothing the CSP would block (no inline script, no style attribute)", (t) => {
  if (!built) return t.skip("not built");
  for (const rel of [...Object.keys(PAGE_META).map(fileFor), "404.html", "app-shell.html"]) {
    const html = page(rel);
    for (const [, attrs, content] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
      if (content.trim()) assert.match(attrs, /type="application\/ld\+json"/, `${rel}: inline script`);
    }
    assert.doesNotMatch(html.slice(html.indexOf('<div id="root"')), /\sstyle="/, `${rel}: style attribute`);
  }
});

test("dist: the FAQ answers are in the HTML, and FAQPage JSON-LD matches them per language", (t) => {
  if (!built) return t.skip("not built");
  for (const [rel, groups, lang] of [["index.html", FAQ_EN, "en"], ["de/index.html", FAQ_DE, "de"]]) {
    const html = page(rel);
    const visible = text(html);
    for (const item of groups) assert.ok(visible.includes(item.a), `${rel}: answer missing: ${item.q}`);
    const lds = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    assert.deepEqual(lds, structuredDataFor(rel === "index.html" ? "/" : "/de"));
    const faq = lds.find((d) => d["@type"] === "FAQPage");
    assert.equal(faq.inLanguage, lang);
    assert.deepEqual(faq.mainEntity.map((q) => q.name), groups.map((i) => i.q));
    const app = lds.find((d) => d["@type"] === "MobileApplication");
    assert.equal(app.installUrl, "https://apps.apple.com/app/id6809217490");
    assert.equal(app.aggregateRating, undefined);
  }
});

test("dist: 404 page is noindex, the app shell is empty and noindex, the sitemap has both languages", (t) => {
  if (!built) return t.skip("not built");
  const nf = page("404.html");
  assert.match(nf, /<meta name="robots" content="noindex" \/>/);
  assert.match(nf, /<div id="root" data-page="404:en">/);
  assert.doesNotMatch(nf, /rel="canonical"/);
  const shell = page("app-shell.html");
  assert.match(shell, /<div id="root"><\/div>/);
  assert.match(shell, /<meta name="robots" content="noindex" \/>/);
  const sitemap = page("sitemap.xml");
  assert.match(sitemap, /<loc>https:\/\/strivis\.app\/de\/support<\/loc>/);
  assert.match(sitemap, /hreflang="x-default" href="https:\/\/strivis\.app\/"/);
  assert.equal(prerenderedPage("/de/nope"), "404:de", "a German 404 renders in the browser in German");
  assert.equal(prerenderedPage("/u/someone"), null);
});

// ---- The German legal pages (owner decision 2026-11-03) -------------------------

test("every link to privacy and terms that a German visitor follows goes through localizedPath", () => {
  assert.match(read("src/components/site/LegalLinks.jsx"), /to=\{localizedPath\(l\.to, lang\)\}/);
  assert.match(read("src/pages/Links.jsx"), /to=\{localizedPath\(item\.to, lang\)\}/);
  assert.match(read("src/components/home/Faq.jsx"), /to=\{localizedPath\(item\.link\.to, lang\)\}/);
  assert.match(read("src/components/ConsentBanner.jsx"), /to=\{localizedPath\("\/datenschutz", lang\)\}/);
  const app = read("src/App.jsx");
  assert.match(app, /<Route path="\/de\/datenschutz" element=\{<DatenschutzDe \/>\} \/>/);
  assert.match(app, /<Route path="\/de\/agb" element=\{<AgbDe \/>\} \/>/);
});

test("dist: German privacy policy and terms, prerendered, with hreflang pairs and the key sections", (t) => {
  if (!built) return t.skip("not built");
  const pairs = [
    ["/datenschutz", "/de/datenschutz", "Privacy Policy", "Datenschutzerklärung", ["Inhaber und Verantwortlicher", "Gesundheits- und Fitnessdaten", "Deine Einwilligung in die Verarbeitung von Gesundheitsdaten", "Automatische Prüfung von Community-Fotos", "Erfolge", "Monats-Challenge", "Jahresrückblick", "Kraftstufen und Rekorde", "Plattformdienste und Hosting", "Übermittlung in Drittländer", "Speicherdauer", "Deine Rechte nach der DSGVO"]],
    ["/agb", "/de/agb", "Terms of Service", "Allgemeine Geschäftsbedingungen", ["1. Geltungsbereich", "3. Registrierung, Konto und Mindestalter", "4. Premium-Abo", "6. Community-Regeln", "10. Haftungsbeschränkung", "14. Anwendbares Recht"]],
  ];
  for (const [enRoute, deRoute, enTitle, deTitle, sections] of pairs) {
    const html = page(fileFor(deRoute));
    assert.match(html, /<html lang="de"/, deRoute);
    const visible = text(html);
    assert.ok(visible.includes(deTitle), `${deRoute}: title`);
    assert.ok(visible.includes("Zuletzt aktualisiert: 3. November 2026"), `${deRoute}: date`);
    assert.ok(visible.includes("Auf dieser Seite"), `${deRoute}: table of contents in German`);
    assert.ok(!visible.includes("Last updated"), deRoute);
    assert.ok(!visible.includes("On this page"), deRoute);
    for (const heading of sections) assert.ok(html.includes(`>${heading}</h2>`), `${deRoute}: ${heading}`);
    const en = page(fileFor(enRoute));
    assert.ok(text(en).includes(enTitle), enRoute);
    assert.ok(text(en).includes("Last updated: November 3, 2026"), enRoute);
    for (const doc of [html, en]) {
      assert.ok(doc.includes(`<link rel="alternate" hreflang="en" href="https://strivis.app${enRoute}" />`), enRoute);
      assert.ok(doc.includes(`<link rel="alternate" hreflang="de" href="https://strivis.app${deRoute}" />`), deRoute);
      assert.ok(doc.includes(`<link rel="alternate" hreflang="x-default" href="https://strivis.app${enRoute}" />`), enRoute);
    }
    assert.match(en, new RegExp(`<a[^>]*href="${deRoute}"[^>]*hrefLang="de"|<a[^>]*hrefLang="de"[^>]*href="${deRoute}"`, "i"), "the switch goes to the German twin");
    assert.match(html, new RegExp(`<a[^>]*href="${enRoute}"[^>]*hrefLang="en"|<a[^>]*hrefLang="en"[^>]*href="${enRoute}"`, "i"), "and back");
    const sitemap = page("sitemap.xml");
    assert.ok(sitemap.includes(`<loc>https://strivis.app${deRoute}</loc>`), `sitemap: ${deRoute}`);
    assert.ok(sitemap.includes(`hreflang="de" href="https://strivis.app${deRoute}"`), `sitemap: ${deRoute} alternate`);
  }
});

test("dist: German pages link the German privacy policy and terms, English pages the English ones", (t) => {
  if (!built) return t.skip("not built");
  for (const route of ["/de", "/de/support", "/de/links", "/de/datenschutz", "/de/agb"]) {
    const html = page(fileFor(route)).replace(/<a[^>]*hrefLang="en"[^>]*>/gi, "");
    assert.doesNotMatch(html, /href="\/datenschutz"/, `${route}: English privacy link`);
    assert.doesNotMatch(html, /href="\/agb"/, `${route}: English terms link`);
    assert.ok(html.includes('href="/de/datenschutz"'), route);
    assert.ok(html.includes('href="/de/agb"'), route);
  }
  for (const route of ["/", "/support", "/links", "/datenschutz", "/agb"]) {
    const html = page(fileFor(route)).replace(/<a[^>]*hrefLang="de"[^>]*>/gi, "");
    assert.doesNotMatch(html, /href="\/de\/(datenschutz|agb)"/, route);
    assert.ok(html.includes('href="/datenschutz"'), route);
  }
});
