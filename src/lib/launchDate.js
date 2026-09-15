// Single source of truth for the pre-launch cutoff, read by both the
// coming-soon page's countdown and App.jsx's route gate. Mirrors the same
// file in the strivis app repo — kept as a plain duplicate rather than a
// shared package since the two are separate deployments.
export const LAUNCH_DATE = new Date("2026-10-13T00:00:00");

export const isPreLaunch = () => Date.now() < LAUNCH_DATE.getTime();
