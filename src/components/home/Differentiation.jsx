import { Check, X } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";

const STRONG = [
  "Tiefes Workout-Logging mit Echtzeit-PR-Erkennung",
  "KI-generierte Trainingspläne, abgestimmt auf dich",
  "601 Übungen mit Bild, Anleitung und eigener Historie",
  "Echtes Hell-/Dunkel-Design, keine halbfertige Umsetzung",
];

const MISSING = ["Keine Ernährungserkennung per Foto (wie z. B. Cal AI)", "Ernährung aktuell über Suche oder Barcode erfasst"];

export function Differentiation() {
  return (
    <section className="py-16 bg-background text-foreground">
      <Reveal className="max-w-5xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-wide uppercase text-primary mb-2 text-center">Ehrlich gesagt</div>
        <h2 className="font-heading text-2xl md:text-3xl tracking-wide mb-10 text-center text-balance">Wo Strivis heute steht.</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-primary bg-primary/[0.04] p-6">
            <h3 className="font-heading text-base tracking-wide mb-4">Heute stark</h3>
            <ul className="space-y-3">
              {STRONG.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-heading text-base tracking-wide mb-4">Noch nicht enthalten</h3>
            <ul className="space-y-3">
              {MISSING.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <X className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
