// Everything search engines and link previews read, per route and language:
// title, description, canonical, hreflang alternates, the sitemap and the
// structured data (JSON-LD). Used in three places: usePageMeta
// (src/lib/pageMeta.js) keeps the head right while the app navigates,
// scripts/prerender.mjs writes it into each prerendered page, and the tests
// check it. Plain JS with relative imports, so all three can load it.
import { FAQ_ITEMS as FAQ_EN } from "../content/faq.js";
import { FAQ_ITEMS as FAQ_DE } from "../content/de/faq.js";
import { LOCALIZED_PAGES, englishPath, langOfPath, localizedPath, normalizePath } from "../i18n/lang.js";
import { APP_STORE_URL } from "./appStore.js";

export const ORIGIN = "https://strivis.app";

export const HOME_META = {
  title: "Strivis: Workout Tracker, Training Plans & Macros for iPhone",
  description: "Training plans, workout logging with PR detection, calories and macros, and 601 exercises that work offline. One iPhone app, free to start.",
  ogTitle: "Strivis. Know your next set.",
  ogDescription: "Strivis shows what you lifted last time and the number to beat today. Training, plans and nutrition in one iPhone app.",
};

const HOME_META_DE = {
  title: "Strivis: Trainingsplan, Trainingslog & Kalorien fürs iPhone",
  description: "Trainingspläne, Trainingslog mit Rekord-Erkennung, Kalorien und Makros und 601 Übungen, die offline funktionieren. Eine iPhone-App, kostenlos zum Einstieg.",
  ogTitle: "Strivis. Kenn deinen nächsten Satz.",
  ogDescription: "Strivis zeigt dir, was du letztes Mal geschafft hast und was du heute schlagen kannst. Training, Pläne und Ernährung in einer iPhone-App.",
};

// Every indexable page. `lang` is the language its content is written in
// (copyright and Impressum are English, also when opened from the German site).
export const PAGE_META = {
  "/": { lang: "en", ...HOME_META },
  "/support": { lang: "en", title: "Support | Strivis", description: "Help with Strivis: cancelling Premium, restoring a purchase, deleting your account, and how to reach us." },
  "/datenschutz": { lang: "en", title: "Privacy Policy | Strivis", description: "What data the Strivis app and strivis.app process, why, for how long, and your rights under the GDPR." },
  "/agb": { lang: "en", title: "Terms of Service | Strivis", description: "The terms for using the Strivis app, including Premium subscriptions, community rules and the minimum age of 18." },
  "/impressum": { lang: "en", title: "Impressum | Strivis", description: "Legal notice for Strivis under § 5 DDG: operator, address and contact." },
  "/copyright": { lang: "en", title: "Copyright and Content Reports | Strivis", description: "How to report content in Strivis that infringes your rights or is illegal, with or without an account." },
  "/de": { lang: "de", ...HOME_META_DE },
  "/de/support": { lang: "de", title: "Hilfe und Support | Strivis", description: "Hilfe zu Strivis: Premium kündigen, einen Kauf wiederherstellen, dein Konto löschen und so erreichst du uns." },
  "/de/datenschutz": { lang: "de", title: "Datenschutzerklärung | Strivis", description: "Welche Daten die Strivis-App und strivis.app verarbeiten, warum, wie lange und welche Rechte du nach der DSGVO hast." },
  "/de/agb": { lang: "de", title: "AGB | Strivis", description: "Die Bedingungen für die Nutzung der Strivis-App, mit Premium-Abos, Community-Regeln und dem Mindestalter von 18 Jahren." },
  "/links": { lang: "en", title: "Strivis Links: App Store, Website, Support", description: "Get Strivis on the App Store, visit strivis.app or reach support. Impressum, privacy policy and terms." },
  "/de/links": { lang: "de", title: "Strivis Links: App Store, Website, Hilfe", description: "Strivis im App Store laden, strivis.app besuchen oder den Support erreichen. Impressum, Datenschutz und AGB." },
};

const NOT_FOUND = {
  en: { title: "Page not found | Strivis", description: HOME_META.description },
  de: { title: "Seite nicht gefunden | Strivis", description: HOME_META_DE.description },
};

// Pages for the app's own links: real pages, but nothing to find in search.
const HANDOFF = [
  { test: (p) => p.startsWith("/u/") || p.startsWith("/p/"), title: "Open in Strivis" },
  { test: (p) => p === "/newsletter/confirmed", title: "You're on the list | Strivis" },
  { test: (p) => p === "/oauth-native-callback", title: "Strivis" },
];

export const isHandoffPath = (pathname) => HANDOFF.some((h) => h.test(normalizePath(pathname)));

// Which prerendered page answers a path (scripts/prerender.mjs writes it
// into #root as data-page; src/main.jsx compares): the page itself, "404:en"
// for dist/404.html (Vercel serves it for every unknown path, also German
// ones, which then render in German), null for the app's handoff pages
// (served from the empty shell).
export const NOT_FOUND_PAGE = "404:en";

export function prerenderedPage(pathname) {
  const path = normalizePath(pathname);
  if (PAGE_META[path]) return path;
  if (isHandoffPath(path)) return null;
  return `404:${langOfPath(path) ?? "en"}`;
}

const url = (path) => `${ORIGIN}${path === "/" ? "/" : path}`;

// hreflang alternates of a page with a twin: en, de and x-default (English).
export function alternatesFor(pathname) {
  const path = normalizePath(pathname);
  if (!PAGE_META[path] || langOfPath(path) === null) return [];
  const en = englishPath(path);
  if (!LOCALIZED_PAGES.includes(en)) return [];
  return [
    { hreflang: "en", href: url(en) },
    { hreflang: "de", href: url(localizedPath(en, "de")) },
    { hreflang: "x-default", href: url(en) },
  ];
}

// The link-preview image, one per language (public/og-image.png and
// og-image-de.png, 1200 x 630): the hero's promise in the brand style, the
// workout screen on an iPhone. Every page in a language shares it.
export const OG_IMAGE = {
  en: {
    url: `${ORIGIN}/og-image.png`,
    alt: "Strivis: Know your next set. Free on iPhone. The workout screen of the app on an iPhone.",
  },
  de: {
    url: `${ORIGIN}/og-image-de.png`,
    alt: "Strivis: Kenn deinen nächsten Satz. Kostenlos fürs iPhone. Der Trainingsbildschirm der App auf einem iPhone.",
  },
};

export function metaFor(pathname, options) {
  const meta = pageMetaFor(pathname, options);
  const image = OG_IMAGE[meta.lang] ?? OG_IMAGE.en;
  return { ...meta, ogImage: image.url, ogImageAlt: image.alt };
}

function pageMetaFor(pathname, { gated = false } = {}) {
  const path = normalizePath(pathname);
  const known = PAGE_META[path];
  if (known) {
    return {
      ...known,
      ogTitle: known.ogTitle ?? known.title,
      ogDescription: known.ogDescription ?? known.description,
      canonical: url(path),
      alternates: alternatesFor(path),
      noindex: false,
    };
  }
  const base = { canonical: null, alternates: [], noindex: true };
  const handoff = HANDOFF.find((h) => h.test(path));
  if (handoff) {
    return { ...base, lang: "en", title: handoff.title, description: HOME_META.description, ogTitle: HOME_META.ogTitle, ogDescription: HOME_META.ogDescription };
  }
  // Before launch an unknown path shows the countdown, like the home page.
  if (gated) return { ...base, ...HOME_META, lang: "en", canonical: `${ORIGIN}/` };
  const lang = langOfPath(path) ?? "en";
  const nf = NOT_FOUND[lang];
  return { ...base, lang, ...nf, ogTitle: nf.title, ogDescription: nf.description };
}

// ---- Structured data -----------------------------------------------------

// What the app is, for search engines. No rating and no price claims:
// prices come from the App Store; "0" is the free download.
export function appStructuredData(lang) {
  const home = lang === "de" ? PAGE_META["/de"] : PAGE_META["/"];
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "Strivis",
    url: url(lang === "de" ? "/de" : "/"),
    inLanguage: lang,
    operatingSystem: "iOS",
    applicationCategory: "HealthApplication",
    description: home.description,
    image: `${ORIGIN}/favicon.png`,
    installUrl: APP_STORE_URL,
    downloadUrl: APP_STORE_URL,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };
}

// The home page's FAQ as FAQPage, the same questions and answers the page
// shows (its answers are in the HTML, collapsed).
export function faqStructuredData(lang) {
  const items = lang === "de" ? FAQ_DE : FAQ_EN;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.link ? `${item.a} ${item.link.label}.` : item.a },
      })),
  };
}

export function structuredDataFor(pathname) {
  const path = normalizePath(pathname);
  if (path === "/") return [appStructuredData("en"), faqStructuredData("en")];
  if (path === "/de") return [appStructuredData("de"), faqStructuredData("de")];
  return [];
}

// ---- Sitemap ---------------------------------------------------------------

const xml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

export function sitemapXml() {
  const entries = Object.keys(PAGE_META).map((path) => {
    const links = alternatesFor(path)
      .map((a) => `\n    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${xml(a.href)}" />`)
      .join("");
    return `  <url>\n    <loc>${xml(url(path))}</loc>${links}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;
}
