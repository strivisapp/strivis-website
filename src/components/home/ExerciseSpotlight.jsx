import { motion, useReducedMotion } from "framer-motion";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { Reveal } from "@/components/home/Reveal";
import { PREVIEW_EXERCISES, EXERCISE_COUNT } from "@/content/exercises";

// A dedicated section for the exercise database — the detail view (tabs,
// history, favorites) is a concrete, current differentiator worth more than
// a one-line stat buried in a feature card. Below it, a handful of real
// entries from the catalog with the same illustrations the app shows.
export function ExerciseSpotlight() {
  const prefersReducedMotion = useReducedMotion();
  const tilt = (rotate, delay = 0) => ({
    initial: prefersReducedMotion ? false : { opacity: 0, y: 20, rotate },
    whileInView: { opacity: 1, y: 0, rotate },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay },
  });

  return (
    <section id="exercises" className="scroll-mt-24 relative bg-ink text-white py-24 md:py-32 overflow-hidden">
      <Reveal className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="font-heading text-7xl md:text-8xl text-primary tabular-nums mb-4 leading-none">{EXERCISE_COUNT}</div>
            <h2 className="font-heading uppercase text-2xl md:text-3xl tracking-wide mb-4">Exercises. Every one explained.</h2>
            <p className="text-white/70 text-base md:text-lg max-w-md">
              Image, step-by-step instructions, target muscles and your own history for every exercise — from the RepDB
              database, downloaded once, usable offline from then on.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/60">
              <li>Estimated 1RM, volume and set-by-set history per exercise</li>
              <li>Favorites, for the ones you come back to</li>
              <li>Start and end position of every movement</li>
            </ul>
          </div>
          <div className="flex justify-center gap-4">
            <motion.div {...tilt(-4)}>
              <PhoneFrame src="/screenshots/exercise-detail-fresh.png" alt="Exercise detail with info, history and favorites" rotate={-4} className="w-[150px] sm:w-[170px] shadow-[0_0_60px_rgba(255,68,0,0.12)]" />
            </motion.div>
            <motion.div {...tilt(4, 0.1)} className="mt-10">
              <PhoneFrame src="/screenshots/exercise-detail-execution-fresh.png" alt="Exercise instructions with image" rotate={4} className="w-[150px] sm:w-[170px] shadow-[0_0_60px_rgba(255,68,0,0.12)]" />
            </motion.div>
          </div>
        </div>
      </Reveal>

      <Reveal className="max-w-5xl mx-auto px-6 mt-20 md:mt-28">
        <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70 mb-6">A few from the library</h3>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {PREVIEW_EXERCISES.map((ex) => (
            <li key={ex.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-2.5 md:p-3">
              <img
                src={ex.image}
                alt={`${ex.name}, illustrated`}
                width={512}
                height={512}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full rounded-xl object-cover"
              />
              <div className="px-1 pt-3 pb-1">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{ex.area}</div>
                <div className="mt-1 font-medium text-sm md:text-base leading-snug">{ex.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{ex.muscle}</div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-base md:text-lg text-white/70">
          <span className="font-heading text-2xl text-white tabular-nums mr-2">{EXERCISE_COUNT}</span>
          exercises in the app — available offline after a one-time download.
        </p>
      </Reveal>
    </section>
  );
}
