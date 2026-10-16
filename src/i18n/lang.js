// Languages of the site. English is the main language at "/", German lives
// under "/de" (owner decision 2026-10-16, reports/sprachumschalter-wireframe
// variant A in the app repo). Only the pages listed in LOCALIZED_PAGES exist
// in both languages; the legal pages (privacy, terms, copyright, Impressum)
// exist once and are linked from both. Plain JS with relative imports only:
// the tests and scripts/prerender.mjs import it without a build step.

export const LANGS = ["en", "de"];
export const DEFAULT_LANG = "en";

// English path of every page that has a German twin under /de.
export const LOCALIZED_PAGES = ["/", "/support"];

// "/support/" and "/support" are the same page; "/" stays "/".
export function normalizePath(pathname) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") || "/" : pathname;
}

// The language a path is written in: "de" under /de, "en" for the English
// twins, null for pages that exist once (legal pages, the app's handoff
// pages, an unknown English path). Those follow the visitor's choice.
export function langOfPath(pathname) {
  const path = normalizePath(pathname);
  if (path === "/de" || path.startsWith("/de/")) return "de";
  if (LOCALIZED_PAGES.includes(path)) return "en";
  return null;
}

export const homePath = (lang) => (lang === "de" ? "/de" : "/");

// The path of an English page in `lang`: the German twin when there is one,
// otherwise the page itself (legal pages are linked as they are).
export function localizedPath(enPath, lang) {
  if (lang !== "de" || !LOCALIZED_PAGES.includes(enPath)) return enPath;
  return enPath === "/" ? "/de" : `/de${enPath}`;
}

// The English path of a German twin ("/de/support" -> "/support").
export function englishPath(pathname) {
  const path = normalizePath(pathname);
  if (path === "/de") return "/";
  if (path.startsWith("/de/")) return path.slice(3);
  return path;
}

// Where the language switch goes: the same page in the other language. A
// page that exists once stays where it is (only the remembered choice
// changes); an unknown German path goes to the English home and back.
export function switchPath(pathname, lang) {
  const path = normalizePath(pathname);
  const from = langOfPath(path);
  if (from === null) return path;
  const en = englishPath(path);
  if (!LOCALIZED_PAGES.includes(en)) return homePath(lang);
  return localizedPath(en, lang);
}

// The visitor's choice from the switch, kept in localStorage. Storage can be
// missing or blocked (private mode, strict settings): then nothing is
// remembered and the site still works.
export const LANG_STORAGE_KEY = "strivis_lang";

export function readStoredLang() {
  try {
    const value = globalThis.localStorage?.getItem(LANG_STORAGE_KEY);
    return LANGS.includes(value) ? value : null;
  } catch {
    return null;
  }
}

export function storeLang(lang) {
  if (!LANGS.includes(lang)) return;
  try {
    globalThis.localStorage?.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // Storage blocked: the choice applies to this visit only.
  }
}
