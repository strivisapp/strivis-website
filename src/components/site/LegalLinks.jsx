import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/context";
import { localizedPath } from "@/i18n/lang";
import { openConsentSettings } from "@/lib/consent";
import { cn } from "@/lib/utils";

const LINK =
  "inline-flex min-h-11 items-center rounded-sm text-small text-white/70 transition-colors duration-200 hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

// Support and the legal pages, in the same order everywhere (footer,
// countdown, legal pages), labelled in the page's language (footer.legal in
// src/i18n/en.js and de.js). Impressum under its German name in both, as
// German law and German visitors expect it. Support has a German twin; the
// legal pages exist once and are linked as they are. "Cookie settings" is a button, not a page: it
// reopens the consent banner, so withdrawing is as easy as accepting.

const INSTAGRAM_URL = "https://instagram.com/strivisofficial";

export function LegalLinks({ className, linkClassName }) {
  const { lang, t } = useLanguage();
  return (
    <nav aria-label={t.footer.legalLabel} className={cn("flex flex-wrap gap-x-6", className)}>
      {t.footer.legal.map((l) => (
        <Link key={l.to} to={localizedPath(l.to, lang)} className={cn(LINK, linkClassName)}>
          {l.label}
        </Link>
      ))}
      <button type="button" onClick={openConsentSettings} className={cn(LINK, linkClassName)}>
        {t.footer.cookieSettings}
      </button>
      <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={cn(LINK, linkClassName)}>
        Instagram
      </a>
    </nav>
  );
}
