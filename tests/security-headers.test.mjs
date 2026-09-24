// Security headers and redirects of strivis.app, as Vercel serves them from
// vercel.json (docs/security.md). Run with `npm test`; CI runs it after the
// build, so the bundle checks below see what is actually deployed.

import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";

const root = new URL("../", import.meta.url);
const vercel = JSON.parse(readFileSync(new URL("vercel.json", root), "utf8"));
const siteHeaders = Object.fromEntries(
  vercel.headers.find((h) => h.source === "/(.*)").headers.map((h) => [h.key.toLowerCase(), h.value]),
);
const csp = Object.fromEntries(
  siteHeaders["content-security-policy"]
    .split(";")
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => {
      const [name, ...values] = d.split(/\s+/);
      return [name, values];
    }),
);

test("CSP: every directive the site relies on is explicit", () => {
  for (const name of ["default-src", "script-src", "style-src", "img-src", "font-src", "connect-src", "frame-src", "frame-ancestors", "base-uri", "form-action", "object-src"]) {
    assert.ok(csp[name], `missing ${name}`);
  }
  assert.deepEqual(csp["default-src"], ["'self'"]);
  assert.deepEqual(csp["object-src"], ["'none'"]);
  assert.deepEqual(csp["base-uri"], ["'self'"]);
  assert.deepEqual(csp["form-action"], ["'self'"]);
  assert.ok("upgrade-insecure-requests" in csp);
});

test("CSP: no unsafe-inline, no unsafe-eval, no wildcards", () => {
  for (const [name, values] of Object.entries(csp)) {
    for (const v of values) {
      assert.notEqual(v, "'unsafe-eval'", name);
      assert.notEqual(v, "'unsafe-inline'", name);
      assert.notEqual(v, "'unsafe-hashes'", name);
      assert.ok(!/^\*$|^https?:$|^\*\.|\/\/\*/.test(v), `${name}: wildcard ${v}`);
    }
  }
});

test("CSP: third-party origins are exactly the reviewed ones", () => {
  // Meta Pixel (loaded only after marketing consent, src/lib/consent.js) and
  // the waitlist API. A new origin fails here until it's reviewed.
  assert.deepEqual(csp["script-src"], ["'self'", "https://connect.facebook.net"]);
  assert.deepEqual(csp["img-src"], ["'self'", "data:", "https://www.facebook.com"]);
  assert.deepEqual(csp["connect-src"], ["'self'", "https://strivis-backend-production.up.railway.app", "https://www.facebook.com", "https://connect.facebook.net"]);
  assert.deepEqual(csp["frame-src"], ["https://www.facebook.com"]);
  // style-src: 'self' plus hashes of known runtime <style> elements only.
  assert.equal(csp["style-src"][0], "'self'");
  for (const v of csp["style-src"].slice(1)) assert.match(v, /^'sha256-[A-Za-z0-9+/]{43}='$/);
});

test("framing: no site may frame strivis.app", () => {
  assert.deepEqual(csp["frame-ancestors"], ["'none'"]);
  assert.equal(siteHeaders["x-frame-options"], "DENY");
});

test("HTTPS: HSTS for at least a year, including subdomains", () => {
  const hsts = siteHeaders["strict-transport-security"];
  const maxAge = Number(/max-age=(\d+)/.exec(hsts)?.[1]);
  assert.ok(maxAge >= 31536000, hsts);
  assert.match(hsts, /includeSubDomains/);
});

test("CORS: responses are readable only by the site itself, never with credentials", () => {
  // Vercel's default is Access-Control-Allow-Origin: * — overridden.
  assert.equal(siteHeaders["access-control-allow-origin"], "https://strivis.app");
  for (const block of vercel.headers) {
    for (const h of block.headers) {
      assert.notEqual(h.key.toLowerCase(), "access-control-allow-credentials", block.source);
      if (h.key.toLowerCase() === "access-control-allow-origin") assert.notEqual(h.value.trim(), "*", block.source);
    }
  }
});

test("cookies: the site sets none (auth lives in the app's Keychain; consent in localStorage)", () => {
  for (const block of vercel.headers) {
    for (const h of block.headers) assert.notEqual(h.key.toLowerCase(), "set-cookie", block.source);
  }
  const src = new URL("src/", root);
  const files = readdirSync(src, { recursive: true }).filter((f) => /\.(jsx?|tsx?)$/.test(f));
  for (const f of files) assert.doesNotMatch(readFileSync(new URL(f.replaceAll("\\", "/"), src), "utf8"), /document\.cookie/, f);
});

test("other headers: nosniff, referrer policy, permissions policy", () => {
  assert.equal(siteHeaders["x-content-type-options"], "nosniff");
  assert.equal(siteHeaders["referrer-policy"], "strict-origin-when-cross-origin");
  assert.match(siteHeaders["permissions-policy"], /camera=\(\)/);
});

test("redirects only ever go to https://strivis.app on the same path", () => {
  for (const r of vercel.redirects) {
    const dest = new URL(r.destination.replace(":path*", "x"));
    assert.equal(dest.origin, "https://strivis.app", r.destination);
    assert.ok(r.has?.every((h) => h.type === "host"), "redirects are keyed on the host only, never on a query parameter");
    assert.doesNotMatch(r.destination, /\$|:query|\?/, "no destination built from request input");
  }
});

test("runtime <style> elements in the built bundle are all hash-allowed", (t) => {
  // @paper-design/shaders (launch design) injects one fixed <style>; its
  // hash is in style-src. If the library changes it, the hash must change.
  const lib = new URL("node_modules/@paper-design/shaders/dist/shader-mount.js", root);
  if (!existsSync(lib)) return t.skip("shader library not installed on this branch");
  const text = /const defaultStyle = `([\s\S]*?)`;/.exec(readFileSync(lib, "utf8"))?.[1];
  assert.ok(text, "defaultStyle not found in shader-mount.js");
  const hash = `'sha256-${createHash("sha256").update(text).digest("base64")}'`;
  assert.ok(csp["style-src"].includes(hash), `add ${hash} to style-src`);
});
