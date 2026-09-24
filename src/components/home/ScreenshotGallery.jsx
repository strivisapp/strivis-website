import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { SCREENSHOTS } from "@/content/screenshots";
import { cn } from "@/lib/utils";

const NAV_BUTTON =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-30 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

// App Store-style screenshot rail: native horizontal scroll with snap
// points, so touch swiping just works; prev/next buttons and the arrow keys
// (while the rail has focus) step one screen at a time. Never moves by itself.
export function ScreenshotGallery() {
  const railRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const step = (dir) => {
    const el = railRef.current;
    const item = el?.querySelector("li");
    if (!el || !item) return;
    const gap = parseFloat(getComputedStyle(item.parentElement).columnGap) || 0;
    el.scrollBy({ left: dir * (item.offsetWidth + gap), behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  return (
    <section id="screens" className="scroll-mt-24 py-20 md:py-28 bg-ink text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <SectionHeader eyebrow="Inside the app" title="Every screen, as it is." lead="Real screenshots from the iPhone app — no mock-ups." />
        </Reveal>
        <div className="flex gap-2">
          <button type="button" className={NAV_BUTTON} onClick={() => step(-1)} disabled={edges.start} aria-controls="screens-rail" aria-label="Previous screenshot">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button type="button" className={NAV_BUTTON} onClick={() => step(1)} disabled={edges.end} aria-controls="screens-rail" aria-label="Next screenshot">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-12">
        <div
          id="screens-rail"
          ref={railRef}
          tabIndex={0}
          role="region"
          aria-label="App screenshots — use the arrow keys to browse"
          onKeyDown={onKeyDown}
          className={cn(
            "relative overflow-x-auto snap-x snap-mandatory scroll-px-6 rounded-2xl",
            "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          )}
        >
          <ul className="flex w-max gap-5 md:gap-6 px-6 pb-6 pt-2">
          {SCREENSHOTS.map((s, i) => (
            <li key={s.src} className="relative snap-start shrink-0 w-[220px] md:w-[240px]">
              <PhoneFrame src={s.src} alt={s.alt} className="w-full shadow-[0_0_50px_rgba(255,68,0,0.08)]" />
              <div className="mt-4 px-1">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  <span className="sr-only">{`${i + 1} of ${SCREENSHOTS.length}: `}</span>
                  {s.title}
                </div>
                <p className="mt-1 text-sm text-white/70 leading-snug">{s.caption}</p>
              </div>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
