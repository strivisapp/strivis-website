// Marketing-cookie consent for the Meta Pixel. Under GDPR/TTDSG the pixel
// may only load after an explicit opt-in, so it is no longer in index.html:
// loadMetaPixel() injects it once the visitor has accepted, on this visit or
// a previous one. The choice lives in localStorage only (it is not a cookie
// itself), and a missing or unreadable choice counts as "not accepted".
//
// Withdrawing has to be as easy as accepting (Art. 7(3) GDPR): "Cookie
// settings" in the footer (openConsentSettings) reopens the banner, and
// "Decline" there stores "denied", tells an already loaded pixel to stop
// (fbq("consent", "revoke")) and deletes Meta's first-party _fbp/_fbc
// cookies on this site's domain. The pixel is not loaded again unless the
// visitor accepts again.
const STORAGE_KEY = "strivis_marketing_consent";
const PIXEL_ID = "1406414617485744";
const OPEN_EVENT = "strivis:consent-settings";

// Meta's first-party cookies (browser ID and click ID).
export const META_COOKIES = ["_fbp", "_fbc"];

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
  if (value === "granted") {
    // Accepted again after a withdrawal on this page view: the pixel is
    // still in memory, so it only needs to be allowed to send again.
    if (pixelLoaded) window.fbq?.("consent", "grant");
    else loadMetaPixel();
  } else {
    revokeMetaPixel();
  }
}

// The footer's "Cookie settings" reopens the banner (ConsentBanner listens).
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenConsentSettings(handler) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}

// The domains a cookie set for this host can sit on: the host itself and
// each parent domain above the top-level one ("www.strivis.app" gives
// "www.strivis.app" and "strivis.app"; Meta sets _fbp on ".strivis.app").
// No domain for hosts without a dot (localhost) or IP addresses.
export function cookieDomains(hostname) {
  if (!hostname || !hostname.includes(".") || /^[\d.]+$/.test(hostname) || hostname.includes(":")) return [];
  const parts = hostname.split(".");
  const out = [];
  for (let i = 0; i < parts.length - 1; i++) out.push(parts.slice(i).join("."));
  return out;
}

// The cookie strings that expire Meta's cookies on every domain they can
// sit on. Deleting only: nothing here ever sets a value.
export function expiredMetaCookies(hostname) {
  const out = [];
  for (const name of META_COOKIES) {
    out.push(`${name}=; Max-Age=0; Path=/; SameSite=Lax`);
    for (const domain of cookieDomains(hostname)) out.push(`${name}=; Max-Age=0; Path=/; Domain=${domain}; SameSite=Lax`);
  }
  return out;
}

export function revokeMetaPixel() {
  window.fbq?.("consent", "revoke");
  for (const cookie of expiredMetaCookies(window.location.hostname)) document.cookie = cookie;
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
