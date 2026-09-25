import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { LegalLinks } from "@/components/site/LegalLinks";
import { IMPRESSUM, IMPRESSUM_PLACEHOLDER } from "@/content/impressum";

// The Impressum, in the same layout as the privacy policy and terms on this
// branch (the launch redesign gives all three a new reading layout). Every
// value comes from src/content/impressum.js, which the owner fills in;
// until then its "[TODO: ...]" placeholders show up here highlighted, so a
// missing detail can't pass unnoticed.
function Value({ children }) {
  if (IMPRESSUM_PLACEHOLDER.test(children)) {
    return <mark className="rounded-sm bg-primary/15 px-1 text-foreground">{children}</mark>;
  }
  return children;
}

export default function Impressum() {
  const { name, street, city, country, email, phone, responsible } = IMPRESSUM;
  return (
    <div className="min-h-svh bg-background text-foreground px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-10">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <h1 className="font-heading text-3xl tracking-wide mb-8">Impressum</h1>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h2 className="font-heading text-lg tracking-wide mb-1.5 text-foreground">Operator</h2>
            <address className="not-italic">
              <Value>{name}</Value>
              <br />
              <Value>{street}</Value>
              <br />
              <Value>{city}</Value>
              <br />
              <Value>{country}</Value>
            </address>
          </div>
          <div>
            <h2 className="font-heading text-lg tracking-wide mb-1.5 text-foreground">Contact</h2>
            <p>
              Email:{" "}
              {IMPRESSUM_PLACEHOLDER.test(email) ? (
                <Value>{email}</Value>
              ) : (
                <a href={`mailto:${email}`} className="underline hover:text-foreground">
                  {email}
                </a>
              )}
              {phone && (
                <>
                  <br />
                  Phone: <Value>{phone}</Value>
                </>
              )}
            </p>
          </div>
          <div>
            <h2 className="font-heading text-lg tracking-wide mb-1.5 text-foreground">Responsible for the content</h2>
            <p>
              <Value>{responsible}</Value>
            </p>
          </div>
        </div>

        <LegalLinks className="mt-12 border-t border-border pt-4" linkClassName="text-muted-foreground hover:text-foreground focus-visible:ring-offset-background" />
      </div>
    </div>
  );
}
