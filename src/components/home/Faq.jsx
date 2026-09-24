import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { FAQ_GROUPS } from "@/content/faq";
import { cn } from "@/lib/utils";

function FaqItem({ id, item, isOpen, onToggle }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="border-b border-white/[0.08]">
      <h4>
        <button
          type="button"
          id={`${id}-q`}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-a`}
          className="w-full min-h-12 flex items-center justify-between gap-4 py-5 text-left rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="text-base font-medium">{item.q}</span>
          <Plus aria-hidden="true" className={cn("w-4 h-4 text-primary shrink-0 transition-transform duration-300", isOpen && "rotate-45")} />
        </button>
      </h4>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed pb-5 pr-6 max-w-prose">
              {item.a}
              {item.link && (
                <>
                  {" "}
                  <Link to={item.link.to} className="text-foreground underline underline-offset-4 hover:text-primary rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary">
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

// One column, three small groups. Several answers can be open at once — a
// reader comparing two answers shouldn't lose the first one.
export function Faq() {
  const [open, setOpen] = useState(() => new Set(["app-0"]));
  const toggle = (key) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  return (
    <section id="faq" className="scroll-mt-24 py-20 md:py-28 bg-background text-foreground">
      <Reveal className="max-w-2xl mx-auto px-6">
        <SectionHeader className="mb-12" align="center" eyebrow="FAQ" title="Frequently asked questions" />
        <div className="space-y-12">
          {FAQ_GROUPS.map((group) => (
            <div key={group.id}>
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">{group.title}</h3>
              {group.items.map((item, i) => {
                const key = `${group.id}-${i}`;
                return <FaqItem key={key} id={`faq-${key}`} item={item} isOpen={open.has(key)} onToggle={() => toggle(key)} />;
              })}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
