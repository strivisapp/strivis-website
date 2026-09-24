// Desktop QR code to the App Store listing (src/components/home/AppStoreQr.jsx).

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import qrcode from "qrcode-generator";
import { qrSvgPath } from "../src/lib/qr.js";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

test("QR: hidden while APP_STORE_URL is null, and on phones", () => {
  const source = read("src/components/home/AppStoreQr.jsx");
  assert.match(source, /if \(!APP_STORE_URL\) return null;/, "must render nothing without a listing URL");
  assert.match(source, /className="hidden md:block"/, "must stay hidden below md");
  const url = /export const APP_STORE_URL = ([^;]+);/.exec(read("src/lib/appStore.js"))[1].trim();
  if (url === "null") assert.ok(true, "no listing yet — the QR code is not rendered");
});

test("QR: the final CTA is where it shows up", () => {
  assert.match(read("src/components/home/CtaRepeat.jsx"), /<AppStoreQr \/>/);
});

test("QR: the SVG path draws exactly the dark modules of the code", () => {
  const url = "https://apps.apple.com/app/id1234567890";
  const margin = 4;
  const { size, d } = qrSvgPath(url, { margin });
  const qr = qrcode(0, "M");
  qr.addData(url);
  qr.make();
  const n = qr.getModuleCount();
  assert.equal(size, n + 2 * margin);

  // Re-rasterise the path's runs and compare module by module.
  const grid = Array.from({ length: n }, () => Array(n).fill(false));
  for (const [, x, y, w] of d.matchAll(/M(\d+) (\d+)h(\d+)v1h-\d+z/g)) {
    for (let c = 0; c < Number(w); c += 1) grid[Number(y) - margin][Number(x) - margin + c] = true;
  }
  for (let r = 0; r < n; r += 1) for (let c = 0; c < n; c += 1) assert.equal(grid[r][c], qr.isDark(r, c), `module ${r},${c}`);
});
