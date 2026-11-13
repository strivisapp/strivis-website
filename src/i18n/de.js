// The German site (/de): same keys as ./en.js. Wording follows the app's
// German texts (strivis/src/i18n/locales/de.json: premium, adaptiveGoal,
// dataSources, onboarding options) and the German App Store description
// (screenshots/appstore/store-texts.md), so the site promises what the app
// says. Informal "du", no em dashes, no invented results.
import { FAQ_ITEMS } from "../content/de/faq.js";
import { FREE_FEATURES, PREMIUM_FEATURES, PREMIUM_BILLING } from "../content/de/premium.js";
import { SCREENSHOT_TEXT } from "../content/de/screenshots.js";
import { EXERCISE_NAMES, AREAS } from "../content/de/exercises.js";
import { SCREENSHOTS } from "../content/screenshots.js";
import { PLANS } from "../content/plans.js";
import { EXERCISE_COUNT, PREVIEW_EXERCISES } from "../content/exercises.js";

export default {
  lang: "de",
  skipLink: "Zum Inhalt springen",
  nav: {
    label: "Abschnitte",
    links: [
      { href: "#training", label: "Training" },
      { href: "#plans", label: "Pläne" },
      { href: "#progress", label: "Fortschritt" },
      { href: "#pricing", label: "Preise" },
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
    tag: "Trainingslog fürs iPhone",
    title: ["Kenn deinen", "nächsten Satz."],
    lead: "Strivis zeigt dir, was du letztes Mal geschafft hast und was du heute schlagen kannst. Training, Pläne und Ernährung in einer iPhone-App.",
    facts: ["Kostenlos starten", `${EXERCISE_COUNT} Übungen`, "Apple Watch", "Funktioniert offline"],
    factsLabel: "Auf einen Blick",
    watchAlt: "Strivis auf der Apple Watch: Bankdrücken, 7 von 18 Sätzen, 80 kg x 8 und ein Button, um Satz 3 abzuhaken",
  },
  problem: {
    notesLabel: "Ein Trainingslog in der Notiz-App",
    notesTitle: "Notes · gym stuff",
    notes: ["bench 80x8?? or 7", "squat 3 sets felt heavy", "rows same as last wk?"],
    title: ["Geraten ist", "kein Plan."],
    lead: "Notizen reichen, bis du sie brauchst. Waren es 8 Wiederholungen oder 7? Welche Sätze waren schwer? Strivis behält jeden Satz, die letzte Woche ist einen Tipp entfernt.",
  },
  training: {
    title: ["Jeder Satz,", "festgehalten."],
    points: [
      { title: "Dein Verlauf, einen Tipp entfernt", body: "Jede Übung zeigt, was du die letzten Male geschafft hast, genau da, wo du heute einträgst." },
      { title: "Die Pause läuft von selbst", body: "Satz abhaken, der Timer startet, auch auf dem Sperrbildschirm." },
      { title: "Ein Rekord wird gold", body: "Mehr Gewicht, mehr Wiederholungen oder ein höheres geschätztes Maximum, und du siehst es im Satz." },
    ],
    watch: {
      title: ["Das Handy bleibt", "im Spind."],
      lead: "Starte dein Training auf der Apple Watch. Sätze abhaken, Pause und Puls am Handgelenk, ein Rekord zeigt sich als goldener Rahmen.",
    },
  },
  plans: {
    title: ["Ein Plan, der zu", "deiner Woche passt."],
    lead: "Ziel, Niveau, Ausrüstung und Trainingstage angeben, dann einen von drei Wegen wählen.",
    paths: [
      { key: "library", title: "Programm wählen", body: `${PLANS.length} Programme für Muskelaufbau, passend zu deinen Antworten.` },
      { key: "ai", title: "Von der KI entwerfen", body: "Aus deinen Antworten, vor dem Start Tag für Tag anpassbar." },
      { key: "own", title: "Selbst bauen", body: "Jede Übung, jede Reihenfolge, so viele Pläne du willst." },
    ],
    library: {
      title: `${EXERCISE_COUNT} Übungen. Jede erklärt.`,
      body: "Start- und Endposition, Schritte und Zielmuskeln. Offline nach einem Download.",
      label: "Übungen aus der Bibliothek",
      imageAlt: (name) => `${name}, als Illustration`,
      preview: PREVIEW_EXERCISES.map((e) => ({ ...e, name: EXERCISE_NAMES[e.id], area: AREAS[e.area] })),
    },
  },
  progress: {
    title: ["Sieh, was sich", "bewegt."],
    points: [
      { title: "Kraftstufe", body: "Sechs Hauptübungen von Einsteiger bis Elite, dazu Rekorde für jede Übung." },
      { title: "76 Medaillen", body: "Von Bronze bis Selten, manche geheim, bis du sie hast. Jeden Monat eine Challenge." },
      { title: "Essen in derselben App", body: "Kalorien und Makros aus deinem Ziel. Suchen, Barcode scannen oder den Teller fotografieren." },
    ],
    shotsLabel: "Bildschirme aus der App",
  },
  reviews: {
    title: "Aus dem App Store",
    stars: (n) => `${n} von 5 Sternen`,
  },
  pricing: {
    title: ["Kostenlos trainieren.", "Premium für mehr."],
    free: "Kostenlos",
    freeSub: "Ohne Abo.",
    premium: "Premium",
    premiumSub: PREMIUM_BILLING,
    freeFeatures: FREE_FEATURES,
    premiumFeatures: PREMIUM_FEATURES,
    honestLabel: "Klartext",
    honest: ["Funktioniert offline", "Alles löschen, in der App", "Dein Gewicht sieht niemand", "Über Apple, jederzeit kündbar"],
    notYet: "Noch nicht: Android",
  },
  founder: {
    title: "Warum Strivis",
  },
  faq: { title: "Fragen", items: FAQ_ITEMS },
  closing: {
    title: ["Dein nächster Satz", "fängt hier an."],
    lead: "Kostenlos fürs iPhone. Ohne Abo.",
  },
  screenshots: SCREENSHOTS.map((s) => ({ ...s, ...SCREENSHOT_TEXT[s.id] })),
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
    tagline: "Trainieren. Loggen. Steigern.",
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
    sticky: "Strivis im App Store laden",
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
