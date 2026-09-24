import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { Reveal } from "@/components/home/Reveal";
import { cn } from "@/lib/utils";
import { APP_STORE_URL } from "@/lib/appStore";

// Apple-style counterpoint to FeatureChapter's full-bleed cinematic treatment:
// clean text-and-device split on a solid ground, sharp (unblurred) screenshot.
// Breaks the run of identical full-bleed chapters without abandoning the
// same headline/body/CTA vocabulary they share.
export function SplitChapter({
  id,
  eyebrow,
  headline,
  body,
  bullets,
  image,
  imageAlt,
  theme = "light",
  reverse = false,
  // App Store listing once it exists, the FAQ until then (see FeatureChapter).
  href = APP_STORE_URL ?? "#faq",
}) {
  const dark = theme === "dark";
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const sign = reverse ? -1 : 1;
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [0, 0, 0] : [sign * 24, sign * 6, sign * -10]
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "scroll-mt-24 py-24 md:py-32 overflow-hidden",
        dark ? "bg-ink text-white" : "bg-background text-foreground"
      )}
    >
      <Reveal className="max-w-5xl mx-auto px-6">
        <div className={cn("grid md:grid-cols-2 gap-12 md:gap-16 items-center", reverse && "md:[&>*:first-child]:order-2")}>
          <div>
            <div className={cn("text-xs font-semibold tracking-[0.2em] uppercase mb-4", dark ? "text-white/60" : "text-muted-foreground")}>
              {eyebrow}
            </div>
            <h2 className="font-heading text-4xl md:text-5xl uppercase tracking-wide leading-[0.98] text-balance mb-5">{headline}</h2>
            <p className={cn("text-base md:text-lg leading-relaxed max-w-md", dark ? "text-white/65" : "text-muted-foreground")}>{body}</p>
            {bullets && (
              <ul className={cn("mt-6 space-y-2 text-sm", dark ? "text-white/50" : "text-muted-foreground")}>
                {bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            <a href={href} className="inline-flex items-center gap-2 mt-8 text-sm font-medium group rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">
              <span className={cn("border-b pb-0.5 transition-colors", dark ? "border-white/40 group-hover:border-white" : "border-foreground/30 group-hover:border-foreground")}>
                Explore
              </span>
              <span
                className={cn(
                  "w-7 h-7 rounded-full border flex items-center justify-center transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white",
                  dark ? "border-white/40" : "border-foreground/30"
                )}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
            style={{ perspective: 1400 }}
          >
            <PhoneFrame
              src={image}
              alt={imageAlt}
              rotateY={rotateY}
              rotateX={4}
              className={cn("w-[210px] md:w-[230px]", dark ? "shadow-[0_0_70px_rgba(255,68,0,0.15)]" : "shadow-2xl shadow-ink/20")}
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
