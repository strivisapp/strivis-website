import { useRef } from "react";
import { FloatingNav } from "@/components/home/FloatingNav";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Features } from "@/components/home/Features";
import { ScreenshotGallery } from "@/components/home/ScreenshotGallery";
import { Statement } from "@/components/home/Statement";
import { PlanConfigurator } from "@/components/home/PlanConfigurator";
import { ExerciseSpotlight } from "@/components/home/ExerciseSpotlight";
import { Personas } from "@/components/home/Personas";
import { PlanLibrary } from "@/components/home/PlanLibrary";
import { FreeVsPremium } from "@/components/home/FreeVsPremium";
import { Differentiation } from "@/components/home/Differentiation";
import { Roadmap } from "@/components/home/Roadmap";
import { Trust } from "@/components/home/Trust";
import { CtaRepeat } from "@/components/home/CtaRepeat";
import { Faq } from "@/components/home/Faq";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  const heroEndRef = useRef(null);

  // `dark` switches every token-based section to the .dark palette
  // (index.css), so the whole page reads as one dark, cinematic piece.
  return (
    <div className="dark bg-background text-foreground">
      {/* First thing a keyboard user reaches: skips the nav. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to content
      </a>
      {/* The site has no accounts (native-only app), so no login here. */}
      <FloatingNav heroEndRef={heroEndRef} ctaHref="/support" ctaLabel="Support" />
      <main id="main" tabIndex={-1} className="outline-none">
        {/* What it is → how it works → what it does → try it → the content
            → who it's for and what it costs → honesty → trust → download. */}
        <Hero heroEndRef={heroEndRef} />
        <HowItWorks />
        <Features />
        <ScreenshotGallery />
        <Statement />
        <PlanConfigurator />
        <ExerciseSpotlight />
        <Personas />
        <PlanLibrary />
        <FreeVsPremium />
        <Differentiation />
        <Roadmap />
        <Trust />
        {/* Social proof deferred — no fabricated testimonials/numbers */}
        <CtaRepeat />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
