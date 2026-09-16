import { motion } from "framer-motion";
import { useParallax } from "@/hooks/useParallax";

// A single full-bleed editorial beat between the feature chapters — a
// pacing break, not another feature pitch. Reuses the hero photo so the page
// doesn't need photography it doesn't have, treated differently (desaturated,
// darker, no gradient-into-content) so it doesn't read as a hero repeat.
export function Statement() {
  const parallaxRef = useParallax(0.1);

  return (
    <section className="relative h-[60vh] min-h-[420px] overflow-hidden bg-black">
      <div ref={parallaxRef} className="absolute inset-0 -top-16 -bottom-16">
        <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover opacity-30 grayscale" />
      </div>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative h-full flex items-center justify-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading uppercase text-4xl md:text-6xl text-white text-center max-w-3xl leading-[1.05] text-balance"
        >
          The plan bends around your life. <span className="text-primary">Not the other way around.</span>
        </motion.p>
      </div>
    </section>
  );
}
