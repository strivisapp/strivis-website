import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getConsent, loadMetaPixel, setConsent } from "@/lib/consent";

const BUTTON =
  "press h-11 rounded-full border border-hairline-strong bg-white/[0.05] px-5 text-small font-semibold text-white hover:bg-white/[0.1] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

// Opt-in banner for the Meta Pixel (see lib/consent.js). "Decline" is as
// prominent as "Accept", as German regulators require, and nothing is loaded
// until the visitor accepts. Compact (about 120 px on a phone) and it slides
// in over 220 ms. While it is open, <html data-consent-open> lets the page
// make room: the countdown pads its footer so its links can be scrolled
// clear of it, and the mobile download bar stays hidden. (The hero's and
// the countdown's download actions sit above it on a 390 x 844 phone.)
export default function ConsentBanner() {
  const location = useLocation();
  const [choice, setChoice] = useState(() => getConsent());

  useEffect(() => {
    if (choice === "granted") loadMetaPixel();
  }, [choice, location.pathname]);

  // Never shown on the native sign-in handoff page: nobody browses it, and
  // the pixel must not load there anyway.
  const hidden = Boolean(choice) || location.pathname.startsWith("/oauth-native-callback");

  useEffect(() => {
    const root = document.documentElement;
    if (hidden) delete root.dataset.consentOpen;
    else root.dataset.consentOpen = "";
    return () => {
      delete root.dataset.consentOpen;
    };
  }, [hidden]);

  if (hidden) return null;

  const decide = (value) => {
    setConsent(value);
    setChoice(value);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[55] flex justify-center p-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] sm:p-4"
    >
      <div className="pointer-events-auto w-full max-w-2xl rounded-core bg-surface-2/95 p-3.5 text-white shadow-lift ring-1 ring-hairline-strong backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-ui ease-out motion-reduce:slide-in-from-bottom-0 sm:flex sm:items-center sm:gap-5 sm:p-4">
        <p className="text-xs leading-relaxed text-white/85 sm:flex-1">
          We'd like to use the Meta Pixel to measure our ads. It sets cookies and sends data to Meta Platforms. It only
          runs if you accept.{" "}
          <Link to="/datenschutz" className="text-white underline">
            Privacy Policy
          </Link>
        </p>
        <div className="mt-2.5 grid shrink-0 grid-cols-2 gap-2 sm:mt-0 sm:w-64">
          <button type="button" onClick={() => decide("denied")} className={BUTTON}>
            Decline
          </button>
          <button type="button" onClick={() => decide("granted")} className={BUTTON}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
