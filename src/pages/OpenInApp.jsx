import { SiteShell } from "@/components/site/SiteShell";
import { DownloadAction } from "@/components/download/DownloadAction";
import { AppStoreQr } from "@/components/home/AppStoreQr";

// Fallback for shared profile links (strivis.app/u/<handle>). On an iPhone
// with Strivis installed, iOS hands these straight to the app (Universal
// Link, see public/.well-known/apple-app-site-association) and this page
// never shows. It only renders when that can't happen (no app installed,
// a desktop or Android browser), so it just points to the app. English like
// the rest of the site.
//
// Deliberately shows nothing from the URL (no handle, no profile data):
// profiles are only visible inside the app to signed-in users, and echoing
// an attacker-chosen handle here would let a crafted link put its own text
// on a strivis.app page.
export default function OpenInApp() {
  return (
    <SiteShell footerDownload="compact">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 sm:px-6 md:pb-28 md:pt-36">
        <h1 className="font-heading uppercase text-h2-sm md:text-h2 text-balance">This profile lives in the app.</h1>
        <p className="mt-4 max-w-[46ch] text-body text-white/70 md:text-lead">
          Profiles, workouts and progress are only in Strivis. Install it on your iPhone, then open the link again.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
          <DownloadAction variant="full" source="profile_link" anchor />
          <AppStoreQr />
        </div>
      </div>
    </SiteShell>
  );
}
