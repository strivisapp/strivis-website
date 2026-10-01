import { Check } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { Bezel } from "@/components/ui/bezel";
import { FREE_FEATURES, PREMIUM_FEATURES, PREMIUM_BILLING } from "@/content/premium";
import { PLANS } from "@/content/plans";

function FeatureList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-body text-white/85">
          <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Two shells built only from what the app really gates
// (src/content/premium.js); Premium is marked by an orange hairline, not a
// glow. The Plan Library's programs sit inside Premium as chips, each with
// the level it is written for (this replaces the separate persona cards
// and plan cards). No prices: they come from the App Store.
export function FreeVsPremium() {
  return (
    <section id="premium" aria-labelledby="premium-title" className="scroll-mt-20 border-t border-hairline bg-surface-0 py-20 md:py-28">
      <Reveal className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeader
          id="premium-title"
          title="Free to train. Premium for more."
          lead="Everything you need to plan, log and track is free. Premium adds more AI, the curated programs and deeper analytics."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Bezel coreClassName="p-6 md:p-8">
            <h3 className="font-heading uppercase text-h3">Free</h3>
            <p className="mb-6 mt-1 text-small text-white/60">No subscription required.</p>
            <FeatureList items={FREE_FEATURES} />
          </Bezel>
          <Bezel tone="accent" coreClassName="p-6 md:p-8">
            <h3 className="font-heading uppercase text-h3 text-primary">Premium</h3>
            <p className="mb-6 mt-1 text-small text-white/60">Everything in Free, plus:</p>
            <FeatureList items={PREMIUM_FEATURES} />
            <div className="mt-7 border-t border-hairline pt-5">
              <h4 className="text-small font-semibold text-white">In the Plan Library</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {PLANS.map((p) => (
                  <li key={p.key} className="rounded-full bg-white/[0.05] px-3.5 py-2 text-small ring-1 ring-hairline">
                    <span className="font-semibold text-white">{p.name}</span>
                    <span className="text-white/60">
                      , {p.trainDays.length} days a week, {p.level.toLowerCase()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 text-small text-white/70">{PREMIUM_BILLING}</p>
          </Bezel>
        </div>
      </Reveal>
    </section>
  );
}
