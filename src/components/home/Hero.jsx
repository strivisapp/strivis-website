import { DownloadAction } from "@/components/download/DownloadAction";
import { AppStoreQr } from "@/components/home/AppStoreQr";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { shotById } from "@/content/screenshots";
import { useT } from "@/i18n/context";

// The product on the first screen: two-line headline, one sentence, the
// download action, and the iPhone with a real workout screen. The gym
// photo is only texture now (25%). The headline is visible from the first
// frame (it is the LCP element); the phone is the page's one authored
// entrance, 320 ms up from 16 px (only a fade with reduced motion). A CSS
// animation, so it runs on the prerendered HTML before any script and the
// markup carries no inline style (the CSP blocks style attributes).
export function Hero({ ref, actionRef }) {
  const t = useT();
  const workout = shotById(t.screenshots, "active-workout");
  const lines = t.hero.titleLines;

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-surface-0">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <img
          src="/hero-texture-1600.webp"
          srcSet="/hero-texture-800.webp 800w, /hero-texture-1600.webp 1600w"
          sizes="100vw"
          width="1600"
          height="2400"
          alt=""
          decoding="async"
          fetchPriority="low"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-0 via-surface-0/70 to-surface-0/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-0/80 via-transparent to-transparent" />
      </div>

      <div className="mx-auto grid min-h-[100dvh] max-w-6xl content-center gap-12 px-5 pb-16 pt-24 sm:px-6 md:grid-cols-12 md:items-center md:gap-8 md:pb-20">
        <div className="md:col-span-7">
          <h1 id="hero-title" className="font-heading uppercase text-display-sm sm:text-[4.5rem] sm:leading-[0.92] lg:text-display">
            {lines.map((line, i) => (
              <span key={line} className={i === lines.length - 1 ? "block text-primary" : "block"}>
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-[34ch] text-body text-white/75 sm:text-lead md:mt-6">
            {t.hero.lead}
          </p>
          <div ref={actionRef} className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-5 md:mt-9">
            <DownloadAction variant="full" source="home_hero" />
            <AppStoreQr />
          </div>
          <a
            href="#how-it-works"
            className="mt-5 inline-flex min-h-11 items-center rounded-sm text-small font-semibold text-white/80 underline decoration-white/30 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-white outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t.hero.howLink}
          </a>
        </div>

        <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-entrance delay-entrance ease-out motion-reduce:slide-in-from-bottom-0 md:col-span-5 md:justify-end">
          <PhoneFrame
            shot={workout}
            alt={t.hero.phoneAlt}
            priority
            sizes="(min-width: 768px) 300px, 240px"
            className="w-[240px] md:w-[280px] lg:w-[300px]"
          />
        </div>
      </div>
    </section>
  );
}
