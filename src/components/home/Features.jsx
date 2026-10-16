import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { ScreenCrop } from "@/components/home/PhoneFrame";
import { Bezel } from "@/components/ui/bezel";
import { shotById } from "@/content/screenshots";
import { useT } from "@/i18n/context";
import { cn } from "@/lib/utils";

// Four features as one asymmetric bento, each cell with a sharp cut-out of a
// real screen. Desktop: the plan (7 columns) spans two rows next to two
// stacked 5-column cells, then one full-width row. The two stacked cells set
// the row heights (text plus a 16:9 crop); the plan crop only fills what is
// left, so no cell is taller than its content. Replaces the four
// full-screen chapters (blurred screenshots, scroll-driven tilt). Copy only
// names what the app does today; the barcode scanner is free since the app's
// 2026-10-07 build.
function Cell({ title, body, children, className, textClassName }) {
  return (
    <Bezel as="li" className={className} coreClassName="flex flex-col overflow-hidden">
      <div className={cn("p-6 md:p-7", textClassName)}>
        <h3 className="font-heading uppercase text-h3">{title}</h3>
        <p className="mt-2 max-w-[44ch] text-body text-white/70">{body}</p>
      </div>
      {children}
    </Bezel>
  );
}

export function Features() {
  const t = useT();
  const f = t.features;
  const shot = (id) => shotById(t.screenshots, id);
  return (
    <section id="features" aria-labelledby="features-title" className="scroll-mt-20 bg-surface-0 pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <SectionHeader id="features-title" title={f.title} lead={f.lead} />
        </Reveal>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-12 md:gap-4">
          <Cell title={f.plan.title} body={f.plan.body} className="sm:col-span-2 md:col-span-7 md:row-span-2">
            <ScreenCrop
              shot={shot("plan-preview")}
              alt={f.plan.alt}
              positionClassName="object-[50%_4%]"
              className="mx-6 mb-0 aspect-[4/3] rounded-b-none md:mx-7 md:aspect-auto md:min-h-[20rem] md:flex-1"
            />
          </Cell>
          <Cell title={f.sets.title} body={f.sets.body} className="md:col-span-5">
            <ScreenCrop
              shot={shot("active-workout")}
              alt={f.sets.alt}
              positionClassName="object-[50%_11%]"
              className="mx-6 aspect-[16/9] rounded-b-none md:mx-7"
            />
          </Cell>
          <Cell title={f.food.title} body={f.food.body} className="md:col-span-5">
            <ScreenCrop
              shot={shot("nutrition-day")}
              alt={f.food.alt}
              positionClassName="object-[50%_33%]"
              className="mx-6 aspect-[16/9] rounded-b-none md:mx-7"
            />
          </Cell>
          <Bezel as="li" className="sm:col-span-2 md:col-span-12" coreClassName="grid overflow-hidden md:grid-cols-12 md:items-end">
            <div className="p-6 md:col-span-5 md:self-center md:p-10">
              <h3 className="font-heading uppercase text-h3">{f.progress.title}</h3>
              <p className="mt-2 max-w-[40ch] text-body text-white/70">{f.progress.body}</p>
            </div>
            <ScreenCrop
              shot={shot("progress-sets")}
              alt={f.progress.alt}
              positionClassName="object-[50%_30%]"
              className="mx-6 aspect-[4/3] rounded-b-none md:col-span-7 md:mx-0 md:mr-10 md:mt-8 md:aspect-[16/10]"
            />
          </Bezel>
        </ul>
      </div>
    </section>
  );
}
