import { useEffect, useState } from "react";
import { base44 } from "@/lib/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Loader2 } from "lucide-react";
import { LAUNCH_DATE } from "@/lib/launchDate";

const DAY_MS = 24 * 60 * 60 * 1000;

function useCountdown(target) {
  const [remaining, setRemaining] = useState(() => Math.max(0, target.getTime() - Date.now()));
  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(Math.max(0, target.getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const days = Math.floor(remaining / DAY_MS);
  const hours = Math.floor((remaining % DAY_MS) / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
  return { days, hours, minutes, seconds };
}

export default function ComingSoon() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await base44.functions.invoke("submitWaitlistEmail", { email });
      if (res.data?.success) {
        setSubmitted(true);
        // Lets Meta Ads report real waitlist conversions instead of just
        // page views/clicks, and lets a campaign optimize toward this event.
        window.fbq?.("track", "Lead");
      } else {
        setError("Something went wrong. Please try again in a moment.");
      }
    } catch (err) {
      setError(
        err.response?.data?.error === "invalid_email"
          ? "Please enter a valid email address."
          : "Something went wrong. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-black">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(120% 60% at 50% 0%, rgba(255,69,0,.22), transparent 60%)",
        }}
      />

      <div className="relative z-10 min-h-svh flex flex-col items-center justify-center px-6 py-16 text-center">
        <img src="/brand/strivis-icon-mark-orange-white.svg" alt="Strivis" className="h-12 w-auto mb-5" />
        <h1 className="text-4xl font-heading tracking-wide text-white mb-3">
          STRIVI<span className="text-primary">S</span>
        </h1>
        <p className="text-white/60 text-sm max-w-xs mb-8">
          Training, nutrition and community in one app. Launching soon.
        </p>

        <div className="grid grid-cols-4 gap-2 w-full max-w-xs mb-8" aria-label="Countdown to launch">
          {[
            { value: days, label: "Days" },
            { value: hours, label: "Hrs" },
            { value: minutes, label: "Min" },
            { value: seconds, label: "Sec" },
          ].map((box) => (
            <div key={box.label} className="rounded-xl border border-white/15 bg-white/5 px-1 py-2.5">
              <div className="font-heading text-2xl tabular-nums text-white">
                {String(box.value).padStart(2, "0")}
              </div>
              <div className="text-[9px] uppercase tracking-wide text-white/50 mt-1">{box.label}</div>
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="w-full max-w-xs rounded-2xl border border-primary/40 bg-white/5 px-5 py-6 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <h2 className="font-heading text-lg tracking-wide text-white">You're in!</h2>
            <p className="text-xs text-white/60">We'll email you the moment we launch on October 13.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-2.5">
            <Input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-center bg-white/5 border-white/15 text-white placeholder:text-white/40"
              required
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <Button type="submit" className="w-full h-14 rounded-xl text-base font-medium" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Notify me
            </Button>
            <p className="text-[11px] text-white/50">We'll email you once, right when it launches.</p>
          </form>
        )}

        <a
          href="https://instagram.com/strivisofficial"
          target="_blank"
          rel="noreferrer"
          className="mt-8 text-xs text-white/50 hover:text-white"
        >
          Follow <span className="text-white font-medium">@strivisofficial</span>
        </a>
      </div>
    </div>
  );
}
