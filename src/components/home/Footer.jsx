import { Link } from "react-router-dom";

const LINK = "inline-flex min-h-11 items-center hover:text-foreground rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-ink py-10 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[8%] font-heading uppercase text-white/[0.04] text-[22vw] leading-none tracking-tight whitespace-nowrap"
      >
        Strivis
      </div>
      <div className="relative max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/brand/strivis-icon-mark-orange-white.svg" alt="" className="h-6" />
          <span className="font-heading tracking-wide">Strivis</span>
        </div>
        <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
          <Link to="/support" className={LINK}>
            Support
          </Link>
          <Link to="/datenschutz" className={LINK}>
            Privacy
          </Link>
          <Link to="/agb" className={LINK}>
            Terms
          </Link>
          <Link to="/impressum" className={LINK}>
            Legal Notice
          </Link>
        </nav>
      </div>
    </footer>
  );
}
