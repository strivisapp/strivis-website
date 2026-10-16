// The German site and the prerendered pages (owner decision 2026-10-16,
// wireframe variant A): English at "/", German under "/de", both rendered
// from the same components with one dictionary per language (src/i18n/en.js,
// de.js), the switch remembers the choice without ever redirecting by browser
// language, and every indexable page ships as its own HTML with title, lang,
// canonical and hreflang (scripts/prerender.mjs). The dist/ checks run after
// `npm run build` (CI builds before testing) and skip otherwise.

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import en from "../src/i18n/en.js";
import de from "../src/i18n/de.js";
import {
  LANG_STORAGE_KEY,
  langOfPath,
  localizedPath,
  readStoredLang,
  storeLang,
  switchPath,
} from "../src/i18n/lang.js";
import { FAQ_GROUPS as FAQ_EN } from "../src/content/faq.js";
import { FAQ_GROUPS as FAQ_DE } from "../src/content/de/faq.js";
import * as premiumEn from "../src/content/premium.js";
import * as premiumDe from "../src/content/de/premium.js";
import { PLANS } from "../src/content/plans.js";
import { EXERCISES } from "../src/content/exercises.js";
import { EXERCISE_NAMES } from "../src/content/de/exercises.js";
import { GOALS, DAYS_PER_WEEK, EQUIPMENT, buildExampleWeek } from "../src/content/planExamples.js";
import { PAGE_META, metaFor, prerenderedPage, structuredDataFor } from "../src/lib/seo.js";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

// ---- Paths and the remembered choice ----------------------------------------

test("paths: German under /de, legal pages once, the switch goes to the same page", () => {
  assert.equal(langOfPath("/"), "en");
  assert.equal(langOfPath("/support/"), "en");
  assert.equal(langOfPath("/de"), "de");
  assert.equal(langOfPath("/de/support"), "de");
  assert.equal(langOfPath("/de/nope"), "de");
  assert.equal(langOfPath("/datenschutz"), null, "legal pages exist once");
  assert.equal(langOfPath("/deutsch"), null, "only the /de segment, not a prefix of a word");

  assert.equal(switchPath("/", "de"), "/de");
  assert.equal(switchPath("/de", "en"), "/");
  assert.equal(switchPath("/support", "de"), "/de/support");
  assert.equal(switchPath("/de/support/", "en"), "/support");
  assert.equal(switchPath("/de/support", "de"), "/de/support");
  assert.equal(switchPath("/agb", "de"), "/agb", "a legal page stays where it is");
  assert.equal(switchPath("/de/nope", "en"), "/");

  assert.equal(localizedPath("/datenschutz", "de"), "/datenschutz");
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

test("no redirect by browser language; only the visitor's own choice, only at the bare home address", () => {
  const sources = ["src/main.jsx", "src/i18n/lang.js", "src/i18n/LanguageProvider.jsx", "src/components/site/LanguageSwitch.jsx"].map(read).join("\n");
  assert.doesNotMatch(sources, /navigator\.languages?|Accept-Language/i);
  const main = read("src/main.jsx");
  assert.match(main, /normalizePath\(window\.location\.pathname\) === '\/' && readStoredLang\(\) === 'de'/);
  assert.doesNotMatch(read("vercel.json"), /accept-language/i, "no server-side language redirect");
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

test("German FAQ and Free vs Premium: the same questions, links and facts as the English ones", () => {
  assert.deepEqual(
    FAQ_DE.map((g) => [g.id, g.items.length, g.items.map((i) => i.link?.to ?? null)]),
    FAQ_EN.map((g) => [g.id, g.items.length, g.items.map((i) => i.link?.to ?? null)])
  );
  assert.equal(premiumDe.FREE_FEATURES.length, premiumEn.FREE_FEATURES.length);
  assert.equal(premiumDe.PREMIUM_FEATURES.length, premiumEn.PREMIUM_FEATURES.length);
  const free = PLANS.filter((p) => p.tier === "free");
  assert.ok(premiumDe.FREE_FEATURES.some((f) => /Drei Programme/.test(f) && free.every((p) => f.includes(p.name))));
  assert.ok(premiumDe.FREE_FEATURES.includes("Je zwei KI-Versuche für Trainingspläne und Rezepte"));
  const ai = premiumDe.PREMIUM_FEATURES.find((f) => /KI/.test(f));
  assert.match(ai, /Jede Woche/);
  assert.doesNotMatch(ai, /\d|unbegrenzt|unlimit/i);
  assert.match(premiumDe.PREMIUM_BILLING, /App Store/);
  assert.equal(premiumDe.levelLabel(["advanced"]), "für Erfahrene");
  assert.equal(premiumDe.levelLabel(["intermediate", "advanced"]), "ab Fortgeschritten");
  assert.equal(premiumDe.levelLabel(["beginner", "intermediate", "advanced"]), "für jedes Level");
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
  const texts = strings(de).filter((s) => s !== "en" && s !== "de");
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

test("German configurator: every combination gives a full week with the app's German names", () => {
  for (const g of GOALS) {
    for (const d of DAYS_PER_WEEK) {
      for (const e of EQUIPMENT) {
        const week = buildExampleWeek({ goal: g.id, days: d, equipment: e.id, lang: "de" });
        assert.equal(week.length, d);
        for (const day of week) {
          assert.ok(day.name && !/body|Full|Upper|Lower/.test(day.name), day.name);
          assert.match(day.weekday, /^(Mo|Di|Mi|Do|Fr|Sa|So)$/);
          for (const ex of day.exercises) {
            assert.equal(ex.name, EXERCISE_NAMES[ex.id], ex.id);
            assert.doesNotMatch(ex.muscle, /[a-z] [a-z]|maximus|brachii|dorsi/, `${ex.id}: ${ex.muscle} not translated`);
          }
        }
      }
    }
  }
  assert.deepEqual(Object.keys(EXERCISE_NAMES).sort(), Object.keys(EXERCISES).sort(), "a German name for every exercise the site names");
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
  assert.ok(text(de).includes("Trainieren."), "German home in German");
  assert.ok(text(page("de/support/index.html")).includes("Häufige Fragen"));
  assert.ok(text(page("index.html")).includes("Train. Track."), "English home in English");
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
    for (const item of groups.flatMap((g) => g.items)) assert.ok(visible.includes(item.a), `${rel}: answer missing: ${item.q}`);
    const lds = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    assert.deepEqual(lds, structuredDataFor(rel === "index.html" ? "/" : "/de"));
    const faq = lds.find((d) => d["@type"] === "FAQPage");
    assert.equal(faq.inLanguage, lang);
    assert.deepEqual(faq.mainEntity.map((q) => q.name), groups.flatMap((g) => g.items.map((i) => i.q)));
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
