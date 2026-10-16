// The FAQ in German: the same questions, groups and links as ../faq.js,
// worded from the app's German texts (de.json, App Store description). Plain
// data, like the English file; change both together and only with the app.
export const FAQ_GROUPS = [
  {
    id: "app",
    title: "Die App",
    items: [
      {
        q: "Auf welchen Geräten läuft Strivis?",
        a: "Aktuell als iOS-App. Eine Version für Google Play ist in Arbeit.",
      },
      {
        q: "Kann ich meinen eigenen Trainingsplan erstellen?",
        a: "Ja. Neben KI-Plänen und kuratierten Plänen kannst du einen Plan komplett selbst zusammenstellen.",
      },
      {
        q: "Funktioniert die Übungsdatenbank offline?",
        a: "Ja. Nach einem einmaligen Download hast du alle 601 Übungen mit Bild und Anleitung auch offline.",
      },
      {
        q: "Was, wenn ich auf mehreren Geräten trainiere?",
        a: "Dein Konto synchronisiert sich über alle Geräte. Melde dich überall mit denselben Zugangsdaten an.",
      },
    ],
  },
  {
    id: "data",
    title: "Deine Daten",
    items: [
      {
        q: "Wie geht ihr mit meinen Daten um?",
        a: "Du kannst dein Konto jederzeit in den Kontoeinstellungen der App löschen, und deine Daten werden dabei endgültig entfernt. Alle Details stehen in unserer",
        link: { to: "/datenschutz", label: "Datenschutzerklärung" },
      },
      {
        q: "Woher kommen die Nährwerte?",
        a: "Grundlebensmittel stammen aus dem Bundeslebensmittelschlüssel (BLS) und der Schweizer Nährwertdatenbank, eingebaut in die App und offline verfügbar. Verpackte Lebensmittel und Barcodes kommen von Open Food Facts. Echte, öffentlich gepflegte Daten statt Schätzungen.",
      },
    ],
  },
  {
    id: "premium",
    title: "Premium und Preise",
    items: [
      {
        q: "Ist Strivis kostenlos?",
        // Same facts as ./premium.js (the app's real gating).
        a: "Ja. Training und Ernährung loggen mit Barcode-Scanner, die Übungsdatenbank, drei Programme aus der Plan-Bibliothek und je zwei KI-Versuche für Trainingspläne und Rezepte sind kostenlos. Premium bringt ein Kalorienziel, das sich an deinen Gewichtsverlauf und dein Training anpasst, jede Woche mehr KI, acht weitere Programme und tiefere Auswertungen.",
      },
      {
        q: "Was kostet Premium?",
        a: "Premium gibt es als Wochen-, Monats- oder Jahresabo. Die Preise hängen von deinem Land ab und kommen direkt aus dem App Store; deinen Preis siehst du in der App vor dem Kauf. Kündigen kannst du jederzeit in den Abo-Einstellungen deines Geräts.",
      },
    ],
  },
];

export const FAQ_ITEMS = FAQ_GROUPS.flatMap((g) => g.items);
