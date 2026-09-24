import { motion, useReducedMotion } from "framer-motion";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { screenshot } from "@/content/screenshots";

// Three steps from download to first logged set. Step 1 shows the home
// screen, whose weekly goal comes from the days-per-week answer in
// onboarding (Dashboard.jsx: weeklyTarget = profile.daysPerWeek).
// TODO(Simon): swap step 1 for an onboarding screenshot (goal / level /
// equipment question) once there is an English one in public/screenshots/.
const STEPS = [
  {
    title: "Tell it about you",
    body: "Your goal, your level, your equipment and how many days a week you can train. Your home screen tracks that weekly goal from day one.",
    shot: screenshot("Home"),
  },
  {
    title: "Get your plan",
    body: "The AI builds a plan around your answers. Prefer to do it yourself? Put one together from scratch — it's your plan either way, and every day of it is editable.",
    shot: screenshot("Plan"),
  },
  {
    title: "Train and log",
    body: "Weight, reps and effort, set by set. The rest timer runs on its own, and a new personal record shows up the moment you hit it.",
    shot: screenshot("Workout"),
  },
];

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="scroll-mt-24 py-20 md:py-28 bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <SectionHeader eyebrow="How it works" title="Three steps to your first set." />
        </Reveal>
        <ol className="mt-14 grid gap-14 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span aria-hidden="true" className="font-heading text-5xl text-primary tabular-nums leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading uppercase text-2xl tracking-wide">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8 md:min-h-[7.5rem]">{step.body}</p>
              <div className="mt-auto flex justify-center rounded-3xl border border-white/[0.06] bg-white/[0.02] pt-8 overflow-hidden h-[340px] md:h-[360px]">
                <PhoneFrame src={step.shot.src} alt={step.shot.alt} className="w-[200px] self-start shadow-[0_0_60px_rgba(255,68,0,0.10)]" />
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
