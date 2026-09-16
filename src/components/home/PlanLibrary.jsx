import { Reveal } from "@/components/home/Reveal";
import { cn } from "@/lib/utils";

// Spec-sheet cards: the week count is the headline number (Ferrari spec-sheet
// register), the dot-grid is real information (which days the program trains),
// not decoration — and the format scales to any number of programs, since
// this is a horizontal rail, not a fixed 3-up grid.
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const LEVEL_STYLE = {
  Beginner: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Advanced: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  Experienced: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
};

const PLANS = [
  { name: "Starting Strength", level: "Beginner", weeks: 4, trainDays: [0, 2, 4] },
  { name: "Push Pull Legs", level: "Advanced", weeks: 4, trainDays: [0, 1, 2, 3, 4, 5] },
  { name: "5/3/1 Strength Focus", level: "Experienced", weeks: 4, trainDays: [0, 1, 3, 4] },
  { name: "Upper/Lower Split", level: "Intermediate", weeks: 4, trainDays: [0, 2, 3, 5] },
];

function PlanCard({ plan }) {
  const daysPerWeek = plan.trainDays.length;
  return (
    <div className="group relative w-[260px] shrink-0 snap-start rounded-2xl border border-border bg-card p-6 overflow-hidden transition-colors hover:border-primary/40">
      <div
        className="absolute inset-0 opacity-[0.06] group-hover:opacity-10 transition-opacity"
        style={{ backgroundImage: "url(/hero-bg.jpg)", backgroundSize: "cover", backgroundPosition: "50% 30%", filter: "grayscale(1)" }}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <span className={cn("text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border", LEVEL_STYLE[plan.level])}>
            {plan.level}
          </span>
        </div>

        <div className="font-heading text-6xl tabular-nums leading-none mb-1">{plan.weeks}</div>
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Weeks</div>

        <h3 className="font-heading text-lg tracking-wide mb-3">{plan.name}</h3>

        <div className="flex items-center gap-1.5 mb-1.5" role="img" aria-label={`Trains ${daysPerWeek} days a week: ${plan.trainDays.map((d) => DAY_NAMES[d]).join(", ")}`}>
          {DAYS.map((d, i) => (
            <span
              key={i}
              title={DAY_NAMES[i]}
              className={cn(
                "w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-semibold",
                plan.trainDays.includes(i) ? "bg-primary text-white" : "bg-muted text-muted-foreground/50"
              )}
            >
              {d}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">{daysPerWeek}x per week</p>
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
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
