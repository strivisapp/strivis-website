import { motion, useReducedMotion } from "framer-motion";
import { MeshGradient } from "@paper-design/shaders-react";

// A single full-bleed editorial beat between the feature chapters — a
// pacing break, not another feature pitch. The background is a slow,
// ambient animated gradient (brand black + orange) rather than reused hero
// photography, so this section reads as its own moment, not a hero repeat.
export function Statement() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative h-[60vh] min-h-[420px] overflow-hidden bg-black">
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#0a0a0a", "#1a0e05", "#ff4500", "#0a0a0a"]}
        distortion={0.4}
        swirl={0.3}
        speed={prefersReducedMotion ? 0 : 0.08}
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative h-full flex items-center justify-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading uppercase text-4xl md:text-6xl text-white text-center max-w-3xl leading-[1.05] text-balance"
        >
          The plan bends around your life. <span className="text-primary">Not the other way around.</span>
        </motion.p>
      </div>
    </section>
  );
}
