import { FeatureChapter } from "@/components/home/FeatureChapter";

const CHAPTERS = [
  {
    id: "features",
    eyebrow: "KI-Trainingspläne",
    headline: "Individuell. Nicht von der Stange.",
    body: "Du gibst Ziel, Level und Equipment an — die KI baut daraus einen Trainingsplan, der zu dir passt. Kein Standardprogramm, das für niemanden wirklich passt.",
    image: "/screenshots/plan-detail-fresh.png",
    imageAlt: "Ein KI-gestützter Trainingsplan mit Übungen, Sätzen und Wiederholungen",
    dark: true,
    reverse: false,
  },
  {
    id: "workout-logging",
    eyebrow: "Workout-Logging",
    headline: "Jeder Satz zählt. Ohne Zettel.",
    body: "Gewicht, Wiederholungen, Anstrengung — in Sekunden erfasst. Automatischer Pausen-Timer, PR-Erkennung in Echtzeit, deine letzte Ausführung immer im Blick.",
    image: "/screenshots/active-workout-fresh.png",
    imageAlt: "Aktives Training mit geloggten Sätzen, PR-Erkennung und Pausen-Timer",
    dark: false,
    reverse: true,
  },
  {
    id: "ernaehrung",
    eyebrow: "Ernährung",
    headline: "Erfasst. Nicht geschätzt.",
    body: "Barcode scannen oder aus echten Lebensmitteldaten suchen — OpenFoodFacts und USDA, keine Schätzwerte. Kalorien und Makros sofort im Bild.",
    image: "/screenshots/nutrition-confirm-fresh.png",
    imageAlt: "Ernährungslogging mit Kalorien- und Makro-Ringen sowie Nährwertangaben",
    dark: true,
    reverse: false,
  },
  {
    id: "fortschritt",
    eyebrow: "Fortschritt",
    headline: "Schwarz auf weiß, wie es läuft.",
    body: "Trainingsvolumen, persönliche Rekorde, Muskelgruppen-Verteilung — alles an einem Ort, aus deinen echten Trainingsdaten, nicht aus Schätzungen.",
    image: "/screenshots/progress-records-fresh.png",
    imageAlt: "Fortschrittsansicht mit Trainingsvolumen, persönlichen Rekorden und Muskelgruppen",
    dark: false,
    reverse: true,
  },
];

export function Features() {
  return (
    <>
      {CHAPTERS.map((c) => (
        <FeatureChapter key={c.id} {...c} />
      ))}
    </>
  );
}
