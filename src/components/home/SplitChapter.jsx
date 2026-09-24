import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { Reveal } from "@/components/home/Reveal";
import { cn } from "@/lib/utils";
import { APP_STORE_URL } from "@/lib/appStore";

// Apple-style counterpoint to FeatureChapter's full-bleed cinematic treatment:
// clean text-and-device split, sharp (unblurred) screenshot. Breaks the run
// of identical full-bleed chapters without abandoning the same
// headline/body/CTA vocabulary they share. Dark like the rest of the page —
// the contrast to the cinematic chapters comes from hairline edges and a
// soft glow behind the device, not from a light block.
export function SplitChapter({
  id,
  eyebrow,
  headline,
  body,
  bullets,
  image,
  imageAlt,
  reverse = false,
  // App Store listing once it exists, the FAQ until then (see FeatureChapter).
  href = APP_STORE_URL ?? "#faq",
}) {
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
      className="scroll-mt-24 relative py-24 md:py-32 overflow-hidden bg-background text-foreground border-y border-white/[0.06]"
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]",
          reverse ? "left-[5%]" : "right-[5%]"
        )}
      />
      <Reveal className="relative max-w-5xl mx-auto px-6">
        <div className={cn("grid md:grid-cols-2 gap-12 md:gap-16 items-center", reverse && "md:[&>*:first-child]:order-2")}>
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-white/70">{eyebrow}</div>
            <h2 className="font-heading text-4xl md:text-5xl uppercase tracking-wide leading-[0.98] text-balance mb-5">{headline}</h2>
            <p className="text-base md:text-lg leading-relaxed max-w-md text-white/70">{body}</p>
            {bullets && (
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            <a
              href={href}
              className="inline-flex items-center gap-2 mt-8 min-h-11 text-sm font-medium group rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <span className="border-b pb-0.5 transition-colors border-white/40 group-hover:border-white">Explore</span>
              <span className="w-7 h-7 rounded-full border flex items-center justify-center transition-colors border-white/40 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
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
              className="w-[210px] md:w-[230px] shadow-[0_0_70px_rgba(255,68,0,0.15)]"
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
