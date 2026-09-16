import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { Reveal } from "@/components/home/Reveal";
import { cn } from "@/lib/utils";

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
  href = "https://app.strivis.app",
}) {
  const dark = theme === "dark";

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-24 md:py-32 overflow-hidden",
        dark ? "bg-black text-white" : "bg-background text-foreground"
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
            <a href={href} className="inline-flex items-center gap-2 mt-8 text-sm font-medium group">
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
            initial={{ opacity: 0, y: 24, rotate: reverse ? 4 : -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: reverse ? 4 : -4 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <PhoneFrame
              src={image}
              alt={imageAlt}
              rotate={reverse ? 4 : -4}
              className={cn("w-[210px] md:w-[230px]", dark ? "shadow-[0_0_70px_rgba(255,68,0,0.15)]" : "shadow-2xl shadow-black/20")}
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
