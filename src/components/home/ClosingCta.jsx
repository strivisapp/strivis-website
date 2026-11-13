import { DownloadAction } from "@/components/download/DownloadAction";
import { Headline } from "@/components/home/SectionHeader";
import { useT } from "@/i18n/context";

// The close: the promise once more, one line, the page's third App Store
// badge. Warm light rises from the bottom edge. The page's #download target.
export function ClosingCta({ ref }) {
  const c = useT().closing;
  return (
    <section
      ref={ref}
      id="download"
      aria-labelledby="download-title"
      className="scroll-mt-20 border-t border-hairline bg-surface-0 bg-[radial-gradient(60%_80%_at_50%_100%,rgb(255_76_0/0.2),transparent_70%)] px-5 py-28 text-center sm:px-6 md:py-40"
    >
      <Headline id="download-title" lines={c.title} className="mx-auto max-w-4xl text-section-sm md:text-section" />
      <p className="mx-auto mt-6 max-w-[40ch] text-body text-white/75 md:text-lead">{c.lead}</p>
      <div className="mt-10 flex justify-center">
        <DownloadAction variant="full" source="home_cta" />
      </div>
    </section>
  );
}
