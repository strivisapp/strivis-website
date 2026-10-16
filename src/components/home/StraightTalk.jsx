import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { useT } from "@/i18n/context";

// What you can rely on, and what isn't there yet, in one place (was three
// sections: Differentiation, Trust, Roadmap). Only points the app's code
// backs up (strivis repo):
// - offline: exerciseDb.js downloads the catalog + images into IndexedDB
// - delete: SettingsAccount.jsx deleteAccount -> DELETE /api/account, which
//   removes the data and the login itself (strivis-backend deleteAccount.ts)
// - food data: lib/foodSearch.js (BLS and Swiss database, on the device),
//   lib/openFoodFacts.js (packaged food, barcodes)
// - billing: en.json settings.demoNotice (Apple ID, cancel in device settings)
// "Not there yet" names only what the FAQ already says; no dates.
// TODO(Simon): the AI coach (app: Coach.jsx is a "coming soon" stub) goes
// here only once it is decided for launch.
// The points themselves: straight.solid / straight.notYet in src/i18n/.

function List({ items, muted = false }) {
  return (
    <dl className="divide-y divide-hairline border-y border-hairline">
      {items.map((item) => (
        <div key={item.title} className="grid gap-1 py-5">
          <dt className={muted ? "font-semibold text-white/75" : "font-semibold text-white"}>{item.title}</dt>
          <dd className="text-body text-white/65">{item.body}</dd>
        </div>
      ))}
    </dl>
  );
}

export function StraightTalk() {
  const s = useT().straight;
  return (
    <section id="straight-talk" aria-labelledby="straight-title" className="scroll-mt-20 border-t border-hairline bg-surface-1 py-20 md:py-28">
      <Reveal className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeader id="straight-title" title={s.title} lead={s.lead} />
        <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <h3 className="mb-4 font-heading uppercase text-h3">{s.solidTitle}</h3>
            <List items={s.solid} />
          </div>
          <div className="md:col-span-5">
            <h3 className="mb-4 font-heading uppercase text-h3 text-white/80">{s.notYetTitle}</h3>
            <List items={s.notYet} muted />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
