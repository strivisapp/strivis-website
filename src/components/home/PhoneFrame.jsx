import { cn } from "@/lib/utils";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/content/screenshots";

// An iPhone as a double bezel: an outer shell (6 px, a faint top-lit edge)
// around the screen, radii concentric (46 = 40 + 6). Static on purpose: no
// tilt, the screen has to stay readable. `shot` is an entry from
// src/content/screenshots.js; width/height reserve the space before the
// image arrives (no layout shift). `priority` for the one image on the
// first screen: eager and high fetch priority instead of lazy.
export function PhoneFrame({ shot, alt, className, priority = false, sizes = "(min-width: 768px) 300px, 60vw" }) {
  return (
    <div className={cn("w-[220px] shrink-0 rounded-[46px] bg-gradient-to-b from-white/[0.14] to-white/[0.04] p-1.5 shadow-lift ring-1 ring-white/10", className)}>
      <div className="overflow-hidden rounded-[40px] bg-ink ring-1 ring-black/70">
        <img
          src={shot.src}
          srcSet={`${shot.src480} 480w, ${shot.src} 780w`}
          sizes={sizes}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          alt={alt ?? shot.alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}

// The Apple Watch app's set page (public/screenshots/watch-set.webp, an
// English capture of app 1.1, 416 x 496) in the same double bezel as the
// phone, radii scaled to the watch. Lazy like every image below the first
// screen; the hero passes `priority`. Without `alt` it is decoration (the
// hero's watch: the Training section's watch carries the description).
const WATCH_SHOT = { src: "/screenshots/watch-set.webp", width: 416, height: 496 };

export function WatchFrame({ alt = "", className, priority = false }) {
  return (
    <div className={cn("rounded-[30%/26%] bg-gradient-to-b from-white/[0.16] to-white/[0.05] p-[6%] shadow-lift ring-1 ring-white/10", className)}>
      <img
        src={WATCH_SHOT.src}
        width={WATCH_SHOT.width}
        height={WATCH_SHOT.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="block h-auto w-full rounded-[24%/20%] bg-black"
      />
    </div>
  );
}
