import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { APP_STORE_URL } from "@/lib/appStore";

// Fallback for shared profile links (strivis.app/u/<handle>). On an iPhone
// with Strivis installed, iOS hands these straight to the app (Universal
// Link, see public/.well-known/apple-app-site-association) and this page
// never shows. It only renders when that can't happen — no app installed,
// a desktop or Android browser — so it just points to the app.
//
// Deliberately shows nothing from the URL (no handle, no profile data):
// profiles are only visible inside the app to signed-in users, and echoing
// an attacker-chosen handle here would let a crafted link put its own text
// on a strivis.app page.
export default function OpenInApp() {
  return (
    <div className="min-h-svh bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-sm text-center">
        <h1 className="font-heading text-3xl tracking-wide mb-3">Dieses Profil ist in der Strivis-App</h1>
        <p className="text-muted-foreground mb-8">
          Profile, Trainings und Fortschritte gibt es nur in der App. Lade Strivis auf dein iPhone und öffne den Link
          dort noch einmal.
        </p>
        {APP_STORE_URL ? (
          <Button size="lg" className="rounded-full h-12 px-8" asChild>
            <a href={APP_STORE_URL}>Strivis laden</a>
          </Button>
        ) : (
          <Button size="lg" className="rounded-full h-12 px-8" disabled>
            Bald im App Store
          </Button>
        )}
        <p className="mt-8 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Mehr über Strivis
          </Link>
        </p>
      </div>
    </div>
  );
}
