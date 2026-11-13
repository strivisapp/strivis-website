import { Headline, Section } from "@/components/home/SectionHeader";
import { PhoneFrame, WatchFrame } from "@/components/home/PhoneFrame";
import { shotById } from "@/content/screenshots";
import { useT } from "@/i18n/context";

// Section 3. Logging: three points next to a real screen, then the Apple
// Watch as its own band (new in 1.1; other apps list it as a bullet).
export function Training() {
  const t = useT();
  const tr = t.training;
  return (
    <Section id="training" labelledBy="training-title">
      <div className="grid items-center gap-16 md:grid-cols-12 md:gap-8">
        <div className="min-w-0 md:col-span-7">
          <Headline id="training-title" lines={tr.title} />
          <ul className="mt-12 max-w-xl divide-y divide-hairline border-y border-hairline">
            {tr.points.map((point) => (
              <li key={point.title} className="py-6">
                <h3 className="text-lg font-bold text-white">{point.title}</h3>
                <p className="mt-1.5 text-body text-white/70 text-pretty">{point.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center md:col-span-5 md:justify-end">
          <PhoneFrame shot={shotById(t.screenshots, "exercise-detail")} sizes="(min-width: 768px) 300px, 250px" className="w-[250px] md:w-[300px]" />
        </div>
      </div>

      <div className="mt-24 grid items-center gap-10 rounded-[28px] bg-surface-1 p-7 shadow-core ring-1 ring-hairline sm:p-10 md:mt-32 md:grid-cols-[auto_1fr] md:gap-14 md:p-14">
        <WatchFrame alt={t.hero.watchAlt} className="w-[156px] md:w-[188px]" />
        <div className="min-w-0">
          <Headline as="h3" lines={tr.watch.title} className="text-[2.25rem] leading-[0.95] md:text-[3.25rem]" />
          <p className="mt-5 max-w-[46ch] text-body text-white/75 text-pretty md:text-lead">{tr.watch.lead}</p>
        </div>
      </div>
    </Section>
  );
}
