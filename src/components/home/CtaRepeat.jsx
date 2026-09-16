import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/home/Reveal";

export function CtaRepeat() {
  return (
    <section className="bg-[#0D0F14] text-[#F2F4F6] py-16 text-center">
      <Reveal className="max-w-5xl mx-auto px-6">
        <h2 className="font-heading text-2xl md:text-3xl tracking-wide">Bereit, alles an einem Ort zu haben?</h2>
        <Button size="lg" className="rounded-full h-12 px-8 mt-6" asChild>
          <a href="https://app.strivis.app">Jetzt kostenlos starten →</a>
        </Button>
      </Reveal>
    </section>
  );
}
