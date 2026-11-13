import { useInView } from "@/hooks/useInView";
import { APP_STORE_URL } from "@/lib/appStore";
import { useT } from "@/i18n/context";
import { cn } from "@/lib/utils";

// Phones only (below md): once the hero's App Store badge has scrolled away,
// one full-width button keeps the App Store a thumb away. It steps aside
// while one of the page's own badges (after the pricing, the closing
// section) or the footer is on screen, and never shows together with the
// cookie banner (html[data-consent-open], set by ConsentBanner). Slides up
// from where it sits: 220 ms in, 160 ms out; only a fade with reduced motion.
export function MobileDownloadBar({ heroActionRef, pricingActionRef, finalRef, footerRef }) {
  const t = useT();
  const hero = useInView(heroActionRef);
  const pricing = useInView(pricingActionRef, { initial: false });
  const final = useInView(finalRef, { initial: false });
  const footer = useInView(footerRef, { initial: false });
  const show = Boolean(APP_STORE_URL) && hero.above && !pricing.inView && !final.inView && !footer.inView;

  return (
    <div
      data-show={show}
      inert={!show}
      aria-hidden={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] md:hidden [[data-consent-open]_&]:hidden",
        "transition-[transform,opacity] ease-out motion-reduce:transition-opacity",
        show ? "translate-y-0 opacity-100 duration-ui" : "translate-y-[calc(100%+1rem)] opacity-0 duration-press motion-reduce:translate-y-0"
      )}
    >
      <a
        href={APP_STORE_URL}
        className="press flex min-h-[52px] w-full items-center justify-center rounded-full bg-primary px-6 text-body font-bold text-primary-foreground shadow-lift outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        {t.download.sticky}
      </a>
    </div>
  );
}
