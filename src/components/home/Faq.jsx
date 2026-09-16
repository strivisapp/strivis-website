import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { cn } from "@/lib/utils";

const FAQ = [
  {
    q: "Ist Strivis kostenlos?",
    a: "Ja. Trainings- und Ernährungslogging, die Übungsdatenbank und ein kostenloser KI-Plan sind ohne Kosten nutzbar. Premium schaltet weitere KI-Pläne und die Plan-Bibliothek frei.",
  },
  {
    q: "Auf welchen Geräten läuft Strivis?",
    a: "Aktuell als iOS-App. Eine Version für Google Play ist in Vorbereitung.",
  },
  {
    q: "Wie werden meine Daten verarbeitet?",
    a: "Details dazu findest du in unserer Datenschutzerklärung.",
  },
  {
    q: "Kann ich meinen eigenen Trainingsplan erstellen?",
    a: "Ja, zusätzlich zu KI-generierten und kuratierten Plänen kannst du Pläne komplett selbst zusammenstellen.",
  },
  {
    q: "Läuft die Übungsdatenbank auch offline?",
    a: "Ja. Nach einmaligem Download stehen alle 601 Übungen mit Bild und Anleitung offline zur Verfügung.",
  },
  {
    q: "Kann ich mein Konto wieder löschen?",
    a: "Ja, jederzeit in den Kontoeinstellungen — deine Daten werden dabei unwiderruflich entfernt.",
  },
  {
    q: "Was, wenn ich auf mehreren Geräten trainiere?",
    a: "Dein Konto ist geräteübergreifend synchron — melde dich einfach überall mit denselben Zugangsdaten an.",
  },
  {
    q: "Woher stammen die Ernährungsdaten?",
    a: "Aus OpenFoodFacts und der USDA-Datenbank — echte, öffentlich gepflegte Lebensmitteldaten, keine Schätzwerte.",
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-border">
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 py-5 text-left" aria-expanded={isOpen}>
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
            <p className="text-muted-foreground text-sm leading-relaxed pb-5 pr-6">{item.a}</p>
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
    <section id="faq" className="scroll-mt-24 py-16">
      <Reveal className="max-w-4xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-wide uppercase text-primary mb-2 text-center">FAQ</div>
        <h2 className="font-heading text-2xl md:text-3xl tracking-wide mb-10 text-center">Häufige Fragen</h2>
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
