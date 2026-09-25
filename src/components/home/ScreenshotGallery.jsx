import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { SCREENSHOTS } from "@/content/screenshots";
import { cn } from "@/lib/utils";

const NAV_BUTTON =
  "press inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline-strong bg-white/[0.03] text-white hover:bg-white/[0.08] disabled:pointer-events-none disabled:opacity-30 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

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
    const start = el.scrollLeft <= 4;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    // Same object back when nothing changed: no re-render per scroll event.
    setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
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
    <section id="screens" aria-labelledby="screens-title" className="scroll-mt-20 overflow-hidden border-t border-hairline bg-surface-0 py-20 text-white md:py-28">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-5 sm:px-6">
        <Reveal>
          <SectionHeader id="screens-title" title="Every screen, as it is." lead="Real screenshots from the iPhone app. No mock-ups." />
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

      <div className="mx-auto mt-12 max-w-6xl">
        <div
          id="screens-rail"
          ref={railRef}
          tabIndex={0}
          role="region"
          aria-label="App screenshots. Use the arrow keys to browse."
          onKeyDown={onKeyDown}
          className={cn(
            "relative overflow-x-auto snap-x snap-mandatory scroll-px-5 sm:scroll-px-6 rounded-tile",
            "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          )}
        >
          <ul className="flex w-max gap-5 px-5 pb-6 pt-2 sm:px-6 md:gap-6">
          {SCREENSHOTS.map((s, i) => (
            <li key={s.src} className="relative snap-start shrink-0 w-[220px] md:w-[240px]">
              <PhoneFrame shot={s} sizes="240px" className="w-full" />
              <div className="mt-4 px-1">
                <h3 className="text-small font-semibold text-white">
                  <span className="sr-only">{`${i + 1} of ${SCREENSHOTS.length}: `}</span>
                  {s.title}
                </h3>
                <p className="mt-1 text-small text-white/65">{s.caption}</p>
              </div>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
