import { Star } from "lucide-react";
import { Headline, Section } from "@/components/home/SectionHeader";
import { REVIEWS, reviewDate } from "@/content/reviews";
import { SCREEN_HEIGHT, SCREEN_WIDTH, shotById } from "@/content/screenshots";
import { useLanguage } from "@/i18n/context";

const SHOTS = ["progress-sets", "dashboard", "nutrition-day"];

// Real App Store reviews (src/content/reviews.js), word for word and in the
// language they were written in, on both pages. Five stars as the store
// shows them; the stars are one image with a text name.
function Reviews() {
  const { lang, t } = useLanguage();
  return (
    <div className="mt-24 md:mt-32">
      <h3 className="font-heading text-[2.25rem] uppercase leading-none md:text-[2.75rem]">{t.reviews.title}</h3>
      <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {REVIEWS.map((r) => (
          <li key={r.id} className="min-w-0">
            <figure className="flex h-full flex-col rounded-[22px] bg-surface-1 p-6 shadow-core ring-1 ring-hairline md:p-7">
              <div role="img" aria-label={t.reviews.stars(r.rating)} className="flex gap-1 text-gold">
                {Array.from({ length: r.rating }, (_, i) => (
                  <Star key={i} aria-hidden="true" className="h-4 w-4 fill-current" strokeWidth={0} />
                ))}
              </div>
              <blockquote lang={r.lang} className="mt-4 flex-1">
                <p className="text-body font-bold text-white text-balance">{r.title}</p>
                <p className="mt-2 text-body text-white/75 text-pretty">{r.lang === "de" ? `„${r.text}“` : `“${r.text}”`}</p>
              </blockquote>
              <figcaption className="mt-6 text-small text-white/60">
                <span className="font-semibold text-white/80">{r.author}</span> · {r.store} · <time dateTime={r.date}>{reviewDate(r.date, lang)}</time>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Section 5. Progress: three statements, three real screens, then the
// reviews. Nutrition sits here on purpose: training and food in one app.
export function Progress() {
  const t = useLanguage().t;
  const p = t.progress;
  return (
    <Section id="progress" labelledBy="progress-title">
      <Headline id="progress-title" lines={p.title} />
      <ul className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {p.points.map((point) => (
          <li key={point.title} className="min-w-0 border-t border-hairline-strong pt-6">
            <h3 className="text-lg font-bold text-white">{point.title}</h3>
            <p className="mt-1.5 text-body text-white/70 text-pretty">{point.body}</p>
          </li>
        ))}
      </ul>

      <ul aria-label={p.shotsLabel} className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-2.5 sm:gap-5 md:mt-20">
        {SHOTS.map((id) => {
          const shot = shotById(t.screenshots, id);
          return (
            <li key={id} className="min-w-0">
              <img
                src={shot.src}
                srcSet={`${shot.src480} 480w, ${shot.src} 780w`}
                sizes="(min-width: 768px) 240px, 31vw"
                width={SCREEN_WIDTH}
                height={SCREEN_HEIGHT}
                alt={shot.alt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full rounded-[14px] outline outline-1 -outline-offset-1 outline-white/10 sm:rounded-[26px]"
              />
            </li>
          );
        })}
      </ul>

      <Reviews />
    </Section>
  );
}
