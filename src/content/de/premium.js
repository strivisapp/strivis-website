// Free vs Premium in German, line for line the same facts as ../premium.js
// (the app's real gating), worded like the app's German paywall and App
// Store description. No prices, no AI counts.
export const FREE_FEATURES = [
  "Eigene Trainingspläne, so viele du willst",
  "Drei Programme aus der Plan-Bibliothek: First Rep, Comeback und Hold Strong",
  "Training loggen mit vollständigem Verlauf und Rekord-Erkennung",
  "Ernährung loggen per Lebensmittelsuche und Barcode-Scanner",
  "Fünf Mahlzeiten per Foto",
  "Je zwei KI-Versuche für Trainingspläne und Rezepte",
  "Alle 601 Übungen, nach einem einmaligen Download offline",
  "Fortschrittsfotos und Datenexport",
  "Alle 76 Erfolge, die Monats-Challenge, der Jahresrückblick, Kraftstufen und Rekorde",
  "Die Community mit Beiträgen, einem Foto pro Beitrag und Reaktionen",
  "Die Apple-Watch-App, Cardio und Pläne, die Rücksicht auf Beschwerden nehmen",
];

export const PREMIUM_FEATURES = [
  "Jede Woche mehr KI-Trainingspläne und KI-Rezepte",
  "Acht weitere Programme in der Plan-Bibliothek",
  "Bis zu 15 Mahlzeiten am Tag per Foto",
  "Ein Kalorienziel, das sich jede Woche an deinen Gewichtsverlauf und dein Training anpasst",
  "Fortschritt über 6 Monate, ein Jahr oder die ganze Zeit, mit Plateau-Erkennung und Blockvergleich",
];

export const PREMIUM_BILLING = "Wochen-, Monats- oder Jahresabo. Preise im App Store.";

// "für Erfahrene", "ab Fortgeschritten", "für jedes Level" (the app's
// German level names: Einsteiger, Fortgeschritten, Erfahren).
const LEVEL = { beginner: "Einsteiger", intermediate: "Fortgeschritten", advanced: "Erfahren" };
const LEVEL_PLURAL = { beginner: "Einsteiger", intermediate: "Fortgeschrittene", advanced: "Erfahrene" };

export function levelLabel(levels) {
  if (levels.length >= 3) return "für jedes Level";
  if (levels.length === 2) return `ab ${LEVEL[levels[0]]}`;
  return `für ${LEVEL_PLURAL[levels[0]]}`;
}
