# Website security (strivis.app)

Review date: 2026-09-24. Static React site on Vercel. It has no accounts and
no sessions (sign-in happens only in the iOS app). Its one API call is the
waitlist `POST` to strivis-backend.

All headers are set in `vercel.json` and checked by
`tests/security-headers.test.mjs` (run by CI after every build). After a
deploy, `node scripts/check-live-headers.mjs` checks the live site.

## Cookies

The site sets none: there is no `Set-Cookie` in any header block, and
`document.cookie` appears only in `src/lib/consent.js`, where it is only
ever assigned expired (`Max-Age=0`) strings. The marketing-consent choice
lives in localStorage (`src/lib/consent.js`). After consent, Meta's pixel
sets its own `_fbp` (and, after an ad click, `_fbc`) measurement cookie.
They are not secrets and not authentication cookies, and they are disclosed
in the consent banner and the privacy policy.

Withdrawing consent ("Cookie settings" in every footer reopens the banner,
then "Decline") stores "denied", calls `fbq("consent", "revoke")` if the
pixel is loaded, and deletes `_fbp` and `_fbc` host-only and on every parent
domain of the host (so `.strivis.app` too). The pixel is not loaded again
until the visitor accepts again. `tests/consent.test.mjs` covers this, and
`tests/security-headers.test.mjs` fails on any other `document.cookie` use.

## HTTPS

- `http://` gets a 308 to `https://` (Vercel).
- HSTS is `max-age=63072000; includeSubDomains`. The whole `.app` TLD is on
  browsers' HSTS preload list anyway.
- The CSP adds `upgrade-insecure-requests`.

## CORS

Vercel answers every static file with `Access-Control-Allow-Origin: *` by
default. `vercel.json` overrides that to `https://strivis.app`. Nothing on
the site is meant to be read cross-origin, and
`Access-Control-Allow-Credentials` is never sent. The only cross-origin
request goes the other way: the waitlist form calls the backend, whose CORS
allowlist includes strivis.app (strivis-backend docs/security/cors.md).

## Content-Security-Policy

```
default-src 'self'; script-src 'self' https://connect.facebook.net;
style-src 'self';
img-src 'self' data: https://www.facebook.com; font-src 'self' data:;
connect-src 'self' https://strivis-backend-production.up.railway.app https://www.facebook.com https://connect.facebook.net;
frame-src https://www.facebook.com; frame-ancestors 'none'; base-uri 'self';
form-action 'self'; object-src 'none'; upgrade-insecure-requests
```

- **No `unsafe-inline`, no `unsafe-eval`.** `style-src 'unsafe-inline'` was
  dropped on 2026-09-24. Tested before enforcing (a local server with the
  stricter policy, every page of both the current site and the launch design
  `redesign-2026-10-13`, scrolled through, FAQ opened):
  - React's style props go through the CSSOM, which CSP doesn't block.
  - The one violation was the fixed `<style>` element that
    `@paper-design/shaders` injected. It was allowed by its SHA-256 hash
    until the launch redesign removed the shader (and the library) on
    2026-09-25; the hash went with it, so `style-src` is `'self'` only.
    A future library that injects a `<style>` element needs its hash added
    here, in `vercel.json` and in `tests/security-headers.test.mjs`, with a
    comment saying why.
  - There is no report collector, so a Report-Only phase wouldn't report
    anywhere; the local test run took its place.
- **Third parties:** only the Meta Pixel (`connect.facebook.net`,
  `www.facebook.com`). It is loaded only after marketing consent, and never
  on `/oauth-native-callback`. The test pins the exact origin list.

## Framing

`frame-ancestors 'none'` and `X-Frame-Options: DENY` on every path. There is
no legitimate embedding: the app opens strivis.app links as Universal Links,
never in an iframe.

## Redirects

- The only redirects are `www.strivis.app/*` → `https://strivis.app/*`
  (same path, keyed on the host) and Vercel's http → https.
- No redirect is built from a query parameter, and the SPA reads no
  `returnUrl`, `next` or `callback` parameters.
- No redirect by browser language. Someone who picked German with the
  language switch (stored in localStorage) is sent from the bare home
  address `/` to `/de` in the browser (`history.replaceState`, same
  origin, fixed path); nothing else moves them.
- Auth parameters that land on the site are stripped
  (`src/lib/stripAuthParams.js`). The cleaned address keeps one leading
  slash, so a crafted `strivis.app//host/?code=` link can't make
  `history.replaceState` fail and leave the code in the address bar.

## Served files

- Vercel serves only the build output: no serverless functions, no
  `api/`, no middleware. Every page is prerendered into its own HTML file
  at build time (`scripts/prerender.mjs`). The rewrites map each known
  route to its fixed file (`/support` to `/support/index.html`, also the
  German `/de` and `/de/support`) and the app's own links (`/u/*`, `/p/*`,
  `/oauth-native-callback`, `/newsletter/*`) to the empty
  `/app-shell.html`. Everything else, a missing asset included, gets
  Vercel's `404.html` with status 404.
- The prerendered HTML carries no inline script and no `style` attribute
  (the build fails otherwise). Structured data is JSON-LD in
  `<script type="application/ld+json">`, a data block the browser never
  runs, so `script-src` stays `'self'`.
- Every page is a static import behind a fixed route; nothing loads a
  module, page or content file by a URL value.
- `public/` holds only images, the two self-destructing service workers
  and the Apple app-site association. `tests/path-safety.test.mjs` fails
  on anything else there, and on source maps, env or config files in
  `dist/`.
