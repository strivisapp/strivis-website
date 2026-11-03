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
        a: "Currently as an iOS app, with an app for Apple Watch. A Google Play version is in the works.",
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
      {
        q: "Can I train with just my Apple Watch?",
        a: "Yes. The watch keeps your next planned workout, so you can start it and log every set there without your iPhone. The sets reach your account through your iPhone afterwards. The watch app is free.",
      },
      {
        q: "How do meals from a photo work?",
        a: "Take a photo or pick one from your library, and add a note if you like. The AI names the foods and estimates the grams, and you check the amounts before anything is logged. Free accounts get five analyses in total, Premium up to 15 a day. It needs a connection and your consent to the AI features. The photo is not stored.",
      },
      {
        q: "What are achievements?",
        a: "76 medals in four tiers: bronze, silver, gold and rare. Some stay secret until you earn them. All of them are free, and so are the monthly challenge, the year review in December and January, and strength levels.",
      },
      {
        q: "How does the monthly challenge work?",
        a: "You join for the month and get a personal goal of 4 to 24 workouts, based on your training week. Cardio counts too. From 20 participants on, a shared counter shows totals for the community, without names. There is no leaderboard.",
      },
      {
        q: "What are strength levels?",
        a: "For squat, bench press, deadlift, overhead press, barbell row and pull-ups, Strivis compares your estimated one-rep max with your body weight and shows one of five levels, from Beginner to Elite. It uses a men's or women's standard, from your gender or your own choice.",
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
        q: "Who can see my achievements?",
        a: "Training and community achievements appear on your profile, for whoever may see it. Nutrition and body achievements and six personal ones are only for you. New gold and rare ones post to your followers unless you turn that off in Settings › Privacy. The details are in our",
        link: { to: "/datenschutz", label: "Privacy Policy" },
      },
      {
        q: "Where does the nutrition data come from?",
        a: "Basic foods come from the German Nutrient Database (BLS) and the Swiss Food Composition Database, built into the app and available offline. Packaged foods and barcodes come from Open Food Facts. For a meal from a photo, the AI estimates the amounts and you check them; a dish none of the databases knows is marked as estimated.",
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
        a: "Yes. Workout and nutrition logging with the barcode scanner, the exercise database, three programs from the Plan Library, two AI tries each for training plans and recipes, five meals from a photo, the Apple Watch app, the community and all achievements are free. Premium adds a calorie goal that adapts to your weight trend and training, more AI every week, up to 15 meals a day from a photo, eight more programs and deeper analytics.",
      },
      {
        q: "What does Premium cost?",
        a: "Premium is a weekly, monthly or yearly subscription. Prices depend on your country and come straight from the App Store; you see yours in the app before you buy. Subscriptions can be cancelled anytime in your device's subscription settings.",
      },
    ],
  },
];

export const FAQ_ITEMS = FAQ_GROUPS.flatMap((g) => g.items);
