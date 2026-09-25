import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { ScreenCrop } from "@/components/home/PhoneFrame";
import { Bezel } from "@/components/ui/bezel";
import { screenshot } from "@/content/screenshots";
import { cn } from "@/lib/utils";

// Four features as one asymmetric bento (7 | 5 over 5 | 12), each cell with
// a sharp cut-out of a real screen. Replaces the four full-screen chapters
// (blurred screenshots, scroll-driven tilt). Copy only names what the app
// does today; the barcode scanner is Premium and says so.
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
  return (
    <section id="features" aria-labelledby="features-title" className="scroll-mt-20 bg-surface-0 pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <SectionHeader id="features-title" title="Everything in one app." lead="Training, logging, nutrition and progress, built from your own data." />
        </Reveal>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-12 md:gap-4">
          <Cell
            title="AI training plans"
            body="Tell it your goal, level and equipment. Every day of the plan stays editable."
            className="sm:col-span-2 md:col-span-7 md:row-span-2"
          >
            <ScreenCrop
              shot={screenshot("Plan")}
              alt="A Push Pull Legs plan in Strivis: day 1, Push, with Barbell Bench Press and Neutral Grip Pull Ups"
              position="50% 4%"
              className="mx-6 mb-0 aspect-[4/3] rounded-b-none md:mx-7 md:aspect-auto md:min-h-[20rem] md:flex-1"
            />
          </Cell>
          <Cell
            title="Every set counts"
            body="Weight, reps and effort. The rest timer runs on its own and PRs show up live."
            className="md:col-span-5"
          >
            <ScreenCrop
              shot={screenshot("Workout")}
              alt="Three logged sets of Barbell Bench Press with weight, reps and a check mark each"
              position="50% 11%"
              className="mx-6 aspect-[16/9] rounded-b-none md:mx-7"
            />
          </Cell>
          <Cell
            title="Logged, not guessed"
            body="Calories, macros and water for the day. Search real food data from OpenFoodFacts and USDA. Scan barcodes with Premium."
            className="md:col-span-5"
          >
            <ScreenCrop
              shot={screenshot("Nutrition")}
              alt="Today in the Nutrition tab: 2875 kcal left, rings for protein, carbs and fat, and the macro split"
              position="50% 33%"
              className="mx-6 aspect-[16/9] rounded-b-none md:mx-7"
            />
          </Cell>
          <Bezel as="li" className="sm:col-span-2 md:col-span-12" coreClassName="grid overflow-hidden md:grid-cols-12 md:items-end">
            <div className="p-6 md:col-span-5 md:self-center md:p-10">
              <h3 className="font-heading uppercase text-h3">See what moved</h3>
              <p className="mt-2 max-w-[40ch] text-body text-white/70">Volume, records and muscle balance, built from your own training.</p>
            </div>
            <ScreenCrop
              shot={screenshot("Progress")}
              alt="A new record for Banded Chest Stretch, 20 kg x 10 with an estimated 1RM of 27 kg, and the split of sets across muscle groups"
              position="50% 12%"
              className="mx-6 aspect-[4/3] rounded-b-none md:col-span-7 md:mx-0 md:mr-10 md:mt-8 md:aspect-[16/10]"
            />
          </Bezel>
        </ul>
      </div>
    </section>
  );
}
