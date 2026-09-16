import { Reveal } from "@/components/home/Reveal";

export function ProblemSolution() {
  return (
    <section className="py-14">
      <Reveal className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-heading text-lg tracking-wide mb-2">Das Problem</h3>
            <p className="text-muted-foreground">
              Ein Tool für Trainingspläne, ein anderes fürs Kalorienzählen, eine Tabelle für den
              Fortschritt. Nichts davon spricht miteinander.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-lg tracking-wide mb-2">Die Lösung</h3>
            <p className="text-muted-foreground">
              Strivis bringt Training, Ernährung und Fortschritt in eine App — mit KI-Unterstützung, wo
              sie wirklich hilft, und echten Daten, wo es zählt.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
