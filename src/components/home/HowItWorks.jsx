import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";

// Three steps from download to first logged set, as a numbered list (the
// order is the information here). Typographic on purpose: the feature
// section right after it shows the screens.
// TODO(Simon): an onboarding screenshot (goal / level / equipment question)
// would make step 1 visual; the old home-screen capture showed a test
// account's name and is gone.
const STEPS = [
  {
    title: "Tell it about you",
    body: "Your goal, your level, your equipment and how many days a week you can train.",
  },
  {
    title: "Get your plan",
    body: "The AI builds a plan around your answers. Or put one together yourself. Every day of it stays editable.",
  },
  {
    title: "Train and log",
    body: "Weight, reps and effort, set by set. The rest timer runs on its own, and a new personal record shows up the moment you hit it.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-20 border-t border-hairline bg-surface-0 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-5">
          <SectionHeader id="how-title" title="Three steps to your first set." />
        </Reveal>
        <ol className="divide-y divide-hairline border-y border-hairline md:col-span-7">
          {STEPS.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-x-4 py-6 md:grid-cols-[4.5rem_1fr] md:py-8">
              <span aria-hidden="true" className="font-heading text-[2.75rem] leading-none text-primary tabular-nums md:text-[3.5rem]">
                {i + 1}
              </span>
              <div>
                <h3 className="font-heading uppercase text-h3">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[52ch] text-body text-white/70">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
