import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ORIGIN, metaFor } from "./seo.js";

// Title, description, canonical, hreflang and <html lang> per route, while
// the app navigates. The prerendered HTML of each page already carries its
// own (scripts/prerender.mjs, from the same src/lib/seo.js); without this,
// moving between pages in the app would keep the first page's head.
// Unknown paths and the app's handoff pages get noindex (the server also
// answers unknown paths with 404 and sends X-Robots-Tag for /u, /p,
// /newsletter).
export { ORIGIN, HOME_META, PAGE_META, metaFor, alternatesFor } from "./seo.js";

function setMeta(selector, create, value) {
  let el = document.head.querySelector(selector);
  if (value == null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(el.tagName === "LINK" ? "href" : "content", value);
}

const named = (name) => () => Object.assign(document.createElement("meta"), { name });
const property = (key) => () => {
  const el = document.createElement("meta");
  el.setAttribute("property", key);
  return el;
};

function setAlternates(alternates) {
  for (const el of document.head.querySelectorAll('link[rel="alternate"][hreflang]')) el.remove();
  for (const a of alternates) {
    const el = Object.assign(document.createElement("link"), { rel: "alternate", href: a.href });
    el.hreflang = a.hreflang;
    document.head.appendChild(el);
  }
}

export function usePageMeta({ gated = false } = {}) {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = metaFor(pathname, { gated });
    document.documentElement.lang = meta.lang;
    document.title = meta.title;
    setMeta('meta[name="description"]', named("description"), meta.description);
    setMeta('link[rel="canonical"]', () => Object.assign(document.createElement("link"), { rel: "canonical" }), meta.canonical);
    setMeta('meta[property="og:url"]', property("og:url"), meta.canonical || `${ORIGIN}/`);
    setMeta('meta[property="og:title"]', property("og:title"), meta.ogTitle);
    setMeta('meta[property="og:description"]', property("og:description"), meta.ogDescription);
    setMeta('meta[property="og:locale"]', property("og:locale"), meta.lang === "de" ? "de_DE" : "en_US");
    setMeta('meta[name="twitter:title"]', named("twitter:title"), meta.ogTitle);
    setMeta('meta[name="twitter:description"]', named("twitter:description"), meta.ogDescription);
    setMeta('meta[name="robots"]', named("robots"), meta.noindex ? "noindex" : null);
    setAlternates(meta.alternates);
  }, [pathname, gated]);
}
