import { Check, X } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";

const STRONG = [
  "Deep workout logging with real-time PR detection",
  "AI-generated training plans, built around you",
  "601 exercises with image, instructions and your own history",
  "A real light/dark design, not a half-finished skin",
];

const MISSING = ["No food recognition from photos yet", "Nutrition is logged via search or barcode for now"];

export function Differentiation() {
  return (
    <section className="py-20 md:py-28 bg-background text-foreground">
      <Reveal className="max-w-5xl mx-auto px-6">
        <SectionHeader className="mb-12" align="center" eyebrow="Straight talk" title="Where Strivis stands today." />
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-primary/60 bg-primary/[0.06] p-6 md:p-8">
            <h3 className="font-heading uppercase text-xl tracking-wide mb-5">Strong today</h3>
            <ul className="space-y-3">
              {STRONG.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm md:text-base">
                  <Check aria-hidden="true" className="w-4 h-4 text-primary shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8">
            <h3 className="font-heading uppercase text-xl tracking-wide mb-5">Not there yet</h3>
            <ul className="space-y-3">
              {MISSING.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm md:text-base text-muted-foreground">
                  <X aria-hidden="true" className="w-4 h-4 shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
