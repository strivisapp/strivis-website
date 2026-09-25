import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { joinWaitlist } from "@/lib/waitlist";
import { cn } from "@/lib/utils";

// Email signup for the launch waitlist (lib/waitlist.js). Visible label,
// errors announced (role="alert"), success announced (aria-live), the
// honeypot hidden from people and assistive tech. `note` is the promise
// under the field, always followed by the Privacy Policy link.
export function WaitlistForm({
  source,
  note = "We'll email you once, when Strivis is in the App Store.",
  successText = "We'll email you once, when Strivis is in the App Store.",
  className,
  inputId,
}) {
  const uid = useId();
  const emailId = inputId ?? `${uid}-email`;
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await joinWaitlist({ email, website, source });
    setLoading(false);
    if (result.ok) {
      setSubmitted(true);
      // Lets Meta Ads report real waitlist conversions. Only fires if the
      // visitor accepted the pixel (lib/consent.js).
      window.fbq?.("track", "Lead");
    } else {
      setError(result.error);
    }
  };

  return (
    <div aria-live="polite" className={cn("w-full max-w-md", className)}>
      {submitted ? (
        <div className="flex items-start gap-3 rounded-core bg-surface-1 p-4 shadow-core ring-1 ring-primary/45">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Check aria-hidden="true" className="h-4 w-4" />
          </span>
          <p className="text-small text-white/80">
            <span className="block font-heading uppercase text-xl text-white">You're in.</span>
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
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${uid}-error` : `${uid}-note`}
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
          {error && (
            <p id={`${uid}-error`} role="alert" className="mt-2 text-small font-medium text-[hsl(0_90%_72%)]">
              {error}
            </p>
          )}
          <p id={`${uid}-note`} className="mt-2 text-small text-white/60">
            {note}{" "}
            <Link to="/datenschutz" className="underline text-white/80 hover:text-white rounded-sm">
              Privacy Policy
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
