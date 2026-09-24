import { motion, useReducedMotion } from "framer-motion";
import { AppStoreButton } from "@/components/home/AppStoreButton";
import { AppStoreQr } from "@/components/home/AppStoreQr";
import { Reveal } from "@/components/home/Reveal";

// Deliberately photo-free — the hero and Statement already carry the
// photography, so the close is a pure graphic moment instead of a third
// repeat of the same background image. On desktop, once the App Store
// listing exists, a QR code sits next to the button (AppStoreQr).
export function CtaRepeat() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="download" className="scroll-mt-24 relative bg-ink text-white py-28 md:py-40 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[140px] opacity-70"
        animate={prefersReducedMotion ? undefined : { opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "48px 48px" }}
      />
      <Reveal className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-heading uppercase text-5xl md:text-7xl tracking-wide leading-[0.95] text-balance mb-6">
          Ready to have it <span className="text-primary">all in one place?</span>
        </h2>
        <p className="text-white/70 text-base md:text-lg mb-10 max-w-md mx-auto">Free on iPhone — no subscription required.</p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <AppStoreButton className="rounded-full h-14 px-10 text-base" />
          <AppStoreQr />
        </div>
      </Reveal>
    </section>
  );
}
