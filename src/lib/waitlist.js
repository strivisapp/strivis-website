import { BACKEND_URL } from "./backend.js";

// The launch waitlist (strivis-backend POST /api/waitlist). Used by the
// countdown before launch and, after launch, by every download action for
// as long as APP_STORE_URL is not set (the app is not in the App Store yet).
// `source` tags where the signup came from ("coming_soon", "home_hero", ...;
// the backend accepts [A-Za-z0-9_.-], max 50). `website` is the honeypot:
// hidden from people, filled in by bots; the backend then stores nothing.
//
// Consent (owner decision, 2026-09-30): Strivis is 18+ only, and the launch
// email is marketing, sent through Brevo with double opt-in. Every form has
// a required checkbox reading WAITLIST_CONSENT_TEXT; nothing is sent until
// it is ticked, and the request carries `adult: true, consent: true` (the
// backend answers 400 without them). Brevo then sends the confirmation
// email, which carries the unsubscribe link.
//
// Resolves to { ok: true } or { error: "<message for the visitor>", field? }.
// `field: "consent"` means the box was not ticked and nothing was sent.
export const WAITLIST_CONSENT_TEXT = "I'm 18 or older and want the launch email. You'll get one email to confirm. Unsubscribe any time.";
export const WAITLIST_CONSENT_ERROR = "Please tick the box to confirm you're 18 or older and want the launch email.";

export async function joinWaitlist({ email, website = "", source, consent = false }, { fetchImpl = fetch } = {}) {
  if (consent !== true) return { error: WAITLIST_CONSENT_ERROR, field: "consent" };
  try {
    const res = await fetchImpl(`${BACKEND_URL}/api/waitlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        locale: globalThis.navigator?.language?.slice(0, 2),
        source,
        website,
        adult: true,
        consent: true,
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
