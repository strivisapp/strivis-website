import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border py-10 mt-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/brand/strivis-icon-mark-orange-dark.svg" alt="Strivis" className="h-6" />
          <span className="font-heading tracking-wide">Strivis</span>
        </div>
        <nav className="flex gap-5 text-sm text-muted-foreground">
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
