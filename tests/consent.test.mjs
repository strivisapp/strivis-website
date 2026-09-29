// Meta Pixel consent (src/lib/consent.js): withdrawing is as easy as
// accepting. "Cookie settings" reopens the banner; "Decline" stores
// "denied", tells a loaded pixel to stop, deletes _fbp/_fbc on the site's
// domain, and the pixel is not loaded again.

import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

// A minimal browser: localStorage, window (an EventTarget with fbq and
// location) and a document whose cookie setter records every write.
const storage = new Map();
const cookieWrites = [];
const fbqCalls = [];
let scriptsInjected = 0;

globalThis.localStorage = {
  getItem: (k) => (storage.has(k) ? storage.get(k) : null),
  setItem: (k, v) => storage.set(k, String(v)),
};
globalThis.window = Object.assign(new EventTarget(), { location: { hostname: "strivis.app", pathname: "/" } });
globalThis.document = {
  set cookie(value) {
    cookieWrites.push(value);
  },
  createElement: () => ({}),
  getElementsByTagName: () => [{ parentNode: { insertBefore: () => scriptsInjected++ } }],
};

const consent = await import("../src/lib/consent.js");

beforeEach(() => {
  cookieWrites.length = 0;
  fbqCalls.length = 0;
});

test("cookieDomains: the host and each parent above the top-level domain", () => {
  assert.deepEqual(consent.cookieDomains("strivis.app"), ["strivis.app"]);
  assert.deepEqual(consent.cookieDomains("www.strivis.app"), ["www.strivis.app", "strivis.app"]);
  assert.deepEqual(consent.cookieDomains("localhost"), []);
  assert.deepEqual(consent.cookieDomains("127.0.0.1"), []);
  assert.deepEqual(consent.cookieDomains(""), []);
});

test("expiredMetaCookies: only deletions of _fbp and _fbc, host-only and on every domain", () => {
  const writes = consent.expiredMetaCookies("www.strivis.app");
  assert.deepEqual(consent.META_COOKIES, ["_fbp", "_fbc"]);
  for (const name of ["_fbp", "_fbc"]) {
    assert.ok(writes.includes(`${name}=; Max-Age=0; Path=/; SameSite=Lax`), `${name} host-only`);
    assert.ok(writes.includes(`${name}=; Max-Age=0; Path=/; Domain=strivis.app; SameSite=Lax`), `${name} on .strivis.app`);
    assert.ok(writes.includes(`${name}=; Max-Age=0; Path=/; Domain=www.strivis.app; SameSite=Lax`), `${name} on www`);
  }
  for (const w of writes) assert.match(w, /^_fb[pc]=; Max-Age=0;/, "never sets a value");
});

test("accept loads the pixel once; decline revokes it, deletes its cookies and keeps it unloaded", () => {
  consent.setConsent("granted");
  assert.equal(consent.getConsent(), "granted");
  assert.equal(scriptsInjected, 1, "fbevents.js injected after consent");
  assert.equal(typeof window.fbq, "function");
  // Record what the (queued) pixel is told from here on.
  const realFbq = window.fbq;
  window.fbq = (...args) => {
    fbqCalls.push(args);
    realFbq(...args);
  };

  consent.setConsent("denied");
  assert.equal(consent.getConsent(), "denied");
  assert.deepEqual(fbqCalls, [["consent", "revoke"]]);
  assert.deepEqual(cookieWrites, consent.expiredMetaCookies("strivis.app"));

  consent.loadMetaPixel();
  assert.equal(scriptsInjected, 1, "not loaded again after withdrawal");

  // Accepting again on the same page view re-enables the loaded pixel
  // instead of injecting it twice.
  consent.setConsent("granted");
  assert.deepEqual(fbqCalls.at(-1), ["consent", "grant"]);
  assert.equal(scriptsInjected, 1);
});

test("declining without a loaded pixel still clears any leftover Meta cookies", () => {
  const saved = window.fbq;
  delete window.fbq;
  consent.setConsent("denied");
  assert.deepEqual(cookieWrites, consent.expiredMetaCookies("strivis.app"));
  window.fbq = saved;
});

test("Cookie settings: openConsentSettings reaches the banner's listener", () => {
  let opened = 0;
  const off = consent.onOpenConsentSettings(() => opened++);
  consent.openConsentSettings();
  off();
  consent.openConsentSettings();
  assert.equal(opened, 1);
});

test("Cookie settings: in the shared legal links, and the banner reopens on it", () => {
  const links = read("src/components/site/LegalLinks.jsx");
  assert.match(links, /<button type="button" onClick=\{openConsentSettings\}[^>]*>\s*Cookie settings\s*</);
  const banner = read("src/components/ConsentBanner.jsx");
  assert.match(banner, /onOpenConsentSettings\(/);
  assert.match(banner, /\(Boolean\(choice\) && !reopened\)/, "a made choice hides the banner only until it is reopened");
  assert.match(read("src/components/site/SiteFooter.jsx"), /<LegalLinks/);
  assert.match(read("src/pages/ComingSoon.jsx"), /<LegalLinks/);
});

test("privacy policy: withdrawal through Cookie settings, no 'clear your browser data'", () => {
  const privacy = read("src/pages/Datenschutz.jsx");
  assert.match(privacy, /"Cookie settings"/);
  assert.match(privacy, /_fbp and _fbc/);
  assert.doesNotMatch(privacy, /clearing this site's data/i);
});
