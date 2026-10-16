// Build step 3 of 3 (`npm run build`): writes every indexable page as static
// HTML, so search engines and link previews get each page's own text, title,
// description, canonical, hreflang and <html lang> without running
// JavaScript. The browser then hydrates the same markup (src/main.jsx).
//
//   1. vite build                      the client app into dist/
//   2. vite build --ssr ... dist-ssr/  src/entry-server.jsx for Node
//   3. node scripts/prerender.mjs      this file
//
// Output, from dist/index.html as the template:
//   dist/index.html, dist/<path>/index.html  every page in src/lib/seo.js
//                                            PAGE_META (both languages)
//   dist/404.html        the 404 page; Vercel serves it with status 404 for
//                        every path that is neither a file nor a rewrite
//   dist/app-shell.html  the empty app for the handoff pages (/u/*, /p/*,
//                        /oauth-native-callback, /newsletter/*), noindex
//   dist/sitemap.xml     both languages with hreflang alternates
// Then dist-ssr/ is deleted; nothing of it is deployed.
//
// No inline script and no style attribute may reach a page: the CSP allows
// neither (vercel.json). JSON-LD is a data block, not a script, and is not
// affected. The build fails if a page breaks one of these rules.

import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const DIST = path.join(ROOT, "dist");
const SSR = path.join(ROOT, "dist-ssr");

const { render, PAGE_META, NOT_FOUND_PAGE, metaFor, structuredDataFor, sitemapXml } = await import(
  pathToFileURL(path.join(SSR, "entry-server.js")).href
);

const template = readFileSync(path.join(DIST, "index.html"), "utf8");
const HEAD_BLOCK = /<!-- page-head:start[\s\S]*?<!-- page-head:end -->/;
const ROOT_DIV = '<div id="root"></div>';
if (!HEAD_BLOCK.test(template) || !template.includes(ROOT_DIV) || !/<html lang="en"/.test(template)) {
  throw new Error("dist/index.html: page-head markers, <html lang> or the empty #root are missing (index.html changed?)");
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// JSON inside <script>: "<" escaped so no text can close the element.
const jsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

function head(meta, structuredData = [], hints = []) {
  const lines = [
    ...hints,
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
  ];
  if (meta.noindex) lines.push('<meta name="robots" content="noindex" />');
  if (meta.canonical) lines.push(`<link rel="canonical" href="${esc(meta.canonical)}" />`);
  for (const a of meta.alternates) lines.push(`<link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}" />`);
  lines.push(
    `<meta property="og:url" content="${esc(meta.canonical ?? "https://strivis.app/")}" />`,
    `<meta property="og:title" content="${esc(meta.ogTitle)}" />`,
    `<meta property="og:description" content="${esc(meta.ogDescription)}" />`,
    `<meta property="og:locale" content="${meta.lang === "de" ? "de_DE" : "en_US"}" />`,
    `<meta name="twitter:title" content="${esc(meta.ogTitle)}" />`,
    `<meta name="twitter:description" content="${esc(meta.ogDescription)}" />`
  );
  for (const data of structuredData) lines.push(`<script type="application/ld+json">${jsonLd(data)}</script>`);
  return lines.join("\n    ");
}

// React puts preload hints for the page's images (the hero screenshot with
// fetchPriority="high") in front of the markup; they belong in <head>, and
// hydration expects #root to start with the app itself.
function splitHints(html) {
  const lead = html.match(/^(?:<link [^>]*\/>)+/)?.[0] ?? "";
  const hints = lead.match(/<link [^>]*\/>/g) ?? [];
  return { hints: hints.map((h) => h.replace(/\/>$/, " />")), body: html.slice(lead.length) };
}

function page({ meta, structuredData, html = "", dataPage = null }) {
  const { hints, body } = splitHints(html);
  const root = dataPage ? `<div id="root" data-page="${esc(dataPage)}">${body}</div>` : ROOT_DIV;
  return template
    .replace(/<html lang="en"/, `<html lang="${meta.lang}"`)
    .replace(HEAD_BLOCK, () => head(meta, structuredData, hints))
    .replace(ROOT_DIV, () => root);
}

function check(file, html) {
  // Inline style attributes in the app's markup (CSP style-src 'self').
  const body = html.slice(html.indexOf('<div id="root"'));
  if (/\sstyle="/.test(body)) throw new Error(`${file}: a style attribute in the prerendered markup (the CSP blocks it)`);
  // Executable inline scripts (CSP script-src has no 'unsafe-inline').
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    const [, attrs, content] = m;
    if (content.trim() && !/type="application\/ld\+json"/.test(attrs)) throw new Error(`${file}: an inline script`);
  }
  if ((html.match(/<title>/g) || []).length !== 1) throw new Error(`${file}: not exactly one <title>`);
}

function write(rel, html) {
  check(rel, html);
  const file = path.join(DIST, rel);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log(`  ${rel.replace(/\\/g, "/").padEnd(28)} ${(Buffer.byteLength(html) / 1024).toFixed(1)} kB`);
}

console.log("prerender:");
for (const route of Object.keys(PAGE_META)) {
  const html = await render(route);
  const rel = route === "/" ? "index.html" : path.join(route.slice(1), "index.html");
  write(rel, page({ meta: metaFor(route), structuredData: structuredDataFor(route), html, dataPage: route }));
}

// Any unknown path renders the 404 page; this one stands for all of them.
const notFound = "/__not-found";
write("404.html", page({ meta: metaFor(notFound), html: await render(notFound), dataPage: NOT_FOUND_PAGE }));

// The handoff pages render in the browser only (they show nothing from the
// URL and are noindex anyway).
write("app-shell.html", page({ meta: metaFor("/oauth-native-callback") }));

writeFileSync(path.join(DIST, "sitemap.xml"), sitemapXml());
console.log("  sitemap.xml");

rmSync(SSR, { recursive: true, force: true });
