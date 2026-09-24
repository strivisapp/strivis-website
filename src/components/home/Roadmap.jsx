import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";

// Only plans the site already states (FAQ: Google Play "in the works";
// Straight talk: no food recognition from photos yet). No dates.
// TODO(Simon): the AI coach (app: Coach.jsx is a "coming soon" stub, Task
// Board: build it or leave it out for launch) — add it here only once decided.
const ITEMS = [
  {
    status: "In the works",
    title: "Strivis for Android",
    body: "A Google Play version. Until then, Strivis is iPhone only.",
  },
  {
    status: "Not there yet",
    title: "Food recognition from photos",
    body: "Logging a meal from a photo of it. For now, meals are logged by search or barcode.",
  },
];

export function Roadmap() {
  return (
    <section id="next" className="scroll-mt-24 pb-20 md:pb-28 bg-background text-foreground">
      <Reveal className="max-w-5xl mx-auto px-6">
        <SectionHeader
          className="mb-10"
          eyebrow="What's next"
          title="On the list."
          lead="Plans, not promises — so no dates."
        />
        <ol className="grid gap-4 md:grid-cols-2">
          {ITEMS.map((item) => (
            <li key={item.title} className="rounded-3xl border border-dashed border-white/15 p-6 md:p-8">
              <span className="inline-block rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
                {item.status}
              </span>
              <h3 className="mt-5 font-heading uppercase text-2xl tracking-wide">{item.title}</h3>
              <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
