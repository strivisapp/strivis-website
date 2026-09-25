// Supabase Auth follows a sign-in or reset link's redirect_to to any path on
// strivis.app (its Site URL's origin), not only /oauth-native-callback — a
// built-in rule that can't be switched off (strivis/docs/security/oauth.md).
// So a crafted link can land a one-time code or session tokens on any page
// here. Nothing on this site uses them, and the Meta Pixel (after consent)
// would report the full address, so they are removed from the address bar
// before anything else runs. /oauth-native-callback keeps its URL: it is the
// Universal Link target, and Safari's "Open in app" hands that URL over.
const AUTH_PARAMS = [
  "code",
  "access_token",
  "refresh_token",
  "provider_token",
  "provider_refresh_token",
  "token",
  "token_hash",
  "expires_at",
  "expires_in",
  "token_type",
  "type",
  "error",
  "error_code",
  "error_description",
  "sb_flow_id",
];

export function withoutAuthParams(href) {
  const url = new URL(href);
  if (url.pathname.startsWith("/oauth-native-callback")) return null;
  let changed = false;
  for (const name of AUTH_PARAMS) {
    if (url.searchParams.has(name)) {
      url.searchParams.delete(name);
      changed = true;
    }
  }
  const hash = new URLSearchParams(url.hash.slice(1));
  if (AUTH_PARAMS.some((name) => hash.has(name))) {
    url.hash = "";
    changed = true;
  }
  if (!changed) return null;
  // A path that starts with "//" (a crafted strivis.app//evil.example/?code=
  // link; "/\" arrives as "//" too) would be read by replaceState as a
  // protocol-relative URL on another host. That throws, and the tokens would
  // stay in the address bar. One leading slash keeps it a path on this site.
  return url.pathname.replace(/^\/+/, "/") + url.search + url.hash;
}

export function stripAuthParams() {
  try {
    const clean = withoutAuthParams(window.location.href);
    if (clean !== null) window.history.replaceState(window.history.state, "", clean);
  } catch {
    // Never block the page over this.
  }
}
