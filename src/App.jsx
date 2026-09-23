import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Support from "@/pages/Support";
import Datenschutz from "@/pages/Datenschutz";
import Agb from "@/pages/Agb";
import ComingSoon from "@/pages/ComingSoon";
import OAuthNativeCallback from "@/pages/OAuthNativeCallback";
import ConsentBanner from "@/components/ConsentBanner";
import { isPreLaunch } from "@/lib/launchDate";

function App() {
  // Strivis is native-only: the site has no accounts of its own (login and
  // the /premium web checkout were removed), so the coming-soon page is shown
  // to everyone before LAUNCH_DATE (src/lib/launchDate.js) and the real site
  // takes over on its own on launch day, no manual step required.
  const gated = isPreLaunch();

  return (
    <>
      <Routes>
        <Route path="/" element={gated ? <ComingSoon /> : <Home />} />
        {/* Reachable regardless of the launch gate — App Store review and
            real users need this before the site itself goes live. */}
        <Route path="/support" element={<Support />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/agb" element={<Agb />} />
        {/* Native app OAuth handoff target — reachable regardless of the
            launch gate, same as the legal pages, since the native app needs
            this whether or not the public site has "launched" yet. */}
        <Route path="/oauth-native-callback" element={<OAuthNativeCallback />} />
        {/* Old links to the removed /login and /premium pages land here. */}
        <Route path="*" element={gated ? <ComingSoon /> : <Home />} />
      </Routes>
      <ConsentBanner />
    </>
  );
}

export default App;
