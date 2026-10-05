import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Title, description and canonical per route. index.html carries the home
// page's; without this every page of the single-page app reported those and
// a canonical pointing at the home page, so search engines read the legal
// pages as copies of it. Unknown paths and the app's handoff pages get
// noindex (the server already sends X-Robots-Tag for /u, /p, /newsletter).

const ORIGIN = "https://strivis.app";

export const HOME_META = {
  title: "Strivis: Workout Tracker, Training Plans & Macros for iPhone",
  description: "Training plans, workout logging with PR detection, calories and macros, and 601 exercises that work offline. One iPhone app, free to start.",
};

export const PAGE_META = {
  "/": HOME_META,
  "/support": { title: "Support | Strivis", description: "Help with Strivis: cancelling Premium, restoring a purchase, deleting your account, and how to reach us." },
  "/datenschutz": { title: "Privacy Policy | Strivis", description: "What data the Strivis app and strivis.app process, why, for how long, and your rights under the GDPR." },
  "/agb": { title: "Terms of Service | Strivis", description: "The terms for using the Strivis app, including Premium subscriptions, community rules and the minimum age of 18." },
  "/impressum": { title: "Impressum | Strivis", description: "Legal notice for Strivis under § 5 DDG: operator, address and contact." },
  "/copyright": { title: "Copyright and Content Reports | Strivis", description: "How to report content in Strivis that infringes your rights or is illegal, with or without an account." },
};

const NOT_FOUND = { title: "Page not found | Strivis", description: HOME_META.description, noindex: true };

// Pages for the app's own links: real pages, but nothing to find in search.
const HANDOFF = [
  { test: (p) => p.startsWith("/u/") || p.startsWith("/p/"), title: "Open in Strivis" },
  { test: (p) => p === "/newsletter/confirmed", title: "You're on the list | Strivis" },
  { test: (p) => p === "/oauth-native-callback", title: "Strivis" },
];

export function metaFor(pathname, { gated = false } = {}) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const known = PAGE_META[path];
  if (known) return { ...known, canonical: `${ORIGIN}${path === "/" ? "/" : path}`, noindex: false };
  const handoff = HANDOFF.find((h) => h.test(path));
  if (handoff) return { title: handoff.title, description: HOME_META.description, canonical: null, noindex: true };
  // Before launch an unknown path shows the countdown, like the home page.
  if (gated) return { ...HOME_META, canonical: `${ORIGIN}/`, noindex: true };
  return { ...NOT_FOUND, canonical: null };
}

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

export function usePageMeta({ gated = false } = {}) {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = metaFor(pathname, { gated });
    document.title = meta.title;
    setMeta('meta[name="description"]', named("description"), meta.description);
    setMeta('link[rel="canonical"]', () => Object.assign(document.createElement("link"), { rel: "canonical" }), meta.canonical);
    setMeta('meta[property="og:url"]', property("og:url"), meta.canonical || `${ORIGIN}/`);
    setMeta('meta[name="robots"]', named("robots"), meta.noindex ? "noindex" : null);
  }, [pathname, gated]);
}
