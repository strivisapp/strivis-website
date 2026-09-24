import qrcode from "qrcode-generator";

// Encodes `text` as a QR code and returns it as one SVG path (dark modules,
// horizontal runs merged) plus the viewBox size including the quiet zone.
// Pure function, so it renders as inline SVG — no canvas, no <style>, no
// image request.
export function qrSvgPath(text, { margin = 4, level = "M" } = {}) {
  const qr = qrcode(0, level);
  qr.addData(text);
  qr.make();
  const count = qr.getModuleCount();
  let d = "";
  for (let row = 0; row < count; row += 1) {
    let col = 0;
    while (col < count) {
      if (!qr.isDark(row, col)) {
        col += 1;
        continue;
      }
      const start = col;
      while (col < count && qr.isDark(row, col)) col += 1;
      d += `M${start + margin} ${row + margin}h${col - start}v1h${start - col}z`;
    }
  }
  return { size: count + margin * 2, d };
}
