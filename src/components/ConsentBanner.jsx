import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getConsent, loadMetaPixel, setConsent } from "@/lib/consent";

// Opt-in banner for the Meta Pixel (see lib/consent.js). "Decline" is as
// prominent as "Accept", as German regulators require, and nothing is loaded
// until the visitor accepts.
export default function ConsentBanner() {
  const location = useLocation();
  const [choice, setChoice] = useState(() => getConsent());

  useEffect(() => {
    if (choice === "granted") loadMetaPixel();
  }, [choice, location.pathname]);

  // Never shown on the native sign-in handoff page: nobody browses it, and
  // the pixel must not load there anyway.
  if (choice || location.pathname.startsWith("/oauth-native-callback")) return null;

  const decide = (value) => {
    setConsent(value);
    setChoice(value);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 p-4 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto w-full max-w-md rounded-2xl border border-white/15 bg-neutral-950/95 text-white shadow-2xl p-4">
        <p className="text-xs text-white/80 leading-relaxed">
          We'd like to use the Meta Pixel to measure our ads. It sets cookies and sends data to Meta Platforms. It only
          runs if you accept.{" "}
          <Link to="/datenschutz" className="underline text-white">
            Privacy Policy
          </Link>
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="h-10 rounded-xl border border-white/25 bg-white/5 text-sm font-medium hover:bg-white/10"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="h-10 rounded-xl border border-white/25 bg-white/5 text-sm font-medium hover:bg-white/10"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
