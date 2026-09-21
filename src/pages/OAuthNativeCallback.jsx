import { Loader2 } from "lucide-react";

// Landing target for the native app's Google/Apple sign-in flow (see
// strivis/src/lib/nativeOAuth.js and its NATIVE_OAUTH_CALLBACK_URL). This
// page almost never actually renders in the success case: strivis.app is
// registered as a Universal Link domain for /oauth-native-callback* (see
// public/.well-known/apple-app-site-association), so iOS intercepts the
// external browser's navigation here and hands it straight to the native
// app before this page's content would ever paint. It only shows up as a
// fallback — Universal Link interception failed, or the app isn't
// installed on this device — so it stays deliberately minimal rather than
// trying to parse/consume the auth tokens itself.
export default function OAuthNativeCallback() {
  return (
    <div className="min-h-svh bg-background text-foreground flex items-center justify-center px-6">
      <div className="text-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground text-sm">Returning to Strivis…</p>
      </div>
    </div>
  );
}
