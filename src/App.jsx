import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";

// Only the home page ships in the main bundle; every other page loads when
// it is opened, so the first visit downloads less before the first paint.
const Support = lazy(() => import("@/pages/Support"));
const Datenschutz = lazy(() => import("@/pages/Datenschutz"));
const Agb = lazy(() => import("@/pages/Agb"));
const Impressum = lazy(() => import("@/pages/Impressum"));
const Copyright = lazy(() => import("@/pages/Copyright"));
const ComingSoon = lazy(() => import("@/pages/ComingSoon"));
const OAuthNativeCallback = lazy(() => import("@/pages/OAuthNativeCallback"));
const OpenInApp = lazy(() => import("@/pages/OpenInApp"));
const NewsletterConfirmed = lazy(() => import("@/pages/NewsletterConfirmed"));
const NotFound = lazy(() => import("@/pages/NotFound"));
import ConsentBanner from "@/components/ConsentBanner";
import { isPreLaunch } from "@/lib/launchDate";
import { usePageMeta } from "@/lib/pageMeta";

function App() {
  // Strivis is native-only: the site has no accounts of its own (login and
  // the /premium web checkout were removed), so the coming-soon page is shown
  // to everyone before LAUNCH_DATE (src/lib/launchDate.js) and the real site
  // takes over on its own on launch day, no manual step required.
  const gated = isPreLaunch();
  // Title, description and canonical of the current route (lib/pageMeta.js).
  usePageMeta({ gated });

  return (
    <>
      <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={gated ? <ComingSoon /> : <Home />} />
        {/* Reachable regardless of the launch gate — App Store review and
            real users need these before the site itself goes live. */}
        <Route path="/support" element={<Support />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/agb" element={<Agb />} />
        <Route path="/impressum" element={<Impressum />} />
        {/* Rights holders and anyone reporting illegal content need this
            without an account and before launch (DMCA, DSA notice and action). */}
        <Route path="/copyright" element={<Copyright />} />
        {/* Native app OAuth handoff target — reachable regardless of the
            launch gate, same as the legal pages, since the native app needs
            this whether or not the public site has "launched" yet. */}
        <Route path="/oauth-native-callback" element={<OAuthNativeCallback />} />
        {/* Where the launch email's confirmation link lands (Brevo double
            opt-in); reachable before launch, the waitlist runs now. */}
        <Route path="/newsletter/confirmed" element={<NewsletterConfirmed />} />
        {/* Shared profile links: opened in the app on iPhones that have it
            (Universal Link), this page otherwise — also before launch, since
            app users share these as soon as the app is out. */}
        <Route path="/u/*" element={<OpenInApp />} />
        {/* Shared post links (the app's community, docs/api/community.md H7):
            same fallback, never the post itself. */}
        <Route path="/p/*" element={<OpenInApp kind="post" />} />
        {/* Old links to the removed /login and /premium pages, typos: the
            countdown before launch, an honest 404 after. */}
        <Route path="*" element={gated ? <ComingSoon /> : <NotFound />} />
      </Routes>
      </Suspense>
      <ConsentBanner />
    </>
  );
}

export default App;
