import { useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { joinWaitlist, WAITLIST_CONSENT_ERROR, WAITLIST_CONSENT_TEXT } from "@/lib/waitlist";
import { cn } from "@/lib/utils";

// Email signup for the launch waitlist (lib/waitlist.js). Visible label,
// errors announced (role="alert"), success announced (aria-live), the
// honeypot hidden from people and assistive tech. Under the field sits the
// required consent checkbox (18+ and the launch email, double opt-in),
// followed by the Privacy Policy link. Its label is bound to it and its tap
// area is 44 px; submitting without it ticked shows the error and moves
// focus to the box, and nothing is sent. `successText` follows "Check your
// inbox to confirm." once the backend has accepted the address (Brevo then
// sends the confirmation email).
export function WaitlistForm({
  source,
  successText = "Tap the link in the email we just sent. Then we'll email you once, when Strivis is in the App Store.",
  className,
  inputId,
}) {
  const uid = useId();
  const emailId = inputId ?? `${uid}-email`;
  const consentId = `${uid}-consent`;
  const errorId = `${uid}-error`;
  const consentRef = useRef(null);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!consent) {
      // Nothing is sent without the box ticked (joinWaitlist refuses too).
      setError({ message: WAITLIST_CONSENT_ERROR, field: "consent", at: Date.now() });
      consentRef.current?.focus();
      return;
    }
    setLoading(true);
    const result = await joinWaitlist({ email, website, source, consent });
    setLoading(false);
    if (result.ok) {
      setSubmitted(true);
      // Lets Meta Ads report real waitlist conversions. Only fires if the
      // visitor accepted the pixel (lib/consent.js).
      window.fbq?.("track", "Lead");
    } else {
      setError({ message: result.error, field: result.field ?? "email", at: Date.now() });
    }
  };

  const emailError = error?.field === "email";
  const consentError = error?.field === "consent";

  return (
    <div aria-live="polite" className={cn("w-full max-w-md", className)}>
      {submitted ? (
        <div className="flex items-start gap-3 rounded-core bg-surface-1 p-4 shadow-core ring-1 ring-primary/45">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Check aria-hidden="true" className="h-4 w-4" />
          </span>
          <p className="text-small text-white/80">
            <span className="block font-heading uppercase text-xl text-white">Check your inbox to confirm.</span>
            {successText}
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <label htmlFor={emailId} className="block text-small font-semibold text-white">
            Email
          </label>
          <div className="mt-2 flex gap-2">
            <Input
              id={emailId}
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={254}
              required
              aria-invalid={emailError ? true : undefined}
              aria-describedby={emailError ? errorId : undefined}
              className="min-w-0 flex-1"
            />
            {/* Honeypot: people never see or reach it; bots fill it in. */}
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-10000px] h-px w-px overflow-hidden"
            />
            <Button type="submit" size="lg" className="shrink-0 px-5" disabled={loading} aria-busy={loading || undefined}>
              {loading ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
              Notify me
            </Button>
          </div>
          <div className="mt-2 flex items-start">
            {/* The box's own 44 px tap area (a second label for the same box). */}
            <label htmlFor={consentId} className="-ml-3 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center">
              <input
                ref={consentRef}
                id={consentId}
                type="checkbox"
                name="consent"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (e.target.checked && consentError) setError(null);
                }}
                aria-required="true"
                aria-invalid={consentError ? true : undefined}
                aria-describedby={consentError ? errorId : undefined}
                className="h-5 w-5 cursor-pointer rounded accent-primary outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              />
            </label>
            <p className="py-3 text-small leading-snug text-white/70">
              <label htmlFor={consentId} className="cursor-pointer">
                {WAITLIST_CONSENT_TEXT}
              </label>{" "}
              <Link to="/datenschutz" className="rounded-sm text-white/85 underline hover:text-white">
                Privacy
              </Link>
            </p>
          </div>
          {error && (
            // Keyed by the attempt, so the same message is announced again.
            <p key={error.at} id={errorId} role="alert" className="mt-1 text-small font-medium text-[hsl(0_90%_72%)]">
              {error.message}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
