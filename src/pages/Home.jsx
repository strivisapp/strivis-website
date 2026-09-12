import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { Reveal } from "@/components/home/Reveal";
import { useParallax } from "@/hooks/useParallax";
import { Sparkles, ListChecks, Utensils, TrendingUp, Dumbbell } from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "KI-Trainingspläne",
    desc: "Ein KI-generierter Plan, abgestimmt auf dein Level, dein Ziel und deine Ausrüstung — einmal kostenlos, danach mit Premium.",
  },
  {
    icon: ListChecks,
    title: "Workout-Logging, das mitdenkt",
    desc: "Sätze per Wisch erledigen, automatischer Pausen-Timer, PR-Erkennung in Echtzeit — kein Stift, kein Notizzettel.",
  },
  {
    icon: Utensils,
    title: "Ernährung in Sekunden",
    desc: "Barcode scannen oder aus einer Datenbank mit echten Lebensmitteldaten suchen (OpenFoodFacts & USDA) — sofort geloggt.",
    image: "/screenshots/nutrition-dark.png",
  },
  {
    icon: TrendingUp,
    title: "Fortschritt, den du siehst",
    desc: "Gewicht, Fotos und Trainingsverlauf an einem Ort — statt verstreuter Notizen und geschätzter Erinnerung.",
  },
];

const PLANS = [
  { name: "Starting Strength", level: "Einsteiger", weeks: 4 },
  { name: "Push Pull Legs", level: "Fortgeschritten", weeks: 4 },
  { name: "5/3/1 Kraftfokus", level: "Erfahren", weeks: 4 },
];

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

function Section({ children, className = "", dark = false, id, reveal = true }) {
  const Inner = reveal ? Reveal : "div";
  return (
    <section id={id} className={`scroll-mt-20 ${dark ? "bg-[#0D0F14] text-[#F2F4F6]" : ""} ${className}`}>
      <Inner className="max-w-5xl mx-auto px-6">{children}</Inner>
    </section>
  );
}

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#plaene", label: "Pläne" },
  { href: "#faq", label: "FAQ" },
];

export default function Home() {
  const parallaxRef = useParallax(0.15);

  return (
    <div className="bg-background text-foreground">
      {/* Nav */}
      <header className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <img src="/brand/strivis-icon-mark-orange-dark.svg" alt="Strivis" className="h-8" />
        <nav className="hidden sm:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Button size="sm" className="rounded-full" asChild>
          <a href="https://app.strivis.app">Jetzt starten</a>
        </Button>
      </header>

      {/* 01 Hero */}
      <section className="relative overflow-hidden bg-[#0D0F14] text-[#F2F4F6] py-16 md:py-24">
        <div className="absolute inset-0">
          <div ref={parallaxRef} className="absolute inset-0 -top-20 -bottom-20">
            <img
              src="/hero-bg.jpg"
              alt=""
              className="w-full h-full object-cover opacity-45"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0D0F14]/75 to-[#0D0F14]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl leading-[1.05] tracking-wide text-balance">
                Ein Ort für Training, Ernährung und Fortschritt.
              </h1>
              <p className="mt-5 text-white/70 text-lg max-w-md">
                Trainingspläne, die sich anpassen. Ernährung, die du in Sekunden loggst. Fortschritt,
                den du wirklich siehst.
              </p>
              <div className="mt-8">
                <Button size="lg" className="rounded-full h-12 px-8" asChild>
                  <a href="https://app.strivis.app">Jetzt kostenlos starten →</a>
                </Button>
                <p className="mt-3 text-xs text-white/40">app.strivis.app · kein Abo nötig</p>
              </div>
            </div>
            <div className="flex justify-center relative h-[380px]">
              <PhoneFrame
                src="/screenshots/dashboard-dark.png"
                alt="Strivis Dashboard"
                rotate={-6}
                className="absolute left-[20%] top-2"
              />
              <PhoneFrame
                src="/screenshots/activeworkout-dark.png"
                alt="Strivis Workout-Logging"
                rotate={6}
                className="absolute left-[38%] top-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 02 Value props */}
      <Section className="py-14 text-center">
        <p className="font-heading text-2xl md:text-3xl tracking-wide leading-snug">
          Trainiere smarter.{" "}
          <span className="text-primary">Iss bewusster.</span>
          <br />
          Sieh deinen Fortschritt.
        </p>
      </Section>

      {/* 03 Problem -> Solution */}
      <Section className="py-14">
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
              Strivis bringt Training, Ernährung und Fortschritt in eine App — mit KI-Unterstützung,
              wo sie wirklich hilft, und echten Daten, wo es zählt.
            </p>
          </div>
        </div>
      </Section>

      {/* 04 Features */}
      <Section id="features" className="py-14">
        <div className="grid sm:grid-cols-2 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading text-lg tracking-wide mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
              {f.image && (
                <div className="mt-4 -mb-6 -mx-6 rounded-t-xl overflow-hidden border-t border-border">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-40 object-cover object-top"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* 05 Big stat */}
      <Section dark className="py-20 text-center">
        <div className="font-heading text-5xl md:text-6xl text-primary tabular-nums">601 Übungen</div>
        <p className="mt-3 text-white/60">
          Mit Bildern und Anleitung, aus der RepDB-Datenbank — einmal geladen, danach offline nutzbar.
        </p>
      </Section>

      {/* 06 Plan carousel */}
      <Section id="plaene" className="py-14">
        <h2 className="font-heading text-2xl tracking-wide mb-6 text-center">
          Trainingspläne-Bibliothek
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {PLANS.map((p) => (
            <div key={p.name} className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="aspect-[4/3] bg-primary/10 flex items-center justify-center">
                <Dumbbell className="w-8 h-8 text-primary" />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-base tracking-wide">{p.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {p.level} · {p.weeks} Wochen
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 07 Differentiation */}
      <Section className="py-14">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-primary bg-card p-6">
            <h3 className="font-heading text-lg tracking-wide mb-2">Was Strivis heute stark macht</h3>
            <p className="text-sm text-muted-foreground">
              Tiefes Workout-Logging mit PR-Tracking, KI-Trainingspläne, eine Übungsdatenbank mit
              601 Einträgen, echtes Hell/Dunkel-Design.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-heading text-lg tracking-wide mb-2">Noch nicht enthalten</h3>
            <p className="text-sm text-muted-foreground">
              Keine Ernährungserkennung per Foto (wie z. B. Cal AI). Ernährung wird aktuell über
              Suche oder Barcode erfasst.
            </p>
          </div>
        </div>
      </Section>

      {/* 08 Social proof — deferred, no fabricated content */}

      {/* 09 CTA repeat */}
      <Section dark className="py-16 text-center">
        <h2 className="font-heading text-2xl md:text-3xl tracking-wide">
          Bereit, alles an einem Ort zu haben?
        </h2>
        <Button size="lg" className="rounded-full h-12 px-8 mt-6" asChild>
          <a href="https://app.strivis.app">Jetzt kostenlos starten →</a>
        </Button>
      </Section>

      {/* 10 FAQ */}
      <Section id="faq" className="py-14 max-w-2xl">
        <h2 className="font-heading text-2xl tracking-wide mb-6 text-center">Häufige Fragen</h2>
        <Accordion type="single" collapsible>
          {FAQ.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-medium">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* 11 Footer */}
      <footer className="border-t border-border py-10 mt-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/brand/strivis-icon-mark-orange-dark.svg" alt="Strivis" className="h-6" />
            <span className="font-heading tracking-wide">Strivis</span>
          </div>
          <nav className="flex gap-5 text-sm text-muted-foreground">
            <a href="/datenschutz" className="hover:text-foreground">Datenschutz</a>
            <a href="/agb" className="hover:text-foreground">AGB</a>
            <a href="/impressum" className="hover:text-foreground">Impressum</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
