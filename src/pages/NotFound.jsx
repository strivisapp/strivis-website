import { Link } from "react-router-dom";
import { SiteShell } from "@/components/site/SiteShell";
import { DownloadAction } from "@/components/download/DownloadAction";

// Unknown paths after launch (old Base44 links like /login or /premium,
// typos). Says so plainly; the download action is the way on, the home
// page the second one.
export default function NotFound() {
  return (
    <SiteShell footerDownload="compact">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 sm:px-6 md:pb-28 md:pt-36">
        <p aria-hidden="true" className="font-heading text-[7rem] leading-none text-primary md:text-[10rem]">
          404
        </p>
        <h1 className="mt-4 font-heading uppercase text-h2-sm md:text-h2 text-balance">This page doesn't exist.</h1>
        <p className="mt-4 max-w-[46ch] text-body text-white/70 md:text-lead">
          The link may be old or mistyped. Strivis lives in the iPhone app.
        </p>
        <DownloadAction variant="full" source="not_found" anchor className="mt-9" />
        <Link
          to="/"
          className="mt-6 inline-flex min-h-11 items-center rounded-sm text-small font-semibold text-white/80 underline decoration-white/30 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-white outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Back to the home page
        </Link>
      </div>
    </SiteShell>
  );
}
