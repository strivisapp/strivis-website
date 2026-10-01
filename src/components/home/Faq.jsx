import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { FAQ_GROUPS } from "@/content/faq";
import { useOpenSet } from "@/hooks/useOpenSet";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.23, 1, 0.32, 1];

// One question and its answer. Opens in 220 ms, closes faster (160 ms);
// with reduced motion it only fades. Several can be open at once: a reader
// comparing two answers shouldn't lose the first one. Also used on /support.
export function FaqItem({ id, item, isOpen, onToggle, headingLevel: H = "h4" }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="border-b border-hairline">
      <H>
        <button
          type="button"
          id={`${id}-q`}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-a`}
          className="flex min-h-12 w-full items-center justify-between gap-4 rounded-sm py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          <span className="text-body font-semibold text-white">{item.q}</span>
          <Plus aria-hidden="true" className={cn("h-4 w-4 shrink-0 text-primary transition-transform duration-200 ease-out", isOpen && "rotate-45")} />
        </button>
      </H>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1, transition: { duration: 0.22, ease: EASE_OUT } }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0, transition: { duration: 0.16, ease: EASE_OUT } }}
            className="overflow-hidden"
          >
            <p className="max-w-[65ch] pb-5 pr-6 text-body text-white/70">
              {item.a}
              {item.link && (
                <>
                  {" "}
                  <Link to={item.link.to} className="rounded-sm text-white underline hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    {item.link.label}
                  </Link>
                  .
                </>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// One column, three small groups with quiet labels (not orange capitals).
export function Faq() {
  const [open, toggle] = useOpenSet(["app-0"]);

  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 border-t border-hairline bg-surface-0 py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-5 sm:px-6">
        <Reveal>
          <SectionHeader id="faq-title" title="Questions." />
        </Reveal>
        <div className="mt-10 space-y-12">
          {FAQ_GROUPS.map((group) => (
            <div key={group.id}>
              <h3 className="mb-1 text-small font-semibold text-white/60">{group.title}</h3>
              {group.items.map((item, i) => {
                const key = `${group.id}-${i}`;
                return <FaqItem key={key} id={`faq-${key}`} item={item} isOpen={open.has(key)} onToggle={() => toggle(key)} />;
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
