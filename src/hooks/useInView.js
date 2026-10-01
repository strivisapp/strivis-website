import { useEffect, useState } from "react";

/**
 * Where an element is relative to the viewport, from an IntersectionObserver
 * (no scroll listener, no work per scroll frame). Returns
 * `{ inView, above }`: `above` is true once the element has scrolled out
 * past the top edge. `ref` is a React ref; until the observer reports,
 * the element counts as in view (`initial`).
 */
export function useInView(ref, { rootMargin = "0px", initial = true } = {}) {
  const [state, setState] = useState({ inView: initial, above: false });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const top = entry.rootBounds?.top ?? 0;
        setState({
          inView: entry.isIntersecting,
          above: !entry.isIntersecting && entry.boundingClientRect.bottom <= top,
        });
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return state;
}
