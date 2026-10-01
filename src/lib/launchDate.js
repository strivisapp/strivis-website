// The app's launch day (the coming-soon page's countdown) and the day the
// full site opened (App.jsx's route gate, Support's FAQ link). Mirrors the same
// file in the strivis app repo — kept as a plain duplicate rather than a
// shared package since the two are separate deployments.
export const LAUNCH_DATE = new Date("2026-10-13T00:00:00");

// The full site opened before the app's launch (owner decision 2026-10-02):
// visitors see the product, and every download action offers the waitlist
// until APP_STORE_URL is set (lib/appStore.js). The countdown page only
// shows before this date. LAUNCH_DATE stays the app's launch day.
export const SITE_OPENS = new Date("2026-10-02T00:00:00");

export const isPreLaunch = () => Date.now() < SITE_OPENS.getTime();
