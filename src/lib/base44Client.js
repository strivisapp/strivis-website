import { createClient } from "@base44/sdk";

// External app (not hosted on a Base44 domain) — talks to the same backend
// and user base as the real Strivis app, so a login/purchase here reflects
// directly in the app's own Profile entity. See @base44/sdk docs, "External
// Apps": no serverUrl override needed, the SDK defaults to Base44's API host.
export const base44 = createClient({
  appId: import.meta.env.VITE_BASE44_APP_ID,
});
