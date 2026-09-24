import { Check, Crown } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { FREE_FEATURES, PREMIUM_FEATURES, PREMIUM_BILLING } from "@/content/premium";

function FeatureList({ items, muted = false }) {
  return (
    <ul className="space-y-3.5">
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-3 text-sm md:text-base ${muted ? "text-white/80" : ""}`}>
          <Check aria-hidden="true" className="w-4 h-4 text-primary shrink-0 mt-1" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Two columns built only from what the app really gates (src/content/premium.js).
export function FreeVsPremium() {
  return (
    <section id="premium" className="scroll-mt-24 py-20 md:py-28 bg-background text-foreground">
      <Reveal className="max-w-5xl mx-auto px-6">
        <SectionHeader
          className="mb-12"
          eyebrow="Free & Premium"
          title="Free to train. Premium when you want more."
          lead="Everything you need to plan, log and track is free. Premium adds more AI, the curated programs and deeper analytics."
        />
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8">
            <h3 className="font-heading uppercase text-2xl tracking-wide">Free</h3>
            <p className="mt-1 mb-6 text-sm text-muted-foreground">No subscription required.</p>
            <FeatureList items={FREE_FEATURES} muted />
          </div>
          <div className="relative rounded-3xl border border-primary/60 bg-primary/[0.06] p-6 md:p-8 overflow-hidden">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-[90px]" />
            <div className="relative">
              <h3 className="font-heading uppercase text-2xl tracking-wide flex items-center gap-2">
                <Crown aria-hidden="true" className="w-5 h-5 text-primary" /> Premium
              </h3>
              <p className="mt-1 mb-6 text-sm text-muted-foreground">Everything in Free, plus:</p>
              <FeatureList items={PREMIUM_FEATURES} />
              <p className="mt-8 border-t border-white/10 pt-5 text-sm text-white/70">{PREMIUM_BILLING}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
