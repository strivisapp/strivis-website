// Marketing-cookie consent for the Meta Pixel. Under GDPR/TTDSG the pixel
// may only load after an explicit opt-in, so it is no longer in index.html:
// loadMetaPixel() injects it once the visitor has accepted, on this visit or
// a previous one. The choice lives in localStorage only (it is not a cookie
// itself), and a missing or unreadable choice counts as "not accepted".
const STORAGE_KEY = "strivis_marketing_consent";
const PIXEL_ID = "1406414617485744";

// The native app's sign-in emails land on this path with a one-time code in
// the URL; no third-party script may run there, consent or not.
const PIXEL_BLOCKED_PATHS = ["/oauth-native-callback"];

export function getConsent() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage blocked: the choice applies to this page view only.
  }
  if (value === "granted") loadMetaPixel();
}

let pixelLoaded = false;

export function loadMetaPixel() {
  if (pixelLoaded || getConsent() !== "granted") return;
  if (PIXEL_BLOCKED_PATHS.some((p) => window.location.pathname.startsWith(p))) return;
  pixelLoaded = true;

  // Meta's standard snippet, unchanged apart from being loaded on demand.
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */
  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}
