import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

// Landing target for the native app's email links (sign-up confirmation,
// password reset; see strivis/src/lib/authRedirect.js and its
// AUTH_REDIRECT_URL). This page almost never renders in the success case:
// strivis.app is registered as a Universal Link domain for
// /oauth-native-callback* (see public/.well-known/apple-app-site-association),
// so iOS hands the link straight to the app. It only shows when that didn't
// happen — the link was opened inside another app's browser that doesn't
// pass links on, iOS remembered "open in Safari" for this domain, or the
// app isn't on this device. After a moment it says how to get into the app.
// It never reads or uses the auth parameters itself.
//
// A button here can't help: iOS never hands a link on to an app when it
// points to the page's own domain.
const HELP_DELAY_MS = 2500;

export default function OAuthNativeCallback() {
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHelp(true), HELP_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!showHelp) {
    return (
      <div className="min-h-svh bg-background text-foreground flex items-center justify-center px-6">
        <div className="text-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Strivis wird geöffnet …</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-sm">
        <h1 className="font-heading text-3xl tracking-wide mb-3 text-center">Strivis hat sich nicht geöffnet?</h1>
        <p className="text-muted-foreground mb-6 text-center">
          Der Link funktioniert nur in der Strivis-App auf dem iPhone, auf dem du ihn angefordert hast.
        </p>
        <ol className="list-decimal pl-5 space-y-3 text-sm">
          <li>
            Wische auf dieser Seite ganz oben nach unten. Erscheint ein Banner mit <strong>Öffnen</strong>, tippe
            darauf.
          </li>
          <li>
            Oder geh zurück zur E-Mail, <strong>halte den Link gedrückt</strong> und wähle{" "}
            <strong>In Strivis öffnen</strong>.
          </li>
          <li>Klappt beides nicht, fordere in der App einen neuen Link an und öffne ihn in der Mail-App von Apple.</li>
        </ol>
      </div>
    </div>
  );
}
