// FAQ content, grouped. Plain data (no JSX) so tests can read it without a
// build step. An answer may end in one internal `link`, rendered after the
// text. Every answer is checked against the app (strivis repo); change
// them only together with the app.
export const FAQ_GROUPS = [
  {
    id: "app",
    title: "The app",
    items: [
      {
        q: "What devices does Strivis run on?",
        a: "Currently as an iOS app. A Google Play version is in the works.",
      },
      {
        q: "Can I build my own training plan?",
        a: "Yes. Alongside AI-generated and curated plans, you can put together a plan entirely yourself.",
      },
      {
        q: "Does the exercise database work offline?",
        a: "Yes. After a one-time download, all 601 exercises with image and instructions are available offline.",
      },
      {
        q: "What if I train on more than one device?",
        a: "Your account syncs across devices. Just log in anywhere with the same credentials.",
      },
    ],
  },
  {
    id: "data",
    title: "Your data",
    items: [
      {
        // Also answers what "Can I delete my account again?" used to ask on
        // its own (merged in the launch redesign).
        q: "How is my data handled?",
        a: "You can delete your account at any time, right in the app's account settings, and your data is permanently removed with it. All the details are in our",
        link: { to: "/datenschutz", label: "Privacy Policy" },
      },
      {
        q: "Where does the nutrition data come from?",
        a: "Basic foods come from the German Nutrient Database (BLS) and the Swiss Food Composition Database, built into the app and available offline. Packaged foods and barcodes come from Open Food Facts. Real, publicly maintained food data, not estimates.",
      },
    ],
  },
  {
    id: "premium",
    title: "Premium and pricing",
    items: [
      {
        q: "Is Strivis free?",
        // Same facts as content/premium.js (the app's real gating).
        a: "Yes. Workout and nutrition logging with the barcode scanner, the exercise database, three programs from the Plan Library and two AI tries each for training plans and recipes are free. Premium adds a calorie goal that adapts to your weight trend and training, more AI every week, eight more programs and deeper analytics.",
      },
      {
        q: "What does Premium cost?",
        a: "Premium is a weekly, monthly or yearly subscription. Prices depend on your country and come straight from the App Store; you see yours in the app before you buy. Subscriptions can be cancelled anytime in your device's subscription settings.",
      },
    ],
  },
];

export const FAQ_ITEMS = FAQ_GROUPS.flatMap((g) => g.items);
