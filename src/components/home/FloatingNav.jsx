import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollPast } from "@/hooks/useScrollPast";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#uebungsdatenbank", label: "Übungsdatenbank" },
  { href: "#plaene", label: "Pläne" },
  { href: "#faq", label: "FAQ" },
];

// Transparent bar over the hero, becomes a floating pill once scrolled past
// it — same idea as the old inline header, extracted so Home only wires the
// sentinel ref and both Home/Login/Premium can share one nav.
export function FloatingNav({ heroEndRef, ctaHref = "/login", ctaLabel = "Login" }) {
  const fallbackRef = useRef(null);
  const scrolledPast = useScrollPast(heroEndRef ?? fallbackRef);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        className={`mt-[calc(env(safe-area-inset-top)+0.75rem)] w-full flex items-center justify-between gap-3 transition-all duration-300 pointer-events-auto ${
          scrolledPast
            ? "max-w-2xl rounded-full border border-border bg-background/90 backdrop-blur-lg px-4 py-2.5 shadow-lg shadow-black/5"
            : "max-w-5xl px-2 py-3"
        }`}
      >
        <Link to="/" className="shrink-0">
          <img
            src={scrolledPast ? "/brand/strivis-icon-mark-orange-dark.svg" : "/brand/strivis-icon-mark-orange-white.svg"}
            alt="Strivis"
            className="h-7"
          />
        </Link>
        <nav className="hidden sm:flex items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                scrolledPast ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
              }`}
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
