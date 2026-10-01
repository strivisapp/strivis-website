import { motion, useReducedMotion } from "framer-motion";
import { DownloadAction } from "@/components/download/DownloadAction";
import { AppStoreQr } from "@/components/home/AppStoreQr";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { screenshot } from "@/content/screenshots";

// The product on the first screen: two-line headline, one sentence, the
// download action, and the iPhone with a real workout screen. The gym
// photo is only texture now (25%). The headline is visible from the first
// frame (it is the LCP element); the phone is the page's one authored
// entrance, 320 ms up from 16 px.
export function Hero({ ref, actionRef }) {
  const reduceMotion = useReducedMotion();
  const workout = screenshot("Workout");

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
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-0 via-surface-0/70 to-surface-0/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-0/80 via-transparent to-transparent" />
      </div>

      <div className="mx-auto grid min-h-[100dvh] max-w-6xl content-center gap-12 px-5 pb-16 pt-24 sm:px-6 md:grid-cols-12 md:items-center md:gap-8 md:pb-20">
        <div className="md:col-span-7">
          <h1 id="hero-title" className="font-heading uppercase text-display-sm sm:text-[4.5rem] sm:leading-[0.92] lg:text-display">
            <span className="block">Train. Track.</span>
            <span className="block text-primary">Progress.</span>
          </h1>
          <p className="mt-5 max-w-[34ch] text-body text-white/75 sm:text-lead md:mt-6">
            Plan, log and track your training and nutrition. One iPhone app, free to start.
          </p>
          <div ref={actionRef} className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-5 md:mt-9">
            <DownloadAction variant="full" source="home_hero" />
            <AppStoreQr />
          </div>
          <a
            href="#how-it-works"
            className="mt-5 inline-flex min-h-11 items-center rounded-sm text-small font-semibold text-white/80 underline decoration-white/30 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-white outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            How it works
          </a>
        </div>

        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(16px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1], delay: 0.05 }}
          className="flex justify-center md:col-span-5 md:justify-end"
        >
          <PhoneFrame
            shot={workout}
            alt="The Strivis workout screen: three logged sets of Barbell Bench Press and a running rest timer"
            priority
            sizes="(min-width: 768px) 300px, 240px"
            className="w-[240px] md:w-[280px] lg:w-[300px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
