// Real App Store reviews, shown on the home page in both languages in the
// language they were written in. Copied word for word from the German App
// Store (as of 2026-11-13); `text` is a verbatim excerpt, never reworded.
// Nickname as the store shows it. Owner's pick from the approved wireframe
// (reports/website-wireframe.html in the app repo): reviews 1, 3 and 4.
//
// To change them, edit this list only: no invented reviews, no made-up
// ratings, no reviews from people we know.
export const REVIEWS = [
  {
    id: "floriantra",
    author: "FlorianTra",
    title: "Best Gym App for Tracking Progress!",
    text: "Super easy to use, with great features for tracking calories, workouts, and progress.",
    lang: "en",
    rating: 5,
    store: "App Store DE",
    date: "2026-11-03",
  },
  {
    id: "yasaminmns",
    author: "YasaminMns",
    title: "Everything fitness in one place!",
    text: "Super helpful having everything from workouts and training plans to nutrition and progress tracking all in one place.",
    lang: "en",
    rating: 5,
    store: "App Store DE",
    date: "2026-10-16",
  },
  {
    id: "derweise",
    author: "DerWeise_",
    title: "Super App fürs Training und Tracking!",
    text: "Besonders gut gefällt mir das moderne Design und wie unkompliziert sich das Training planen und dokumentieren lässt.",
    lang: "de",
    rating: 5,
    store: "App Store DE",
    date: "2026-10-13",
  },
];

const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  de: ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez."],
};

// "3 Nov 2026" / "3. Nov. 2026", without Intl so the prerendered HTML and the
// browser always agree.
export function reviewDate(iso, lang) {
  const [y, m, d] = iso.split("-").map(Number);
  return lang === "de" ? `${d}. ${MONTHS.de[m - 1]} ${y}` : `${d} ${MONTHS.en[m - 1]} ${y}`;
}
