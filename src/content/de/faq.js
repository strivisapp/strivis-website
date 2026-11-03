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
        a: "Aktuell als iOS-App, dazu eine App für die Apple Watch. Eine Version für Google Play ist in Arbeit.",
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
      {
        q: "Kann ich nur mit der Apple Watch trainieren?",
        a: "Ja. Die Uhr speichert dein nächstes geplantes Training, du kannst es also ohne iPhone starten und jeden Satz dort loggen. Die Sätze kommen danach über dein iPhone in dein Konto. Die Watch-App ist kostenlos.",
      },
      {
        q: "Wie funktioniert die Mahlzeit per Foto?",
        a: "Mach ein Foto oder wähle eins aus deiner Mediathek und ergänze auf Wunsch eine Notiz. Die KI erkennt die Lebensmittel und schätzt die Gramm, du prüfst die Mengen, bevor etwas eingetragen wird. Ohne Abo hast du insgesamt fünf Analysen, mit Premium bis zu 15 am Tag. Du brauchst dafür Internet und deine Einwilligung in die KI-Funktionen. Das Foto wird nicht gespeichert.",
      },
      {
        q: "Was sind Erfolge?",
        a: "76 Medaillen in vier Stufen: Bronze, Silber, Gold und Selten. Manche bleiben geheim, bis du sie verdient hast. Alle sind kostenlos, genau wie die Monats-Challenge, der Jahresrückblick im Dezember und Januar und die Kraftstufen.",
      },
      {
        q: "Wie funktioniert die Monats-Challenge?",
        a: "Du machst für den Monat mit und bekommst ein persönliches Ziel von 4 bis 24 Trainings, passend zu deiner Trainingswoche. Cardio zählt mit. Ab 20 Teilnehmenden zeigt ein gemeinsamer Zähler die Summen der Community, ohne Namen. Eine Rangliste gibt es nicht.",
      },
      {
        q: "Was sind Kraftstufen?",
        a: "Für Kniebeuge, Bankdrücken, Kreuzheben, Schulterdrücken, Langhantelrudern und Klimmzüge vergleicht Strivis dein geschätztes Maximum mit deinem Körpergewicht und zeigt eine von fünf Stufen, von Einsteiger bis Elite. Der Maßstab für Männer oder Frauen kommt aus deinem Geschlecht oder deiner eigenen Wahl.",
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
        q: "Wer sieht meine Erfolge?",
        a: "Erfolge zu Training und Community erscheinen auf deinem Profil, für alle, die es sehen dürfen. Erfolge zu Ernährung und Körper und sechs persönliche siehst nur du. Neue Erfolge in Gold und Selten gehen an deine Follower, außer du schaltest das unter Einstellungen › Privatsphäre aus. Die Details stehen in unserer",
        link: { to: "/datenschutz", label: "Datenschutzerklärung" },
      },
      {
        q: "Woher kommen die Nährwerte?",
        a: "Grundlebensmittel stammen aus dem Bundeslebensmittelschlüssel (BLS) und der Schweizer Nährwertdatenbank, eingebaut in die App und offline verfügbar. Verpackte Lebensmittel und Barcodes kommen von Open Food Facts. Bei einer Mahlzeit per Foto schätzt die KI die Mengen und du prüfst sie; ein Gericht, das keine der Datenbanken kennt, ist als geschätzt markiert.",
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
        a: "Ja. Training und Ernährung loggen mit Barcode-Scanner, die Übungsdatenbank, drei Programme aus der Plan-Bibliothek, je zwei KI-Versuche für Trainingspläne und Rezepte, fünf Mahlzeiten per Foto, die Apple-Watch-App, die Community und alle Erfolge sind kostenlos. Premium bringt ein Kalorienziel, das sich an deinen Gewichtsverlauf und dein Training anpasst, jede Woche mehr KI, bis zu 15 Mahlzeiten am Tag per Foto, acht weitere Programme und tiefere Auswertungen.",
      },
      {
        q: "Was kostet Premium?",
        a: "Premium gibt es als Wochen-, Monats- oder Jahresabo. Die Preise hängen von deinem Land ab und kommen direkt aus dem App Store; deinen Preis siehst du in der App vor dem Kauf. Kündigen kannst du jederzeit in den Abo-Einstellungen deines Geräts.",
      },
    ],
  },
];

export const FAQ_ITEMS = FAQ_GROUPS.flatMap((g) => g.items);
