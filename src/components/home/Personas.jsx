import { ArrowDownRight } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { PLANS, planAnchor } from "@/content/plans";

// Each persona points at the Plan Library program that fits it (the list in
// src/content/plans.js). What each one "gets" names only app features the
// page already describes.
const PERSONAS = [
  {
    who: "Just starting out",
    need: "You want a plan you can follow and to know how every movement is done.",
    gets: "A plan built around your answers, and instructions with start and end position for every exercise.",
    plan: "starting_strength",
  },
  {
    who: "Back at it, training regularly",
    need: "You know the basics and want structure that keeps up with more training days.",
    gets: "Last session's numbers one glance away, a rest timer that runs on its own, and a split you can edit.",
    plan: "ppl",
  },
  {
    who: "Chasing strength numbers",
    need: "You care about the bar getting heavier — and want to see it happen.",
    gets: "Real-time PR detection, an estimated 1RM and set-by-set history for every exercise.",
    plan: "five_three_one",
  },
];

export function Personas() {
  return (
    <section id="who" className="scroll-mt-24 py-16 md:py-20 bg-background text-foreground">
      <Reveal className="max-w-5xl mx-auto px-6">
        <SectionHeader className="mb-12" eyebrow="Who it's for" title="Who is Strivis for?" />
        <ul className="grid gap-4 md:grid-cols-3">
          {PERSONAS.map((p) => {
            const plan = PLANS.find((x) => x.key === p.plan);
            return (
              <li key={p.who} className="flex flex-col rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">
                <h3 className="font-heading uppercase text-2xl tracking-wide leading-tight mb-3">{p.who}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{p.need}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.gets}</p>
                <a
                  href={`#${planAnchor(plan.key)}`}
                  className="group mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between gap-3 min-h-11 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Matching program</span>
                    <span className="block font-heading text-lg tracking-wide group-hover:text-primary transition-colors">{plan.name}</span>
                  </span>
                  <ArrowDownRight aria-hidden="true" className="w-5 h-5 text-primary shrink-0" />
                </a>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">The programs are part of the Plan Library, included with Premium.</p>
      </Reveal>
    </section>
  );
}
