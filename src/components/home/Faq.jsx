import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/home/Reveal";

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
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 py-14">
      <Reveal className="max-w-2xl mx-auto px-6">
        <h2 className="font-heading text-2xl tracking-wide mb-6 text-center">Häufige Fragen</h2>
        <Accordion type="single" collapsible>
          {FAQ.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-medium">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
