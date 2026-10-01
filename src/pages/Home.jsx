import { useRef } from "react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SkipLink } from "@/components/site/SiteShell";
import { MobileDownloadBar } from "@/components/site/MobileDownloadBar";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Features } from "@/components/home/Features";
import { ScreenshotGallery } from "@/components/home/ScreenshotGallery";
import { PlanConfigurator } from "@/components/home/PlanConfigurator";
import { ExerciseSpotlight } from "@/components/home/ExerciseSpotlight";
import { FreeVsPremium } from "@/components/home/FreeVsPremium";
import { StraightTalk } from "@/components/home/StraightTalk";
import { FounderStory } from "@/components/home/FounderStory";
import { CtaRepeat } from "@/components/home/CtaRepeat";
import { Faq } from "@/components/home/Faq";

const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#premium", label: "Premium" },
  { href: "#faq", label: "FAQ" },
];

// Eleven sections, each its own layout: what it is (hero) -> how it works
// -> what it does (bento) -> the real screens -> try it -> the library ->
// what it costs -> what's solid and what isn't -> download -> questions
// -> footer. The download action sits in the hero, the final section and
// (phones) a bar in between.
export default function Home() {
  const heroRef = useRef(null);
  const heroActionRef = useRef(null);
  const finalRef = useRef(null);
  const footerRef = useRef(null);

  return (
    <div className="bg-surface-0 text-foreground">
      <SkipLink />
      <SiteNav links={NAV_LINKS} heroRef={heroRef} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero ref={heroRef} actionRef={heroActionRef} />
        <HowItWorks />
        <Features />
        <ScreenshotGallery />
        <PlanConfigurator />
        <ExerciseSpotlight />
        <FreeVsPremium />
        <StraightTalk />
        {/* Renders only once src/content/founder.js has Simon's own text. */}
        <FounderStory />
        {/* Social proof deferred: no fabricated testimonials or numbers. */}
        <CtaRepeat ref={finalRef} />
        <Faq />
      </main>
      <SiteFooter ref={footerRef} download="compact" />
      <MobileDownloadBar heroActionRef={heroActionRef} finalRef={finalRef} footerRef={footerRef} />
    </div>
  );
}
