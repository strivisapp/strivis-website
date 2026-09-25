import { BACKEND_URL } from "./backend.js";

// The launch waitlist (strivis-backend POST /api/waitlist). Used by the
// countdown before launch and, after launch, by every download action for
// as long as APP_STORE_URL is not set (the app is not in the App Store yet).
// `source` tags where the signup came from ("coming_soon", "home_hero", ...;
// the backend accepts [A-Za-z0-9_.-], max 50). `website` is the honeypot:
// hidden from people, filled in by bots; the backend then stores nothing.
//
// Resolves to { ok: true } or { error: "<message for the visitor>" }.
export async function joinWaitlist({ email, website = "", source }, { fetchImpl = fetch } = {}) {
  try {
    const res = await fetchImpl(`${BACKEND_URL}/api/waitlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        locale: globalThis.navigator?.language?.slice(0, 2),
        source,
        website,
      }),
    });
    if (res.ok) return { ok: true };
    if (res.status === 400) return { error: "Please enter a valid email address." };
    if (res.status === 429) return { error: "Too many attempts. Please try again later." };
    return { error: "Something went wrong. Please try again in a moment." };
  } catch {
    return { error: "Something went wrong. Please try again in a moment." };
  }
}
