import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { AppStoreButton } from "@/components/home/AppStoreButton";
import { useParallax } from "@/hooks/useParallax";

// Pure cinematic opening — full-bleed photography and one line of type, no UI
// chrome yet. The product itself is revealed chapter by chapter below.
export function Hero({ heroEndRef }) {
  const parallaxRef = useParallax(0.15);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={sectionRef} className="relative h-[100dvh] min-h-[640px] overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <div ref={parallaxRef} className="absolute inset-0 -top-20 -bottom-20">
          <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover opacity-70" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
      </div>

      <motion.div style={{ opacity: contentOpacity, y: contentY }} className="relative h-full flex flex-col justify-end px-6 pb-20 md:pb-28">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="max-w-4xl">
          <h1 className="font-heading uppercase text-6xl md:text-8xl leading-[0.92] tracking-wide text-balance mb-6">
            Train.
            <br />
            Track.
            <br />
            <span className="text-primary">Progress.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-md mb-9">One app for training, nutrition and progress — built around what you actually do.</p>
          <div className="flex items-center gap-6 flex-wrap">
            <AppStoreButton />
            <span className="text-xs text-white/50">For iPhone · no subscription required</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 right-6 md:right-10 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase [writing-mode:vertical-rl]">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      <div ref={heroEndRef} className="absolute bottom-0 h-px w-full" />
    </section>
  );
}
