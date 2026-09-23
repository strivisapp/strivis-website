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

  return (
    <div className="bg-background text-foreground">
      {/* The site has no accounts (native-only app), so no login here. */}
      <FloatingNav heroEndRef={heroEndRef} ctaHref="/support" ctaLabel="Support" />
      <Hero heroEndRef={heroEndRef} />
      <Features />
      <Statement />
      <ExerciseSpotlight />
      <PlanLibrary />
      <Differentiation />
      {/* Social proof deferred — no fabricated testimonials/numbers */}
      <CtaRepeat />
      <Faq />
      <Footer />
    </div>
  );
}
