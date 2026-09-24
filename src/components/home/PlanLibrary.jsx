import { Reveal } from "@/components/home/Reveal";
import { cn } from "@/lib/utils";

// Spec-sheet cards: training days per week is the headline number (it's
// what differs between programs and what a reader plans their week by; all
// four run four weeks), the dot-grid shows which days, and the level is a
// quiet one-colour label so the brand orange stays the only accent. A
// horizontal rail, not a fixed 3-up grid, so it scales to any number of
// programs.
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const PLANS = [
  { name: "Starting Strength", level: "Beginner", weeks: 4, trainDays: [0, 2, 4] },
  { name: "Upper/Lower Split", level: "Intermediate", weeks: 4, trainDays: [0, 2, 3, 5] },
  { name: "Push Pull Legs", level: "Intermediate", weeks: 4, trainDays: [0, 1, 2, 3, 4, 5] },
  { name: "5/3/1 Strength Focus", level: "Experienced", weeks: 4, trainDays: [0, 1, 3, 4] },
];

function PlanCard({ plan }) {
  const daysPerWeek = plan.trainDays.length;
  return (
    <div className="relative w-[260px] shrink-0 snap-start rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
      <div className="flex items-center justify-between mb-8">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{plan.level}</span>
        <span className="text-[11px] font-medium text-muted-foreground tabular-nums">{plan.weeks} weeks</span>
      </div>

      <div className="font-heading text-6xl tabular-nums leading-none mb-1">{daysPerWeek}</div>
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Days a week</div>

      <h3 className="font-heading text-lg tracking-wide mb-3">{plan.name}</h3>

      <div className="flex items-center gap-1.5" role="img" aria-label={`Trains ${daysPerWeek} days a week: ${plan.trainDays.map((d) => DAY_NAMES[d]).join(", ")}`}>
        {DAYS.map((d, i) => (
          <span
            key={i}
            title={DAY_NAMES[i]}
            className={cn(
              "w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-semibold",
              plan.trainDays.includes(i) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground/60"
            )}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

export function PlanLibrary() {
  return (
    <section id="plans" className="scroll-mt-24 py-16 bg-background text-foreground">
      <Reveal className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <div className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-2">Plan Library</div>
          <h2 className="font-heading text-2xl md:text-3xl tracking-wide mb-2">Built on real programs.</h2>
          <p className="text-sm text-muted-foreground max-w-md">A handful to start. More added every month — swipe through what's here today.</p>
        </div>
      </Reveal>
      <Reveal className="max-w-5xl mx-auto">
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-4 px-6 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" tabIndex={0} aria-label="Training plans" role="region">
          {PLANS.map((p) => (
            <PlanCard key={p.name} plan={p} />
          ))}
          <div className="w-[200px] shrink-0 snap-start rounded-2xl border border-dashed border-border flex flex-col items-center justify-center text-center p-6">
            <p className="font-heading text-sm tracking-wide mb-1">More every month</p>
            <p className="text-xs text-muted-foreground">The library keeps growing</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
