# Website security (strivis.app)

Review date: 2026-09-24. Static React site on Vercel. It has no accounts and
no sessions (sign-in happens only in the iOS app). Its one API call is the
waitlist `POST` to strivis-backend.

All headers are set in `vercel.json` and checked by
`tests/security-headers.test.mjs` (run by CI after every build). After a
deploy, `node scripts/check-live-headers.mjs` checks the live site.

## Cookies

The site sets none: there is no `Set-Cookie` in any header block and no
`document.cookie` in `src/`. The marketing-consent choice lives in
localStorage (`src/lib/consent.js`). After consent, Meta's pixel sets its own
`_fbp` measurement cookie. It is not a secret and not an authentication
cookie. It is disclosed in the consent banner and the privacy policy.

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
- Auth parameters that land on the site are stripped
  (`src/lib/stripAuthParams.js`).
