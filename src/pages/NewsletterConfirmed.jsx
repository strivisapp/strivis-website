import { Link } from "react-router-dom";

// Where Brevo's double opt-in link lands after the visitor confirms the
// launch email (strivis-backend docs/runbooks/brevo.md,
// BREVO_DOI_REDIRECT_URL). Static: shows nothing from the URL, so a crafted
// link can't put its own text on a strivis.app page.
export default function NewsletterConfirmed() {
  return (
    <div className="min-h-svh bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-sm text-center">
        <h1 className="font-heading text-3xl tracking-wide mb-3">You're on the list</h1>
        <p className="text-muted-foreground mb-8">
          Thanks for confirming. We'll email you once when Strivis is in the App Store. Every email has a link to
          unsubscribe.
        </p>
        <p className="text-sm">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Back to Strivis
          </Link>
        </p>
      </div>
    </div>
  );
}
