import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-10 mt-8 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[8%] font-heading uppercase text-foreground/[0.04] text-[22vw] leading-none tracking-tight whitespace-nowrap"
      >
        Strivis
      </div>
      <div className="relative max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/brand/strivis-icon-mark-orange-dark.svg" alt="Strivis" className="h-6" />
          <span className="font-heading tracking-wide">Strivis</span>
        </div>
        <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <Link to="/support" className="hover:text-foreground rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            Support
          </Link>
          <Link to="/datenschutz" className="hover:text-foreground rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            Privacy
          </Link>
          <Link to="/agb" className="hover:text-foreground rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            Terms
          </Link>
          <Link to="/impressum" className="hover:text-foreground rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            Legal Notice
          </Link>
        </nav>
      </div>
    </footer>
  );
}
