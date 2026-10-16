import { Link } from "react-router-dom";
import { DownloadAction } from "@/components/download/DownloadAction";
import { AppStoreQr } from "@/components/home/AppStoreQr";
import { LegalLinks } from "@/components/site/LegalLinks";
import { LanguageSwitch } from "@/components/site/LanguageSwitch";
import { useLanguage } from "@/i18n/context";
import { homePath } from "@/i18n/lang";

// The same footer on every page (the countdown has its own slim row).
// `download="full"`: pages without their own download block get it here,
// with id="download" so "Get the app" lands on it. `download="compact"`:
// the page already has one above. "English · Deutsch" under the links is the
// language switch for everyone who didn't find it at the top.
export function SiteFooter({ download = "full", source = "footer", ref }) {
  const { lang } = useLanguage();
  return (
    <footer ref={ref} className="border-t border-hairline bg-surface-0">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-6">
            <Link to={homePath(lang)} className="inline-block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <img src="/brand/strivis-lockup-on-dark.svg" alt="Strivis" width="120" height="32" className="h-8 w-auto" />
            </Link>
            <DownloadAction variant={download} source={source} anchor={download === "full"} />
          </div>
          {download === "full" && <AppStoreQr />}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <LegalLinks />
            <LanguageSwitch variant="footer" className="-ml-1" />
          </div>
          <p className="text-small text-white/50">© 2026 Strivis</p>
        </div>
      </div>
    </footer>
  );
}
