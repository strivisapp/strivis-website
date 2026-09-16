import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { useParallax } from "@/hooks/useParallax";

// Hero and product preview merged into one screen: the phone straightens out
// of its tilt as the visitor scrolls through, instead of a separate static
// "product preview" section further down the page.
export function Hero({ heroEndRef }) {
  const parallaxRef = useParallax(0.15);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const rotateY = useTransform(scrollYProgress, [0, 1], [-22, -6]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [4, 0]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0D0F14] text-[#F2F4F6] pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="absolute inset-0">
        <div ref={parallaxRef} className="absolute inset-0 -top-20 -bottom-20">
          <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover opacity-45" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0D0F14]/75 to-[#0D0F14]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <h1 className="font-heading text-4xl md:text-5xl leading-[1.05] tracking-wide text-balance">
              Ein Ort für Training, Ernährung und Fortschritt.
            </h1>
            <p className="mt-5 text-white/70 text-lg max-w-md">
              Trainingspläne, die sich anpassen. Ernährung, die du in Sekunden loggst. Fortschritt, den du
              wirklich siehst.
            </p>
            <div className="mt-8">
              <Button size="lg" className="rounded-full h-12 px-8" asChild>
                <a href="https://app.strivis.app">Jetzt kostenlos starten →</a>
              </Button>
              <p className="mt-3 text-xs text-white/60">app.strivis.app · kein Abo nötig</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center relative h-[420px]"
            style={{ y: phoneY }}
          >
            <div className="absolute -inset-6 rounded-[3rem] bg-primary/15 blur-3xl -z-10" />
            <PhoneFrame src="/screenshots/dashboard-fresh.png" alt="Strivis Dashboard" rotateY={rotateY} rotateX={rotateX} className="w-[230px]" />
          </motion.div>
        </div>
      </div>
      <div ref={heroEndRef} className="h-px" />
    </section>
  );
}
