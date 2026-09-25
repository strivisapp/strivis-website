import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";

// What you can rely on, and what isn't there yet, in one place (was three
// sections: Differentiation, Trust, Roadmap). Only points the app's code
// backs up (strivis repo):
// - offline: exerciseDb.js downloads the catalog + images into IndexedDB
// - delete: SettingsAccount.jsx deleteAccount -> DELETE /api/account, which
//   removes the data and the login itself (strivis-backend deleteAccount.ts)
// - food data: lib/openFoodFacts.js, lib/usdaFoodData.js
// - billing: en.json settings.demoNotice (Apple ID, cancel in device settings)
// "Not there yet" names only what the FAQ already says; no dates.
// TODO(Simon): the AI coach (app: Coach.jsx is a "coming soon" stub) goes
// here only once it is decided for launch.
const SOLID = [
  { title: "Works offline", body: "After a one-time download, the whole exercise library, images and instructions included, works without a connection." },
  { title: "Delete it all, in the app", body: "Delete your account in the app's settings at any time. Your data goes with it, permanently." },
  { title: "Real food data", body: "Nutrition values come from OpenFoodFacts and the USDA database, not from estimates." },
  { title: "Billed by Apple", body: "Premium is paid through your Apple ID and can be cancelled anytime in your device settings." },
];

const NOT_YET = [
  { title: "Android", body: "A Google Play version is in the works. Until then, Strivis is iPhone only." },
  { title: "Food from photos", body: "Logging a meal from a photo of it. For now, meals are logged by search or barcode." },
];

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
  return (
    <section id="straight-talk" aria-labelledby="straight-title" className="scroll-mt-20 border-t border-hairline bg-surface-1 py-20 md:py-28">
      <Reveal className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeader id="straight-title" title="Straight talk." lead="What you can count on today, and what isn't there yet." />
        <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <h3 className="mb-4 font-heading uppercase text-h3">Solid today</h3>
            <List items={SOLID} />
          </div>
          <div className="md:col-span-5">
            <h3 className="mb-4 font-heading uppercase text-h3 text-white/80">Not there yet</h3>
            <List items={NOT_YET} muted />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
