import { Check, X } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";

const STRONG = [
  "Deep workout logging with real-time PR detection",
  "AI-generated training plans, built around you",
  "601 exercises with image, instructions and your own history",
  "A real light/dark design, not a half-finished skin",
];

const MISSING = ["No food recognition from photos yet", "Nutrition is logged via search or barcode for now"];

export function Differentiation() {
  return (
    <section className="py-16 bg-background text-foreground">
      <Reveal className="max-w-5xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-2 text-center">Straight talk</div>
        <h2 className="font-heading text-2xl md:text-3xl tracking-wide mb-10 text-center text-balance">Where Strivis stands today.</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-primary bg-primary/[0.04] p-6">
            <h3 className="font-heading text-base tracking-wide mb-4">Strong today</h3>
            <ul className="space-y-3">
              {STRONG.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-heading text-base tracking-wide mb-4">Not there yet</h3>
            <ul className="space-y-3">
              {MISSING.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <X className="w-4 h-4 shrink-0 mt-0.5" />
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
