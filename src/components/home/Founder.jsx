import { FOUNDER, FOUNDER_PHOTO } from "@/content/founder";
import { useLanguage } from "@/i18n/context";

// Section 7a. The founder note in Simon's own words (src/content/founder.js)
// next to his photo. The photo is one file, public/founder/founder.webp; until
// the real one arrives it is a dark panel with the Strivis mark.
export function Founder() {
  const { lang, t } = useLanguage();
  const note = FOUNDER[lang];
  return (
    <section id="founder" aria-labelledby="founder-title" className="scroll-mt-20 border-t border-hairline bg-surface-0 py-24 md:py-36">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 sm:px-6 md:grid-cols-[minmax(0,300px)_1fr] md:gap-16">
        <img
          src={FOUNDER_PHOTO.src}
          width={FOUNDER_PHOTO.width}
          height={FOUNDER_PHOTO.height}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-[4/5] w-full max-w-[240px] rounded-[22px] md:max-w-[300px] object-cover outline outline-1 -outline-offset-1 outline-white/10"
        />
        <div className="min-w-0">
          <h2 id="founder-title" className="font-heading text-[2.25rem] uppercase leading-none md:text-[2.75rem]">
            {t.founder.title}
          </h2>
          <div className="mt-6 max-w-[60ch] space-y-5 text-body text-white/80 md:text-lead">
            {note.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-8 font-heading text-xl uppercase text-primary">{note.signature}</p>
        </div>
      </div>
    </section>
  );
}
