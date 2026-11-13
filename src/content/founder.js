// The founder note on the home page (components/home/Founder.jsx), Simon's
// own text in both languages (reports/gruendernotiz.md in the app repo,
// final 2026-11-13). Plain text, one string per paragraph.
export const FOUNDER = {
  en: {
    paragraphs: [
      "I've trained for muscle gain for years, and for most of them my log lived in a notes app. Calories were in another app, my plan in a third. None of them knew about the others, and the parts I needed most sat behind a subscription.",
      "So I built Strivis on my own: training, plans and nutrition in one place, with your last session right where you log the next one.",
      "A few things won't change. What you need to plan, log and track stays free. Your data is yours. And every message you send, through support or Instagram, lands with me. I read all of them.",
    ],
    signature: "Simon, founder of Strivis",
  },
  de: {
    paragraphs: [
      "Ich trainiere seit Jahren auf Muskelaufbau, und lange stand mein Training in der Notiz-App. Die Kalorien in einer anderen App, der Plan in einer dritten. Keine wusste von der anderen, und was ich am meisten brauchte, gab es nur im Abo.",
      "Also habe ich Strivis allein gebaut: Training, Pläne und Ernährung an einem Ort, und dein letztes Training genau da, wo du das nächste einträgst.",
      "Ein paar Dinge ändern sich nicht. Was du zum Planen, Loggen und Auswerten brauchst, bleibt kostenlos. Deine Daten gehören dir. Und jede Nachricht, ob über den Support oder Instagram, landet bei mir. Ich lese alle.",
    ],
    signature: "Simon, Gründer von Strivis",
  },
};

// The photo next to the note. Until Simon's own photo arrives this file is a
// neutral dark panel with the Strivis mark (no stock face). To swap it,
// replace public/founder/founder.webp with the real photo, cropped to 4:5 at
// 800 x 1000 px; nothing else changes. The alt text stays empty on purpose:
// the signature right beside it already says who it is.
export const FOUNDER_PHOTO = { src: "/founder/founder.webp", width: 800, height: 1000 };
