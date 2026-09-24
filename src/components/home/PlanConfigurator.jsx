import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { GOALS, DAYS_PER_WEEK, EQUIPMENT, buildExampleWeek } from "@/content/planExamples";
import { cn } from "@/lib/utils";

// A segmented control built from native radio buttons: Tab reaches the
// group, arrow keys move the choice, screen readers announce it as a radio
// group — no custom key handling needed.
function Segmented({ legend, name, options, value, onChange, itemMinWidth = "min-w-[5.5rem]" }) {
  return (
    <fieldset className="min-w-0">
      <legend className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70 mb-3">{legend}</legend>
      <div className="flex flex-wrap gap-1 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-1">
        {options.map((o) => {
          const id = `${name}-${o.id}`;
          const checked = value === o.id;
          return (
            <div key={o.id} className={cn("flex-1", itemMinWidth)}>
              <input
                type="radio"
                id={id}
                name={name}
                value={o.id}
                checked={checked}
                onChange={() => onChange(o.id)}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className={cn(
                  "flex min-h-11 cursor-pointer items-center justify-center rounded-xl px-3 py-1.5 text-center text-sm font-medium leading-tight transition-colors",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
                  checked ? "bg-primary text-primary-foreground" : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                )}
              >
                {o.label}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

export function PlanConfigurator() {
  const uid = useId();
  const [goal, setGoal] = useState("build_muscle");
  const [days, setDays] = useState(3);
  const [equipment, setEquipment] = useState("gym");
  const prefersReducedMotion = useReducedMotion();

  const week = buildExampleWeek({ goal, days, equipment });
  const goalLabel = GOALS.find((g) => g.id === goal).label;
  const equipmentLabel = EQUIPMENT.find((e) => e.id === equipment).label;

  return (
    <section id="try-it" aria-labelledby={`${uid}-title`} className="scroll-mt-24 py-20 md:py-28 bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <SectionHeader
            id={`${uid}-title`}
            eyebrow="Try it"
            title="Sketch your week."
            lead="Pick a goal, how often you train and what you train with — and see what a week could look like."
          />
        </Reveal>

        <Reveal className="mt-10 grid gap-6 md:grid-cols-[1.2fr_0.8fr_1.1fr]">
          <Segmented legend="Goal" name={`${uid}-goal`} options={GOALS} value={goal} onChange={setGoal} />
          <Segmented
            legend="Days a week"
            name={`${uid}-days`}
            options={DAYS_PER_WEEK.map((d) => ({ id: d, label: String(d) }))}
            value={days}
            onChange={setDays}
            itemMinWidth="min-w-[2.75rem]"
          />
          <Segmented legend="Equipment" name={`${uid}-equipment`} options={EQUIPMENT} value={equipment} onChange={setEquipment} />
        </Reveal>

        <div className="mt-10 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h3 className="font-heading uppercase text-xl md:text-2xl tracking-wide" aria-live="polite">
              {goalLabel} · {days} days · {equipmentLabel}
            </h3>
            <span className="rounded-full border border-primary/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              Example week
            </span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.ol
              key={`${goal}-${days}-${equipment}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {week.map((day) => (
                <li key={`${day.weekday}-${day.name}`} className="rounded-2xl border border-white/[0.06] bg-ink/60 p-4">
                  <div className="flex items-baseline justify-between gap-2 mb-3">
                    <span className="font-heading uppercase tracking-wide text-lg">{day.name}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{day.weekday}</span>
                  </div>
                  <ul className="space-y-2.5">
                    {day.exercises.map((ex) => (
                      <li key={ex.id} className="flex items-start justify-between gap-3 text-sm">
                        <span>
                          <span className="block font-medium">{ex.name}</span>
                          <span className="block text-xs text-muted-foreground">{ex.muscle}</span>
                        </span>
                        <span className="shrink-0 text-xs tabular-nums text-white/70 pt-0.5">{ex.sets}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </motion.ol>
          </AnimatePresence>

          <p className="mt-6 text-sm text-muted-foreground max-w-2xl leading-relaxed">
            A hand-picked example from the app's exercise library — not your plan. In the app, the AI builds your actual plan
            from your goal, level, equipment, training days and session length, and you can edit every day of it.
          </p>
        </div>
      </div>
    </section>
  );
}
