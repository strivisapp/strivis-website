import { Dumbbell } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";

const PLANS = [
  { name: "Starting Strength", level: "Einsteiger", weeks: 4 },
  { name: "Push Pull Legs", level: "Fortgeschritten", weeks: 4 },
  { name: "5/3/1 Kraftfokus", level: "Erfahren", weeks: 4 },
];

export function PlanLibrary() {
  return (
    <section id="plaene" className="scroll-mt-24 py-14">
      <Reveal className="max-w-5xl mx-auto px-6">
        <h2 className="font-heading text-2xl tracking-wide mb-6 text-center">Trainingspläne-Bibliothek</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {PLANS.map((p) => (
            <div key={p.name} className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="aspect-[4/3] bg-primary/10 flex items-center justify-center">
                <Dumbbell className="w-8 h-8 text-primary" />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-base tracking-wide">{p.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {p.level} · {p.weeks} Wochen
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
