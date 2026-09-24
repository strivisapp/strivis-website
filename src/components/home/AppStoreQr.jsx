import { lazy, Suspense } from "react";
import { APP_STORE_URL } from "@/lib/appStore";

const AppStoreQrCode = lazy(() => import("@/components/home/AppStoreQrCode"));

// Desktop only (md and up): a QR code to the App Store listing next to the
// final download button, for visitors reading on a computer. Hidden until
// APP_STORE_URL is set (it's null until Apple approves the app) and on
// phones, where the button itself is the shortcut.
export function AppStoreQr() {
  if (!APP_STORE_URL) return null;
  return (
    <div className="hidden md:block">
      <Suspense fallback={null}>
        <AppStoreQrCode url={APP_STORE_URL} />
      </Suspense>
    </div>
  );
}
