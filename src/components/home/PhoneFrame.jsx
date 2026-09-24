import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Static 2D-rotate variant (unchanged call sites keep working) or, when
// `rotateY`/`rotateX` motion values are passed, a true CSS-3D tilt driven by
// the caller's own scroll progress.
export function PhoneFrame({ src, alt, className, rotate = 0, rotateY, rotateX }) {
  const is3d = rotateY !== undefined || rotateX !== undefined;

  return (
    <motion.div
      className={cn(
        "w-[180px] rounded-[2rem] border-4 border-neutral-800 bg-ink shadow-2xl overflow-hidden shrink-0",
        className
      )}
      style={
        is3d
          ? { rotateY, rotateX: rotateX ?? 0, transformPerspective: 1400 }
          : { transform: `rotate(${rotate}deg)` }
      }
    >
      <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full h-auto block" />
    </motion.div>
  );
}
