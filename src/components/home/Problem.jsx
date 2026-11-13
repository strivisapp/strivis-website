import { Headline } from "@/components/home/SectionHeader";
import { useT } from "@/i18n/context";

// Section 2. The problem, the way most people log today: a notes app. The
// card is the same picture as the reels (crossed-out guesses), set on the
// full-bleed chalk photo (the 1.1 store header's motif, Unsplash licence).
// The photo is decoration: empty alt, lazy, sized by srcset. The note is
// written in English on both sites, so lang="en" sits on its text only; the
// figure's label is in the page's language.
export function Problem() {
  const p = useT().problem;
  return (
    <section aria-labelledby="problem-title" className="relative isolate overflow-hidden border-t border-hairline bg-black">
      <img
        src="/photos/chalk-1400.webp"
        srcSet="/photos/chalk-800.webp 800w, /photos/chalk-1100.webp 1100w, /photos/chalk-1400.webp 1400w"
        sizes="100vw"
        width="1400"
        height="933"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[30%_50%] opacity-80"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/60 md:bg-transparent md:bg-gradient-to-r md:from-black/85 md:via-black/70 md:to-black/30" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-24 sm:px-6 md:min-h-[640px] md:grid-cols-2 md:gap-16 md:py-32">
        <figure aria-label={p.notesLabel} className="w-full max-w-[22rem] -rotate-2 rounded-md bg-paper px-6 py-5 text-[#1b1b1b] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] justify-self-center md:max-w-[26rem] md:justify-self-start">
          <figcaption lang="en" className="text-[0.8125rem] font-semibold text-[#7a756b]">{p.notesTitle}</figcaption>
          <ul lang="en" className="mt-2 space-y-1.5 font-notes text-[1.1875rem] leading-snug">
            {p.notes.map((line) => (
              <li key={line} className="line-through decoration-primary decoration-2">
                {line}
              </li>
            ))}
          </ul>
        </figure>

        <div className="min-w-0">
          <Headline id="problem-title" lines={p.title} />
          <p className="mt-6 max-w-[44ch] text-body text-white/80 text-pretty md:text-lead">{p.lead}</p>
        </div>
      </div>
    </section>
  );
}
