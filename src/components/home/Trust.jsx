import { CloudOff, Trash2, Database, CreditCard } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";

// Only points the app's code backs up (strivis repo):
// - offline: exerciseDb.js downloads the catalog + images into IndexedDB
// - delete: SettingsAccount.jsx deleteAccount → DELETE /api/account, which
//   removes the data and the login itself (strivis-backend deleteAccount.ts)
// - food data: lib/openFoodFacts.js, lib/usdaFoodData.js
// - billing: en.json settings.demoNotice (Apple ID, cancel in device settings)
const POINTS = [
  {
    icon: CloudOff,
    title: "Works offline",
    body: "After a one-time download, the whole exercise library — images and instructions — works without a connection.",
  },
  {
    icon: Trash2,
    title: "Delete it all, in the app",
    body: "Delete your account in the app's settings at any time. Your data goes with it, permanently.",
  },
  {
    icon: Database,
    title: "Real food data",
    body: "Nutrition values come from OpenFoodFacts and the USDA database, not from estimates.",
  },
  {
    icon: CreditCard,
    title: "Billed by Apple",
    body: "Premium is paid through your Apple ID. Subscriptions can be cancelled anytime in your device settings.",
  },
];

export function Trust() {
  return (
    <section id="trust" className="scroll-mt-24 py-20 md:py-28 bg-ink text-white">
      <Reveal className="max-w-5xl mx-auto px-6">
        <SectionHeader className="mb-12" eyebrow="Your data, your call" title="Built to be trusted." />
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
          {POINTS.map(({ icon: Icon, title, body }) => (
            <li key={title} className="bg-ink p-6 md:p-8">
              <Icon aria-hidden="true" className="w-6 h-6 text-primary mb-5" />
              <h3 className="font-heading uppercase text-xl tracking-wide mb-2">{title}</h3>
              <p className="text-sm md:text-base text-white/70 leading-relaxed">{body}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
