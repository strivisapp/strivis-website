import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_STORE_URL } from "@/lib/appStore";

// Ferrari-style cinematic chapter: the screenshot IS the full-bleed background
// (cropped/scaled, not boxed), headline + copy float directly on top with a
// gradient for legibility. `align` and `focus` vary per chapter so the
// sequence doesn't repeat the same composition four times in a row.
const ALIGN = {
  left: "items-end md:items-center justify-start text-left",
  right: "items-end md:items-center justify-end text-right md:text-right",
  center: "items-end md:items-center justify-center text-center",
};

// "Explore" leads to the App Store listing once it exists, the FAQ until then.
export function FeatureChapter({ id, eyebrow, headline, body, image, imageAlt, align = "left", focus = "50% 20%", href = APP_STORE_URL ?? "#faq" }) {
  return (
    <section id={id} className="scroll-mt-24 relative h-[92vh] min-h-[560px] max-h-[900px] overflow-hidden bg-black">
      <motion.img
        src={image}
        alt={imageAlt}
        initial={{ scale: 1.2, opacity: 0.6 }}
        whileInView={{ scale: 1.08, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full object-cover blur-[3px] saturate-[0.85]"
        style={{ objectPosition: focus }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-black/20" />

      <div className={cn("relative h-full flex px-6 pb-16 md:pb-24", ALIGN[align])}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70 mb-4">{eyebrow}</div>
          <h2 className="font-heading text-5xl md:text-7xl uppercase tracking-wide leading-[0.95] text-white text-balance mb-5">{headline}</h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-md">{body}</p>
          <a href={href} className="inline-flex items-center gap-2 mt-7 text-sm font-medium text-white group">
            <span className="border-b border-white/40 group-hover:border-white transition-colors pb-0.5">Explore</span>
            <span className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
