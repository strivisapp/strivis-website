import { Reveal } from "@/components/home/Reveal";

export function Differentiation() {
  return (
    <section className="py-14">
      <Reveal className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-primary bg-card p-6">
            <h3 className="font-heading text-lg tracking-wide mb-2">Was Strivis heute stark macht</h3>
            <p className="text-sm text-muted-foreground">
              Tiefes Workout-Logging mit PR-Tracking, KI-Trainingspläne, eine Übungsdatenbank mit 601
              Einträgen, echtes Hell/Dunkel-Design.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-heading text-lg tracking-wide mb-2">Noch nicht enthalten</h3>
            <p className="text-sm text-muted-foreground">
              Keine Ernährungserkennung per Foto (wie z. B. Cal AI). Ernährung wird aktuell über Suche
              oder Barcode erfasst.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
