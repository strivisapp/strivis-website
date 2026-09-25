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
        a: "OpenFoodFacts and the USDA database: real, publicly maintained food data, not estimates.",
      },
    ],
  },
  {
    id: "premium",
    title: "Premium and pricing",
    items: [
      {
        q: "Is Strivis free?",
        // Barcode scanner and advanced analytics added: both are Premium in
        // the app (settings.premiumFeatures), and the page says so elsewhere.
        a: "Yes. Workout and nutrition logging, the exercise database and one free AI plan are all free to use. Premium unlocks further AI plans, the plan library, the barcode scanner and advanced analytics.",
      },
      {
        q: "What does Premium cost?",
        a: "Premium is available monthly, yearly or as a one-time lifetime purchase. Prices depend on your country and come straight from the App Store; you see yours in the app before you buy. Subscriptions can be cancelled anytime in your device's subscription settings.",
      },
    ],
  },
];

export const FAQ_ITEMS = FAQ_GROUPS.flatMap((g) => g.items);
