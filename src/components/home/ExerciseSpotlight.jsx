import { motion } from "framer-motion";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { Reveal } from "@/components/home/Reveal";

// A dedicated section for the exercise database — the detail view (tabs,
// history, favorites) is a concrete, current differentiator worth more than
// a one-line stat buried in a feature card.
export function ExerciseSpotlight() {
  return (
    <section id="exercises" className="scroll-mt-24 relative bg-ink text-white py-24 md:py-32 overflow-hidden">
      <Reveal className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="font-heading text-7xl md:text-8xl text-primary tabular-nums mb-4 leading-none">601</div>
            <h2 className="font-heading uppercase text-2xl md:text-3xl tracking-wide mb-4">Exercises. Every one explained.</h2>
            <p className="text-white/65 text-base md:text-lg max-w-md">
              Image, step-by-step instructions, target muscles and your own history for every exercise — from the RepDB
              database, downloaded once, usable offline from then on.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/50">
              <li>Estimated 1RM, volume and set-by-set history per exercise</li>
              <li>Favorites, for the ones you come back to</li>
              <li>Start and end position of every movement</li>
            </ul>
          </div>
          <div className="flex justify-center gap-4">
            <motion.div initial={{ opacity: 0, y: 20, rotate: -4 }} whileInView={{ opacity: 1, y: 0, rotate: -4 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
              <PhoneFrame src="/screenshots/exercise-detail-fresh.png" alt="Exercise detail with info, history and favorites" rotate={-4} className="w-[170px] shadow-[0_0_60px_rgba(255,68,0,0.12)]" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20, rotate: 4 }} whileInView={{ opacity: 1, y: 0, rotate: 4 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-10">
              <PhoneFrame src="/screenshots/exercise-detail-execution-fresh.png" alt="Exercise instructions with image" rotate={4} className="w-[170px] shadow-[0_0_60px_rgba(255,68,0,0.12)]" />
            </motion.div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
