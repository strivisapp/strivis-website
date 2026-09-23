import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Premium from "@/pages/Premium";
import ComingSoon from "@/pages/ComingSoon";
import Datenschutz from "@/pages/Datenschutz";
import Agb from "@/pages/Agb";
import Impressum from "@/pages/Impressum";
import Support from "@/pages/Support";
import OAuthNativeCallback from "@/pages/OAuthNativeCallback";
import { useAuth } from "@/lib/AuthContext";
import { isPreLaunch } from "@/lib/launchDate";
import { Loader2 } from "lucide-react";

function App() {
  const { isAuthenticated, isLoadingAuth } = useAuth();

  // Wait for the auth check before deciding what to show — otherwise an
  // already logged-in visitor would flash ComingSoon for a moment before
  // isAuthenticated catches up, same race SplashScreen avoids in the app.
  if (isLoadingAuth) {
    return (
      <div className="min-h-svh flex items-center justify-center bg-black">
        <Loader2 className="w-6 h-6 animate-spin text-white/50" />
      </div>
    );
  }

  // Only a logged-out visitor sees the coming-soon page, and only before
  // LAUNCH_DATE (src/lib/launchDate.js) — someone already signed in keeps
  // normal access, and the real site takes over on its own on launch day,
  // no manual step required.
  const gatedForVisitor = false; // TEMP: local preview only, revert before commit

  return (
    <Routes>
      <Route path="/" element={gatedForVisitor ? <ComingSoon /> : <Home />} />
      <Route path="/login" element={gatedForVisitor ? <ComingSoon /> : <Login />} />
      <Route path="/premium" element={<Premium />} />
      {/* Reachable regardless of the launch gate — legal pages shouldn't
          disappear just because the rest of the site is pre-launch. */}
      <Route path="/datenschutz" element={<Datenschutz />} />
      <Route path="/agb" element={<Agb />} />
      <Route path="/impressum" element={<Impressum />} />
      <Route path="/support" element={<Support />} />
      {/* Native app OAuth handoff target — reachable regardless of the
          launch gate, same as the legal pages, since the native app needs
          this whether or not the public site has "launched" yet. */}
      <Route path="/oauth-native-callback" element={<OAuthNativeCallback />} />
    </Routes>
  );
}

export default App;
