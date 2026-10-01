import { DownloadAction } from "@/components/download/DownloadAction";
import { AppStoreQr } from "@/components/home/AppStoreQr";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { Reveal } from "@/components/home/Reveal";
import { screenshot } from "@/content/screenshots";

// The close: the device once more (today's plan day, ready to log), the
// download action and, on desktop once the listing
// exists, a QR code (AppStoreQr). No grid lines, no pulsing glow. This
// section is the page's #download target.
// Headline is a proposal from the website audit; the owner confirms it.
export function CtaRepeat({ ref }) {
  return (
    <section ref={ref} id="download" aria-labelledby="download-title" className="scroll-mt-20 overflow-hidden border-t border-hairline bg-surface-0">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pt-20 sm:px-6 md:grid-cols-12 md:items-end md:gap-8 md:pt-28">
        <Reveal className="pb-4 md:col-span-7 md:self-center md:pb-28">
          <h2 id="download-title" className="font-heading uppercase text-h2-sm md:text-[4.5rem] md:leading-[0.92] text-balance">
            Your next set starts here.
          </h2>
          <p className="mt-5 text-body text-white/70 md:text-lead">Free on iPhone. No subscription required.</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
            <DownloadAction variant="full" source="home_cta" />
            <AppStoreQr />
          </div>
        </Reveal>
        <div className="flex justify-center md:col-span-5 md:justify-end">
          {/* Only the top of the phone shows; the section edge cuts it off. */}
          <div className="h-[380px] overflow-hidden md:h-[460px]">
            <PhoneFrame shot={screenshot("Plan")} sizes="(min-width: 768px) 300px, 260px" className="w-[260px] md:w-[300px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
