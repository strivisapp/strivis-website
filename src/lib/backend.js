// The Strivis backend (strivis-backend on Railway). The site only uses its
// public waitlist endpoint; VITE_BACKEND_URL can point elsewhere for local dev.
export const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL || "https://strivis-backend-production.up.railway.app"
).replace(/\/$/, "");
