// The home page after the rebuild (approved wireframe, 2026-11-13): one
// story in seven sections, the App Store badge in exactly three places (plus
// the nav's "Get the app" and, on phones, one sticky button), the plan
// configurator and the screenshot gallery gone, the reviews and the founder
// note in both languages, images that reserve their space. Source checks
// always run; the dist/ checks after `npm run build`.

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { REVIEWS } from "../src/content/reviews.js";
import { FOUNDER } from "../src/content/founder.js";
import en from "../src/i18n/en.js";
import de from "../src/i18n/de.js";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const exists = (p) => existsSync(new URL(`../${p}`, import.meta.url));

const SECTIONS = ["Hero", "Problem", "Training", "Plans", "Progress", "Pricing", "Founder", "Faq", "ClosingCta"];

test("home: the seven sections in the story's order, nothing else", () => {
  const home = read("src/pages/Home.jsx");
  const main = home.slice(home.indexOf("<main"), home.indexOf("</main>"));
  const order = [...main.matchAll(/<([A-Z]\w+)[\s/>]/g)].map((m) => m[1]);
  assert.deepEqual(order, SECTIONS);
  for (const name of SECTIONS) assert.ok(exists(`src/components/home/${name}.jsx`), name);
});

test("home: the plan configurator, the screenshot gallery and the old feature sections are gone", () => {
  for (const file of [
    "src/components/home/PlanConfigurator.jsx",
    "src/components/home/ScreenshotGallery.jsx",
    "src/components/home/Features.jsx",
    "src/components/home/HowItWorks.jsx",
    "src/components/home/StraightTalk.jsx",
    "src/components/home/ExerciseSpotlight.jsx",
    "src/components/home/CtaRepeat.jsx",
    "src/components/home/FreeVsPremium.jsx",
    "src/components/home/FounderStory.jsx",
    "src/content/planExamples.js",
  ]) {
    assert.ok(!exists(file), `${file} should be deleted`);
  }
  for (const t of [en, de]) for (const key of ["configurator", "screens", "features", "how", "straight", "cta", "exercises"]) assert.equal(t[key], undefined, `${t.lang}.${key}`);
});

test("home: the App Store badge in exactly three places (hero, after pricing, close), the footer without one", () => {
  const places = SECTIONS.map((name) => [name, (read(`src/components/home/${name}.jsx`).match(/<DownloadAction\b/g) || []).length]).filter(([, n]) => n > 0);
  assert.deepEqual(places, [["Hero", 1], ["Pricing", 1], ["ClosingCta", 1]]);
  assert.match(read("src/pages/Home.jsx"), /<SiteFooter ref=\{footerRef\} download="none" \/>/);
  assert.match(read("src/components/site/SiteFooter.jsx"), /download !== "none" &&/);
  // The sticky button: phones only, out of the way of the badges, the footer and the cookie banner.
  const bar = read("src/components/site/MobileDownloadBar.jsx");
  assert.match(bar, /md:hidden/);
  assert.match(bar, /\[\[data-consent-open\]_&\]:hidden/);
  assert.match(bar, /hero\.above && !pricing\.inView && !final\.inView && !footer\.inView/);
  assert.match(bar, /motion-reduce:/);
});

test("home: nav anchors match the sections, old anchors still land", () => {
  for (const t of [en, de]) assert.deepEqual(t.nav.links.map((l) => l.href), ["#training", "#plans", "#progress", "#pricing", "#faq"]);
  assert.match(read("src/components/home/Training.jsx"), /id="training"/);
  assert.match(read("src/components/home/Plans.jsx"), /id="plans"/);
  assert.match(read("src/components/home/Plans.jsx"), /id="exercises"/, "the old #exercises anchor");
  assert.match(read("src/components/home/Progress.jsx"), /id="progress"/);
  assert.match(read("src/components/home/Pricing.jsx"), /id="pricing"/);
  assert.match(read("src/components/home/Pricing.jsx"), /id="premium"/, "the old #premium anchor");
  assert.match(read("src/components/home/Faq.jsx"), /id="faq"/);
  assert.match(read("src/components/home/ClosingCta.jsx"), /id="download"/);
});

test("home copy: two-line headlines, no dashes as punctuation, no emojis, both languages the same shape", () => {
  for (const t of [en, de]) {
    for (const title of [t.hero.title, t.problem.title, t.training.title, t.training.watch.title, t.plans.title, t.progress.title, t.pricing.title, t.closing.title]) {
      assert.equal(title.length, 2, title.join(" "));
    }
    assert.equal(t.training.points.length, 3);
    assert.equal(t.plans.paths.length, 3);
    assert.equal(t.progress.points.length, 3);
    assert.equal(t.hero.facts.length, 4);
    assert.equal(t.faq.items.length, 6);
    const all = JSON.stringify([t.hero, t.problem, t.training, t.plans, t.progress, t.reviews, t.pricing, t.founder, t.faq, t.closing, t.download]);
    assert.doesNotMatch(all, /—|–|\s-\s/, `${t.lang}: dash`);
    assert.doesNotMatch(all, /\p{Extended_Pictographic}/u, `${t.lang}: emoji`);
    assert.doesNotMatch(all, /\b(best|revolutionary|ultimate|game.?changer|beste[nr]?|revolutionär|ultimativ)\b/i, `${t.lang}: hype`);
  }
  assert.deepEqual(en.hero.title, ["Know your", "next set."]);
  assert.deepEqual(de.hero.title, ["Kenn deinen", "nächsten Satz."]);
  assert.equal(en.pricing.notYet, "Not yet: Android");
  assert.equal(de.pricing.notYet, "Noch nicht: Android");
});

test("phone layout: every grid and flex cell may shrink, so nothing pushes the page sideways", () => {
  for (const name of ["Plans", "Progress", "Pricing", "Training"]) {
    const source = read(`src/components/home/${name}.jsx`);
    for (const m of source.matchAll(/<ul className="([^"]*\bgrid\b[^"]*)"[\s\S]*?<li[^>]*className="([^"]*)"/g)) {
      assert.match(m[1], /grid-cols-(1|2|3)\b/, `${name}: the grid names its phone columns`);
      assert.match(m[2], /\bmin-w-0\b|\bw-\[/, `${name}: a cell without min-w-0`);
    }
  }
  // The exercise rail scrolls inside its strip, never the page.
  assert.match(read("src/components/home/Plans.jsx"), /overflow-x-auto/);
});

test("images: width and height on every image, lazy below the first screen, alt texts where they carry content", () => {
  for (const name of SECTIONS) {
    const source = read(`src/components/home/${name}.jsx`);
    for (const [img] of source.matchAll(/<img\b[\s\S]*?\/>/g)) {
      assert.match(img, /\bwidth=/, `${name}: img without width`);
      assert.match(img, /\bheight=/, `${name}: img without height`);
      assert.match(img, /\balt=/, `${name}: img without alt`);
      if (name !== "Hero") assert.match(img, /loading="lazy"|loading=\{/, `${name}: below the fold, so lazy`);
    }
    // The device frames: lazy unless the section passes `priority`, which
    // only the hero does.
    for (const [frame] of source.matchAll(/<(?:PhoneFrame|WatchFrame)\b[\s\S]*?\/>/g)) {
      if (name === "Hero") assert.match(frame, /\spriority[\s/]/, `Hero: ${frame.slice(0, 40)} eager`);
      else assert.doesNotMatch(frame, /\bpriority\b|\bloading=/, `${name}: below the fold, so the frame stays lazy`);
    }
  }
  const frames = read("src/components/home/PhoneFrame.jsx");
  assert.equal((frames.match(/loading=\{priority \? "eager" : "lazy"\}/g) || []).length, 2, "PhoneFrame and WatchFrame: lazy by default");
  assert.match(frames, /export function WatchFrame\(\{ alt = "", className, priority = false \}\)/);
  // The watch's description once: in Training; the hero's watch is decoration.
  assert.doesNotMatch(read("src/components/home/Hero.jsx"), /<WatchFrame[^>]*\balt=/);
  assert.match(read("src/components/home/Training.jsx"), /<WatchFrame alt=\{t\.hero\.watchAlt\}/);
  // The chalk photo fills the width: a middle size between 800 and 1400.
  assert.match(read("src/components/home/Problem.jsx"), /srcSet="\/photos\/chalk-800\.webp 800w, \/photos\/chalk-1100\.webp 1100w, \/photos\/chalk-1400\.webp 1400w"/);
  for (const file of ["public/photos/chalk-800.webp", "public/photos/chalk-1100.webp", "public/photos/chalk-1400.webp", "public/screenshots/watch-set.webp", "public/founder/founder.webp"]) {
    assert.ok(exists(file), file);
    assert.ok(readFileSync(new URL(`../${file}`, import.meta.url)).length < 160 * 1024, `${file} over 160 KB`);
  }
  for (const key of ["library", "ai", "own"]) {
    for (const w of [480, 800]) assert.ok(exists(`public/photos/path-${key}-${w}.webp`), `path-${key}-${w}`);
  }
});

test("sections share one band (Section), and the English notes card marks only its own text as English", () => {
  for (const name of ["Training", "Plans", "Progress", "Pricing", "Founder", "Faq", "ClosingCta"]) {
    const source = read(`src/components/home/${name}.jsx`);
    assert.match(source, /<Section\b/, `${name}: uses Section`);
    assert.doesNotMatch(source, /<section\b/, `${name}: no copied section markup`);
  }
  const problem = read("src/components/home/Problem.jsx");
  assert.doesNotMatch(problem, /<figure[^>]*\blang=/, "the figure's label is in the page's language");
  assert.match(problem, /<figcaption lang="en"/);
  assert.match(problem, /<ul lang="en"/);
});

test("motion: one entrance (the hero's devices), reduced motion respected", () => {
  const hero = read("src/components/home/Hero.jsx");
  assert.match(hero, /animate-in[^"]*motion-reduce:slide-in-from-bottom-0/);
  for (const name of SECTIONS.filter((n) => n !== "Hero")) {
    assert.doesNotMatch(read(`src/components/home/${name}.jsx`), /animate-in|framer-motion|<Reveal/, `${name}: no extra entrance`);
  }
});

// ---- Prerendered pages (after `npm run build`) ----------------------------------

const dist = new URL("../dist/", import.meta.url);
const built = existsSync(new URL("de/index.html", dist));
const page = (rel) => readFileSync(new URL(rel, dist), "utf8");
const unescape = (s) => s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const text = (html) => unescape(html.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));

test("dist: both home pages carry the seven sections, the reviews in their own language and the founder note", (t) => {
  if (!built) return t.skip("not built");
  for (const [rel, lang, dict] of [["index.html", "en", en], ["de/index.html", "de", de]]) {
    const html = page(rel);
    const visible = text(html);
    for (const id of ["hero-title", "problem-title", "training", "plans", "exercises", "progress", "pricing", "founder", "faq", "download"]) {
      assert.ok(html.includes(`id="${id}"`), `${rel}: #${id}`);
    }
    assert.ok(visible.includes(dict.hero.title.join(" ")), `${rel}: hero headline`);
    for (const r of REVIEWS) {
      assert.ok(visible.includes(r.title), `${rel}: review ${r.author}`);
      assert.ok(visible.includes(r.text), `${rel}: review text ${r.author}`);
      assert.ok(html.includes(`<blockquote lang="${r.lang}"`), `${rel}: review language ${r.author}`);
    }
    assert.ok(visible.includes(FOUNDER[lang].signature), `${rel}: founder signature`);
    for (const line of [...dict.pricing.freeFeatures, ...dict.pricing.premiumFeatures]) assert.ok(visible.includes(line), `${rel}: ${line}`);
    // The App Store badge image three times, and nothing of the removed sections.
    assert.equal((html.match(/<img src="\/badges\/download-on-the-app-store/g) || []).length, 3, `${rel}: three badges`);
    assert.doesNotMatch(visible, /Sketch your week|Skizzier deine Woche|Every screen, as it is|Jeder Screen, wie er ist/);
    // The founder photo slot, a single file.
    assert.ok(html.includes('src="/founder/founder.webp"'), `${rel}: founder photo slot`);
  }
});
