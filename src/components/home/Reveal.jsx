import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades its children in with a short rise (12 px, 280 ms, --ease-out) the
 * first time they scroll into view (`.reveal`, src/index.css). Visible from
 * the first frame when the user prefers reduced motion, when
 * IntersectionObserver is missing, or before JavaScript runs.
 */
export function Reveal({ children, className, as: Tag = "div", ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at mount: leave it alone instead of blinking it out.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    setVisible(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-visible={visible} className={cn("reveal", className)} {...props}>
      {children}
    </Tag>
  );
}
