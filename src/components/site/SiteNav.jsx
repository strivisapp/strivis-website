import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { LanguageSwitch } from "@/components/site/LanguageSwitch";
import { useLanguage } from "@/i18n/context";
import { homePath } from "@/i18n/lang";
import { APP_STORE_URL } from "@/lib/appStore";
import { cn } from "@/lib/utils";

const FOCUS = "rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

// "Get the app" is the one label of the download intent in text form: the
// App Store listing once it exists, the page's download action (#download,
// the waitlist until then) before.
const GET_THE_APP_HREF = APP_STORE_URL ?? "#download";

function GetTheApp({ className, onClick }) {
  const { t } = useLanguage();
  return (
    <a
      href={GET_THE_APP_HREF}
      onClick={onClick}
      className={cn("press inline-flex h-11 shrink-0 items-center rounded-full bg-primary px-5 text-small font-semibold text-primary-foreground hover:bg-primary/90", FOCUS, className)}
    >
      {t.nav.getTheApp}
    </a>
  );
}

// Fixed top bar, one line, 60 px. Over the home hero it is transparent;
// once `heroRef` has scrolled away (IntersectionObserver, no scroll
// listener) a pill background fades in behind it. Only opacity animates,
// never the size. Without `heroRef` (subpages) the pill is always on.
// Below md the section links move into a menu that also offers the app.
// The language switch sits next to "Get the app" from md up and at the top
// of that menu on phones (wireframe variant A); the bar itself stays as it
// was. Pages without the menu have the switch in the footer on phones.
export function SiteNav({ links = [], heroRef }) {
  const { lang, t } = useLanguage();
  const fallbackRef = useRef(null);
  const { above } = useInView(heroRef ?? fallbackRef, { initial: true });
  const solid = !heroRef || above;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Escape closes the menu and returns focus to its button; the page
  // underneath doesn't scroll while it's open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const pillOn = solid || menuOpen;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-4">
      <div
        data-solid={pillOn}
        className={cn(
          "pointer-events-auto relative mt-[calc(env(safe-area-inset-top)+0.625rem)] flex w-full max-w-6xl items-center justify-between gap-3 py-2 pl-5 pr-2 sm:pl-6",
          // The pill: its own layer, only its opacity changes.
          "before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-ink/85 before:ring-1 before:ring-hairline before:backdrop-blur-lg before:shadow-lift before:transition-opacity before:duration-200 before:ease-out before:content-['']",
          pillOn ? "before:opacity-100" : "before:opacity-0"
        )}
      >
        <Link to={homePath(lang)} className={cn("shrink-0 rounded-sm", FOCUS)}>
          <img src="/brand/strivis-lockup-on-dark.svg" alt="Strivis" width="120" height="32" className="h-7 w-auto md:h-8" />
        </Link>
        {links.length > 0 && (
          <nav aria-label={t.nav.label} className="hidden items-center gap-5 md:flex lg:gap-7">
            {links.map((l) => (
              <a key={l.href} href={l.href} className={cn("whitespace-nowrap text-small font-medium text-white/75 transition-colors duration-200 hover:text-white", FOCUS, "rounded-sm")}>
                {l.label}
              </a>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-1">
          <LanguageSwitch variant="inline" className="mr-2 hidden md:flex" />
          <GetTheApp />
          {links.length > 0 && (
            <button
              ref={menuButtonRef}
              type="button"
              className={cn("press inline-flex h-11 w-11 items-center justify-center text-white/85 hover:text-white md:hidden", FOCUS)}
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label={t.nav.label}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(-6px) scale(0.98)" }}
            animate={{ opacity: 1, transform: "translateY(0px) scale(1)", transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
            exit={{ opacity: 0, transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] } }}
            className="pointer-events-auto absolute origin-top-right inset-x-3 top-[calc(env(safe-area-inset-top)+4.75rem)] rounded-shell bg-ink/95 p-1.5 ring-1 ring-hairline backdrop-blur-lg shadow-lift md:hidden"
          >
            <div className="rounded-core bg-surface-1 p-2 shadow-core">
              <LanguageSwitch variant="segmented" className="mb-2" onChoose={() => setMenuOpen(false)} />
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn("flex min-h-12 items-center rounded-full px-4 text-lead font-semibold text-white hover:bg-white/5 active:bg-white/10", FOCUS)}
                >
                  {l.label}
                </a>
              ))}
              <div className="p-2 pt-3">
                <GetTheApp className="w-full justify-center" onClick={() => setMenuOpen(false)} />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
