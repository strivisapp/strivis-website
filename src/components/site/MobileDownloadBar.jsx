import { useInView } from "@/hooks/useInView";
import { DownloadAction } from "@/components/download/DownloadAction";
import { APP_STORE_URL } from "@/lib/appStore";
import { cn } from "@/lib/utils";

// Phones only (below md): once the hero's download action has scrolled away,
// a slim bar keeps it one thumb away. It leaves again while the final
// download section or the footer is on screen (they carry the action
// themselves) and never shows together with the cookie banner
// (html[data-consent-open], set by ConsentBanner). Slides up from where it
// sits: 220 ms in, 160 ms out.
export function MobileDownloadBar({ heroActionRef, finalRef, footerRef }) {
  const hero = useInView(heroActionRef);
  const final = useInView(finalRef, { initial: false });
  const footer = useInView(footerRef, { initial: false });
  const show = hero.above && !final.inView && !footer.inView;

  return (
    <div
      data-show={show}
      inert={!show}
      aria-hidden={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] md:hidden [[data-consent-open]_&]:hidden",
        "transition-transform ease-out motion-reduce:transition-opacity",
        show ? "translate-y-0 duration-ui motion-reduce:opacity-100" : "translate-y-[calc(100%+1rem)] duration-[160ms] motion-reduce:translate-y-0 motion-reduce:opacity-0"
      )}
    >
      <div className="flex items-center justify-between gap-3 rounded-core bg-surface-2/95 py-2 pl-4 pr-2 shadow-lift ring-1 ring-hairline-strong backdrop-blur-md">
        <p className="min-w-0 text-small leading-tight">
          <span className="block font-heading uppercase text-base text-white">Strivis</span>
          <span className="block text-white/65">{APP_STORE_URL ? "Free on iPhone" : "Coming soon to the App Store"}</span>
        </p>
        {/* The compact action's own "Coming soon" line is already said on the left. */}
        <DownloadAction variant="compact" badgeHeight={40} className="shrink-0 [&>p]:hidden" />
      </div>
    </div>
  );
}
