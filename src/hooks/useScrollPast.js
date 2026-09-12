import { useEffect, useState } from "react";

/**
 * Tracks whether the page has scrolled past the bottom of a sentinel
 * element (ref). Used to switch the header from transparent-over-hero to
 * a solid bar. Recomputed on every scroll tick rather than relying on
 * IntersectionObserver's enter/exit-only callbacks, which proved unreliable
 * for a thin sentinel scrolled past quickly.
 */
export function useScrollPast(ref) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const update = () => {
      setPast(el.getBoundingClientRect().bottom < 0);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);

  return past;
}
