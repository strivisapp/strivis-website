import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { LegalLinks } from "@/components/site/LegalLinks";

const FAQ = [
  {
    q: "How do I cancel my Premium subscription?",
    a: "Manage or cancel anytime in your device's subscription settings — on iPhone, open Settings > [your name] > Subscriptions. Strivis never charges you directly; all payments go through the App Store.",
  },
  {
    q: "I bought Premium but the app still shows the paywall.",
    a: "Open Settings inside the app and tap \"Restore purchases\" — this re-links your existing purchase to your account. If it still doesn't unlock, email us with your purchase date and we'll sort it out.",
  },
  {
    q: "How do I delete my account and data?",
    a: "Email us from the address linked to your account and we'll delete your profile and all associated data within a few days.",
  },
];

export default function Support() {
  return (
    <div className="min-h-svh bg-background text-foreground px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-10">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <h1 className="font-heading text-3xl tracking-wide mb-4">Support</h1>
        <p className="text-muted-foreground mb-8">
          Questions, bugs, feedback, or anything else about Strivis — we read every email.
        </p>

        <a
          href="mailto:strivisofficial+support@gmail.com"
          className="inline-flex items-center gap-2.5 rounded-xl border border-border px-5 py-3.5 text-sm font-medium hover:border-primary hover:text-primary transition-colors mb-12"
        >
          <Mail className="w-4 h-4" />
          strivisofficial+support@gmail.com
        </a>

        <div className="space-y-8">
          {FAQ.map((item) => (
            <div key={item.q}>
              <h2 className="font-heading text-lg tracking-wide mb-1.5">{item.q}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
        <LegalLinks className="mt-12 border-t border-border pt-4" linkClassName="text-muted-foreground hover:text-foreground focus-visible:ring-offset-background" />
      </div>
    </div>
  );
}
