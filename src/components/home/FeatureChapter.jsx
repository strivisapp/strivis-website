import { motion } from "framer-motion";
import { Reveal } from "@/components/home/Reveal";
import { cn } from "@/lib/utils";

// One feature, one full-bleed screen — the Apple-style "chapter" pattern:
// a single dominant screenshot instead of an icon in a small card, a short
// headline fragment instead of a paragraph, alternating side and background
// per chapter for rhythm down the page.
export function FeatureChapter({ id, eyebrow, headline, body, stat, statLabel, image, imageAlt, dark = false, reverse = false }) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-20 md:py-28 overflow-hidden", dark ? "bg-[#0D0F14] text-[#F2F4F6]" : "bg-background text-foreground")}
    >
      <Reveal className="max-w-5xl mx-auto px-6">
        <div className={cn("grid md:grid-cols-2 gap-10 md:gap-16 items-center", reverse && "md:[&>*:first-child]:order-2")}>
          <div>
            <div className={cn("text-xs font-semibold tracking-wide uppercase mb-3", dark ? "text-primary" : "text-primary")}>{eyebrow}</div>
            <h2 className="font-heading text-4xl md:text-5xl tracking-wide leading-[1.03] text-balance mb-5">{headline}</h2>
            <p className={cn("text-base md:text-lg leading-relaxed max-w-sm", dark ? "text-white/65" : "text-muted-foreground")}>{body}</p>
            {stat && (
              <div className="mt-8">
                <div className="font-heading text-4xl tracking-wide text-primary tabular-nums">{stat}</div>
                <div className={cn("text-sm mt-1", dark ? "text-white/50" : "text-muted-foreground")}>{statLabel}</div>
              </div>
            )}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className={cn("absolute -inset-8 rounded-[3rem] blur-3xl -z-10", dark ? "bg-primary/10" : "bg-primary/[0.07]")} />
            <div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/20 mx-auto max-w-[280px] md:max-w-none">
              <img src={image} alt={imageAlt} className="w-full h-auto block" loading="lazy" />
            </div>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
