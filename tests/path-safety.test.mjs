// What strivis.app serves and loads by path (docs/security.md): Vercel
// serves only the built files plus fixed rewrites and redirects, with no
// serverless functions; every page and image is chosen by a fixed route or a
// literal file name, never by a request value; and the auth-parameter
// cleanup (src/lib/stripAuthParams.js) always leaves the visitor on a path
// of this site. Negative cases cover traversal, protocol-relative paths and
// file types that must never be served (scripts, source maps, config, env).

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { withoutAuthParams } from "../src/lib/stripAuthParams.js";
import { SCREENSHOTS } from "../src/content/screenshots.js";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const vercel = JSON.parse(readFileSync(path.join(ROOT, "vercel.json"), "utf8"));
const SITE = "https://strivis.app";

// Every file below `dir`, as a "/"-separated path relative to it.
function filesUnder(dir, root = dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) out.push(...filesUnder(full, root));
    else out.push(path.relative(root, full).replace(/\\/g, "/"));
  }
  return out;
}

// ---- Auth-parameter cleanup ---------------------------------------------------

test("withoutAuthParams: the cleaned address is always a single-slash path on this site", () => {
  for (const [href, expected] of [
    [`${SITE}/?code=abc`, "/"],
    [`${SITE}/support?code=abc&x=1`, "/support?x=1"],
    [`${SITE}/#access_token=a&refresh_token=b`, "/"],
    // "//host" would be read as another host by history.replaceState, which
    // then throws and leaves the token in the address bar.
    [`${SITE}//evil.example/x?code=abc`, "/evil.example/x"],
    [`${SITE}///evil.example?token_hash=t&type=signup`, "/evil.example"],
    [`${SITE}/\\evil.example/?code=abc`, "/evil.example/"],
    [`${SITE}/\\\\evil.example?code=abc`, "/evil.example"],
    [`${SITE}/..//evil.example?code=abc`, "/evil.example"],
    [`${SITE}/%2F%2Fevil.example?code=abc`, "/%2F%2Fevil.example"],
  ]) {
    const clean = withoutAuthParams(href);
    assert.equal(clean, expected, href);
    assert.match(clean, /^\/(?!\/)/, `${href}: exactly one leading slash`);
    assert.equal(new URL(clean, SITE).origin, SITE, `${href}: stays on ${SITE}`);
  }
});

test("withoutAuthParams: nothing to strip, or the Universal Link target, is left alone", () => {
  assert.equal(withoutAuthParams(`${SITE}/support?x=1`), null);
  assert.equal(withoutAuthParams(`${SITE}//evil.example/x`), null);
  assert.equal(withoutAuthParams(`${SITE}/oauth-native-callback?code=abc`), null);
});

// ---- What Vercel serves -------------------------------------------------------

// The pages are prerendered (scripts/prerender.mjs): each known route is
// rewritten to its own fixed HTML file, the app's handoff pages to the empty
// shell, and everything else is a real 404 (Vercel serves dist/404.html).
const PRERENDERED = ["/support", "/datenschutz", "/agb", "/impressum", "/copyright", "/de", "/de/support"];
const SHELL = "/app-shell.html";

// A Vercel rewrite source ("/u/(.*)" or a literal path) as a RegExp.
const sourceRe = (source) => new RegExp(`^${source.replace(/\//g, "\\/")}$`);
const rewriteFor = (p) => vercel.rewrites.find((r) => sourceRe(r.source).test(p));

test("vercel.json: no serverless functions or custom routes, rewrites only to fixed files", () => {
  for (const key of ["functions", "routes", "builds", "cleanUrls", "trailingSlash"]) {
    assert.ok(!(key in vercel), `${key} would add request-driven file handling; review it here first`);
  }
  for (const dir of ["api", "functions", "server", "middleware.js", "middleware.ts"]) {
    assert.ok(!existsSync(path.join(ROOT, dir)), `${dir}: Vercel would deploy it as server code`);
  }
  assert.ok(vercel.rewrites.length > 0);
  const allowed = new Set([...PRERENDERED.map((p) => `${p}/index.html`), SHELL]);
  for (const r of vercel.rewrites) {
    assert.ok(allowed.has(r.destination), `${r.destination}: a rewrite only ever serves a prerendered page or the app shell`);
    assert.doesNotMatch(r.destination, /:|\$|\(/, "no destination built from the request");
    assert.equal(r.has, undefined, "not keyed on request values");
  }
  // Each prerendered page by its own fixed source, nothing broader.
  for (const p of PRERENDERED) assert.deepEqual(vercel.rewrites.find((r) => r.source === p), { source: p, destination: `${p}/index.html` });
});

test("vercel.json: only known routes and the app's links reach a page; assets and unknown paths stay 404s", () => {
  assert.equal(rewriteFor("/support").destination, "/support/index.html");
  assert.equal(rewriteFor("/de/support").destination, "/de/support/index.html");
  for (const p of ["/u/someone", "/p/123", "/oauth-native-callback", "/newsletter/confirmed"]) assert.equal(rewriteFor(p)?.destination, SHELL, p);
  for (const p of [
    "/assets/index-abc123.js",
    "/assets/missing.js",
    "/assets/.env",
    "/login",
    "/premium",
    "/de/login",
    "/support/extra",
    "/supportx",
    "/de/datenschutz",
    "/u",
    "/oauth-native-callback/x",
  ]) {
    assert.equal(rewriteFor(p), undefined, `${p} must stay a 404 (dist/404.html), not a page`);
  }
});

// Every file in public/ is deployed as is. Images, favicon.ico, the two
// self-destructing service workers, the Apple app-site association,
// robots.txt and the sitemap — no scripts beyond those, no source maps, no
// config or env files.
const PUBLIC_EXTENSIONS = /\.(webp|png|jpg|svg)$/;
const PUBLIC_EXACT = new Set(["favicon.ico", "sw.js","service-worker.js", ".well-known/apple-app-site-association", "robots.txt", "sitemap.xml"]);
const NEVER_SERVED = /(^|\/)(\.env(\..*)?|package(-lock)?\.json|vercel\.json|vite\.config\.[cm]?js|jsconfig\.json|\.git.*|.*\.(map|pem|key|p8|p12|mjs|cjs|ts|tsx|jsx|sh|cmd|exe|log))$/i;

function servedFileAllowed(file) {
  if (file.includes("..") || file.includes("\\") || file.includes("\u0000") || /%2e|%2f|%5c/i.test(file)) return false;
  if (NEVER_SERVED.test(file)) return false;
  return PUBLIC_EXTENSIONS.test(file) || PUBLIC_EXACT.has(file);
}

test("public/: only allow-listed file types are deployed", () => {
  const files = filesUnder(path.join(ROOT, "public"));
  assert.ok(files.length > 0);
  for (const file of files) assert.ok(servedFileAllowed(file), `public/${file} must not be deployed`);
});

test("public/ allow-list refuses traversal and unexpected file types", () => {
  for (const file of [
    ".env",
    ".env.local",
    "package.json",
    "package-lock.json",
    "vercel.json",
    "vite.config.js",
    "x.webp.js",
    "x.WEBP.JS",
    "x.png.map",
    "assets/index.js.map",
    "x.mjs",
    "x.jsx",
    "key.pem",
    "AuthKey.p8",
    "screenshots/x.webp\u0000.js",
    "screenshots/%2e%2e/.env",
    "../.env",
    "screenshots/../../package.json",
    "screenshots\\..\\.env",
    ".git/config",
    "evil.js",
    "x.html",
    "x.json",
  ]) {
    assert.equal(servedFileAllowed(file), false, `${JSON.stringify(file)} must be refused`);
  }
});

test("dist/ (after a build): no source maps, env, config or server files", (t) => {
  const dist = path.join(ROOT, "dist");
  if (!existsSync(dist)) return t.skip("not built");
  const pages = new Set(["index.html", "404.html", "app-shell.html", ...PRERENDERED.map((p) => `${p.slice(1)}/index.html`)]);
  for (const file of filesUnder(dist)) {
    assert.doesNotMatch(file, NEVER_SERVED, `dist/${file} must not be deployed`);
    const ok = /^assets\/[\w.-]+\.(js|css|woff2?|webp|png|jpg|svg)$/.test(file) || pages.has(file) || servedFileAllowed(file);
    assert.ok(ok, `dist/${file} is an unexpected deployed file`);
  }
  for (const page of pages) assert.ok(existsSync(path.join(dist, page)), `dist/${page} missing (prerender)`);
  assert.ok(!existsSync(path.join(ROOT, "dist-ssr")), "dist-ssr/ (the build-time renderer) is removed after prerendering");
});

// ---- Pages and images are chosen by fixed names --------------------------------

// A lazy import() is fine when its specifier is a fixed string that resolves
// to a module inside src/ (the App Store QR code is split out so the qrcode
// library only loads on desktop); anything computed is not.
const LITERAL_IMPORT = /\bimport\s*\(\s*"(@\/[A-Za-z0-9/_-]+)"\s*\)/g;
const ANY_IMPORT_CALL = /\bimport\s*\(/g;

function resolvesInsideSrc(specifier, src) {
  const base = path.resolve(src, specifier.slice(2));
  const hit = ["", ".js", ".jsx"].map((ext) => base + ext).find((f) => existsSync(f) && statSync(f).isFile());
  return Boolean(hit) && hit.startsWith(src + path.sep) && /\.jsx?$/.test(hit);
}

test("src/: dynamic import() only for fixed modules inside src/", () => {
  const src = path.join(ROOT, "src");
  assert.equal(resolvesInsideSrc("@/../package", src), false);
  assert.equal(resolvesInsideSrc("@/../vite.config", src), false);
  for (const file of filesUnder(src).filter((f) => /\.(jsx?|tsx?)$/.test(f))) {
    const text = readFileSync(path.join(src, file), "utf8");
    const literals = [...text.matchAll(LITERAL_IMPORT)];
    assert.equal(literals.length, (text.match(ANY_IMPORT_CALL) || []).length, `src/${file}: import() with a computed specifier`);
    for (const [, specifier] of literals) {
      assert.ok(resolvesInsideSrc(specifier, src), `src/${file}: import("${specifier}") must resolve to a .js/.jsx module inside src/`);
    }
  }
});

test("src/: no other dynamic module loading, and pages read no URL values", () => {
  const src = path.join(ROOT, "src");
  for (const file of filesUnder(src).filter((f) => /\.(jsx?|tsx?)$/.test(f))) {
    const text = readFileSync(path.join(src, file), "utf8");
    assert.doesNotMatch(text, /import\.meta\.glob/, `src/${file}: import.meta.glob`);
    assert.doesNotMatch(text, /\brequire\s*\(/, `src/${file}: require()`);
    assert.doesNotMatch(text, /\b(useParams|useSearchParams)\b/, `src/${file}: a page reads a URL value (check it against a fixed map first)`);
  }
});

test("screenshots: fixed WebP files inside public/screenshots/", () => {
  const base = path.join(ROOT, "public", "screenshots");
  for (const s of SCREENSHOTS) {
    for (const url of [s.src, s.src480]) {
      assert.match(url, /^\/screenshots\/[a-z0-9]+(?:-[a-z0-9]+)*\.webp$/, url);
      const file = path.resolve(ROOT, "public", `.${url}`);
      assert.ok(file.startsWith(base + path.sep), `${url} stays inside public/screenshots/`);
      assert.ok(existsSync(file), `${url} exists`);
    }
  }
});
