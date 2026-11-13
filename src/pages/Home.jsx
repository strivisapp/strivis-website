import { useRef } from "react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SkipLink } from "@/components/site/SiteShell";
import { MobileDownloadBar } from "@/components/site/MobileDownloadBar";
import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { Training } from "@/components/home/Training";
import { Plans } from "@/components/home/Plans";
import { Progress } from "@/components/home/Progress";
import { Pricing } from "@/components/home/Pricing";
import { Founder } from "@/components/home/Founder";
import { Faq } from "@/components/home/Faq";
import { ClosingCta } from "@/components/home/ClosingCta";
import { useT } from "@/i18n/context";

// One story in seven sections (approved wireframe, 2026-11-13): the promise
// (hero) -> the problem (a notes app) -> logging (and the watch) -> plans ->
// progress (and the reviews) -> Free and Premium -> the founder, the
// questions and the close. The App Store badge sits in exactly three places,
// hero, after the pricing and the close, plus the nav's "Get the app"; on
// phones a button at the bottom fills the gaps. The same page at "/"
// (English) and "/de" (German): every text comes from src/i18n/en.js or
// de.js and src/content/.
export default function Home() {
  const t = useT();
  const heroRef = useRef(null);
  const heroActionRef = useRef(null);
  const pricingActionRef = useRef(null);
  const finalRef = useRef(null);
  const footerRef = useRef(null);

  return (
    <div className="bg-surface-0 text-foreground">
      <SkipLink />
      <SiteNav links={t.nav.links} heroRef={heroRef} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero ref={heroRef} actionRef={heroActionRef} />
        <Problem />
        <Training />
        <Plans />
        <Progress />
        <Pricing actionRef={pricingActionRef} />
        <Founder />
        <Faq />
        <ClosingCta ref={finalRef} />
      </main>
      <SiteFooter ref={footerRef} download="none" />
      <MobileDownloadBar heroActionRef={heroActionRef} pricingActionRef={pricingActionRef} finalRef={finalRef} footerRef={footerRef} />
    </div>
  );
}
