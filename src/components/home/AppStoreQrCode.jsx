import { useMemo } from "react";
import { qrSvgPath } from "@/lib/qr";

// Split out of AppStoreQr so the QR encoder is its own chunk, loaded only
// once there is a listing URL to encode.
export default function AppStoreQrCode({ url }) {
  const { size, d } = useMemo(() => qrSvgPath(url), [url]);
  return (
    <figure className="hidden md:flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 pr-5 text-left">
      {/* Dark modules on white: the contrast QR scanners expect. */}
      <svg viewBox={`0 0 ${size} ${size}`} className="h-24 w-24 shrink-0 rounded-lg bg-white" role="img" aria-label="QR code linking to Strivis in the App Store" shapeRendering="crispEdges">
        <path d={d} fill="#0B0D11" />
      </svg>
      <figcaption>
        <span className="block font-heading uppercase tracking-wide text-lg">Scan with your iPhone</span>
        <span className="block text-sm text-white/70">Opens Strivis in the App Store.</span>
      </figcaption>
    </figure>
  );
}
