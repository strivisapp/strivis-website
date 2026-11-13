import { DownloadAction } from "@/components/download/DownloadAction";
import { Headline, Section } from "@/components/home/SectionHeader";
import { useT } from "@/i18n/context";
import { cn } from "@/lib/utils";

function FeatureList({ items, accent }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-body text-white/85">
          <span aria-hidden="true" className={cn("mt-[0.6em] h-2 w-2 shrink-0 rounded-[2px]", accent ? "bg-primary" : "bg-white/35")} />
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Section 6. Free and Premium with the real limits (src/content/premium.js,
// the app's gating); prices stay in the App Store, they differ by country.
// Under it the straight-talk row, with the one honest "not yet". Then the
// page's second App Store badge (the sticky phone button steps aside here).
export function Pricing({ actionRef }) {
  const p = useT().pricing;
  return (
    <Section id="pricing" labelledBy="pricing-title">
      {/* The old anchor (#premium) still lands here. */}
      <span id="premium" aria-hidden="true" className="block scroll-mt-20" />
      <Headline id="pricing-title" lines={p.title} />

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="min-w-0 rounded-[24px] bg-surface-1 p-7 shadow-core ring-1 ring-hairline md:p-9">
          <h3 className="font-heading text-[2rem] uppercase leading-none">{p.free}</h3>
          <p className="mb-7 mt-2 text-small text-white/65">{p.freeSub}</p>
          <FeatureList items={p.freeFeatures} />
        </div>
        <div className="min-w-0 rounded-[24px] bg-gradient-to-b from-[#1d140f] to-surface-1 p-7 shadow-core ring-1 ring-primary/40 md:p-9">
          <h3 className="font-heading text-[2rem] uppercase leading-none text-primary">{p.premium}</h3>
          <p className="mb-7 mt-2 text-small text-white/65">{p.premiumSub}</p>
          <FeatureList items={p.premiumFeatures} accent />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">{p.honestLabel}</h3>
        <ul className="grid grid-cols-2 gap-2.5 md:grid-cols-5 md:gap-3">
          {[...p.honest, p.notYet].map((item, i, all) => (
            <li
              key={item}
              className={cn(
                "flex min-w-0 items-center rounded-2xl border border-dashed px-4 py-3.5 text-small font-semibold leading-snug",
                i === all.length - 1 ? "border-white/15 text-white/60" : "border-white/20 text-white/85"
              )}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div ref={actionRef} className="mt-12">
        <DownloadAction variant="full" source="home_pricing" />
      </div>
    </Section>
  );
}
