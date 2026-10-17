// The German site (/de): same keys as ./en.js. Wording follows the app's
// German texts (strivis/src/i18n/locales/de.json: premium, adaptiveGoal,
// dataSources, onboarding options) and the German App Store description
// (screenshots/appstore/store-texts.md), so the site promises what the app
// says. Informal "du", no em dashes, no invented results.
import { FAQ_GROUPS } from "../content/de/faq.js";
import { FREE_FEATURES, PREMIUM_FEATURES, PREMIUM_BILLING, levelLabel } from "../content/de/premium.js";
import { SCREENSHOT_TEXT } from "../content/de/screenshots.js";
import { EXERCISE_NAMES, AREAS, muscleLabel } from "../content/de/exercises.js";
import { SCREENSHOTS } from "../content/screenshots.js";
import { PREVIEW_EXERCISES } from "../content/exercises.js";
import { GOALS_DE, EQUIPMENT_DE } from "../content/planExamples.js";

export default {
  lang: "de",
  skipLink: "Zum Inhalt springen",
  nav: {
    label: "Abschnitte",
    links: [
      { href: "#how-it-works", label: "So geht's" },
      { href: "#features", label: "Funktionen" },
      { href: "#premium", label: "Premium" },
      { href: "#faq", label: "FAQ" },
    ],
    getTheApp: "App laden",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
  },
  language: { label: "Sprache", names: { en: "English", de: "Deutsch" }, short: { en: "EN", de: "DE" } },
  footer: {
    legalLabel: "Rechtliches und Support",
    legal: [
      { to: "/support", label: "Support" },
      { to: "/datenschutz", label: "Datenschutz" },
      { to: "/agb", label: "AGB" },
      { to: "/copyright", label: "Copyright" },
      { to: "/impressum", label: "Impressum" },
    ],
    cookieSettings: "Cookie-Einstellungen",
  },
  hero: {
    titleLines: ["Trainieren.", "Loggen.", "Steigern."],
    lead: "Plane die Woche, logge jeden Satz und behalte Kalorien und Makros im Blick. Eine iPhone-App, kostenlos zum Einstieg.",
    howLink: "So funktioniert's",
    phoneAlt: "Der Trainingsbildschirm von Strivis: drei geloggte Sätze Bankdrücken und ein laufender Pausen-Timer",
  },
  how: {
    title: "In drei Schritten zum ersten Satz.",
    step: (n) => `Schritt ${n}: `,
    steps: [
      {
        title: "Erzähl von dir",
        body: "Dein Ziel, dein Level, dein Equipment, wie viele Tage pro Woche du trainieren kannst und welche Muskelgruppen du in den Fokus nimmst.",
        shot: "onboarding-focus-muscles",
      },
      {
        title: "Hol dir deinen Plan",
        body: "Strivis schlägt dir ein Programm vor, das zu deinen Antworten passt. Du kannst auch die KI einen Entwurf erstellen lassen oder den Plan selbst zusammenstellen. Jeden Tag darin kannst du anpassen.",
        shot: "plan-preview",
      },
      {
        title: "Trainieren und loggen",
        body: "Gewicht, Wiederholungen und wie schwer der Satz war, Satz für Satz. Nach jedem Satz startet der Pausen-Timer, und einen neuen persönlichen Rekord siehst du sofort.",
        shot: "active-workout",
      },
    ],
  },
  features: {
    title: "Alles in einer App.",
    lead: "Plan, Trainingslog, Ernährung und Fortschritt, aus deinen eigenen Daten.",
    plan: {
      title: "KI-Trainingspläne",
      body: "Gib Ziel, Level und Equipment an. Jeden Tag des Plans kannst du anpassen.",
      alt: "Ein Push-Pull-Legs-Plan in Strivis: Tag 1, Push, mit Bankdrücken und Klimmzügen im neutralen Griff",
    },
    sets: {
      title: "Jeder Satz zählt",
      body: "Gewicht, Wiederholungen und RIR. Der Pausen-Timer läuft von selbst, Rekorde siehst du sofort.",
      alt: "Drei geloggte Sätze Bankdrücken, jeweils mit Gewicht, Wiederholungen und Häkchen",
    },
    food: {
      title: "Geloggt statt geschätzt",
      body: "Kalorien, Makros und Wasser für den Tag. Durchsuche deutsche und Schweizer Nährwertdaten, eingebaut und offline, oder scanne einen Barcode.",
      alt: "Der Tag im Ernährungs-Tab: 2.107 von 3.560 kcal übrig, dazu Eiweiß, Kohlenhydrate und Fett im Vergleich zum Ziel",
    },
    progress: {
      title: "Sieh, was wirkt",
      body: "Volumen, Rekorde und Muskelbalance, aus deinem eigenen Training.",
      alt: "Sätze pro Muskel in dieser Woche im Vergleich zum Plan: Beine, Schultern, Rücken, Brust, Waden, Trizeps und Bizeps",
    },
  },
  screens: {
    title: "Jeder Screen, wie er ist.",
    lead: "Echte Screenshots aus der iPhone-App, hier in der englischen Fassung. Keine Mock-ups.",
    previous: "Vorheriger Screenshot",
    next: "Nächster Screenshot",
    railLabel: "App-Screenshots. Mit den Pfeiltasten blättern.",
    position: (i, n) => `${i} von ${n}: `,
  },
  screenshots: SCREENSHOTS.map((s) => ({ ...s, ...SCREENSHOT_TEXT[s.id] })),
  configurator: {
    title: "Skizzier deine Woche.",
    lead: "Wähle Ziel, Trainingstage und Equipment und sieh, wie eine Woche aussehen könnte.",
    goal: "Ziel",
    days: "Tage pro Woche",
    equipment: "Equipment",
    goals: GOALS_DE,
    equipmentOptions: EQUIPMENT_DE,
    heading: (goal, days, equipment) => `${goal}, ${days} Tage, ${equipment}`,
    example: "Beispielwoche, nicht dein Plan.",
    note: "Ein von Hand gewähltes Beispiel aus der Übungsbibliothek der App. In der App wählst du ein fertiges Programm passend zu Ziel, Level und Trainingstagen, stellst dir selbst eins zusammen oder lässt einen Entwurf erstellen. Jeden Tag kannst du anpassen.",
    cta: "Deinen echten Plan gibt's in der App.",
  },
  exercises: {
    title: "Übungen. Jede erklärt.",
    lead: "Bild, Schritte, Zielmuskeln und dein eigener Verlauf zu jeder Übung. Nach einem einmaligen Download auch offline.",
    points: [
      "Geschätztes 1RM, Volumen und Verlauf Satz für Satz pro Übung",
      "Favoriten für die Übungen, zu denen du immer wieder greifst",
      "Start- und Endposition jeder Bewegung",
    ],
    previewTitle: "Ein paar aus der Bibliothek",
    previewLabel: "Übungen aus der Bibliothek",
    imageAlt: (name) => `${name}, als Illustration`,
    preview: PREVIEW_EXERCISES.map((e) => ({ ...e, name: EXERCISE_NAMES[e.id], muscle: muscleLabel(e.muscle), area: AREAS[e.area] })),
  },
  premium: {
    title: "Kostenlos trainieren. Premium für mehr.",
    lead: "Alles, was du zum Planen, Loggen und Auswerten brauchst, ist kostenlos. Premium bringt jede Woche mehr KI, acht weitere Programme und tiefere Auswertungen.",
    free: "Kostenlos",
    freeSub: "Ohne Abo.",
    premiumSub: "Alles aus Kostenlos, dazu:",
    library: "In der Plan-Bibliothek",
    planDetails: (days, levels) => `, ${days} Tage pro Woche, ${levelLabel(levels)}`,
    freeFeatures: FREE_FEATURES,
    premiumFeatures: PREMIUM_FEATURES,
    billing: PREMIUM_BILLING,
  },
  straight: {
    title: "Klartext.",
    lead: "Worauf du dich heute verlassen kannst und was noch fehlt.",
    solidTitle: "Heute schon da",
    notYetTitle: "Noch nicht da",
    solid: [
      { title: "Funktioniert offline", body: "Nach einem einmaligen Download läuft die ganze Übungsbibliothek mit Bildern und Anleitungen ohne Verbindung." },
      { title: "Alles löschen, in der App", body: "Dein Konto löschst du jederzeit in den Einstellungen der App. Deine Daten sind dann endgültig weg." },
      { title: "Echte Nährwerte", body: "Die Nährwerte stammen aus dem Bundeslebensmittelschlüssel, der Schweizer Nährwertdatenbank und Open Food Facts, nicht aus Schätzungen." },
      { title: "Abgerechnet über Apple", body: "Premium bezahlst du über deine Apple-ID und kündigst es jederzeit in den Einstellungen deines Geräts." },
    ],
    notYet: [
      { title: "Android", body: "Eine Version für Google Play ist in Arbeit. Bis dahin gibt es Strivis nur fürs iPhone." },
      { title: "Essen per Foto", body: "Eine Mahlzeit über ein Foto eintragen. Bis dahin trägst du Mahlzeiten per Suche oder Barcode ein." },
    ],
  },
  cta: {
    title: "Dein nächster Satz beginnt hier.",
    lead: "Kostenlos fürs iPhone. Ohne Abo.",
  },
  faq: { title: "Fragen.", groups: FAQ_GROUPS },
  support: {
    lead: "Fragen, Fehler oder Feedback zu Strivis? Wir lesen jede E-Mail.",
    emailUs: "Schreib uns",
    writeEmail: "E-Mail schreiben",
    common: "Häufige Fragen",
    items: [
      {
        q: "Wie kündige ich mein Premium-Abo?",
        a: "Verwalten oder kündigen kannst du jederzeit in den Abo-Einstellungen deines Geräts. Auf dem iPhone: Einstellungen > [dein Name] > Abonnements. Strivis bucht nie selbst ab; alle Zahlungen laufen über den App Store.",
      },
      {
        q: "Ich habe Premium gekauft, aber die App zeigt noch die Paywall.",
        a: "Öffne die Einstellungen in der App und tippe auf „Käufe wiederherstellen“. Damit verknüpfst du deinen Kauf wieder mit deinem Konto. Bleibt Premium gesperrt, schreib uns mit deinem Kaufdatum und wir kümmern uns darum.",
      },
      {
        q: "Wie lösche ich mein Konto und meine Daten?",
        a: "In der App: Einstellungen > Konto & Sicherheit > Konto löschen. Dein Profil und alle zugehörigen Daten werden sofort gelöscht. Kannst du dich nicht mehr anmelden, schreib uns von der E-Mail-Adresse deines Kontos und wir übernehmen das für dich.",
      },
    ],
    moreBefore: "Mehr Antworten in den ",
    moreLink: "FAQ",
  },
  notFound: {
    title: "Diese Seite gibt es nicht.",
    body: "Der Link ist vielleicht alt oder vertippt. Strivis gibt es als iPhone-App.",
    back: "Zur Startseite",
  },
  // Die Linkseite für Instagram (/de/links, pages/Links.jsx).
  links: {
    lead: "Trainingsplan, jeder Satz und deine Makros. Kostenlos zum Einstieg.",
    devices: "iPhone · Apple Watch",
    shotsLabel: "Ein Blick in die App",
    moreLabel: "Mehr von Strivis",
    website: "Website",
    support: "Support & Kontakt",
    supportSub: "Hilfe, Premium, dein Konto",
    legal: [
      { to: "/impressum", label: "Impressum" },
      { to: "/datenschutz", label: "Datenschutz" },
      { to: "/agb", label: "AGB" },
    ],
  },
  download: {
    badgeAlt: "Laden im App Store",
    freeOnIphone: "Kostenlos fürs iPhone",
  },
  qr: {
    label: "QR-Code zu Strivis im App Store",
    scan: "Mit dem iPhone scannen",
    opens: "Öffnet Strivis im App Store.",
  },
  consent: {
    label: "Cookie-Einwilligung",
    text: "Wir würden gern das Meta-Pixel nutzen, um unsere Werbung zu messen. Es setzt Cookies und sendet Daten an Meta Platforms. Es läuft nur, wenn du zustimmst.",
    privacy: "Datenschutzerklärung",
    decline: "Ablehnen",
    accept: "Akzeptieren",
  },
};
