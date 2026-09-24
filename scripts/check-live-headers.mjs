// Checks the live site's security headers against vercel.json's intent:
//   node scripts/check-live-headers.mjs [https://strivis.app]
// Exits non-zero on any mismatch. No dependencies (Node 22 fetch).
const base = process.argv[2] ?? "https://strivis.app";
const failures = [];
const expect = (cond, msg) => { if (!cond) failures.push(msg); };

for (const path of ["/", "/oauth-native-callback", "/u/someone", "/.well-known/apple-app-site-association"]) {
  const res = await fetch(base + path, { redirect: "manual" });
  const h = (n) => res.headers.get(n) ?? "";
  const csp = h("content-security-policy");
  expect(res.status === 200, `${path}: status ${res.status}`);
  expect(/frame-ancestors 'none'/.test(csp), `${path}: frame-ancestors`);
  expect(!/unsafe-inline|unsafe-eval/.test(csp), `${path}: unsafe-* in CSP`);
  expect(/object-src 'none'/.test(csp) && /base-uri 'self'/.test(csp), `${path}: object-src/base-uri`);
  expect(h("x-frame-options") === "DENY", `${path}: X-Frame-Options ${h("x-frame-options")}`);
  expect(Number(/max-age=(\d+)/.exec(h("strict-transport-security"))?.[1]) >= 31536000, `${path}: HSTS`);
  expect(h("access-control-allow-origin") !== "*", `${path}: ACAO *`);
  expect(!h("access-control-allow-credentials"), `${path}: ACAC set`);
  expect(!h("set-cookie"), `${path}: Set-Cookie`);
}
const http = await fetch(base.replace("https://", "http://") + "/", { redirect: "manual" });
expect([301, 308].includes(http.status) && http.headers.get("location")?.startsWith("https://"), `http → https (${http.status})`);
const www = await fetch(base.replace("https://", "https://www.") + "/x?next=https://evil.example", { redirect: "manual" });
expect(www.headers.get("location") === base + "/x?next=https://evil.example" || www.headers.get("location")?.startsWith(base + "/"), `www redirect → ${www.headers.get("location")}`);

if (failures.length) {
  console.error("FAIL\n  " + failures.join("\n  "));
  process.exit(1);
}
console.log(`OK: ${base} headers match`);
