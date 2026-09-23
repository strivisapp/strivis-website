import { Button } from "@/components/ui/button";
import { APP_STORE_URL } from "@/lib/appStore";

// Download CTA for the native app. It used to point at app.strivis.app, the
// Base44 web app that is being shut down; until the App Store listing exists
// (APP_STORE_URL in lib/appStore.js) it shows a disabled "coming soon".
export function AppStoreButton({ className = "rounded-full h-14 px-9 text-base" }) {
  if (!APP_STORE_URL) {
    return (
      <Button size="lg" className={className} disabled>
        Coming soon to the App Store
      </Button>
    );
  }
  return (
    <Button size="lg" className={className} asChild>
      <a href={APP_STORE_URL}>Download free →</a>
    </Button>
  );
}
