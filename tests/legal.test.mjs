// The legal pages after the launch legal pass (2026-09-30): the copyright
// and takedown page (/copyright), the privacy policy naming every recipient
// the code actually contacts, and the Terms' launch rules (18+, community
// rules, subscriptions). Wording is a draft, not legal advice; these tests
// only keep the agreed facts from getting lost.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  COUNTER_NOTICE_BUSINESS_DAYS,
  DMCA_AGENT_REGISTRATION,
  DMCA_AGENT_REGISTRATION_PENDING,
  REPEAT_INFRINGER_STRIKES,
} from "../src/content/copyright.js";
import { IMPRESSUM } from "../src/content/impressum.js";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
// JSX text wraps across lines; compare with single spaces.
const flat = (p) => read(p).replace(/\s+/g, " ");

const copyright = flat("src/pages/Copyright.jsx");
const privacy = flat("src/pages/Datenschutz.jsx");
const terms = flat("src/pages/Agb.jsx");
const privacyDe = flat("src/pages/de/Datenschutz.jsx");
const termsDe = flat("src/pages/de/Agb.jsx");

// ---- /copyright ----------------------------------------------------------------

test("/copyright: routed outside the launch gate and linked like the other legal pages", () => {
  const app = read("src/App.jsx");
  assert.match(app, /const Copyright = lazy\(\(\) => import\("@\/pages\/Copyright"\)\);/);
  assert.match(app, /<Route path="\/copyright" element=\{<Copyright \/>\} \/>/);
  // Footer links come from the dictionaries, one per language (src/i18n/).
  for (const dict of ["src/i18n/en.js", "src/i18n/de.js"]) {
    assert.match(read(dict), /\{ to: "\/copyright", label: "Copyright" \}/, dict);
  }
  assert.match(read("src/components/site/LegalLinks.jsx"), /t\.footer\.legal\.map/);
  assert.match(copyright, /<LegalPage/);
  assert.match(copyright, /updated="September 30, 2026"/);
});

test("/copyright: a DMCA notice asks for every element of 17 U.S.C. § 512(c)(3)", () => {
  assert.match(copyright, /512\(c\)\(3\)/);
  for (const element of [
    /physical or electronic signature/, // (i)
    /copyrighted work you say is infringed/, // (ii)
    /material on Strivis you say infringes it and want removed, with enough detail for us to find it/, // (iii)
    /name, postal address, phone number and email address/, // (iv)
    /believe in good faith that the use of the material is not authorised by the copyright owner, its agent or the law/, // (v)
    /accurate and, under penalty of perjury, that you are the copyright owner or authorised to act/, // (vi)
  ]) {
    assert.match(copyright, element);
  }
});

test("/copyright: designated agent from the Impressum, registration number a marked placeholder", () => {
  assert.match(copyright, /512\(c\)\(2\)/);
  assert.match(copyright, /const \{ name, street, city, country, email \} = IMPRESSUM;/);
  assert.equal(IMPRESSUM.name, "Simon Paretski");
  assert.equal(IMPRESSUM.email, "strivisofficial@gmail.com");
  assert.match(copyright, /DMCA agent registration number:/);
  assert.equal(DMCA_AGENT_REGISTRATION_PENDING, "pending");
  assert.ok(
    DMCA_AGENT_REGISTRATION === DMCA_AGENT_REGISTRATION_PENDING || /^DMCA-\d+$/.test(DMCA_AGENT_REGISTRATION),
    `DMCA_AGENT_REGISTRATION must stay "pending" or be a real number (DMCA-…), got ${DMCA_AGENT_REGISTRATION}`,
  );
});

test("/copyright: counter-notice (§ 512(g)), 10 to 14 business days", () => {
  assert.match(copyright, /512\(g\)\(3\)/);
  assert.deepEqual(COUNTER_NOTICE_BUSINESS_DAYS, { min: 10, max: 14 });
  assert.match(copyright, /mistake or a misidentification/);
  assert.match(copyright, /consent to the jurisdiction of the U\.S\. Federal District Court/);
  assert.match(copyright, /accept service of process/);
  assert.match(copyright, /filed a court action/);
});

test("/copyright: repeat infringers suspended after three upheld removals", () => {
  assert.equal(REPEAT_INFRINGER_STRIKES, 3);
  assert.match(copyright, /words\[REPEAT_INFRINGER_STRIKES\]\} upheld copyright removals is suspended/);
  assert.match(copyright, /"three"/);
});

test("/copyright: EU notice and action for anyone, decisions without undue delay, reasons to both sides", () => {
  assert.match(copyright, /Art\. 16 DSA/);
  assert.match(copyright, /with or without a Strivis account/);
  assert.match(copyright, /without undue delay/);
  assert.match(copyright, /We tell you our decision and the reasons/);
  assert.match(copyright, /tell the person who posted it what we did, why/);
  assert.match(copyright, /Art\. 17 DSA/);
  assert.match(copyright, /<Mail \/>/);
});

// ---- Privacy policy --------------------------------------------------------------

test("privacy: names every recipient the app, backend and website contact", () => {
  for (const recipient of [
    "Supabase",
    "Railway",
    "Cloudflare, Inc.",
    "R2 storage",
    "Cloudflare Turnstile",
    "Pwned Passwords",
    "k-anonymity",
    "RevenueCat",
    "App Store",
    "Apple Push Notification service",
    "Sign in with Apple",
    "Google Sign-In",
    "Anthropic",
    "Open Food Facts",
    "USDA FoodData Central",
    "PostHog",
    "Sentry",
    "Vercel",
    "Meta Platforms Ireland",
    "Brevo",
    "base44.app",
  ]) {
    assert.ok(privacy.includes(recipient), `privacy policy must name ${recipient}`);
  }
});

test("privacy: the launch facts are stated", () => {
  assert.match(privacy, /updated="November 3, 2026"/);
  assert.match(privacy, /IP address and the search term/, "Open Food Facts is queried from the device");
  assert.doesNotMatch(privacy, /queried anonymously/);
  assert.match(privacy, /pseudonymous/, "PostHog events carry the account ID");
  assert.match(privacy, /whether and when you gave or withdrew this consent/);
  assert.match(privacy, /request logs: for every request, your IP address/);
  assert.match(privacy, /visible to other Strivis users/);
  assert.match(privacy, /By default your profile is public, new posts are visible to everyone/);
  assert.match(privacy, /18 or older, in every country, including the United States/);
  assert.match(privacy, /under 18, nothing is saved/);
  assert.match(privacy, /explicit consent \(Art\. 9\(2\)\(a\) GDPR\)/);
  assert.match(privacy, /We record when you gave it and which version/);
  assert.match(privacy, /double opt-in/);
  assert.match(privacy, /unsubscribe link/);
  assert.match(privacy, /joint controllers \(Art\. 26 GDPR\)/);
  // The owner block stays as published (it matches the Impressum).
  assert.match(privacy, /Simon Paretski, Aldebaranstraße 18, 12529 Schönefeld, Germany/);
  assert.match(privacy, /Contact email: strivisofficial@gmail\.com/);
});

// ---- Terms -------------------------------------------------------------------------

test("terms: 18+, community rules, licence, copyright, subscriptions, changes in the app", () => {
  assert.match(terms, /updated="November 3, 2026"/);
  assert.match(terms, /the registration refers to them before you continue/);
  assert.match(terms, /weekly, monthly or yearly subscriptions/);
  assert.doesNotMatch(terms, /lifetime/i, "lifetime is no longer sold");
  assert.match(terms, /18 or older to use Strivis, in every country, including the United States/);
  assert.doesNotMatch(terms, /requirements of the applicable app store/);
  assert.match(terms, /zero tolerance for objectionable content and abusive users/);
  assert.match(terms, /report posts, comments and users in the App and block users/);
  assert.match(terms, /to show it to the audience you chose/);
  assert.match(terms, /<Link to="\/copyright"/);
  assert.match(terms, /three upheld copyright removals are suspended/);
  assert.match(terms, /sold and billed by Apple/);
  assert.match(terms, /at least 24 hours before the end of the current period/);
  assert.match(terms, /subscription settings \(App Store settings\)/);
  assert.match(terms, /free trial is offered, it turns into a paid subscription automatically/);
  assert.match(terms, /apple\.com\/legal\/internet-services\/itunes\/dev\/stdeula/);
  assert.match(terms, /notify you of material changes in the App/);
  assert.doesNotMatch(terms, /by email/, "no email mechanism exists for term changes");
});

test("legal pages keep the 'not legal advice, have it reviewed' note", () => {
  for (const p of ["src/pages/Datenschutz.jsx", "src/pages/Agb.jsx", "src/pages/de/Datenschutz.jsx", "src/pages/de/Agb.jsx", "src/pages/Copyright.jsx", "src/content/impressum.js"]) {
    assert.match(flat(p), /not legal advice/, p);
  }
});

test("legal pages: a long URL breaks, it never widens the page on a phone", () => {
  assert.match(read("src/components/site/LegalPage.jsx"), /<article className="min-w-0 [^"]*break-words/);
});

test("legal pages: '(c)' in legal references is never drawn as the © ligature", () => {
  assert.match(read("src/components/site/LegalPage.jsx"), /<article className="[^"]*\[font-variant-ligatures:no-common-ligatures\]/);
});

test("privacy: Apple Health as it ships (saving workouts, body weight, cardio), what is read and what never", () => {
  const privacy = readFileSync(new URL("../src/pages/Datenschutz.jsx", import.meta.url), "utf8");
  assert.doesNotMatch(privacy, /If and when Strivis introduces/);
  assert.match(privacy, /heading: "Apple Health and Apple Watch"/);
  for (const part of [
    "Saving workouts",
    "Body weight",
    "Cardio: Strivis reads endurance workouts",
    "kind, start time, duration and distance",
    "does not read heart rate, routes",
    "Art. 9(2)(a) GDPR",
    "Sharing › Apps › Strivis",
    "cardio sessions (kind, start time, duration and, if you add it, distance)",
  ]) {
    assert.ok(privacy.includes(part), part);
  }
});

// ---- App version 1.1 (2026-11-03) -----------------------------------------------

test("privacy: who sees achievements, as strivis-backend lib/achievementVisibility.ts decides", () => {
  assert.match(privacy, /heading: "Achievements"/);
  assert.match(privacy, /Training and community achievements are visible to everyone who may see your profile/);
  assert.match(privacy, /nutrition achievements, body achievements .* and eight personal ones/);
  assert.match(privacy, /new gold or rare achievement in training or community, a post about it goes to your followers/);
  assert.match(privacy, /Settings › Privacy › Share achievements automatically/);
  assert.match(privacy, /at least 1,000 active users/);
});

test("privacy: challenge, year review and strength levels say what they use and who sees it", () => {
  assert.match(privacy, /heading: "Monthly challenge"/);
  assert.match(privacy, /appears only from 20 participants on/);
  assert.match(privacy, /heading: "Year review"/);
  assert.match(privacy, /From 1 December to 31 January/);
  assert.match(privacy, /heading: "Strength levels and records"/);
  assert.match(privacy, /calculates the level on your device, and our server calculates it/);
  assert.match(privacy, /"Strong" or "Elite" on a main lift are personal ones that stay with you alone/);
  assert.doesNotMatch(privacy, /training achievements and therefore visible/);
});

// One section's text, from a page that keeps it as `heading` + `body`.
const bodyOf = (source, heading) => source.match(new RegExp(`heading: "${heading}", body: \`([^\`]*)\``))?.[1] ?? "";

test("privacy: the community photo check rests on consent, in both languages", () => {
  const en = bodyOf(privacy, "Automatic check of community photos");
  assert.match(en, /Anthropic, PBC \(United States\)/);
  assert.match(en, /Before your first community or profile photo, the app asks you once/);
  assert.match(en, /Without your yes you can't add photos to the community, and our server enforces that/);
  assert.match(en, /you can appeal for 30 days; a person then decides/);
  assert.match(en, /your consent \(Art\. 6\(1\)\(a\) GDPR, and Art\. 9\(2\)\(a\) GDPR insofar as a photo can reveal information about your health\)/);
  assert.match(en, /withdraw it at any time in the app \(Settings › Privacy › Photo check\)/);
  assert.match(en, /separate from your consent to the AI features/);
  assert.match(en, /already online from people without this consent stay online and are not sent to Anthropic, also if the consent comes later; they remain subject to reports and manual moderation/);
  assert.doesNotMatch(en, /6\(1\)\(f\)|legitimate interest|You can object|does not depend on your consent/);

  const de = bodyOf(privacyDe, "Automatische Prüfung von Community-Fotos");
  assert.match(de, /Anthropic, PBC \(USA\)/);
  assert.match(de, /Vor deinem ersten Community- oder Profilfoto fragt dich die App einmal/);
  assert.match(de, /Ohne dein Ja kannst du der Community keine Fotos hinzufügen, und unser Server setzt das durch/);
  assert.match(de, /30 Tage lang Widerspruch einlegen; dann entscheidet ein Mensch/);
  assert.match(de, /deine Einwilligung \(Art\. 6 Abs\. 1 lit\. a DSGVO und, soweit ein Foto etwas über deine Gesundheit verraten kann, Art\. 9 Abs\. 2 lit\. a DSGVO\)/);
  assert.match(de, /jederzeit in der App widerrufen \(Einstellungen › Privatsphäre › Foto-Prüfung\)/);
  assert.match(de, /getrennt von deiner Einwilligung in die KI-Funktionen/);
  assert.match(de, /von Personen ohne diese Einwilligung bereits online sind, bleiben online und werden nicht an Anthropic gesendet, auch wenn die Einwilligung später kommt; für sie gelten weiterhin Meldungen und manuelle Moderation/);
  assert.doesNotMatch(de, /lit\. f|berechtigte/);

  assert.match(terms, /checked automatically by an AI model/);
  assert.match(terms, /asks for your consent to this once before your first such photo/);
  assert.match(terms, /remain subject to reports and manual moderation/);
  assert.match(termsDe, /automatisch von einem KI-Modell/);
  assert.match(termsDe, /einmal nach deiner Einwilligung dazu/);
  assert.match(termsDe, /weiterhin Meldungen und manuelle Moderation/);
});

// ---- The German legal pages (owner decision 2026-11-03) ---------------------------

// What the two languages must share: the text without code comments.
const noComments = (p) => read(p).replace(/^\s*\/\/.*$/gm, "").replace(/\s+/g, " ");
const TWINS = [
  ["src/pages/Datenschutz.jsx", "src/pages/de/Datenschutz.jsx"],
  ["src/pages/Agb.jsx", "src/pages/de/Agb.jsx"],
];

test("German legal pages: as many sections, list items and providers as the English ones", () => {
  for (const [en, de] of TWINS) {
    const count = (p, re) => (noComments(p).match(re) || []).length;
    assert.equal(count(de, /heading: "/g), count(en, /heading: "/g), `${de}: sections`);
    assert.equal(count(de, /<li\b/g), count(en, /<li\b/g), `${de}: list items`);
    assert.equal(count(de, /<p\b/g), count(en, /<p\b/g), `${de}: paragraphs`);
    assert.equal(count(de, /\bname: "/g), count(en, /\bname: "/g), `${de}: providers`);
  }
});

test("German legal pages: the same legal references as the English ones", () => {
  const refs = (s, norm) => (norm(s).match(/(Art\.|§) \d+(\(\d+\))?(\([a-z]\))?/g) || []).sort();
  const fromEn = (s) => s;
  const fromDe = (s) =>
    s
      .replace(/(Art\.|§) (\d+) Abs\. (\d+) lit\. ([a-z])/g, "$1 $2($3)($4)")
      .replace(/(Art\.|§) (\d+) Abs\. (\d+)/g, "$1 $2($3)");
  for (const [en, de] of TWINS) {
    assert.deepEqual(refs(noComments(de), fromDe), refs(noComments(en), fromEn), de);
  }
});

test("German legal pages: every number of the English ones", () => {
  // Thousands written 1,000 and 1.000; dates and articles in another order.
  const numbers = (s) => (s.replace(/(\d)[.,](\d{3})\b/g, "$1$2").match(/\d+/g) || []).sort();
  for (const [en, de] of TWINS) assert.deepEqual(numbers(noComments(de)), numbers(noComments(en)), de);
});

test("German legal pages: date, routes, owner, recipients, what stays with the user", () => {
  assert.match(privacyDe, /updated="3\. November 2026"/);
  assert.match(termsDe, /updated="3\. November 2026"/);
  assert.match(privacyDe, /Simon Paretski, Aldebaranstraße 18, 12529 Schönefeld, Deutschland/);
  assert.match(privacyDe, /Kontakt-E-Mail: strivisofficial@gmail\.com/);
  assert.match(privacyDe, /<Link to="\/copyright"/);
  assert.match(termsDe, /<Link to="\/copyright"/);
  for (const recipient of [
    "Supabase",
    "Railway",
    "Cloudflare, Inc.",
    "R2-Speicher",
    "Cloudflare Turnstile",
    "Pwned Passwords",
    "k-Anonymität",
    "RevenueCat",
    "App Store",
    "Apple Push Notification service",
    "Mit Apple anmelden",
    "Anmeldung mit Google",
    "Anthropic",
    "Open Food Facts",
    "USDA FoodData Central",
    "PostHog",
    "Sentry",
    "Vercel",
    "Meta Platforms Ireland",
    "Brevo",
    "base44.app",
  ]) {
    assert.ok(privacyDe.includes(recipient), `German privacy policy must name ${recipient}`);
  }
  assert.match(privacyDe, /Erfolge zu Ernährung, Erfolge zum Körper .* und acht persönliche/);
  assert.match(privacyDe, /„Stark“ oder „Elite“ in einer Grundübung sind persönliche, die bei dir allein bleiben/);
  assert.match(termsDe, /mindestens 18 Jahre alt/);
  assert.match(termsDe, /drei bestätigten Entfernungen wegen Urheberrechtsverletzung/);
  assert.match(termsDe, /apple\.com\/legal\/internet-services\/itunes\/dev\/stdeula/);
  assert.match(termsDe, /Recht der Bundesrepublik Deutschland/);
});

test("legal pages: no dashes, informal du, and no clause that one language prevails", () => {
  for (const [en, de] of TWINS) {
    for (const p of [en, de]) {
      assert.doesNotMatch(noComments(p), /—|\s–\s/, `${p}: dash`);
      assert.doesNotMatch(noComments(p), /prevail|maßgeblich|Vorrang hat/i, `${p}: one language prevails`);
    }
    // "Sie" and "Ihr" alone can be "they" and "its" at the start of a sentence.
    assert.doesNotMatch(noComments(de), /\b(Ihnen|Ihre[mnrs]?|Sie können|können Sie)\b/, `${de}: formal address`);
    assert.match(noComments(de), /\bdu\b/, `${de}: informal address`);
  }
});

test("privacy: the waitlist is closed, what stored signups need stays", () => {
  assert.match(privacy, /Former waitlist and launch email/);
  assert.match(privacy, /no longer collects addresses/);
  assert.doesNotMatch(privacy, /The waitlist on this website is also for adults only/);
  assert.doesNotMatch(privacy, /If you join it/);
  assert.match(privacy, /address from the former waitlist until you unsubscribe/);
});
