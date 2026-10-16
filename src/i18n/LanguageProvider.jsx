import { useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useLocation } from "react-router-dom";
import en from "@/i18n/en";
import de from "@/i18n/de";
import { LanguageContext } from "@/i18n/context";
import { DEFAULT_LANG, LANG_STORAGE_KEY, langOfPath, readStoredLang, storeLang } from "@/i18n/lang";

const DICTIONARIES = { en, de };

// The remembered choice as a tiny external store: localStorage, plus this
// visit's choice in memory for when storage is blocked; other tabs report
// theirs through the storage event.
let chosenThisVisit = null;
const listeners = new Set();

function subscribe(listener) {
  listeners.add(listener);
  const onStorage = (e) => e.key === LANG_STORAGE_KEY && listener();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => readStoredLang() ?? chosenThisVisit;
const getServerSnapshot = () => null;

// The language of the page being shown. A page under /de is German, its
// English twin English, whatever the visitor chose before. Pages that exist
// once (legal, 404, the app's handoff pages) follow the remembered choice,
// but only once the page has fully hydrated (<PageHydrated /> below): the
// prerendered HTML is English, and switching the language while React still
// takes over a lazily loaded page would not match that HTML.
export function LanguageProvider({ children }) {
  const { pathname } = useLocation();
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [hydrated, setHydrated] = useState(false);
  const lang = langOfPath(pathname) ?? (hydrated ? stored : null) ?? DEFAULT_LANG;

  // The switch calls this before following its link.
  const choose = useCallback((next) => {
    chosenThisVisit = next;
    storeLang(next);
    for (const listener of listeners) listener();
  }, []);

  const value = useMemo(() => ({ lang, t: DICTIONARIES[lang], choose, setHydrated }), [lang, choose]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// Rendered next to the routes, inside their Suspense boundary (App.jsx): its
// effect runs once the page itself (lazy pages included) is in place.
export function PageHydrated() {
  const { setHydrated } = useContext(LanguageContext);
  useEffect(() => setHydrated(true), [setHydrated]);
  return null;
}
