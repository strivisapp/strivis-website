import { APP_STORE_URL } from "@/lib/appStore";
import { WaitlistForm } from "@/components/download/WaitlistForm";
import { cn } from "@/lib/utils";

// Apple's official "Download on the App Store" badge (black, en-us), from
// Apple Marketing Tools, file unmodified. Apple's rules for it: never
// recolour or alter it, at least 40 px tall on screen, clear space of at
// least a quarter of its height on every side, and it
// always links straight to the App Store listing. Callers keep the clear
// space with their gaps (>= 12 px next to a 48 px badge).
export const APP_STORE_BADGE = "/badges/download-on-the-app-store-black-en-us.svg";
const BADGE_RATIO = 119.66407 / 40;

export function AppStoreBadge({ height = 48, className }) {
  return (
    <a
      href={APP_STORE_URL}
      className={cn("press inline-block shrink-0 rounded-[9px] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink", className)}
    >
      <img src={APP_STORE_BADGE} alt="Download on the App Store" width={Math.round(height * BADGE_RATIO)} height={height} className="block" />
    </a>
  );
}

// The page's one download action. With the App Store listing set
// (APP_STORE_URL, lib/appStore.js) it is the official badge; until then it
// says so plainly and offers the launch waitlist instead. Never a disabled
// or greyed-out button.
//
//   variant="full"    badge, or "Coming soon" + the email form. Carries
//                     id="download" when `anchor`, the target of every
//                     compact action and the nav's "Get the app".
//   variant="compact" badge, or "Coming soon" + a "Notify me" link to the
//                     page's full action (#download).
export function DownloadAction({ variant = "full", source, anchor = false, className, badgeHeight, note }) {
  if (APP_STORE_URL) {
    return (
      <div id={anchor ? "download" : undefined} className={cn("scroll-mt-28", className)}>
        <AppStoreBadge height={badgeHeight ?? (variant === "compact" ? 40 : 48)} />
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
        <p className="text-small font-semibold text-white">Coming soon to the App Store</p>
        <a
          href="#download"
          className="press inline-flex h-11 items-center rounded-full border border-hairline-strong bg-white/[0.04] px-5 text-small font-semibold text-white hover:bg-white/[0.08] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Notify me
        </a>
      </div>
    );
  }

  return (
    <div id={anchor ? "download" : undefined} className={cn("scroll-mt-28", className)}>
      <p className="mb-3 font-heading uppercase text-xl text-white">Coming soon to the App Store</p>
      <WaitlistForm source={source} note={note} />
    </div>
  );
}
