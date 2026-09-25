import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const LINK =
  "inline-flex min-h-11 items-center rounded-sm text-small text-white/70 transition-colors duration-200 hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

// Support and the legal pages, in the same order everywhere (footer,
// countdown, legal pages). Impressum under its German name, as German law
// and German visitors expect it.
const LEGAL_LINKS = [
  { to: "/support", label: "Support" },
  { to: "/datenschutz", label: "Privacy" },
  { to: "/agb", label: "Terms" },
  { to: "/impressum", label: "Impressum" },
];

const INSTAGRAM_URL = "https://instagram.com/strivisofficial";

export function LegalLinks({ className, linkClassName }) {
  return (
    <nav aria-label="Legal and support" className={cn("flex flex-wrap gap-x-6", className)}>
      {LEGAL_LINKS.map((l) => (
        <Link key={l.to} to={l.to} className={cn(LINK, linkClassName)}>
          {l.label}
        </Link>
      ))}
      <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={cn(LINK, linkClassName)}>
        Instagram
      </a>
    </nav>
  );
}
