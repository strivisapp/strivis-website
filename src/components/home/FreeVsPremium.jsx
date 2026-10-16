import { Check } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { Bezel } from "@/components/ui/bezel";
import { PREMIUM_PLANS } from "@/content/plans";
import { useT } from "@/i18n/context";

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
// glow. The Plan Library's eight Premium programs sit inside Premium as
// chips, each with its days and the level it is written for; the three free
// ones are named in the Free list. No prices: they come from the App Store.
export function FreeVsPremium() {
  const p = useT().premium;
  return (
    <section id="premium" aria-labelledby="premium-title" className="scroll-mt-20 border-t border-hairline bg-surface-0 py-20 md:py-28">
      <Reveal className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeader
          id="premium-title"
          title={p.title}
          lead={p.lead}
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Bezel coreClassName="p-6 md:p-8">
            <h3 className="font-heading uppercase text-h3">{p.free}</h3>
            <p className="mb-6 mt-1 text-small text-white/60">{p.freeSub}</p>
            <FeatureList items={p.freeFeatures} />
          </Bezel>
          <Bezel tone="accent" coreClassName="p-6 md:p-8">
            <h3 className="font-heading uppercase text-h3 text-primary">Premium</h3>
            <p className="mb-6 mt-1 text-small text-white/60">{p.premiumSub}</p>
            <FeatureList items={p.premiumFeatures} />
            <div className="mt-7 border-t border-hairline pt-5">
              <h4 className="text-small font-semibold text-white">{p.library}</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {PREMIUM_PLANS.map((plan) => (
                  <li key={plan.key} className="rounded-full bg-white/[0.05] px-3.5 py-2 text-small ring-1 ring-hairline">
                    <span className="font-semibold text-white">{plan.name}</span>
                    <span className="text-white/60">{p.planDetails(plan.days, plan.levels)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 text-small text-white/70">{p.billing}</p>
          </Bezel>
        </div>
      </Reveal>
    </section>
  );
}
