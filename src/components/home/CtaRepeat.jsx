import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/home/Reveal";

export function CtaRepeat() {
  return (
    <section className="relative bg-[#0D0F14] text-[#F2F4F6] py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0F14] via-[#0D0F14]/70 to-[#0D0F14]" />
        <motion.div
          className="absolute left-1/2 top-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <Reveal className="relative max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-heading text-4xl md:text-6xl tracking-wide leading-[1.02] text-balance mb-6">Bereit, alles an einem Ort zu haben?</h2>
        <p className="text-white/60 text-base md:text-lg mb-10 max-w-md mx-auto">Kostenlos starten, direkt im Browser — kein Abo nötig.</p>
        <Button size="lg" className="rounded-full h-14 px-10 text-base" asChild>
          <a href="https://app.strivis.app">Jetzt kostenlos starten →</a>
        </Button>
      </Reveal>
    </section>
  );
}
