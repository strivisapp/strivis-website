import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollPast } from "@/hooks/useScrollPast";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#exercises", label: "Exercises" },
  { href: "#plans", label: "Plans" },
  { href: "#premium", label: "Premium" },
  { href: "#faq", label: "FAQ" },
];

const LINK_FOCUS = "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

// Stays dark/transparent the whole way down — the page itself is now a
// sequence of full-bleed dark chapters, so the nav no longer flips to a
// light pill past the hero, it just tightens into a pill. Below `md` the
// section links move into a menu sheet instead of disappearing.
export function FloatingNav({ heroEndRef, ctaHref = "/support", ctaLabel = "Support" }) {
  const fallbackRef = useRef(null);
  const scrolledPast = useScrollPast(heroEndRef ?? fallbackRef);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Escape closes the sheet and returns focus to the button that opened it;
  // the page underneath doesn't scroll while it's open.
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        className={`mt-[calc(env(safe-area-inset-top)+0.75rem)] w-full flex items-center justify-between gap-3 transition-all duration-300 pointer-events-auto ${
          scrolledPast || menuOpen
            ? "max-w-2xl rounded-full border border-white/10 bg-ink/80 backdrop-blur-lg px-4 py-2.5 shadow-lg shadow-ink/40"
            : "max-w-5xl px-2 py-3"
        }`}
      >
        <Link to="/" className={`shrink-0 ${LINK_FOCUS}`}>
          <img src="/brand/strivis-lockup-on-dark.svg" alt="Strivis" className="h-8 md:h-9" />
        </Link>
        <nav aria-label="Sections" className="hidden md:flex items-center gap-6">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={`text-xs font-medium tracking-[0.12em] uppercase text-white/70 hover:text-white transition-colors ${LINK_FOCUS}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button size="sm" className="rounded-full shrink-0" asChild>
            <Link to={ctaHref}>{ctaLabel}</Link>
          </Button>
          <button
            ref={menuButtonRef}
            type="button"
            className={`md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full text-white/80 hover:text-white active:scale-95 transition ${LINK_FOCUS}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Sections"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden pointer-events-auto absolute inset-x-4 top-[calc(env(safe-area-inset-top)+4.75rem)] rounded-3xl border border-white/10 bg-ink/95 backdrop-blur-lg p-2 shadow-2xl shadow-ink/60"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`flex min-h-12 items-center rounded-2xl px-4 font-heading text-2xl uppercase tracking-wide text-white hover:bg-white/5 active:bg-white/10 transition-colors ${LINK_FOCUS}`}
              >
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
