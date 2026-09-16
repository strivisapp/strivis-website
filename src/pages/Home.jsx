import { useRef } from "react";
import { FloatingNav } from "@/components/home/FloatingNav";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { ExerciseSpotlight } from "@/components/home/ExerciseSpotlight";
import { PlanLibrary } from "@/components/home/PlanLibrary";
import { Differentiation } from "@/components/home/Differentiation";
import { CtaRepeat } from "@/components/home/CtaRepeat";
import { Faq } from "@/components/home/Faq";
import { Footer } from "@/components/home/Footer";
import { useAuth } from "@/lib/AuthContext";

export default function Home() {
  const heroEndRef = useRef(null);
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-background text-foreground">
      <FloatingNav heroEndRef={heroEndRef} ctaHref={isAuthenticated ? "/premium" : "/login"} ctaLabel={isAuthenticated ? "Premium" : "Login"} />
      <Hero heroEndRef={heroEndRef} />
      <Features />
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
