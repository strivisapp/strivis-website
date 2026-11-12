// Every English text of the site's own pages and frame (nav, footer, home,
// support, 404, consent banner). ./de.js has the same keys in German; the
// components read whichever matches the page (src/i18n/LanguageProvider.jsx),
// so both languages render from the same JSX. Product facts come from
// src/content/ (FAQ, Free vs Premium, plans, screenshots, exercises), which
// stay the single English source the tests check against the app.
import { FAQ_GROUPS } from "../content/faq.js";
import { FREE_FEATURES, PREMIUM_FEATURES, PREMIUM_BILLING } from "../content/premium.js";
import { levelLabel } from "../content/plans.js";
import { SCREENSHOTS } from "../content/screenshots.js";
import { PREVIEW_EXERCISES } from "../content/exercises.js";
import { GOALS, EQUIPMENT } from "../content/planExamples.js";

export default {
  lang: "en",
  skipLink: "Skip to content",
  nav: {
    label: "Sections",
    links: [
      { href: "#how-it-works", label: "How it works" },
      { href: "#features", label: "Features" },
      { href: "#premium", label: "Premium" },
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
  hero: {
    titleLines: ["Train. Track.", "Progress."],
    lead: "Plan, log and track your training and nutrition. One iPhone app, free to start.",
    howLink: "How it works",
    phoneAlt: "The Strivis workout screen: three logged sets of Barbell Bench Press and a running rest timer",
  },
  how: {
    title: "Three steps to your first set.",
    step: (n) => `Step ${n}: `,
    steps: [
      {
        title: "Tell it about you",
        body: "Your goal, your level, your equipment, how many days a week you can train and the muscle groups you want to focus on.",
        shot: "onboarding-focus-muscles",
      },
      {
        title: "Get your plan",
        body: "Strivis recommends a program that fits your answers. Or let the AI build one, or put one together yourself. Every day of it stays editable.",
        shot: "plan-preview",
      },
      {
        title: "Train and log",
        body: "Weight, reps and effort, set by set. The rest timer runs on its own, and a new personal record shows up the moment you hit it.",
        shot: "active-workout",
      },
    ],
  },
  features: {
    title: "Everything in one app.",
    lead: "Training, logging, nutrition and progress, built from your own data. One plus on Today logs a workout, cardio, a meal, a photo, water or your weight.",
    plan: {
      title: "AI training plans",
      body: "Tell it your goal, level and equipment. Every day of the plan stays editable.",
      alt: "A Push Pull Legs plan in Strivis: day 1, Push, with Barbell Bench Press and Neutral Grip Pull Ups",
    },
    sets: {
      title: "Every set counts",
      body: "Weight, reps and effort. The rest timer runs on its own and PRs show up live.",
      alt: "Three logged sets of Barbell Bench Press with weight, reps and a check mark each",
    },
    food: {
      title: "Every meal, logged",
      body: "Calories, macros and water for the day. Search German and Swiss food data, built in and offline, scan a barcode, or take a photo and check the amounts. Protein and fat targets follow your body weight and goal.",
      alt: "Today in the Nutrition tab: 2,107 kcal left of 3,560 and protein, carbs and fat against their goals",
    },
    progress: {
      title: "See what moved",
      body: "Volume, records and muscle balance, built from your own training.",
      alt: "Sets per muscle this week against the plan: legs, shoulders, back, chest, calves, triceps and biceps",
    },
    // Text-only cells under the bento (components/home/Features.jsx). Every
    // claim is checked against the app and backend, branch erfolge.
    more: [
      {
        title: "76 achievements",
        body: "Bronze, silver, gold and rare, each with its own medal shape. Some stay secret until you earn them. All of them are free.",
      },
      {
        title: "One goal a month",
        body: "Join the monthly challenge and get a personal workout goal. From 20 participants on, a shared counter adds up everyone's workouts. In December and January you get your year in review.",
      },
      {
        title: "Levels and records",
        body: "A strength level on six main lifts, from Beginner to Elite, measured against your body weight. A record wall for every exercise: heaviest weight, estimated max, most reps.",
      },
      {
        title: "Share the workout",
        body: "A finished workout becomes a post in one tap, with your records and one photo if you want. Four reactions and weekly highlights. Your body weight never shows.",
      },
      {
        title: "Apple Watch",
        body: "Start a workout on the watch and leave the iPhone in your locker. Suggested weights, a rest ring, live heart rate and one tap for water. Free.",
      },
      {
        title: "Training around you",
        body: "Cardio with a weekly goal, logged by hand or taken from Apple Health, counts toward your streak. Report aches in eight areas and your plan swaps the exercises that strain them.",
      },
    ],
  },
  screens: {
    title: "Every screen, as it is.",
    lead: "Real screenshots from the iPhone app. No mock-ups.",
    previous: "Previous screenshot",
    next: "Next screenshot",
    railLabel: "App screenshots. Use the arrow keys to browse.",
    position: (i, n) => `${i} of ${n}: `,
  },
  screenshots: SCREENSHOTS,
  configurator: {
    title: "Sketch your week.",
    lead: "Pick a goal, how often you train and what you train with, and see what a week could look like.",
    goal: "Goal",
    days: "Days a week",
    equipment: "Equipment",
    goals: GOALS,
    equipmentOptions: EQUIPMENT,
    heading: (goal, days, equipment) => `${goal}, ${days} days, ${equipment}`,
    example: "Example week, not your plan.",
    note: "A hand-picked example from the app's exercise library. In the app you pick a ready-made program that matches your goal, level and training days, build your own, or have one generated, and you can edit every day of it.",
    cta: "Get your real plan in the app.",
  },
  exercises: {
    title: "Exercises. Every one explained.",
    lead: "Image, steps, target muscles and your own history for each one. Offline after a one-time download.",
    points: [
      "Estimated 1RM, volume and set-by-set history per exercise",
      "Favorites, for the ones you come back to",
      "Start and end position of every movement",
      "Strength level on the six main lifts, records for every exercise",
    ],
    previewTitle: "A few from the library",
    previewLabel: "Exercises from the library",
    imageAlt: (name) => `${name}, illustrated`,
    preview: PREVIEW_EXERCISES,
  },
  premium: {
    title: "Free to train. Premium for more.",
    lead: "Everything you need to plan, log and track is free, achievements included. Premium adds more AI every week, more meals from a photo, eight more programs and deeper analytics.",
    free: "Free",
    freeSub: "No subscription required.",
    premiumSub: "Everything in Free, plus:",
    library: "In the Plan Library",
    planDetails: (days, levels) => `, ${days} days a week, ${levelLabel(levels)}`,
    freeFeatures: FREE_FEATURES,
    premiumFeatures: PREMIUM_FEATURES,
    billing: PREMIUM_BILLING,
  },
  straight: {
    title: "Straight talk.",
    lead: "What you can count on today, and what isn't there yet.",
    solidTitle: "Solid today",
    notYetTitle: "Not there yet",
    solid: [
      { title: "Works offline", body: "After a one-time download, the whole exercise library, images and instructions included, works without a connection." },
      { title: "Delete it all, in the app", body: "Delete your account in the app's settings at any time. Your data goes with it, permanently." },
      { title: "Real food data", body: "Nutrition values come from the German and Swiss nutrient databases and Open Food Facts. A meal from a photo starts with an estimate of the amounts: you check them before logging, and a dish the databases don't know is marked as estimated." },
      { title: "Your body weight stays yours", body: "Posts and profiles never show it. Nutrition, body and personal achievements are for you alone." },
      { title: "Billed by Apple", body: "Premium is paid through your Apple ID and can be cancelled anytime in your device settings." },
    ],
    notYet: [
      { title: "Android", body: "A Google Play version is in the works. Until then, Strivis is iPhone only." },
    ],
  },
  cta: {
    title: "Your next set starts here.",
    lead: "Free on iPhone. No subscription required.",
  },
  faq: { title: "Questions.", groups: FAQ_GROUPS },
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
