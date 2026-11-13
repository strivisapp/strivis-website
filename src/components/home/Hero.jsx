import { DownloadAction } from "@/components/download/DownloadAction";
import { AppStoreQr } from "@/components/home/AppStoreQr";
import { PhoneFrame, WatchFrame } from "@/components/home/PhoneFrame";
import { Headline } from "@/components/home/SectionHeader";
import { shotById } from "@/content/screenshots";
import { useT } from "@/i18n/context";

// Section 1. What Strivis is, the promise ("Know your next set"), one
// sentence, the App Store badge (with a QR code on desktop) and four facts.
// On a 375 px phone the headline, the sentence and the badge sit above the
// fold; the phone follows. The headline is visible from the first frame (it
// is the LCP element); the device pair is the page's one authored entrance,
// a CSS animation (320 ms up from 16 px, only a fade with reduced motion), so
// it runs on the prerendered HTML and the markup carries no style attribute
// (the CSP blocks them).
export function Hero({ ref, actionRef }) {
  const t = useT();
  const h = t.hero;
  const workout = shotById(t.screenshots, "active-workout");

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-surface-0">
      {/* Warm light from behind the phone, part of the background. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_78%_58%,rgb(255_76_0/0.13),transparent_70%)] max-md:bg-[radial-gradient(90%_40%_at_50%_88%,rgb(255_76_0/0.12),transparent_70%)]" />

      <div className="mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-24 sm:px-6 md:min-h-[100dvh] md:grid-cols-12 md:items-center md:gap-8 md:pb-24 md:pt-32">
        <div className="min-w-0 md:col-span-7">
          <p className="text-small font-semibold text-white/70">{h.tag}</p>
          <Headline
            as="h1"
            id="hero-title"
            lines={h.title}
            className="mt-3 text-[3.25rem] leading-[1.02] sm:text-display-sm sm:leading-[1.02] lg:text-display lg:leading-[1]"
          />
          <p className="mt-5 max-w-[40ch] text-body text-white/75 text-pretty sm:text-lead md:mt-7">{h.lead}</p>
          <div ref={actionRef} className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-5 md:mt-9">
            <DownloadAction variant="full" source="home_hero" />
            <AppStoreQr />
          </div>
          <ul aria-label={h.factsLabel} className="mt-8 flex flex-wrap gap-2 md:mt-10">
            {h.facts.map((fact) => (
              <li key={fact} className="rounded-full px-3.5 py-1.5 text-small font-semibold text-white/80 ring-1 ring-inset ring-hairline-strong">
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-fit animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-entrance delay-entrance ease-out motion-reduce:slide-in-from-bottom-0 md:col-span-5 md:mr-6 lg:mr-10">
          <PhoneFrame shot={workout} priority sizes="(min-width: 1024px) 300px, (min-width: 768px) 280px, 250px" className="w-[250px] md:w-[280px] lg:w-[300px]" />
          <WatchFrame alt={h.watchAlt} className="absolute -bottom-6 -left-8 w-[104px] sm:-left-14 md:-left-20 md:w-[132px]" />
        </div>
      </div>
    </section>
  );
}
