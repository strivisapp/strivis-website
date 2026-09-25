import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { DownloadAction } from "@/components/download/DownloadAction";
import { Bezel } from "@/components/ui/bezel";
import { GOALS, DAYS_PER_WEEK, EQUIPMENT, buildExampleWeek } from "@/content/planExamples";
import { cn } from "@/lib/utils";

// A segmented control built from native radio buttons: Tab reaches the
// group, arrow keys move the choice, screen readers announce it as a radio
// group, no custom key handling needed.
function Segmented({ legend, name, options, value, onChange, itemMinWidth = "min-w-[5.5rem]" }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-small font-semibold text-white/80">{legend}</legend>
      <div className="flex flex-wrap gap-1 rounded-[26px] bg-white/[0.03] p-1 ring-1 ring-hairline">
        {options.map((o) => {
          const id = `${name}-${o.id}`;
          const checked = value === o.id;
          return (
            <div key={o.id} className={cn("flex-auto", itemMinWidth)}>
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
                  "press flex min-h-11 cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-3.5 py-1.5 text-center text-small font-semibold leading-tight",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink",
                  checked ? "bg-primary text-primary-foreground" : "text-white/70 hover:bg-white/[0.05] hover:text-white"
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
  const reduceMotion = useReducedMotion();

  const week = buildExampleWeek({ goal, days, equipment });
  const goalLabel = GOALS.find((g) => g.id === goal).label;
  const equipmentLabel = EQUIPMENT.find((e) => e.id === equipment).label;

  return (
    <section id="try-it" aria-labelledby={`${uid}-title`} className="scroll-mt-20 border-t border-hairline bg-surface-0 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <SectionHeader
            id={`${uid}-title`}
            title="Sketch your week."
            lead="Pick a goal, how often you train and what you train with, and see what a week could look like."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-[1.2fr_0.8fr_1.1fr]">
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
        </div>

        <Bezel className="mt-10" coreClassName="p-5 md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="font-heading uppercase text-h3" aria-live="polite">
              {goalLabel}, {days} days, {equipmentLabel}
            </h3>
            <p className="text-small text-white/60">Example week, not your plan.</p>
          </div>

          {/* The new week fades in over the old one at once (180 ms, a 2 px
              blur bridging the swap) instead of waiting for it to leave. */}
          <motion.ol
            key={`${goal}-${days}-${equipment}`}
            initial={reduceMotion ? false : { opacity: 0, filter: "blur(2px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {week.map((day) => (
              <li key={`${day.weekday}-${day.name}`} className="border-t border-hairline py-5">
                <div className="mb-3 flex items-baseline justify-between gap-2">
                  <span className="font-heading uppercase text-lg">{day.name}</span>
                  <span className="text-small text-white/55">{day.weekday}</span>
                </div>
                <ul className="space-y-2.5">
                  {day.exercises.map((ex) => (
                    <li key={ex.id} className="flex items-start justify-between gap-3 text-small">
                      <span>
                        <span className="block font-medium text-white">{ex.name}</span>
                        <span className="block text-white/55">{ex.muscle}</span>
                      </span>
                      <span className="shrink-0 pt-0.5 tabular-nums text-white/70">{ex.sets}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </motion.ol>

          <p className="mt-4 max-w-[70ch] text-small text-white/60">
            A hand-picked example from the app's exercise library. In the app, the AI builds your actual plan from your goal,
            level, equipment, training days and session length, and you can edit every day of it.
          </p>

          <div className="mt-6 flex flex-col gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-heading uppercase text-xl">Get your real plan in the app.</p>
            <DownloadAction variant="compact" />
          </div>
        </Bezel>
      </div>
    </section>
  );
}
