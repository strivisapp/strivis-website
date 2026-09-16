import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollPast } from "@/hooks/useScrollPast";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#exercises", label: "Exercises" },
  { href: "#plans", label: "Plans" },
  { href: "#faq", label: "FAQ" },
];

// Stays dark/transparent the whole way down — the page itself is now a
// sequence of full-bleed dark chapters, so the nav no longer flips to a
// light pill past the hero, it just tightens into a pill.
export function FloatingNav({ heroEndRef, ctaHref = "/login", ctaLabel = "Login" }) {
  const fallbackRef = useRef(null);
  const scrolledPast = useScrollPast(heroEndRef ?? fallbackRef);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        className={`mt-[calc(env(safe-area-inset-top)+0.75rem)] w-full flex items-center justify-between gap-3 transition-all duration-300 pointer-events-auto ${
          scrolledPast
            ? "max-w-2xl rounded-full border border-white/10 bg-black/70 backdrop-blur-lg px-4 py-2.5 shadow-lg shadow-black/30"
            : "max-w-5xl px-2 py-3"
        }`}
      >
        <Link to="/" className="shrink-0">
          <img src="/brand/strivis-icon-mark-orange-white.svg" alt="Strivis" className="h-7" />
        </Link>
        <nav className="hidden sm:flex items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-medium tracking-[0.12em] uppercase text-white/70 hover:text-white transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Button size="sm" className="rounded-full shrink-0" asChild>
          <Link to={ctaHref}>{ctaLabel}</Link>
        </Button>
      </div>
    </header>
  );
}
