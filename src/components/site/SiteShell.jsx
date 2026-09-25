import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-white"
    >
      Skip to content
    </a>
  );
}

// Frame for every page that isn't the home page or the countdown (support,
// legal, 404, profile links): the same nav and footer as home, so no page is
// a dead end with only a "Back" link. `footerDownload` as in SiteFooter.
export function SiteShell({ children, footerDownload = "full", footerSource }) {
  return (
    <div className="min-h-svh bg-surface-0 text-foreground">
      <SkipLink />
      <SiteNav />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter download={footerDownload} source={footerSource} />
    </div>
  );
}
