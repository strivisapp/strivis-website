import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { cn } from "@/lib/utils";

const FAQ = [
  {
    q: "Is Strivis free?",
    a: "Yes. Workout and nutrition logging, the exercise database and one free AI plan are all free to use. Premium unlocks further AI plans and the plan library.",
  },
  {
    q: "What devices does Strivis run on?",
    a: "Currently as an iOS app. A Google Play version is in the works.",
  },
  {
    q: "How is my data handled?",
    a: (
      <>
        You can delete your data together with your account at any time, right in the app. All the details are in our{" "}
        <Link to="/datenschutz" className="text-foreground underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
  {
    q: "Can I build my own training plan?",
    a: "Yes — alongside AI-generated and curated plans, you can put together a plan entirely yourself.",
  },
  {
    q: "Does the exercise database work offline?",
    a: "Yes. After a one-time download, all 601 exercises with image and instructions are available offline.",
  },
  {
    q: "Can I delete my account again?",
    a: "Yes, anytime in account settings — your data is permanently removed with it.",
  },
  {
    q: "What if I train on more than one device?",
    a: "Your account syncs across devices — just log in anywhere with the same credentials.",
  },
  {
    q: "Where does the nutrition data come from?",
    a: "OpenFoodFacts and the USDA database — real, publicly maintained food data, not estimates.",
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-border">
      <button onClick={onToggle} className="w-full min-h-12 flex items-center justify-between gap-4 py-5 text-left rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background" aria-expanded={isOpen}>
        <span className="text-sm md:text-base font-medium">{item.q}</span>
        <Plus className={cn("w-4 h-4 text-primary shrink-0 transition-transform duration-300", isOpen && "rotate-45")} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground text-sm leading-relaxed pb-5 pr-6 max-w-prose">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  const left = FAQ.slice(0, 4);
  const right = FAQ.slice(4);

  return (
    <section id="faq" className="scroll-mt-24 py-20 md:py-28 bg-background text-foreground">
      <Reveal className="max-w-4xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-2 text-center">FAQ</div>
        <h2 className="font-heading text-2xl md:text-3xl tracking-wide mb-10 text-center">Frequently asked questions</h2>
        <div className="grid md:grid-cols-2 md:gap-x-10">
          <div>
            {left.map((item, i) => (
              <FaqItem key={item.q} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
          <div>
            {right.map((item, i) => {
              const idx = i + 4;
              return <FaqItem key={item.q} item={item} isOpen={open === idx} onToggle={() => setOpen(open === idx ? -1 : idx)} />;
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
