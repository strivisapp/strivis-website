import { createContext, useContext } from "react";
import en from "./en.js";
import { DEFAULT_LANG } from "./lang.js";

// The page's language and its dictionary (src/i18n/en.js or de.js), set by
// LanguageProvider. Kept apart from the provider so that file only exports
// a component (fast refresh).
export const LanguageContext = createContext({ lang: DEFAULT_LANG, t: en, choose: () => {}, setHydrated: () => {} });

// { lang, t, choose }
export const useLanguage = () => useContext(LanguageContext);
export const useT = () => useContext(LanguageContext).t;
