import { motion } from "framer-motion";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { Reveal } from "@/components/home/Reveal";

// A dedicated section for the exercise database — promoted from a one-line
// stat to its own showcase, since the detail view (tabs, history, favorites)
// is a concrete, current differentiator worth more than a number.
export function ExerciseSpotlight() {
  return (
    <section id="uebungsdatenbank" className="scroll-mt-24 bg-[#0D0F14] text-[#F2F4F6] py-20 overflow-hidden">
      <Reveal className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="font-heading text-5xl md:text-6xl text-primary tabular-nums mb-4">601 Übungen</div>
            <p className="text-white/70 text-lg max-w-md">
              Jede Übung mit Bild, Schritt-für-Schritt-Anleitung, Muskelgruppen und deiner eigenen
              Trainingshistorie — aus der RepDB-Datenbank, einmal geladen, danach offline nutzbar.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/60">
              <li>Geschätztes 1RM, Volumen und Satz-für-Satz-Historie pro Übung</li>
              <li>Favoriten zum schnellen Wiederfinden</li>
              <li>Start- und Endposition jeder Bewegung</li>
            </ul>
          </div>
          <div className="flex justify-center gap-4">
            <motion.div initial={{ opacity: 0, y: 20, rotate: -4 }} whileInView={{ opacity: 1, y: 0, rotate: -4 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
              <PhoneFrame src="/screenshots/exercise-detail-fresh.png" alt="Übungsdetail mit Info, Historie und Favoriten" rotate={-4} className="w-[170px] shadow-[0_0_60px_rgba(255,68,0,0.12)]" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20, rotate: 4 }} whileInView={{ opacity: 1, y: 0, rotate: 4 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-10">
              <PhoneFrame src="/screenshots/exercise-detail-execution-fresh.png" alt="Übungsanleitung mit Bild" rotate={4} className="w-[170px] shadow-[0_0_60px_rgba(255,68,0,0.12)]" />
            </motion.div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
