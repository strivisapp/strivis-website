import { cn } from "@/lib/utils";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/content/screenshots";

// An iPhone as a double bezel: an outer shell (6 px, a faint top-lit edge)
// around the screen, radii concentric (46 = 40 + 6). Static on purpose: no
// tilt, the screen has to stay readable. `shot` is an entry from
// src/content/screenshots.js; width/height reserve the space before the
// image arrives (no layout shift). `priority` for the one image on the
// first screen: eager and high fetch priority instead of lazy.
// `src` + `rotate` instead of `shot` is the older call style, kept so the
// pre-redesign home page on main keeps rendering with this same file.
export function PhoneFrame({ shot, src, rotate, alt, className, priority = false, sizes = "(min-width: 768px) 300px, 60vw" }) {
  const image = shot ?? { src };
  return (
    <div
      className={cn(
        "w-[220px] shrink-0 rounded-[46px] bg-gradient-to-b from-white/[0.14] to-white/[0.04] p-1.5 shadow-lift ring-1 ring-white/10",
        className
      )}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <div className="overflow-hidden rounded-[40px] bg-ink ring-1 ring-black/70">
        <img
          src={image.src}
          srcSet={image.src480 ? `${image.src480} 480w, ${image.src} 780w` : undefined}
          sizes={image.src480 ? sizes : undefined}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          alt={alt ?? image.alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}

// A cut-out of a real screenshot (not a rebuilt UI): the image is scaled to
// the frame's width and `position` picks which part shows.
export function ScreenCrop({ shot, alt, className, position = "50% 0%", sizes = "(min-width: 768px) 480px, 90vw" }) {
  return (
    <div className={cn("overflow-hidden rounded-tile bg-ink ring-1 ring-hairline", className)}>
      <img
        src={shot.src}
        srcSet={`${shot.src480} 480w, ${shot.src} 780w`}
        sizes={sizes}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        alt={alt ?? shot.alt}
        loading="lazy"
        decoding="async"
        className="block h-full w-full object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}
