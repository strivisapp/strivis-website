// The tab icon is the app icon (white mark on #ff4500), never the Vite
// starter logo the site shipped with until 2026-10-16.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url));

test("favicon.svg is the Strivis app icon", () => {
  const svg = read("public/favicon.svg").toString("utf8");
  assert.match(svg, /fill="#ff4500"/);
  assert.match(svg, /fill="#fff"/);
  assert.doesNotMatch(svg, /863bff|7e14ff/i, "no Vite starter colors");
});

test("favicon.ico holds 16, 32 and 48 px PNG images", () => {
  const ico = read("public/favicon.ico");
  assert.equal(ico.readUInt16LE(2), 1, "icon type");
  const count = ico.readUInt16LE(4);
  const sizes = [];
  for (let i = 0; i < count; i++) {
    const entry = 6 + 16 * i;
    sizes.push(ico.readUInt8(entry));
    const offset = ico.readUInt32LE(entry + 12);
    assert.equal(ico.subarray(offset, offset + 4).toString("hex"), "89504e47", "PNG entry");
  }
  assert.deepEqual(sizes, [16, 32, 48]);
});

test("every page links the icons", () => {
  const html = read("index.html").toString("utf8");
  assert.match(html, /<link rel="icon" href="\/favicon\.ico" sizes="48x48" \/>/);
  assert.match(html, /<link rel="icon" type="image\/svg\+xml" href="\/favicon\.svg" \/>/);
  assert.match(html, /<link rel="apple-touch-icon" href="\/apple-touch-icon\.png" \/>/);
  const png = read("public/apple-touch-icon.png");
  assert.equal(png.readUInt32BE(16), 180, "apple-touch-icon width");
  assert.equal(png.readUInt32BE(20), 180, "apple-touch-icon height");
});
