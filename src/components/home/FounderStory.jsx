import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { FOUNDER_STORY, FOUNDER_SIGNATURE } from "@/content/founder";

// Renders nothing until src/content/founder.js has a story in it — no
// placeholder text ever reaches the live page.
export function FounderStory() {
  const paragraphs = FOUNDER_STORY.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (paragraphs.length === 0) return null;

  return (
    <section id="story" className="scroll-mt-24 py-20 md:py-28 bg-background text-foreground">
      <Reveal className="max-w-2xl mx-auto px-6">
        <SectionHeader className="mb-10" eyebrow="Why Strivis" title="Why I built it." />
        <div className="space-y-5 text-base md:text-lg leading-relaxed text-white/80">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {FOUNDER_SIGNATURE && <p className="mt-8 font-heading uppercase tracking-wide text-primary">{FOUNDER_SIGNATURE}</p>}
      </Reveal>
    </section>
  );
}
