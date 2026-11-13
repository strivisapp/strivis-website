import { Headline, Section } from "@/components/home/SectionHeader";
import { useT } from "@/i18n/context";

// Section 4. Three ways to a plan, each with a photo from the app's own
// set (Unsplash licence, decoration: empty alt), then the exercise library
// as a short proof with real entries from the catalog. The library strip
// keeps the old #exercises anchor; it links to its own page once the
// exercise pages exist (website stage 2).
export function Plans() {
  const p = useT().plans;
  const lib = p.library;
  return (
    <Section id="plans" labelledBy="plans-title">
      <Headline id="plans-title" lines={p.title} />
      <p className="mt-6 max-w-[46ch] text-body text-white/75 text-pretty md:text-lead">{p.lead}</p>

      <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {p.paths.map((path) => (
          <li key={path.key} className="min-w-0 overflow-hidden rounded-[22px] bg-surface-1 shadow-core ring-1 ring-hairline">
            <img
              src={`/photos/path-${path.key}-800.webp`}
              srcSet={`/photos/path-${path.key}-480.webp 480w, /photos/path-${path.key}-800.webp 800w`}
              sizes="(min-width: 768px) 360px, 100vw"
              width="800"
              height="533"
              alt=""
              loading="lazy"
              decoding="async"
              className="block aspect-[3/2] h-auto w-full object-cover"
            />
            <div className="px-6 pb-7 pt-5">
              <h3 className="font-heading text-[1.75rem] uppercase leading-none">{path.title}</h3>
              <p className="mt-3 text-body text-white/70 text-pretty">{path.body}</p>
            </div>
          </li>
        ))}
      </ul>

      <div id="exercises" className="mt-6 scroll-mt-24 rounded-[22px] p-6 ring-1 ring-hairline-strong sm:p-8">
        <h3 className="font-heading text-[2rem] uppercase leading-none text-balance md:text-[2.5rem]">
          {lib.title}
        </h3>
        <p className="mt-3 max-w-[52ch] text-body text-white/70 text-pretty">{lib.body}</p>
        <ul
          tabIndex={0}
          aria-label={lib.label}
          className="-mx-6 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 px-6 pb-1 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-8 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {lib.preview.map((ex) => (
            <li key={ex.id} className="w-[38%] shrink-0 snap-start sm:w-[22%] lg:w-auto">
              <img
                src={ex.image}
                alt={lib.imageAlt(ex.name)}
                width={512}
                height={512}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full rounded-2xl bg-surface-2 object-cover outline outline-1 -outline-offset-1 outline-white/10"
              />
              <p className="mt-2 text-small font-semibold leading-snug text-white">{ex.name}</p>
              <p className="text-small text-white/60">{ex.area}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
