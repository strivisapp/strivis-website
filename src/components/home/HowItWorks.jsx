import { PhoneFrame } from "@/components/home/PhoneFrame";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { shotById } from "@/content/screenshots";
import { useT } from "@/i18n/context";

// Three steps from download to first logged set, as a numbered list (the
// order is the information here). Each step shows the top of the real
// screen it is about: the onboarding question, the plan, the workout log.
// Static phones, faded out at the bottom instead of cut hard. On phones each
// step is one row: number and title, then the text, on the left, a small
// phone beside it; from md up the three steps stand side by side with a larger phone.
// The steps' texts: how.steps in src/i18n/en.js and de.js.
export function HowItWorks() {
  const t = useT();
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-20 border-t border-hairline bg-surface-0 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <SectionHeader id="how-title" title={t.how.title} />
        </Reveal>
        <ol className="mt-10 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-6">
          {t.how.steps.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[1fr_7.5rem] items-start gap-x-4 border-t border-hairline pt-6 md:flex md:flex-col md:items-stretch md:pt-8">
              {/* Phones: number and title share a line, the text runs below
                  both (the inner div dissolves into this grid). */}
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-3 md:flex-1 md:grid-cols-[3.5rem_1fr] md:items-start md:gap-x-4">
                <span aria-hidden="true" className="font-heading text-[2rem] leading-none text-primary tabular-nums md:text-[3.25rem]">
                  {i + 1}
                </span>
                <div className="contents md:block">
                  <h3 className="font-heading uppercase text-h3">
                    <span className="sr-only">{t.how.step(i + 1)}</span>
                    {step.title}
                  </h3>
                  <p className="col-span-2 mt-2 max-w-[52ch] text-body text-white/70">{step.body}</p>
                </div>
              </div>
              {/* Only the top of the screen shows; the phone fades out below. */}
              <div className="flex h-[184px] justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,#000_72%,transparent)] md:mt-8 md:h-[340px]">
                <PhoneFrame
                  shot={shotById(t.screenshots, step.shot)}
                  sizes="(min-width: 768px) 220px, 120px"
                  className="w-[7.5rem] self-start rounded-[26px] p-1 md:w-[220px] md:rounded-[46px] md:p-1.5"
                  screenClassName="rounded-[22px] md:rounded-[40px]"
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
