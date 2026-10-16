import { Reveal } from "@/components/home/Reveal";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { EXERCISE_COUNT } from "@/content/exercises";
import { shotById } from "@/content/screenshots";
import { useT } from "@/i18n/context";

// The exercise library: the number once, two real detail screens (each
// turned 3 degrees, once, no stacked rotation), then real entries from the
// catalog with the illustrations the app shows: a swipeable rail on phones,
// a grid from md up.
export function ExerciseSpotlight() {
  const t = useT();
  const x = t.exercises;
  return (
    <section id="exercises" aria-labelledby="exercises-title" className="scroll-mt-20 overflow-hidden border-t border-hairline bg-surface-0 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-6 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-6">
          <h2 id="exercises-title" className="font-heading uppercase">
            <span className="block text-[7rem] leading-[0.85] text-primary tabular-nums md:text-[9rem]">{EXERCISE_COUNT}</span>
            <span className="mt-3 block text-h2-sm md:text-h2 text-balance">{x.title}</span>
          </h2>
          <p className="mt-5 max-w-[46ch] text-body text-white/70 md:text-lead">{x.lead}</p>
          <ul className="mt-6 space-y-2 text-small text-white/60">
            {x.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </Reveal>
        <div className="flex justify-center gap-4 sm:gap-6 md:col-span-6">
          <PhoneFrame shot={shotById(t.screenshots, "exercise-library")} sizes="200px" className="w-[150px] -rotate-3 sm:w-[190px]" />
          <PhoneFrame shot={shotById(t.screenshots, "exercise-detail")} sizes="200px" className="mt-12 w-[150px] rotate-3 sm:w-[190px]" />
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl md:mt-24">
        <h3 className="px-5 text-small font-semibold text-white/80 sm:px-6">{x.previewTitle}</h3>
        <ul
          tabIndex={0}
          aria-label={x.previewLabel}
          className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary [scrollbar-width:none] sm:px-6 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {x.preview.map((ex) => (
            <li key={ex.id} className="w-[46%] shrink-0 snap-start rounded-core bg-surface-1 p-1.5 shadow-core ring-1 ring-hairline sm:w-[30%] md:w-auto">
              <img
                src={ex.image}
                alt={x.imageAlt(ex.name)}
                width={512}
                height={512}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full rounded-tile object-cover"
              />
              <div className="px-2 pb-2 pt-3">
                <div className="text-small font-semibold leading-snug text-white">{ex.name}</div>
                <div className="mt-0.5 text-small text-white/55">{ex.area}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
