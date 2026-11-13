// The home page's FAQ: the six questions people ask before they download
// (approved website wireframe, 2026-11-13). Plain data (no JSX) so tests and
// the FAQPage structured data (src/lib/seo.js) read the same text the page
// shows. An answer may end in one internal `link`, rendered after the text.
// Every answer is checked against the app and the privacy policy; change
// them only together with those. German: ./de/faq.js, same order.
export const FAQ_ITEMS = [
  {
    q: "Is Strivis free?",
    // Same facts as content/premium.js (the app's real gating).
    a: "Yes. Plans, logging, the exercise library, nutrition, achievements and the Apple Watch app are free. Premium adds more AI, more programs and longer progress views.",
  },
  {
    q: "Do I need an Apple Watch?",
    a: "No. Everything works on the iPhone. With a watch you can train without the phone.",
  },
  {
    q: "Does it work without a connection?",
    a: "Yes. Workouts, plans and the exercise library work offline and sync when you're back online.",
  },
  {
    q: "Can I export or delete my data?",
    a: "Both, in the app's settings. Deleting removes your account and data for good.",
  },
  {
    // From the privacy policy (pages/Datenschutz.jsx): Railway hosts the
    // database in its European region, Cloudflare R2 stores uploads in
    // Europe; sign-in (Supabase), subscriptions (RevenueCat) and the AI
    // features (Anthropic) are US companies. So never "all in the EU".
    q: "Where is my data stored?",
    a: "Your profile, workouts, nutrition and posts are stored in a database in the EU, and the photos you upload in storage in Europe. Some services are run by companies in the US: sign-in (Supabase), subscriptions (RevenueCat) and the AI features (Anthropic). Every provider is listed in our",
    link: { to: "/datenschutz", label: "Privacy Policy" },
  },
  {
    // Terms (pages/Agb.jsx, Premium): cancel up to 24 hours before the end
    // of the period; it runs until then.
    q: "How do I cancel Premium?",
    a: "In your iPhone's App Store settings, anytime. Premium runs until the end of the period.",
  },
];
