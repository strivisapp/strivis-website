import { PhoneFrame } from "@/components/home/PhoneFrame";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { screenshot } from "@/content/screenshots";

// Three steps from download to first logged set, as a numbered list (the
// order is the information here). Each step shows the top of the real
// screen it is about: the onboarding question, the plan, the workout log.
// Static phones, faded out at the bottom instead of cut hard.
const STEPS = [
  {
    title: "Tell it about you",
    body: "Your goal, your level, your equipment, how many days a week you can train and the muscle groups you want to focus on.",
    shot: screenshot("Onboarding"),
  },
  {
    title: "Get your plan",
    body: "The AI builds a plan around your answers. Or put one together yourself. Every day of it stays editable.",
    shot: screenshot("Plan"),
  },
  {
    title: "Train and log",
    body: "Weight, reps and effort, set by set. The rest timer runs on its own, and a new personal record shows up the moment you hit it.",
    shot: screenshot("Workout"),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-20 border-t border-hairline bg-surface-0 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <SectionHeader id="how-title" title="Three steps to your first set." />
        </Reveal>
        <ol className="mt-12 grid gap-14 md:grid-cols-3 md:gap-6">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex flex-col border-t border-hairline pt-6 md:pt-8">
              <div className="grid grid-cols-[3rem_1fr] gap-x-4 md:flex-1 md:grid-cols-[3.5rem_1fr]">
                <span aria-hidden="true" className="font-heading text-[2.75rem] leading-none text-primary tabular-nums md:text-[3.25rem]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-heading uppercase text-h3">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[52ch] text-body text-white/70">{step.body}</p>
                </div>
              </div>
              {/* Only the top of the screen shows; the phone fades out below. */}
              <div className="mt-8 flex h-[300px] justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,#000_72%,transparent)] md:h-[340px]">
                <PhoneFrame shot={step.shot} sizes="220px" className="w-[200px] self-start md:w-[220px]" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
