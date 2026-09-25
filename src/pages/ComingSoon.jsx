import { useEffect, useState } from "react";
import { WaitlistForm } from "@/components/download/WaitlistForm";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { LegalLinks } from "@/components/site/LegalLinks";
import { screenshot } from "@/content/screenshots";
import { LAUNCH_DATE } from "@/lib/launchDate";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// Time left until launch, updated once a minute (on the minute), not every
// second: a ticking clock pulls the eye away from the form.
function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    let interval;
    const timeout = setTimeout(() => {
      setNow(Date.now());
      interval = setInterval(() => setNow(Date.now()), MINUTE);
    }, MINUTE - (Date.now() % MINUTE));
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const remaining = Math.max(0, target.getTime() - now);
  return {
    days: Math.floor(remaining / DAY),
    hours: Math.floor((remaining % DAY) / HOUR),
    minutes: Math.floor((remaining % HOUR) / MINUTE),
  };
}

const plural = (n, word) => `${word}${n === 1 ? "" : "s"}`;

// The pre-launch page (everything but the support, legal and profile-link
// routes until LAUNCH_DATE, see App.jsx). Same promise as the home hero,
// the real app on a phone, and the waitlist form above the fold on a phone
// even with the cookie banner open. Links to support, the legal pages
// (Impressum included) and Instagram at the bottom.
export default function ComingSoon() {
  const { days, hours, minutes } = useCountdown(LAUNCH_DATE);
  const workout = screenshot("Workout");

  return (
    <div className="flex min-h-svh flex-col bg-surface-0 text-white">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 pt-[calc(env(safe-area-inset-top)+1rem)] sm:px-6 md:pt-8">
        <img src="/brand/strivis-lockup-on-dark.svg" alt="Strivis" width="120" height="32" className="h-7 w-auto md:h-8" />
        <p className="text-small font-semibold text-white/75">Launching 13 Oct</p>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 content-center gap-12 px-5 pb-12 pt-10 sm:px-6 md:grid-cols-12 md:items-center md:gap-8 md:py-16">
        <div className="md:col-span-7">
          <h1 className="font-heading uppercase text-display-sm sm:text-[4.5rem] sm:leading-[0.92] lg:text-display">
            <span className="block">Train. Track.</span>
            <span className="block text-primary">Progress.</span>
          </h1>
          <p className="mt-5 max-w-[36ch] text-body text-white/75 sm:text-lead">
            One iPhone app for training, nutrition and progress. Out on 13 October.
          </p>

          <div id="download" className="mt-8 scroll-mt-8">
            <WaitlistForm
              source="coming_soon"
              note="We'll email you once, right when it launches."
              successText="We'll email you the moment we launch on October 13."
            />
          </div>

          <p className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-hairline pt-5 text-small text-white/65">
            <span className="sr-only">Launch on 13 October 2026. Time left: </span>
            {[
              [days, "day"],
              [hours, "hour"],
              [minutes, "minute"],
            ].map(([n, word]) => (
              <span key={word}>
                <span className="mr-1.5 font-heading text-[1.75rem] leading-none text-white tabular-nums">{n}</span>
                {plural(n, word)}
              </span>
            ))}
            <span aria-hidden="true">to go</span>
          </p>
        </div>

        <div className="flex justify-center md:col-span-5 md:justify-end">
          <PhoneFrame
            shot={workout}
            alt="The Strivis workout screen: three logged sets of Barbell Bench Press and a running rest timer"
            sizes="(min-width: 768px) 300px, 240px"
            className="w-[240px] md:w-[280px] lg:w-[300px]"
          />
        </div>
      </main>

      <footer className="mx-auto w-full max-w-6xl border-t border-hairline px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4 sm:px-6 max-md:[[data-consent-open]_&]:pb-44">
        <LegalLinks />
      </footer>
    </div>
  );
}
