import { Dumbbell } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";

const PLANS = [
  { name: "Starting Strength", level: "Beginner", weeks: 4, gradient: "from-primary/25 via-primary/10 to-transparent" },
  { name: "Push Pull Legs", level: "Advanced", weeks: 4, gradient: "from-[#0D0F14]/60 via-primary/10 to-transparent" },
  { name: "5/3/1 Strength Focus", level: "Experienced", weeks: 4, gradient: "from-primary/35 via-primary/5 to-transparent" },
];

export function PlanLibrary() {
  return (
    <section id="plans" className="scroll-mt-24 py-16 bg-background text-foreground">
      <Reveal className="max-w-5xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-2">Plan Library</div>
            <h2 className="font-heading text-2xl md:text-3xl tracking-wide">Built on real programs.</h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {PLANS.map((p) => (
            <div key={p.name} className="group rounded-2xl border border-border bg-card overflow-hidden transition-colors hover:border-primary/40">
              <div className={`aspect-[16/10] bg-gradient-to-br ${p.gradient} flex items-center justify-center relative`}>
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,68,0,0.35), transparent 60%)" }} />
                <Dumbbell className="w-9 h-9 text-primary relative" />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-base tracking-wide">{p.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {p.level} · {p.weeks} weeks
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
