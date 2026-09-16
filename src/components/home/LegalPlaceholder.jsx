import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Real legal text needs the operator's formal details (name, address, contact,
// VAT id) that only the site owner can supply — see docs/website-plan.html.
// These routes exist now so the footer links resolve; content follows before
// the site actually replaces the coming-soon page.
export function LegalPlaceholder({ title }) {
  return (
    <div className="min-h-svh bg-background text-foreground px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-10">
          <ArrowLeft className="w-4 h-4" /> Zurück
        </Link>
        <h1 className="font-heading text-3xl tracking-wide mb-4">{title}</h1>
        <p className="text-muted-foreground">
          Dieser Text folgt vor dem Launch. Wir arbeiten daran, ihn rechtzeitig und rechtssicher bereitzustellen.
        </p>
      </div>
    </div>
  );
}
