import { useMemo } from "react";
import { qrSvgPath } from "@/lib/qr";
import { useT } from "@/i18n/context";

// Split out of AppStoreQr so the QR encoder is its own chunk, loaded only
// once there is a listing URL to encode.
export default function AppStoreQrCode({ url }) {
  const t = useT();
  const { size, d } = useMemo(() => qrSvgPath(url), [url]);
  return (
    <figure className="hidden md:flex items-center gap-4 rounded-core bg-surface-1 p-2.5 pr-5 text-left shadow-core ring-1 ring-hairline">
      {/* Dark modules on white: the contrast QR scanners expect. */}
      <svg viewBox={`0 0 ${size} ${size}`} className="h-24 w-24 shrink-0 rounded-tile bg-white" role="img" aria-label={t.qr.label} shapeRendering="crispEdges">
        <path d={d} fill="#0B0D11" />
      </svg>
      <figcaption>
        <span className="block text-small font-semibold text-white">{t.qr.scan}</span>
        <span className="block text-small text-white/65">{t.qr.opens}</span>
      </figcaption>
    </figure>
  );
}
