import { useRef } from "react";
import { FloatingNav } from "@/components/home/FloatingNav";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Statement } from "@/components/home/Statement";
import { ExerciseSpotlight } from "@/components/home/ExerciseSpotlight";
import { PlanLibrary } from "@/components/home/PlanLibrary";
import { Differentiation } from "@/components/home/Differentiation";
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
      <Hero heroEndRef={heroEndRef} />
      <Features />
      <Statement />
      <ExerciseSpotlight />
      <PlanLibrary />
      <Differentiation />
      {/* Social proof deferred — no fabricated testimonials/numbers */}
      <CtaRepeat />
      <Faq />
      </main>
      <Footer />
    </div>
  );
}
