// Every English text of the site's own pages and frame (nav, footer, home,
// support, 404, consent banner). ./de.js has the same keys in German; the
// components read whichever matches the page (src/i18n/LanguageProvider.jsx),
// so both languages render from the same JSX. Product facts come from
// src/content/ (FAQ, Free vs Premium, plans, screenshots, exercises), which
// stay the single English source the tests check against the app.
import { FAQ_ITEMS } from "../content/faq.js";
import { FREE_FEATURES, PREMIUM_FEATURES, PREMIUM_BILLING } from "../content/premium.js";
import { PLANS } from "../content/plans.js";
import { SCREENSHOTS } from "../content/screenshots.js";
import { EXERCISE_COUNT, PREVIEW_EXERCISES } from "../content/exercises.js";

export default {
  lang: "en",
  skipLink: "Skip to content",
  nav: {
    label: "Sections",
    links: [
      { href: "#training", label: "Training" },
      { href: "#plans", label: "Plans" },
      { href: "#progress", label: "Progress" },
      { href: "#pricing", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
    ],
    getTheApp: "Get the app",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  language: { label: "Language", names: { en: "English", de: "Deutsch" }, short: { en: "EN", de: "DE" } },
  footer: {
    legalLabel: "Legal and support",
    legal: [
      { to: "/support", label: "Support" },
      { to: "/datenschutz", label: "Privacy" },
      { to: "/agb", label: "Terms" },
      { to: "/copyright", label: "Copyright" },
      { to: "/impressum", label: "Impressum" },
    ],
    cookieSettings: "Cookie settings",
  },
  // The home page (pages/Home.jsx), one story in seven sections, in the
  // approved wireframe's words (2026-11-13). A headline is two lines; the
  // second one is orange. Every claim is checked against the app; product
  // facts (limits, FAQ, reviews, founder note) live in src/content/.
  hero: {
    tag: "Strength training log for iPhone",
    title: ["Know your", "next set."],
    lead: "Strivis shows what you lifted last time and the number to beat today. Training, plans and nutrition in one iPhone app.",
    facts: ["Free to start", `${EXERCISE_COUNT} exercises`, "Apple Watch", "Works offline"],
    factsLabel: "At a glance",
    watchAlt: "Strivis on Apple Watch: Bench Press, 7 of 18 sets, 80 kg x 8 and a button to check off set 3",
  },
  problem: {
    notesLabel: "A workout log in a notes app",
    notesTitle: "Notes · gym stuff",
    notes: ["bench 80x8?? or 7", "squat 3 sets felt heavy", "rows same as last wk?"],
    title: ["That's a guess,", "not a log."],
    lead: "Notes work until you need them. Was it 8 reps or 7? Which sets felt heavy? Strivis keeps every set, so last week is one tap away.",
  },
  training: {
    title: ["Every set,", "on record."],
    points: [
      { title: "Your history, one tap away", body: "Every exercise shows what you did the last times, right where you log today." },
      { title: "Rest runs on its own", body: "Tick off a set and the timer starts, on the lock screen too." },
      { title: "A record turns gold", body: "More weight, more reps or a higher estimated max, and you see it in the set." },
    ],
    watch: {
      title: ["Leave your phone", "in the locker."],
      lead: "Start a workout on Apple Watch. Tick off sets, rest and heart rate on your wrist. A record shows as a gold frame.",
    },
  },
  plans: {
    title: ["A plan that", "fits your week."],
    lead: "Tell Strivis your goal, level, equipment and training days. Then pick one of three ways.",
    paths: [
      { key: "library", title: "Pick a program", body: `${PLANS.length} programs for muscle gain, matched to your answers.` },
      { key: "ai", title: "Let AI draft one", body: "Built from your answers, editable day by day before you start." },
      { key: "own", title: "Build your own", body: "Any exercise, any order, as many plans as you like." },
    ],
    library: {
      title: `${EXERCISE_COUNT} exercises. Every one explained.`,
      body: "Start and end position, steps and target muscles. Offline after one download.",
      label: "Exercises from the library",
      imageAlt: (name) => `${name}, illustrated`,
      preview: PREVIEW_EXERCISES,
    },
  },
  progress: {
    title: ["See what", "moved."],
    points: [
      { title: "Strength level", body: "Six main lifts from Beginner to Elite, and a record wall for every exercise." },
      { title: "76 medals", body: "Bronze to rare, some secret until you earn them. A new challenge every month." },
      { title: "Food in the same app", body: "Calories and macros from your goal. Search, scan a barcode or take a photo of your plate." },
    ],
    shotsLabel: "Screens from the app",
  },
  reviews: {
    title: "From the App Store",
    stars: (n) => `${n} of 5 stars`,
  },
  pricing: {
    title: ["Free to train.", "Premium for more."],
    free: "Free",
    freeSub: "No subscription required.",
    premium: "Premium",
    premiumSub: PREMIUM_BILLING,
    freeFeatures: FREE_FEATURES,
    premiumFeatures: PREMIUM_FEATURES,
    honestLabel: "Straight talk",
    honest: ["Works offline", "Delete everything, in the app", "Your body weight never shows to others", "Billed by Apple, cancel anytime"],
    notYet: "Not yet: Android",
  },
  founder: {
    title: "Why Strivis",
  },
  faq: { title: "Questions", items: FAQ_ITEMS },
  closing: {
    title: ["Your next set", "starts here."],
    lead: "Free on iPhone. No subscription required.",
  },
  // Real app screenshots with their alt texts (src/content/screenshots.js).
  screenshots: SCREENSHOTS,
  support: {
    lead: "Questions, bugs or feedback about Strivis? We read every email.",
    emailUs: "Email us",
    writeEmail: "Write an email",
    common: "Common questions",
    items: [
      {
        q: "How do I cancel my Premium subscription?",
        a: "Manage or cancel anytime in your device's subscription settings. On iPhone, open Settings > [your name] > Subscriptions. Strivis never charges you directly; all payments go through the App Store.",
      },
      {
        q: "I bought Premium but the app still shows the paywall.",
        a: "Open Settings inside the app and tap \"Restore purchases\". This re-links your existing purchase to your account. If it still doesn't unlock, email us with your purchase date and we'll sort it out.",
      },
      {
        q: "How do I delete my account and data?",
        a: "In the app: Settings > Account > Delete account. Your profile and all associated data are deleted right away. If you can no longer sign in, email us from the address linked to your account and we'll do it for you.",
      },
    ],
    moreBefore: "More answers in the ",
    moreLink: "FAQ",
  },
  notFound: {
    title: "This page doesn't exist.",
    body: "The link may be old or mistyped. Strivis lives in the iPhone app.",
    back: "Back to the home page",
  },
  // The Instagram link page (/links, pages/Links.jsx).
  links: {
    tagline: "Train. Track. Progress.",
    lead: "Training plans, every set and your macros. Free to start.",
    devices: "iPhone · Apple Watch",
    shotsLabel: "A look inside the app",
    moreLabel: "More from Strivis",
    website: "Website",
    support: "Support & contact",
    supportSub: "Help, Premium, your account",
    legal: [
      { to: "/impressum", label: "Impressum" },
      { to: "/datenschutz", label: "Privacy" },
      { to: "/agb", label: "Terms" },
    ],
  },
  download: {
    badgeAlt: "Download on the App Store",
    freeOnIphone: "Free on iPhone",
    sticky: "Get Strivis on the App Store",
  },
  qr: {
    label: "QR code linking to Strivis in the App Store",
    scan: "Scan with your iPhone",
    opens: "Opens Strivis in the App Store.",
  },
  consent: {
    label: "Cookie consent",
    text: "We'd like to use the Meta Pixel to measure our ads. It sets cookies and sends data to Meta Platforms. It only runs if you accept.",
    privacy: "Privacy Policy",
    decline: "Decline",
    accept: "Accept",
  },
};
