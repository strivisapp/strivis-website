# strivis-website

The marketing site at https://strivis.app: React + Vite + Tailwind, hosted
on Vercel. Strivis itself is a native iOS app; this site only presents it
and collects the launch waitlist.

## Run it locally

```bash
npm ci
npm run dev        # http://localhost:5173
npm test           # node:test suites in tests/
npm run lint       # oxlint
npm run build      # production build into dist/
```

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
