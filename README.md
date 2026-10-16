# strivis-website

The marketing site at https://strivis.app: React + Vite + Tailwind, hosted
on Vercel. Strivis itself is a native iOS app; this site only presents it
and collects the launch waitlist.

English at `/`, German at `/de` (home and support; the legal pages exist
once and are linked from both).

## Run it locally

```bash
npm ci
npm run dev        # http://localhost:5173
npm test           # node:test suites in tests/
npm run lint       # oxlint
npm run build      # production build into dist/, every page prerendered
```

## Languages

Both languages render from the same components. Every text the site's own
pages show lives in `src/i18n/en.js` and `src/i18n/de.js` (same keys,
`tests/i18n.test.mjs` checks); product facts in `src/content/` (German in
`src/content/de/`). German wording follows the app's German texts and App
Store description. `src/i18n/lang.js` maps paths to languages; the
switch (`src/components/site/LanguageSwitch.jsx`) links to the same page in
the other language and remembers the choice in localStorage.

## Build and prerendering

`npm run build` runs three steps: `vite build` (the browser app),
`vite build --ssr src/entry-server.jsx --outDir dist-ssr` (the same app for
Node) and `node scripts/prerender.mjs`, which renders every page in
`src/lib/seo.js` `PAGE_META` to `dist/<path>/index.html` with its own
title, description, canonical, hreflang, `<html lang>` and JSON-LD, plus
`dist/404.html`, `dist/app-shell.html` (the app's handoff pages) and
`dist/sitemap.xml`, then deletes `dist-ssr/`. The browser hydrates the
prerendered markup (`src/main.jsx`). A new page needs an entry in
`PAGE_META`, a route in `src/App.jsx` and a rewrite in `vercel.json`.

## Backend

The waitlist form posts to `POST /api/waitlist` on strivis-backend
(`src/lib/waitlist.js`). The backend URL comes from `src/lib/backend.js`:
production by default, `VITE_BACKEND_URL` to point a local build elsewhere.

## Deploy

Vercel builds and deploys `main` on every push. Headers, the CSP and
redirects live in `vercel.json`; `docs/security.md` explains them. After a
deploy, check the live headers:

```bash
node scripts/check-live-headers.mjs https://strivis.app
```

## Branches

- `main`: the live site (countdown and Impressum).
- `redesign-2026-10-13`: the launch redesign. It has to be merged into
  `main` before launch on 13 October 2026.

## Docs

- `docs/security.md`: CSP, headers, the waitlist endpoint
- `docs/website-plan.html`, `docs/homepage-wireframe.html`,
  `docs/homepage-copy.html`: plan, wireframe and copy of the redesign
